# Entidade Equipamento

## Campos
- id: UUID
- nome: string
- descricao: text
- status: enum
- categoriaId: UUID
- manualUrl: string
- createdAt
- updatedAt

## Relacionamentos
- pertence a Categoria
- possui Manutenções
- possui Locações

## Regras
- manual obrigatório
- status default = Disponível

# Entidade Categoria

## Campos
- id: UUID
- nome: string
- createdAt
- updatedAt

## Relacionamentos
- tem muitos Equipamentos

## Regras
- nome único

# Entidade Locação

## Campos
- id: UUID
- clienteId: UUID
- equipamentoId: UUID
- dataInicio: date
- dataFimPrevista: date
- dataFimReal: date
- status: enum
- createdAt
- updatedAt

## Relacionamentos
- pertence a Cliente
- pertence a Equipamento

## Regras
- não pode alugar equipamento indisponível

# Entidade Manutenção

## Campos
- id: UUID
- equipamentoId: UUID
- tipo: enum
- custo: decimal
- dataInicio: date
- dataFim: date
- descricao: text
- createdAt
- updatedAt

## Relacionamentos
- pertence a Equipamento

## Regras
- só pode criar se equipamento estiver disponível

# Entidade Cliente

## Campos
- id: UUID
- nome: string
- email: string
- telefone: string
- createdAt
- updatedAt

## Relacionamentos
- possui Locações

## Regras
- email único

# Entidade Usuário

## Campos
- id: UUID
- nome: string
- email: string
- password: string
- role: enum
- createdAt
- updatedAt

## Relacionamentos
- possui Locações

## Regras
- email único

# Entidade Bonificação

## Campos
- id: UUID
- clienteId: UUID
- pontos: integer
- createdAt
- updatedAt

## Relacionamentos
- pertence a Cliente

## Regras
- pontos não pode ser negativo