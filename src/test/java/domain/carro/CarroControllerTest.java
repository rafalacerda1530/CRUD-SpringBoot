package domain.carro;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import util.CarroCreator;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
class CarroControllerTest {
    @InjectMocks
    private CarroController carroController;
    @Mock
    private  CarroService carroServiceMock;

    @BeforeEach
    void setup(){
        List<Carro> carroPage =  List.of(CarroCreator.createCarroValid()))
        BDDMockito.when(carroServiceMock.listAll())
                .thenReturn(carroPage);
    }
    
    @Test
    @DisplayName("Retorno das listas de carro")
    void testReturnListOdCarros(){
        String expectedName = CarroCreator.createCarroValid().getAno();
        
        List<Carro> carroList = carroController.listaAll().getBody();

    }
}