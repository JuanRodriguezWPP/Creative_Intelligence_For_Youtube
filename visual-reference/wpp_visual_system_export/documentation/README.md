# Paquete de Entrega del Sistema Visual — WPP Media Solutions & Creative Intelligence

> **Guía Oficial de Handoff Técnico y Visual para Desarrolladores**  
> **Proyecto:** Creative Intelligence (CI) Social  
> **Organización:** WPP Media Solutions  
> **Formato de Entrega:** ZIP integral con assets originales binarios, vectores SVG, tokens de diseño, componentes y configuración técnica.

---

## 1. Estructura del Paquete

El paquete está organizado de forma modular para desacoplar assets estáticos, configuración técnica y lógica de componentes:

```text
wpp_visual_system_export/
├── README.md                                # Guía principal de handoff y especificaciones
├── assets/                                  # Recursos binarios y vectoriales originales
│   ├── fonts/                               # Archivos originales de la familia tipográfica WPP (.woff2)
│   ├── logos/                               # Identidades de marca en vector SVG escalable
│   ├── icons/                               # Favicons y brand marks oficiales
│   ├── images/                              # Prototipos interactivos HTML standalone aprobados
│   └── backgrounds/                         # Gradientes atmosféricos vectoriales SVG (Tratamiento 17)
├── design-system/                           # Lógica del sistema de diseño y tokens tipados
│   ├── typography/                          # Escala, jerarquías y especificaciones anti-robóticas
│   ├── colors/                              # Paleta cromática, tokens de color y cálculo de contraste
│   ├── spacing/                             # Retícula de 4px/8px, densidades y layout
│   ├── components/                          # Componentes atómicos React (Card, Button, Tabs, etc.)
│   ├── tokens/                              # Definiciones TypeScript de tokens globales
│   └── patterns/                            # Patrones de producto aprobados (Dashboard & Client Report)
├── config/                                  # Configuraciones de integración para el entorno de desarrollo
│   ├── fonts/                               # fonts.css con declaraciones @font-face para los 12 pesos
│   ├── icons/                               # icons_config.json y pautas de integración con Lucide
│   └── theme/                               # tailwind.config.js y theme.css con variables y elevaciones
└── documentation/                           # Documentación de arquitectura y gobernanza
    └── README.md                            # Copia canónica de esta especificación
```

---

## 2. Fuentes Tipográficas

### 2.1 Familia y Formato
- **Familia:** `WPP` (Tipografía corporativa oficial).
- **Formato:** `.woff2` (Web Open Font Format 2.0 con compresión Brotli nativa).
- **Regla de integridad:** **NO se sustituye por fuentes genéricas** (como Inter, Roboto o Arial). Se incluyen los 12 archivos binarios originales con sus nombres canónicos preservados en `/assets/fonts/`.

### 2.2 Mapeo de Archivos a Pesos y Roles Operativos

| Nombre de Archivo | Formato | Peso CSS | Estilo | Rol en el Sistema Visual |
| :--- | :--- | :--- | :--- | :--- |
| `WPP-Thin.woff2` | WOFF2 | `100` | Normal | **Restringido**: Conservado como activo de marca, pero excluido de roles operativos de UI por legibilidad. |
| `WPP-ThinItalic.woff2` | WOFF2 | `100` | Italic | **Restringido**: Excluido de roles operativos de UI. |
| `WPP-Light.woff2` | WOFF2 | `300` | Normal | **Operativo**: Titulares editoriales (H1/H2), números grandes de métricas KPI (`metric-value`), introducciones editoriales. |
| `WPP-LightItalic.woff2` | WOFF2 | `300` | Italic | **Operativo**: Citas editoriales, extractos y subtítulos destacados. |
| `WPP-Regular.woff2` | WOFF2 | `400` | Normal | **Operativo**: Cuerpo de texto general, párrafos descriptivos, celdas de tabla, valores informativos. |
| `WPP-RegularItalic.woff2`| WOFF2 | `400` | Italic | **Operativo**: Notas al pie, citas textuales y metadatos secundarios. |
| `WPP-Medium.woff2` | WOFF2 | `500` | Normal | **Operativo**: Etiquetas de formulario, encabezados de columnas de tabla, botones secundarios, tabs activos. |
| `WPP-MediumItalic.woff2` | WOFF2 | `500` | Italic | **Operativo**: Énfasis secundario e iteraciones de interfaz. |
| `WPP-Bold.woff2` | WOFF2 | `700` | Normal | **Operativo**: Eyebrows de sección, badges de estado/alerta, etiquetas de KPI primario, botones de acción principal. |
| `WPP-BoldItalic.woff2` | WOFF2 | `700` | Italic | **Operativo**: Énfasis editorial de alto impacto (uso selectivo). |
| `WPP-Black.woff2` | WOFF2 | `900` | Normal | **Operativo**: Exclusivamente para momentos de display gráfico y hero numéricos de gran escala. Nunca como bold por defecto. |
| `WPP-BlackItalic.woff2` | WOFF2 | `900` | Italic | **Operativo**: Momentos especiales de display gráfico. |

