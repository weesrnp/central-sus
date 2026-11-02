# Fontes e decisões de consolidação

Compilado em 02/11/2026. A referência autoritativa deste kit é DESIGN.md; os arquivos originais permanecem ao lado desta pasta, sem alterações.

## Materiais analisados

| Fonte | Contribuição |
| --- | --- |
| Acompanha HS Analise e Nomes.dc.html | Diagnóstico de nomes, família HS, escolha Acompanha HS, índigo e separação entre marca e status do FAB |
| Identidade Visual HS APS.dc.html | Malha 32, raio 8, cruz modular, navy/azul, assinatura e proteção, Jakarta e identificadores |
| ImunizaHS Identidade Visual.dc.html | Marca Imuniza HS, quatro módulos, azul, assinatura, Outfit/Inter, Android e endosso |
| ImunizaHS Sistema Visual.dc.html | Escala de nove papéis, botões pill, raios, Lucide, filtros, badges e navegação |
| Chat “Aplicar novo branding ao projeto” | Histórico da implementação e aprovação do usuário para a revisão com mais contraste, cor e corpo visual |
| Acompanha: acompanhahs-brand/DESIGN.md e docs/BRANDING_APLICADO.md | Revisão 1.4.1: cabeçalho lilás, títulos fortes, abas ativas, grupos, cards, tokens, evidências e limites |
| Acompanha: CSS em execução, assets e docs/branding | Confirmação da apresentação efetiva, fonte local e capturas sintéticas |
| Imuniza: DESIGN.md do projeto Sistemas-Saude/ImunizaHS | Confirmação de identidade, exceções existentes e diferenças entre texto legado e seção v2 |

Chat consultado: `01a19d5c-707d-75c0-b6c0-570c27d6360b`. O usuário aprovou as melhorias e pediu commit. Registro local indicado na conversa: `6ddaa9a`. A identidade visual isolada 1.4.0 não é a referência final da hierarquia.

Os HTML originais dependem de support.js, componentes x-dc/sc-for e algumas imagens relativas. Foram lidos integralmente como fontes; o manual novo é HTML independente dessas dependências e não reproduz a infraestrutura do Cloud Design.

## Diferenças resolvidas

| Tema | Diferença encontrada | Decisão deste kit |
| --- | --- | --- |
| Fontes | Jakarta em HS-APS/Acompanha, Outfit + Inter em Imuniza | Jakarta em novos projetos; preservar perfil Imuniza |
| Texto mínimo | 11 em rótulos compactos Acompanha; 12 no sistema visual Imuniza | 12 como padrão; 11 somente como exceção existente do painel compacto |
| Raio | Acompanha 8/pill; Imuniza tem escala maior e valores legados | Escala comum 6/8/12/16/pill; Acompanha compacto fica em 8/pill |
| Logo do departamento | 44 px no material de login, 32 em trecho posterior; presença em impressão também citada | 44 no login como referência; endosso em relatório formal quando necessário; sem logo institucional no lugar da marca do produto |
| Exportar | Trecho antigo do Imuniza associa exportação a verde | Ação tonal de marca; verde apenas no resultado positivo |
| Botões | Legado descreve tonal geral e gradientes; v2 usa primário sólido sem gradiente | Sólido para primário, tonal para utilitários, sem gradiente em botão novo |
| Superfícies | Vidro no Imuniza; branco sólido no Acompanha | Sólido como base; vidro restrito ao destaque do perfil Imuniza |
| Barras laterais | Imuniza restringe a navegação; Acompanha usa também em status e orientação | Uso funcional documentado por perfil, sem aplicar indiscriminadamente |
| Tema escuro | Imuniza já tem rampas próprias; Acompanha analisado é claro | Kit oferece base nova a validar por produto; não afirma suporte novo nas aplicações |
| Verde com texto branco | Cor sinal #059669 é apropriada a sinal e rampa, mas não a todo texto branco pequeno | FAB positivo da referência usa #047857 com branco; texto de badge usa a rampa escura |

## O que foi proposto nesta consolidação

Nome do padrão, estrutura de adoção, perfil base, extensão da área de proteção, rampas completas por papel, tema escuro comum, normalização de tokens, componentes de referência e ficha/prompt de projeto. São decisões de design para o kit, não alegações de que já estavam nos quatro arquivos ou de que todos os produtos já as implementaram.

O símbolo HS-APS do manual foi extraído da referência fornecida, com o SVG preservado. Os símbolos de Acompanha e Imuniza são cópias dos assets existentes. Nenhum logo foi criado por IA neste trabalho. O kit inclui Jakarta e conversões WOFF2 dos pesos locais Outfit/Inter com suas licenças. Não inclui JetBrains Mono.

As capturas Acompanha em assets/referencias são evidências da revisão já aprovada e usam dados fictícios. A validação deste kit cobre demonstração, dependências locais, tokens e pares selecionados; não substitui a revisão de cada produto nem uma auditoria integral de acessibilidade.

## Atualização futura

Editar tokens.json como inventário e sincronizar tokens.css; revisar os pares renderizados. Atualizar DESIGN e o manual, registrar versão e decisões. Manter as exceções locais explícitas e evitar cópias divergentes sem identificação de versão.
