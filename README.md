# Segundo Cérebro Kit

Um cofre Obsidian pronto para a primeira vitória: Home, Canvas, Graph, notas conectadas e Codex disponível na barra lateral.

## Zero ambiente de desenvolvimento

O fluxo de criação não depende de scripts de desenvolvimento. A pessoa não precisa instalar Python, Node.js, Git, terminal, plugins ou gerenciadores de pacotes. Toda a preparação usa as operações de arquivo que já fazem parte do agente escolhido.

O Codex Panel já vem empacotado e habilitado no cofre. Ele usa o Codex local já autenticado pela pessoa e não leva credenciais no ZIP.

O kit funciona com qualquer agente que realmente consiga:

- receber ou baixar e abrir o ZIP;
- listar arquivos locais sem ler conteúdo sensível;
- copiar uma pasta sem sobrescrever destinos;
- ler fontes selecionadas;
- criar e reler Markdown, JSON e Canvas dentro do novo cofre.

Se o agente for apenas um chat sem acesso aos arquivos do computador, o fluxo para com `BLOQUEADO` em vez de fingir que concluiu.

## Compatibilidade

- OpenAI e agentes compatíveis com Agent Skills: `.agents/skills/` e `AGENTS.md`.
- Claude Code: `.claude/skills/` e `CLAUDE.md`.
- Grok: compatibilidade com Claude Code e `AGENTS.md`.
- Hermes: `AGENTS.md` carregado pela pasta de trabalho do cron; as skills são lidas pelo caminho em `.agents/skills/`.
- Outros agentes: entrada universal `INICIE-AQUI-IA.md`.

O controle visual é opcional. Sem ele, o agente prepara e valida o cofre e fornece uma única instrução para abri-lo no Obsidian. Se o Obsidian ainda não existir, a instalação oficial é uma etapa separada e só acontece com autorização da pessoa.

## Codex dentro do Obsidian

