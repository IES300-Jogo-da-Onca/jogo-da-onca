//componente de bloco de skins
import React from 'react';

export const Bloco = props => {

    const {
        srcImg,
        altImg,
        nomeSkin,
        acaoEquipar
      
    } = props;

    return(
        <div className='bloco-skin'>
            <img src={srcImg} alt={altImg}></img>
            <p>{nomeSkin}</p>
            <button className='botao-equipar' onClick={acaoEquipar}>Equipar</button>
        </div>
    );
}



