package com.lowres.demo_auth.service.mapper;

import org.mapstruct.Mapper;

import com.lowres.demo_auth.model.Supply;
import com.lowres.demo_auth.service.dto.SupplyDTO;

@Mapper(componentModel = "spring")
public interface SupplyMapper extends EntityMapper<SupplyDTO, Supply> {

}
