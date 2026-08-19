---
name: review-vault
description: Audit an Obsidian vault safely for note counts, real links, broken links, isolated notes, weakly connected notes, and useful hubs. Use for a weekly review, Graph health check, navigation diagnosis, or before improving the vault without moving or deleting the user's files.
---

# Revisar a saúde do cofre

Faça uma revisão segura e orientada a decisões. O objetivo não é maximizar métricas, mas descobrir onde o cofre deixou de ajudar a pessoa.

## 1. Medir sem alterar

Execute `scripts/vault_health.py` com o caminho do cofre. O script usa somente a biblioteca padrão do Python, ignora pastas ocultas e não escreve em nenhum arquivo.

```text
python3 scripts/vault_health.py "/caminho/do/cofre"
```

O comando é para uso interno da IA. Nunca peça que a pessoa abra um terminal. Se Python não estiver disponível, faça a inspeção com as ferramentas de arquivos do ChatGPT Work.

## 2. Interpretar

Revise nesta ordem:

1. Links quebrados, porque interrompem a navegação.
2. Notas isoladas, porque podem estar perdidas ou incompletas.
3. Notas com uma única relação, porque podem precisar de contexto.
4. Mapas e hubs, porque mostram os pontos de entrada atuais.
5. Home e Canvas, porque devem representar o que importa agora.

Não trate uma nota com muitos links como automaticamente valiosa. Não force conexões para melhorar números.

## 3. Recomendar

Entregue um diagnóstico curto com:

- total de notas e links;
- links quebrados;
- notas isoladas;
- notas com poucas conexões;
- principais hubs;
- três melhorias priorizadas.

Para cada melhoria, explique o benefício em linguagem simples. Use as skills `connect-notes` e `build-moc` quando elas forem apropriadas.

## 4. Editar somente no escopo pedido

Se a pessoa pedir apenas uma revisão, não altere o cofre. Se pedir correção, modifique somente arquivos dentro do cofre e faça mudanças verificáveis. Nunca mova ou apague arquivos originais, nunca configure Git e nunca instale plugins.

Depois de qualquer correção, execute a análise novamente e compare o antes e o depois.
