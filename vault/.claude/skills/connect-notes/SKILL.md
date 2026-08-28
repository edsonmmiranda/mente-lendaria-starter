---
name: connect-notes
description: Find, explain, and add meaningful Obsidian wiki-link relationships among existing notes. Use when the Graph is sparse, notes are isolated, backlinks need repair, a new note needs context, or the user asks to connect ideas without creating decorative links.
---

# Conectar notas

Faça o Graph representar relações que a pessoa consegue explicar. Uma conexão vale mais pela razão registrada do que pela quantidade de linhas.

## 1. Ler antes de ligar

Para cada nota em foco, leia o título, a síntese, as fontes, os links atuais e as notas candidatas. Não conecte apenas por palavras repetidas.

Priorize estas relações:

1. A mesma entidade, pessoa, projeto ou decisão.
2. Causa, consequência ou dependência.
3. Evidência que apoia ou contradiz uma ideia.
4. Conceito aplicado em outro contexto.
5. Sequência temporal ou próximo passo.
6. Pergunta respondida ou aprofundada por outra nota.

## 2. Aplicar o teste da frase

Antes de criar um link, complete: “Esta nota se conecta a aquela porque...”. Se não houver uma frase específica e fiel, não crie o link.

Adicione a ligação no ponto do texto em que ela ajuda a leitura ou na seção `## Conexões`:

```markdown
- [[Nome da nota]]: esta relação existe porque...
```

Busque de duas a cinco conexões por nota, sem forçar uma quantidade mínima quando o conteúdo não sustentar isso.

## 3. Reparar a rede

- Comece pelas notas sem links de entrada e saída.
- Confirme que todo destino existe antes de salvar.
- Preserve aliases e títulos usados pela pessoa.
- Prefira ligar uma nota a um mapa relevante e a uma nota específica.
- Acrescente uma ligação inversa somente quando ela também melhorar a leitura da outra nota.
- Registre contradições como contradições, sem apagá-las.

Não crie notas vazias apenas para satisfazer um link. Não use tags como substituto de uma relação explicada. Não conecte todas as notas a todas as outras.

## 4. Integrar a interface

Se uma nota se tornar central, inclua-a no mapa correspondente. Se cinco ou mais notas formarem um tema reconhecível, use a skill `build-moc`. Atualize o Canvas apenas quando a nova relação for importante para a visão inicial.

Ao concluir, informe quantas notas foram revisadas, quantas conexões foram adicionadas, quantos links quebrados foram corrigidos e quais notas ainda ficaram isoladas por falta de evidência.
