# Validação das fontes — Central SUS

Consulta UTC: 2026-11-02T19:02:59.432115+00:00

Catálogo preservado: 4 áreas, 6 grupos, 18 subgrupos.

## Diretórios FTP

| Diretório | Resultado |
| --- | --- |
| `ftp://arpoador.datasus.gov.br/cnes/` | LIST OK · 7595 entradas |
| `ftp://arpoador.datasus.gov.br/siasus/BPA/` | LIST OK · 3 entradas |
| `ftp://arpoador.datasus.gov.br/siasus/LogCarga/` | LIST OK · 21 entradas |
| `ftp://arpoador.datasus.gov.br/siasus/SIA/` | LIST OK · 240 entradas |
| `ftp://arpoador.datasus.gov.br/siasus/fpo/` | LIST OK · 4 entradas |
| `ftp://arpoador.datasus.gov.br/siasus/raas/` | LIST OK · 7 entradas |
| `ftp://ftp.datasus.gov.br/cnes/` | LIST OK · 7595 entradas |
| `ftp://ftp.datasus.gov.br/cnes/Download/` | LIST OK · 83 entradas |
| `ftp://ftp.datasus.gov.br/cnes/Versoes-Fces-Nacional/` | LIST OK · 190 entradas |
| `ftp://ftp.datasus.gov.br/dissemin/publicos/PNI/` | LIST OK · 3 entradas |
| `ftp://ftp.datasus.gov.br/dissemin/publicos/PNI/AUXILIARES/` | LIST OK · 79 entradas |
| `ftp://ftp.datasus.gov.br/dissemin/publicos/PNI/DOCS/` | LIST OK · 8 entradas |
| `ftp://ftp.datasus.gov.br/tabwin/tabwin/` | LIST OK · 6 entradas |
| `ftp://ftp2.datasus.gov.br/pub/sistemas/tup/downloads/` | LIST OK · 237 entradas |
| `ftp://ftp2.datasus.gov.br/public/sistemas/tup/downloads/notastecnicas/` | LIST OK · 227 entradas |

## Referências web

| Endereço | Resultado |
| --- | --- |
| https://datasus.saude.gov.br/transferencia-de-arquivos/ | HTTP 200 · https://datasus.saude.gov.br/transferencia-de-arquivos/ |
| https://egestorab.saude.gov.br/ | HTTP 200 · https://egestoraps.saude.gov.br/ |
| https://sisab.saude.gov.br/ | HTTP 200 · https://sisab.saude.gov.br/ |
| https://sisaps.saude.gov.br/esus/ | HTTP 200 · https://sisaps.saude.gov.br/esus/ |
| https://sisaps.saude.gov.br/sisvan/ | HTTP 200 · https://sisaps.saude.gov.br/sisvan/ |
| https://wiki.saude.gov.br/sia/index.php/Portal_do_SIA | HTTP 200 · https://wiki.saude.gov.br/sia/index.php/Portal_do_SIA |
| https://www.gov.br/saude/pt-br/vacinacao/calendario | HTTP 200 · https://www.gov.br/saude/pt-br/vacinacao/calendario |

## Catálogo pela aplicação

