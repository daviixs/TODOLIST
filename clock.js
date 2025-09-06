// Atualiza o relógio e a data exibidos no topo da página
function updateClock() {
    // Pega a data/hora atual
    const now = new Date();

    // Extrai horas e minutos
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    // Define AM/PM com base na hora (para formato 12h)
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Para 24h, remova AM/PM e não converta abaixo

    // Converte para formato 12h (1–12); se for 0 vira 12
    hours = hours % 12 || 12;

    // Monta a data em português: "quarta-feira, 15 de junho"
    const dateString = now.toLocaleDateString('pt-BR', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    // Atualiza o texto dos elementos do relógio
    document.getElementById('hours').textContent = `${hours}:${minutes}`;
    document.getElementById('ampm').textContent = ampm;

    // Coloca a primeira letra da data em maiúscula para melhor apresentação
    document.getElementById('date').textContent =
        dateString.charAt(0).toUpperCase() + dateString.slice(1);
}

// Dispara updateClock a cada 1 segundo para manter o relógio em tempo real
setInterval(updateClock, 1000);

// Chama imediatamente para não esperar 1s até a primeira atualização
updateClock();

// Ajusta o tema (claro/escuro) automaticamente conforme o horário do dia
function setThemeByTime() {
    const hour = new Date().getHours();

    // Considera "noite" das 19h às 5:59 -> aplica classe 'darkmode' no body
    if (hour >= 19 || hour < 6) {
        document.body.classList.add('darkmode');
    } else {
        // Fora desse intervalo, garante o tema claro removendo a classe
        document.body.classList.remove('darkmode');
    }
}

// Aplica o tema adequado ao carregar a página
setThemeByTime();

// Permite alternar o tema manualmente clicando no cartão do relógio
document.getElementById('clock').addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
});