function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Se quiser 24h, pode remover

    // Formato 12h em português (opcional)
    hours = hours % 12 || 12;

    // Data em português
    const dateString = now.toLocaleDateString('pt-BR', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    // Atualiza o conteúdo do relógio
    document.getElementById('hours').textContent = `${hours}:${minutes}`;
    document.getElementById('ampm').textContent = ampm;
    document.getElementById('date').textContent = dateString.charAt(0).toUpperCase() + dateString.slice(1); // primeira letra maiúscula
}

// Atualiza a cada segundo
setInterval(updateClock, 1000);
updateClock();

// Define tema com base no horário
function setThemeByTime() {
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 6) {
        document.body.classList.add('darkmode'); // Noite
    } else {
        document.body.classList.remove('darkmode'); // Dia
    }
}
setThemeByTime();

// Alternar tema ao clicar no relógio
document.getElementById('clock').addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
});