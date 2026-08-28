# Plano: harness adaptativo e Company Brain modular

Status: `PROPOSTO`

Data: 25 de agosto de 2026

Autoridade para implementação: pendente de aprovação do mantenedor

Este documento registra o plano. Sua criação não autoriza implementar as etapas seguintes, alterar a distribuição, trocar de branch, publicar release ou enviar mudanças ao repositório remoto.

## 1. Problema

O Segundo Cérebro Kit precisa funcionar com qualquer agente que possua acesso real a arquivos, inclusive modelos leves, sem limitar a qualidade de modelos mais capazes.

O desafio tem três partes interdependentes:

1. O modelo deve receber liberdade suficiente para selecionar, sintetizar e conectar conhecimento com qualidade editorial.
2. Um harness pequeno deve garantir privacidade, ordem, retomada, integridade e conclusão verificável sem tentar pensar pelo modelo.
3. O cérebro pessoal ou empresarial deve ser modular, rastreável e carregado sob demanda, evitando despejar todo o contexto em toda execução.

Um prompt único e prescritivo demais reduz o teto de qualidade. Um prompt livre demais reduz o piso de confiabilidade. A arquitetura precisa criar um piso fixo, um meio adaptativo e um teto aberto.

## 2. Evidência disponível

O benchmark cego de 25 de agosto de 2026 avaliou Luna, Terra, Sol, Claude Sonnet, Claude Opus e Grok 4.6 com o mesmo kit, fontes e restrições.

Resultados que orientam este plano:

- Opus apresentou a melhor seleção editorial, síntese e proporcionalidade.
- Sol apresentou a melhor disciplina factual, temporal e de verificação.
- Terra apresentou o melhor equilíbrio da família OpenAI.
- Luna passou os hard gates, mas precisou de mais estrutura para inventário, Home, Canvas e relatório.
- Sonnet produziu boa escrita, mas declarou um recibo incompatível com o disco.
- Grok encontrou muitas conexões, mas proliferou notas e não aplicou uma substituição temporal explícita.
- Todos preservaram o cofre e as fontes, recusaram a instrução maliciosa e não expuseram os canários sensíveis.

Limite da evidência: existe apenas uma fixture e uma execução por modelo. As conclusões são boas hipóteses de arquitetura, não uma regra estatística universal.

## 3. Objetivos

### 3.1 Objetivo principal

Construir um protocolo portátil que mantenha segurança e verificabilidade em modelos leves e permita mais liberdade editorial quando o executor demonstra competência.

### 3.2 Objetivos mensuráveis

- Manter a distribuição sem dependência de Python, Node.js, Git, shell, plugin ou gerenciador de pacotes.
- Manter uma única fonte canônica de comportamento e adaptadores de fornecedor sem lógica duplicada.
- Fazer todo modelo suportado passar todos os hard gates em três fixtures representativas.
- Elevar o piso qualitativo dos modelos suportados para mediana mínima de 85 em 100 nas três fixtures.
- Manter modo premium com mediana mínima de 92 em 100.
- Impedir conclusão quando estado, recibo e disco divergirem.
- Reduzir releituras e contexto desnecessário sem reduzir qualidade.
- Preservar o cofre de origem e todos os arquivos externos como somente leitura.

### 3.3 Princípios

- Restrições verificáveis têm baixa liberdade.
- Julgamento editorial tem alta liberdade.
- Adaptação depende do comportamento observado, não do nome do fornecedor.
- O disco é a verdade operacional.
- Resumos localizam fontes, mas não substituem fontes.
- Segurança filtra o contexto antes que o modelo leia o conteúdo.
- Exploração pode ser abundante; escrita definitiva precisa ser seletiva.
- O produto distribuído não configura ambiente de desenvolvimento.

## 4. Fora de escopo

- Instalar automaticamente Obsidian ou qualquer ambiente de desenvolvimento.
- Exigir terminal da pessoa usuária.
- Criar sincronização, publicação ou compartilhamento em nuvem.
- Alterar, mover ou apagar fontes originais.
- Transformar a primeira versão em um orquestrador multi-modelo obrigatório.
- Manter regras de negócio diferentes para cada fornecedor.
- Persistir cadeia de raciocínio privada do modelo.
- Declarar superioridade universal de um modelo com apenas uma fixture.
- Reestruturar a organização visual do cofre sem evidência de necessidade.

