import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
    const [ListaCripto, guardarListaCripto] = useState([]);
    const [error, guuardarError] = useState(false);

    const MONEDAS = [
        {codigo:'USD', nombre: 'Dolar De Estados Unidos'},
        {codigo:'GTQ', nombre: 'Quetzal Guatemalteco'},
        {codigo:'MXN', nombre: 'Peso Mexicano'},
        {codigo:'EUR', nombre: 'Euro'},
        {codigo:'GBP', nombre: 'Libra Esterlina'},

    ];
    //custom hook
    const [ moneda , SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS);
    const [ criptomoneda, SelectCriptomoneda ] = useCriptomoneda('Elige tu Criptomoneda', '', ListaCripto);
    useEffect(()=>{
        const consultarAPI = async ()=> {
            const your_api_key = '1008b3bf21dc36dd5a5bff1d4da8b7531fbb462d4456b2e1d613a65eda352e2e'
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
            const resultado = await axios.get(url)
            guardarListaCripto(resultado.data.Data);
        }
        consultarAPI();
    },[])

    //onSubmit
    const cotizarMoneda = ( e ) => {
        e.preventDefault();
        //validar campos
        if (moneda === '' || criptomoneda === '') {
            guuardarError(true);
            return
        }
        guuardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }
    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error  mensaje='Todos los campos son Obligatorios' /> : null}
            <SelectMonedas />
            
            <SelectCriptomoneda />

            <Boton
                type='submit' 
                value='Calcular'
            />
        </form>
    )
}

export default Formulario
