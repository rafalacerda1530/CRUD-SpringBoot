package domain.carro;

import domain.carro.RequestBody.RequestBodyPostCarro;
import domain.carro.RequestBody.RequestBodyUpdateCarro;
import domain.carro.mapper.CarroMapper;
import domain.exceptions.ResourceNotFoundException;
import domain.modelo.Modelo;
import domain.modelo.ModeloRepository;
import domain.modelo.ModeloService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarroService {
    private final CarroRepository carroRepository;
    private final ModeloRepository modeloRepository;

    public List<Carro> listAll() {
        return carroRepository.findAll();
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
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + requestBodyUpdateCarro.getId()));

        CarroMapper.INSTANCE.updateCarroFromDto(requestBodyUpdateCarro, carro);

        return  carroRepository.save(carro);

    }

    public Carro createCarro(RequestBodyPostCarro requestBodyPostCarro){

        Modelo modelo = modeloRepository.findById(requestBodyPostCarro.getIdModelo())
                .orElseThrow(() -> new ResourceNotFoundException("ID NMODELO NÃO LOCALIZADO"));

        Carro carro = CarroMapper.INSTANCE.toCarro(requestBodyPostCarro);
        carro.setTimestamp_cadastro(LocalDateTime.now());
        carro.setModelo(modelo);

        return  carroRepository.save(carro);
    }

}
