# M4-S26 — Evaluación técnico-económica de integración de IA

Aplicación web estática para analizar una posible integración de IA generativa en atención al cliente B2B.

## Funcionalidades
- Estimación de consultas y tokens mensuales.
- Cálculo del ahorro humano bruto a partir de la reducción estimada de tiempo por ticket.
- Identificación de desafíos técnicos, económicos, organizativos y de protección de datos.
- Comparativa cualitativa entre API externa y cloud gestionado.
- Registro de riesgos, supuestos, incidencias y dependencias (RAID).

## Uso
Abre `index.html` en un navegador moderno o publícalo mediante GitHub Pages. Los resultados se actualizan al modificar los datos o pulsar el botón de cálculo.

## Validaciones
- Rechaza valores negativos o no numéricos.
- Exige valores enteros para tickets, consultas y tokens.
- Impide estimar ahorro si el tiempo esperado con IA supera el tiempo actual.

## Interpretación económica
El resultado es **ahorro humano bruto**, no ahorro neto. No resta el coste de tokens, licencias, configuración, mantenimiento, supervisión ni formación. La matriz API externa/cloud gestionado es una comparación cualitativa predefinida, no una cotización ni una medición automática de proveedores.

## Archivos
| Archivo | Función |
|---|---|
| `index.html` | Estructura y contenido |
| `style.css` | Estilos visuales |
| `script.js` | Validación y cálculos |
| `README.md` | Documentación |

## Privacidad
No introduzcas datos personales reales, información confidencial ni claves API.
