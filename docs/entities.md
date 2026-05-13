# 🧱 Entidades — Loc Insight

# Equipment

```txt
Equipment
- id
- nome
- descricao
- categoria
- status
- imagemUrl
- manualPdfUrl
- createdAt
- updatedAt
```

---

# User

```txt
User
- id
- nome
- email
- telefone
- senha
- tipo  (ADMIN | CLIENTE)
- pontos
- createdAt
- updatedAt
```

---

# Rental

```txt
Rental
- id
- equipamentoId
- clienteId
- dataInicio
- dataFim
- status
- createdAt
- updatedAt
```

---

# Maintenance

```txt
Maintenance
- id
- equipamentoId
- descricao
- custo
- pecasTrocadas
- createdAt
- updatedAt
```

---

# Review

```txt
Review
- id
- rentalId
- nota
- comentario
- createdAt
- updatedAt
``` 