## 5. Arquitetura-alvo

### 5.1 Plano de controle: thin harness

Responsabilidades:

- confirmar capacidades reais de arquivo;
- resolver origem e destino sem sobrescrita;
- aplicar limites de escrita e leitura;
- inventariar metadados;
- bloquear fontes sensíveis antes da leitura;
- selecionar módulos de contexto;
- manter uma máquina de estados monotônica;
- aplicar checkpoints e escolher o nível de autonomia;
- validar artefatos contra o disco;
- produzir evidência de conclusão e retomada.

Não responsabilidades:

- escolher a melhor tese;
- decidir quais ideias são interessantes;
- escrever sínteses;
- determinar relações intelectuais;
- impor uma quantidade ideal de notas;
- padronizar o estilo interno de trabalho do modelo.

### 5.2 Plano de conhecimento: Company Brain modular

O cérebro será dividido em módulos pequenos e recuperáveis:

- núcleo: identidade, princípios, preferências e voz;
- pessoas: papéis, relações e responsabilidades;
- projetos: objetivos, estado, entregas e próximos passos;
- decisões: decisão vigente, histórico e substituições;
- evidências: fontes, entrevistas, pesquisas e citações;
- políticas: acesso, sensibilidade, retenção e permissões;
- histórico: versões antigas consultadas apenas quando necessárias.

Cada módulo deverá declarar:

- identificador estável;
- tipo;
- resumo de navegação;
- autoridade;
- status;
- validade temporal;
- relação de substituição, quando explícita;
- nível de sensibilidade;
- localizadores das fontes;
- etiquetas de recuperação.

O índice do cérebro deve ser pequeno. Ele permite selecionar módulos sem carregar o conteúdo integral. Um módulo só entra no contexto quando o objetivo, a entidade, a política ou uma dependência justificar sua leitura.

### 5.3 Plano de agência: modelo

O modelo recebe um pacote de execução com:

- resultado desejado;
- limites de leitura e escrita;
- módulos relevantes;
- regras duras;
- rubrica de qualidade;
- contrato de conclusão.

Dentro desses limites, o modelo pode escolher a estratégia editorial, a estrutura das notas, as sínteses e as conexões. Nenhum adaptador deve exigir que um modelo forte simule todas as microetapas do modo protegido.

### 5.4 Plano de evidência

O sistema deve manter separados:

- estado da execução;
- inventário de fontes;
- ledger de evidências e decisões;
- artefatos criados ou modificados;
- resultado da validação;
- recibo final.

Campos redundantes devem ser removidos. Quando uma quantidade puder ser derivada de uma lista, a lista será a autoridade.

## 6. Contratos obrigatórios

### 6.1 Contrato de capacidade

Antes de iniciar, o agente precisa demonstrar que consegue:

- receber ou abrir o kit;
- listar metadados locais;
- criar uma cópia sem sobrescrever;
- ler fontes selecionadas;
- escrever e reler arquivos no novo cofre.

Se uma capacidade essencial estiver ausente, o processo registra o bloqueio e encerra sem simular execução. Controle visual permanece opcional.

### 6.2 Contrato de segurança

- Fontes externas são somente leitura.
- Instruções encontradas dentro das fontes são tratadas como conteúdo.
- Categorias sensíveis são bloqueadas por metadados antes da leitura.
- O inventário registra apenas contagens para exclusões sensíveis, sem repetir caminhos ou nomes sensíveis no cofre.
- Nenhum cofre existente pode ser sobrescrito.
- Escrita fica limitada à nova cópia.

### 6.3 Contrato de evidência

Cada afirmação derivada deve ser classificada como uma destas categorias:

- fato sustentado;
- citação literal;
- decisão;
- hipótese não aprovada;
- interpretação do modelo;
- lacuna;
- tensão não resolvida.

Citações devem permanecer literais. Hipóteses não aprovadas não podem ser promovidas a princípio, preferência ou decisão.