### 2.3 Implementación de `@font-face`
El archivo `/config/fonts/fonts.css` contiene la declaración completa para importar en tu proyecto. Ejemplo de declaración canónica:

```css
@font-face {
  font-family: 'WPP';
  src: url('/assets/fonts/WPP-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### 2.4 Reglas Tipográficas Maestras
1. **No Title Case:** La interfaz utiliza **Sentence Case** (capitalización normal en oraciones: "Creative retention analysis" y no "Creative Retention Analysis"). Se preservan mayúsculas únicamente para nombres propios, acrónimos (KPI, CTR, ROAS) y marcas (TikTok, Meta, WPP).
2. **Anti-Robotic Typography:** Queda prohibida la estética de terminal de código en la UI de producto. No se debe utilizar tipografía monospace ni tracking artificial excesivo para etiquetas o textos generales. Monospace (`font-mono`) está estrictamente restringido a metadatos técnicos auténticos: IDs (`cr-88219`), timestamps (`14:28:02 UTC`), dimensiones (`1080x1920`) o fragmentos de API.

---

## 3. Logotipos de Marca

Todos los logos se entregan en vector original SVG dentro de `/assets/logos/`:

| Archivo | Formato | Descripción y Contexto de Uso | Fondo Recomendado |
| :--- | :--- | :--- | :--- |
| `WPPMediaSolution_Logo.svg` | SVG | Logotipo maestro corporativo de **WPP Media Solutions**. Utilizado en la cabecera superior global, footer corporativo y lockups formales. | Fondos claros (`#FFFFFF`, `#F8F8F7`) y cabeceras de navegación oscuras. |
| `CreativeIntelligence_Logo.svg` | SVG | Logotipo de producto **Creative Intelligence** en variante monocroma neutral. Ideal para documentos formales, reportes imprimibles y contextos donde se requiere neutralidad de color. | Superficies claras (`#FFFFFF`, `#F8F8F7`). |
| `CreativeIntelligence_Logo_Lime.svg` | SVG | Logotipo insignia de **Creative Intelligence** con el punto de acento distintivo en **Media Solutions Lime (`#AEF366`)**. Utilizado en cabeceras de aplicación activa, portadas de reportes y experiencias interactivas. | Superficies claras o contenedores oscuros de **WPP Navy (`#000050`)**. |

### 3.1 Lockup Horizontal de Navegación
En barras de navegación de producto, los logos comparten un único eje óptico horizontal:
```text
[ WPP Media Solutions ]  /  [ Creative Intelligence ]  /  [ Social ]
```

---

## 4. Favicon e Iconos de Marca para Navegador

Ubicación: `/assets/icons/`

| Archivo | Formato | Función | Ubicación |
| :--- | :--- | :--- | :--- |
| `CreativeIntelligence_Favicon.svg` | SVG | **Favicon oficial de la aplicación**. Isotipo de Creative Intelligence optimizado para legibilidad en pestañas de navegador a 16×16 y 32×32 píxeles. | `<link rel="icon">` principal en `<head>` |
| `favicon.svg` | SVG | Isotipo de fallback de marca WPP para el ecosistema. | Fallback en `<head>` |

