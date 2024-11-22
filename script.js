document.addEventListener('DOMContentLoaded', () => {
    const revealButton = document.getElementById('revealButton');
    const resetButton = document.getElementById('resetButton');
    const messageCard = document.getElementById('messageCard');
    const messageText = document.getElementById('messageText');
    let messages = [];
    let lastIndex = -1; // Para evitar repetición inmediata

    // Cargar mensajes desde messages.json
    fetch('messages.json')
        .then(response => response.json())
        .then(data => {
            messages = data;
            // Opcional: Mostrar un mensaje al cargar
            // mostrarMensajeDelDia();
        })
        .catch(error => console.error('Error al cargar los mensajes:', error));

    // Función para seleccionar y mostrar un mensaje aleatorio
    function mostrarMensajeDelDia() {
        if (messages.length === 0) {
            messageText.textContent = "No hay mensajes disponibles.";
            return;
        }
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * messages.length);
        } while (randomIndex === lastIndex && messages.length > 1);
        
        lastIndex = randomIndex;
        const mensaje = messages[randomIndex].mensaje;
        messageText.textContent = mensaje;
        // Voltear la tarjeta
        messageCard.classList.add('flip');
        // Desactivar el botón de revelar y activar el botón de reset
        revealButton.disabled = true;
        resetButton.disabled = false;
    }

    // Función para resetear la tarjeta
    function resetCard() {
        // Voltear la tarjeta de vuelta al frente
        messageCard.classList.remove('flip');
        // Limpiar el texto del mensaje
        messageText.textContent = "Tu mensaje aparecerá aquí.";
        // Activar el botón de revelar y desactivar el botón de reset
        revealButton.disabled = false;
        resetButton.disabled = true;
    }

    // Evento del botón de revelar
    revealButton.addEventListener('click', mostrarMensajeDelDia);
    
    // Evento del botón de reset
    resetButton.addEventListener('click', resetCard);

    // Evento para voltear la tarjeta al hacer clic en ella
    messageCard.addEventListener('click', () => {
        if (messageCard.classList.contains('flip')) {
            resetCard();
        }
    });
});

