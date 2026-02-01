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
  document.getElementById("out").textContent =
    "📍 Próximo paso: conectamos buscador real de subvenciones Galicia/España/UE.";
};

document.getElementById("docs").onclick = () => {
  document.getElementById("out").textContent =
    "📂 Próximo paso: carpeta iCloud Drive + subida de documentos.";
};

document.getElementById("chat").onclick = () => {
  document.getElementById("out").textContent =
    "🤖 Próximo paso: conectar OpenAI dentro de la app.";
};