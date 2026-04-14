// Mostrar/ocultar campos según tipo de miembro

var selectTipo = document.getElementById("tipo");

selectTipo.addEventListener("change", function () {
  document.getElementById("campos-pregrado").classList.add("oculto");
  document.getElementById("campos-postgrado").classList.add("oculto");
  document.getElementById("campos-funcionario").classList.add("oculto");
  document.getElementById("campos-academico").classList.add("oculto");

  var tipo = selectTipo.value;
  if (tipo === "pregrado") {
    document.getElementById("campos-pregrado").classList.remove("oculto");
  } else if (tipo === "postgrado") {
    document.getElementById("campos-postgrado").classList.remove("oculto");
  } else if (tipo === "funcionario") {
    document.getElementById("campos-funcionario").classList.remove("oculto");
  } else if (tipo === "academico") {
    document.getElementById("campos-academico").classList.remove("oculto");
  }
});

// Funciones de validación

function mostrarError(idError, mensaje) {
  document.getElementById(idError).textContent = mensaje;
}

function limpiarError(idError) {
  document.getElementById(idError).textContent = "";
}

function validarEmail(email) {
  return email.indexOf("@") !== -1 && email.indexOf(".") !== -1;
}

function validarTelefono(telefono) {
  return telefono.length === 12 && telefono.indexOf("+56") === 0;
}

function validarAnio(anio) {
  var num = parseInt(anio);
  return num >= 2000 && num <= 2025;
}

// Validación al enviar el formulario

document.getElementById("form-registro").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var formularioValido = true;

  var rut = document.getElementById("rut").value.trim();
  if (rut === "") {
    mostrarError("error-rut", "El RUT es obligatorio.");
    formularioValido = false;
  } else {
    limpiarError("error-rut");
  }

  var nombre = document.getElementById("nombre").value.trim();
  if (nombre === "") {
    mostrarError("error-nombre", "El nombre es obligatorio.");
    formularioValido = false;
  } else {
    limpiarError("error-nombre");
  }

  var email = document.getElementById("email").value.trim();
  if (email === "") {
    mostrarError("error-email", "El correo electrónico es obligatorio.");
    formularioValido = false;
  } else if (!validarEmail(email)) {
    mostrarError("error-email", "Ingrese un correo electrónico válido.");
    formularioValido = false;
  } else {
    limpiarError("error-email");
  }

  var telefono = document.getElementById("telefono").value.trim();
  if (telefono !== "" && !validarTelefono(telefono)) {
    mostrarError("error-telefono", "El teléfono debe tener el formato +56912345678.");
    formularioValido = false;
  } else {
    limpiarError("error-telefono");
  }

  var tipo = document.getElementById("tipo").value;
  if (tipo === "") {
    mostrarError("error-tipo", "Debe seleccionar un tipo de miembro.");
    formularioValido = false;
  } else {
    limpiarError("error-tipo");
  }

  if (tipo === "pregrado") {
    var carrera = document.getElementById("carrera").value.trim();
    if (carrera === "") {
      mostrarError("error-carrera", "La carrera es obligatoria.");
      formularioValido = false;
    } else {
      limpiarError("error-carrera");
    }

    var anio = document.getElementById("anio-ingreso").value.trim();
    if (anio === "") {
      mostrarError("error-anio-ingreso", "El año de ingreso es obligatorio.");
      formularioValido = false;
    } else if (!validarAnio(anio)) {
      mostrarError("error-anio-ingreso", "Ingrese un año válido entre 2000 y 2025.");
      formularioValido = false;
    } else {
      limpiarError("error-anio-ingreso");
    }
  }

  if (tipo === "postgrado") {
    var programa = document.getElementById("programa").value;
    if (programa === "") {
      mostrarError("error-programa", "Debe seleccionar un programa.");
      formularioValido = false;
    } else {
      limpiarError("error-programa");
    }
  }

  if (tipo === "funcionario") {
    var area = document.getElementById("area").value.trim();
    if (area === "") {
      mostrarError("error-area", "El área o unidad es obligatoria.");
      formularioValido = false;
    } else {
      limpiarError("error-area");
    }

    var cargo = document.getElementById("cargo").value.trim();
    if (cargo === "") {
      mostrarError("error-cargo", "El cargo es obligatorio.");
      formularioValido = false;
    } else {
      limpiarError("error-cargo");
    }
  }

  if (tipo === "academico") {
    var jerarquia = document.getElementById("jerarquia").value;
    if (jerarquia === "") {
      mostrarError("error-jerarquia", "Debe seleccionar una jerarquía.");
      formularioValido = false;
    } else {
      limpiarError("error-jerarquia");
    }

    var departamento = document.getElementById("departamento").value.trim();
    if (departamento === "") {
      mostrarError("error-departamento", "El departamento es obligatorio.");
      formularioValido = false;
    } else {
      limpiarError("error-departamento");
    }
  }

  if (formularioValido) {
    alert("Miembro registrado exitosamente.");
    evento.target.reset();

    document.getElementById("campos-pregrado").classList.add("oculto");
    document.getElementById("campos-postgrado").classList.add("oculto");
    document.getElementById("campos-funcionario").classList.add("oculto");
    document.getElementById("campos-academico").classList.add("oculto");
  }
});
