//componente de INPUT
import React from 'react';

export const Input = props => {

    const {
        srcImg,
        altImg,
        inputType,
        min,
        max,
        inputName,
        inputPlaceholder,
        value,
        setValue,
        exibirMensagemValidacao = false,
        mensagemValidacao = "",
    } = props;

    return(
        <div>
            <div className='input'>
                { srcImg ? <img className="icones" src={srcImg} alt={altImg}/> : <div/>}
                <input 
                    type={inputType} min={min} max={max} name={inputName} 
                    placeholder={inputPlaceholder}
                    value={value} onChange={evento => setValue(evento.target.value)}
                />
            </div>
            {exibirMensagemValidacao && <p className="mensagemValidacao">{mensagemValidacao}</p>}
        </div>
    );
}