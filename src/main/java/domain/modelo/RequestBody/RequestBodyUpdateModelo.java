package domain.modelo.RequestBody;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RequestBodyUpdateModelo {

    @NotNull(message = "ID Não pode ser nulo")
    private Long id;

    @NotEmpty(message = "Nome não pode ser nulo ou vazio")
    private String nome;

    @NotNull(message = "Valor Fipe não pode ser nulo")
    private BigDecimal valorFipe;

    @NotEmpty(message = "O nome da marca não pode ser nulo ou vazio")
    private String nomeMarca;
}
