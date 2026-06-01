# 🏗️ Sistema de Locação Civil

Sistema web para gerenciamento de locação de equipamentos da construção civil, com foco em controle de inventário, experiência do cliente, manutenção preventiva e fidelização.

---

# 📌 Objetivo do Projeto

Desenvolver uma plataforma que permita:

- Gerenciar equipamentos e disponibilidade;
- Facilitar o processo de locação;
- Disponibilizar manuais técnicos;
- Automatizar processos de manutenção;
- Criar estratégias de fidelização de clientes.

---

# 📋 Product Backlog

## Épico 1 — Gestão de Inventário e Ativos

**Foco:** Organização interna da locadora e controle de disponibilidade.

| ID | História de Usuário | Prioridade | Critérios de Aceite |
|---|---|---|---|
| PB01 | Cadastro de equipamentos | Alta | Permitir fotos, ficha técnica e upload de manuais PDF. |
| PB02 | Gestão de Status | Alta | Transição entre: Disponível, Alugado e Manutenção. |
| PB03 | Dashboard de Ocupação | Média | Gráficos de equipamentos em campo vs. parados. |
| PB04 | QR Code de Identificação | Baixa | Gerar código para colar no equipamento e abrir o manual direto. |

---

## Épico 2 — Experiência do Cliente e Conversão

**Foco:** Facilitar a locação e o acesso à informação técnica.

| ID | História de Usuário | Prioridade | Critérios de Aceite |
|---|---|---|---|
| PB05 | Catálogo Público Digital | Alta | Filtros por categoria e busca por nome do equipamento. |
| PB06 | Checkout via WhatsApp | Alta | Gerar mensagem estruturada com ID do produto e dados do cliente. |
| PB07 | Central de Manuais | Alta | Área de download de manuais de uso correto e segurança. |
| PB08 | Consulta de Pontos | Média | Cliente visualiza saldo de bonificações no seu perfil. |

---

## Épico 3 — Manutenção e Operações

**Foco:** Longevidade dos equipamentos e segurança na obra.

| ID | História de Usuário | Prioridade | Critérios de Aceite |
|---|---|---|---|
| PB09 | Alerta de Preventiva | Alta | Notificar locador quando o equipamento atingir a data/uso de revisão. |
| PB10 | Notificação ao Locatário | Média | Enviar aviso ao cliente sobre cuidados durante o uso prolongado. |
| PB11 | Registro de Manutenção | Média | Histórico de peças trocadas e custo por equipamento. |

---

## Épico 4 — Fidelização (Growth)

**Foco:** Reduzir custos de reparo e incentivar a recorrência.

| ID | História de Usuário | Prioridade | Critérios de Aceite |
|---|---|---|---|
| PB12 | Checklist de Devolução | Alta | Formulário para o locador avaliar o estado do item na entrega. |
| PB13 | Motor de Bonificação | Média | Atribuição automática de pontos se a avaliação for "Bom Estado". |
| PB14 | Resgate de Descontos | Baixa | Converter pontos acumulados em descontos na próxima locação. |

---

# 🚀 Sugestão de Sprints

## Sprint 1 — MVP Inicial

Itens prioritários para tirar o projeto do papel:

- ✅ **PB01** — Cadastro de equipamentos
- ✅ **PB02** — Gestão de Status
- ✅ **PB05** — Catálogo Público Digital
- ✅ **PB06** — Checkout via WhatsApp
- ✅ **PB07** — Central de Manuais

### Objetivo da Sprint

Entregar uma primeira versão funcional onde:

- A locadora consiga cadastrar equipamentos;
- O cliente consiga visualizar produtos;
- O cliente consiga solicitar locação via WhatsApp;
- Os manuais estejam acessíveis desde o primeiro dia.

---

# ✅ Definição de Pronto (Definition of Done — DoD)

Para um item ser considerado **Pronto**, ele deve atender aos seguintes critérios:

- Código revisado;
- Seguir os princípios de **Clean Architecture**;
- API documentada no **Swagger**;
- Testado no navegador e dispositivos móveis;
- Responsividade validada;
- Upload de arquivos (manuais/fotos) funcionando corretamente no serviço de storage.

---

# 🧱 Possíveis Tecnologias

## Front-end
- React
- Next.js
- TailwindCSS

## Back-end
- Node.js
- Express
- Sequelize ou Prisma

## Banco de Dados
- PostgreSQL

## Infraestrutura
- AWS S3 (armazenamento)
- Docker
- Render / Railway / AWS

---

# 📈 Futuras Evoluções

- Assinatura digital de contratos;
- Integração com pagamentos online;
- Dashboard financeiro;
- Controle de estoque de peças;
- Aplicativo mobile;
- Integração com ERP.

---

# 👥 Público-Alvo

- Locadoras de equipamentos da construção civil;
- Empresas de obras;
- Profissionais autônomos da construção.

---

# 📄 Licença

Projeto acadêmico / MVP em desenvolvimento.