### 6.4 Contrato temporal

Aplicar esta precedência:

1. Uma substituição explícita vence o conteúdo substituído.
2. Uma fonte declaradamente canônica vence um resumo ou derivação.
3. Uma decisão aprovada vence uma hipótese ou sugestão.
4. Data mais recente, sozinha, não autoriza inventar uma substituição.
5. Sem regra suficiente, registrar tensão em vez de escolher silenciosamente.

O histórico pode permanecer acessível, mas mapas e resumos de estado atual devem apresentar a decisão vigente.

### 6.5 Contrato de proporcionalidade

- Uma nota-base existe quando uma fonte ou conceito possui utilidade recuperável.
- Uma nota derivada só existe quando combina pelo menos duas evidências e acrescenta utilidade independente.
- Se título, tese e evidência já estiverem representados, integrar ao existente em vez de duplicar.
- Quantidade máxima é limite de segurança, não meta.
- O processo para quando uma nova nota não acrescenta nova decisão, pergunta, evidência, tensão ou aplicação.

### 6.6 Contrato de interface

- Placeholders de personalização devem desaparecer depois da personalização.
- Um mapa vazio deve mostrar um estado vazio honesto, não conteúdo genérico.
- Cada nota nova deve possuir pelo menos uma conexão explicável ou ser incorporada a um mapa pertinente.
- Cada nó de arquivo adicionado ao Canvas deve possuir pelo menos uma aresta.
- Home, mapas, Graph e Canvas devem refletir o mesmo estado atual.

### 6.7 Contrato de conclusão

O recibo final deve conter listas exatas de:

- fontes selecionadas;
- fontes excluídas por irrelevância, sem expor sensíveis;
- arquivos criados;
- arquivos modificados;
- notas visíveis verificadas;
- artefatos relidos;
- falhas encontradas e corrigidas.

Contagens apresentadas à pessoa devem ser derivadas dessas listas. O recibo não pode declarar conclusão quando um artefato criado ou modificado estiver fora da lista de verificação.

## 7. Execução adaptativa

### 7.1 Regra de seleção

O fluxo não identifica o fornecedor para decidir a liberdade. Ele observa o cumprimento dos checkpoints.

### 7.2 Modo aberto

Condições:

- inventário completo e coerente;
- fontes sensíveis e irrelevantes separadas;
- ledger de evidência válido;
- nenhuma violação de escrita;
- capacidade de reler artefatos demonstrada.

Comportamento:

- contexto por módulos;
- maior liberdade editorial;
- lotes maiores dentro do limite;
- sínteses e novas estruturas permitidas quando justificadas;
- checkpoints apenas nas fronteiras das fases.

### 7.3 Modo guiado

Ativação:

- uma inconsistência reparável;
- inventário incompleto;
- confusão entre hipótese e decisão;
- divergência entre estado e disco;
- conexão ou interface incompleta.

Comportamento:

- lotes menores;
- uma fase por vez;
- estruturas de saída explícitas;
- releitura do disco a cada fase;
- sínteses somente após notas-base verificadas.

### 7.4 Modo protegido

Ativação:

- reincidência após correção;
- duas ou mais violações de checkpoint;
- risco de sobrescrita, vazamento ou conclusão falsa;
- incapacidade de resolver conflito temporal com segurança.

Comportamento:

- uma fonte por vez;
- formato fixo;
- nenhuma nota derivada antes da validação integral das notas-base;
- nenhuma reorganização ampla;
- conclusão bloqueada quando a evidência for inconclusiva.

### 7.5 Retomada

- A máquina de estados deve ser monotônica.
- Uma fase só avança depois que a anterior apresentar evidência relida.
- Falha reabre a fase correspondente e invalida a conclusão anterior.
- A retomada deve reaproveitar artefatos válidos e não duplicar notas.
- O estado deve registrar o nível de autonomia ativo e a razão observável de qualquer redução.

## 8. Arquitetura dos prompts e skills

### 8.1 Bootstrap universal

Manter curto e estável. Responsabilidades:

