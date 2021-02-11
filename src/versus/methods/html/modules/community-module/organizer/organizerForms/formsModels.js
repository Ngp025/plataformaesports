import React from 'react';
import moment from 'moment';

import gamesList from '../../../../../../../jsons/gamesList.json';
/* 1- CONFIGURACION GENERAL
ETIQUETADO - IDO + GAME
NOMBRE DE TORNEO
PREMIO
GANADORES MAXIMO
DIA Y MES DE INICIO
DURACION
IMAGEN O VIDEO 
PLATAFORMA

DESCRIPCION <-- Agregar futuro cercano
*/

/* HORA DE INICIO DE TORNEO 
<div className='form-group'>
    <label htmlFor='tStart'>Hora</label>
    <input
        id='input-form-tStart'
        name='tStart'
        type='time'
        placeholder='comienzo del torneo'
    />
</div> */
/* ------------------------------------------------------------------ */

// AGREGAR LA CANTIDAD DE GANADORES AL FORMULARIO

function singleForm(game, selectInit) {
  //console.log('AQUI TOYYYYYYYYYY')
  selectInit('createForm');
  return (
    <form
      id='single-Form'
      role='form'
      action='/api/organizer'
      method='POST'
      encType='multipart/form-data'>
      {/* ETIQUETADO - IDO + GAME + CUSTOMER */}
      <div id='div-IDO' className='form-group' htmlFor='input-IDO'>
        <input
          id='input-IDO'
          name='IDO'
          type='hidden'
          value={sessionStorage._id}
        />
      </div>
      <div id='div-wallpaper' className='form-group' htmlFor='input-wallpaper'>
        {console.log(gamesList[game].organizerDefaultImg)}
        <input
          id='input-wallpaper'
          name='wallpaper'
          type='hidden'
          value={gamesList[game].organizerDefaultImg}
        />
      </div>
      <div id='div-game' className='form-group' htmlFor='input-game'>
        <input id='input-game' name='game' type='hidden' value={game} />
      </div>
      <div id='div-customer' className='form-group' htmlFor='input-customer'>
        <input
          id='input-customer'
          name='customer'
          type='hidden'
          value={sessionStorage.customer}
        />
      </div>
      {/* ------------------------------------------------------------------ */}

      {/* NOMBRE DE TORNEO */}
      <div id='div-tName' className='form-group'>
        <label id='label-tName' htmlFor='input-tName'>
          Nombre del torneo
        </label>
        <input //onChange={this.setInfoTorneo}
          id='input-tName'
          name='tName'
          type='text'
          placeholder='Nombre del torneo'
          //value={this.state.tournamentAward}
        />
      </div>
      {/* ------------------------------------------------------------------ */}

      {/* PREMIO */}
      <div id='div-tournamentAward' className='form-group'>
        <label id='label-tournamentAward' htmlFor='input-tournamentAward'>
          Premio
        </label>
        <input //onChange={this.setInfoTorneo}
          id='input-tournamentAward'
          name='tAward'
          type='number'
          min='1'
          placeholder='premio'
          //value={this.state.tournamentAward}
        />
      </div>
      {/* ------------------------------------------------------------------ */}

      {/* GANADORES MAXIMO */}
      <div id='div-gMax' className='form-group-gMax'>
        <label hidden id='label-gMax' htmlFor='select-gMax'>
          Cantidad de ganadores
        </label>
        <select id='select-gMax' name='gMax'>
          <option id='disable-select-gMax' disabled>
            Selecciona cuantos ganadores buscas.
          </option>
          <option id='4-select-weeksDuration' value='4'>
            4
          </option>
          <option id='3-select-weeksDuration' value='3'>
            3
          </option>
          <option id='2-select-weeksDuration' value='2'>
            2
          </option>
          <option id='1-select-weeksDuration' value='1'>
            1
          </option>
        </select>
      </div>
      {/* ------------------------------------------------------------------ */}

      {/* DIA Y MES DE INICIO 
      <div id='div-tDate' className='form-group-tDate'>
        <label id='label-tDate' htmlFor='input-tDate'>
          Inicio de Torneo
        </label>
        <input
          id='input-tDate'
          name='tDate'
          type='date'
          placeholder='Inicio del torneo'
          min={actualDate}
          max='2021-12-31'
        />
      </div>
      */}
      {/* ------------------------------------------------------------------ */}

      {/* DURACION EN SEMANAS */}
      <div id='div-weeksDuration' className='form-group-weeksDuration'>
        <label id='label-weeksDuration' htmlFor='select-weeksDuration'>
          Duraracion del Torneo en Semanas
        </label>
        <select id='select-weeksDuration' name='weeksDuration'>
          <option id='disable-select-weeksDuration' disabled>
            ¿Cuantas semanas de competencia tiene tu torneo?
          </option>
          <option id='8-select-weeksDuration' value='8'>
            8
          </option>
          <option id='4-select-weeksDuration' value='4'>
            4
          </option>
          <option id='2-select-weeksDuration' value='2'>
            2
          </option>
          <option id='1-select-weeksDuration' value='1'>
            1
          </option>
        </select>
      </div>
      {/* ------------------------------------------------------------------ */}

      {/* REGION */}
      <div id='div-region' className='form-group-region'>
        <label id='label-region' htmlFor='select-region'>
          Region
        </label>
        <select id='select-region' name='serverSelected'>
          <option id='disable-select-region' disabled>
            Selecciona la region
          </option>
          <option id='chile-select-region' value='CHILE'>
            CHILE
          </option>
          <option id='argentina-select-region' value='ARGENTINA'>
            ARGENTINA
          </option>
          <option id='brazil-select-region' value='BRAZIL'>
            BRAZIL
          </option>
        </select>
      </div>
      {/* ------------------------------------------------------------------ */}

      {/* PLATAFORMA */}
      <div id='div-form-plataform' className='form-group-plataform'>
        <label id='label-form-plataform' htmlFor='tPlataform'>
          Plataforma
        </label>
        <input //onChange={this.setInfoTorneo}
          id='tPlataform'
          name='tPlataform'
          type='text'
          placeholder='Escriba plataformas que admite'
          //value={this.state.tournamentAward}
        />
      </div>
      {/* ------------------------------------------------------------------ */}
      {/* MEDIA IMAGEN O VIDEO*/}
      {/*<div className='form-group'>
                <div className='custom-file'>
                    <input
                        type='file'
                        name='image'
                        id='inputGroupFile01'
                        aria-describedby='inputGroupFileAddon01'
                    />
                    <label htmlFor='inputGroupFile01'></label>
                </div>
            </div>*/}
      {/* ------------------------------------------------------------------- */}

      <button
        id='button-crearTorneo'
        name='submit-btn'
        className='btn'
        type='submit'>
        Crear torneo!
      </button>
    </form>
  );
}

function formsModels(game, selectInit) {
  switch (game) {
    case 'fifa20':
      return singleForm(game, selectInit);
      break;
    case 'pes20':
      return singleForm(game, selectInit);
      break;
    default:
      return singleForm(game, selectInit);
      break;
  }
}

export default formsModels;
