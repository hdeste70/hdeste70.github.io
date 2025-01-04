document.querySelectorAll('.plan-card').forEach(card => {
  const showFormButton = card.querySelector('.show-form');
  const form = card.querySelector('.contact-form');
  const submitButton = form.querySelector('.whatsapp-submit');

  // Mostrar el formulario
  showFormButton.addEventListener('click', () => {
    form.style.display = 'block';
    showFormButton.style.display = 'none';
  });

  // Enviar datos a WhatsApp
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.querySelector('#name').value;
    const address = form.querySelector('#address').value;
    const plan = submitButton.getAttribute('data-plan'); // Obtener el tipo de plan

    // Crear el mensaje
    const whatsappMessage = `Hola, mi nombre es ${name}. Estoy interesado en contratar el siguiente plan: ${plan}. Mi dirección es: ${address}.`;
    const whatsappURL = `https://wa.me/+56296905?text=${encodeURIComponent(whatsappMessage)}`;

    // Redirigir a WhatsApp
    window.open(whatsappURL, '_blank');
  });
});

