package domain.marca.RequestBody;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestBodyUpdateMarca {

    @NotEmpty (message = "ID Não pode ser nulo ou vazio")
    @NotNull
    private Long id;

    @NotEmpty (message = "nome_marca Não pode ser nulo ou vazio")
    @NotNull
    private String nomeMarca;
}