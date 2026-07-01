package tarea4.repos;

import tarea4.models.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ActividadRepo extends JpaRepository<Actividad, Integer> {

    @Query("SELECT a FROM Actividad a WHERE " +
           "LOWER(a.nombre) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(a.descripcion) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(a.miembro.comuna.nombre) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Actividad> buscar(@Param("q") String q);
}
