package domain.marca;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import domain.modelo.Modelo;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
    Marca findByNomeMarca(String nome);
}
