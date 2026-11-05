# Business case preliminar — M4-S26

## Objetivo

Evaluar el orden de magnitud del volumen de inferencia y del tiempo humano potencialmente liberado al asistir a un equipo de soporte B2B.

## Supuestos de partida

- 12.000 tickets al mes.
- 2 consultas al modelo por ticket.
- 2.500 tokens de entrada y 600 de salida por consulta.
- Tiempo de gestión de 12 minutos sin IA y 8 minutos con IA.
- Coste laboral de referencia: 22 €/hora.

Estos valores son hipótesis de trabajo, no datos observados de una implantación.

## Cálculo

| Métrica | Operación | Resultado |
|---|---|---:|
| Consultas | 12.000 × 2 | 24.000 / mes |
| Tokens entrada | 24.000 × 2.500 | 60 M / mes |
| Tokens salida | 24.000 × 600 | 14,4 M / mes |
| Minutos liberados | 12.000 × (12 − 8) | 48.000 / mes |
| Horas liberadas | 48.000 ÷ 60 | 800 h / mes |
| Valor bruto | 800 × 22 € | 17.600 € / mes |

## Sensibilidad

El resultado depende especialmente de tres variables: porcentaje de tickets donde la IA aporta ayuda efectiva, reducción real del tiempo de gestión y coste de operación. El ahorro bruto no debe extrapolarse linealmente si la adopción es parcial o si la supervisión añade trabajo.

## Costes que faltan para calcular ahorro neto

- Tokens de entrada y salida por modelo y proveedor.
- Infraestructura, almacenamiento, red y observabilidad.
- Integración con CRM y plataforma de ticketing.
- Evaluación, mantenimiento, seguridad y gobierno.
- Formación y supervisión humana.
- Retrabajo por respuestas incorrectas y fallback.

## Diseño de piloto recomendado

1. Seleccionar un conjunto representativo de categorías de tickets.
2. Establecer una línea base de tiempo, calidad y escalados.
3. Ejecutar un piloto con revisión humana obligatoria.
4. Comparar grupos equivalentes y registrar consumo real de tokens.
5. Medir calidad, tiempo total incluyendo revisión, errores, coste y satisfacción.
6. Calcular ahorro neto con datos observados antes de ampliar el despliegue.

## Criterios de decisión

No escalar únicamente por el ahorro bruto. Exigir calidad aceptable, ausencia de incidentes graves de privacidad, trazabilidad, control humano y coste neto favorable bajo escenarios conservadores.
