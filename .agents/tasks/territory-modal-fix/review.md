# Modal territorial con navegación de oportunidades y adaptaciones

El cambio incorpora una columna territorial compartida para Oportunidades y Adaptaciones, deriva ambas vistas desde `activeTerritory.oportunidades_creativas` y conecta la selección o el filtro con el contenido derecho. El adaptador evita resultados inventados, mantiene las clasificaciones derivadas en `ADAPT` y presenta estados explícitos cuando faltan datos o previews. Las pruebas enfocadas cubren la presencia de la columna, la selección de oportunidades, la taxonomía y el aislamiento de las secciones 04/05, y la matriz de TypeScript, Karma y builds consta como aprobada en `verification.md`. **Watch for:** **[confirmed]** el cuerpo split está anidado dentro del encabezado horizontal, lo que impide que encabezado y contenido formen las dos filas previstas; **[confirmed]** las flechas anterior/siguiente son controles visibles sin acción ni nombre accesible.

**Verdict**: NEEDS_CHANGES

## High-level view

La presentación separa correctamente la identidad territorial de los detalles: Oportunidades añade la lista vertical numerada y controla el acordeón de cuatro columnas; Adaptaciones conserva el ancla izquierda y ofrece filtro y tarjetas en el lado derecho. Sin embargo, el contenedor `.v2-tm-body` es hijo de `.v2-tm-header`, que usa `display: flex` horizontal, por lo que toda esta composición compite por ancho con el selector territorial en vez de ocupar una segunda fila; **[confirmed]** hay que cerrar el encabezado antes de abrir el cuerpo y conservar ambos como hijos directos del contenido modal.

Los elementos de adaptación se aplanan desde cada oportunidad real y heredan título, descripción, formato y etiquetas únicamente de campos disponibles. La ausencia de preview se representa de forma neutral y no aparecen métricas ni resultados de campaña fabricados.

Los controles principales son botones y cuentan con foco visible, Escape cierra el diálogo, y las pestañas y acciones tienen semántica accesible básica. Las dos flechas junto al selector territorial, no obstante, carecen de `(click)`, `type="button"` y `aria-label`; **[confirmed]** deben navegar de forma acotada entre territorios o retirarse, no permanecer como controles inertes y sin nombre.

La evidencia aportada registra type-check, 22 pruebas y builds development/production exitosos. Esas pruebas validan estructura DOM y estado, pero no geometría renderizada, por lo que no detectan la jerarquía flex incorrecta que bloquea la fidelidad visual.

<details>
<summary>Issues (2)</summary>

1. **Jerarquía del layout [confirmed]** — `.v2-tm-body` quedó dentro del header horizontal y comprime el rail y el detalle junto al selector; cerrar el header antes del body y añadir una regresión estructural o visual.
2. **Navegación territorial inerte [confirmed]** — las flechas anterior/siguiente no tienen acción, nombre accesible ni tipo explícito; implementar navegación etiquetada y estados disabled, o retirar esos controles.

</details>

<details>
<summary>Details</summary>

## El cuerpo split quedó dentro de la fila del selector territorial

En `app.component.html:1993-2029`, `.v2-tm-header` se abre antes de `.v2-tm-header-left`, pero no se cierra al terminar los controles superiores. `.v2-tm-body` comienza en la línea 2029 y el cierre del encabezado aparece después de todo el cuerpo, al final del modal. Como `.v2-tm-header` declara en línea `display: flex`, `align-items: center` y `justify-content: space-between`, sus hijos directos son el bloque del selector y todo el cuerpo split:

```text
.v2-territory-modal-content (columna)
└── .v2-tm-header (fila)
    ├── .v2-tm-header-left
    └── .v2-tm-body
        ├── .v2-tm-left
        └── .v2-tm-right
```

Esto contradice la topología requerida, donde el encabezado debe ocupar la parte superior y `.v2-tm-body` el espacio restante debajo. **[confirmed]** La regla posterior `.v2-tm-header { padding: 16px 32px !important; }` no cambia su dirección y `.v2-tm-body { flex: 1; }` reparte ancho dentro de esa fila; el rail de hasta 500 px y el panel derecho quedan comprimidos junto al selector. Hay que cerrar `.v2-tm-header` inmediatamente después de `.v2-tm-header-left`, dejar `.v2-tm-body` como segundo hijo directo de `.v2-territory-modal-content` y añadir una aserción estructural o una prueba visual de la composición.

## Las flechas del selector anuncian navegación que no existe

En `app.component.html:2018-2025` se renderizan dos botones circulares con iconos `chevron_left` y `chevron_right`, pero ninguno tiene manejador, nombre accesible ni `type="button"`. **[confirmed]** Para teclado y lector de pantalla son botones sin nombre que no producen ningún cambio, y visualmente prometen una navegación que tampoco existe para mouse. Deben llamar a navegación anterior/siguiente con límites o wrap definidos, incluir `type="button"`, `aria-label` descriptivo y estado `disabled` cuando corresponda; si el selector horizontal ya resuelve el caso, deben eliminarse.

</details>

<details>
<summary>File map</summary>

- `ui/src/ui/src/app/report/territory-modal/territory-modal.models.ts` — modelos estrictos para oportunidades, filtros y tarjetas.
- `ui/src/ui/src/app/report/territory-modal/territory-modal.adapter.ts` — adaptación de campos reales a la presentación del modal.
- `ui/src/ui/src/app/report/territory-modal/territory-modal.adapter.spec.ts` — procedencia, fallbacks, aplanado y taxonomía.
- `ui/src/ui/src/app/app.component.ts` — selección territorial, pestaña activa, oportunidad seleccionada y filtro.
- `ui/src/ui/src/app/app.component.html` — rail compartido, acordeón, filtros y tarjetas; contiene los dos bloqueos descritos.
- `ui/src/ui/src/app/app.component.css` — composición desktop/responsive, estados activos y foco visible.
- `ui/src/ui/src/app/app.component.spec.ts` — regresiones de interacción, taxonomía y aislamiento de 04/05.

Full diff: `git diff HEAD -- ui/src/ui/src/app/app.component.{ts,html,css,spec.ts} ui/src/ui/src/app/report/territory-modal`

Los demás cambios ya presentes en el worktree, incluidos los de backend, quedan fuera de la atribución de este fix según el plan y la nota de verificación.

</details>
