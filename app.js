const app = document.getElementById("app");

/* ===== INTERFAZ ===== */

app.innerHTML = `
<div style="padding:20px;font-family:Arial;max-width:800px">

<h2>🏡 ReformAssistant</h2>
<p>Gestor inteligente de subvenciones para reformas</p>

<hr>

<h3>🔐 Acceso</h3>

<input id="pin" type="password" placeholder="Introduce PIN">
<button id="login">Entrar</button>

<p id="msg"></p>

<div id="panel" style="display:none;margin-top:20px">

<h3>📊 Panel</h3>

<button id="ayudas">🏛️ Buscar ayudas</button>
<button id="docs">📂 Documentos</button>
<button id="alertas">🔔 Alertas</button>
<button id="chat">🤖 Asistente IA</button>

<div id="out" style="margin-top:25px"></div>

</div>

</div>
`;

const PIN = "080874";


/* ===== BASE DE AYUDAS ===== */

const ayudasDB = [

{
nombre:"Programa PREE rehabilitación energética",
tipo:"rehabilitacion",
zona:"todas",
porcentaje:0.6,
organismo:"IDAE",
link:"https://www.idae.es/ayudas-y-financiacion"
},

{
nombre:"Aerotermia Galicia",
tipo:"aerotermia",
zona:"galicia",
porcentaje:0.5,
organismo:"Xunta",
link:"https://sede.xunta.gal"
},

{
nombre:"Autoconsumo fotovoltaico",
tipo:"fotovoltaica",
zona:"todas",
porcentaje:0.45,
organismo:"IDAE",
link:"https://www.idae.es/ayudas-y-financiacion"
}

];


/* ===== DETECTAR ZONA ===== */

function detectarZona(cp){

const prefijo = cp.substring(0,2);

const mapa = {

"15":"galicia",
"27":"galicia",
"32":"galicia",
"36":"galicia",

"28":"madrid",
"08":"cataluna"

};

return mapa[prefijo] || "otras";

}



/* ===== LOGIN ===== */

document.getElementById("login").onclick = () => {

const pin = document.getElementById("pin").value;

if(pin === PIN){

document.getElementById("msg").innerHTML="✅ Acceso correcto";
document.getElementById("panel").style.display="block";

}else{

document.getElementById("msg").innerHTML="❌ PIN incorrecto";

}

};



/* ===== BUSCAR AYUDAS ===== */

document.getElementById("ayudas").onclick = () => {

document.getElementById("out").innerHTML = `

<h3>🏛️ Buscar subvenciones</h3>

<p>Código postal</p>

<input id="cp" placeholder="Ej: 15401">

<p>Tipo reforma</p>

<select id="tipo">

<option value="aerotermia">Aerotermia</option>
<option value="fotovoltaica">Fotovoltaica</option>
<option value="rehabilitacion">Rehabilitación energética</option>

</select>

<p>Coste obra (€)</p>

<input id="coste" type="number" placeholder="30000">

<br><br>

<button id="buscar">Buscar ayudas</button>

<div id="resultado"></div>

`;

document.getElementById("buscar").onclick = () => {

const cp = document.getElementById("cp").value;
const tipo = document.getElementById("tipo").value;
const coste = Number(document.getElementById("coste").value);

const zona = detectarZona(cp);

let ayudas = ayudasDB.filter(a =>
a.tipo === tipo &&
(a.zona === "todas" || a.zona === zona)
);

let html = `<h4>📍 Zona detectada: ${zona}</h4>`;

if(ayudas.length === 0){

html += "No se encontraron ayudas.";

}else{

ayudas.forEach(a => {

const ayuda = Math.round(coste * a.porcentaje);

html += `

<div style="border:1px solid #ccc;padding:10px;margin-top:10px">

<p><b>${a.nombre}</b></p>

<p>Organismo: ${a.organismo}</p>

<p>Subvención estimada: <b style="color:green">${ayuda} €</b></p>

<button class="solicitar"
data-nombre="${a.nombre}"
data-link="${a.link}"
data-ayuda="${ayuda}">
Solicitar ayuda
</button>

</div>

`;

});

}

document.getElementById("resultado").innerHTML = html;


/* ===== SOLICITAR ===== */

document.querySelectorAll(".solicitar").forEach(btn => {

btn.onclick = () => {

const programa = btn.dataset.nombre;
const ayuda = btn.dataset.ayuda;
const link = btn.dataset.link;

document.getElementById("resultado").innerHTML += `

<div style="margin-top:20px;border:2px solid #4CAF50;padding:15px">

<h3>📄 Preparar expediente</h3>

<p>Programa: ${programa}</p>

<p>Ayuda estimada: ${ayuda} €</p>

<p>Introduce datos del solicitante</p>

<input id="nombre" placeholder="Nombre completo"><br><br>

<input id="dni" placeholder="DNI"><br><br>

<input id="direccion" placeholder="Dirección vivienda"><br><br>

<button id="generarExpediente">Generar expediente</button>

<div id="expediente"></div>

</div>

`;

document.getElementById("generarExpediente").onclick = () => {

const nombre = document.getElementById("nombre").value;
const dni = document.getElementById("dni").value;
const direccion = document.getElementById("direccion").value;

document.getElementById("expediente").innerHTML = `

<h4>Expediente preparado</h4>

<p><b>Solicitante:</b> ${nombre}</p>

<p><b>DNI:</b> ${dni}</p>

<p><b>Dirección:</b> ${direccion}</p>

<p><b>Programa:</b> ${programa}</p>

<p><b>Subvención estimada:</b> ${ayuda} €</p>

<hr>

<a href="${link}" target="_blank">
👉 Abrir formulario oficial de solicitud
</a>

`;

};

};

});

};

};



/* ===== DOCUMENTOS ===== */

document.getElementById("docs").onclick = () => {

document.getElementById("out").innerHTML = `

<h3>📂 Documentos</h3>

<input type="file" id="fileInput" multiple>

<ul id="fileList"></ul>

`;

const input = document.getElementById("fileInput");
const list = document.getElementById("fileList");

input.onchange = () => {

list.innerHTML = "";

for(const file of input.files){

const li = document.createElement("li");
li.textContent = "📄 " + file.name;
list.appendChild(li);

}

};

};



/* ===== ALERTAS ===== */

document.getElementById("alertas").onclick = () => {

document.getElementById("out").innerHTML = `

<h3>🔔 Alertas</h3>

<ul>

<li><a target="_blank" href="https://www.subvenciones.gob.es/">Subvenciones España</a></li>

<li><a target="_blank" href="https://www.xunta.gal/axudas">Xunta Galicia</a></li>

<li><a target="_blank" href="https://www.idae.es/">IDAE</a></li>

</ul>

`;

};



/* ===== IA ===== */

document.getElementById("chat").onclick = () => {

document.getElementById("out").innerHTML = `

<h3>🤖 Asistente IA</h3>

<p>Próximamente podrás:</p>

<ul>

<li>Encontrar ayudas automáticamente</li>
<li>Preparar expedientes</li>
<li>Calcular subvenciones</li>

</ul>

`;

};
