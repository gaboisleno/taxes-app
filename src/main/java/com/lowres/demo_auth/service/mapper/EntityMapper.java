package com.lowres.demo_auth.service.mapper;

import java.util.List;

import org.springframework.data.domain.Page;

public interface EntityMapper<D, E> {

    E toEntity(D dto);

    D toDto(E entity);

    List<E> toEntity(List<D> dtoList);

    List<D> toDto(List<E> entityList);

    Page<D> toDto(Page<E> entityPage);
}
