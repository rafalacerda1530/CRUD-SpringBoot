package domain.carro.mapper;

import domain.carro.Carro;
import domain.carro.RequestBody.RequestBodyPostCarro;
import domain.carro.RequestBody.RequestBodyUpdateCarro;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public abstract class CarroMapper {
    public static final CarroMapper INSTANCE = Mappers.getMapper(CarroMapper.class);

    public abstract Carro toCarro(RequestBodyPostCarro requestBodyPostCarro);

    public abstract void updateCarroFromDto(RequestBodyUpdateCarro requestBodyUpdateCarro, @MappingTarget Carro carro);
}
