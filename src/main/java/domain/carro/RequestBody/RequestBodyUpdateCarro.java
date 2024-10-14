package domain.carro.RequestBody;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RequestBodyUpdateCarro {

    @NotEmpty (message = "ID Não pode ser nulo ou vazio")
    @NotNull
    private Long id;

    @NotEmpty (message = "ano Não pode ser nulo ou vazio")
    @NotNull
    private int ano;

    @NotEmpty (message = "combustivel Não pode ser nulo ou vazio")
    @NotNull
    private String combustivel;

    @NotEmpty (message = "portas Não pode ser nulo ou vazio")
    @NotNull
    private int numPortas;

    @NotEmpty (message = "cor Não pode ser nulo ou vazio")
    @NotNull
    private String cor;
}
