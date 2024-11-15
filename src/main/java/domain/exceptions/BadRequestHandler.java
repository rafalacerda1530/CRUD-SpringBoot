package domain.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestHandler extends RuntimeException {
    public BadRequestHandler(String message) {
        super(message);
    }
}
