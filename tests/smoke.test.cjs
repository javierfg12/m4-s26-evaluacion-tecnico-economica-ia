const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function makeElement(value = '') {
  return {
    value: String(value),
    textContent: '',
    hidden: false,
    listeners: {},
    addEventListener(type, callback) { this.listeners[type] = callback; },
    parentNode: { insertBefore(element) { element.inserted = true; } },
    setAttribute() {},
  };
}

function loadCalculator() {
  const defaults = {
    tickets: 12000,
    consultas_ticket: 2,
    tokens_entrada: 2500,
    tokens_salida: 600,
    tiempo_actual: 12,
    tiempo_ia: 8,
    coste_hora: 22,
  };
  const elements = {};
  Object.entries(defaults).forEach(([id, value]) => { elements[id] = makeElement(value); });
  [
    'btn-calcular', 'r_consultas', 'r_tokens_entrada', 'r_tokens_salida',
    'r_ahorro_ticket', 'r_minutos', 'r_horas', 'r_ahorro_bruto',
  ].forEach(id => { elements[id] = makeElement(); });

  const document = {
    getElementById(id) { return elements[id] || null; },
    createElement() {
      const element = makeElement();
      element.parentNode = { insertBefore(node) { elements[node.id] = node; } };
      return element;
    },
  };
  const window = {
    listeners: {},
    addEventListener(type, callback) { this.listeners[type] = callback; },
  };
  const source = fs.readFileSync('script.js', 'utf8');
  vm.runInNewContext(source, { document, window });
  window.listeners.DOMContentLoaded();
  return { elements };
}

test('calcula correctamente el caso base', () => {
  const { elements } = loadCalculator();
  assert.equal(elements.r_consultas.textContent, '24.000 consultas/mes');
  assert.equal(elements.r_tokens_entrada.textContent, '60.000.000 tokens/mes');
  assert.equal(elements.r_ahorro_bruto.textContent, '17.600 €/mes');
});

test('recalcula cuando cambia una entrada', () => {
  const { elements } = loadCalculator();
  elements.tickets.value = '6000';
  elements.tickets.listeners.input();
  assert.equal(elements.r_consultas.textContent, '12.000 consultas/mes');
  assert.equal(elements.r_ahorro_bruto.textContent, '8.800 €/mes');
});

test('rechaza valores negativos y limpia resultados anteriores', () => {
  const { elements } = loadCalculator();
  elements.tokens_entrada.value = '-1';
  elements.tokens_entrada.listeners.input();
  assert.match(elements['error-calculo'].textContent, /no negativo/);
  assert.equal(elements.r_consultas.textContent, '—');
});

test('rechaza campos vacíos', () => {
  const { elements } = loadCalculator();
  elements.tiempo_ia.value = '';
  elements.tiempo_ia.listeners.input();
  assert.match(elements['error-calculo'].textContent, /número válido/);
});

test('rechaza un tiempo con IA superior al actual', () => {
  const { elements } = loadCalculator();
  elements.tiempo_ia.value = '13';
  elements.tiempo_ia.listeners.input();
  assert.match(elements['error-calculo'].textContent, /no puede superar/);
});
