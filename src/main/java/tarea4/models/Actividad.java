package tarea4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "actividad")
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    private String tipo;

    private String descripcion;

    private String dia;

    @ManyToOne
    @JoinColumn(name = "miembro_id")
    private Miembro miembro;

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getDia() {
        return dia;
    }

    public Miembro getMiembro() {
        return miembro;
    }
}
