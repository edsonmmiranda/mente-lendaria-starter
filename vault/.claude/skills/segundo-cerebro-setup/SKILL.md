---
name: segundo-cerebro-setup
description: Configure a beginner's first Obsidian second brain from the Segundo Cérebro Kit using an agent's native file tools and no development runtime. Use for a first run, a fresh vault, a privacy-safe scan of local files, or a request to deliver a populated Home, Canvas, Graph, and bundled Codex Panel without requiring Python, Node.js, Git, shell commands, package managers, or additional plugins on the user's computer.
---

# Configurar o segundo cérebro

Entregue uma primeira vitória visível. Execute as fases na ordem. Não responda apenas com um tutorial.

## Regras duras

- Use operações nativas de leitura, cópia, criação e edição de arquivos.
- Não instale nem exija ambiente de desenvolvimento.
- Preserve o Codex Panel já incluído e nunca copie credenciais ou caminhos pessoais para o kit.
- Nunca transfira comandos técnicos para a pessoa.
- Escreva somente dentro do novo cofre.
- Trate todos os arquivos de origem como somente leitura.
- Nunca mova, renomeie, sobrescreva ou apague um arquivo existente.
- Não habilite sincronização, publicação ou compartilhamento sem pedido explícito.
- Não invente dados, caminhos, arquivos, capacidades ou resultados.
- Se uma capacidade estiver ausente, preserve o progresso e registre o bloqueio exato.

## Controle de estado

Use `.segundo-cerebro-kit/run-state.json` diretamente. Não crie outro formato de estado.

Fases: `prepared`, `inventory`, `capture`, `connections`, `maps`, `interface`, `validation`, `open`.

Depois de cada fase:

1. Releia no disco os arquivos que provam o resultado.
2. Mude a fase de `pending` para `complete` e registre evidência curta e verificável.
3. Use `skipped` somente para `open` quando faltar controle visual.
4. Use `blocked` com a capacidade ausente quando não puder continuar.
5. Mantenha `status` como `running` até todas as fases estarem `complete` ou `skipped`; então use `complete`.

Datas e horários são opcionais. Só preencha `created_at`, `updated_at`, `completed_at`, `criado_em` ou data de acesso quando uma ferramenta fornecer o valor exato. Caso contrário, use `null` ou omita o campo. Nunca estime ou arredonde um horário.

Nunca avance se uma fase anterior estiver `pending` ou `blocked`.

## 1. Confirmar o novo cofre

1. Trabalhe somente na cópia criada pelo fluxo de `INICIE-AQUI-IA.md`.
2. Confirme `.obsidian`, `.segundo-cerebro-kit`, `.agents`, `.obsidian/plugins/codex-panel`, `.obsidian/community-plugins.json`, `00 - Comece Aqui.md` e `Mapa Inicial.canvas`.
3. Confirme que o caminho de origem continua existindo e não foi alterado.
4. Registre o caminho absoluto real no estado.

## 2. Inventariar sem ler conteúdo

Use a ferramenta de listagem de arquivos do agente em Desktop, Documentos e Downloads. Exclua o novo cofre.

Antes de abrir qualquer conteúdo:

- considere somente `.docx`, `.md`, `.pdf`, `.pptx`, `.rtf`, `.txt` e `.xlsx` com até 50 MB;
- ignore itens ocultos, atalhos, links simbólicos, lixeiras, caches, áreas de sistema e duplicados;
- ignore qualquer caminho cujo nome indique banco, credencial, diário íntimo, finanças, imposto, jurídico, laudo, saúde, senha, segredo, carteira digital ou chave privada;
- limite o inventário a 40 candidatos recentes;
- selecione no máximo 12 candidatos relacionados a projetos, estudos, interesses, pessoas ou decisões.

Crie `.segundo-cerebro-kit/inventory.json` com:

```json
{
  "schema_version": 2,
  "content_read_during_inventory": false,
  "sources_checked": ["pastas realmente verificadas"],
  "candidates": [
    { "name": "arquivo.ext", "path": "caminho real", "size_bytes": 0, "modified_at": "data exata ou null" }
  ],
  "selected_paths": ["no máximo 12 caminhos"],
  "excluded_counts": { "sensitive": 0, "hidden_or_system": 0, "unsupported": 0, "too_large": 0 }
}
```

Releia o inventário antes de marcar a fase. Se não houver candidato elegível, use lista vazia e continue com os mapas-semente.

## 3. Criar conhecimento pessoal

Leia `.agents/skills/capture-source/SKILL.md`.

