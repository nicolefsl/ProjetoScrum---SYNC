const monthYear = document.getElementById('monthYear');
const datesContainer = document.getElementById('dates');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const eventForm = document.getElementById('eventForm');
const eventDateInput = document.getElementById('eventDate');
const eventDescriptionInput = document.getElementById('eventDescription');
const eventList = document.getElementById('eventList');

let currentDate = new Date();
const events = [];

// Função para renderizar o calendário
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Corrigido o uso de template literal
    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const fontSize = totalDays > 30 ? '14px' : '16px';
    datesContainer.style.fontSize = fontSize;

    datesContainer.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        datesContainer.innerHTML += '<div class="date"></div>'; // Espaço em branco
    }

    for (let i = 1; i <= totalDays; i++) {
        // Corrigido o uso de template literal
        const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const event = events.find(event => event.date === dateString);
        
        const eventContent = event ? '<span class="event-marked">Evento!</span>' : '';
        
        // Corrigido o uso de template literal
        datesContainer.innerHTML += `<div class="date" onclick="showEvents('${dateString}')">${i}${eventContent}</div>`;
    }
}

// Função para mostrar eventos do dia
function showEvents(date) {
    eventDateInput.value = date; // Define a data no formulário
    eventList.innerHTML = ''; // Limpa a lista de eventos

    const dateEvents = events.filter(event => event.date === date);
    dateEvents.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event.description;
        eventList.appendChild(li);
    });
}

// Adiciona evento ao clicar no botão
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventDate = eventDateInput.value;
    const eventDescription = eventDescriptionInput.value;

    events.push({ date: eventDate, description: eventDescription });
    eventDescriptionInput.value = ''; // Limpa o campo de descrição
    showEvents(eventDate); // Atualiza a lista de eventos
    renderCalendar(); // Atualiza o calendário
});

// Navegação entre os meses
prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Renderiza o calendário inicial
renderCalendar();
