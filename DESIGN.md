# DESIGN · Central SUS

Padrão adotado: TI Saúde · Sistema de Design HS 1.0.0. Revisão: 02/11/2026.
Nome escolhido pelo responsável. Redesign implementado localmente, sem publicação. Este documento substitui a proposta anterior Central HS e segue os campos de NOVO-PROJETO.md.

## Finalidade e contexto

- Centralizar arquivos e materiais dos sistemas públicos de saúde, consultas SIGTAP e acompanhamento de remessas SIA.
- Tarefa prioritária: encontrar o material correto e baixar; pesquisar procedimentos, comparar competências e consultar processamento.
- Público inferido das funções: profissionais de faturamento, cadastro, TI e gestão municipal. Não houve pesquisa formal com usuários.
- Web responsiva para trabalho administrativo, com acesso público.
- Repositório: https://github.com/weesrnp/SUS-systems. Base f413217.
- Kit original copiado integralmente em design-system/. Sua documentação não foi reescrita para adaptar este produto.
- PHP, templates e JavaScript nativo. Sem novo framework ou dependências de produção para animações.

## Identidade

- Nome público: **Central SUS**. Nome técnico do repositório: SUS-systems; namespace SusSystems e constante SUS_ROOT preservados.
- Descritor: **Arquivos, tabelas e remessas do SUS**.
- Perfil: **base**, com exceção de paleta própria registrada abaixo, conforme rejeição explícita do navy pelo responsável.
- Assinatura: Central SUS · Por Wees Dev. Ferramenta independente; não se atribui autoria ao Ministério da Saúde ou endosso municipal.
- Símbolo: C aberto com núcleo central arredondado. Referência a centralização e acesso, sem cruz hospitalar ou brasão. Malha de 64 unidades; contorno 8 unidades; núcleo 12 × 12 e raio 4.
- Assinaturas: horizontal, vertical, negativa e monocromática; SVG com texto convertido em contornos, PNG, favicon SVG/ICO e ícone Apple. Fontes em public/assets/img/central-sus-*. Arquivos gerados por scripts/build_brand.py.
- Tipografia: Plus Jakarta Sans local (200–800), licença OFL copiada. Corpo 14–16 px; textos auxiliares 11–13 px; dados técnicos em monoespaçada do sistema e números tabulares. Componentes densos do legado receberam ajustes progressivos.

### Paleta implementada

| Papel | Claro | Escuro opcional |
| --- | --- | --- |
| Ação e identificação | #1472B5 | #8ECFFC |
| Hover de ação | #115F98 | #B2DFFF |
| Seleção e superfície azul céu | #EAF5FD | #263E4D |
| Menta suave decorativa | #E2F4EC | #29463C |
| Núcleo da marca | #45B8A3 | #79D2BA |
| Canvas | #F7F9FA | #182126 |
| Superfície | #FFFFFF | #202D33 |
| Texto principal | #263E48 | #EDF4F6 |
| Texto secundário | #465D67 | #C6D6DC |
| Texto auxiliar | #5C7079 | #AFBEC4 |
| Borda de divisão | #DCE6E9 | #3C535E |
| Borda de campos | #859BA5 | #829DA9 |

Branco, azul céu e menta foram a direção escolhida para esta implementação; somente o nome e a preferência geral por clareza foram explicitamente aprovados pelo responsável. O contraste motivou ajuste final de #1674B8 para #1472B5, sem escurecer as superfícies.

## Interface

