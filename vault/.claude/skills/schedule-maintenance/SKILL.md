---
name: schedule-maintenance
description: Set up a recurring local task that runs the maintain-vault skill on this vault, using the scheduler of whichever agent the person already uses, with file-only permissions and no network. Use when the person asks to schedule, automate or turn on daily maintenance, or after the first torneira is connected. Never creates cloud or remote tasks, because they cannot see the local vault.
---

# Agendar a manutenção

A manutenção é a mesma skill para qualquer IA. Muda só quem aperta o botão todo dia.

## Instrução da tarefa

Use exatamente este texto como instrução da tarefa agendada. Troque só `$maintain-vault` por nada quando o agente não aceitar esse atalho:

```text
$maintain-vault Rode a manutenção do meu segundo cérebro. Leia AGENTS.md e siga .agents/skills/maintain-vault/SKILL.md no modo agendado. Trabalhe só com arquivos dentro desta pasta: listar, ler, buscar, criar e editar. Não use internet e não instale nada. Não apague, mova nem renomeie arquivos. Não faça perguntas: registre o que precisar de decisão e encerre.
```

## Regras duras

- A tarefa roda neste computador, com a pasta do cofre como pasta de trabalho.
- Nunca crie tarefa na nuvem ou remota, como rotinas na nuvem ou tarefas do Cowork. Elas não enxergam a pasta local.
- Conceda somente ler, listar, buscar, criar e editar arquivos. Nunca conceda acesso total nem internet. Onde o agente só mexe em arquivos por comandos, como o Codex, o isolamento da pasta de trabalho é a trava.
- Frequência diária, num horário em que o computador e o Obsidian costumam estar abertos. O Readwise só sincroniza com o Obsidian aberto. Sugira o fim do dia e deixe a pessoa escolher.
- Não peça que a pessoa digite comandos. Se o agente não conseguir criar a tarefa sozinho, dê no máximo cinco passos na tela.

## 1. Descobrir onde você está rodando

Identifique o aplicativo pelas ferramentas que você realmente tem. Não pergunte à pessoa o que um teste de ferramenta responde.

## 2. Criar a tarefa

Procedimentos conferidos na documentação oficial em 23/09/2026. Se a tela estiver diferente, siga a tela e registre a diferença.

**Claude, aba Code do aplicativo desktop.** Crie uma tarefa local descrevendo-a na própria conversa: a documentação diz que "You can also create a task by describing what you want in any session". Pela tela: Code, Routines, New routine, Local. Preencha nome `manutencao-segundo-cerebro`, a instrução acima, a pasta do cofre e o agendamento Daily. Depois:

1. Clique em Run now.
2. Em cada pedido de permissão de leitura ou edição de arquivo, escolha "always allow".
3. Recuse comandos de terminal e internet.

Limites: roda só com o aplicativo aberto e o computador acordado. Se o computador dormir, uma única execução de recuperação acontece ao acordar.

**ChatGPT ou Codex, aplicativo desktop.** Peça na conversa para criar uma tarefa agendada neste projeto. A documentação diz que "You can create and update scheduled tasks from a ChatGPT or Codex chat" e que `$skill-name` aciona a skill. Use o modo workspace-write, que bloqueia internet e escrita fora da pasta. Limite: o computador ligado e o aplicativo aberto.

**Hermes.** Crie a tarefa com a ferramenta de cron do próprio Hermes:

```text
cronjob(action="create", name="manutencao-segundo-cerebro", schedule="every 1d at 21:00", workdir="CAMINHO_ABSOLUTO_DO_COFRE", enabled_toolsets=["file"], prompt="INSTRUÇÃO DA TAREFA")
```

O conjunto `file` do Hermes tem só ler, escrever, editar e buscar arquivos. `workdir` precisa ser o caminho absoluto do cofre; com ele, o Hermes carrega o `AGENTS.md` da pasta.

**Outros agentes ou chat sem arquivos.** Sem agendador próprio, não configure agendador do sistema operacional. Diga à pessoa que basta pedir "rode a manutenção" ao abrir o agente. O que chegou nesse meio-tempo fica pendente e entra na próxima vez.

## 3. Conferir e registrar

1. Liste as tarefas do agente, quando a ferramenta permitir, e confirme pasta, frequência e instrução.
2. Rode a tarefa uma vez agora e confira que `Registro da Manutenção.md` ganhou uma seção nova.
3. Acrescente ao registro uma linha "Agendamento: aplicativo, frequência, horário", sem inventar dados que a tela não mostrou.

Responda com o aplicativo usado, o horário escolhido e a condição para a tarefa rodar.
