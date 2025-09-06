# To‑Do List – Produtividade com Tema Claro/Escuro

Aplicação web de lista de tarefas com foco em usabilidade, acessibilidade e visual polido. Possui gerenciamento de tarefas (adicionar, concluir, editar, deletar), prioridades (alta/média/baixa), filtro por status/prioridade, barra de progresso e relógio em tempo real. Integra tema claro/escuro com variáveis CSS.

## Demonstração

- Screenshot: (adicione aqui uma imagem do app)
- Deploy: (link do seu GitHub Pages, Vercel, Netlify, etc.)
- Portfólio: (link do seu site)

## Recursos

- Gerenciamento de tarefas:
  - Adicionar, editar, deletar
  - Marcar como concluída
  - Prioridades: alta, média, baixa
- Filtros:
  - Todas, Concluídas, Pendentes
  - Por prioridade: alta, média, baixa
- Progresso:
  - Contagem “X de Y concluídas”
  - Barra de progresso com animação
- Tema:
  - Alternância claro/escuro via CSS variables (classe `.darkmode`)
- Relógio:
  - Horário com AM/PM e data por extenso
- UI/UX:
  - Animações sutis, sombras (elevation presets), responsivo
- Acessibilidade:
  - Uso de `aria-label` em botões de ação
  - Foco/hover visíveis
  - Texto com contraste adequado

## Stack

- HTML5 semântico
- CSS3 (variáveis de tema, responsividade, animações)
- JavaScript (manipulação do DOM e lógica da to‑do)
- Font Awesome (ícones)
- Google Fonts (Roboto)

## Estrutura do Projeto
├─ index.html # Estrutura principal da aplicação
├─ style.css # Estilos, temas e responsividade
├─ todo.js # Lógica de tarefas (CRUD, filtros, progresso)
├─ clock.js # Relógio e alternância de tema

## Como Rodar Localmente

1. Clone o repositório:
   git clone https://github.com/daviixs/TODOLIST
   cd TODOLIST
Ou abra o index.html no navegador (duplo clique ou sirva com uma extensão como “Live Server”).
Pronto! Não há dependências adicionais.
