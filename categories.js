const apiUrl = "http://localhost:8080/events"; // Ajuste a URL conforme necessário

// Função para buscar eventos
async function fetchEvents() {
    try {
        const response = await axios.get(apiUrl);
        console.log("Dados recebidos:", response.data); // Verifica os dados no console
        setupFilters(response.data);
        displayEvents(response.data);
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
    }
}

// Função para exibir os eventos na tela
function displayEvents(events) {
    const container = document.querySelector(".container-eventos-encontrados");
    container.innerHTML = ""; // Limpa o conteúdo antes de inserir

    events.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("container-evento");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("informacoes-evento-encontrado");

        const imageDiv = document.createElement("div");
        imageDiv.classList.add("imagem-evento-encontrado");
        imageDiv.style.backgroundImage = `url('${event.banner}')`;

        // Formatar a data
        const eventDate = new Date(event.startDate);
        const formattedDate = eventDate.toLocaleDateString("pt-BR"); // Formato dd/mm/aaaa
        const formattedTime = eventDate.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });

        // Criando conteúdo
        infoDiv.innerHTML = `
            <h1>${event.name}</h1>
            <p class="data-hora"><strong>Data:</strong> ${formattedDate} <br> <strong>Horário</strong>: ${formattedTime}</p>
            <p class="descricao">${event.description}</p>
        `;

        // Montando a estrutura
        eventDiv.appendChild(imageDiv);
        eventDiv.appendChild(infoDiv);
        
        container.appendChild(eventDiv);
    });
}

function setupFilters(events) {
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const filterType = e.target.dataset.filter;
            applyFilter(events, filterType);
        });
    });
}

function applyFilter(events, filterType) {
    let filteredEvents = [];

    if (filterType === "Todos") {
        filteredEvents = events;
    } else if (filterType === "Hoje") {
        const today = new Date();
        const todayStr = today.toLocaleDateString("pt-BR"); // Formato correto dd/mm/aaaa

        filteredEvents = events.filter(event => {
            const eventDate = new Date(event.startDate);
            const eventDateStr = eventDate.toLocaleDateString("pt-BR");
            return eventDateStr === todayStr;
        });
    } else if (filterType === "Gratuitos") {
        filteredEvents = events.filter(event => event.price === 0 || event.price === null);
    } else if (filterType === "Final de semana") {
        filteredEvents = events.filter(event => {
            const eventDate = new Date(event.startDate);
            const dayOfWeek = eventDate.getDay();
            return dayOfWeek === 0 || dayOfWeek === 6;
        });
    }

    displayEvents(filteredEvents);
}

// Chama a função ao carregar a página
fetchEvents();
