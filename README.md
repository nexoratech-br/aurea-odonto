# Áurea Odonto

Landing page conceitual da Nexora Technology. **Não existe uma clínica real neste projeto.** Endereço, horários e contatos são demonstrativos. Não há credenciais, depoimentos ou métricas inventadas.

## Executar no Windows

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run preview
```

Astro estático, Tailwind CSS via Vite, fontes locais e JavaScript nativo. Sem React ou biblioteca de animação.

## Organização

- src/pages/index.astro: composição da página.
- src/components/: componentes Astro por seção; TreatmentExplorer é integrado a Treatments.
- src/styles/global.css: base; navbar.css e hero.css: primeira dobra aprovada; sections.css: sistema editorial das demais seções.
- src/data/site.ts: categorias e contato demonstrativo.
- src/data/media.ts: fotografias, alt, dimensões e recortes dos slots abaixo do Hero.
- src/scripts/interactions.ts: menu, explorador, reveal, parallax e toast de contato demonstrativo.
- src/layouts/Layout.astro: idioma, fontes, metadados e noindex, nofollow.

## Direção visual

Hero e Navbar aprovados foram preservados. Tratamentos combina seletor lateral, fotografia e texto; Experiência conecta arquitetura e atendimento; Tecnologia apresenta scanner e recursos expansíveis; Equipe usa uma cena ampla de cuidado; Contato integra arquitetura, dados e agendamento. CTA e footer compartilham a mesma faixa verde profunda.

As fotografias são sintéticas e conceituais, com pessoas fictícias, identificadas na página. Não são registros de instalações, profissionais ou resultados clínicos reais. Estão em WebP local com versões responsivas. Substitua os slots em src/data/media.ts por fotografias licenciadas quando disponíveis.

Lista de substituição: docs/section-photography.md. Arquivos e prompts das novas imagens: docs/reference-photography.md. Imagens reaproveitadas: docs/editorial-photography.md.

## Interações e contato

O explorador único mantém abas, setas, Home/End, conteúdo e imagem por categoria. Botões anterior/próximo percorrem as opções; detalhes de cuidado e tecnologia utilizam details/summary nativos. Menu mobile, estados de foco e redução de movimento permanecem funcionais. Fotografias abaixo do Hero usam lazy loading; imagens alternativas dos tratamentos são antecipadas quando a seção se aproxima da tela.

CTAs de agendamento, WhatsApp e conversa exibem um toast não bloqueante por seis segundos, sem navegação ou coleta de dados. O aviso usa uma região de status com anúncio educado para leitores de tela, não move o foco e respeita a redução de movimento. Novos cliques reiniciam o tempo de exibição. A informação permanente do projeto conceitual fica na área de contato. O domínio .example não recebe e-mails.

## Validação

Build concluído. Edge headless em 360, 390, 768 e 1440px sem rolagem horizontal. Revisão visual das seções em desktop e 390px. Testados menu, toast, abas, setas anterior/próximo, teclado, detalhes expansíveis, imagens, metadados e redução de movimento. Axe sem violações nas regras automatizadas WCAG 2 A/AA e 2.1 AA; isso não constitui certificação.

Ferramentas e capturas locais em .qa/, ignorada pelo Git e fora das dependências do site.

### QA final

Verificadas 13 larguras entre 320 e 1920px, com as quatro categorias de tratamento e os detalhes de tecnologia expandidos. Corrigida a quebra de palavras longas nos títulos dos recursos de tecnologia em telas estreitas. Sem overflow horizontal ou textos cortados nos estados testados. Teclado, foco, links internos, menu mobile, CTAs com toast, temporização, animações e redução de movimento conferidos. Sem erros de console ou recursos com falha. Auditoria automatizada WCAG 2 A/AA e 2.1 AA sem violações em 390, 768 e 1440px. Entrada de QA local: node .qa/verify.mjs.
