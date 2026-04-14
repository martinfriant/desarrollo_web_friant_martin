// Datos simulados

var miembros = [
  { tipo: "pregrado"    },
  { tipo: "postgrado"   },
  { tipo: "funcionario" },
  { tipo: "academico"   },
  { tipo: "pregrado"    },
  { tipo: "postgrado"   },
  { tipo: "funcionario" },
  { tipo: "academico"   },
  { tipo: "pregrado"    },
  { tipo: "postgrado"   },
  { tipo: "pregrado"    },
  { tipo: "academico"   },
  { tipo: "funcionario" },
  { tipo: "pregrado"    },
  { tipo: "postgrado"   },
  { tipo: "academico"   },
  { tipo: "pregrado"    },
  { tipo: "funcionario" },
  { tipo: "postgrado"   },
  { tipo: "pregrado"    }
];

var actividades = [
  { tipo: "artistica",    dia: "lunes"     },
  { tipo: "deportiva",    dia: "martes"    },
  { tipo: "tecnologica",  dia: "miercoles" },
  { tipo: "social",       dia: "jueves"    },
  { tipo: "recreativa",   dia: "viernes"   },
  { tipo: "deportiva",    dia: "sabado"    },
  { tipo: "artistica",    dia: "lunes"     },
  { tipo: "deportiva",    dia: "martes"    },
  { tipo: "tecnologica",  dia: "miercoles" },
  { tipo: "deportiva",    dia: "jueves"    },
  { tipo: "social",       dia: "viernes"   },
  { tipo: "artistica",    dia: "sabado"    },
  { tipo: "recreativa",   dia: "domingo"   },
  { tipo: "deportiva",    dia: "lunes"     },
  { tipo: "tecnologica",  dia: "martes"    }
];

// Contar cuántos hay de cada valor en un campo

function contarPorCampo(array, campo) {
  var conteo = {};
  for (var i = 0; i < array.length; i++) {
    var valor = array[i][campo];
    if (conteo[valor] === undefined) {
      conteo[valor] = 0;
    }
    conteo[valor]++;
  }
  return conteo;
}

// Encontrar el valor más frecuente

function valorMasFrecuente(conteo) {
  var maxClave = "";
  var maxValor = -1;
  for (var clave in conteo) {
    if (conteo[clave] > maxValor) {
      maxValor = conteo[clave];
      maxClave = clave;
    }
  }
  return maxClave;
}

// Mostrar indicadores

var conteoTipoMiembro   = contarPorCampo(miembros,    "tipo");
var conteoTipoActividad = contarPorCampo(actividades, "tipo");

document.getElementById("total-miembros").textContent     = miembros.length;
document.getElementById("total-actividades").textContent  = actividades.length;
document.getElementById("tipo-frecuente").textContent     = valorMasFrecuente(conteoTipoMiembro);
document.getElementById("actividad-frecuente").textContent = valorMasFrecuente(conteoTipoActividad);
