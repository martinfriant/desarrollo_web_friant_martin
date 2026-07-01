package tarea4.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "miembro")
public class Miembro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    @ManyToOne
    @JoinColumn(name = "comuna_id")
    private Comuna comuna;

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public Comuna getComuna() {
        return comuna;
    }
}
