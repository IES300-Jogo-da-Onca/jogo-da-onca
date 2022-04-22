import React from 'react';
import { Headers } from '../components/Headers';

export const Loja= () => {

    return (
        <div className='container-generic'>
           <Headers />
           <div className='bodyLoja'>
                <div className='oncaSkins'>
                    Onça Works
                </div>
                <div className='cachorroSkins'>
                    Cachorro Works
                </div>
           </div>
        </div>
    );
}