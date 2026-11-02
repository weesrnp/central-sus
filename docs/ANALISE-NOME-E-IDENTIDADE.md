> Registro histórico da primeira análise. Em 02/11/2026, o responsável escolheu **Central SUS** e solicitou uma nova paleta clara. As decisões atuais estão em `../DESIGN.md`.

# Análise de nome e identidade · Central SUS

02/11/2026 · Fonte do código: `f413217` da branch main. Análise de produto e design, sem implantação.

## Leitura do produto

O produto é uma central de apoio ao trabalho com os sistemas públicos de saúde. Seu valor é reunir o acesso aos arquivos oficiais e duas consultas operacionais em uma interface mais acessível que os diretórios de origem.

Há três áreas efetivas:

1. **Catálogo de arquivos:** instaladores, versões, bases mensais, documentos, histórico e seleção por UF onde o agrupamento se aplica.
2. **SIGTAP:** pesquisa de procedimentos por nome/código, competência, grupo e financiamento; consulta de valores, complexidade e faixa etária; comparação entre competências e download do pacote.
3. **Remessas SIA:** consulta por município/ano de recebimento, verificação e carga; acesso ao log correspondente.

O catálogo tem quatro macroáreas e seis grupos: SIA, SIGTAP, CNES, e-SUS APS, PNI & SISVAN, TabWin & DBC. Algumas entradas oferecem links oficiais externos, não implementação local de todo o serviço. SISVAN é referência externa; PNI é histórico; instaladores PEC são direcionados ao portal oficial; microdados são encaminhados à página de transferência do DATASUS.

Não encontrei na interface atual envio de faturamento, prontuário, cálculo completo de faturamento municipal, painel de indicadores clínicos ou gestão de pacientes. “Auditoria” no README precisa ser interpretada no alcance limitado do comparativo implementado.

Arquitetura adequada a uma evolução visual incremental: templates PHP separados, CSS centralizado, JavaScript modular, catálogo configurável e domínios isolados. Trocar marca não exige reconstruir o backend ou introduzir framework.

## Observações do site publicado

Naveguei em https://central-sus.vercel.app/ e conferi:

- BPA: arquivos atuais, tamanhos, datas e controles de download; históricos oferecidos para BDSIA e equipes.
- SIGTAP: carregamento da competência 10/2026, tabela de procedimentos e limite de 120 itens por consulta.
- Comparativo 10/2026 contra 09/2026: resposta com 17 inclusões, 1 mudança de valor, 3 mudanças de regra e 2 exclusões.
- Remessas do IBGE 410965 em 2026: 8 registros com situação apresentada pela aplicação.
- Busca global: filtro SCNES retornou o instalador correspondente.
- CNES/Base de dados: arquivo mensal de setembro de 2026, tamanho informado de 710,18 MB e controle de 116 versões anteriores.
- Celular 360 × 800: tabela com rolagem interna; nome da marca oculto, permanecendo apenas o símbolo de cruz; abertura do menu lateral.

O funcionamento das consultas foi observado, mas os dados retornados não foram auditados contra cada arquivo oficial. Não baixei/executei instaladores nem transferi a base de 710 MB. Não foi realizada auditoria completa de acessibilidade.

## Diagnóstico do nome

O nome Central SUS foi escolhido para comunicar o acesso centralizado a materiais e consultas de sistemas públicos de saúde.

Direção recomendada: nome curto em português + descritor funcional. A identidade pode manter o SUS no descritor e nos títulos de busca, mesmo quando ele não fizer parte da assinatura principal.

| Nome | Qualidade principal | Limitação | Leitura |
| --- | --- | --- | --- |
| **Central HS** | Reúne arquivos, consultas e remessas; acompanha a família HS | Precisa de descritor para quem não conhece HS | Melhor equilíbrio para a marca do responsável |
| **Acervo HS** | Comunica organização de arquivos e versões | Menos expressivo para consultas ativas e remessas | Melhor se downloads continuarem sendo o centro |
| **Acesso HS** | Simples, ativo e ligado a facilitar o trabalho | Pode parecer portal de login | Alternativa funcional |
| **Central SUS** | Entendimento imediato do domínio e alcance nacional | Genérico; precisa explicitar autoria independente | Alternativa se alcance nacional pesar mais que família HS |
| **Ponto SUS** | Curto e memorável | Função pouco evidente sem descritor | Alternativa mais aberta de marca |

Outras possibilidades menos recomendadas: Base HS (pode parecer apenas banco de dados), Apoia HS (amplo, próximo de suporte), Fatura HS (estreita demais o escopo), Baixa SUS (limita consultas e cria leitura ambígua), nomes terminados em Pro/Hub/Systems (distanciam a linguagem e a família).

Pesquisa exploratória de nomes na web realizada em 02/11/2026. Não equivale a pesquisa no INPI, disponibilidade de domínio ou exclusividade comercial. Não assumir disponibilidade por ausência de resultados. “Acervo SUS” já aparece em iniciativa de acervo acadêmico municipal; por isso ele não entra na seleção principal.

Referência localizada: Portaria SMS 172/2023 de Santo Antônio de Jesus/BA, https://vozdabahia.com.br/wp-content/uploads/2023/10/2023_10_049876006991.pdf.

## Recomendação de assinatura

**Central HS**  
**Arquivos, tabelas e remessas do SUS**  
Autoria: **TI Saúde · Weslei Neves**.