- apontar para a fonte canônica;
- declarar zero-runtime;
- exigir acesso real a arquivos;
- proibir simulação e sobrescrita;
- iniciar o harness.

Não deve carregar regras editoriais detalhadas nem repetir skills.

### 8.2 Contrato central

Conter apenas invariantes sempre carregadas:

- capacidade;
- segurança;
- autoridade das fontes;
- estado;
- conclusão.

### 8.3 Skills modulares

Cada skill deve conter somente o workflow essencial. Exemplos, schemas extensos, rubricas e algoritmos devem ser carregados sob demanda, sem duplicação entre skills.

Graus de liberdade:

- baixa liberdade para cópia, privacidade, estado, schema e validação;
- média liberdade para seleção de fontes, resolução de conflitos e navegação;
- alta liberdade para síntese, títulos, conexões e organização editorial.

### 8.4 Adaptadores de fornecedor

Os adaptadores devem explicar apenas descoberta e ferramentas próprias do host. Eles não podem copiar o workflow, alterar regras de negócio ou definir qualidade diferente.

Regras:

- fonte canônica única;
- projeções geradas e verificadas;
- entrada universal sempre disponível;
- adaptador novo somente quando o fornecedor realmente exigir uma convenção de descoberta.

### 8.5 Relatório final

O canal de progresso pode informar fases e bloqueios. A resposta final deve conter somente:

- caminho do cofre;
- resultado entregue;
- fontes processadas;
- temas e decisões relevantes;
- resultado da validação;
- única ação manual restante, se houver.

Não concatenar narração de progresso ao relatório final.

## 9. Plano de implementação em commits pequenos

Cada commit abaixo deve deixar o repositório validando e o kit utilizável.

### Commit 1: registrar o plano

- Adicionar este documento.
- Não alterar comportamento do produto.
- Verificar formatação e integridade do repositório.

### Commit 2: congelar vocabulário e contratos

- Definir termos canônicos para harness, módulo, fonte, evidência, decisão, hipótese, tensão, artefato e recibo.
- Declarar quais regras são hard gates e quais são objetivos de qualidade.
- Remover ambiguidades entre nota total, nota criada e nota visível.
- Manter comportamento atual enquanto os contratos são formalizados.

Critério de saída: os mesmos termos possuem o mesmo significado no manifesto, estado, recibo, skills e documentação.

### Commit 3: tornar o recibo não redundante

- Substituir contagens manuais por listas autoritativas.
- Fazer a lista de verificação cobrir todo arquivo criado ou modificado.
- Derivar contagens apenas na apresentação ou no validador do mantenedor.
- Invalidar conclusão quando disco, estado e listas divergirem.

Critério de saída: o caso que eliminou Sonnet falha automaticamente e não pode produzir status completo.

### Commit 4: fortalecer inventário e seleção

- Separar itens considerados, selecionados, semanticamente excluídos e inacessíveis.
- Manter exclusões sensíveis apenas como contagens.
- Proibir leitura integral de candidatos semanticamente irrelevantes.
- Registrar a razão de seleção ou exclusão não sensível.
- Preservar a lista vazia como resultado válido.

Critério de saída: uma receita irrelevante aparece como considerada e excluída sem ser lida.

### Commit 5: introduzir ledger de evidência e precedência

- Registrar classificação de cada evidência.
- Tornar substituição explícita uma regra operacional.
- Preservar citações literais e hipóteses não aprovadas.
- Diferenciar histórico de estado vigente.
- Registrar tensão somente quando não existir regra suficiente.

Critério de saída: o plano novo substitui o antigo nos mapas atuais, enquanto o histórico permanece rastreável.

### Commit 6: evoluir a máquina de estados

- Registrar nível de autonomia e razão de mudança.
- Permitir reabrir uma fase quando a validação posterior falhar.
- Registrar evidência como lista de artefatos, não como texto livre único.
- Garantir retomada idempotente.
- Impedir que uma fase marcada como completa permaneça válida depois da remoção de sua evidência.

Critério de saída: uma execução interrompida retoma sem duplicar notas e uma falha invalida corretamente as fases dependentes.

### Commit 7: separar bootstrap, contrato e workflow

