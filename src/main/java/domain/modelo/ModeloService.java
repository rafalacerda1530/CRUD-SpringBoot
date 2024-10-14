package domain.modelo;

import domain.exceptions.ResourceNotFoundException;
import domain.marca.Marca;
import domain.marca.MarcaRepository;
import domain.modelo.RequestBody.RequestBodyUpdateModelo;
import domain.modelo.mapper.ModeloMapper;
import domain.modelo.RequestBody.RequestBodyPostModelo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModeloService {
    private final ModeloRepository modeloRepository;
    private final MarcaRepository marcaRepository;

    public List<Modelo> listAll(){
        return modeloRepository.findAll();
    }

    public Modelo save(Modelo modelo){
        return modeloRepository.save(modelo);
    }

    public Optional<Modelo> findById(Long id){
        return Optional.ofNullable(modeloRepository.findById(id))
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + id));

    }

    public void deleteModelo(Long id){
        Modelo modelo = modeloRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + id));

        modeloRepository.deleteById(modelo.getId());
    }

    public Modelo updateModelo(RequestBodyUpdateModelo requestBodyUpdateModelo){
        Modelo modelo = modeloRepository.findById(requestBodyUpdateModelo.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + requestBodyUpdateModelo.getId()));

        ModeloMapper.INSTANCE.updateModeloFromDto(requestBodyUpdateModelo, modelo);

        return modeloRepository.save(modelo);
    }

    public Modelo createModelo(@Valid @RequestBody RequestBodyPostModelo requestBodyPostModelo){
        Marca marca = marcaRepository.findById(requestBodyPostModelo.getMarcaId())
                .orElseThrow(() -> new ResourceNotFoundException("ID MARCA NÃO LOCALIZADO"));

        Modelo modelo = ModeloMapper.INSTANCE.toModelo(requestBodyPostModelo);

        modelo.setMarca(marca);

        return modeloRepository.save(modelo);
    }
}
