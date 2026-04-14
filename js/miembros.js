// Datos simulados

var miembros = [
  { nombre: "Ana Martínez",     rut: "12.345.678-9", email: "ana.martinez@uchile.cl",    telefono: "+56912345001", tipo: "pregrado"    },
  { nombre: "Bruno Salinas",    rut: "13.456.789-0", email: "bruno.salinas@uchile.cl",   telefono: "+56912345002", tipo: "postgrado"   },
  { nombre: "Carla Fuentes",    rut: "14.567.890-1", email: "carla.fuentes@uchile.cl",   telefono: "",             tipo: "funcionario" },
  { nombre: "Diego Rojas",      rut: "15.678.901-2", email: "diego.rojas@uchile.cl",     telefono: "+56912345004", tipo: "academico"   },
  { nombre: "Elena Vásquez",    rut: "16.789.012-3", email: "elena.vasquez@uchile.cl",   telefono: "+56912345005", tipo: "pregrado"    },
  { nombre: "Felipe Morales",   rut: "17.890.123-4", email: "felipe.morales@uchile.cl",  telefono: "",             tipo: "postgrado"   },
  { nombre: "Gabriela León",    rut: "18.901.234-5", email: "gabriela.leon@uchile.cl",   telefono: "+56912345007", tipo: "funcionario" },
  { nombre: "Hernán Castro",    rut: "19.012.345-6", email: "hernan.castro@uchile.cl",   telefono: "+56912345008", tipo: "academico"   },
  { nombre: "Isabel Torres",    rut: "20.123.456-7", email: "isabel.torres@uchile.cl",   telefono: "+56912345009", tipo: "pregrado"    },
  { nombre: "Jorge Navarro",    rut: "11.234.567-8", email: "jorge.navarro@uchile.cl",   telefono: "",             tipo: "postgrado"   },
  { nombre: "Karen Pérez",      rut: "12.111.222-3", email: "karen.perez@uchile.cl",     telefono: "+56912345011", tipo: "pregrado"    },
  { nombre: "Luis Contreras",   rut: "13.222.333-4", email: "luis.contreras@uchile.cl",  telefono: "+56912345012", tipo: "academico"   },
  { nombre: "María Godoy",      rut: "14.333.444-5", email: "maria.godoy@uchile.cl",     telefono: "",             tipo: "funcionario" },
  { nombre: "Nicolás Herrera",  rut: "15.444.555-6", email: "nicolas.herrera@uchile.cl", telefono: "+56912345014", tipo: "pregrado"    },
  { nombre: "Olivia Espinoza",  rut: "16.555.666-7", email: "olivia.espinoza@uchile.cl", telefono: "+56912345015", tipo: "postgrado"   },
  { nombre: "Pablo Muñoz",      rut: "17.666.777-8", email: "pablo.munoz@uchile.cl",     telefono: "",             tipo: "academico"   },
  { nombre: "Raquel Soto",      rut: "18.777.888-9", email: "raquel.soto@uchile.cl",     telefono: "+56912345017", tipo: "pregrado"    },
  { nombre: "Sergio Díaz",      rut: "19.888.999-0", email: "sergio.diaz@uchile.cl",     telefono: "+56912345018", tipo: "funcionario" },
  { nombre: "Tamara Ortega",    rut: "20.999.000-1", email: "tamara.ortega@uchile.cl",   telefono: "+56912345019", tipo: "postgrado"   },
  { nombre: "Valentina Ríos",   rut: "11.000.111-2", email: "valentina.rios@uchile.cl",  telefono: "",             tipo: "pregrado"    }
];

var paginaActual = 1;
var FILAS_POR_PAGINA = 8;

function etiquetaTipo(tipo) {
  if (tipo === "pregrado")    return "Est. Pregrado";
  if (tipo === "postgrado")   return "Est. Postgrado";
  if (tipo === "funcionario") return "Funcionario/a";
  if (tipo === "academico")   return "Académico/a";
  return tipo;
}

function filtrarMiembros() {
  var filtroTipo = document.getElementById("filtro-tipo").value;
  var resultado = [];

  for (var i = 0; i < miembros.length; i++) {
    if (filtroTipo === "" || miembros[i].tipo === filtroTipo) {
      resultado.push(miembros[i]);
    }
  }

  return resultado;
}

function renderizarTabla() {
  var datos = filtrarMiembros();

  var totalPaginas = Math.ceil(datos.length / FILAS_POR_PAGINA);
  if (totalPaginas === 0) totalPaginas = 1;
  if (paginaActual > totalPaginas) paginaActual = 1;

  var inicio = (paginaActual - 1) * FILAS_POR_PAGINA;
  var fin    = inicio + FILAS_POR_PAGINA;

  var cuerpo = document.getElementById("tabla-cuerpo");
  cuerpo.innerHTML = "";

  if (datos.length === 0) {
    cuerpo.innerHTML = "<tr><td colspan='5'>No hay miembros que coincidan con el filtro.</td></tr>";
  } else {
    for (var i = inicio; i < fin && i < datos.length; i++) {
      var m = datos[i];
      var telefono = m.telefono !== "" ? m.telefono : "—";

      var fila = document.createElement("tr");
      fila.innerHTML =
        "<td>" + m.nombre    + "</td>" +
        "<td>" + m.rut       + "</td>" +
        "<td>" + m.email     + "</td>" +
        "<td>" + telefono    + "</td>" +
        "<td>" + etiquetaTipo(m.tipo) + "</td>";
      cuerpo.appendChild(fila);
    }
  }

  document.getElementById("info-pagina").textContent =
    "Página " + paginaActual + " de " + totalPaginas;

  document.getElementById("btn-anterior").disabled = (paginaActual === 1);
  document.getElementById("btn-siguiente").disabled = (paginaActual === totalPaginas);
}

// Eventos

document.getElementById("btn-aplicar").addEventListener("click", function () {
  paginaActual = 1;
  renderizarTabla();
});

document.getElementById("btn-anterior").addEventListener("click", function () {
  paginaActual--;
  renderizarTabla();
});

document.getElementById("btn-siguiente").addEventListener("click", function () {
  paginaActual++;
  renderizarTabla();
});

renderizarTabla();
