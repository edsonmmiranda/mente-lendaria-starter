---
name: interview-me
description: Interview the person one question at a time, grounded in what is already in the vault, to build or revise Meu Norte, Perguntas que me Movem and the entry criteria that decide what the automatic maintenance lets in. Use when the criteria are empty, when maintenance recommends it because decisions piled up or the same theme keeps being left out, or when the person asks to review their direction. Triggered by events, not by a fixed date. Every edit needs explicit approval. Interactive only; never run it in a scheduled task.
---

# Entrevista do Norte

O critério de entrada é da pessoa, não da IA. Esta entrevista transforma o que já está no cofre em perguntas concretas e só grava o que a pessoa aprovar.

## Regras duras

- Faça uma pergunta por vez e espere a resposta.
- Toda pergunta parte de algo real do cofre: uma nota, uma fonte, um item do registro. Cite o que motivou a pergunta.
- Nunca grave sem aprovação. Mostre a edição exata, com o antes e o depois, e espere um sim, um não ou um ajuste.
- Não pergunte nem registre saúde, finanças pessoais, religião, política, vida íntima ou dados de terceiros sem que a pessoa traga o tema.
- A pessoa pode pular qualquer pergunta. Pular não é resposta; não deduza nada disso.
- Se ninguém estiver respondendo, como numa tarefa agendada, pare sem gravar nada.

## 1. Ler antes de perguntar

Leia `Meu Norte.md`, `Perguntas que me Movem.md`, `Projetos em Movimento.md` e a seção "Para você decidir" das execuções recentes em `Registro da Manutenção.md`. Se existir, leia também `.segundo-cerebro-kit/source-ledger.json`.

## 2. Escolher por onde começar

Comece pelo ponto mais velho ou mais tenso, nesta ordem:

1. Seções ainda com texto-modelo, principalmente "O que merece entrar" e "O que não entra".
2. Itens em "Para você decidir" que a manutenção deixou.
3. Um tema que aparece em várias fontes com disposição `fora-do-criterio`. Pode ser interesse ainda não declarado.
4. Uma afirmação do Norte que o material novo contradiz.
5. O item com `revisado_em` mais antigo.

## 3. Perguntar

Pergunte citando o conteúdo, não com um formulário genérico. Por exemplo:

- "Três fontes deste mês falam de manutenção preditiva, e o seu Norte não menciona o tema. Isso merece entrar?"
- "Sua nota [[Plano da Linha 2]] fala em formar a equipe júnior. Isso é uma direção sua ou uma tarefa do momento?"

Depois da resposta, proponha a edição exata:

```text
Arquivo: Meu Norte.md, seção O que merece entrar
Antes: (vazio)
Depois: - Manutenção preditiva de equipamentos rotativos.
Posso gravar?
```

## 4. Gravar o aprovado

- Aplique somente a edição aprovada, com as palavras da pessoa.
- Atualize `revisado_em` no topo do arquivo quando a pessoa revisar uma seção, mesmo sem mudança. Revisado quer dizer que a pessoa olhou, não que o texto mudou.
- Quando o Norte mudar, leia a seção de novo em voz de confirmação: "Ficou assim: ...".

## 5. Encerrar

Pare depois de cinco perguntas ou quando a pessoa pedir. Informe o que mudou, o que foi só revisado e a próxima pergunta que ficou para outra vez.
