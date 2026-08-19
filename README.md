# Mente Lendária Starter

Um cofre Obsidian pronto para a primeira vitória: Home, Canvas, Graph e notas conectadas, personalizados por uma IA a partir dos arquivos que a pessoa autorizar.

Não exige Git, terminal, plugins ou conhecimento técnico.

## Comece com um único prompt

Abra o Claude Cowork ou o ChatGPT Work com acesso aos arquivos locais e cole:

```text
Crie meu segundo cérebro no Obsidian usando este kit:
https://github.com/oalanicolas/mente-lendaria-starter/releases/latest/download/Minha-Mente-Lendaria.zip

Sou iniciante. Faça tudo por mim, sem me pedir para usar Git ou terminal. Baixe, extraia e siga .mente-lendaria/INSTRUCOES-DA-IA.md. Personalize com os arquivos que eu autorizar e abra a Home, o Canvas e o Graph funcionando. Nunca altere meus arquivos originais.
```

O prompt também está em [PROMPT-DO-SLIDE.md](PROMPT-DO-SLIDE.md).

## Baixar manualmente

Se preferir, use o botão abaixo. Não é preciso clonar o repositório.

[Baixar Minha Mente Lendária](https://github.com/oalanicolas/mente-lendaria-starter/releases/latest/download/Minha-Mente-Lendaria.zip)

Depois de extrair o ZIP, abra a pasta `Minha Mente Lendária` como um cofre no Obsidian.

## O que já vem pronto

- Uma nota `00 - Comece Aqui` com navegação inicial.
- Cinco mapas-semente conectados.
- Um Canvas inicial editável.
- Graph, backlinks, Canvas e busca habilitados.
- Aparência limpa, com um pequeno estilo visual próprio.
- Instruções para a IA descobrir documentos com segurança e produzir notas com fontes.
- Nenhum plugin da comunidade.

## Princípio de privacidade

A IA deve ler apenas pastas autorizadas, tratar as fontes como somente leitura e escrever apenas dentro do novo cofre. O fluxo exclui credenciais, arquivos ocultos, pastas do sistema e conteúdo sensível não autorizado.

## Desenvolvimento

O cofre distribuído vive em `vault/`. Para validar a estrutura:

```sh
npm run validate
```

