import React from 'react';
import { Headers } from '../components/Headers';

export const Perfil= () => {

    return (
        <div className='container-generic'>
           <Headers />
           <div className='container-perfil'>
               <div className='container-skins'>
                   <h3>Skins</h3>
                   <h4>Onça</h4>
                   <h4>Cachorro</h4>
                </div>
            <div className='container-moedas'>
                <h3>Moedas</h3>
            </div>

           </div>
        </div>
    );
}