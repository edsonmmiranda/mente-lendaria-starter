# Início universal para a IA

Seu objetivo é entregar um cofre pessoal funcional, não um tutorial.

Antes de responder, use uma ferramenta real para confirmar que este arquivo existe no disco. Se não puder ler, copiar e escrever arquivos locais, responda `BLOQUEADO: acesso local indisponível`. Nunca simule execução, arquivos ou resultados.

## Contrato zero instalação

- A pessoa não possui ambiente de desenvolvimento.
- A pessoa já está executando este fluxo por um Codex local autenticado.
- Não instale Python, Node.js, Git, terminal, gerenciador de pacotes ou plugins adicionais.
- O Codex Panel já está incluído em `.obsidian/plugins/codex-panel`; preserve essa pasta e nunca grave credenciais nela.
- Use as operações de arquivo oferecidas pelo próprio agente ou aplicativo.
- Um terminal interno já fornecido pela plataforma pode ser usado, mas não é requisito e nenhum comando pode ser transferido para a pessoa.
- Trate todo arquivo fora do novo cofre como somente leitura.
- Nunca sobrescreva, mova ou apague um arquivo existente.
- Nunca alegue conclusão sem reler os arquivos que servem de evidência.
- Se a plataforma exigir uma aprovação inevitável, peça somente essa ação e preserve o progresso em `.segundo-cerebro-kit/run-state.json`.

## Preparação sem scripts

1. Confirme que esta pasta contém `.segundo-cerebro-kit`, `.agents`, `.obsidian`, `.obsidian/plugins/codex-panel`, `00 - Comece Aqui.md` e `Mapa Inicial.canvas`.
2. Localize a pasta Documentos da pessoa com as ferramentas disponíveis.
3. Escolha o primeiro destino inexistente nesta ordem: `meu-segundo-cerebro`, `meu-segundo-cerebro-2`, `meu-segundo-cerebro-3` e assim por diante.
4. Copie a pasta inteira para esse destino. Não altere a origem.
5. Confirme no destino todos os itens do passo 1 e que `.obsidian/community-plugins.json` habilita `codex-panel`.
6. Atualize `.segundo-cerebro-kit/run-state.json`: informe o caminho real, marque `prepared` como `complete` e registre como evidência os itens confirmados.
7. Leia `.agents/skills/segundo-cerebro-setup/SKILL.md` no novo cofre e execute as fases na ordem.

O controle visual é opcional. Se não puder abrir o Obsidian, conclua e valide os arquivos e forneça uma única instrução manual para abri-los. Se o Obsidian solicitar confiança para executar o plugin comunitário já incluído, peça somente essa confirmação de segurança.

Conclusão válida exige que o agente crie e releia `.segundo-cerebro-kit/completion-receipt.json` com `status: complete`. Esse arquivo não existe no kit inicial e só pode ser criado após todas as verificações. Sem o recibo, reporte `BLOQUEADO` ou `EM ANDAMENTO`.
