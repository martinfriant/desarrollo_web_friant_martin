var inputBusqueda = document.getElementById("input-busqueda");
var divResultados = document.getElementById("resultados");

inputBusqueda.addEventListener("input", function () {
    var texto = inputBusqueda.value.trim();

    if (texto.length < 3) {
        divResultados.innerHTML = "";
        return;
    }

    fetch("/api/actividades/buscar?q=" + texto)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            console.log(datos);
            mostrarResultados(datos, texto);
        });
});

function escaparHtml(texto) {
    if (texto == null) return "";
    var div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

function resaltar(texto, patron) {
    if (texto == null) return "";
    var regex = new RegExp("(" + patron + ")", "gi");
    return texto.replace(regex, "<mark>$1</mark>");
}

function mostrarResultados(datos, patron) {
    divResultados.innerHTML = "";

    if (datos.length === 0) {
        divResultados.innerHTML = '<p class="mensaje">No se encontraron actividades.</p>';
        return;
    }

    for (var i = 0; i < datos.length; i++) {
        var a = datos[i];
        var div = document.createElement("div");
        div.className = "actividad";

        var notaTexto = a.promedio != null ? a.promedio.toFixed(1) : "-";
        var cantidadTexto = a.cantidadNotas > 0 ? " (" + a.cantidadNotas + " evaluaciones)" : "";

        div.innerHTML =
            "<h3>" + resaltar(a.nombre, patron) + "</h3>" +
            "<p><strong>Miembro:</strong> " + escaparHtml(a.nombreMiembro) + "</p>" +
            '<p><strong>D\u00eda:</strong> ' + escaparHtml(a.dia) + " &mdash; " +
            "<strong>Tipo:</strong> " + escaparHtml(a.tipo) + "</p>" +
            "<p><strong>Comuna:</strong> " + resaltar(a.comuna, patron) + "</p>" +
            '<p class="descripcion">' + resaltar(a.descripcion, patron) + "</p>" +
            '<div class="nota-info">' +
                '<span>Nota: <span class="nota-valor">' + notaTexto + '</span>' + cantidadTexto + '</span>' +
                '<button class="btn-evaluar" onclick="mostrarSelector(' + a.id + ', this)">Evaluar</button>' +
            "</div>";

        divResultados.appendChild(div);
    }
}

function mostrarSelector(actividadId, boton) {
    if (boton.parentElement.querySelector(".select-nota")) {
        return;
    }

    // crear el select con las notas
    var select = document.createElement("select");
    select.className = "select-nota";

    var opcionDefault = document.createElement("option");
    opcionDefault.value = "";
    opcionDefault.textContent = "Nota...";
    select.appendChild(opcionDefault);

    for (var n = 1; n <= 7; n++) {
        var opcion = document.createElement("option");
        opcion.value = n;
        opcion.textContent = n;
        select.appendChild(opcion);
    }

    select.addEventListener("change", function () {
        var valor = parseInt(select.value);
        if (isNaN(valor)) return;

        enviarNota(actividadId, valor, boton.parentElement);
        select.remove();
    });

    boton.parentElement.appendChild(select);
}

function enviarNota(actividadId, nota, contenedorNota) {
    fetch("/api/actividades/" + actividadId + "/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nota: nota })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            var spanNota = contenedorNota.querySelector(".nota-valor");
            spanNota.textContent = datos.promedio.toFixed(1);

            // Actualizar el texto del contador
            var spanPadre = spanNota.parentElement;
            spanPadre.innerHTML = 'Nota: <span class="nota-valor">' + datos.promedio.toFixed(1) +
                "</span> (" + datos.cantidad + " evaluaciones)";
        });
}
