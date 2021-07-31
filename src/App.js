import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cotizacion from './components/Cotizacion';

import Formulario from './components/Formulario';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media( min-width: 992px ){
    display: grid;
    grid-template-columns: repeat( 2, 1fr );
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

const App = ()=> {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [ resultado, guardarResultado ] = useState({});
  const [cargando, guardarCargando] = useState(false);
  useEffect(() => {
    const cotizarCriptomoneda = async ()=>{
      if (moneda === '') return null
      const your_api_key = '1008b3bf21dc36dd5a5bff1d4da8b7531fbb462d4456b2e1d613a65eda352e2e';
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${your_api_key}`;
      const resultado = await axios(url);
      guardarCargando(true);

      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    }
    cotizarCriptomoneda();
  }, [moneda, criptomoneda])


  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />
  return (
      <Contenedor>
        <div>
          <Imagen src="/cryptomonedas.png" alt="cripto" />
        </div>
        <div>
          <Heading>Cotizador de Criptomonedas al Instante</Heading>
          <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
          />
          
          {componente}
        </div>
      </Contenedor>
  );
}

export default App;