A fala cotidiana fica natural: “Abre a Central HS e baixa o BPA”; “Consulta a remessa na Central HS”. O nome permite crescer dentro do mesmo trabalho de apoio técnico. Ele não deve ser entendido automaticamente como catálogo de todos os produtos da família HS.

Se o produto for posicionado deliberadamente para profissionais de todo o Brasil, Central SUS é uma alternativa mais autoexplicativa, com TI Saúde como autoria. O kit permite nomes sem HS em produtos de alcance mais amplo; HS é uma preferência de arquitetura de marca, não obrigação técnica.

## Identidade recomendada

O kit diferencia autoria TI Saúde, família HS, identidade de cada produto e eventual endosso institucional. A coerência vem de geometria, fonte, hierarquia, cor por função e comportamento. Não depende de dar uma cor nova a cada ferramenta.

Adotar o perfil **base**, conforme solicitado: navy #0F294A; azul de ação #1D4ED8; fundo tonal #EFF6FF; canvas #F0F4F8; superfícies brancas; Jakarta local; títulos fortes; botões pill; ícones Lucide; cards 16 px e campos 12 px.

Símbolo proposto: catálogo modular ou arquivos que convergem para um ponto central. Manter malha 32 × 32 e linguagem da família, com geometria própria. Evitar mais uma cruz genérica ou o reaproveitamento do símbolo HS-APS.

Para o site, usar cabeçalho tonal com presença da marca e conteúdo direto. Manter o catálogo acessível na entrada; não criar uma página promocional que acrescente passos à rotina.

## Mudanças de interface por prioridade

### Reconhecimento e leitura

- Dar nome e símbolo próprios ao produto e preservar identificação em celular.
- Substituir o ciano predominante pelo perfil base e aplicar cor também em cabeçalho e navegação.
- Ajustar a escala: o CSS atual define raiz de 14 px e vários textos entre 0,65 e 0,8125 rem, resultando em aproximadamente 9,1–11,4 px. Isso fica abaixo do mínimo de 12 px do kit para um projeto novo.
- Usar corpo de 15 px, tabela de 13 px e metadados de pelo menos 12 px, com contraste suficiente.
- Migrar fontes do Google Fonts para os arquivos locais do kit e suas licenças.

### Organização do trabalho

- “Catálogo FTP” → “Arquivos e sistemas”.
- “SIGTAP Explorer & Diff” → “Tabela SIGTAP”.
- No SIGTAP, separar consulta e comparação em áreas locais claras.
- “Calcular Reajustes & Alterações” → “Comparar competências”.
- “Anteriores” → “Versões anteriores”, quando o espaço permitir.
- Exibir “Fonte: DATASUS” com detalhes técnicos recolhíveis e data de consulta.
- Downloads de linha tonais, com o verbo Baixar; preservar acesso a tamanho, UF, versão e histórico.
- Separar o município consultado em remessas da autoria do produto. O cabeçalho atual mostra Honório Serpa fixo mesmo quando a consulta pode ser feita para outra cidade.

### Confiança e estados

- O texto “Gateway DataSUS Ativo” e os pontos verdes dos três servidores são estáticos nos templates. O endpoint health informa ambiente e hosts configurados; não testa disponibilidade FTP de cada servidor.
- “Diff oficial”/“Comparativo oficial” deve ser descrito como comparativo calculado pela ferramenta com dados oficiais. A fonte é oficial; a aplicação faz a comparação.
- Rever correspondência entre selos de conexão e resposta real: ausência de `sourceMode` não prova consulta direta nova.
- Diferenciar vazio de falha, cache de dado recém-consultado e início de consulta de estado preenchido.
- Remover pulsação decorativa permanente; respeitar movimento reduzido.
- Rever teclado nas abas, nome acessível do modal de busca, estado atual dos links e gestão de foco da gaveta. A presença de ARIA isolada não comprova operação completa.

### Coerência documental

`.stitch/DESIGN.md` ainda se chama DownloadSUS Pro e descreve quatro workspaces/seis macroáreas, incluindo módulos ausentes do catálogo atual. A implementação tem três workspaces e quatro macroáreas. O novo DESIGN deve documentar o produto real e identificar propostas futuras separadamente.

O novo DESIGN na raiz registra a direção atual. Ao implementar, reconciliar `.stitch/DESIGN.md`, README, banners, favicons e mensagens públicas para eliminar identidades concorrentes.

## Caminho da renomeação

Primeiro fechar marca pública, descritor e símbolo. Depois atualizar textos de interface, título HTML, metadados, rótulos acessíveis, configuração de nome, favicons e documentação. A chave de tema do navegador deve ter migração/fallback se for alterada, preservando a preferência existente.

Renomear repositório e domínio é uma decisão posterior. Se ocorrer, revisar links externos, badges, scripts e hospedagem e manter transição do endereço antigo. Namespace PHP, constantes internas e endpoints podem continuar com os nomes atuais durante a mudança pública.

## Entregas desta análise

- `DESIGN.md`: ficha preenchida a partir de NOVO-PROJETO.md, com decisões propostas e validações pendentes.
- `design-system/`: cópia de referência do kit fornecido, preservada.
- Este relatório: inventário funcional, observações em produção, alternativas de nome e prioridades da identidade.

O código funcional e a publicação permanecem na versão analisada.

