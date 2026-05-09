-- SQL para insertar 4 nuevos artículos en Supabase
-- Ejecuta esto en el SQL Editor de tu Dashboard de Supabase

INSERT INTO articles (title, summary, content, featured_image, slug, category, status, created_at, updated_at)
VALUES (
  'Project Glasswing: la IA ya puede encontrar los errores. ¿Quién los va a corregir?',
  'La inteligencia artificial ha pasado de generar código a supervisarlo. Project Glasswing de Google redefine la ciberseguridad y la calidad del software.',
  '# Project Glasswing: la IA ya puede encontrar los errores. ¿Quién los va a corregir?

Hay un error en el sistema operativo OpenBSD que tenía 27 años. Sobrevivió décadas de revisiones por expertos, campañas intensivas de pruebas automatizadas y el escrutinio constante de una comunidad cuya identidad entera gira alrededor de la seguridad. No lo encontró un equipo de investigadores de élite. Lo encontró una inteligencia artificial, en pocas horas, por menos de 50 dólares.

Unas semanas después, el mismo sistema encontró una vulnerabilidad de 16 años en FFmpeg, la biblioteca de procesamiento de video que vive dentro de navegadores, servicios de streaming, teléfonos y televisores en todo el planeta. Las herramientas automatizadas tradicionales habían ejecutado el código afectado cinco millones de veces sin detectar nada.

Bienvenidos al mundo de Project Glasswing.

---

## ¿Qué es Project Glasswing?

Anthropic, la empresa detrás del asistente de IA Claude, lanzó Project Glasswing: una iniciativa que usa inteligencia artificial para identificar y remediar vulnerabilidades de ciberseguridad desconocidas en software crítico.

El proyecto reúne a Amazon Web Services, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorgan Chase, la Linux Foundation, Microsoft, NVIDIA y Palo Alto Networks, poniendo a trabajar un nuevo modelo de IA —Claude Mythos Preview— con fines de seguridad defensiva. La escala del compromiso es significativa: Anthropic destinó hasta 100 millones de dólares en créditos de uso al proyecto, además de 4 millones de dólares donados a organizaciones de seguridad de código abierto.

---

## El problema que nadie quería ver

Durante décadas, el software que sostiene al mundo —sistemas bancarios, historias clínicas, redes eléctricas, logística global— ha contenido errores. Muchos son menores. Pero algunos son fallas de seguridad graves que, si fueran descubiertas por las personas equivocadas, permitirían a atacantes tomar control de sistemas enteros, robar datos o interrumpir servicios esenciales.

El problema no es nuevo. Lo nuevo es la velocidad.

El tiempo medio desde la divulgación de una vulnerabilidad hasta su explotación armada cayó de 771 días en 2018 a pocas horas en 2024. Para 2025, la mayoría de los exploits serán weaponizados antes de ser divulgados públicamente. Los atacantes ya operan a velocidad de máquina. Los defensores, todavía a ritmo humano.

Es en ese contexto que Project Glasswing cobra sentido. No como una solución mágica, sino como una respuesta urgente a un desequilibrio que se viene agravando en silencio.

---

## ¿Por qué no lanzarlo al público?

Anthropic tomó una decisión inusual: en lugar de una versión pública, Mythos Preview quedó restringido a una coalición cerrada de organizaciones. La lógica es simple: un modelo que puede encontrar vulnerabilidades de día cero en todos los sistemas operativos y navegadores principales es, por definición, también un modelo que podría usarse para atacarlos. El mismo motor que detecta una falla puede escribir el exploit.

Lanzarlo al público antes de que el ecosistema de software pudiera absorber los hallazgos habría sido, en palabras de la propia compañía, una decisión de seguridad disfrazada de decisión de marketing.

El nombre del proyecto tampoco es casual. La mariposa glasswing —alas de vidrio— se caracteriza por su transparencia. Durante décadas, la seguridad del software que el mundo usa dependió de que mirar con suficiente detalle estaba fuera del alcance de la mayoría de los atacantes. Ese supuesto ya no se sostiene.

---

## El verdadero problema: encontrar es fácil, corregir es difícil

Aquí está la pregunta incómoda que Project Glasswing pone sobre la mesa: ¿de qué sirve encontrar miles de vulnerabilidades si el sistema para corregirlas no puede absorberlas?

Los números son elocuentes: menos del 1% de las vulnerabilidades encontradas fueron parcheadas. Glasswing resolvió el problema de encontrar. Nadie resolvió el problema de corregir.

Los mantenedores de software de código abierto —las personas que cuidan los proyectos sobre los que se apoya casi toda la infraestructura digital del mundo— trabajan en su mayoría de forma voluntaria, con recursos limitados y sin los equipos de seguridad dedicados que tienen las grandes empresas. La combinación de mayor velocidad en los reportes de errores, mayor volumen de ciberataques y campañas cada vez más sofisticadas hace que su trabajo sea cada vez más difícil.

El resultado es una paradoja incómoda: cuanto más eficiente se vuelve la IA para detectar problemas, mayor es la presión sobre los humanos que tienen que resolverlos. Y esos humanos no se multiplicaron.

---

## ¿Hay motivos para el optimismo?

Sí, aunque con matices.

Si estas herramientas ayudan a los equipos a encontrar vulnerabilidades más temprano, investigar código de forma más efectiva y reducir el número de problemas que llegan a producción, eso es una ganancia concreta: software más seguro, entornos más limpios y equipos de ingeniería que pueden enfocarse en construir en lugar de apagar incendios.

Los primeros indicios también sugieren que Claude Mythos Preview no solo encuentra vulnerabilidades, sino que también puede proporcionar parches viables. Greg Kroah-Hartman, del Proyecto Linux —conocido por su escepticismo y sus estándares altísimos— llegó a decir que algunos de los parches generados por IA eran "bastante buenos". Viniendo de él, eso es un elogio considerable.

Y hay algo más importante: por primera vez en décadas, los mantenedores de proyectos de código abierto tendrían acceso a herramientas de seguridad de nivel empresarial, de forma gratuita. Hasta ahora, esas capacidades eran un lujo reservado para organizaciones con grandes presupuestos y equipos dedicados. Project Glasswing apunta a cambiar esa ecuación.

---

## Lo que viene

El éxito del proyecto dependerá en parte de si el enfoque colaborativo puede mantener el ritmo con los rápidos avances en las capacidades de la IA. Anthropic ya advirtió que los modelos de frontera probablemente avanzarán sustancialmente en los próximos meses, lo que crea un entorno donde las capacidades defensivas y ofensivas evolucionan en paralelo, a una velocidad sin precedentes.

La pregunta que Project Glasswing deja abierta no es tecnológica. Es organizacional, política y profundamente humana: ¿tenemos la infraestructura, el financiamiento y la coordinación colectiva para corregir errores a la velocidad a la que la IA puede encontrarlos?

Porque Project Glasswing va a medirse por una sola métrica: cuántas vulnerabilidades se parchean antes de que sean explotadas. No cuántas se encuentran, no qué tan impresionantes son los hallazgos, sino si el ecosistema puede digerir lo que la IA está a punto de producir.

La IA ya puede encontrar los errores.

Ahora nos toca a nosotros.
',
  '/images/blog/project-glasswing.png',
  'project-glasswing-ia-errores',
  'Inteligencia Artificial',
  'published',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  content = EXCLUDED.content,
  featured_image = EXCLUDED.featured_image,
  category = EXCLUDED.category,
  updated_at = NOW();

INSERT INTO articles (title, summary, content, featured_image, slug, category, status, created_at, updated_at)
VALUES (
  'Cómo mejorar las respuestas de Claude: 18 pasos para sacarle el máximo partido',
  'Descubre las técnicas avanzadas de Anthropic para obtener resultados precisos y profesionales con Claude. De etiquetas XML a Chain-of-Thought.',
  '# Cómo mejorar las respuestas de Claude: 18 pasos para sacarle el máximo partido

La mayoría de las personas usa Claude de la misma manera: escriben lo que quieren, leen la respuesta, ajustan una palabra si no les convence, y vuelven a intentarlo. Sin saber que Anthropic publicó guías detalladas sobre cómo obtener resultados significativamente mejores con solo cambiar cómo se hacen las preguntas.

La diferencia entre una instrucción vaga y un prompt bien construido puede ser la diferencia entre una respuesta genérica y exactamente lo que necesitabas. Un prompt mal estructurado puede requerir cinco intercambios para aclarar la intención. Uno bien construido lo logra al primer intento.

Estas son 18 formas concretas de mejorar tus resultados con Claude, organizadas de las más simples a las más avanzadas.

---

## Técnicas fundamentales

### 1. Sé explícito sobre lo que querés

El error más común es asumir que Claude va a inferir lo que querés. No lo hagas. Decí exactamente qué esperás ver en la respuesta.

La diferencia en la práctica: "Creá un dashboard de análisis" es una instrucción vaga. "Creá un dashboard de análisis. Incluí la mayor cantidad posible de funciones e interacciones relevantes. Ve más allá de lo básico para lograr una implementación completa" es una instrucción explícita. La segunda versión le indica a Claude que no se conforme con el mínimo.

**Aplicalo así:** empezá con verbos de acción directos —escribí, analizá, generá, creá— y sin preámbulos. Llegá directo al pedido.

---

### 2. Explicá el por qué, no solo el qué

Decirle a Claude el motivo detrás de tu pedido le permite tomar mejores decisiones sobre cómo responder. Especialmente con los modelos más recientes, que pueden razonar sobre tus objetivos subyacentes.

Comparación: "NUNCA uses listas con viñetas" versus "Prefiero respuestas en forma de párrafos continuos porque me resulta más fácil de leer y se siente más conversacional. Las listas me parecen demasiado formales para mi estilo."

La segunda versión no solo da la instrucción, explica el razonamiento. Eso le permite a Claude tomar mejores decisiones en situaciones relacionadas que no hayas previsto.

---

### 3. Agregá contexto específico

Cuanto más específico seas sobre tus restricciones y objetivos, mejores serán los resultados. La especificidad es lo que separa una respuesta útil de una respuesta genérica.

Comparación: "Creá un plan de comidas mediterráneo" versus "Diseñá un plan de dieta mediterránea para el manejo de prediabetes. 1.800 calorías diarias, énfasis en alimentos de bajo índice glucémico. Listá desayuno, almuerzo, cena y un snack con desglose nutricional completo."

Siempre incluí: restricciones claras (extensión, formato, tiempo), contexto relevante (quién es el destinatario, cuál es el objetivo), estructura deseada de la respuesta, y cualquier requisito o limitación específica.

---

### 4. Usá ejemplos para mostrar, no solo describir

Los ejemplos —también llamados prompting de uno o pocos disparos— son especialmente poderosos cuando el formato deseado es más fácil de mostrar que de describir, o cuando las instrucciones simples no están produciendo resultados consistentes.

Un ejemplo concreto: en lugar de decir "resumí este artículo", mostrá cómo querés ese resumen con un caso previo: "Aquí hay un ejemplo del estilo de resumen que quiero: [ejemplo]. Ahora resumí este artículo del mismo modo: [nuevo artículo]."

**Consejo práctico:** empezá con un solo ejemplo. Solo agregues más si el resultado todavía no se ajusta a lo que necesitás.

---

### 5. Dale permiso explícito para expresar incertidumbre

Este es uno de los cambios más simples y más impactantes que podés hacer. Agregarle al prompt la posibilidad de reconocer limitaciones reduce las alucinaciones y aumenta la confiabilidad de las respuestas.

Cómo hacerlo: "Analizá estos datos financieros e identificá tendencias. Si los datos son insuficientes para sacar conclusiones, decilo en lugar de especular."

Esta adición simple hace que las respuestas sean más confiables porque le permite al modelo reconocer sus propias limitaciones en lugar de inventar respuestas.

---

### 6. No sobre-ingenieres el prompt

Más largo no siempre es mejor. Los prompts complejos no producen automáticamente mejores resultados. Si la instrucción central no está clara, ningún nivel de sofisticación adicional va a compensarlo.

Los errores más comunes: ignorar las técnicas básicas y saltar directamente a las avanzadas, asumir que el modelo "lee entre líneas", dejar ambigüedades que dan margen para malinterpretar, usar todas las técnicas posibles a la vez, y no iterar.

El primer prompt rara vez es perfecto. Probá, ajustá, repetí.

---

## Técnicas intermedias

### 7. Usá etiquetas XML para estructurar instrucciones complejas

Cuando el prompt incluye múltiples componentes —instrucciones, contexto, ejemplos, datos— las etiquetas XML ayudan a Claude a distinguir claramente qué es qué.

```
<instrucciones>
Escribí un análisis de mercado para el sector tecnológico.
</instrucciones>

<contexto>
Estoy preparando una presentación para inversores con poca experiencia técnica.
</contexto>

<formato>
Usá párrafos, sin listas, lenguaje accesible, máximo 400 palabras.
</formato>
```

Esto es especialmente útil con documentos largos o tareas que combinan múltiples tipos de información.

---

### 8. Pedile que razone paso a paso

Para problemas complejos —análisis, decisiones, código, matemáticas— pedirle a Claude que piense en voz alta produce respuestas más precisas y más fáciles de verificar.

Cómo formularlo: "Antes de responder, pensá paso a paso sobre este problema y explicá tu razonamiento." o simplemente: "Razoná paso a paso."

Esto activa lo que se conoce como chain-of-thought prompting: el modelo construye su respuesta de manera más metódica en lugar de ir directamente a una conclusión.

---

### 9. Dividí tareas complejas en pasos más pequeños

Si la tarea tiene múltiples etapas, no las pongas todas en un solo prompt. Dividí el trabajo en pasos secuenciales donde cada respuesta alimenta el siguiente pedido.

Ejemplo: en lugar de "Escribí un informe completo sobre X", hacé: primero "Listá los cinco puntos más importantes sobre X", luego "Expandí el punto 2 con datos y ejemplos", y así sucesivamente. Cada paso construye sobre el anterior con mayor control y precisión.

---

### 10. Asignale un rol cuando sea relevante

Decirle a Claude que adopte una perspectiva específica puede mejorar la calidad y el tono de la respuesta en ciertos contextos.

Ejemplos útiles: "Actuá como un editor experimentado que revisa este texto para publicación", "Respondé como si fueras un asesor financiero explicándole esto a alguien sin conocimientos previos", o "Analizá este código como si fueras un desarrollador senior haciendo una revisión de seguridad."

**Aclaración importante:** el rol prompting es menos necesario con los modelos modernos que con los anteriores. Usalo cuando el enfoque o el tono específico realmente importan, no como regla general.

---

### 11. Especificá el formato de salida con detalle

Si tenés una preferencia clara sobre cómo querés recibir la información, decílo. No asumas que Claude va a elegir el formato más útil para vos.

Opciones comunes: "Respondé en formato de tabla comparativa", "Usá solo párrafos, sin listas ni subtítulos", "Estructurá la respuesta con una introducción, tres secciones con título y una conclusión", "Limitá la respuesta a 200 palabras."

Cuanto más específico seas sobre el formato, menos trabajo de edición tenés después.

---

### 12. Pedí múltiples opciones cuando necesitás variedad

En lugar de pedir una sola respuesta, pedí varias versiones con distintos enfoques. Esto es especialmente útil para textos creativos, nombres, títulos o estrategias.

Cómo formularlo: "Generá tres versiones diferentes de este párrafo introductorio: una formal, una conversacional y una que priorice el impacto emocional."

Tener opciones para elegir suele ser más eficiente que iterar sobre una sola respuesta.

---

## Técnicas avanzadas

### 13. Usá el prefilling para controlar el inicio de la respuesta

El prefilling consiste en iniciar vos mismo la respuesta de Claude para guiar el formato, el tono o la estructura desde el primer token. Es especialmente poderoso cuando necesitás formatos estructurados como JSON o XML, o cuando querés evitar introducciones innecesarias.

Esta técnica está disponible principalmente para usuarios de la API, pero en el chat podés lograr algo similar con instrucciones como: "Comenzá tu respuesta directamente con el análisis, sin introducción ni preámbulo."

---

### 14. Gestioná el contexto en conversaciones largas

Claude no tiene memoria entre conversaciones, pero dentro de una misma sesión puede perder el hilo si la conversación se extiende demasiado. En conversaciones largas, es útil hacer resúmenes periódicos del estado actual.

Cómo hacerlo: "Hasta ahora hemos definido X, Y y Z. Teniendo eso en cuenta, continuemos con el siguiente punto." Esto funciona como ancla de contexto y mantiene la coherencia a lo largo de sesiones extensas.

---

### 15. Iterá sistemáticamente en lugar de reescribir todo

Cuando una respuesta no es exactamente lo que necesitabas, no deseches el prompt y empieces de cero. Identificá qué parte específica falló y ajustá solo eso.

Preguntas útiles para diagnosticar: ¿El tono no es el correcto? ¿La extensión es inadecuada? ¿Falta información específica? ¿El formato no es el que querías? Cada ajuste puntual te enseña algo sobre cómo Claude interpreta tus instrucciones.

---

### 16. Pedí que evalúe su propia respuesta

Una técnica que pocos usan: después de recibir una respuesta, pedile a Claude que la evalúe y mejore.

Cómo formularlo: "Revisá la respuesta que acabás de dar. ¿Qué mejorarías? Escribí una versión revisada." o "¿Hay algún ángulo importante que no hayas cubierto en esa respuesta?"

Esto activa un proceso de autocorrección que suele producir resultados notablemente más completos.

---

### 17. Usá ejemplos negativos para delimitar lo que no querés

Además de mostrar ejemplos de lo que sí querés, podés mostrar ejemplos de lo que no querés. Esto es especialmente útil para tono y estilo, donde la descripción abstracta a veces no alcanza.

Ejemplo: "Quiero que el tono sea así: [ejemplo positivo]. Evitá este tipo de lenguaje: [ejemplo negativo]. El segundo suena demasiado corporativo para mi audiencia."

---

### 18. Pedile que te ayude a construir el prompt

Cuando no sabés bien cómo formular un pedido complejo, podés usar a Claude para construir el prompt junto con vos.

Cómo hacerlo: "Estoy intentando que me ayudes con [objetivo]. No estoy seguro de cómo formular el pedido para obtener los mejores resultados. ¿Podés ayudarme a construir un prompt efectivo para esto?"

Este enfoque es especialmente útil para tareas nuevas o inusuales donde no tenés experiencia previa sobre qué funciona.

---

## El principio detrás de todo

Hay un patrón que une todas estas técnicas: Claude responde mejor cuando entiende no solo qué querés, sino por qué lo querés, para quién es, en qué formato lo necesitás y qué considerás una buena respuesta.

La ingeniería de prompts no es un truco ni una fórmula mágica. Es comunicación. Las mismas habilidades que hacen que una instrucción escrita sea clara para un colega humano hacen que un prompt sea efectivo para Claude.

Empezá con las técnicas más simples —claridad, contexto, ejemplos— y agregá complejidad solo cuando tengas un problema específico que resolver. El primer prompt rara vez es perfecto. El objetivo es que cada iteración te acerque más a lo que necesitás.
',
  '/images/blog/mejorar-respuestas-claude.png',
  'mejorar-respuestas-claude-paso-a-paso',
  'Productividad IA',
  'published',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  content = EXCLUDED.content,
  featured_image = EXCLUDED.featured_image,
  category = EXCLUDED.category,
  updated_at = NOW();

INSERT INTO articles (title, summary, content, featured_image, slug, category, status, created_at, updated_at)
VALUES (
  'Google One: qué es, cuánto cuestan sus tarifas y cómo compartir almacenamiento',
  'Todo lo que necesitas saber sobre el ecosistema de almacenamiento de Google. Planes, precios y la guía definitiva para el Plan Familiar.',
  '# Google One: qué es, cuánto cuestan sus tarifas y cómo compartir su almacenamiento con familiares

Todos los que tienen una cuenta de Google —para usar Gmail, Google Fotos, Google Drive o cualquier otro servicio— reciben 15 GB de almacenamiento gratuito. Parece mucho hasta que no lo es. Las fotos del celular, los correos con adjuntos, los documentos guardados en Drive: todo comparte ese mismo espacio. Cuando se llena, Google te ofrece una solución: Google One.

Este artículo explica qué es exactamente, cuánto cuesta cada plan, qué beneficios incluye cada uno, y cómo compartir ese almacenamiento con hasta cinco personas de tu familia sin costo adicional.

---

## ¿Qué es Google One?

Google One es el servicio de suscripción de pago con el que Google centraliza el almacenamiento en la nube. No es una aplicación ni un servicio nuevo en sí mismo: es la forma en que Google empaqueta y vende el espacio adicional para Drive, Gmail y Google Fotos bajo un mismo techo, junto con beneficios extra según el plan que elijas.

Antes de que existiera Google One, comprar más almacenamiento se hacía directamente desde Google Drive, sin nombre propio ni beneficios adicionales. Desde 2018, todo eso pasó a llamarse Google One, con planes más variados, precios más organizados y la posibilidad de compartir el espacio con la familia.

Lo que Google One no es: no reemplaza a Google Drive, Gmail ni Google Fotos. Esos servicios siguen funcionando igual. Google One simplemente amplía el espacio disponible y agrega algunas ventajas encima.

---

## ¿Qué incluye el almacenamiento gratuito?

Antes de hablar de precios, vale la pena entender qué se llena y por qué.

Los 15 GB gratuitos que Google da a cada cuenta se comparten entre tres servicios: Google Drive (archivos, documentos, presentaciones), Gmail (correos y adjuntos) y Google Fotos (imágenes y videos). No son 15 GB por servicio, sino 15 GB en total entre los tres.

En la práctica, eso significa que si tenés muchas fotos guardadas en Google Fotos, ese espacio se descuenta del mismo pool que usan tus correos y documentos. Cuando el total supera los 15 GB, Google empieza a restringir el funcionamiento de esos servicios: no podés recibir nuevos correos, no podés subir más fotos, no podés guardar nuevos archivos.

Ahí es donde entra Google One.

---

## Los planes y sus precios

Google One ofrece varios niveles de almacenamiento. Los tres más comunes son el de 100 GB, el de 200 GB y el de 2 TB. Hay planes aún más grandes —5 TB, 10 TB, 20 TB y 30 TB— pero están orientados a usuarios con necesidades muy específicas y no aparecen directamente en la página principal; hay que entrar primero al plan de 2 TB y desde ahí solicitar la actualización.

Los precios en dólares para los planes principales son los siguientes:

**Plan Básico — 100 GB**
Cuesta aproximadamente 1,99 USD por mes o 19,99 USD al año. Es la opción de entrada, ideal para quien necesita un poco más de espacio pero no trabaja con archivos muy grandes. Incluye copia de seguridad automática del teléfono.

**Plan Estándar — 200 GB**
Cuesta aproximadamente 2,99 USD por mes o 29,99 USD al año. Es solo un dólar más que el plan de 100 GB pero duplica el espacio. Agrega un 3% de reembolso en créditos para compras en la Google Store. El almacenamiento se puede compartir con la familia.

**Plan Premium — 2 TB**
Cuesta aproximadamente 9,99 USD por mes o 99,99 USD al año. Es el plan de mejor relación valor/precio para quien usa Google de manera intensiva. Incluye 10% de crédito en la Google Store y la opción de compartir el almacenamiento con hasta cinco personas. El salto de 200 GB a 2 TB es considerable, pero el precio también lo justifica si el espacio se comparte en familia.

**Plan AI Pro — 2 TB + acceso a Gemini Advanced**
Cuesta 19,99 USD por mes. Incluye los mismos 2 TB de almacenamiento que el plan Premium, pero agrega acceso a Gemini Advanced —la versión más potente del asistente de IA de Google— junto con herramientas de generación de video e imagen con créditos mensuales. Es esencialmente el plan Premium más 10 dólares por las capacidades de IA.

**Planes de almacenamiento masivo — 5 TB, 10 TB, 20 TB y 30 TB**
Existen para usuarios con necesidades extremas de espacio. No se muestran en la página principal; hay que acceder desde la configuración del plan de 2 TB. Los precios escalan significativamente.

*Nota: los precios pueden variar según el país y la plataforma de pago (Android, iOS o web). En Argentina y otros países de América Latina, los montos se expresan en moneda local con impuestos incluidos, lo que puede diferir de los valores en dólares mencionados aquí. Siempre conviene verificar el precio final en one.google.com antes de suscribirse.*

---

## Qué beneficios incluye cada plan

Más allá del almacenamiento en sí, Google One agrega algunas ventajas que vale la pena conocer:

**Copia de seguridad automática del dispositivo.** Disponible desde el plan más básico. Google One puede hacer backup automático de las fotos, videos, contactos, historial de llamadas y mensajes del teléfono. Si perdés o rompés el celular, restaurar todo es tan simple como iniciar sesión en un dispositivo nuevo.

**Crédito en la Google Store.** A partir del plan de 200 GB, Google devuelve un porcentaje de las compras en su tienda oficial en forma de crédito. El plan de 200 GB ofrece 3%; el de 2 TB y superiores, 10%.

**Funciones avanzadas en Google Meet y Calendario.** Los planes Premium y superiores habilitan llamadas grupales más largas en Meet y opciones extendidas en el Calendario de Google, como múltiples tipos de citas y recordatorios automáticos.

**Acceso a Gemini Advanced** (solo en el plan AI Pro y superiores). Incluye herramientas de investigación profunda, generación de video con texto y otras capacidades de IA de última generación.

---

## Cómo compartir el almacenamiento con la familia

Esta es una de las funciones más útiles de Google One y una de las menos conocidas: desde el plan de 100 GB en adelante, podés compartir tu almacenamiento con hasta cinco personas más, sin costo adicional. Es decir, seis personas usando el mismo pool de espacio pagando una sola suscripción.

Importante entender cómo funciona: el almacenamiento es compartido en cantidad total, pero cada persona conserva sus archivos de forma privada. Compartir el plan no significa que los demás pueden ver tus fotos o documentos —cada uno accede solo a su propio espacio dentro del total disponible.

**Cómo activarlo paso a paso:**

El primer requisito es tener un grupo familiar de Google configurado. Si todavía no lo tenés, podés crearlo desde myaccount.google.com/family.

Una vez que el grupo familiar está activo, el proceso para compartir el almacenamiento es el siguiente:

1. Abrí la aplicación Google One en tu teléfono o entrá a one.google.com desde la computadora.
2. En la pantalla principal, buscá la sección "Compartir Google One con familiares".
3. Tocá la opción "Compartir" y confirmá en el cuadro de diálogo que aparece.
4. Google enviará una invitación a cada integrante del grupo familiar. Una vez que acepten, podrán usar el almacenamiento compartido.

Desde ese momento, en tu panel de Google One vas a poder ver no solo cuánto espacio usás vos, sino también cuánto está usando cada integrante de la familia, desglosado por persona.

**¿Cuántas personas pueden participar?** Hasta seis en total: vos más cinco familiares. Google One llama a esto el "grupo familiar" y está vinculado al sistema de Familias de Google, que también permite compartir compras de apps, películas y libros en las plataformas de Google.

**¿Los familiares necesitan pagar algo?** No. Solo el administrador del plan —la persona que paga la suscripción— abona la cuota mensual o anual. Los demás miembros del grupo familiar usan el espacio sin costo adicional.

---

## ¿Vale la pena?

Depende del uso y de si podés aprovechar el plan familiar.

Para una sola persona que tiene pocas fotos y documentos, los 15 GB gratuitos pueden ser suficientes durante años. Pero para alguien que saca muchas fotos, tiene varios dispositivos, o usa Google Drive activamente para trabajo, quedarse sin espacio es solo cuestión de tiempo.

El plan de 100 GB por menos de 2 dólares al mes es una solución práctica y económica para el uso individual. El plan de 2 TB se vuelve especialmente atractivo cuando se divide entre varios miembros de la familia: a menos de 2 dólares por persona al mes, es difícil encontrar una alternativa más barata en servicios equivalentes.

Lo que no conviene hacer es esperar a que el almacenamiento se llene. Cuando eso pasa, Gmail deja de recibir correos nuevos y Google Fotos deja de hacer backup —dos situaciones que pueden traer problemas antes de que te des cuenta.
',
  '/images/blog/google-one-familia.png',
  'google-one-guia-tarifas-familia',
  'Ecosistema Digital',
  'published',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  content = EXCLUDED.content,
  featured_image = EXCLUDED.featured_image,
  category = EXCLUDED.category,
  updated_at = NOW();

INSERT INTO articles (title, summary, content, featured_image, slug, category, status, created_at, updated_at)
VALUES (
  'Sostenibilidad digital: de iniciativa ESG a ventaja competitiva real',
  'En 2026, la huella de carbono de tus servidores importa tanto como tu tiempo de carga. Descubre cómo la eficiencia energética es el nuevo KPI.',
  '
<h2>El Coste Invisible del Bit</h2>
<p>Durante décadas, el mundo digital se percibió como etéreo e inmaterial. Sin embargo, la explosión de la IA generativa y el procesamiento masivo de datos han revelado una realidad física ineludible: los centros de datos ya consumen una fracción significativa de la energía global.</p>

<h2>De la Responsabilidad al Rendimiento</h2>
<p>Lo que comenzó como una métrica de cumplimiento ESG (Environmental, Social, and Governance) ha evolucionado hacia una ventaja competitiva tangible. Las infraestructuras optimizadas para la sostenibilidad no solo reducen el impacto ambiental, sino que disminuyen drásticamente los costes operativos y mejoran la percepción de marca ante un consumidor cada vez más consciente.</p>

<h2>Estrategias para una Web Verde</h2>
<ul>
    <li><strong>Optimización de Recursos:</strong> Reducción del tamaño de activos y eliminación de código redundante.</li>
    <li><strong>Arquitecturas Serverless:</strong> Escalado dinámico que consume energía solo cuando es necesario.</li>
    <li><strong>Selección de Proveedores:</strong> Migración a regiones de nube alimentadas al 100% por energías renovables.</li>
</ul>

<p>La sostenibilidad digital ya no es opcional; es el estándar de oro para la próxima generación de infraestructuras tecnológicas.</p>
    ',
  '/images/blog/sostenibilidad-digital.png',
  'sostenibilidad-digital-esg-competitiva',
  'Sostenibilidad',
  'published',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  content = EXCLUDED.content,
  featured_image = EXCLUDED.featured_image,
  category = EXCLUDED.category,
  updated_at = NOW();

