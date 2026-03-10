const app = document.getElementById("app");

/* ===== INTERFAZ ===== */

app.innerHTML = `
<div style="padding:20px;font-family:Arial;max-width:760px">

<h2>🏡 ReformAssistant</h2>
<p>Encuentra y solicita subvenciones para tu reforma</p>

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
porcentaje:0.6,
organismo:"IDAE"
},

{
nombre:"Subvención aerotermia Next Generation",
tipo:"aerotermia",
porcentaje:0.5,
organismo:"Xunta de Galicia"
},

{
nombre:"Ayudas autoconsumo fotovoltaico",
tipo:"fotovoltaica",
porcentaje:0.45,
organismo:"IDAE"
},

{
nombre:"Subvención aislamiento vivienda",
tipo:"aislamiento",
porcentaje:0.4,
organismo:"Xunta"
},

{
nombre:"Ayuda cambio ventanas eficiencia",
tipo:"ventanas",
porcentaje:0.35,
organismo:"Xunta"

}

];


/* ===== LOGIN ===== */

document.getElementById("login").onclick = () => {

const pin = document.getElementById("pin").value;

if(pin === PIN){

document.getElementById("msg").innerHTML = "✅ Acceso correcto";
document.getElementById("panel").style.display = "block";

}else{

document.getElementById("msg").innerHTML = "❌ PIN incorrecto";

}

};



/* ===== BUSCAR AYUDAS ===== */

document.getElementById("ayudas").onclick = () => {

document.getElementById("out").innerHTML = `

<h3>🏛️ Buscador de subvenciones</h3>

<p>Tipo de reforma</p>

<select id="tipo">

<option value="aerotermia">Aerotermia</option>
<option value="fotovoltaica">Fotovoltaica</option>
<option value="rehabilitacion">Rehabilitación energética</option>
<option value="ventanas">Cambio de ventanas</option>
<option value="aislamiento">Aislamiento</option>

</select>

<p>Coste estimado (€)</p>

<input id="coste" type="number" placeholder="30000">

<br><br>

<button id="buscar">Buscar ayudas</button>

<div id="resultado"></div>

`;

document.getElementById("buscar").onclick = () => {

const tipo = document.getElementById("tipo").value;
const coste = Number(document.getElementById("coste").value);

let ayudas = ayudasDB.filter(a => a.tipo === tipo);

let html = "<h4>💰 Ayudas encontradas</h4>";

if(ayudas.length === 0){

html += "No se encontraron ayudas.";

}else{

ayudas.forEach(a => {

const ayuda = Math.round(coste * a.porcentaje);

html += `

<p><b>${a.nombre}</b></p>

<p>Organismo: ${a.organismo}</p>

<p>Ayuda estimada: <b style="color:green">${ayuda} €</b></p>

<hr>

`;

});

}

html += `
<button id="solicitar">📄 Crear solicitud</button>
<div id="solicitud"></div>
`;

document.getElementById("resultado").innerHTML = html;


/* ===== SOLICITUD ===== */

document.getElementById("solicitar").onclick = () => {

document.getElementById("solicitud").innerHTML = `

<h3>📄 Solicitud de subvención</h3>

<input id="nombre" placeholder="Nombre completo"><br><br>

<input id="dni" placeholder="DNI"><br><br>

<input id="direccion" placeholder="Dirección vivienda"><br><br>

<button id="generar">Generar solicitud</button>

<div id="doc"></div>

`;

document.getElementById("generar").onclick = () => {

const nombre = document.getElementById("nombre").value;
const dni = document.getElementById("dni").value;
const direccion = document.getElementById("direccion").value;

document.getElementById("doc").innerHTML = `

<h4>Solicitud generada</h4>

<p><b>Solicitante:</b> ${nombre}</p>

<p><b>DNI:</b> ${dni}</p>

<p><b>Dirección:</b> ${direccion}</p>

<hr>

<a target="_blank" href="https://sede.xunta.gal">
Presentar solicitud en sede electrónica
</a>

`;

};

};

};

};



/* ===== DOCUMENTOS ===== */

document.getElementById("docs").onclick = () => {

document.getElementById("out").innerHTML = `

<h3>📂 Gestor de documentos</h3>

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

const fecha = new Date().toLocaleDateString();

localStorage.setItem("ultimaRevision", fecha);

document.getElementById("out").innerHTML = `

<h3>🔔 Alertas de subvenciones</h3>

<p>Última revisión: ${fecha}</p>

<p>Revisa periódicamente:</p>

<ul>

<li><a target="_blank" href="https://www.subvenciones.gob.es/">Subvenciones España</a></li>

<li><a target="_blank" href="https://www.xunta.gal/axudas">Xunta Galicia</a></li>

<li><a target="_blank" href="https://www.idae.es/">IDAE</a></li>

<li><a target="_blank" href="https://www.boe.es/">BOE</a></li>

</ul>

`;

};



/* ===== IA ===== */

document.getElementById("chat").onclick = () => {

document.getElementById("out").innerHTML = `

<h3>🤖 Asistente IA</h3>

<p>En futuras versiones podrás preguntar:</p>

<ul>

<li>Qué ayudas puedo solicitar</li>
<li>Cómo preparar la documentación</li>
<li>Cómo maximizar subvenciones</li>

</ul>

`;

};