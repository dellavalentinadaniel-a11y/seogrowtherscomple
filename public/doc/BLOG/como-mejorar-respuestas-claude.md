# Cómo mejorar las respuestas de Claude: 18 pasos para sacarle el máximo partido

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
