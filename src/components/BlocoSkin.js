//componente de bloco de skins
import React from 'react';

export const Bloco = props => {

    const {
        srcImg,
        altImg,
        nomeSkin,
        acaoEquipar,
        textoBtn
      
    } = props;

    return(
        <div className='skin'>
            <img src={srcImg} alt={altImg}></img>
            <h4>{nomeSkin}</h4>
            <button className='botao-equipar'  onClick={acaoEquipar}>{textoBtn}</button>
        </div>
    );
}




