package domain.modelo.mapper;

import domain.modelo.Modelo;
import domain.modelo.RequestBody.RequestBodyPostModelo;
import domain.modelo.RequestBody.RequestBodyUpdateModelo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public abstract class ModeloMapper {

    public static final ModeloMapper INSTANCE = Mappers.getMapper(ModeloMapper.class);

    public abstract Modelo toModelo(RequestBodyPostModelo requestBodyPostModelo);
    public abstract void updateModeloFromDto(RequestBodyUpdateModelo requestBodyUpdateModelo, @MappingTarget Modelo modelo);
}
