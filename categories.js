const apiUrl = "http://localhost:8080/events"; // Ajuste a URL conforme necessário

// Função para buscar eventos
async function fetchEvents() {
    try {
        const response = await axios.get(apiUrl);
        console.log("Dados recebidos:", response.data); // Verifica os dados no console
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

// Chama a função ao carregar a página
fetchEvents();


