//componente de INPUT
import React from 'react';

export const Input = props => {

    const {
        srcImg,
        altImg,
        inputType,
        inputName,
        inputPlaceholder,
        value,
        setValue
    } = props;

    return(
        <div className='input'>
            <input 
                type={inputType} name={inputName} 
                placeholder={inputPlaceholder}
                value={value} onChange={evento => setValue(evento.target.value)}
            />
        </div>
    );
}