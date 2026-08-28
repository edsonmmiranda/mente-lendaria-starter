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

## Skills incluídas

- `segundo-cerebro-setup`: primeira configuração completa.
- `capture-source`: transforma fontes em notas com procedência.
- `connect-notes`: cria relações reais.
- `build-moc`: cria mapas de conteúdo quando um tema cresce.
- `review-vault`: mede a saúde do cofre com operações nativas do agente.

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
```
