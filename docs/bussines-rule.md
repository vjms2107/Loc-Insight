
---

# `business-rules.md`

```markdown id="business-rules-md"
# 📋 Regras de Negócio — Loc Insight

# Equipamentos

## RN01
Um equipamento deve possuir:
- nome;
- categoria;
- status;
- descrição.

---

## RN02
Um equipamento pode possuir:
- múltiplas imagens;
- manual PDF.

---

## RN03
Os status válidos são:
- DISPONIVEL
- ALUGADO
- MANUTENCAO

---

## RN04
Equipamentos em manutenção não podem ser alugados.

---

## RN05
Equipamentos alugados não aparecem como disponíveis no catálogo.

---

# Locação

## RN06
Uma locação deve possuir:
- cliente;
- equipamento;
- data de início;
- status.

---

## RN07
Uma locação ativa impede nova locação do mesmo equipamento.

---

## RN08
O checkout via WhatsApp deve gerar:
- identificação do equipamento;
- nome do cliente;
- telefone.

---

# Manutenção

## RN09
O sistema deve registrar:
- data;
- descrição;
- custo;
- peças trocadas.

---

## RN10
Equipamentos em manutenção devem possuir bloqueio operacional.

---

## RN11
O sistema deve gerar alerta preventivo baseado em:
- data;
- horas de uso.

---

# Fidelização

## RN12
Clientes acumulam pontos quando:
- devolvem equipamentos em bom estado.

---

## RN13
Pontos não podem ser negativos.

---

## RN14
Pontos podem ser convertidos em descontos.

---

# Manuais

## RN15
Cada equipamento pode possuir um manual PDF.

---

## RN16
Os manuais devem estar acessíveis publicamente.

---

# Segurança

## RN17
Somente administradores podem:
- cadastrar equipamentos;
- editar equipamentos;
- alterar status.

---

## RN18
Clientes não possuem acesso administrativo.