# Central SUS · audit e critique

Data: 02/11/2026. Revisão baseada em f413217.

Método: revisão de interface, inspeção técnica, correções e validação em navegador. Os resultados apresentados não constituem certificação independente de acessibilidade.

## Diagnóstico e alterações

| Achado | Efeito | Correção implementada |
| --- | --- | --- |
| Proposta anterior escura e nome indefinido | Não representava a preferência do responsável | Central SUS; branco, azul céu e menta; azul mais aberto em ações |
| Entrada direto em BPA | Escondia a amplitude do produto | Página inicial por atividades, gerada do catálogo completo |
| Abas e marca ocultas no telefone | Dificultava reconhecer o produto e mudar de tarefa | Marca legível e quatro destinos sempre presentes |
| Baixar fora da tela no celular | Exigia descobrir a rolagem da tabela | Coluna de ação fixa, mantendo UF e histórico; orientação de rolagem |
| SIGTAP com formulário excessivamente longo | Ação principal além da primeira tela | Busca prioritária; filtros e comparativo em seções recolhíveis |
| Atalhos municipais disputavam espaço | Atrasavam leitura dos resultados | Lista recolhível; nome dos municípios conhecidos nos resultados |
| Siglas sumiam em tablets | Reduzia reconhecimento de CNES/SIGTAP | Siglas mantidas em todas as larguras |
| Contraste azul/tonal 4,49:1 | Limítrofe abaixo de 4,5:1 | Azul ajustado para #1472B5 e rechecado |
| Status estáticos de servidores ativos | Sugeriam verificação que não existia | Removidos; fontes e modo real continuam nas consultas |
| Modal de busca com aria-hidden permanente | Conteúdo aberto podia permanecer oculto para leitores | Estado sincronizado, combobox/options, foco contido e restaurado |
| Remessas carregadas ao abrir qualquer página | Rede gasta antes da tarefa | Carregamento sob demanda |
| Dois links de catálogo e um de rodapé inválidos | Quebra de acesso a referências | Destinos oficiais conferidos e corrigidos |

O símbolo é um C aberto com núcleo central, alusivo a reunião e acesso a materiais. É autoral e não reproduz a cruz institucional do SUS ou os símbolos dos outros produtos do kit. Assinatura horizontal, vertical, monocromática, negativa, favicon e PNG entregues. Lettering convertido em contornos para independência de fonte no arquivo SVG.

## Referências utilizadas

Foi feita uma seleção dos catálogos e componentes relevantes; não uma inspeção de cada item das bibliotecas.

| Referência | Elementos estudados | Aplicação |
| --- | --- | --- |
| [Uiverse](https://uiverse.io/cards) | Cards, botões, campos e estados de hover | Feedback leve de elevação, foco e ações de download tonais |
| [Aceternity](https://ui.aceternity.com/components/expandable-card) | Cards expansíveis e organização de componentes de navegação | Divulgação progressiva em filtros e comparação; hierarquia de tarefas |
| [React Bits](https://github.com/DavidHDev/react-bits) | Biblioteca de entradas animadas e componentes interativos | Ilustração vetorial com entrada coordenada, movimento de seta em hover |
| [21st.dev](https://21st.dev/community/components) | Navigation, Sidebar, Cards e Interactive Hover Button | Barra persistente, aba ativa tonal, cards com links por sistema |
| [Mobbin](https://mobbin.com/discover/apps/web/latest) | Página pública de descoberta | Conteúdo detalhado limitado pelo login; nenhum fluxo privado foi usado como evidência |

O código é próprio, em PHP/CSS/JavaScript nativo. Não foram importadas bibliotecas React nem copiados componentes pagos. Jakarta permanece por ser parte da marca TI Saúde; fonte local e licença OFL incluídas.

## Impeccable

Roteiros `audit` e `critique` da versão 4.8.0, obtida do [repositório oficial](https://github.com/pbakaus/impeccable). A revisão A registrou **29/40** antes da última rodada de correções. Esse número é julgamento heurístico, não métrica automática; não foi aumentado artificialmente após as correções. Detalhamento das dez heurísticas e oportunidades em `review-after-A.md`.

Detector inicial no frontend: quatro avisos de bordas laterais grossas do CSS legado e um de fonte frequente. As bordas foram ajustadas. Detector final em `public`: **um aviso**, `overused-font`, em `central.css:3`. Mantido conscientemente porque Jakarta é a fonte solicitada pelo sistema de marca. Não houve overlay de auditoria apresentado como produto.

## Evidências de validação

- **29 testes PHP passaram**, incluindo proteção do catálogo legado. O teste de equivalência normaliza somente os dois destinos oficiais corrigidos e continua protegendo todo o restante do catálogo.
- Templates PHP e módulos JS alterados passaram na checagem de sintaxe.
- Simulação DOM verificou 18 destinos, busca, foco, sidebar, temas, inicialização sob demanda e hash malformado.
- Playwright com Edge local: Início, BPA, SIGTAP, comparativo e Remessas. Busca global SCNES, filtro vazio/restauração, tema, menu móvel, Escape e movimento reduzido verificados.
- **axe-core: zero violações detectadas** nos testes WCAG 2 A/AA e 2.1 AA das quatro telas em 1440 e 390 px. Não equivale a certificação WCAG nem substitui teste com leitores de tela.
- Sem overflow do documento nas larguras 320, 390, 768, 1024 e 1440 px; tabelas têm rolagem localizada. Na tela de arquivos de 390 px, o botão Baixar foi verificado dentro do viewport. No SIGTAP, Pesquisar termina em aproximadamente y=608 px.
- Tema escuro: amostragem de contrastes da home nas quatro larguras da revisão B sem falhas após a correção. Não foi feita auditoria completa de todo conteúdo histórico em tema escuro.
- `prefers-reduced-motion` desativa a entrada decorativa e preserva a composição final. Não há movimento contínuo que dispute atenção com dados.
- Erro de fonte simulado com HTTP 503: mensagem e botão de repetir confirmados; recuperação com dados reais. Histórico aberto/fechado e mudança para UF SP confirmada. Download pelo botão do navegador concluído com nome BPA_LEIAME.txt.
- 15 diretórios FTP com LIST bem-sucedido; 16 subgrupos de arquivos com conteúdo, 2 áreas especiais preservadas. Download real de TXT comparado byte a byte e por SHA-256. Detalhes em `VALIDACAO-FONTES.md`.
- Capturas finais em `docs/screenshots/central-sus-*`. `validation.json` guarda resultados da última bateria de navegador. Capturas `review-A-*` documentam a etapa anterior às últimas correções.

## Limites e próximos refinamentos

Não houve publicação, renomeação do repositório/domínio ou alteração de produção. Histórico, versões por UF e origens FTP permanecem. Não foram executados instaladores nem baixadas bases nacionais grandes.

Busca de município por nome, favoritos e documentação de todas as siglas são melhorias de produto futuras, fora desta revisão visual. A tabela mantém scroll para todas as colunas no celular; a ação principal passou a permanecer visível. A cobertura de leitor de tela e zoom nativo a 200% continua recomendada antes de implantação; a validação de larguras não foi contabilizada como esse teste.
