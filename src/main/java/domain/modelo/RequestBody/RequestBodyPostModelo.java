package domain.modelo.RequestBody;

import java.math.BigDecimal;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestBodyPostModelo {

    @NotEmpty(message = "O nome não pode ser nulo ou vazio")
    private String nome;

    @NotNull(message = "O valor Fipe não pode ser nulo.")
    private BigDecimal valorFipe;

    @NotEmpty(message = "O nome da marca não pode ser nulo ou vazio")
    private String nomeMarca;
}
