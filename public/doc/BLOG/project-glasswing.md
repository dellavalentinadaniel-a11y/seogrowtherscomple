# Project Glasswing: la IA ya puede encontrar los errores. ¿Quién los va a corregir?

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