| Grupo / subgrupo | Resultado |
| --- | --- |
| SIA / BPA | FTP_DIRECT · Instaladores e Versões BPAMAG: 3 itens; BDSIA — Base de Dados SIA: 2 itens; EQUIPES ESF BRASIL (CNES): 2 itens |
| SIA / SIA | FTP_DIRECT · Aplicativo SIA & Notas de Versão: 2 itens; BDSIA — Competências Mensais: 2 itens; Outros Utilitários SIA: 5 itens |
| SIA / FPO | FTP_DIRECT · Aplicativo e Atualizações FPOMAG: 3 itens |
| SIA / RAAS | FTP_DIRECT · Instaladores RAAS: 7 itens; BDSIA — Base de Dados SIA: 2 itens; EQUIPES ESF BRASIL (CNES): 2 itens |
| SIA / Remessa | Área de consulta preservada: remessa |
| SIGTAP / Tabelas | FTP_DIRECT · Pacotes Mensais da Tabela Unificada: 1 itens |
| SIGTAP / Aplicativo | FTP_DIRECT · Instalador do SIGTAP: 3 itens |
| SIGTAP / Nota Técnica | FTP_DIRECT · Notas Técnicas Oficiais (PDF/ZIP): 1 itens |
| SIGTAP / Outros | FTP_DIRECT · Layouts e Utilitários TUP: 2 itens |
| SIGTAP / Consulta & Comparativo | Área de consulta preservada: sigtap |
| CNES / Aplicativo SCNES | FTP_DIRECT · Versões SCNES (Completa e Atualização): 2 itens; Leia-me de Versão SCNES: 2 itens |
| CNES / Arquivos da aplicação | FTP_DIRECT · Arquivos Nacionais da Aplicação CNES: 17 itens; Arquivo Único por UF: 1 itens |
| CNES / Arquivos para outros sistemas | FTP_DIRECT · Arquivos para Outros Sistemas: 8 itens |
| CNES / Base de dados | FTP_DIRECT · Base de Dados Nacional (mensal): 1 itens |
| CNES / Outros | FTP_DIRECT · Demais Arquivos do Diretório CNES: 31 itens |
| ESUS_APS / Equipes & LEDI | FTP_DIRECT · Equipes ESF Brasil (importação mensal): 2 itens; Equipes, Profissionais e Saúde Indígena (CNES): 3 itens |
| VIG_IMUNIZACAO_AMBIENTAL / PNI (histórico) | FTP_DIRECT · Notas Técnicas de Cobertura e Doses Aplicadas (PDF): 8 itens; Definições e Conversões para TabWin (DEF / CNV): 79 itens |
| TABWIN_DISSEMIN / TabWin | FTP_DIRECT · Instalador, Manual e Utilitários: 5 itens |

## Limites

Checagem pontual de disponibilidade, não garantia futura. LIST confirma diretórios; não verifica todos os binários, assinatura, segurança de instaladores ou validade normativa. HTTP 200 não garante conteúdo atualizado. Falha de rede não prova remoção da fonte. Nenhum material é removido em função desta checagem.

## Correções verificadas nesta revisão

- Wiki SIA: `/siasus/` retornou 404. Corrigido para https://wiki.saude.gov.br/sia/index.php/Portal_do_SIA (HTTP 200).
- Calendário de vacinação: o caminho antigo redirecionava ao login. Corrigido para https://www.gov.br/saude/pt-br/vacinacao/calendario (HTTP 200, conteúdo público).
- SIGTAP Web no rodapé: `sigtap.saude.gov.br` não resolveu no DNS. Corrigido para http://sigtap.datasus.gov.br/tabela-unificada/app/sec/inicio.jsp (HTTP 200 e título do sistema). Endereço confirmado pelo atendimento oficial: https://webatendimento.saude.gov.br/faq/sigtap.
- O e-Gestor AB redireciona corretamente para `egestoraps.saude.gov.br`; referência mantida.

## Download real e consultas

- `BPA_LEIAME.txt`: 68.223 bytes baixados pela rota `/api/ftp-download`, idênticos ao FTP direto. SHA-256 de ambos: `5d94ae75585a8f9dca2f8a253a8fd46a28fbbe1c267e499021ffa990e87933b9`.
- SIGTAP 10/2026: 5.039 procedimentos na base; busca por `consulta` respondeu. Comparação 09/2026 → 10/2026: 17 inclusões, 2 exclusões, 1 alteração de valor, 3 alterações de regra retornadas pelo motor existente.
- Remessas 410965/2026: resposta real carregada e renderizada. A aplicação consulta processamento; não envia remessas.
- O material SIGTAP Desktop foi preservado como solicitado. O atendimento oficial informa sua descontinuação; a disponibilidade de instalador no FTP não implica manutenção ou recomendação de uso atual.

Download pelo botão da interface também confirmado: 68,223 bytes, SHA-256 `5d94ae75585a8f9dca2f8a253a8fd46a28fbbe1c267e499021ffa990e87933b9`.
