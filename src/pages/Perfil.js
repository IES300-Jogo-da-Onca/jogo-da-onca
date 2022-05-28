import React, { useState } from 'react';
import { Bloco } from '../components/BlocoSkin';
import { Headers } from '../components/Headers';
import skinOnca from '../assets/icons/onçaClássicaPeça.svg'
import skinCachorro from '../assets/icons/dogClassicoPeça.svg'
import { executaRequisicao } from '../services/api';

export const Perfil= () => {

    const moedas = '200'
    //const moedas = executaRequisicao('/comprarmoeda', 'GET', { moedas }) //trazendo qtd de moedas que o user tem
    //const skinUser = executaRequisicao('/', 'GET', { skins }) //pegar skins do usuário no banco
    
    return (
        <div className='container-generic'>
           <Headers />
           <div className='container-perfil'>
               <div className='container-skins'>
                   <h3>Minhas Skins</h3>
                   <h4>Onça</h4>
                   <div className='bloco-onca'>
                        
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />

                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinOnca}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                   </div>
                   <h4>Cachorro</h4>
                   <div className='bloco-cachorro'>
                        
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />
                        <Bloco
                            srcImg={skinCachorro}
                            altImg={'imagem da skin'}
                            nomeSkin={'Nome da Skin'}
                            //acaoEquipar={}
                        />

                   </div>
                   
                </div>
                <div className='container-moedas'>
                    <h3>Moedas</h3>
                    <div className='bloco-moedas'>{moedas}</div>
                 </div>

           </div>

       </div>
    );
}