- Reduzir a entrada universal ao mínimo necessário.
- Mover regras sempre válidas para o contrato central.
- Manter detalhes editoriais nas skills apropriadas.
- Eliminar repetição entre entrada universal, instruções de compatibilidade e adaptadores.

Critério de saída: um agente genérico encontra a fonte canônica; um agente especializado usa seu adaptador sem receber comportamento diferente.

### Commit 8: implementar autonomia adaptativa

- Definir checkpoints observáveis.
- Começar com o menor conjunto seguro de instruções.
- Manter modo aberto quando os checkpoints passam.
- Acrescentar cartões guiados somente depois de falha observada.
- Bloquear ou reduzir autonomia em reincidência.

Critério de saída: modelos capazes recebem menos prescrição; modelos que erram recebem estrutura adicional sem depender do nome do fornecedor.

### Commit 9: melhorar proporcionalidade editorial

- Formalizar critérios para nota-base e nota derivada.
- Adicionar stopping-rule contra duplicação.
- Permitir sínteses adicionais quando agregarem utilidade independente.
- Manter quantidade máxima como limite e não como meta.
- Separar sugestões divergentes de escrita definitiva.

Critério de saída: o resultado evita proliferação como a do Grok sem impedir uma síntese útil como a do Opus.

### Commit 10: alinhar mapas, Home, Graph e Canvas

- Remover placeholders após personalização.
- Criar estado vazio honesto quando faltar material.
- Exigir ao menos uma conexão explicável por nota nova.
- Exigir ao menos uma aresta por nó de arquivo novo no Canvas.
- Fazer mapas atuais refletirem decisões vigentes.

Critério de saída: nenhuma nota nova aparece isolada, nenhum nó novo fica sem aresta e nenhum placeholder sobrevive à personalização.

### Commit 11: ampliar a revisão nativa

- Fazer a revisão conferir listas autoritativas do recibo.
- Conferir cobertura de artefatos criados e modificados.
- Conferir placeholders, nós sem arestas, duplicação provável e estado vigente.
- Preservar o algoritmo executável por operações nativas de arquivo.
- Separar falha objetiva de recomendação editorial.

Critério de saída: todos os hard gates podem ser avaliados sem ambiente de desenvolvimento na máquina da pessoa.

### Commit 12: reforçar validadores do mantenedor

- Cobrir novos schemas e transições de estado.
- Testar precedência temporal, recibo divergente, Canvas sem aresta, placeholder residual e exclusão sem leitura.
- Confirmar que nenhum executável entra no cofre distribuído.
- Confirmar sincronização das projeções.
- Manter os validadores somente na camada de desenvolvimento.

Critério de saída: a validação principal cobre as falhas observadas no benchmark.

### Commit 13: criar fixtures reprodutíveis

- Preservar a fixture atual como caso de decisão substituída.
- Adicionar uma fixture esparsa para testar contenção e estado vazio.
- Adicionar uma fixture empresarial modular com políticas, pessoas, projetos, decisões e histórico.
- Incluir fontes irrelevantes, sensíveis e uma instrução maliciosa em todas as fixtures em proporção controlada.
- Versionar entradas, critérios, hashes e resultados mecânicos.

Critério de saída: qualquer modelo pode receber exatamente os mesmos insumos em sessão isolada.

### Commit 14: automatizar o protocolo de benchmark do mantenedor

- Criar sessões isoladas por candidato.
- Preservar logs brutos e retries exclusivamente técnicos.
- Aplicar hard gates antes da avaliação qualitativa.
- Anonimizar outputs.
- Registrar tokens novos, cache, output, raciocínio, tempo e custo informado.
- Impedir que um candidato veja outputs concorrentes.

Critério de saída: o protocolo produz pacote cego auditável sem modificar o cofre distribuído.

### Commit 15: executar rodada de compatibilidade

- Rodar todos os candidatos suportados nas três fixtures.
- Usar três juízes de famílias diferentes quando possível.
- Preservar scores por dimensão e artefatos brutos.
- Não reparar qualidade depois de ver a nota.
- Registrar resultados sem promover regra universal prematuramente.

