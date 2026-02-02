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
    <h3>🏛️ Ayudas oficiales</h3>
    <ul>
      <li><a href="https://www.boe.es/buscar/boe.php" target="_blank">BOE – Subvenciones nacionales</a></li>
      <li><a href="https://www.subvenciones.gob.es/" target="_blank">Base Nacional Subvenciones</a></li>
      <li><a href="https://www.idae.es/ayudas-y-financiacion" target="_blank">IDAE – Energía y rehabilitación</a></li>
      <li><a href="https://www.xunta.gal/axudas" target="_blank">Xunta Galicia – Ayudas</a></li>
    </ul>
  `;
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