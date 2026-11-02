# Assessment A — Central SUS, implementação final

Método: avaliação independente A; nenhum resultado do detector ou de B foi consultado. Fonte local e navegador Chromium/Edge headless, contexto próprio. URL http://127.0.0.1:8097. Inspeção visual em 1440, 1024, 768 e 390px; Início, SIGTAP, Remessas e BPA. Capturas com animations: disabled em docs/screenshots/review-A-*.png. Apenas relatório e scripts/capturas de QA foram escritos; código do produto não foi alterado.

## Veredito de especificidade

A interface tem identidade suficiente para Central SUS: símbolo C com ponto de conexão, azul vivo com verde menta, ilustração de documentos que reaproveita a marca, organização por atividades de saúde pública e linguagem portuguesa concreta. A página inicial passa segurança e leveza, atendendo à direção clara solicitada. A composição de cartões ainda é convencional, mas o catálogo e os atalhos tornam o produto reconhecível. A principal oportunidade agora está nas ferramentas em telas pequenas, cuja densidade e disposição ainda refletem uma aplicação desktop.

## Nielsen — 29/40, bom

| # | Heurística | Nota | Evidência e limite |
|---|---|---:|---|
| 1 | Visibilidade de estado | 3 | Aba e item lateral ativos, skeletons, totais, fonte/cache e mensagens de carregamento. Alguns sinais de origem continuam técnicos. |
| 2 | Linguagem e mundo real | 3 | Títulos como Faturamento ambulatorial e Cadastros de saúde ajudam; LEDI, FPO, RAAS, LogCarga e FTP exigem familiaridade. |
| 3 | Controle e liberdade | 3 | Início, hash routes, Escape e restauração de foco da busca; filtros editáveis. Falta ação clara de limpar filtros nos resultados vazios. |
| 4 | Consistência e padrões | 3 | Marca, cores, botões, bordas e navegação coesos. Siglas somem dos cards em larguras intermediárias; Remessa/Remessas e Consulta & Comparativo/Comparar competências variam. |
| 5 | Prevenção de erros | 3 | Selects de competência/ano/grupo, comparação inválida bloqueada, indicação de 6 ou 7 dígitos IBGE. Exigir código de município aumenta risco de consulta do local errado. |
| 6 | Reconhecimento em vez de memorização | 3 | Cards descritivos, catálogo completo e busca global. Em tablet, retirada de siglas reduz reconhecimento; Outros é pouco informativo. |
| 7 | Flexibilidade e eficiência | 3 | Ctrl/Cmd K, setas/Enter/Escape na busca, filtro de arquivos, atalhos municipais, links diretos. Sem favoritos/recentes para rotina recorrente. |
| 8 | Estética e minimalismo | 3 | Paleta clara elegante e hierarquia boa. Menu extenso duplica catálogo na home, cartões pouco povoados ficam altos e o SIGTAP mobile tem espaçamento excessivo. |
| 9 | Diagnóstico e recuperação | 3 | Erros com alertas e tentativa novamente, estados vazios e preservação dos campos no fonte. Estado sem resultados não oferece limpar ou ajustar filtros diretamente. |
| 10 | Ajuda e documentação | 2 | Descrições dos cards, origem e links de referência/Wiki disponíveis. Falta ajuda contextual para código IBGE, competências e siglas de arquivos. |

## Prioridades concretas

1. **P1 — Ação principal de arquivos escondida à direita no celular.** Em 390px, BPA mostra uma tabela de 860px dentro de 356px: o usuário vê o nome do arquivo e um pedaço da data, enquanto Baixar fica fora da área inicial. Remessas tem 960px e SIGTAP 910px. A rolagem interna evita overflow da página, mas não há instrução visual clara; wrappers também não têm rótulo nem tabindex explícitos. **Correção:** em mobile, fixar nome e ação/estado útil, ou apresentar cada linha como bloco compacto expansível; preservar tabela para telas maiores. Enquanto houver scroll, exibir dica “Deslize para ver as outras colunas” e região acessível. Comando sugerido: /impeccable adapt.
2. **P2 — SIGTAP demora uma tela inteira para chegar a Pesquisar.** Em 390×844, depois do cabeçalho e origem, o bloco inicia em y≈320, o título em y≈364, e Competência só em y≈470; Pesquisar fica parcialmente abaixo da primeira tela. O espaço de respiro deixa de ajudar uma tarefa operacional. **Correção:** reduzir padding e distância entre título e campos no mobile, encurtar o título da seção, e recolher Comparar competências até solicitado. Comando: /impeccable distill.
3. **P2 — Siglas identificadoras desaparecem em tablet e desktop estreito.** Nos cards de 768/1024, badges SIA/SIGTAP/CNES não aparecem, embora reapareçam em 390 e 1440. Especialistas chegam procurando CNES ou SIGTAP, e o menu fica recolhido em 768. **Correção:** preservar a sigla, permitindo quebra em linha própria ou incluindo-a no título; não escondê-la por largura intermediária. Comando: /impeccable adapt.
4. **P2 — IBGE exige conhecimento prévio, e os atalhos consomem espaço.** Em Remessas mobile o formulário e cinco municípios pré-fixados ocupam quase toda a tela antes dos resultados. O título do resultado confirma apenas IBGE 410965, sem nome municipal, tornando uma seleção errada menos evidente. **Correção:** oferecer busca por nome/UF com código complementar; mostrar município selecionado no resultado e trocar lista fixa por recentes/favoritos ou uma linha recolhível. Comando: /impeccable clarify.
5. **P3 — Faixa vazia no cabeçalho em 768px.** As abas já cabem na primeira linha, mas o header continua reservando a altura de duas linhas até y≈116. **Correção:** alinhar breakpoint de altura ao empilhamento real ou deixar o grid determinar altura. Comando: /impeccable polish.

