package domain.modelo.RequestBody;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestBodyPostModelo {

    @NotEmpty (message = "nome Não pode ser nulo ou vazio")
    @NotNull
    private String nome;

    @NotEmpty (message = "valor_fipe Não pode ser nulo ou vazio")
    @NotNull
    private String valor_fipe;

    @NotNull(message = "idMarca Não pode ser nulo")
    private Long marcaId;
}
