document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN DEL NEGOCIO ---
    const numeroWhatsApp = '5214771234567'; // Formato: [CodigoPais][CodigoArea][Numero]

    // --- LISTA DE COLONIAS CON COBERTURA ---
    const coloniasConCobertura = [
        'centro',
        'jardines del moral',
        'leon moderno',
        'andrade',
        'obrera',
        'valle del campestre'
    ];

    // --- ELEMENTOS DEL DOM ---
    const personasInput = document.getElementById('personas');
    const resultadoTexto = document.getElementById('texto-resultado');
    const pedirBtn = document.getElementById('pedir-whatsapp');
    const personasMinusBtn = document.getElementById('personas-minus');
    const personasPlusBtn = document.getElementById('personas-plus');
    const verificarBtn = document.getElementById('verificar-btn');
    const coloniaInput = document.getElementById('colonia-input');
    const resultadoCobertura = document.getElementById('resultado-cobertura');
    const floatingWhatsAppBtn = document.getElementById('floating-whatsapp-btn');


    // --- FUNCIÓN 1: LÓGICA DEL ASISTENTE DE HIDRATACIÓN ---
    const calcularPedidoSugerido = () => {
        const personas = parseInt(personasInput.value);
        const litrosSemanales = personas * 2 * 7;
        let garrafonesSugeridos = Math.ceil(litrosSemanales / 20);

        if (personas === 1) {
            garrafonesSugeridos = 1;
        }

        resultadoTexto.innerHTML = `Para <strong>${personas} persona(s)</strong>, te recomendamos pedir <strong>${garrafonesSugeridos} garrafones de 20L</strong> para cubrir tu consumo semanal.`;

        const pedido = { garrafones: garrafonesSugeridos, personas: personas };
        actualizarLinksDeWhatsApp(pedido);
    };

    // --- FUNCIÓN 2: ACTUALIZAR LINKS DE WHATSAPP ---
    const actualizarLinksDeWhatsApp = (pedido) => {
        const mensajeWhatsApp = `¡Hola Gota Clara! 👋 Vengo de su página web y quiero hacer mi pedido inteligente:\n\n- *Cantidad:* ${pedido.garrafones} garrafones de 20L\n- *Sugerencia para:* ${pedido.personas} persona(s)\n\nPor favor, ¿me confirman el total y la dirección de entrega? ¡Gracias!`;
        const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

        if (pedirBtn) pedirBtn.href = urlWhatsApp;
        if (floatingWhatsAppBtn) floatingWhatsAppBtn.href = urlWhatsApp;
    };


    // --- FUNCIÓN 3: LÓGICA DEL VERIFICADOR DE COBERTURA ---
    const verificarCobertura = () => {
        if (!coloniaInput || !resultadoCobertura) return;
        const coloniaUsuario = coloniaInput.value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (coloniaUsuario === '') {
            resultadoCobertura.textContent = 'Por favor, escribe el nombre de tu colonia.';
            resultadoCobertura.className = '';
            return;
        }

        if (coloniasConCobertura.includes(coloniaUsuario)) {
            resultadoCobertura.textContent = `✅ ¡Excelente! Sí entregamos en la colonia ${coloniaInput.value.trim()}.`;
            resultadoCobertura.className = 'success';
        } else {
            resultadoCobertura.textContent = `❌ Lo sentimos, por el momento no tenemos cobertura en la colonia ${coloniaInput.value.trim()}.`;
            resultadoCobertura.className = 'error';
        }
    };

    // --- FUNCIÓN 4: MOSTRAR/OCULTAR BOTÓN FLOTANTE AL HACER SCROLL ---
    const manejarVisibilidadBotonFlotante = () => {
        if (!floatingWhatsAppBtn) return;
        if (window.scrollY > 300) {
            floatingWhatsAppBtn.classList.add('visible');
        } else {
            floatingWhatsAppBtn.classList.remove('visible');
        }
    };


    // --- ASIGNACIÓN DE EVENTOS (EVENT LISTENERS) ---
    if (personasMinusBtn) personasMinusBtn.addEventListener('click', () => {
        let valorActual = parseInt(personasInput.value);
        if (valorActual > 1) {
            personasInput.value = valorActual - 1;
            calcularPedidoSugerido();
        }
    });

    if (personasPlusBtn) personasPlusBtn.addEventListener('click', () => {
        let valorActual = parseInt(personasInput.value);
        if (valorActual < 20) {
             personasInput.value = valorActual + 1;
             calcularPedidoSugerido();
        }
    });

    if (verificarBtn) verificarBtn.addEventListener('click', verificarCobertura);

    if (coloniaInput) coloniaInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            verificarCobertura();
        }
    });

    window.addEventListener('scroll', manejarVisibilidadBotonFlotante);


    // --- INICIALIZACIÓN ---
    if(personasInput) {
        calcularPedidoSugerido();
    }
});
