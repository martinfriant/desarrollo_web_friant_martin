package tarea4.resultado;

public class ActividadResultado {

    public Integer id;
    public String nombreMiembro;
    public String dia;
    public String tipo;
    public String comuna;
    public String nombre;
    public String descripcion;
    public Double promedio;
    public long cantidadNotas;

    public ActividadResultado(Integer id, String nombreMiembro, String dia, String tipo,
                              String comuna, String nombre, String descripcion,
                              Double promedio, long cantidadNotas) {
        this.id = id;
        this.nombreMiembro = nombreMiembro;
        this.dia = dia;
        this.tipo = tipo;
        this.comuna = comuna;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.promedio = promedio;
        this.cantidadNotas = cantidadNotas;
    }
}
