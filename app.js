const app = document.getElementById("app");

app.innerHTML = `
  <div style="padding:16px; font-family:Arial">

    <h2>🏡 ReformAssistant</h2>
    <p>Tu asistente personal de ayudas y documentos</p>

    <hr>

    <h3>🔐 Acceso</h3>
    <input id="pin" type="password" placeholder="Introduce PIN" />
    <button id="login">Entrar</button>

    <p id="msg" style="color:#ffcc00"></p>

    <div id="panel" style="display:none; margin-top:20px">
      <h3>📌 Panel principal</h3>

      <button id="ayudas">🏛️ Buscar ayudas</button>
      <button id="docs">📂 Mis documentos</button>
      <button id="chat">🤖 Asistente IA</button>

      <div id="out" style="margin-top:15px"></div>
    </div>

  </div>
`;

const PIN_CORRECTO = "080874";


/* ✅ LOGIN */
document.getElementById("login").onclick = () => {
  const pin = document.getElementById("pin").value;

  if (pin === PIN_CORRECTO) {
    document.getElementById("msg").textContent = "✅ Acceso correcto";
    document.getElementById("panel").style.display = "block";
  } else {
    document.getElementById("msg").textContent = "❌ PIN incorrecto";
  }
};


/* ✅ AYUDAS */
document.getElementById("ayudas").onclick = () => {

  document.getElementById("out").innerHTML = `

  <h3>🏛️ Buscador de subvenciones</h3>

  <p>Tipo de reforma:</p>

  <select id="tipo">
    <option value="aerotermia">Aerotermia</option>
    <option value="fotovoltaica">Fotovoltaica</option>
    <option value="rehabilitacion">Rehabilitación energética</option>
    <option value="ventanas">Cambio de ventanas</option>
    <option value="aislamiento">Aislamiento</option>
  </select>

  <p style="margin-top:10px">Coste estimado de la obra (€)</p>

  <input id="coste" type="number" placeholder="Ej: 30000">

  <br><br>

  <button id="calcularAyuda">🔎 Buscar ayudas</button>

  <div id="resultado" style="margin-top:20px"></div>

  `;

  document.getElementById("calcularAyuda").onclick = () => {

    const tipo = document.getElementById("tipo").value;
    const coste = Number(document.getElementById("coste").value);

    let porcentaje = 0.4;

    if (tipo === "rehabilitacion") porcentaje = 0.6;
    if (tipo === "aerotermia") porcentaje = 0.5;
    if (tipo === "fotovoltaica") porcentaje = 0.45;

    const ayuda = Math.round(coste * porcentaje);

    document.getElementById("resultado").innerHTML = `

      <h4>💰 Subvención estimada</h4>

      <p>Tipo de obra: <b>${tipo}</b></p>

      <p>Coste estimado: <b>${coste} €</b></p>

      <p>Ayuda posible: <b style="color:#00ff88">${ayuda} €</b></p>

      <hr>

      <p>Solicitar ayuda en:</p>

      <ul>
        <li><a href="https://www.subvenciones.gob.es/" target="_blank">Base Nacional de Subvenciones</a></li>
        <li><a href="https://www.xunta.gal/axudas" target="_blank">Xunta de Galicia</a></li>
        <li><a href="https://www.idae.es/ayudas-y-financiacion" target="_blank">IDAE</a></li>
      </ul>

    `;

  };

};


/* ✅ DOCUMENTOS (SUBIDA REAL) */
document.getElementById("docs").onclick = () => {
  document.getElementById("out").innerHTML = `
    <h3>📂 Mis documentos</h3>

    <p>Sube aquí tus archivos:</p>

    <input type="file" id="fileInput" multiple />

    <ul id="fileList" style="margin-top:15px"></ul>

    <p style="opacity:.8">
      📌 Puedes subir PDF, imágenes de facturas, DNI, certificados, etc.
    </p>
  `;

  const input = document.getElementById("fileInput");
  const list = document.getElementById("fileList");

  input.onchange = () => {
    list.innerHTML = "";

    for (const file of input.files) {
      const li = document.createElement("li");
      li.textContent = "✅ " + file.name;
      list.appendChild(li);
    }
  };
};


/* ✅ IA */
document.getElementById("chat").onclick = () => {
  document.getElementById("out").innerHTML = `
    <h3>🤖 Asistente IA</h3>
    <p>Próximo paso: conectar OpenAI dentro de la app.</p>
  `;
};