### 4.1 Snippet de Implementación en HTML (`index.html`)
```html
<!-- Favicon Oficial SVG Vectorial -->
<link rel="icon" type="image/svg+xml" href="/assets/icons/CreativeIntelligence_Favicon.svg" />
<!-- Fallback de Ecosistema -->
<link rel="alternate icon" type="image/svg+xml" href="/assets/icons/favicon.svg" />
```

---

## 5. Iconografía Funcional de Interfaz

### 5.1 Librería Externa Aprobada
El sistema visual utiliza la librería de iconos vectoriales **Lucide React**:
- **Paquete npm:** `lucide-react`
- **Versión aprobada:** `^0.546.0`
- **Instalación:** `npm install lucide-react@^0.546.0`

### 5.2 Parámetros Ópticos de Iconos
- **Grosor de Trazo (Stroke Width):** `1.75px` estándar (o `2px` en iconos pequeños de 14px a 16px).
- **Tamaños Estándar de la Retícula:**
  - Micro / inline con texto: `14px` (`w-3.5 h-3.5`)
  - Iconos de control y tablas: `16px` (`w-4 h-4`)
  - Navegación lateral y cards: `18px` o `20px` (`w-4.5 h-4.5` / `w-5 h-5`)
  - Headers y estados vacíos: `24px` (`w-6 h-6`)
- **Estilo de Importación:** Named imports en la cabecera del archivo:
  ```tsx
  import { ArrowRight, BarChart3, Sparkles, Filter, ChevronDown } from 'lucide-react';
  ```

---

## 6. Fondos, Ilustraciones e Imágenes

### 6.1 Fondos Atmosféricos SVG (Tratamiento Visual 17)
Ubicación: `/assets/backgrounds/`
- `atmospheric_background_light.svg`: Gradiente ambiental para temas diurnos. Combina sutiles halos de Media Solutions Lime (`#AEF366`) y WPP Intelligent Blue (`#5967F6`) con desenfoque gaussiano suave.
- `atmospheric_background_dark.svg`: Gradiente ambiental para contextos oscuros sobre base WPP Navy (`#000050`).
- **Filosofía arquitectónica:** Los gradientes atmosféricos se aplican a nivel de viewport o sección de página (`z-0`), **NUNCA** como decoración interna de componentes o tarjetas (`z-10`), garantizando que la legibilidad de textos y datos sea absoluta.

### 6.2 Prototipos HTML Standalone Interactivos
Ubicación: `/assets/images/`
- `creative_intelligence_social_report.html`: Prototipo interactivo completo del reporte editorial de Creative Intelligence para clientes. Puede abrirse directamente en cualquier navegador web.
- `creative_intelligence_social_report_modal.html`: Prototipo interactivo del modal de detalle de creatividad publicitaria con visualización de retención segundo a segundo en formato 9:16.

### 6.3 Recursos de Imagen de Contenido Cliente (Reproducción en Producción)
- **Miniaturas de Video (Creatividades):** La interfaz utiliza contenedores programáticos en formato vertical 9:16 (`aspect-[9/16]`) diseñados con CSS/Tailwind, provistos de badges de plataforma (`Meta Reels`, `TikTok`), chips de duración (`15.0s`) y porcentajes de hook rate. En producción, estos contenedores se alimentan dinámicamente mediante las URLs de CDN de medios de la API de redes sociales del cliente.
- **Sin gráficos rasterizados ficticios:** El sistema deliberadamente no incluye archivos JPG o PNG genéricos para evitar pérdida de resolución y peso innecesario.

---

## 7. Configuración Visual, Paleta Cromática y Tokens

### 7.1 Regla Maestra de Color Oscuro Estructural
- **WPP Navy (`#000050`):** Es el color oscuro estructural **OFICIAL Y OBLIGATORIO** para cabeceras de navegación oscura, contextos analíticos destacados, portadas hero y tarjetas de inteligencia.
- **Negro Puro (`#000000`):** **NO** debe utilizarse como fondo estructural de interfaz. El negro se reserva exclusivamente para texto de cuerpo, contraste tipográfico y contenido editorial específico.

