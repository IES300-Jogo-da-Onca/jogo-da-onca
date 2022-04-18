//Super Usuário - SKINS
import React from 'react';

export const Skins = () => {
    return (
        <div>
            <h1>Skins</h1>
            <h2>Listar Skins</h2>
            <h2>Atualizar Skin</h2>

            <form className='cadastrar'>
                <h2>Cadastrar Skin</h2>
                <label>Nome da Skin: </label>
                <input type='text'/>
                <br/>
                <label>Arquivo: </label>
                <input className='imgcadastro' type='file' name='cadastro-imagem'/>
                <button>Cadastrar</button>
            </form>
            
            <h2>Deletar Skin</h2>

        </div>
    );
}