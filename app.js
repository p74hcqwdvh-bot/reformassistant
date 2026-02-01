Este es un “starter” simple para comprobar que todo carga bien. Luego metemos la versión completa con PIN + docs + ayudas + OpenAI.

// ReformAssistant - starter
const app = document.getElementById("app");

app.innerHTML = `
  <div style="padding:12px">
    <h2>✅ app.js cargado</h2>
    <p>Si ves esto, ya tenemos index.html + manifest.json + app.js funcionando.</p>
    <button id="btn">Probar botón</button>
    <p id="out" style="opacity:.85"></p>
  </div>
`;

document.getElementById("btn").addEventListener("click", () => {
  document.getElementById("out").textContent = "Botón OK: " + new Date().toLocaleString();
});
