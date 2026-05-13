var selectTipo = document.getElementById("tipo");
var fieldsetsTipo = {
  "pregrado": "campos-pregrado",
  "postgrado": "campos-postgrado",
  "funcionario": "campos-funcionario",
  "academico": "campos-academico"
};

selectTipo.addEventListener("change", function () {
  Object.values(fieldsetsTipo).forEach(function (id) {
    document.getElementById(id).classList.add("oculto");
  });
  var id = fieldsetsTipo[selectTipo.value];
  if (id) {
    document.getElementById(id).classList.remove("oculto");
  }
});

var listaHorarios = document.getElementById("lista-horarios");

function crearBloqueHorario(diaVal, inicioVal, finVal) {
  diaVal = diaVal || "";
  inicioVal = inicioVal || "";
  finVal = finVal || "";

  var bloque = document.createElement("div");
  bloque.className = "horario-bloque";
  bloque.innerHTML =
    "<div class='campo'>" +
      "<label>Día</label>" +
      "<select name='horario_dia[]'>" +
        "<option value=''>Seleccione</option>" +
        "<option value='lunes'>Lunes</option>" +
        "<option value='martes'>Martes</option>" +
        "<option value='miércoles'>Miércoles</option>" +
        "<option value='jueves'>Jueves</option>" +
        "<option value='viernes'>Viernes</option>" +
        "<option value='sábado'>Sábado</option>" +
        "<option value='domingo'>Domingo</option>" +
      "</select>" +
    "</div>" +
    "<div class='campo'>" +
      "<label>Hora de inicio</label>" +
      "<input type='time' name='horario_inicio[]'>" +
    "</div>" +
    "<div class='campo'>" +
      "<label>Hora de término</label>" +
      "<input type='time' name='horario_fin[]'>" +
    "</div>" +
    "<button type='button' class='btn btn-peligro' " +
      "onclick='this.closest(\".horario-bloque\").remove()'>Eliminar</button>";

  listaHorarios.appendChild(bloque);

  if (diaVal) {
    bloque.querySelector("select").value = diaVal;
  }
  var inputs = bloque.querySelectorAll("input[type='time']");
  if (inicioVal) { inputs[0].value = inicioVal; }
  if (finVal) { inputs[1].value = finVal; }
}

function inicializarHorarios(lista) {
  if (lista && lista.length > 0) {
    lista.forEach(function (h) {
      crearBloqueHorario(h[0], h[1], h[2]);
    });
  } else {
    crearBloqueHorario();
  }
}

document.getElementById("btn-agregar-horario").addEventListener("click", function () {
  crearBloqueHorario();
});

function mostrarError(idError, mensaje) {
  var el = document.getElementById(idError);
  if (el) { el.textContent = mensaje; }
}

