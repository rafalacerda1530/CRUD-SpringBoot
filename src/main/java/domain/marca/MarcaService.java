package domain.marca;

import domain.exceptions.ResourceNotFoundException;
import domain.marca.RequestBody.RequestBodyPostMarca;
import domain.marca.RequestBody.RequestBodyUpdateMarca;
import domain.marca.mapper.MarcaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MarcaService {
    private final MarcaRepository marcaRepository;

    public List<Marca> listAll(){
        return marcaRepository.findAll();
    }

    public Marca save(Marca marca){
        return marcaRepository.save(marca);
    }

    public Optional<Marca> findById(Long id){
        return Optional.ofNullable(marcaRepository.findById(id))
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + id));

    }

    public void deleteMarca(Long id){
        Marca marca = marcaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + id));

        marcaRepository.deleteById(marca.getId());
    }

    public Marca updateMarca(RequestBodyUpdateMarca requestBodyUpdateMarca){
        Marca marca = marcaRepository.findById(requestBodyUpdateMarca.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Não foi possível localizar o id: " + requestBodyUpdateMarca.getId()));

        MarcaMapper.INSTANCE.UpdateMarcaFromDto(requestBodyUpdateMarca, marca);

        return marcaRepository.save(marca);

    }

    public Marca createMarca(RequestBodyPostMarca requestBodyPostMarca){
        System.out.println("Recebido: " + requestBodyPostMarca); // Para verificar o que foi recebido
        Marca marca = MarcaMapper.INSTANCE.toMarca(requestBodyPostMarca);
        System.out.println("Marca após mapeamento: " + marca);
        return marcaRepository.save(marca);
    }
}
