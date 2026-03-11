const app = document.getElementById("app");

/* ===== BASE USUARIOS ===== */

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};


/* ===== GENERAR CONTRASEÑA ===== */

function generarPassword(){

const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
let pass = "";

for(let i=0;i<8;i++){

pass += chars[Math.floor(Math.random()*chars.length)];

}

return pass;

}


/* ===== INTERFAZ ===== */

app.innerHTML = `

<div style="padding:20px;font-family:Arial;max-width:820px">

<h2>🏡 ReformAssistant</h2>

<p>Gestor inteligente de subvenciones</p>

<hr>

<h3>Acceso</h3>

<input id="usuario" placeholder="Usuario o email">

<input id="password" type="password" placeholder="Contraseña">

<br><br>

<button id="login">Entrar</button>

<button id="registro">Crear usuario</button>

<button id="recuperar">Recuperar contraseña</button>

<p id="msg"></p>

<div id="panel" style="display:none;margin-top:20px">

<h3>Panel</h3>

<button id="ayudas">Buscar ayudas</button>

<button id="historial">Mis búsquedas</button>

<button id="docs">Documentos</button>

<button id="logout">Salir</button>

<div id="out" style="margin-top:20px"></div>

</div>

</div>

`;


/* ===== REGISTRO ===== */

document.getElementById("registro").onclick = () => {

const user = document.getElementById("usuario").value;

if(!user){

alert("Introduce un usuario");

return;

}

if(usuarios[user]){

alert("Usuario ya existe");

return;

}

const pass = generarPassword();

usuarios[user] = {

password: pass,

busquedas: [],

documentos: []

};

localStorage.setItem("usuarios", JSON.stringify(usuarios));

document.getElementById("msg").innerHTML =
"Usuario creado. Tu contraseña es: <b>"+pass+"</b>";

};


/* ===== LOGIN ===== */

let usuarioActual = null;

document.getElementById("login").onclick = () => {

const user = document.getElementById("usuario").value;
const pass = document.getElementById("password").value;

if(!usuarios[user]){

alert("Usuario no existe");

return;

}

if(usuarios[user].password !== pass){

alert("Contraseña incorrecta");

return;

}

usuarioActual = user;

document.getElementById("msg").innerHTML="Bienvenido "+user;

document.getElementById("panel").style.display="block";

};


/* ===== RECUPERAR CONTRASEÑA ===== */

document.getElementById("recuperar").onclick = () => {

const user = document.getElementById("usuario").value;

if(!usuarios[user]){

alert("Usuario no encontrado");

return;

}

const nueva = generarPassword();

usuarios[user].password = nueva;

localStorage.setItem("usuarios", JSON.stringify(usuarios));

alert("Nueva contraseña: "+nueva);

};


/* ===== LOGOUT ===== */

document.getElementById("logout").onclick = () => {

usuarioActual = null;

document.getElementById("panel").style.display="none";

};


/* ===== BASE AYUDAS ===== */

const ayudasDB = [

{
nombre:"Programa PREE rehabilitación energética",
tipo:"rehabilitacion",
zona:"todas",
porcentaje:0.4,
link:"https://www.idae.es/ayudas-y-financiacion"
},

{
nombre:"Aerotermia Galicia",
tipo:"aerotermia",
zona:"galicia",
porcentaje:0.5,
link:"https://sede.xunta.gal"
},

{
nombre:"Autoconsumo fotovoltaico",
tipo:"fotovoltaica",
zona:"todas",
porcentaje:0.45,
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
"36":"galicia"

};

return mapa[prefijo] || "otras";

}


/* ===== BUSCAR AYUDAS ===== */

document.getElementById("ayudas").onclick = () => {

document.getElementById("out").innerHTML = `

<h3>Buscar subvenciones</h3>

<input id="cp" placeholder="Código postal">

<select id="tipo">

<option value="rehabilitacion">Rehabilitación</option>

<option value="aerotermia">Aerotermia</option>

<option value="fotovoltaica">Fotovoltaica</option>

</select>

<input id="coste" placeholder="Coste obra">

<br><br>

<button id="buscar">Buscar</button>

<div id="resultado"></div>

`;

document.getElementById("buscar").onclick = () => {

const cp = document.getElementById("cp").value;
const tipo = document.getElementById("tipo").value;
const coste = Number(document.getElementById("coste").value);

const zona = detectarZona(cp);

let ayudas = ayudasDB.filter(a =>
(a.zona==="todas" || a.zona===zona) &&
a.tipo===tipo
);

let html = "";

ayudas.forEach(a=>{

const ayuda = Math.round(coste * a.porcentaje);

html += `

<div style="border:1px solid #ccc;padding:10px;margin-top:10px">

<p><b>${a.nombre}</b></p>

<p>Ayuda estimada: ${ayuda} €</p>

<a href="${a.link}" target="_blank">Solicitar ayuda</a>

</div>

`;

});

document.getElementById("resultado").innerHTML = html;


/* GUARDAR BUSQUEDA */

usuarios[usuarioActual].busquedas.push({

cp,
tipo,
coste,
fecha:new Date().toLocaleDateString()

});

localStorage.setItem("usuarios", JSON.stringify(usuarios));

};

};


/* ===== HISTORIAL ===== */

document.getElementById("historial").onclick = () => {

const hist = usuarios[usuarioActual].busquedas;

let html = "<h3>Historial</h3>";

hist.forEach(h=>{

html += `

<p>

CP: ${h.cp} |
Tipo: ${h.tipo} |
Coste: ${h.coste}

</p>

`;

});

document.getElementById("out").innerHTML = html;

};


/* ===== DOCUMENTOS ===== */

document.getElementById("docs").onclick = () => {

document.getElementById("out").innerHTML = `

<h3>Documentos</h3>

<input type="file" id="fileInput">

<ul id="files"></ul>

`;

const input = document.getElementById("fileInput");

input.onchange = () => {

const file = input.files[0];

usuarios[usuarioActual].documentos.push(file.name);

localStorage.setItem("usuarios", JSON.stringify(usuarios));

mostrarDocs();

};

mostrarDocs();

};


function mostrarDocs(){

const docs = usuarios[usuarioActual].documentos;

const list = document.getElementById("files");

list.innerHTML="";

docs.forEach(d=>{

const li=document.createElement("li");

li.textContent=d;

list.appendChild(li);

});

}