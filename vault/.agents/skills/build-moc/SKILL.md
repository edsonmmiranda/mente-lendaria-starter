---
name: build-moc
description: Create or update a lightweight Obsidian map of content for a real cluster of notes. Use when at least five notes share a useful theme, a topic is hard to navigate, a hub is needed, or Home and Canvas should expose a growing area without adding a deep folder hierarchy.
---

# Criar um mapa de conteúdo

Crie uma porta de entrada para um tema, não um índice de tudo. Um mapa deve ajudar a pessoa a entender o território e decidir onde continuar.

## Quando criar

Crie um mapa novo quando houver pelo menos cinco notas relacionadas e uma finalidade clara de navegação. Com menos material, atualize uma seção de um mapa existente.

Reaproveite primeiro um destes mapas quando fizer sentido:

- `Meu Norte.md`
- `Projetos em Movimento.md`
- `Pessoas e Conversas.md`
- `Ideias que me Perseguem.md`
- `Perguntas que me Movem.md`

## Como construir

1. Defina o tema em uma frase.
2. Selecione de 5 a 15 notas que realmente pertencem ao conjunto.
3. Agrupe por perguntas, linhas de raciocínio, projetos ou estágio de desenvolvimento.
4. Escreva uma frase de contexto para cada link ou pequeno grupo.
5. Inclua perguntas abertas e lacunas, quando existirem.
6. Conecte o mapa a pelo menos outro mapa relevante.

Use esta estrutura:

```markdown
---
tipo: mapa
status: vivo
criado_em: AAAA-MM-DD
---

# Mapa de [tema]

## Para que este mapa existe

Uma frase de orientação.

## Ideias centrais

- [[Nota]]: papel desta nota no tema.

## Em movimento

- [[Projeto ou decisão]]: estado atual.

## Perguntas abertas

- [[Pergunta]]: por que ainda importa.

## Mapas relacionados

- [[Outro mapa]]: relação entre os territórios.
```

## Manter leve

- Não replique o conteúdo das notas dentro do mapa.
- Não crie subpastas apenas para deixar o cofre simétrico.
- Não liste uma nota se não conseguir explicar seu papel.
- Retire links obsoletos quando a relação deixar de existir.
- Atualize `00 - Comece Aqui.md` se o novo mapa se tornar uma entrada principal.
- Acrescente o mapa ao Canvas somente se ele melhorar a primeira visão do cofre.

Ao concluir, informe o propósito do mapa, quantas notas ele reúne e qual pergunta ou projeto ele ajuda a navegar.
