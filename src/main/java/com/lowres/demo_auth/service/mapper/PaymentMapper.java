package com.lowres.demo_auth.service.mapper;

import org.mapstruct.Mapper;

import com.lowres.demo_auth.model.Payment;
import com.lowres.demo_auth.service.dto.PaymentDTO;

@Mapper(componentModel = "spring", uses = { SupplyMapper.class })
public interface PaymentMapper extends EntityMapper<PaymentDTO, Payment> {

}
