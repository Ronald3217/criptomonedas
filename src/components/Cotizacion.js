import React from 'react';
import styled from '@emotion/styled';

const Resultado = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
`;
const Info = styled.p`
    font-size: 18px;
    
    & span {
        font-weight: bold;
    }
`;
const Precio = styled.p`
    font-size: 30px;

    & span {
        font-weight: bold;
    }
`;

const Cotizacion = ({resultado}) => {
    if (Object.keys(resultado).length === 0 ) return null;
    console.log(resultado);
    return (
        <Resultado>
            <Precio>El Precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>El Precio mas alto del dia: <span>{resultado.HIGHDAY}</span></Info>
            <Info>El Precio mas bajo del dia: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variacion ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </Resultado>
    )
}

export default Cotizacion
