// Horarios — agregar y eliminar bloques

var contadorHorarios = 0;

function crearBloqueHorario() {
  contadorHorarios++;
  var id = contadorHorarios;

  var bloque = document.createElement("div");
  bloque.classList.add("horario-bloque");
  bloque.id = "horario-" + id;

  bloque.innerHTML =
    "<div class='campo'>" +
      "<label for='dia-" + id + "'>Día</label>" +
      "<select id='dia-" + id + "' name='dia-" + id + "'>" +
        "<option value=''>— Seleccione —</option>" +
        "<option value='lunes'>Lunes</option>" +
        "<option value='martes'>Martes</option>" +
        "<option value='miercoles'>Miércoles</option>" +
        "<option value='jueves'>Jueves</option>" +
        "<option value='viernes'>Viernes</option>" +
        "<option value='sabado'>Sábado</option>" +
        "<option value='domingo'>Domingo</option>" +
      "</select>" +
    "</div>" +
    "<div class='campo'>" +
      "<label for='inicio-" + id + "'>Hora de inicio</label>" +
      "<input type='time' id='inicio-" + id + "' name='inicio-" + id + "'>" +
    "</div>" +
    "<div class='campo'>" +
      "<label for='fin-" + id + "'>Hora de término</label>" +
      "<input type='time' id='fin-" + id + "' name='fin-" + id + "'>" +
    "</div>" +
    "<button type='button' class='btn btn-peligro' onclick='eliminarHorario(" + id + ")'>Eliminar</button>";

  document.getElementById("lista-horarios").appendChild(bloque);
}

function eliminarHorario(id) {
  var bloque = document.getElementById("horario-" + id);
  bloque.remove();
}

document.getElementById("btn-agregar-horario").addEventListener("click", crearBloqueHorario);

crearBloqueHorario();

// Funciones de validación

function mostrarError(idError, mensaje) {
  document.getElementById(idError).textContent = mensaje;
}

function limpiarError(idError) {
  document.getElementById(idError).textContent = "";
}

function validarUrl(url) {
  return url.indexOf("http://") === 0 || url.indexOf("https://") === 0;
}

function validarHorarios() {
  var listaHorarios = document.getElementById("lista-horarios");
  var bloques = listaHorarios.getElementsByClassName("horario-bloque");

  if (bloques.length === 0) {
    return false;
  }

  for (var i = 0; i < bloques.length; i++) {
    var bloque = bloques[i];
    var dia    = bloque.getElementsByTagName("select")[0].value;
    var inicio = bloque.getElementsByTagName("input")[0].value;
    var fin    = bloque.getElementsByTagName("input")[1].value;

    if (dia === "" || inicio === "" || fin === "") {
      return false;
    }
    if (fin <= inicio) {
      return false;
    }
  }

  return true;
}

// Validación al enviar el formulario

document.getElementById("form-actividad").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var formularioValido = true;

  var nombre = document.getElementById("nombre-actividad").value.trim();
  if (nombre === "") {
    mostrarError("error-nombre-actividad", "El nombre de la actividad es obligatorio.");
    formularioValido = false;
  } else if (nombre.length > 100) {
    mostrarError("error-nombre-actividad", "El nombre no puede superar los 100 caracteres.");
    formularioValido = false;
  } else {
    limpiarError("error-nombre-actividad");
  }

  var tipo = document.getElementById("tipo-actividad").value;
  if (tipo === "") {
    mostrarError("error-tipo-actividad", "Debe seleccionar un tipo de actividad.");
    formularioValido = false;
  } else {
    limpiarError("error-tipo-actividad");
  }

  var descripcion = document.getElementById("descripcion").value.trim();
  if (descripcion === "") {
    mostrarError("error-descripcion", "La descripción es obligatoria.");
    formularioValido = false;
  } else if (descripcion.length < 20) {
    mostrarError("error-descripcion", "La descripción debe tener al menos 20 caracteres.");
    formularioValido = false;
  } else {
    limpiarError("error-descripcion");
  }

  var miembro = document.getElementById("miembro").value.trim();
  if (miembro === "") {
    mostrarError("error-miembro", "El RUT del miembro responsable es obligatorio.");
    formularioValido = false;
  } else {
    limpiarError("error-miembro");
  }

  if (!validarHorarios()) {
    var listaHorarios = document.getElementById("lista-horarios");
    var bloques = listaHorarios.getElementsByClassName("horario-bloque");
    if (bloques.length === 0) {
      mostrarError("error-horarios", "Debe agregar al menos un horario.");
    } else {
      mostrarError("error-horarios", "Complete todos los campos. La hora de término debe ser posterior a la de inicio.");
    }
    formularioValido = false;
  } else {
    limpiarError("error-horarios");
  }

  var archivos = document.getElementById("archivos").files;
  var tiposPermitidos = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml",
                         "video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/avi"];
  if (archivos.length === 0) {
    mostrarError("error-archivos", "Debe adjuntar al menos un archivo de foto o video.");
    formularioValido = false;
  } else {
    var archivoInvalido = false;
    for (var i = 0; i < archivos.length; i++) {
      if (tiposPermitidos.indexOf(archivos[i].type) === -1) {
        archivoInvalido = true;
        break;
      }
    }
    if (archivoInvalido) {
      mostrarError("error-archivos", "Solo se permiten archivos de imagen (JPG, PNG, GIF, WEBP) o video (MP4, WEBM, OGG, MOV, AVI).");
      formularioValido = false;
    } else {
      limpiarError("error-archivos");
    }
  }

  var enlace = document.getElementById("enlace").value.trim();
  if (enlace === "") {
    mostrarError("error-enlace", "El enlace es obligatorio.");
    formularioValido = false;
  } else if (!validarUrl(enlace)) {
    mostrarError("error-enlace", "Ingrese una URL válida (debe comenzar con http:// o https://).");
    formularioValido = false;
  } else {
    limpiarError("error-enlace");
  }

  if (formularioValido) {
    alert("Actividad registrada exitosamente.");
    evento.target.reset();
    document.getElementById("lista-horarios").innerHTML = "";
    document.getElementById("preview-archivos").innerHTML = "";
    contadorHorarios = 0;
    crearBloqueHorario();
  }
});
