# Mente Lendária Starter

Um cofre Obsidian pronto para a primeira vitória: Home, Canvas, Graph e notas conectadas, personalizados pelo ChatGPT Work a partir dos arquivos que a pessoa autorizar.

Não exige Git, terminal, plugins ou conhecimento técnico. Esta versão usa somente ChatGPT.

## Passo a passo para o aluno

1. Instale ou atualize o aplicativo do ChatGPT no computador.
2. Abra uma nova conversa e selecione o modo Work.
3. Tire uma foto nítida do slide com o prompt abaixo.
4. Anexe a foto na conversa e envie.
5. Quando o ChatGPT pedir, autorize somente as pastas ou os arquivos que deseja incluir.
6. Aguarde o ChatGPT baixar o kit, montar o cofre e abrir a primeira Home no Obsidian.

A pessoa não precisa entrar no GitHub, baixar o ZIP manualmente nem digitar comandos. Se o Obsidian ainda não estiver instalado, o ChatGPT pedirá autorização antes de baixar a versão oficial.

## Prompt do slide

```text
Crie meu segundo cérebro no Obsidian com este kit:
https://github.com/oalanicolas/mente-lendaria-starter/releases/latest/download/Minha-Mente-Lendaria.zip

Sou iniciante. Faça tudo por mim, sem Git nem terminal. Baixe, extraia e siga `.agents/skills/mente-lendaria-setup/SKILL.md`. Use só os arquivos que eu autorizar e nunca altere os originais.
```

O texto também está em [PROMPT-DO-SLIDE.md](PROMPT-DO-SLIDE.md). Se a foto não for lida corretamente, basta colar o prompt na conversa.

## Skills incluídas

O kit leva cinco workflows locais, derivados dos melhores padrões do cofre Mente Lendária e reescritos para uma pessoa iniciante:

- `mente-lendaria-setup`: executa a primeira configuração completa.
- `capture-source`: transforma arquivos, artigos e transcrições em notas com fonte.
- `connect-notes`: cria relações reais e repara notas isoladas.
- `build-moc`: cria mapas de conteúdo leves quando um tema cresce.
- `review-vault`: mede links, órfãs e hubs sem alterar arquivos.

As skills ficam em `.agents/skills/` dentro do cofre. A pessoa não precisa instalá-las nem configurá-las.

## O que já vem pronto

- Uma nota `00 - Comece Aqui` com navegação inicial.
- Cinco mapas-semente conectados.
- Um Canvas inicial editável.
- Graph, backlinks, Canvas e busca habilitados.
- Aparência limpa, com um pequeno estilo visual próprio.
- Instruções para descobrir documentos com segurança e produzir notas com fontes.
- Nenhum plugin da comunidade.

## Privacidade

O ChatGPT deve ler apenas pastas autorizadas, tratar as fontes como somente leitura e escrever apenas dentro do novo cofre. O fluxo exclui credenciais, arquivos ocultos, pastas do sistema e conteúdo sensível não autorizado.

## Download opcional

O download manual existe apenas como alternativa:

[Baixar Minha Mente Lendária](https://github.com/oalanicolas/mente-lendaria-starter/releases/latest/download/Minha-Mente-Lendaria.zip)

## Desenvolvimento

O cofre distribuído vive em `vault/`. Para validar a estrutura:

```sh
npm run validate
```
