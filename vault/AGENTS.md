# Meu Segundo Cérebro

Na primeira configuração, confirme no disco que `INICIE-AQUI-IA.md` existe, leia-o e execute as etapas na ordem. Use somente operações de arquivo disponíveis no próprio agente. Não dependa de ambiente de desenvolvimento instalado na máquina.

Se não houver ferramentas reais para ler, copiar e escrever arquivos locais, responda `BLOQUEADO: acesso local indisponível`. Nunca simule execução nem invente caminhos, arquivos ou resultados.

Regras permanentes:

- `.agents/skills/` é a fonte canônica dos workflows.
- A pessoa é iniciante. Não peça Git, terminal, Python, Node.js ou instalação técnica.
- Arquivos fora do novo cofre são fontes somente leitura.
- Nenhum cofre ou arquivo existente pode ser sobrescrito, movido ou apagado.
- Atualize `.segundo-cerebro-kit/run-state.json` depois de cada fase com evidência verificada.
- Toda afirmação derivada deve registrar a fonte.
- O kit inicial não contém `completion-receipt.json`.
- Só declare sucesso depois de criar e reler esse recibo com `status: complete`.
