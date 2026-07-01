package tarea4.controller;

import tarea4.resultado.ActividadResultado;
import tarea4.models.Actividad;
import tarea4.models.Nota;
import tarea4.repos.ActividadRepo;
import tarea4.repos.NotaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/actividades")
public class ActividadController {

    @Autowired
    private ActividadRepo actividadRepo;

    @Autowired
    private NotaRepo notaRepo;

    @GetMapping("/buscar")
    public List<ActividadResultado> buscar(@RequestParam String q) {
        // si el texto es muy corto no buscar
        if (q == null || q.length() < 3) {
            return new ArrayList<>();
        }

        List<Actividad> actividades = actividadRepo.buscar(q);
        List<ActividadResultado> resultados = new ArrayList<>();

        for (Actividad a : actividades) {
            Double promedio = notaRepo.promedioPorActividad(a.getId());
            long cantidad = notaRepo.contarPorActividad(a.getId());

            resultados.add(new ActividadResultado(
                a.getId(),
                a.getMiembro().getNombre(),
                a.getDia(),
                a.getTipo(),
                a.getMiembro().getComuna().getNombre(),
                a.getNombre(),
                a.getDescripcion(),
                promedio,
                cantidad
            ));
        }

        return resultados;
    }

    @PostMapping("/{id}/notas")
    public Map<String, Object> agregarNota(@PathVariable Integer id, @RequestBody Map<String, Integer> body) {
        Integer valorNota = body.get("nota");

        if (valorNota == null || valorNota < 1 || valorNota > 7) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "La nota debe ser un entero entre 1 y 7");
            return error;
        }

        Actividad actividad = actividadRepo.findById(id).orElse(null);

        Nota nota = new Nota();
        nota.setNota(valorNota);
        nota.setActividad(actividad);
        notaRepo.save(nota);

        Double promedio = notaRepo.promedioPorActividad(id);
        long cantidad = notaRepo.contarPorActividad(id);

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("promedio", promedio);
        resultado.put("cantidad", cantidad);
        return resultado;
    }
}
