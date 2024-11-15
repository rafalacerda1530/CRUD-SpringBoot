package domain.handler;

import domain.exceptions.BadRequestHandler;
import domain.exceptions.ResourceConflictException;
import domain.exceptions.ResourceNotFoundException;
import domain.exceptions.exceptionsDetails.BadRequestHandlerDetails;
import domain.exceptions.exceptionsDetails.ResourceConflictExceptionDetails;
import domain.exceptions.exceptionsDetails.ResourceNotFoundExceptionDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class RestExceptionHandler {

        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ResourceNotFoundExceptionDetails> handlerResourceNotFound(
                        ResourceNotFoundException resourceNotFoundException) {

                return new ResponseEntity<>(
                                ResourceNotFoundExceptionDetails.builder()
                                                .timeStamp(LocalDateTime.now())
                                                .status(HttpStatus.NOT_FOUND.value())
                                                .title("Recurso não localizado, verifique os dados da busca")
                                                .details(resourceNotFoundException.getMessage())
                                                .developerMessage(
                                                                "Por favor, verifique o ID ou os dados principais da busca.")
                                                .build(),
                                HttpStatus.NOT_FOUND);
        }

        @ExceptionHandler(ResourceConflictException.class)
        public ResponseEntity<ResourceConflictExceptionDetails> handleResourceConflictException(
                        ResourceConflictException resourceConflictException) {
                return new ResponseEntity<>(
                                ResourceConflictExceptionDetails.builder()
                                                .timeStamp(LocalDateTime.now())
                                                .status(HttpStatus.CONFLICT.value())
                                                .title("Inconsistência na criação, por gentileza validar se já existem itens com campos iguais já criados.")
                                                .details(resourceConflictException.getMessage())
                                                .developerMessage(
                                                                "Validar se já existem itens no banco com os mesmos dados")
                                                .build(),
                                HttpStatus.CONFLICT);

        }

        @ExceptionHandler(BadRequestHandler.class)
        public ResponseEntity<BadRequestHandlerDetails> handleBadRequest(BadRequestHandler badRequestHandler) {
                return new ResponseEntity<>(BadRequestHandlerDetails.builder()
                                .timeStamp(LocalDateTime.now())
                                .status(HttpStatus.CONFLICT.value())
                                .title("Nao foi possível realizar a requisição.")
                                .details(badRequestHandler.getMessage())
                                .developerMessage(
                                                "Validar se existe algum dado obrigatório faltando")
                                .build(),
                                HttpStatus.CONFLICT);
        }

}
