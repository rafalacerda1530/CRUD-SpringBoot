package domain.carro.RequestBody;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestBodyPostCarro {

    @NotNull(message = "ano Não pode ser nulo")
    private int ano;

    @NotEmpty(message = "combustivel Não pode ser nulo ou vazio")
    @NotNull
    private String combustivel;

    @NotNull(message = "numPortas Não pode ser nulo")
    private int numPortas;

    @NotEmpty(message = "cor Não pode ser nulo ou vazio")
    @NotNull
    private String cor;

    @NotEmpty(message = "Nome do Modelo Não pode ser nulo ou vazio")
    @NotNull
    private String nomeModelo;
}