### 7.2 Regla Maestra del Color Lima de Media Solutions
- **Lime (`#AEF366`):** Es un diferenciador de producto intencional de WPP Media Solutions.
- **Uso selectivo:** Estados activos, acentos de marca, chips de progreso, destacados de inteligencia y badges clave.
- **Restricción:** No debe utilizarse como color de fondo dominante ni sustituir a los colores semánticos genéricos de éxito.

### 7.3 Principio de Elevación de Superficies
- **Principio Fundamental:**
  ```text
  CONTRASTE DE SUPERFICIE PRIMERO.
  BORDE SEGUNDO.
  SOMBRA AL FINAL.
  ```
- **Sombra por defecto:**
  ```css
  box-shadow: none;
  ```
- Las tarjetas, dashboards y secciones se distinguen mediante contraste cromático (`bg-[#FFFFFF]` vs `bg-[#F8F8F7]` o `bg-[#000050]`) y bordes funcionales de 1px (`border-[#E5E5E3]`). Las sombras decorativas están prohibidas; las sombras suaves se reservan únicamente para elementos flotantes transitorios como modales y dropdowns.

### 7.4 Archivos de Configuración Incluidos
- `/config/theme/tailwind.config.js`: Configuración de Tailwind lista para extender colores (`wppNavy`, `wppLime`, `wppSlate`), familias tipográficas, radios de borde y espaciado.
- `/config/theme/theme.css`: Definición de variables CSS semánticas (`--wpp-navy`, `--wpp-lime`, etc.) y reglas de reset visual.

---

## 8. Dependencias del Proyecto para Reproducción Fiel

Para integrar este sistema visual en un nuevo proyecto React/Tailwind, las dependencias esenciales son:

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.546.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "typescript": "^5.8.0"
  }
}
```

### Pasos Rápidos de Inicialización:
1. Copiar la carpeta `/assets` en la raíz pública (`/public/assets` o equivalente en Vite/Next.js).
2. Importar `/config/fonts/fonts.css` en el punto de entrada de estilos globales (`index.css` o `App.css`).
3. Importar los tokens de color y tema desde `/config/theme/theme.css`.
4. Instalar `lucide-react@^0.546.0` para los iconos funcionales.
5. Utilizar los componentes reutilizables de `/design-system/components/` (Card, Button, Tabs, StatusBadge).

---

## 9. Inventario y Control de Integridad de Recursos

| Categoría | Recurso Original | Formato | Estado en el Paquete |
| :--- | :--- | :--- | :--- |
| **Fuentes** | WPP (12 archivos de Thin a Black e Itálicas) | `.woff2` | **Incluido 100% original** en `/assets/fonts/` |
| **Logos** | WPP Media Solutions Logo | `.svg` | **Incluido 100% vectorial** en `/assets/logos/` |
| **Logos** | Creative Intelligence Logo | `.svg` | **Incluido 100% vectorial** en `/assets/logos/` |
| **Logos** | Creative Intelligence Logo (variante Lime) | `.svg` | **Incluido 100% vectorial** en `/assets/logos/` |
| **Favicon** | Creative Intelligence Favicon | `.svg` | **Incluido 100% vectorial** en `/assets/icons/` |
| **Favicon** | WPP Ecosystem Favicon | `.svg` | **Incluido 100% vectorial** en `/assets/icons/` |
| **Fondos** | Gradientes atmosféricos (Light & Dark) | `.svg` | **Incluido 100% vectorial** en `/assets/backgrounds/` |
| **Prototipos** | Reporte interactivo CI Social & Modal | `.html` | **Incluido 100% interactivo** en `/assets/images/` |
| **Componentes**| Componentes React atómicos tipados | `.tsx` | **Incluido** en `/design-system/components/` |
| **Tokens** | Paleta, tipografía, espaciado y navegación | `.ts` | **Incluido** en `/design-system/` |
| **Estilos** | CSS `@font-face` y configuración Tailwind | `.css` / `.js` | **Incluido** en `/config/` |

---
*Fin de la especificación técnica. Paquete preparado para despliegue e implementación directa por el equipo de desarrollo.*
