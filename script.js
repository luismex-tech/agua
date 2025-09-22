// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // === ELEMENTOS DEL DOM ===
    const quantityDisplay = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');

    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const orderModal = document.getElementById('orderModal');
    const modalSummary = document.getElementById('modalSummary');

    const orderForm = document.getElementById('orderForm');

    // === ESTADO DE LA APLICACIÓN ===
    let quantity = 1;
    // IMPORTANTE: Reemplaza con tu número de WhatsApp real (código de país + 10 dígitos)
    const GOTA_CLARA_PHONE_NUMBER = '521234567890';

    // === LÓGICA DEL CONTADOR ===
    function updateQuantityDisplay() {
        quantityDisplay.textContent = quantity;
    }

    decreaseBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            updateQuantityDisplay();
        }
    });

    increaseBtn.addEventListener('click', () => {
        quantity++;
        updateQuantityDisplay();
    });

    // === LÓGICA DEL MODAL ===
    function showModal() {
        // Actualiza el resumen del pedido en el modal
        modalSummary.innerHTML = `Estás pidiendo: <strong>${quantity} garrafón${quantity > 1 ? 'es' : ''}</strong> de Agua Gota Clara.`;
        orderModal.classList.add('visible');
    }

    function hideModal() {
        orderModal.classList.remove('visible');
    }

    openModalBtn.addEventListener('click', showModal);
    closeModalBtn.addEventListener('click', hideModal);

    // Cierra el modal si se hace clic fuera del contenido
    orderModal.addEventListener('click', (event) => {
        if (event.target === orderModal) {
            hideModal();
        }
    });

    // Cierra el modal con la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && orderModal.classList.contains('visible')) {
            hideModal();
        }
    });

    // === LÓGICA DEL FORMULARIO Y WHATSAPP ===
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

        // Obtener datos del formulario
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const comments = document.getElementById('comments').value.trim();

        // Validar que los campos requeridos no estén vacíos (HTML5 ya lo hace, pero es una buena práctica)
        if (!name || !phone || !address) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        // Construir el mensaje para WhatsApp
        let message = `Hola Gota Clara, ¡quiero hacer un pedido! 💧\n\n`;
        message += `*Cantidad:* ${quantity} garrafón${quantity > 1 ? 'es' : ''}\n`;
        message += `*Nombre:* ${name}\n`;
        message += `*Teléfono:* ${phone}\n`;
        message += `*Dirección:* ${address}\n`;

        if (comments) {
            message += `*Comentarios:* ${comments}\n`;
        }

        message += `\n¡Gracias!`;

        // Codificar el mensaje para la URL
        const encodedMessage = encodeURIComponent(message);

        // Crear la URL de WhatsApp
        const whatsappURL = `https://wa.me/5214776772422?text=${encodedMessage}`;

        // Abrir WhatsApp en una nueva pestaña
        window.open(whatsappURL, '_blank');

        // Opcional: Cerrar el modal y resetear el formulario después de enviar
        hideModal();
        orderForm.reset();
        quantity = 1;
        updateQuantityDisplay();
    });

});
