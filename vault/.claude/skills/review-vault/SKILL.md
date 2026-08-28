---
name: review-vault
description: Audit an Obsidian vault with an agent's native file tools and no scripts or development runtime. Use for a weekly review, Graph health check, broken-link inspection, navigation diagnosis, or validation before completing a Segundo Cérebro Kit setup without requiring Python, Node.js, Git, shell commands, or plugins.
---

# Revisar a saúde do cofre

Faça uma revisão segura e orientada a decisões. Se não conseguir listar e ler os arquivos do cofre, reporte o bloqueio em vez de estimar resultados.

## 1. Medir sem alterar

1. Liste todos os arquivos visíveis do cofre.
2. Considere como notas apenas arquivos `.md`, excluindo `AGENTS.md`, `CLAUDE.md` e `INICIE-AQUI-IA.md`.
3. Considere como destinos possíveis as notas e os arquivos `.canvas` visíveis.
4. Em cada nota, extraia todo texto entre `[[` e `]]`.
5. Para resolver um destino, remova primeiro o alias após `|`, a âncora após `#` e a extensão `.md`.
6. Se houver `/`, resolva pelo caminho relativo exato. Sem `/`, resolva por nome de arquivo sem extensão somente quando existir um único correspondente.
7. Registre como quebrado todo destino que não puder ser resolvido.
8. Para cada nota, some links enviados e links recebidos.
9. Considere isolada a nota com zero conexões e fraca a nota com uma conexão.
10. Ordene os dez maiores hubs pelo total de conexões.

Não inclua arquivos ocultos nas contagens. Não altere arquivos durante a medição.

## 2. Validar Home e Canvas

- Confirme que todo wikilink da Home resolve para um arquivo real.
- Leia `Mapa Inicial.canvas` como JSON.
- Confirme que cada nó do tipo `file` aponta para um arquivo existente.
- Confirme que identificadores de nós e arestas não se repetem.
- Registre qualquer JSON inválido como falha de validação.

## 3. Produzir evidência

Entregue e registre estes campos com valores contados, nunca estimados:

```json
{
  "notes": 0,
  "links": 0,
  "broken_links": [],
  "orphan_notes": [],
  "weakly_connected_notes": [],
  "hubs": [
    { "note": "arquivo.md", "connections": 0 }
  ],
  "canvas_missing_files": [],
  "canvas_valid_json": true
}
```

Uma configuração só pode concluir com `broken_links` e `canvas_missing_files` vazios e `canvas_valid_json: true`.

## 4. Interpretar e corrigir

Revise nesta ordem: links quebrados, Canvas inválido, notas isoladas, notas fracas, hubs e representação na Home.

Não trate uma nota com muitos links como automaticamente valiosa. Não force conexões para melhorar números.

Se a pessoa pedir apenas revisão, não altere o cofre. Se pedir correção, modifique somente arquivos dentro do cofre, repita o algoritmo inteiro e compare os valores antes e depois. Nunca mova ou apague arquivos originais, configure Git ou instale plugins.
