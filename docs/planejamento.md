# Planejamento do portfólio

**Status:** planejamento visual, funcional e técnico concluído; referências visuais e direção dos painéis aprovadas; quatro skills especializadas criadas; scaffold técnico inicial concluído e validado. A implementação das funcionalidades do portfólio ainda não foi iniciada. Este documento é a referência oficial do projeto.

## 1. Conceito e objetivos

O projeto é um portfólio profissional bilíngue de Guilherme Niederle. A experiência inicial será um jogo de plataforma 2D simples, em pixel art original, acompanhado por uma alternativa institucional convencional. As duas formas de navegação apresentarão as mesmas informações profissionais.

A exploração deve dar personalidade ao portfólio sem esconder informações de recrutamento ou exigir habilidade com jogos. O objetivo é apresentar a trajetória e o trabalho profissional, não criar um jogo completo.

### Princípios

- Identidade visual própria em todos os elementos gráficos e sonoros que venham a ser produzidos.
- Conteúdo profissional claro, fiel ao currículo e consistente nos dois modos.
- Navegação direta por exploração, menu/mapa e painéis informativos.
- Experiência adaptada a desktop, tablet e mobile desde o planejamento.
- Português e inglês nos dois modos.

### Referências visuais oficiais

Os esboços aprovados foram preservados como referências de concepção. Devem orientar a identidade visual sem serem tratados como assets finais de produção:

- [Personagem aprovado](referencias/personagem-aprovado.png)
- [Cenário aprovado](referencias/cenario-aprovado.png)

## 2. Modos de navegação

### Modo jogo

- É a experiência padrão de entrada.
- Apresenta um único cenário horizontal, sem divisão em fases.
- O visitante pode caminhar, realizar pequenos saltos e interagir com pontos de interesse.
- A movimentação e a interação são simples; não haverá mecânicas complexas de jogo.
- O menu ou mapa de seções permite acesso direto a qualquer ponto, sem obrigar o visitante a percorrer o cenário.

### Modo institucional

- É a alternativa convencional, acessível pela barra superior.
- Prioriza leitura e navegação direta.
- Usa os mesmos dados e informações do modo jogo; não deve haver versões divergentes do conteúdo.

## 3. Cenário e personagem

### Cenário

O cenário aprovado é uma paisagem horizontal contínua em pixel art, com céu azul, nuvens discretas, montanhas e vegetação ao fundo, caminho horizontal, gramado e elementos naturais discretos. A composição é limpa, minimalista e agradável, com estruturas pequenas e espaçadas e referências tecnológicas sutis. O cenário funciona como pano de fundo: a leitura dos painéis, o personagem e os pontos de interação têm prioridade visual.

As representações aprovadas dos seis pontos de interesse, na disposição geral do esboço, são:

1. Portal inicial para apresentação.
2. Placa de sinalização para trajetória profissional.
3. Computador para competências técnicas.
4. Bancada tecnológica para trabalhos e contribuições.
5. Estante de livros para formação acadêmica.
6. Cristal luminoso para contato.

Os pontos podem ter o espaçamento ajustado durante a implementação, desde que permaneçam identificáveis e a composição continue limpa. Não adicionar estruturas, objetos decorativos ou motivos tecnológicos sem função clara. As cores e a atmosfera presentes no esboço são referência, mas a paleta final não foi definida.

### Personagem

O personagem aprovado é um avatar simbólico original que representa o desenvolvedor. A referência oficial preserva cabelo loiro curto, jogado para o lado e mais baixo nas laterais; olhos azuis; pele clara; corpo magro; jaqueta verde-azulada; camiseta clara; calça escura; tênis; estilo pixel art e as proporções apresentadas. Não inclui bolsa.

Não propor nem fazer alterações visuais no personagem. Animações necessárias são repouso, caminhada, pequenos saltos e interação, preservando a aparência aprovada e sua leitura em escala reduzida.

## 4. Conteúdo e organização

O documento principal de referência é [`curriculo.pdf`](curriculo.pdf). Empresas, experiências e telefone estão autorizados para divulgação. O currículo é a fonte principal; não inventar projetos, resultados, métricas, competências, responsabilidades ou datas. Se conteúdo novo for fornecido posteriormente, deve ser confirmado antes de entrar no portfólio.

### Apresentação

Apresentar Guilherme como engenheiro de software com atuação em backend e full stack, desenvolvedor desde 2018. O resumo deve refletir sua experiência com aplicações e serviços backend, ambientes corporativos, APIs REST, integração entre sistemas e manutenção de aplicações.

### Trajetória profissional

Apresentar as experiências por empresa, cargo, período e local conforme o currículo:

- **SoftExpert — Engenheiro de Software:** maio de 2020 a novembro de 2026; desenvolvimento e evolução de plataforma corporativa, análise de demandas, backend, APIs, integração com bancos de dados e modernização de interfaces com ReactJS.
- **Questor Sistemas — Programador:** janeiro de 2018 a abril de 2020; rotinas de web scraping, automação de consulta e download de documentos, uso de Laravel Queues e Redis, armazenamento com MongoDB e MySQL, participação em chat interno com C#/.NET e manutenção de sistema de documentação.
- **Eagle Track — Programador:** junho a dezembro de 2017; funcionalidades para sistema web de monitoramento de veículos, interfaces web e integração com PostgreSQL e Leaflet.
- **Experiências anteriores:** Beatscode/INCTECH (fevereiro de 2016 a janeiro de 2017), Centro de Residência em Software da Unochapecó (fevereiro de 2015 a janeiro de 2016) e Betha Sistemas (janeiro a dezembro de 2014), com atividades descritas no currículo.

### Competências técnicas

Organizar em categorias, sem acrescentar tecnologias ou níveis de proficiência não declarados no currículo:

- **Linguagens:** PHP e JavaScript.
- **Backend e frameworks:** Laravel, Zend Framework, APIs REST e integração de sistemas.
- **Frontend:** ReactJS, HTML5, CSS3 e jQuery.
- **Bancos de dados:** PostgreSQL, Oracle, SQL Server, MySQL e MongoDB.
- **Engenharia de software:** SOLID, Design Patterns, Clean Architecture, testes automatizados, manutenção e refatoração de sistemas legados.
- **Ferramentas e ambiente:** Git, Docker e ferramentas de desenvolvimento com IA generativa.

### Trabalhos e contribuições

Esta seção descreve atividades realizadas durante vínculos profissionais. Não deve apresentar esses trabalhos como projetos pessoais nem sugerir propriedade de Guilherme sobre produtos das empresas.

Organizar os cartões por empresa:

- **SoftExpert:** desenvolvimento de funcionalidades, APIs REST, integrações, manutenção de sistemas e modernização de interfaces com ReactJS.
- **Questor Sistemas:** web scraping, automação de documentos, Laravel Queues, Redis, MongoDB e MySQL.
- **Eagle Track:** desenvolvimento de sistema web de monitoramento de veículos, interfaces web e integração com PostgreSQL e Leaflet.
- **Experiências anteriores:** desenvolvimento e manutenção de sistemas de gestão, documentação e suporte técnico, respeitando as atividades específicas do currículo.

Não criar nomes de projetos, resultados, métricas, escopos ou tecnologias além dos fatos fornecidos.

### Formação acadêmica

- **Bacharelado em Sistemas de Informação**, Universidade Comunitária da Região de Chapecó (Unochapecó), janeiro de 2013 a dezembro de 2017.
- **Técnico em Desenvolvimento de IA para Análise Preditiva**, SCTEC em parceria com SENAI, iniciado em junho de 2026 e em andamento, conforme o currículo.

### Contato e idiomas

O currículo contém telefone, e-mail, GitHub e LinkedIn; a divulgação desses dados está autorizada. Os idiomas informados são português nativo e inglês intermediário. O seletor PT/EN traduz toda a interface e o conteúdo do portfólio; a proficiência em inglês descrita no currículo não deve ser confundida com a disponibilidade do site em inglês.

## 5. Representação dos pontos de interesse

| Seção | Representação no cenário | Conteúdo do painel |
| --- | --- | --- |
| Apresentação | Portal inicial discreto. | Nome, título profissional e resumo fiel ao currículo. |
| Trajetória profissional | Placa de sinalização. | Empresa, cargo, período, local e descrição das responsabilidades. |
| Competências técnicas | Computador. | Competências organizadas por categoria em texto e etiquetas legíveis. |
| Trabalhos e contribuições | Bancada tecnológica simples. | Cartões por empresa com período, contribuições e tecnologias utilizadas. |
| Formação acadêmica | Estante de livros. | Instituição, curso, período e situação de conclusão/em andamento. |
| Contato | Cristal luminoso discreto. | E-mail, telefone e links profissionais aprovados. |

As metáforas visuais são direcionais, não assets finais. Os ícones e objetos devem ser desenhados para o projeto e não podem imitar itens reconhecíveis de franquias.

## 6. Interação e direção visual aprovada dos painéis

Os painéis seguem a direção visual aprovada nas referências abaixo. As imagens registram estudos de concepção, não assets finais de produção. O sistema segue a identidade do cenário sem competir com o conteúdo.

- [Estudo da família de seis painéis](referencias/proposta-paineis.png)
- [Estudo de adaptação desktop, tablet e mobile](referencias/proposta-paineis-responsivos.png)