## Carga cognitiva

A home oferece quatro abas principais, dois atalhos claros e grupos com textos explicativos: hierarquia manejável. Entretanto, há seis cartões de áreas e grupos de cinco links cada (SIA, SIGTAP e CNES), além do catálogo lateral expandido no desktop; são decisões com mais de quatro opções, mitigadas por agrupamento e busca. A duplicação lateral/home ainda aumenta o ruído para quem entra pela primeira vez. SIGTAP mostra busca e comparação simultaneamente, exigindo que o usuário decida qual modo pretende usar antes da tarefa. Remessas adiciona cinco municípios às escolhas de código/ano; em mobile a seleção ofusca os resultados. Outros e LEDI são pontos de tradução mental. Não há necessidade de remover materiais: usar agrupamento e divulgação progressiva preserva todo o catálogo.

## Jornada emocional

Entrada luminosa, logotipo próprio e copy simples dão boas-vindas sem tom promocional excessivo. O pico útil são os dois atalhos de tarefa. A nota de independência e origem dos materiais tranquiliza quanto à procedência. O vale ocorre depois, no celular, quando o formulário SIGTAP se alonga ou o download fica fora da tabela visível. No encerramento da consulta, totais e estados de processamento dão confirmação; o nome do município deveria reforçar essa segurança.

## Pontos fortes

- Azul e menta em superfícies claras têm caráter de serviço de saúde contemporâneo; não há painel escuro dominante ou decoração pesada.
- Cards preservam todos os grupos e explicam sua utilidade, com dois atalhos operacionais mais proeminentes e busca acessível por teclado.
- Nas quatro larguras inspecionadas não houve overflow horizontal do documento; a home adapta bem de duas colunas para uma, e o selo de ferramenta independente é honesto.

## Personas — alertas específicos

- **Alex, profissional recorrente:** encontra SIGTAP por Ctrl K e navega bem, mas a ausência de recentes/favoritos repete a busca do mesmo material. A sigla escondida em 768/1024 atrapalha a leitura rápida do diretório.
- **Sam, usuário de teclado/baixa visão:** skip link, foco e busca por teclado ajudam. A região horizontal das tabelas precisa de nome/instrução e acesso de teclado explícito; não se deve depender de perceber um recorte lateral para descobrir Baixar. Esta é uma observação de markup e layout, não um teste completo com leitor de tela.
- **Casey, celular e atenção dividida:** home funciona bem; BPA deixa a ação de download fora da visão inicial e SIGTAP exige rolar antes de Pesquisar. Remessas traz cinco atalhos de cidades em espaço valioso e confirma só o código municipal.

## Observações menores

- FTP e caminhos longos são úteis como referência, mas podem ficar em disclosure Fonte para liberar espaço vertical no mobile.
- Cards com um link herdam altura dos cartões com cinco; aceitável como grade, mas há oportunidade de compactação.
- A ilustração some corretamente no telefone, sem sacrificar conteúdo.
- Fonte e motion reduced estão contemplados no código; não foi feita avaliação de conforto temporal nem auditoria formal WCAG.

## Questões de produto

- O município habitual poderia ser lembrado e aparecer por nome na próxima visita?
- A consulta SIGTAP pode começar com apenas competência + termo, expondo filtros adicionais sob demanda?
- Qual informação precisa estar visível para baixar com confiança no telefone: data completa ou nome, competência e ação?

Questions skipped: tarefa de avaliação delegada; questões acima são insumos de produto, sem necessidade de confirmação para o relatório.
