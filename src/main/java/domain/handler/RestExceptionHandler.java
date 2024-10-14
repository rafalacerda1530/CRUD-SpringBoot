package domain.handler;

import domain.exceptions.ResourceNotFoundException;
import domain.exceptions.ResourceNotFoundExceptionDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResourceNotFoundExceptionDetails> handlerResourceNotFound(ResourceNotFoundException resourceNotFoundException){

        return new ResponseEntity<>(
                ResourceNotFoundExceptionDetails.builder()
                        .timeStamp(LocalDateTime.now())
                        .status(HttpStatus.NOT_FOUND.value())
                        .title("Recurso não localizado, verifique o ID")
                        .details(resourceNotFoundException.getMessage())
                        .developerMessage("Por favor, verifique o ID ou os dados principais da busca.")
                        .build(), HttpStatus.NOT_FOUND);
    }

}
