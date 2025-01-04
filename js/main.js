// Ejemplo: Mostrar mensaje al seleccionar un plan
document.querySelectorAll('.plan-card button').forEach(button => {
  button.addEventListener('click', () => {
    alert('¡Gracias por seleccionar este plan! Te contactaremos pronto.');
  });
});