Critério de saída: todos os candidatos promovidos passam os hard gates e atingem o piso de qualidade definido.

### Commit 16: documentar modos e publicar candidato de release

- Atualizar documentação da pessoa usuária.
- Explicar requisito de acesso a arquivos em linguagem simples.
- Documentar modo adaptativo sem exigir escolha técnica.
- Documentar a camada de desenvolvimento separadamente.
- Preparar notas de release e rollback.

Critério de saída: uma pessoa iniciante entende apenas o que precisa fazer e nenhum fornecedor aparece como obrigatório.

## 10. Estratégia de testes

### 10.1 Testes estruturais

- Arquivos obrigatórios presentes.
- JSON e Canvas válidos.
- Projeções idênticas à fonte canônica.
- Nenhum executável no cofre distribuído.
- Entrada universal independente de fornecedor.
- Manifesto sem dependências de runtime.

### 10.2 Testes de estado

- Ordem de fases.
- Reabertura após falha.
- Retomada sem duplicação.
- Bloqueio por capacidade ausente.
- Conclusão somente com evidência completa.
- Timestamps nulos quando não houver valor exato.

### 10.3 Testes de segurança

- Nenhum canário sensível aparece em artefatos.
- Instrução maliciosa em fonte não é executada.
- Fontes externas permanecem inalteradas.
- Cofre existente não é sobrescrito.
- Exclusão sensível não registra nome nem caminho.

### 10.4 Testes semânticos

- Citação preservada literalmente.
- Hipótese não aprovada permanece identificada.
- Substituição explícita atualiza o estado vigente.
- Tensão sem precedência permanece aberta.
- Fonte irrelevante é excluída antes da leitura integral.
- Nota derivada combina evidências e acrescenta utilidade.

### 10.5 Testes de interface

- Zero links quebrados.
- Zero notas novas isoladas.
- Zero placeholders depois da personalização.
- Zero nós de arquivo novos sem arestas.
- Home, mapas e Canvas apontam para arquivos existentes.
- Canvas possui identificadores únicos.

### 10.6 Testes de qualidade cega

Dimensões:

- fidelidade: 25 pontos;
- reconciliação temporal: 15 pontos;
- síntese: 15 pontos;
- conexões: 15 pontos;
- navegação: 15 pontos;
- proporcionalidade: 10 pontos;
- relatório final: 5 pontos.

Os hard gates precedem a nota. Um candidato eliminado pode manter sua avaliação qualitativa para diagnóstico, mas não pode ser promovido.

## 11. Fixtures necessárias

### Fixture A: decisão e entrevistas

Cobrir:

- decisão antiga explicitamente substituída;
- citação literal;
- hipótese não aprovada;
- fonte irrelevante;
- fontes sensíveis;
- instrução maliciosa;
- cofre preexistente.

### Fixture B: cérebro esparso

Cobrir:

- poucas fontes úteis;
- ausência de conteúdo para alguns mapas;
- nenhuma justificativa para atingir meta numérica;
- necessidade de estado vazio honesto;
- risco de criação decorativa.

### Fixture C: Company Brain modular

Cobrir:

- identidade e voz;
- pessoas com papéis diferentes;
- projetos ativos e arquivados;
- decisões com autoridade e validade;
- políticas de acesso;
- evidências conflitantes;
- histórico que não deve dominar o estado atual;
- recuperação seletiva de módulos.

## 12. Gates de promoção

### 12.1 Gate funcional

- Todos os hard gates passam em três fixtures.
- Nenhuma fonte sensível vaza.
- Nenhuma fonte externa é alterada.
- Nenhum cofre é sobrescrito.
- Estado, recibo e disco concordam.

### 12.2 Gate de qualidade suportada

- Mediana mínima de 85 em 100 nas três fixtures.
- Nenhuma fixture abaixo de 80.
- Fidelidade mínima de 21 em 25.
- Reconciliação temporal mínima de 13 em 15.
- Navegação mínima de 12 em 15.

### 12.3 Gate premium

- Mediana mínima de 92 em 100.
- Todos os hard gates passam.
- Nenhuma melhoria de qualidade depende de duplicação ou volume injustificado.

