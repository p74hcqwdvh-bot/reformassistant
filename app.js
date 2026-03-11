const app = document.getElementById("app");

/* ===== INTERFAZ ===== */

app.innerHTML = `
<div style="padding:20px;font-family:Arial;max-width:780px">

<h2>🏡 ReformAssistant</h2>
<p>Encuentra subvenciones para tu vivienda</p>

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
<button id="chat">🤖 IA</button>

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
nombre:"Ayuda aerotermia Galicia",
tipo:"aerotermia",
zona:"galicia",
porcentaje:0.5,
organismo:"Xunta de Galicia",
link:"https://sede.xunta.gal"
},

{
nombre:"Autoconsumo fotovoltaico",
tipo:"fotovoltaica",
zona:"todas",
porcentaje:0.45,
organismo:"IDAE",
link:"https://www.idae.es/ayudas-y-financiacion"
},

{
nombre:"Rehabilitación zona rural",
tipo:"rehabilitacion",
zona:"rural",
porcentaje:0.7,
organismo:"Programa Rural",
link:"https://www.subvenciones.gob.es/"
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

<p>Código postal vivienda</p>

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

<p><b>${a.nombre}</b></p>

<p>Organismo: ${a.organismo}</p>

<p>Ayuda estimada: <b style="color:green">${ayuda} €</b></p>

<button class="solicitar"
data-link="${a.link}"
data-nombre="${a.nombre}">
📄 Solicitar ayuda
</button>

<hr>

`;

});

}

document.getElementById("resultado").innerHTML = html;


/* ===== BOTÓN SOLICITAR ===== */

document.querySelectorAll(".solicitar").forEach(btn=>{

btn.onclick = () => {

const link = btn.dataset.link;
const nombre = btn.dataset.nombre;

document.getElementById("resultado").innerHTML += `

<div style="padding:10px;border:1px solid #ccc;margin-top:10px">

<h4>Solicitud preparada</h4>

<p>Programa: ${nombre}</p>

<a href="${link}" target="_blank">
👉 Ir a la solicitud oficial
</a>

</div>

`;

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

<h3>🔔 Alertas de ayudas</h3>

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

<p>Próximamente podrás preguntar:</p>

<ul>

<li>Qué ayudas puedo solicitar</li>
<li>Cómo preparar la solicitud</li>

</ul>

`;

};