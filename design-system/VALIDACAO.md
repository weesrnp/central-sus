# Verificação do kit 1.0.0

Executada localmente em 02/11/2026, com Google Chrome em modo headless e Playwright. Resultados detalhados em `validacao.json`.

- 32 combinações de layout: quatro perfis, dois temas, duas densidades e larguras 360/1440 px. Sem transbordamento horizontal da página. A tabela de demonstração tem rolagem própria em tela estreita.
- 144 pares de contraste: texto, marca, seleção, botões, estados, foco e borda de campo, nos quatro perfis e dois temas. Todos atingiram os limiares internos aplicados: 4,5:1 para texto e 3:1 para os pares funcionais selecionados.
- Reflow em 720 px, equivalente à área de layout de uma janela 1440 px com ampliação a 200%. Não é uma auditoria de todas as combinações de zoom e tecnologia assistiva.
- Abas por setas, Home e End; filtro e limpeza da tabela; estado pressionado da pill; mensagens de resultado.
- Fontes locais e alternância Jakarta/Outfit/Inter; ausência de requisições HTTP externas, erros JavaScript e falhas de carregamento na execução verificada.
- Âncoras internas e destinos locais do manual, incluindo as pranchas PNG; exemplo independente em 360 px.
- Preferência de movimento reduzido desativa transições dos controles.
- Revisão visual das imagens do manual, exemplo Acompanha, mobile, paleta e tipografia Imuniza. Corrigida uma sobreposição de regra de parágrafo que diminuía os números dos KPIs antes da entrega.
- Inventário JSON/CSS e integridade dos nove arquivos-fonte conferidos na finalização do pacote.

Escopo: exemplos e tokens deste kit. Não valida alterações em aplicações, implantação nas UBS, regras clínicas ou conformidade integral de acessibilidade. O tema escuro fornecido é uma base de referência para revisão em cada produto.
