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
      // Pagina de Carga 
  class LoadingScreen {
    constructor(targetDate, loadingScreenId) {
        this.targetDate = new Date(targetDate).getTime(); // Fecha objetivo
        this.loadingScreen = document.getElementById(loadingScreenId); // Contenedor de carga
        this.daysElem = document.getElementById('days');
        this.hoursElem = document.getElementById('hours');
        this.minutesElem = document.getElementById('minutes');
        this.secondsElem = document.getElementById('seconds');
    }
     
    updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = this.targetDate - now;

        if (timeLeft > 0) {
            // Calcular días, horas, minutos y segundos
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Actualizar el contador en el DOM
            this.daysElem.textContent = days.toString().padStart(2, '0');
            this.hoursElem.textContent = hours.toString().padStart(2, '0');
            this.minutesElem.textContent = minutes.toString().padStart(2, '0');
            this.secondsElem.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Cuando el contador llegue a cero, oculta la pantalla de carga
            this.loadingScreen.style.display = 'none';
        }
    }

    start() {
        this.updateCountdown(); // Primera actualización
        setInterval(() => this.updateCountdown(), 1000); // Actualización cada segundo
    }
}

// Inicia la pantalla de carga
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = new LoadingScreen(
        '2025-01-11T00:00:00', // Fecha objetivo
        'loading-screen'        // ID del contenedor de la pantalla de carga
    );
    loadingScreen.start();
});


});

