
export const ssdGuideData = [
  {
    id: "subtema-1",
    title: "El Estándar de Oro (Hardware)",
    content: `
      <p>En 2026, el mercado está inundado de discos <strong>PCIe Gen5</strong> que prometen velocidades de vértigo (14,000 MB/s). Sin embargo, aquí viene la primera lección de eficiencia: <strong>La PS5 está diseñada para PCIe Gen4.</strong> Instalar un Gen5 es como ponerle neumáticos de Fórmula 1 a un coche urbano; funcionará, pero nunca alcanzarás esa velocidad máxima y habrás pagado un sobreprecio enorme.</p>
      
      <h3>Los 3 Gigantes del 2026</h3>
      <p>Para que tu PS5 vuele, estos son los modelos que dominan la relación calidad-precio y fiabilidad:</p>
      <ol>
        <li><strong>Samsung 990 Pro (Edición 2026):</strong> El estándar de la industria. Su gestión de energía es tan eficiente que apenas genera calor, algo vital en el espacio reducido de la consola.</li>
        <li><strong>WD_BLACK SN850X:</strong> Es el "favorito de los puristas". Tiene un modo de juego optimizado que reduce la latencia en la carga de texturas pesadas.</li>
        <li><strong>Crucial T500:</strong> La opción inteligente para el presupuesto. Ofrece casi el mismo rendimiento que los anteriores pero suele costar un <strong>15% menos</strong>.</li>
      </ol>

      <h3>¿Qué velocidad buscamos?</h3>
      <p>Sony recomienda un mínimo de <strong>5,500 MB/s</strong>, pero en 2026, para juegos de mundo abierto masivos, lo ideal es apuntar a discos que superen los <strong>7,000 MB/s</strong>. Esto garantiza que el sistema de descompresión de la PS5 (Kraken) trabaje sin cuellos de botella.</p>
      
      <div class="bg-blue-500/10 p-4 rounded-lg my-6 border border-blue-500/20">
        <h4 class="text-blue-400 font-bold mb-2">Análisis de Inversión</h4>
        <p class="text-sm">¿Crees que una inversión extra en Gen5 se traduciría en tiempos de carga más rápidos? No, la PS5 actúa como freno de mano físico para esa tecnología.</p>
      </div>
    `
  },
  {
    id: "subtema-2",
    title: "Anatomía de la Instalación (El Disipador)",
    content: `
      <p>La PS5 genera mucho calor, y un SSD que se calienta demasiado entra en un estado llamado <strong>Thermal Throttling</strong>: baja su velocidad drásticamente para no quemarse. Esto en mitad de una partida significa tirones (lag) o cierres inesperados.</p>

      <h3>El Heatsink (Disipador): ¿Integrado o aparte?</h3>
      <p>Tienes dos opciones en 2026:</p>
      <ul>
        <li><strong>SSD con Disipador de fábrica:</strong> Es lo más cómodo. Viene "blindado" y listo para encajar. Modelos como el *SN850X con Heatsink* son ideales.</li>
        <li><strong>SSD "desnudo" + Disipador de terceros:</strong> Compras el disco por un lado y un disipador (como el famoso *Sabrent M.2 NVMe PS5 Heatsink*) por otro. A veces ahorraras unos 15€-20€, pero requiere montaje manual.</li>
      </ul>

      <div class="bg-yellow-500/10 p-4 rounded-lg my-6 border border-yellow-500/20">
        <h4 class="text-yellow-400 font-bold mb-2">La Regla de Oro</h4>
        <p class="text-sm">El conjunto (SSD + Disipador) no puede superar los <strong>11.25 mm</strong> de altura total. Si es demasiado robusto, la tapa de la consola no cerrará.</p>
      </div>
    `
  },
  {
    id: "subtema-3",
    title: "Rendimiento y Mantenimiento",
    content: `
      <p>¿Cómo nos aseguramos de que no falle a los seis meses? Aquí entran dos conceptos clave para el 2026:</p>

      <h3>1. ¿DRAM o DRAM-less?</h3>
      <p>Los SSD baratos (DRAM-less) usan una parte de tu almacenamiento para gestionar dónde guardan los datos. Esto los hace más lentos a medida que se llenan. Para una PS5, busca siempre discos con <strong>DRAM dedicada</strong>.</p>
      
      <h3>2. Actualización de Firmware</h3>
      <p>Los SSD son como ordenadores pequeños. A veces, las marcas lanzan actualizaciones para corregir errores críticos. <strong>La PS5 no puede actualizar el firmware;</strong> debes hacerlo conectándolo a un PC antes de la instalación final.</p>
    `
  },
  {
    id: "subtema-4",
    title: "Estrategia de Inversión",
    content: `
      <h3>Capacidad vs. Precio en 2026</h3>
      <ul>
        <li><strong>1 TB:</strong> Desaconsejado. Entre el sistema operativo y un par de Triple A, lo habrás llenado en una tarde.</li>
        <li><strong>2 TB (El Sweet Spot):</strong> La compra más inteligente. Mejor equilibrio entre precio y espacio disponible.</li>
        <li><strong>4 TB+:</strong> Solo para coleccionistas. El precio por TB sube exponencialmente.</li>
      </ul>
      
      <p>No pagues por la "marca gaming" si las especificaciones son iguales. Prioriza chips <strong>TLC</strong> sobre QLC para mayor durabilidad histórica.</p>
    `
  }
];

export const ssdFaqs = [
  {
    question: "¿Puedo usar un SSD Gen5 en mi PS5?",
    answer: "Sí, mecánicamente encajará si tiene el tamaño adecuado, pero funcionará a velocidades Gen4 (máximo ~8,000 MB/s teóricos), por lo que estarás desperdiciando dinero en rendimiento que la consola no puede aprovechar."
  },
  {
    question: "¿Es peligroso instalar el SSD sin disipador?",
    answer: "Sí. Sin disipador, el disco alcanzará temperaturas altas rápidamente, activando el thermal throttling que reducirá el rendimiento o incluso podría dañar la unidad a largo plazo."
  },
  {
    question: "¿Cómo actualizo el firmware si no tengo PC?",
    answer: "Lamentablemente la PS5 no soporta actualizaciones de firmware de SSD. Deberás pedir prestada una laptop o PC con puerto M.2 o usar un adaptador externo para realizar la actualización con el software oficial de la marca."
  }
];
