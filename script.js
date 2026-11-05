function fmt(n) {
  return n.toLocaleString('es-ES', { maximumFractionDigits: 2 });
}

function mostrarError(mensaje) {
  let box = document.getElementById('error-calculo');
  if (!box) {
    box = document.createElement('p');
    box.id = 'error-calculo';
    box.className = 'calculation-error';
    box.setAttribute('role', 'alert');
    box.setAttribute('aria-live', 'polite');
    const button = document.getElementById('btn-calcular');
    button.parentNode.insertBefore(box, button);
  }
  box.textContent = mensaje;
  box.hidden = !mensaje;
}

function limpiarResultados() {
  [
    'r_consultas', 'r_tokens_entrada', 'r_tokens_salida',
    'r_ahorro_ticket', 'r_minutos', 'r_horas', 'r_ahorro_bruto'
  ].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.textContent = '—';
  });
}

function calcular() {
  const rawFields = {
    tickets: document.getElementById('tickets').value,
    consultas_ticket: document.getElementById('consultas_ticket').value,
    tokens_entrada: document.getElementById('tokens_entrada').value,
    tokens_salida: document.getElementById('tokens_salida').value,
    tiempo_actual: document.getElementById('tiempo_actual').value,
    tiempo_ia: document.getElementById('tiempo_ia').value,
    coste_hora: document.getElementById('coste_hora').value
  };
  const fields = Object.fromEntries(
    Object.entries(rawFields).map(([key, value]) => [key, value.trim() === '' ? NaN : Number(value)])
  );

  const labels = {
    tickets: 'Tickets mensuales',
    consultas_ticket: 'Consultas IA por ticket',
    tokens_entrada: 'Tokens de entrada por consulta',
    tokens_salida: 'Tokens de salida por consulta',
    tiempo_actual: 'Tiempo actual por ticket',
    tiempo_ia: 'Tiempo esperado con IA',
    coste_hora: 'Coste por hora'
  };

  for (const [key, value] of Object.entries(fields)) {
    if (!Number.isFinite(value) || value < 0) {
      mostrarError(labels[key] + ' debe ser un número válido y no negativo.');
      limpiarResultados();
      return;
    }
  }

  if (!Number.isInteger(fields.tickets) || !Number.isInteger(fields.consultas_ticket) ||
      !Number.isInteger(fields.tokens_entrada) || !Number.isInteger(fields.tokens_salida)) {
    mostrarError('Tickets, consultas y tokens deben ser valores enteros.');
    limpiarResultados();
    return;
  }

  if (fields.tiempo_ia > fields.tiempo_actual) {
    mostrarError('El tiempo esperado con IA no puede superar el tiempo actual. Revisa ambos valores.');
    limpiarResultados();
    return;
  }

  mostrarError('');

  const consultas = fields.tickets * fields.consultas_ticket;
  const tokensEntrada = consultas * fields.tokens_entrada;
  const tokensSalida = consultas * fields.tokens_salida;
  const ahorroTicket = fields.tiempo_actual - fields.tiempo_ia;
  const minutos = fields.tickets * ahorroTicket;
  const horas = minutos / 60;
  const ahorroBruto = horas * fields.coste_hora;

  document.getElementById('r_consultas').textContent = fmt(consultas) + ' consultas/mes';
  document.getElementById('r_tokens_entrada').textContent = fmt(tokensEntrada) + ' tokens/mes';
  document.getElementById('r_tokens_salida').textContent = fmt(tokensSalida) + ' tokens/mes';
  document.getElementById('r_ahorro_ticket').textContent = fmt(ahorroTicket) + ' min/ticket';
  document.getElementById('r_minutos').textContent = fmt(minutos) + ' min/mes';
  document.getElementById('r_horas').textContent = fmt(horas) + ' horas/mes';
  document.getElementById('r_ahorro_bruto').textContent = fmt(ahorroBruto) + ' €/mes';
}

window.addEventListener('DOMContentLoaded', function () {
  const inputIds = [
    'tickets', 'consultas_ticket', 'tokens_entrada', 'tokens_salida',
    'tiempo_actual', 'tiempo_ia', 'coste_hora'
  ];
  inputIds.forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', calcular);
  });

  const button = document.getElementById('btn-calcular');
  if (button) button.addEventListener('click', calcular);
  calcular();
});
