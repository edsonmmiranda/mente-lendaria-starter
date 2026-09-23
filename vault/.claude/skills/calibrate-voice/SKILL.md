---
name: calibrate-voice
description: Turn texts the person approved as their own into a testable voice card for one recurring writing job, test it on a new brief, check the draft for broken rules and unsupported claims, and save one approved correction at a time. Use when the person wants the AI to write like them, calibrate or review their voice, or correct how the AI writes for them. Interactive only; nothing becomes a rule without explicit approval.
license: Apache-2.0
---

<!--
Adaptado de "Write in Your Voice webinar pack", iwo-szapar/second-brain-skills, commit dcf1b3c
(https://github.com/iwo-szapar/second-brain-skills), sob Apache License 2.0; cópia em LICENSE nesta pasta.
Modificações do Segundo Cérebro Kit em 2026-09-23: tradução para o português; as quatro skills
writing-draft-contract, writing-blank-brief, writing-quality-check e writing-save-correction viraram
quatro etapas desta skill; o cartão passou a viver no cofre em Minha Voz.md, com textos aprovados em
Fontes/Meus Textos e evidência citada literalmente.
-->

# Calibrar a minha voz

A IA só escreve "como você" quando isso pode ser testado. Esta skill transforma textos que você aprovou em um cartão de voz com regras verificáveis e muda o cartão uma correção por vez, sempre com a sua aprovação.

## Regras duras

- Um trabalho de escrita por vez: por exemplo, "relatório de falha para a gerência" ou "e-mail de proposta".
- Use só textos que a pessoa aprovou como dela, em `Fontes/Meus Textos/` ou em arquivos que ela indicar. Não deduza a voz de material privado, incidental ou de terceiros.
- Toda regra do cartão tem evidência literal de um texto aprovado, um teste de acerto e um teste de falha. Adjetivo vago sem evidência não vira regra.
- O que os textos não sustentam fica como "ainda não decidido".
- Nada vira regra sem aprovação explícita. Silêncio, "parece bom" ou pedido de opções não são aprovação.
- Não publique, envie, agende nem prometa resultado.
- Só com a pessoa presente. Nunca numa tarefa agendada.

## Etapa 1: contrato

Pré-requisitos: o trabalho que se repete e quando acontece, pelo menos um texto aprovado (idealmente dois ou três comparáveis), quem lê e o que essa pessoa deve decidir. Se faltar algum, pare e peça.

1. Leia só os textos aprovados. Separe o que é evidência explícita, o que é preferência provável e o que não está decidido.
2. Crie `Minha Voz.md` com `status: proposta`, `origem` listando os textos aprovados e os dez campos abaixo.
3. Pare e peça à pessoa, regra por regra: manter, mudar ou remover.

```markdown
---
tipo: voz
status: proposta
trabalho: "nome do trabalho de escrita"
origem:
  - "Fontes/Meus Textos/arquivo.md"
---

# Minha Voz: nome do trabalho

1. **Trabalho e gatilho:** o que se repete e quando.
2. **Leitor e decisão:** quem lê e o que deve decidir ou fazer.
3. **Fontes aprovadas:** o que pode alimentar um texto e o que fica de fora.
4. **Regra 1:** a regra. Evidência: "trecho literal" ([[Fontes/Meus Textos/arquivo]]). Acerta quando: resultado observável. Falha quando: resultado observável.
5. **Regra 2:** idem.
6. **Regras 3 a 5:** só as que os textos sustentam.
7. **Fluxo e entrega:** passos, a peça final, fatos e lacunas.
8. **Checagens e limites:** o que conta como utilizável e o que nunca pode acontecer.
9. **Ainda não decidido:** o que falta saber, visível.
10. **Correção e prova:** a correção aprovada mais recente e o próximo pedido para testá-la.

| Regra | Manter | Mudar | Remover | Nota da pessoa |
| --- | --- | --- | --- | --- |
| Regra 1 |  |  |  |  |
```

Quando a pessoa decidir todas as regras, aplique as decisões com as palavras dela, mude o `status` para `confirmada` e ligue `Minha Voz.md` a partir de `Meu Norte.md` somente se ela aprovar essa edição.

## Etapa 2: teste num pedido novo

Pré-requisito: `Minha Voz.md` com `status: confirmada` e um pedido novo de duas a quatro frases, comparável ao trabalho. Se o cartão ainda for proposta, volte à etapa 1.

1. Antes de escrever, repita a peça pedida, o leitor, a decisão, os fatos permitidos e as lacunas.
2. Escreva só com o pedido, o cartão, os textos aprovados e notas do cofre citadas.
3. Marque o que falta em vez de preencher com detalhe plausível.
4. Depois do texto, acrescente o mapa:

| Regra ou limite do cartão | Acerta, falha ou bloqueado | Fato do pedido ou fonte que sustenta | Decisão da pessoa |
| --- | --- | --- | --- |

O mapa é o registro de quem escreveu, não uma aprovação de qualidade.

## Etapa 3: checagem

Pré-requisitos: cartão confirmado, o texto e o pedido exato usado para escrevê-lo. Se faltar algo, responda só:

```text
Ainda não dá para checar pelo cartão.
Falta: [campo do cartão, pedido ou lista de fatos].
Próximo passo: [arquivo ou decisão da pessoa].
```

Com tudo presente, leia o cartão e o pedido antes do texto e devolva exatamente quatro seções:

1. **O que já segue o cartão:** cada regra atendida, com o trecho.
2. **O que quebra uma regra:** a frase exata, a regra e por que falha.
3. **Afirmações sem sustentação, suposições e dados faltando:** cada uma classificada, com o fato ou fonte que resolveria.
4. **A correção que vale guardar:** uma só, no formato "Quando [situação], [comportamento]. Acerta quando: [...]. Falha quando: [...]."

Não reescreva o texto nesta etapa.

## Etapa 4: guardar uma correção

**Primeira vez: propor.** Mostre o campo afetado, a evidência, a regra antiga, a regra nova, o teste de acerto, o teste de falha e o trecho do texto que mudaria. Termine com: "Aprova esta mudança exata?" Pare. Não mude o cartão nem o texto.

**Depois da aprovação explícita:**

1. Mude só o campo aprovado de `Minha Voz.md`.
2. Acrescente em "Correções aprovadas", no fim do arquivo, a regra, a evidência e a data que a ferramenta informar.
3. Se o texto original e o pedido estiverem disponíveis, revise o texto e mostre: correção, frase que mudou, incerteza que resta. Marque a revisão como "reconferência pendente" até passar pela etapa 3 de novo.
4. Sem o texto original ou o pedido, responda só: "Campo alterado: [campo]. Revisão do texto: não feita. Falta: [pedido ou lista de fatos]."
