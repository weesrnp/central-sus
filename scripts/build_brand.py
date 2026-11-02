"""Generate portable SVG wordmarks with outlined Plus Jakarta Sans lettering.
Development dependency: fonttools. Source font is bundled under OFL.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/assets/img'
SOURCE = ROOT / 'public/assets/fonts/Jakarta.woff2'

def lettering(text, x, y, size, color, weight=700):
    font=instantiateVariableFont(TTFont(SOURCE),{'wght':weight})
    glyphs=font.getGlyphSet(); cmap=font.getBestCmap(); upm=font['head'].unitsPerEm
    scale=size/upm; cursor=0; paths=[]
    for char in text:
        name=cmap[ord(char)]; pen=SVGPathPen(glyphs);glyphs[name].draw(pen)
        if pen.getCommands(): paths.append(f'<path transform="translate({cursor} 0)" d="{pen.getCommands()}"/>')
        cursor+=font['hmtx'][name][0]
    return f'<g transform="translate({x} {y}) scale({scale} {-scale})" fill="{color}">'+''.join(paths)+'</g>', cursor*scale

def symbol(blue='#1472B5',mint='#45B8A3'):
    return f'<path d="M44 17a20 20 0 1 0 0 30" fill="none" stroke="{blue}" stroke-width="8" stroke-linecap="round"/><rect x="29" y="26" width="12" height="12" rx="4" fill="{mint}"/>'

def logo(fg='#263E48', blue='#1472B5', mint='#45B8A3'):
    central,width=lettering('Central ',78,42,30,fg)
    sus,_=lettering('SUS',78+width,42,30,blue)
    sub,_=lettering('Por Wees Dev',80,65,12,fg,500)
    return '<g transform="translate(0 8)">'+symbol(blue,mint)+'</g>'+central+sus+sub

def svg(w,h,content,title):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img"><title>{title}</title>{content}</svg>'

for name,content in [('central-sus-logo',logo()),('central-sus-logo-negative',logo('#FFFFFF','#FFFFFF','#FFFFFF')),('central-sus-logo-mono',logo('#263E48','#263E48','#263E48'))]:
    (OUT/f'{name}.svg').write_text(svg(300,80,content,'Central SUS — Por Wees Dev'),encoding='utf-8')

stack='<g transform="translate(118 0)">'+symbol()+'</g>'
word,width=lettering('Central SUS',0,106,28,'#263E48')
stack+=f'<g transform="translate({(300-width)/2} 0)">{word}</g>'
sub,width=lettering('Por Wees Dev',0,134,12,'#53656E',500)
stack+=f'<g transform="translate({(300-width)/2} 0)">{sub}</g>'
(OUT/'central-sus-stacked.svg').write_text(svg(300,152,stack,'Central SUS — assinatura vertical'),encoding='utf-8')

board='<rect width="1080" height="580" rx="24" fill="#F7F9FA"/><rect x="32" y="32" width="1016" height="316" rx="20" fill="#FFFFFF"/>'
label,_=lettering('Central SUS / Identidade visual',64,75,16,'#53656E',500);board+=label
board+='<g transform="translate(240 145) scale(2)">'+logo()+'</g>'
board+='<rect x="32" y="372" width="310" height="176" rx="18" fill="#263E48"/><g transform="translate(60 420) scale(.9)">'+logo('#FFFFFF','#FFFFFF','#FFFFFF')+'</g>'
colors=[('#1472B5','Azul aberto'),('#EAF5FD','Azul céu'),('#E2F4EC','Menta suave'),('#FFFFFF','Branco')]
for i,(color,name) in enumerate(colors):
    x=366+i*174
    board+=f'<rect x="{x}" y="372" width="160" height="106" rx="14" fill="{color}" stroke="#DCE6E9"/>'
    line,_=lettering(name,x,506,14,'#263E48',600);board+=line
    line,_=lettering(color,x,529,12,'#53656E',400);board+=line
(ROOT/'assets/central-sus-identidade.svg').write_text(svg(1080,580,board,'Identidade Central SUS: assinatura, versão negativa e paleta clara'),encoding='utf-8')
(ROOT/'assets/banner.svg').write_text(svg(1080,280,'<rect width="1080" height="280" rx="20" fill="#F7F9FA"/><g transform="translate(300 54) scale(1.6)">'+logo()+'</g>'+lettering('Arquivos, tabelas e remessas do SUS',315,226,21,'#53656E',500)[0],'Central SUS'),encoding='utf-8')
print('Logo outlined, negative, monochrome, stacked, brand board and README banner generated.')
