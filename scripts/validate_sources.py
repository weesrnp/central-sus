"""Read-only checks against configured DATASUS sources and the running app.

Usage: python scripts/validate_sources.py [http://127.0.0.1:8097]
No binary installers or national databases are downloaded.
"""
import concurrent.futures, datetime, ftplib, json, re, sys, urllib.request
from pathlib import Path
from urllib.parse import urlsplit, urlencode

ROOT = Path(__file__).resolve().parents[1]
BASE = sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8097'
RAW = ROOT / 'storage/cache/source-validation.json'
REPORT = ROOT / 'docs/VALIDACAO-FONTES.md'

def get(url):
    with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'CentralSUS-LinkCheck/1.0'}), timeout=50) as r:
        return json.load(r)

source=(ROOT/'config/catalog.php').read_text(encoding='utf-8')
ftp_urls=sorted(set(re.findall(r"ftp://[^'\s]+",source)))
ftp_urls.append('ftp://arpoador.datasus.gov.br/siasus/LogCarga/')
ftp_urls=sorted(set(ftp_urls))
http_urls=sorted(set(re.findall(r"https://[^'\s]+",source)) | set(re.findall(r'href="(https?://[^"]+)"',(ROOT/'templates/partials/footer.php').read_text(encoding='utf-8'))))
catalog=get(BASE+'/api/catalog')
if 'data' in catalog: catalog=catalog['data']
areas=catalog['areas']

def ftp_check(url):
    result={'url':url,'protocol':'FTP'}
    try:
        parsed=urlsplit(url)
        with ftplib.FTP(parsed.hostname,timeout=15,encoding='latin-1') as ftp:
            ftp.login('anonymous','anonymous@datasus.gov.br')
            ftp.cwd(parsed.path)
            lines=[]
            ftp.retrlines('LIST',lines.append)
            result.update(ok=True,entries=len(lines),sample=lines[:3])
    except Exception as e: result.update(ok=False,error=str(e))
    print(('OK ' if result['ok'] else 'FAIL ')+url,flush=True)
    return result

def http_check(url):
    result={'url':url,'protocol':urlsplit(url).scheme.upper()}
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 CentralSUS-LinkCheck/1.0'})
        with urllib.request.urlopen(req,timeout=20) as r:
            result.update(ok=200<=r.status<400,status=r.status,final_url=r.url)
            r.read(4096)
    except Exception as e: result.update(ok=False,error=str(e))
    print(('OK ' if result['ok'] else 'FAIL ')+url,flush=True)
    return result

def subgroup_check(item):
    gid,sub=item
    result={'group':gid,'subgroup':sub['name']}
    if sub.get('specialView'):
        return dict(result,special=sub['specialView'])
    try:
        data=get(BASE+'/api/subgroup-data?'+urlencode({'group_id':gid,'sub_name':sub['name'],'force_refresh':'1'}))
        if 'data' in data: data=data['data']
        result.update(ok=True,source=data.get('sourceSummary'),sections=[{'title':s['title'],'files':len(s.get('files',[])), 'source':s.get('source'), 'ftpUrl':s.get('ftpUrl')} for s in data.get('sections',[])])
    except Exception as e: result.update(ok=False,error=str(e))
    print(('OK ' if result['ok'] else 'FAIL ')+gid+'/'+sub['name'],flush=True)
    return result

items=[(g['id'],s) for a in areas for g in a['groups'] for s in g['subGroups']]
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    ftp=list(pool.map(ftp_check,ftp_urls))
    http=list(pool.map(http_check,http_urls))
    groups=list(pool.map(subgroup_check,items))

result={'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'base':BASE,'areas':len(areas),'groups':sum(len(a['groups']) for a in areas),'subgroups':len(items),'ftp':ftp,'http':http,'catalog':groups}
RAW.parent.mkdir(parents=True,exist_ok=True)
RAW.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
lines=['# Validação das fontes — Central SUS','',f"Consulta UTC: {result['checked_at']}",'',f"Catálogo preservado: {result['areas']} áreas, {result['groups']} grupos, {result['subgroups']} subgrupos.",'','## Diretórios FTP','', '| Diretório | Resultado |', '| --- | --- |']
for r in ftp:
    lines.append(f"| `{r['url']}` | "+(f"LIST OK · {r['entries']} entradas" if r['ok'] else r['error'].replace('|','/'))+' |')
lines+=['','## Referências web','','| Endereço | Resultado |','| --- | --- |']
for r in http:
    lines.append(f"| {r['url']} | "+(f"HTTP {r['status']} · {r['final_url']}" if r['ok'] else r['error'].replace('|','/'))+' |')
lines+=['','## Catálogo pela aplicação','','| Grupo / subgrupo | Resultado |','| --- | --- |']
for r in groups:
    desc=('Área de consulta preservada: '+r['special']) if 'special' in r else (f"{r.get('source')} · "+'; '.join(f"{s['title']}: {s['files']} itens" for s in r['sections'])) if r['ok'] else r['error']
    lines.append(f"| {r['group']} / {r['subgroup']} | {desc.replace('|','/')} |")
lines+=['','## Limites','', 'Checagem pontual de disponibilidade, não garantia futura. LIST confirma diretórios; não verifica todos os binários, assinatura, segurança de instaladores ou validade normativa. HTTP 200 não garante conteúdo atualizado. Falha de rede não prova remoção da fonte. Nenhum material é removido em função desta checagem.']
REPORT.write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(f'Report: {REPORT}',flush=True)
