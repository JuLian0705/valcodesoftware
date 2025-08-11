 const form = document.getElementById('formulario-contacto');
  const mensaje = document.getElementById('mensaje-enviado');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const data = new FormData(form);
    const res = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.style.display = 'none';
      mensaje.style.display = 'block';
    } else {
      alert('Ocurrió un error. Intenta nuevamente.');
    }
  });

    function mostrarFormulario() {
    const form = document.getElementById('formulario-contacto');
    form.style.display = 'flex';
  }