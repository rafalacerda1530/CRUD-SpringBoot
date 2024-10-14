package domain.modelo;

import domain.marca.Marca;
import domain.marca.RequestBody.RequestBodyPostMarca;
import domain.marca.RequestBody.RequestBodyUpdateMarca;
import domain.modelo.RequestBody.RequestBodyPostModelo;
import domain.modelo.RequestBody.RequestBodyUpdateModelo;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.Banner;
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
    public ResponseEntity<List<Modelo>> listAll(){
        return ResponseEntity.ok(modeloService.listAll());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Modelo> findModelo(@PathVariable Long id){
        Optional<Modelo> modelo = modeloService.findById(id);

        if(modelo.isPresent()){
            return ResponseEntity.ok(modelo.get());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteModelo(@PathVariable Long id){
        modeloService.deleteModelo(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping()
    public ResponseEntity<Modelo> updateModelo(@RequestBody RequestBodyUpdateModelo requestBodyUpdateModelo){
        Modelo modelo = modeloService.updateModelo(requestBodyUpdateModelo);

        return ResponseEntity.ok(modelo);
    }

    @PostMapping()
    public ResponseEntity<Modelo> createModelo(@Valid @RequestBody RequestBodyPostModelo requestBodyPostModelo){
        Modelo modelo = modeloService.createModelo(requestBodyPostModelo);

        return ResponseEntity.status(HttpStatus.CREATED).body(modelo);
    }
}
