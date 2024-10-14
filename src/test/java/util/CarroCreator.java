package util;

import domain.carro.Carro;

import java.time.LocalDateTime;

public class CarroCreator {

    public static Carro createCarroTobeSaved(){
        return Carro.builder()
                .cor("Azul")
                .combustivel("Gasolina")
                .ano(2023)
                .numPortas(3)
                .timestamp_cadastro(LocalDateTime.now())
                .id(125L)
                .build();
    }

    public static Carro createCarroValid(){
        return Carro.builder()
                .cor("Azul")
                .combustivel("Gasolina")
                .ano(2023)
                .numPortas(3)
                .timestamp_cadastro(LocalDateTime.now())
                .id(125L)
                .build();
    }

    public static Carro createCarroValidUpdate(){
        return Carro.builder()
                .cor("Azul")
                .combustivel("Gasolina")
                .ano(2023)
                .numPortas(3)
                .timestamp_cadastro(LocalDateTime.now())
                .id(125L)
                .build();
    }
}