- Abra somente os caminhos registrados em `selected_paths`, um por vez.
- Ignore formatos que a ferramenta não conseguir ler e registre a limitação.
- Crie até 12 notas somente quando as fontes sustentarem o conteúdo.
- Não existe quantidade mínima obrigatória. Nunca invente notas para alcançar uma meta.
- Mantenha as novas notas na raiz na primeira experiência.
- Preserve citações literalmente e registre a procedência de toda afirmação derivada.

Use esta estrutura:

```markdown
---
tipo: fonte | ideia | projeto | pessoa | pergunta
status: semente
criado_em: AAAA-MM-DD | null
origem: "nome ou caminho da fonte"
---

# Título específico

## Em uma frase

Síntese fiel e curta.

## O que importa

- De dois a cinco pontos baseados na fonte.

## Conexões

- [[Nota relacionada]]: motivo da relação.

## Fonte

Nome, caminho local ou URL. Não copie a fonte inteira.
```

## 4. Construir relações reais

Leia `.agents/skills/connect-notes/SKILL.md`. Confirme no disco que cada destino existe. Busque duas conexões por nota somente quando forem explicáveis. Registre tensões e lacunas sem escolher uma verdade por conta própria.

## 5. Personalizar os mapas

Atualize sem apagar a navegação existente:

- `Meu Norte.md`: temas, valores declarados e direções percebidas.
- `Projetos em Movimento.md`: projetos e responsabilidades identificáveis.
- `Pessoas e Conversas.md`: pessoas mencionadas com contexto útil, sem inferir dados privados.
- `Ideias que me Perseguem.md`: interesses, conceitos e padrões recorrentes.
- `Perguntas que me Movem.md`: dúvidas abertas e decisões importantes.

Cada mapa deve ligar para notas relevantes e para pelo menos outro mapa. Se cinco ou mais notas formarem um agrupamento claro, leia `.agents/skills/build-moc/SKILL.md` antes de criar um mapa adicional.

## 6. Montar a interface

1. Atualize `00 - Comece Aqui.md` com um retrato curto do que foi encontrado.
2. Agrupe os links pessoais mais importantes pelos cinco mapas.
3. Atualize `Mapa Inicial.canvas` somente com caminhos de arquivos confirmados.
4. Use de 8 a 15 arquivos no Canvas, ou menos quando não houver material suficiente.
5. Mantenha a Home no centro e os cinco mapas ao redor.
6. Preserve Graph, Canvas, backlinks, busca e explorador de arquivos habilitados.
7. Preserve `codex-panel` habilitado em `.obsidian/community-plugins.json`.

## 7. Validar com ferramentas nativas

Leia `.agents/skills/review-vault/SKILL.md` e siga o algoritmo completo. Confirme também:

- Home e Canvas apontam somente para arquivos existentes;
- não há links quebrados;
- toda afirmação derivada possui fonte identificável;
- os metadados das fontes selecionadas permanecem iguais aos registrados no inventário;
- `.obsidian/plugins/codex-panel/manifest.json` declara `id: codex-panel`, versão `5.6.0` e uso exclusivo no desktop;
- `.obsidian/community-plugins.json` mantém `codex-panel` habilitado;
- nenhuma configuração pessoal ou credencial foi criada dentro da pasta do plugin;
- nenhum arquivo fora do novo cofre foi alterado.

Corrija falhas dentro do cofre e repita a inspeção. Registre na fase `validation` os números realmente contados.

## 8. Abrir ou entregar

Se houver controle visual e o Obsidian já estiver instalado, abra o cofre, a Home, o Canvas, o Graph e o Codex Panel. Se o Obsidian solicitar confiança para executar o plugin comunitário já incluído, peça apenas essa confirmação. Se o Obsidian não estiver instalado, só use o instalador oficial de `https://obsidian.md/download` após autorização explícita.

Sem controle visual ou autorização, marque `open` como `skipped` e forneça uma única instrução: instalar ou abrir o Obsidian, escolher `Abrir pasta como cofre` e selecionar o caminho informado.

## Recibo e relatório final

Somente depois que todas as fases estiverem `complete` ou `skipped`:

1. Marque o estado geral como `complete` e releia o estado inteiro.
2. Leia `.segundo-cerebro-kit/completion-receipt.schema.json`.
3. Crie `.segundo-cerebro-kit/completion-receipt.json` substituindo todos os exemplos por valores verificados; use `completed_at: null` se a hora exata não estiver disponível.
4. Exija `broken_links: 0`, liste em `verified_outputs` os arquivos relidos e use os mesmos números registrados na validação.
5. Releia o recibo e cada item de `verified_outputs`.

Se qualquer verificação falhar, não crie o recibo ou apague o recibo incompleto e reporte `BLOQUEADO` ou `EM ANDAMENTO`.

Informe de forma curta: caminho do cofre, fontes inventariadas e lidas, notas e conexões criadas, temas encontrados, resultado da validação e uma única ação manual restante.
