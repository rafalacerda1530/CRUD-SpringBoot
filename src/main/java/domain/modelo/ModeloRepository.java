package domain.modelo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ModeloRepository extends JpaRepository<Modelo, Long> {
    Modelo findBynome(String nome);
}
