package domain.modelo;

import domain.modelo.RequestBody.RequestBodyPostModelo;
import domain.modelo.RequestBody.RequestBodyUpdateModelo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("modelo")
@Log4j2
@RequiredArgsConstructor
public class ModeloController {
    private final ModeloService modeloService;

    @GetMapping
    public ResponseEntity<List<Modelo>> listAll() {
        return ResponseEntity.ok(modeloService.listAll());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Modelo> findModelo(@PathVariable Long id) {
        Optional<Modelo> modelo = modeloService.findById(id);

        if (modelo.isPresent()) {
            return ResponseEntity.ok(modelo.get());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/modeloNome/{nome}")
    public ResponseEntity<List<Modelo>> findByNome(@PathVariable String nome) {
        List<Modelo> modelo = modeloService.findAllThatConatinsName(nome);
        return ResponseEntity.ok(modelo);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteModelo(@PathVariable Long id) {
        modeloService.deleteModelo(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping()
    public ResponseEntity<Modelo> updateModelo(@Valid @RequestBody RequestBodyUpdateModelo requestBodyUpdateModelo) {
        System.out.println(requestBodyUpdateModelo.getValorFipe());
        Modelo modelo = modeloService.updateModelo(requestBodyUpdateModelo);

        return ResponseEntity.ok(modelo);
    }

    @PostMapping()
    public ResponseEntity<Modelo> createModelo(@Valid @RequestBody RequestBodyPostModelo requestBodyPostModelo) {

        Modelo modelo = modeloService.createModelo(requestBodyPostModelo);

        return ResponseEntity.status(HttpStatus.CREATED).body(modelo);
    }
}