### Linguagem visual aprovada

- Superfície clara, opaca e de alto contraste, com tipografia profissional e hierarquia evidente.
- Moldura e detalhes em pixel art discretos, usando os cantos, divisores ou pequenos ícones originais como acentos, não como decoração dominante.
- Títulos e controles consistentes entre seções; ícones apenas reforçam rótulos textuais.
- Conteúdo em texto real e selecionável, com listas, cartões e agrupamentos apropriados. Não esconder informações em ilustrações, animações ou elementos decorativos.
- Controles PT/EN e fechar em posição previsível em todos os painéis. Toda a interface e o conteúdo devem estar disponíveis nos dois idiomas.
- Painéis podem rolar internamente quando necessário; a indicação de rolagem não deve substituir a navegação por teclado ou toque.

### Conteúdo e organização por painel

- **Apresentação:** título profissional, resumo e informações breves de destaque; preservar espaço visual para leitura sem retrato obrigatório.
- **Trajetória profissional:** linha do tempo ou lista cronológica acessível, agrupada por empresa; cada item apresenta cargo, período, local e descrição fiel ao currículo.
- **Competências técnicas:** grupos por categoria (linguagens, backend, frontend, bancos de dados, engenharia de software, ferramentas); usar etiquetas textuais, sem pontuações ou níveis inventados.
- **Trabalhos e contribuições:** cartões organizados por empresa, com período, contribuições e tecnologias; deixar claro que são atividades profissionais e não projetos pessoais ou produtos de propriedade do desenvolvedor.
- **Formação acadêmica:** cartões ou lista para formação concluída e curso em andamento, com instituição, período e situação.
- **Contato:** ações diretas para e-mail, telefone, GitHub e LinkedIn; rótulos explícitos e destinos acessíveis.

### Interação

- Cada ponto de interesse pode abrir um painel por interação contextual, clique/toque ou seleção pelo menu/mapa.
- A interação não deve depender exclusivamente de movimento preciso, salto ou descoberta por tentativa e erro.
- Os painéis devem identificar a seção, apresentar conteúdo legível e oferecer um controle evidente para fechar e retornar ao cenário.
- Cartões de experiência agrupam empresa, período, descrição das contribuições e tecnologias utilizadas.
- Painéis e navegação devem funcionar com teclado e leitores de tela, manter foco visível e oferecer alternativa sem movimento.
- Redução de movimento deve ser respeitada quando solicitada pelo sistema ou pelo visitante.

Fechar o painel retorna ao cenário e à posição/seção de origem. O fechamento deve estar disponível por controle visível e teclado; comportamento por tecla Escape pode ser adotado se não conflitar com acessibilidade ou conteúdo.

## 7. Interface superior

A barra superior conterá:

- identificação do portfólio;
- menu ou mapa das seis seções;
- alternância entre modo jogo e modo institucional;
- seletor de idioma PT/EN.

Os controles devem permanecer fáceis de localizar sem competir com o conteúdo. Em telas menores, podem ser agrupados de forma compacta, mantendo acesso claro aos modos, idiomas e seções.

## 8. Responsividade e acessibilidade

O projeto deve considerar desktop, tablet e mobile desde o desenho da experiência.

- Desktop: controles por teclado e seleção direta por mouse.
- Mobile: controles de toque dimensionados para uso confortável e navegação direta por seções.
- O layout mobile não será apenas uma redução do panorama desktop. A experiência pode enquadrar trechos do mesmo mundo contínuo, reorganizar a apresentação dos marcos e usar painéis adaptados à tela.
- Painéis devem manter hierarquia, leitura e controles de fechamento em telas estreitas.
- **Desktop:** painel flutuante de largura confortável, deixando o personagem e o ponto de interesse visíveis sempre que possível; teclado e mouse disponíveis.
- **Tablet:** painel central mais amplo, preservando margens para contextualizar o cenário e controles adequados a toque e teclado.
- **Mobile:** painel tipo folha que ocupa boa parte ou quase toda a tela, com rolagem interna, botão de fechar e controles de toque confortáveis; uma faixa ou trecho do cenário pode permanecer visível para preservar contexto.
- A experiência mobile deve reenquadrar trechos da paisagem contínua, não reduzir a imagem desktop inteira. A composição mantém os marcos identificáveis e evita que o painel cubra conteúdo essencial.
- Nenhuma informação essencial dependerá apenas de cor, animação, áudio ou habilidade de jogo.
- Contraste, foco, semântica, nomes acessíveis e opção de reduzir movimento devem ser considerados no projeto visual e funcional.

## 9. Direção artística e propriedade intelectual

