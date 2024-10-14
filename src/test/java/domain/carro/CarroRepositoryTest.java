package domain.carro;

import static org.junit.jupiter.api.Assertions.assertNotNull;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import util.CarroCreator;

import java.util.Optional;

@DataJpaTest
@DisplayName("Test Carro")
public class CarroRepositoryTest {

    @Autowired
    private CarroRepository carroRepository;

    @Test
    @DisplayName("Test save Carro")
    public void testSaveCarro() {
        Carro carro = CarroCreator.createCarroTobeSaved();

        Carro savedCarro = carroRepository.save(carro);

        Assertions.assertThat(savedCarro).isNotNull();
        Assertions.assertThat(savedCarro.getId()).isNotNull();
        Assertions.assertThat(savedCarro.getTimestamp_cadastro()).isEqualTo(carro.getTimestamp_cadastro());

    }

    @Test
    @DisplayName("Test Update Carro")
    public void testUpdateCarro() {
        Carro carro = CarroCreator.createCarroTobeSaved();

        Carro savedCarro = carroRepository.save(carro);

        savedCarro.setCombustivel("Gasolina");

        Carro updatedCarro = this.carroRepository.save(savedCarro);

        Assertions.assertThat(updatedCarro).isNotNull();
        Assertions.assertThat(updatedCarro.getId()).isNotNull();
        Assertions.assertThat(updatedCarro.getCombustivel()).isEqualTo(savedCarro.getCombustivel());
    }

    @Test
    @DisplayName("Test Delete Carro")
    public void testDeleteCarro() {
        Carro carro = CarroCreator.createCarroTobeSaved();

        Carro savedCarro = this.carroRepository.save(carro);

        carroRepository.delete(savedCarro);

        Optional<Carro> carroDeleted = this.carroRepository.findById(savedCarro.getId());

        Assertions.assertThat(carroDeleted).isEmpty();
    }
}
