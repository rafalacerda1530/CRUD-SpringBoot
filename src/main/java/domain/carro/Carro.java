package domain.carro;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import domain.modelo.Modelo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Carro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime timestamp_cadastro;

    @NotNull(message = "ano Não pode ser nulo ou vazio")
    private int ano;

    @NotEmpty(message = "combustivel Não pode ser nulo ou vazio")
    private String combustivel;

    @NotNull(message = "numPortas Não pode ser nulo ou vazio")
    private int numPortas;

    @NotEmpty(message = "cor Não pode ser nulo ou vazio")
    private String cor;

    @ManyToOne
    @JoinColumn(name = "modelo_id", nullable = false)
    @JsonManagedReference
    private Modelo modelo;
}
