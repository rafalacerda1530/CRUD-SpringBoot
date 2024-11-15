package domain.modelo;

import domain.exceptions.ResourceConflictException;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModeloService {
    private final ModeloRepository modeloRepository;
    private final MarcaRepository marcaRepository;

    public List<Modelo> listAll() {
        return modeloRepository.findAll();
    }

    public Modelo save(Modelo modelo) {
        return modeloRepository.save(modelo);
    }

    public Optional<Modelo> findById(Long id) {
        return Optional.ofNullable(modeloRepository.findById(id))
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + id));

    }

    public Modelo findByNome(String nome) {
        return Optional.ofNullable(modeloRepository.findBynome(nome))
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o modelo: " + nome));
    }

    public List<Modelo> findAllThatConatinsName(String name) {
        List<Modelo> modelos = listAll();

        if (modelos == null || modelos.isEmpty()) {
            throw new ResourceNotFoundException("Nenhum modelo cadastrado.");
        }

        return modelos.stream()
                .filter(modelo -> modelo.getNome().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    public void deleteModelo(Long id) {
        Modelo modelo = modeloRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + id));

        modeloRepository.deleteById(modelo.getId());
    }

    public Modelo updateModelo(RequestBodyUpdateModelo requestBodyUpdateModelo) {
        Modelo modelo = modeloRepository.findById(requestBodyUpdateModelo.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Não foi possível localizar o id: " + requestBodyUpdateModelo.getId()));

        Marca marca = marcaRepository.findByNomeMarca(requestBodyUpdateModelo.getNomeMarca());

        if (marca == null) {
            throw new ResourceNotFoundException("MARCA " + requestBodyUpdateModelo.getNomeMarca() + " NÃO LOCALIZADO");
        }

        modelo.setMarca(marca);

        ModeloMapper.INSTANCE.updateModeloFromDto(requestBodyUpdateModelo, modelo);

        return modeloRepository.save(modelo);
    }

    public Modelo createModelo(@Valid @RequestBody RequestBodyPostModelo requestBodyPostModelo) {

        Marca marca = marcaRepository.findByNomeMarca(requestBodyPostModelo.getNomeMarca());

        if (marca == null) {
            throw new ResourceNotFoundException("MARCA " + requestBodyPostModelo.getNomeMarca() + " NÃO LOCALIZADO");
        }

        Modelo modeloExiste = modeloRepository.findBynome(requestBodyPostModelo.getNome());
        if (modeloExiste != null
                && modeloExiste.getMarca().getNomeMarca().equals(requestBodyPostModelo.getNomeMarca())) {

            throw new ResourceConflictException(
                    "Um modelo com o nome " + requestBodyPostModelo.getNome() + " já existe.");
        }

        Modelo modelo = ModeloMapper.INSTANCE.toModelo(requestBodyPostModelo);

        modelo.setMarca(marca);

        return modeloRepository.save(modelo);
    }
}
