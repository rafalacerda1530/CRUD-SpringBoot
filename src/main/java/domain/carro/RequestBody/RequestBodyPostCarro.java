package domain.carro.RequestBody;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestBodyPostCarro {

    @NotEmpty(message = "ano Não pode ser nulo ou vazio")
    @NotNull
    private int ano;

    @NotEmpty (message = "combustivel pode ser nulo ou vazio")
    @NotNull
    private String combustivel;

    @NotEmpty (message = "numPortas Não pode ser nulo ou vazio")
    @NotNull
    private int numPortas;

    @NotEmpty (message = "cor Não pode ser nulo ou vazio")
    @NotNull
    private String cor;

    @NotEmpty (message = "ID Modelo Não pode ser nulo ou vazio")
    @NotNull
    private Long idModelo;

}