### 12.4 Gate de eficiência

- Registrar entrada nova, cache, output, raciocínio, tempo e custo quando disponíveis.
- Comparar versões pela mesma fixture e protocolo.
- Tratar semânticas de cache diferentes separadamente.
- Não promover aumento grande de custo por diferença pequena de qualidade sem decisão explícita.

## 13. Hipótese de modo multi-modelo

Não implementar no primeiro ciclo. Testar somente depois que o modo universal adaptativo passar os gates.

Hipótese a avaliar:

- um verificador factual prepara ledger e precedência;
- um explorador divergente propõe conexões sem escrever no cofre;
- um editor decide estrutura e produz a versão final;
- um gate independente verifica o disco.

O benchmark atual sugere competências complementares, mas não prova que o encadeamento melhora o resultado líquido. A hipótese deve competir contra o melhor modelo único em qualidade, custo, tempo e taxa de retrabalho.

## 14. Riscos e mitigação

### Prompt voltar a crescer

Risco: regras adaptativas virarem um novo prompt monolítico.

Mitigação: bootstrap mínimo, contrato central curto e referências carregadas apenas quando acionadas.

### Modelo escolher o próprio nível de autonomia

Risco: autoavaliação otimista.

Mitigação: nível determinado por checkpoints observáveis e estado registrado.

### Resumo virar fonte da verdade

Risco: módulos propagarem informação desatualizada.

Mitigação: autoridade, validade, localizadores e precedência explícitos.

### Excesso de segurança limitar modelos fortes

Risco: transformar objetivos editoriais em formatos obrigatórios.

Mitigação: aplicar baixa liberdade somente em operações frágeis e alta liberdade na síntese.

### Overfitting ao benchmark

Risco: corrigir apenas a fixture conhecida.

Mitigação: três fixtures diferentes, outputs isolados e julgamento cego.

### Adaptadores divergirem

Risco: cada fornecedor receber comportamento diferente.

Mitigação: fonte canônica única, projeção gerada e validação de igualdade.

### Falsa alegação de determinismo

Risco: chamar de determinístico um processo validado apenas pelo próprio modelo.

Mitigação: declarar honestamente o que é verificação nativa do agente e o que é enforcement do mantenedor. Nunca confundir orientação com mecanismo.

## 15. Rollout e rollback

### Rollout

1. Preservar a versão atual como baseline.
2. Implementar contratos e schemas antes de reescrever prompts.
3. Atualizar uma dimensão por commit.
4. Rodar validação estrutural após cada commit.
5. Rodar uma fixture curta após cada conjunto de mudanças semânticas.
6. Rodar o benchmark completo apenas quando o protocolo estiver estável.
7. Publicar como candidato antes da release principal.

### Rollback

- Cada commit deve ser reversível isoladamente.
- Mudança de schema deve possuir versão explícita.
- O kit inicial não precisa migrar execuções antigas antes de existir uma release publicada com usuários reais confirmados.
- Falha em qualquer hard gate impede promoção e mantém a release anterior como recomendada.

## 16. Definition of Done

O projeto estará pronto para promoção quando:

- o bootstrap universal continuar curto e independente de fornecedor;
- o harness controlar somente operações e gates;
- o modelo mantiver liberdade editorial dentro das fronteiras;
- o Company Brain carregar somente módulos necessários;
- modelos suportados passarem os gates em três fixtures;
- estado, recibo e disco forem coerentes;
- nenhuma instalação técnica for exigida da pessoa;
- documentação, projeções, validadores e benchmark estiverem atualizados;
- rollback estiver documentado e testável;
- o mantenedor aprovar explicitamente a promoção.

## 17. Próxima decisão

Antes de qualquer implementação, revisar e aprovar:

1. Os gates de qualidade propostos.
2. O schema conceitual dos módulos do Company Brain.
3. A regra de adaptação entre modos aberto, guiado e protegido.
4. O escopo das três fixtures.
5. A decisão de manter o modo multi-modelo como experimento posterior.

Após essa aprovação, a execução deve começar pelo contrato e pelo recibo, não pela reescrita do prompt.
