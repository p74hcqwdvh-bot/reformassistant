const app = document.getElementById("app");

app.innerHTML = `
  <div style="padding:16px">

    <h2>🏡 ReformAssistant</h2>
    <p>Tu asistente personal de ayudas y documentos</p>

    <hr>

    <h3>🔐 Acceso</h3>
    <input id="pin" type="password" placeholder="Introduce PIN" />
    <button id="login">Entrar</button>

    <p id="msg" style="color:#ffcc00"></p>

    <div id="panel" style="display:none; margin-top:20px">
      <h3>📌 Panel principal</h3>

      <button id="ayudas">Buscar ayudas</button>
      <button id="docs">Mis documentos</button>
      <button id="chat">Asistente IA</button>

      <p id="out" style="margin-top:15px"></p>
    </div>

  </div>
`;

const PIN_CORRECTO = "080874";

document.getElementById("login").onclick = () => {
  const pin = document.getElementById("pin").value;

  if (pin === PIN_CORRECTO) {
    document.getElementById("msg").textContent = "✅ Acceso correcto";
    document.getElementById("panel").style.display = "block";
  } else {
    document.getElementById("msg").textContent = "❌ PIN incorrecto";
  }
};

document.getElementById("ayudas").onclick = () => {
  document.getElementById("out").innerHTML = `
    <h3>🏛️ Ayudas y subvenciones oficiales</h3>

    <ul>
      <li>
        🇪🇸 <a href="https://www.boe.es/buscar/boe.php" target="_blank">
        BOE – Subvenciones nacionales</a>
      </li>

      <li>
        🌍 <a href="https://ec.europa.eu/info/funding-tenders/opportunities/portal" target="_blank">
        Unión Europea – Funding & Tenders</a>
      </li>

      <li>
        🏠 <a href="https://www.idae.es/ayudas-y-financiacion" target="_blank">
        IDAE – Ayudas energía y rehabilitación</a>
      </li>

      <li>
        🇪🇸 <a href="https://www.subvenciones.gob.es/" target="_blank">
        Base de Datos Nacional de Subvenciones</a>
      </li>

      <li>
        🏘️ <a href="https://www.xunta.gal/axudas" target="_blank">
        Xunta de Galicia – Ayudas autonómicas</a>
      </li>
    </ul>

    <p>📌 Próximo paso: haremos un buscador automático personalizado para ti.</p>
  `;
};
};

document.getElementById("docs").onclick = () => {
  document.getElementById("out").innerHTML = `
    <h3>📂 Gestión documental</h3>

    <p>Aquí podrás guardar:</p>
    <ul>
      <li>DNI</li>
      <li>Certificado digital</li>
      <li>Nóminas</li>
      <li>Familia numerosa</li>
      <li>Facturas reforma energética</li>
    </ul>

    <p>📌 Próximo paso: botón para subir archivos desde iPhone.</p>
  `;
};
  document.getElementById("out").textContent =
    "📂 Próximo paso: carpeta iCloud Drive + subida de documentos.";
};

document.getElementById("chat").onclick = () => {
  document.getElementById("out").textContent =
    "🤖 Próximo paso: conectar OpenAI dentro de la app.";
};