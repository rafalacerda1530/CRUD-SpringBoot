package domain.carro;

import domain.carro.RequestBody.RequestBodyPostCarro;
import domain.carro.RequestBody.RequestBodyUpdateCarro;
import domain.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("carro")
@Log4j2
@RequiredArgsConstructor
public class CarroController {
    private final CarroService carroService;

    @GetMapping
    public ResponseEntity<List<Carro>>  listaAll(){
        return  ResponseEntity.ok(carroService.listAll());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Carro> findCar(@PathVariable Long id){
        Optional<Carro> carro = carroService.findById(id);

        if (carro.isPresent()){
            return ResponseEntity.ok(carro.get());
        } else {
            throw new ResourceNotFoundException("Carro com ID " + id + " não localizado");
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        carroService.deleteCar(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping()
    public ResponseEntity<Carro> updateCar(@RequestBody RequestBodyUpdateCarro requestBodyUpdateCarro){
        Carro carroAtualizado = carroService.update(requestBodyUpdateCarro);
        return ResponseEntity.ok(carroAtualizado);
    }

    @PostMapping()
    public ResponseEntity<Carro> createCar(@RequestBody RequestBodyPostCarro requestBodyPostCarro){
        Carro novoCarro = carroService.createCarro(requestBodyPostCarro);
        return  ResponseEntity.status(HttpStatus.CREATED).body(novoCarro);
    }

}