O [Codex Panel](https://github.com/murashit/codex-panel) 5.6.0 está incluído em `.obsidian/plugins/codex-panel/` e habilitado em `.obsidian/community-plugins.json`.

- Reutiliza a sessão local já autenticada do Codex.
- Trabalha a partir da raiz do cofre.
- Recebe a nota ativa, seleções, wikilinks e anexos como contexto.
- Permite revisar alterações e aprovações dentro do Obsidian.
- Funciona no Obsidian Desktop 1.12.0 ou superior.

Na primeira abertura, o Obsidian pode pedir uma confirmação de segurança para executar plugins comunitários. Essa confirmação habilita o plugin já instalado, sem download adicional. O kit não inclui configurações pessoais, caminhos absolutos ou credenciais.

## Passo a passo para a pessoa

1. Abra o agente de IA que já usa.
2. Permita acesso aos arquivos quando o aplicativo solicitar.
3. Abra uma conversa nova.
4. Tire uma foto nítida do slide com o prompt abaixo ou copie o texto.
5. Anexe a foto e envie.
6. Aguarde o agente preparar o cofre.

## Prompt universal

```text
Crie meu segundo cérebro no Obsidian com este kit:
https://github.com/oalanicolas/segundo-cerebro-kit/releases/latest/download/Segundo-Cerebro-Kit.zip

Sou iniciante. Faça tudo por mim, sem Git nem terminal. Baixe, extraia e siga `.agents/skills/segundo-cerebro-setup/SKILL.md`. Use o acesso completo ao computador já concedido. Não peça novas autorizações e nunca apague nem sobrescreva meus arquivos originais.
```

O texto também está em [PROMPT-DO-SLIDE.md](PROMPT-DO-SLIDE.md).

## O que o agente executa

1. Copia o kit para o primeiro nome livre em Documentos.
2. Registra cada fase em `run-state.json` para permitir retomada.
3. Inventaria apenas metadados e exclui caminhos sensíveis antes de ler conteúdo.
4. Seleciona no máximo 12 fontes.
5. Cria até 12 notas quando as fontes sustentarem esse volume.
6. Conecta notas e atualiza mapas, Home e Canvas.
7. Verifica destinos dos links, notas isoladas e arquivos do Canvas.
8. Cria o recibo de conclusão somente após reler todas as evidências.

## Alimentação contínua

Depois da primeira configuração, o cofre passa a se alimentar sozinho.

1. As torneiras gravam material bruto em `Fontes/`: Readwise em `Fontes/Readwise`, Web Clipper em `Fontes/Web`, transcrições em `Fontes/Reunioes` e exportações em `Fontes/Documentos`.
2. Uma tarefa diária roda a skill `maintain-vault` no aplicativo que a pessoa já usa.
3. A skill lê só o que chegou, decide o que entra pelo critério em `Meu Norte.md` e `Perguntas que me Movem.md` e escreve notas com a fonte.
4. Tudo fica contado em `Registro da Manutenção.md`, inclusive o que ficou de fora e por quê.

O critério é da pessoa. A skill `interview-me` o constrói em entrevista, uma pergunta por vez, e só grava o que a pessoa aprovar.

Quem prefere aprovar antes muda `modo_de_entrada` para `com-aprovacao` em `.segundo-cerebro-kit/preferences.json`. Aí a manutenção só propõe, e uma curadoria rápida mostra o lote do dia para aprovar, corrigir ou recusar. Decisão substituída é marcada como `revogada`, nunca apagada.

A tarefa agendada só lista, lê, busca, cria e edita arquivos dentro do cofre. Não usa internet, não instala nada e nunca apaga, move ou renomeia nada. Onde o agente mexe em arquivos por comandos, como o Codex, os comandos ficam restritos a essas operações e o isolamento da pasta bloqueia a internet. O marcador de progresso é o conteúdo: cada fonte guarda até onde foi lida em `.segundo-cerebro-kit/source-ledger.json`, então um dia sem execução não perde nada.

| Aplicativo | Como agendar |
| --- | --- |
| Claude, aba Code do aplicativo desktop | Tarefa local criada na conversa ou em Routines; roda com o aplicativo aberto e o computador acordado |
| ChatGPT ou Codex, aplicativo desktop | Tarefa agendada criada na conversa, com `$maintain-vault` e modo workspace-write |
| Hermes | `cronjob` com `workdir` do cofre e somente o conjunto de ferramentas `file` |
| Outros | Sem agendador: a pessoa pede "rode a manutenção" e o pendente entra |

A skill `schedule-maintenance` guia esse passo em cada aplicativo.

## Skills incluídas

- `segundo-cerebro-setup`: primeira configuração completa.
- `capture-source`: transforma fontes em notas com procedência.
- `connect-notes`: cria relações reais.
- `build-moc`: cria mapas de conteúdo quando um tema cresce.
- `review-vault`: mede a saúde do cofre com operações nativas do agente.
- `maintain-vault`: processa o que chegou em `Fontes/` com o critério da pessoa.
- `interview-me`: constrói e revisa o critério em entrevista, com aprovação por edição.
- `schedule-maintenance`: agenda a manutenção diária no aplicativo da pessoa.
- `answer-from-vault`: responde e monta entregas a partir do cofre, com a fonte de cada parte e as lacunas visíveis.
- `calibrate-voice`: transforma textos aprovados em um cartão de voz testável e guarda uma correção aprovada por vez. Adaptada do pacote Write in Your Voice de iwo-szapar/second-brain-skills (Apache-2.0); licença em `.agents/skills/calibrate-voice/LICENSE`.

`.agents/skills/` é a fonte canônica. `.claude/skills/` é uma projeção validada e idêntica.

## Privacidade

Desktop, Documentos e Downloads são fontes somente leitura. O inventário usa apenas nome, tipo, data e tamanho, ignora arquivos ocultos e bloqueia nomes associados a credenciais e categorias sensíveis. Conteúdo só é lido depois da seleção, no máximo 12 fontes.

O Codex Panel executa o Codex local com a raiz do novo cofre como pasta de trabalho. As permissões continuam sob controle da pessoa dentro do painel.

## Download

[Baixar o Segundo Cérebro Kit](https://github.com/oalanicolas/segundo-cerebro-kit/releases/latest/download/Segundo-Cerebro-Kit.zip)

## Desenvolvimento do repositório

Esta seção é exclusiva para mantenedores. As ferramentas abaixo não fazem parte do ZIP nem são necessárias na máquina da pessoa usuária.

```sh
npm run check
npm run bench -- --agent claude --task maintain
```

`npm run check` inclui o teste do checador da manutenção sobre a fixture de alimentação contínua. `bench` roda um agente real numa fixture, com `--task maintain`, `ask` ou `voice` e o modelo padrão do agente, consome a assinatura ou a API dele e guarda a evidência em `bench-results/`. Detalhes em [fixtures/alimentacao-continua/README.md](fixtures/alimentacao-continua/README.md).
