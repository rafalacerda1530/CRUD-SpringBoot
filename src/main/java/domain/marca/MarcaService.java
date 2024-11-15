package domain.marca;

import domain.exceptions.ResourceConflictException;
import domain.exceptions.ResourceNotFoundException;
import domain.marca.RequestBody.RequestBodyPostMarca;
import domain.marca.RequestBody.RequestBodyUpdateMarca;
import domain.marca.mapper.MarcaMapper;
import domain.modelo.Modelo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MarcaService {
    private final MarcaRepository marcaRepository;

    public List<Marca> listAll() {
        return marcaRepository.findAll();
    }

    public List<Marca> findAllThatConatinsName(String name) {
        List<Marca> marcas = listAll();

        if (marcas == null || marcas.isEmpty()) {
            throw new ResourceNotFoundException("Nenhum modelo cadastrado.");
        }

        return marcas.stream()
                .filter(marca -> marca.getNomeMarca().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Marca save(Marca marca) {
        return marcaRepository.save(marca);
    }

    public Optional<Marca> findById(Long id) {
        return Optional.ofNullable(marcaRepository.findById(id))
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + id));

    }

    public void deleteMarca(Long id) {
        Marca marca = marcaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + id));

        marcaRepository.deleteById(marca.getId());
    }

    public Marca updateMarca(RequestBodyUpdateMarca requestBodyUpdateMarca) {
        Marca marca = marcaRepository.findById(requestBodyUpdateMarca.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Não foi possível localizar o id: " + requestBodyUpdateMarca.getId()));

        MarcaMapper.INSTANCE.UpdateMarcaFromDto(requestBodyUpdateMarca, marca);

        return marcaRepository.save(marca);

    }

    public Marca createMarca(RequestBodyPostMarca requestBodyPostMarca) {
        Marca marcaExiste = marcaRepository.findByNomeMarca(requestBodyPostMarca.getNomeMarca());

        if (marcaExiste != null) {
            throw new ResourceConflictException(
                    "Um modelo com o nome " + requestBodyPostMarca.getNomeMarca() + " já existe.");
        }

        Marca marca = MarcaMapper.INSTANCE.toMarca(requestBodyPostMarca);

        return marcaRepository.save(marca);
    }

}
