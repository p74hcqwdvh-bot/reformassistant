const app = document.getElementById("app");

app.innerHTML = `
  <div style="padding:12px">
    <h2>✅ app.js cargado</h2>
    <button id="btn">Probar botón</button>
    <p id="out"></p>
  </div>
`;

document.getElementById("btn").addEventListener("click", () => {
  document.getElementById("out").textContent =
    "Botón OK: " + new Date().toLocaleString();
});