Personagem, cenário, plataformas, pontos de interesse, objetos, ícones, interface, animações e eventuais sons devem ter identidade própria. A inspiração em jogos clássicos limita-se a convenções gerais de plataforma 2D, exploração e progressão.

Não utilizar sprites, mapas, personagens, músicas, logos, fontes, efeitos sonoros ou outros assets extraídos de jogos existentes. Não reproduzir elementos distintivos de franquias nem sugerir afiliação ou endosso por seus titulares. Eventuais assets de terceiros exigem origem e licença verificadas. Imagens geradas por IA também devem passar por revisão de semelhanças reconhecíveis antes de qualquer uso.

## 10. Decisões ainda não tomadas

- Valores exatos de cor, tipografia e acabamento final da interface.
- Produção dos assets finais a partir das referências aprovadas.
- Detalhes de implementação dos controles e da navegação dentro da arquitetura aprovada.

Esses detalhes permanecem abertos e devem respeitar as decisões já aprovadas. Mudanças de direção visual, produto ou tecnologia devem ser apresentadas para aprovação antes de implementação significativa.

## 11. Arquitetura técnica aprovada

| Tecnologia ou decisão | Responsabilidade no projeto |
| --- | --- |
| **React** | Construir a interface por componentes, controlar os modos de navegação, o idioma, os painéis e os estados da experiência. |
| **Vite** | Servir o ambiente de desenvolvimento e gerar a aplicação otimizada como arquivos estáticos. |
| **TypeScript** | Tipar componentes, estados e conteúdo para reduzir inconsistências entre seções e idiomas. |
| **DOM, CSS e imagens** | Compor e enquadrar o cenário 2D; representar personagem e pontos de interesse em camadas acessíveis. |
| **Animações CSS e spritesheets originais** | Apresentar repouso, caminhada, saltos e interações simples do personagem, sem simulação física ou engine. |
| **HTML semântico** | Representar pontos de interesse, navegação, conteúdo dos painéis e alternativa institucional. |
| **Dicionários locais PT/EN** | Fornecer textos de interface e conteúdo nos dois idiomas usando os mesmos componentes e estrutura de dados. |
| **CSS modular e variáveis de design** | Organizar estilos por componente e centralizar tokens visuais para cores, tipografia, espaçamento e acabamento. |
| **Vitest** | Executar testes unitários da lógica, dos estados, dos dados e das traduções. |
| **Playwright** | Verificar fluxos de navegação e interação em navegadores e viewports representativos. |
| **Cloudflare Pages** | Hospedar e publicar o build estático, com integração ao repositório e previews de alterações. |

### Limites da arquitetura

- Não haverá backend, API própria ou banco de dados na etapa inicial.
- Não será utilizada engine de jogos. A movimentação permanece simples e baseada em estados e animações CSS.
- O estado da aplicação será gerenciado pelos recursos locais do React; não está previsto um gerenciador externo de estado.
- O conteúdo profissional será mantido como dados locais versionados, com versões em português e inglês.
- Cenário e personagem são camadas visuais. Textos, ações, hotspots e painéis permanecem no DOM para suportar semântica, teclado e tecnologias assistivas.
- Vitest e Playwright estão instalados e configurados no scaffold inicial. Os testes iniciais foram executados com sucesso; a verificação de TypeScript e o build de produção também passaram. A cobertura atual é apenas de confirmação do scaffold, não das funcionalidades ainda não implementadas.

## 12. Estado e próxima etapa

O planejamento visual, funcional e técnico está concluído. As referências aprovadas do personagem e do cenário estão preservadas em `docs/referencias/`; a direção visual dos painéis também está aprovada e documentada. A arquitetura técnica está definida nesta seção. O agente principal é `.codex/agents/portfolio-architect.toml`.

As quatro skills especializadas já foram criadas em `.agents/skills/`:

- [frontend-architecture](../.agents/skills/frontend-architecture/SKILL.md)
- [pixel-art-environment](../.agents/skills/pixel-art-environment/SKILL.md)
- [responsive-accessibility](../.agents/skills/responsive-accessibility/SKILL.md)
- [testing-quality](../.agents/skills/testing-quality/SKILL.md)

O scaffold inicial foi criado com React, Vite e TypeScript configurados, além de Vitest e Playwright instalados e configurados. Os testes iniciais passaram, a verificação de TypeScript passou e o build de produção foi executado com sucesso. A estrutura técnica inicial está concluída e validada.

Essa conclusão cobre somente a estrutura técnica inicial. A implementação das funcionalidades do portfólio — incluindo os modos jogo e institucional, cenário, movimentação, painéis e conteúdo — ainda não começou. A produção de assets finais e o deploy também permanecem pendentes.
