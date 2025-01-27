// Seleciona todos os botões de filtro
const filterButtons = document.querySelectorAll('.filter-btn');

// Adiciona um evento de clique a cada botão
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove a classe 'foco' de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('foco'));

        // Adiciona a classe 'foco' ao botão clicado
        button.classList.add('foco');
    });
});