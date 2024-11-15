package domain.marca;

import domain.marca.RequestBody.RequestBodyPostMarca;
import domain.marca.RequestBody.RequestBodyUpdateMarca;
import domain.modelo.Modelo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("marca")
@Log4j2
@RequiredArgsConstructor
public class MarcaController {
    private final MarcaService marcaService;

    @GetMapping
    public ResponseEntity<List<Marca>> listAll() {
        return ResponseEntity.ok(marcaService.listAll());
    }

    @GetMapping(path = "/marcaNome/{nome}")
    public ResponseEntity<List<Marca>> findByNome(@PathVariable String nome) {
        List<Marca> marca = marcaService.findAllThatConatinsName(nome);
        return ResponseEntity.ok(marca);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Marca> findMarca(@PathVariable Long id) {
        Optional<Marca> marca = marcaService.findById(id);

        if (marca.isPresent()) {
            return ResponseEntity.ok(marca.get());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteMarca(@PathVariable Long id) {
        marcaService.deleteMarca(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping()
    public ResponseEntity<Marca> updateMarca(@Valid @RequestBody RequestBodyUpdateMarca requestBodyUpdateMarca) {
        Marca marcaAtualizada = marcaService.updateMarca(requestBodyUpdateMarca);

        return ResponseEntity.ok(marcaAtualizada);

    }

    @PostMapping()
    public ResponseEntity<Marca> createMarca(@Valid @RequestBody RequestBodyPostMarca requestBodyPostMarca) {
        Marca marcaNova = marcaService.createMarca(requestBodyPostMarca);
        return ResponseEntity.status(HttpStatus.CREATED).body(marcaNova);
    }
}
