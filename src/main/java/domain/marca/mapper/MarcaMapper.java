package domain.marca.mapper;

import domain.marca.Marca;
import domain.marca.RequestBody.RequestBodyPostMarca;
import domain.marca.RequestBody.RequestBodyUpdateMarca;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public abstract class MarcaMapper {
    public static final MarcaMapper INSTANCE = Mappers.getMapper(MarcaMapper.class);

    public abstract Marca toMarca(RequestBodyPostMarca requestPostMarca);

    public abstract void UpdateMarcaFromDto(RequestBodyUpdateMarca requestBodyUpdateMarca, @MappingTarget Marca marca);

}
