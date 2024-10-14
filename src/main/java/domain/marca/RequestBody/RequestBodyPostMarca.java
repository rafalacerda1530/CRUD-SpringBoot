package domain.marca.RequestBody;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class RequestBodyPostMarca {
    @NotEmpty(message = "nome_marca Não pode ser nulo ou vazio")
    private String nomeMarca;
}