- Modo de uso: Operate. Densidade confortável na entrada e eficiente nas tabelas.
- Claro padrão; preferência escura existente preservada. A home não faz consultas pesadas em segundo plano.
- Navegação: Início, Arquivos, SIGTAP e Remessas. Identidade permanece visível no celular.
- Entrada: título, busca global, dois atalhos de consulta e diretório gerado do catálogo. Quatro áreas, seis grupos e 18 subgrupos preservados.
- Catálogo: arquivos antes das referências; nomes, data FTP, tamanho, UF, download e histórico mantidos. Data relativa redundante oculta; data absoluta preservada. Botões de download tonais.
- Celular: ação Baixar fixa na borda direita da tabela; instrução de rolagem e região focável para demais colunas. Não se omite histórico nem seleção de UF.
- SIGTAP: busca por competência e termo como tarefa principal. Filtros adicionais e comparação em disclosures nativos; indicador de filtros ativos. Cálculos existentes preservados.
- Remessas: formulário antes de atalhos municipais recolhíveis; nomes dos municípios conhecidos aparecem nos resultados, e códigos desconhecidos continuam identificados por IBGE.
- Fonte de dados e cache expostos pelas consultas. Removidos indicadores estáticos que alegavam disponibilidade contínua.
- Componentes: estrutura e semântica de tokens, cards, campos, botões, tabelas, alerts e foco inspiradas no perfil base; classes do projeto preservadas, com implementação específica em public/assets/css/central.css.
- Cards 16–18 px; campos 10–12 px; bordas finas, sombras suaves deslocadas. Foco visível, seleção e caret tematizados.
- Motion: uma sequência de montagem da ilustração de documentos, transições de navegação, elevação e seta em hover. Sem animação infinita decorativa. prefers-reduced-motion preserva o estado final sem deslocamento.
- Busca: Ctrl/Cmd K, setas, Enter e Escape; combobox com options, foco contido e restaurado, fundo inert. Drawer móvel com foco contido e Escape.
- Estados: carregando, preenchido, vazio, erro com repetir, seleção de UF pendente e cache conservados. Sem estatísticas inventadas ou promessas de disponibilidade.
- Gráficos e impressão não fazem parte da funcionalidade existente nem foram adicionados nesta revisão.

## Semântica do domínio

- Materiais vêm dos três hosts FTP DATASUS permitidos. Os links web são referências externas.
- Menta na home diferencia o atalho de Remessas; não indica processamento bem-sucedido.
- Verde em dados: sucesso identificado pelo motor existente. Vermelho: erro/rejeição. Neutro: situação não classificada ou ausência de dados. Sem novos limiares clínicos.
- Comparativo: inclusão, exclusão, valores e alguns campos de tb_procedimento; não se chama de auditoria oficial completa de todas as regras.
- Data FTP não garante vigência normativa. Disponibilidade de binário não comprova manutenção atual do aplicativo.
- Remessas são consultadas, não enviadas. Processamento não significa pagamento aprovado.
- Autoria do portal é distinta da origem oficial de arquivos e tabelas.

## Exceções

| Regra do kit | Necessidade | Solução e escopo | Evidência / revisão |
| --- | --- | --- | --- |
| Navy e azul do perfil base | Responsável rejeitou cor escura e pediu direção clara moderna | Paleta Central SUS com superfícies branco/céu/menta, identidade preservada pela fonte e disciplina de componentes | Capturas e contrastes em docs/screenshots |
| Verde restrito a estado | Responsável pediu nova exploração de cores | Menta usada como superfície decorativa na home; resultado de remessa sempre acompanhado de texto de estado | Sem vínculo entre cor da área e disponibilidade/sucesso |
| Tamanhos confortáveis | Catálogo técnico tem nomes longos e muitas colunas | 11–13 px auxiliares e tabelas; ações acessíveis, scroll próprio e download fixo no celular | Telas reais 320–1440 px, axe e revisão visual |
| Símbolo HS existente | Produto precisa identidade própria | Símbolo C/núcleo; endosso Por Wees Dev | Prancha assets/central-sus-identidade.png |
| Fonte frequente segundo detector | Consistência com marca do responsável | Jakarta mantida com licença local | Único aviso Impeccable final; decisão intencional |

## Validação

- 29 testes PHP; sintaxe de templates e módulos JavaScript; equivalência integral do catálogo, normalizando somente duas URLs corrigidas.
- Desktop 1440 px; celular 390 px; home adicional em 320, 768 e 1024 px. Nenhuma rolagem horizontal do documento nas larguras testadas.
- Navegação, busca, foco, Escape, drawer, temas, filtro vazio, consulta/comparação SIGTAP e remessas testados com Playwright/Edge.
- axe: zero violações detectadas nas quatro telas principais em 1440 e 390 px, regras WCAG 2 A/AA e 2.1 AA. Não constitui certificação de acessibilidade.
- Medições pontuais de contraste claro/escuro da home; movimento reduzido verificado.
- Todos os 15 diretórios FTP consultados; arquivos dos 16 subgrupos respondendo; TXT baixado e comparado com original. Três links web corrigidos, preservando materiais.
- Fonte e licença locais; SVGs autorais; referências usadas como inspiração, sem incorporar React ou código pago.
- Zoom nativo de 200%, leitores de tela completos e todos os estados de rede em todos os conteúdos históricos não foram certificados nesta rodada.
- Capturas usam dados públicos reais consultados, sem informações de pacientes. Evidências e limites em docs/AUDITORIA-CENTRAL-SUS.md e docs/VALIDACAO-FONTES.md.
