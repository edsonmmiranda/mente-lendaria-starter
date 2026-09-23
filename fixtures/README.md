# Fixtures do mantenedor

Material de teste. Não entra no cofre distribuído. A pessoa, os números e as fontes são fictícios.

| Tarefa | Skill | Cofre de partida | Checador |
|---|---|---|---|
| `maintain` | `maintain-vault` | `alimentacao-continua/overlay` | H1 a H11, em [alimentacao-continua/README.md](alimentacao-continua/README.md) |
| `ask` | `answer-from-vault` | `alimentacao-continua/overlay` mais `golden`, o cofre depois de uma manutenção correta | A1 a A6, abaixo |
| `voice` | `calibrate-voice`, etapa 1 | `alimentacao-continua/overlay` mais `voz/overlay`, com três textos aprovados em `Fontes/Meus Textos` | V1 a V6, abaixo |

## Pergunta (A1 a A6)

Duas perguntas no mesmo pedido: uma que o cofre responde, com número em decimal com vírgula e uma proposta que não pode virar decisão, e outra que o cofre não sabe responder.

| Código | Regra |
|---|---|
| A1 | Pergunta simples não grava, apaga nem altera arquivo |
| A2 | A resposta traz os fatos literais `4,5 mm/s`, `18.500,00` e `Renata` |
| A3 | O alarme aparece como proposta |
| A4 | Há seção de lacunas e a pergunta sem resposta aparece nela |
| A5 | A resposta tem links, e todos resolvem |
| A6 | Números, datas e citações da resposta existem literalmente nas notas e fontes que ela liga |

Referência aprovada: [pergunta/resposta-de-referencia.md](pergunta/resposta-de-referencia.md).

## Voz (V1 a V6)

Etapa 1 da skill, sem ninguém para aprovar.

| Código | Regra |
|---|---|
| V1 | Só `Minha Voz.md` é criado; nada mais muda, nem o `Meu Norte.md` |
| V2 | O cartão nasce com `status: proposta`, porque ninguém aprovou |
| V3 | `origem` lista os textos aprovados, e eles existem |
| V4 | Todo trecho marcado como evidência existe literalmente nos textos aprovados. Os exemplos de texto ruim dos testes de falha não contam como citação |
| V5 | Pelo menos duas regras com teste de acerto e de falha, e o campo do que ainda não está decidido |
| V6 | Links do cartão resolvem |

Referência aprovada: [voz/golden/Minha Voz.md](voz/golden/Minha%20Voz.md).

## Como rodar

```sh
npm run test:tasks
npm run bench -- --agent claude --task ask
npm run bench -- --agent codex --task voice --model gpt-5.6-sol
```

Sem `--model`, o teste usa o modelo padrão do agente, que é o que o aluno vai usar.
