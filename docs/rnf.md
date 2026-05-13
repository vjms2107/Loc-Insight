
---

# `non-functional-requirements.md`

```markdown id="nfr-md"
# ⚙️ Requisitos Não Funcionais — Loc Insight

# Performance

## RNF01
As páginas devem carregar em até 3 segundos em conexão padrão.

---

## RNF02
A API deve responder requisições em até 500ms em operações comuns.

---

# Responsividade

## RNF03
O sistema deve funcionar em:
- desktop;
- tablet;
- smartphone.

---

# Segurança

## RNF04
As senhas devem ser armazenadas com hash seguro.

---

## RNF05
A API deve utilizar autenticação JWT.

---

## RNF06
Uploads devem validar:
- tamanho;
- extensão;
- tipo do arquivo.

---

# Escalabilidade

## RNF07
O sistema deve suportar crescimento modular.

---

# Disponibilidade

## RNF08
O sistema deve possuir disponibilidade mínima de 95%.

---

# Usabilidade

## RNF09
O catálogo público deve exigir no máximo 3 cliques para iniciar uma solicitação.

---

# Compatibilidade

## RNF10
O sistema deve funcionar nos navegadores:
- Chrome;
- Edge;
- Firefox.

---

# Manutenibilidade

## RNF11
O código deve seguir:
- SOLID;
- Clean Code;
- Clean Architecture.

---

# Documentação

## RNF12
A API deve possuir documentação Swagger.

---

# Storage

## RNF13
Uploads devem utilizar storage externo.

---

# Backup

## RNF14
O banco deve possuir política de backup automatizado.