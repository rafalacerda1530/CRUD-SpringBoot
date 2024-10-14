package domain.modelo.RequestBody;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestBodyUpdateModelo {

    @NotEmpty (message = "ID Não pode ser nulo ou vazio")
    @NotNull
    private Long id;

    @NotEmpty (message = "nome Não pode ser nulo ou vazio")
    @NotNull
    private String nome;

    @NotEmpty (message = "valor_fipe Não pode ser nulo ou vazio")
    @NotNull
    private String valor_fipe;
}
