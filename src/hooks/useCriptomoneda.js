import React, { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;
const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useCriptomoneda = ( label, stateInicial, opciones ) => {
    const [state, actualizarState] = useState(stateInicial);
    
    const SeleccionarCriptomoneda = ()=> (
        <>
            <Label htmlFor="Criptomoneda">{label}</Label>
            <Select 
                onChange={ e => actualizarState(e.target.value) } 
                value={state}
                id="Criptomoneda"
            >
                <option value="">-- Selecciona una Criptomoneda --</option>
                {opciones.map( opcion =>(
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </>
    )
    return [
        state,
        SeleccionarCriptomoneda
    ]
}

export default useCriptomoneda
