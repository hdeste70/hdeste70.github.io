document.querySelectorAll('.plan-card').forEach(card => {
  const showFormButton = card.querySelector('.show-form');
  const form = card.querySelector('.contact-form');
  const submitButton = form.querySelector('.whatsapp-submit');

  // Mostrar el formulario
  showFormButton.addEventListener('click', () => {
    form.style.display = 'block';
    showFormButton.style.display = 'none'; // Ocultar el botón de "Seleccionar Plan"
  });

  // Enviar datos a WhatsApp
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir recarga de la página
    const name = form.querySelector('#name').value;
    const address = form.querySelector('#address').value;

    // Enlace de WhatsApp con mensaje personalizado
    const whatsappMessage = `Hola, mi nombre es ${name}. Estoy interesado en contratar este plan. Mi dirección es: ${address}.`;
    const whatsappURL = `https://wa.me/+5356296905?text=${encodeURIComponent(whatsappMessage)}`;

    // Redirigir a WhatsApp
    window.open(whatsappURL, '_blank');
  });
});