function limpiarError(idError) {
  var el = document.getElementById(idError);
  if (el) { el.textContent = ""; }
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefono(tel) {
  return /^\+569\d{8}$/.test(tel);
}

document.getElementById("form-registro").addEventListener("submit", function (evento) {
  var ok = true;

  var rut = document.getElementById("rut").value.trim();
  if (!rut) { mostrarError("error-rut", "Falta el RUT"); ok = false; }
  else { limpiarError("error-rut"); }

  var nombre = document.getElementById("nombre").value.trim();
  if (!nombre) { mostrarError("error-nombre", "Ingresa tu nombre"); ok = false; }
  else { limpiarError("error-nombre"); }

  var email = document.getElementById("email").value.trim();
  if (!email) { mostrarError("error-email", "Falta el correo"); ok = false; }
  else if (!validarEmail(email)) { mostrarError("error-email", "Correo inválido"); ok = false; }
  else { limpiarError("error-email"); }

  var tel = document.getElementById("telefono").value.trim();
  if (tel && !validarTelefono(tel)) {
    mostrarError("error-telefono", "Formato: +56912345678"); ok = false;
  } else { limpiarError("error-telefono"); }

  var tipo = document.getElementById("tipo").value;
  if (!tipo) { mostrarError("error-tipo", "Selecciona un tipo"); ok = false; }
  else { limpiarError("error-tipo"); }

  if (tipo === "pregrado") {
    var carrera = document.getElementById("carrera").value.trim();
    if (!carrera) { mostrarError("error-carrera", "Falta la carrera"); ok = false; }
    else { limpiarError("error-carrera"); }
    var anio = parseInt(document.getElementById("anio-ingreso").value.trim(), 10);
    if (!anio) { mostrarError("error-anio-ingreso", "Falta año de ingreso"); ok = false; }
    else if (anio < 2000 || anio > new Date().getFullYear()) {
      mostrarError("error-anio-ingreso", "Año entre 2000 y " + new Date().getFullYear()); ok = false;
    }
    else { limpiarError("error-anio-ingreso"); }
  }

  if (tipo === "postgrado") {
    var prog = document.getElementById("programa").value;
    if (!prog) { mostrarError("error-programa", "Selecciona programa"); ok = false; }
    else { limpiarError("error-programa"); }
  }

  if (tipo === "funcionario") {
    var area = document.getElementById("area").value.trim();
    if (!area) { mostrarError("error-area", "Falta el área"); ok = false; }
    else { limpiarError("error-area"); }
    var cargo = document.getElementById("cargo").value.trim();
    if (!cargo) { mostrarError("error-cargo", "Falta el cargo"); ok = false; }
    else { limpiarError("error-cargo"); }
  }

  if (tipo === "academico") {
    var jer = document.getElementById("jerarquia").value;
    if (!jer) { mostrarError("error-jerarquia", "Selecciona la jerarquía"); ok = false; }
    else { limpiarError("error-jerarquia"); }
    var dep = document.getElementById("departamento").value.trim();
    if (!dep) { mostrarError("error-departamento", "Falta el departamento"); ok = false; }
    else { limpiarError("error-departamento"); }
  }

  var comunaId = document.getElementById("comuna_id").value;
  if (!comunaId) { mostrarError("error-comuna", "Selecciona una comuna"); ok = false; }
  else { limpiarError("error-comuna"); }

  var nombreAct = document.getElementById("nombre-actividad").value.trim();
  if (!nombreAct) { mostrarError("error-nombre-actividad", "Falta el nombre de la actividad"); ok = false; }
  else if (nombreAct.length > 100) { mostrarError("error-nombre-actividad", "Máximo 100 caracteres"); ok = false; }
  else { limpiarError("error-nombre-actividad"); }

  var tipoAct = document.getElementById("tipo-actividad").value;
  if (!tipoAct) { mostrarError("error-tipo-actividad", "Selecciona el tipo de actividad"); ok = false; }
  else { limpiarError("error-tipo-actividad"); }

  var desc = document.getElementById("descripcion").value.trim();
  if (!desc) { mostrarError("error-descripcion", "Falta la descripción"); ok = false; }
  else if (desc.length < 20) { mostrarError("error-descripcion", "Mínimo 20 caracteres"); ok = false; }
  else { limpiarError("error-descripcion"); }

  var enlace = document.getElementById("enlace").value.trim();
  if (!enlace) { mostrarError("error-enlace", "Falta el enlace"); ok = false; }
  else if (!/^https?:\/\//.test(enlace)) { mostrarError("error-enlace", "URL debe empezar con http:// o https://"); ok = false; }
  else { limpiarError("error-enlace"); }

  var bloques = listaHorarios.getElementsByClassName("horario-bloque");
  if (bloques.length === 0) {
    mostrarError("error-horarios", "Agrega al menos un horario"); ok = false;
  } else {
    var horOk = true;
    for (var i = 0; i < bloques.length; i++) {
      var sel = bloques[i].querySelector("select");
      var inputs = bloques[i].querySelectorAll("input[type='time']");
      if (!sel.value || !inputs[0].value || !inputs[1].value) { horOk = false; break; }
      if (inputs[1].value <= inputs[0].value) { horOk = false; break; }
    }
    if (!horOk) {
      mostrarError("error-horarios", "Revisa los horarios: hora fin debe ser mayor que inicio"); ok = false;
    } else { limpiarError("error-horarios"); }
  }

  var archivos = document.getElementById("archivos").files;
  var extPermitidas = ["jpg", "jpeg", "png", "gif", "webp", "svg", "mp4", "webm", "ogg", "mov", "avi"];
  if (archivos.length === 0) {
    mostrarError("error-archivos", "Adjunta al menos un archivo"); ok = false;
  } else {
    var archOk = true;
    for (var j = 0; j < archivos.length; j++) {
      var partes = archivos[j].name.split(".");
      if (partes.length < 2 || extPermitidas.indexOf(partes[partes.length - 1].toLowerCase()) === -1) {
        archOk = false; break;
      }
    }
    if (!archOk) {
      mostrarError("error-archivos", "Solo imágenes (jpg, png, gif, webp) o videos (mp4, webm, ogg, mov, avi)"); ok = false;
    } else { limpiarError("error-archivos"); }
  }

  if (!ok) {
    evento.preventDefault();
  }
});
