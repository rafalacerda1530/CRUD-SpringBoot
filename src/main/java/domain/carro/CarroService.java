package domain.carro;

import domain.carro.RequestBody.RequestBodyPostCarro;
import domain.carro.RequestBody.RequestBodyUpdateCarro;
import domain.carro.mapper.CarroMapper;
import domain.exceptions.ResourceNotFoundException;
import domain.modelo.Modelo;
import domain.modelo.ModeloRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarroService {
    private final CarroRepository carroRepository;
    private final ModeloRepository modeloRepository;

    public List<Carro> listAll() {
        return carroRepository.findAll();
    }

    public List<Carro> findAllThatConatinsName(String name) {
        List<Carro> carros = listAll();

        if (carros == null || carros.isEmpty()) {
            throw new ResourceNotFoundException("Nenhum veiculo cadastrado.");
        }

        return carros.stream()
                .filter(carro -> carro.getModelo().getNome().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Carro> findCarByModeloNome(String nome) {
        return carroRepository.findCarByModeloNome(nome);
    }

    public Carro save(Carro carro) {
        return carroRepository.save(carro);
    }

    public Optional<Carro> findById(Long id) {
        return Optional.ofNullable(carroRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + id)));
    }

    public void deleteCar(Long id) {
        Carro carro = carroRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + id));

        carroRepository.deleteById(carro.getId());
    }

    public Carro update(RequestBodyUpdateCarro requestBodyUpdateCarro) {
        Carro carro = carroRepository.findById(requestBodyUpdateCarro.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Não foi possível localizar o id: " + requestBodyUpdateCarro.getId()));

        Modelo modelo = modeloRepository.findBynome(requestBodyUpdateCarro.getNomeModelo());
        if (modelo == null) {
            throw new ResourceNotFoundException("MODELO " + requestBodyUpdateCarro.getNomeModelo() + " NÃO LOCALIZADO");
        }

        CarroMapper.INSTANCE.updateCarroFromDto(requestBodyUpdateCarro, carro);
        carro.setModelo(modelo);

        return carroRepository.save(carro);

    }

    public Carro createCarro(RequestBodyPostCarro requestBodyPostCarro) {

        Modelo modelo = modeloRepository.findBynome(requestBodyPostCarro.getNomeModelo());

        if (modelo == null) {
            throw new ResourceNotFoundException("MODELO " + requestBodyPostCarro.getNomeModelo() + " NÃO LOCALIZADO");
        }

        Carro carro = CarroMapper.INSTANCE.toCarro(requestBodyPostCarro);
        carro.setTimestamp_cadastro(LocalDateTime.now());
        carro.setModelo(modelo);

        return carroRepository.save(carro);
    }

}
