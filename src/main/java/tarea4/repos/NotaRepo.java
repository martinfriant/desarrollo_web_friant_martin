package tarea4.repos;

import tarea4.models.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotaRepo extends JpaRepository<Nota, Integer> {

    @Query("SELECT AVG(n.nota) FROM Nota n WHERE n.actividad.id = :id")
    Double promedioPorActividad(@Param("id") Integer id);

    @Query("SELECT COUNT(n) FROM Nota n WHERE n.actividad.id = :id")
    long contarPorActividad(@Param("id") Integer id);
}
