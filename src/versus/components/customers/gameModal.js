import React from 'react';

function gameModal(tournamentsInfo, openLogin) {
  return (
    <div
      id='gamesModal'
      className='modal gamesModal modal-fixed-footer'
      style={{
        //margin: '0 auto !important',
        //overflowX: `scroll`,
        overflow: 'scroll',
      }}>
      <div
        id='cards-wrapper'
        className='cards-wrapper'
        style={{ width: `${tournamentsInfo.length * 262}px` }}>
          <i 
            id='close-login-modal'
            style={{color: "white", position: "absolute", top: 0, right: 0}} 
            className='modal-close material-icons'>
            clear
          </i>
        {tournamentsInfo === 'load' || tournamentsInfo === undefined
          ? ''
          : tournamentsInfo.map((obj, index) => {
              var responseData = obj.responseData;
              var gameListData = obj.gameListData;
              return (
                <div
                  id={`${responseData.gameKey}-card-box`}
                  key={index}
                  className={`${responseData.gameKey}-card-box gameCard`}
                  data-tooltip={`${responseData.gameKey}`}>
                  <label
                    id={`${responseData.gameKey}-label`}
                    className={`${responseData.gameKey}-label`}>
                    {gameListData.displayName}
                  </label>
                  <div
                    id={`${responseData.gameKey}`}
                    className={`${responseData.gameKey}-card`}
                    style={{
                      background: `url(${gameListData.defaultImg})`,
                      backgroundPosition: '50% 20%',
                    }}
                    name={responseData.IDTs}
                    onClick={() => {
                      if (localStorage.userData) {
                        if (localStorage.isValidate === 'false') {
                          openLogin(true);
                        } else {
                          if (responseData.IDTs[0] === undefined) {
                            alert(
                              'Disculpe todavia no estan abiertas las inscripciones de este torneo'
                            );
                          } else {
                            if (responseData.IDTs.length > 2) {
                              alert(
                                'hey parece que hay mas de un torneo creado'
                              );
                              location.href = `#/${responseData.gameKey}-tournament/-t_${responseData.IDTs[0]}`;
                            } else {
                              location.href = `#/${responseData.gameKey}-tournament/-t_${responseData.IDTs[0]}`;
                            }
                          }
                        }
                      } else {
                        openLogin();
                      }
                    }}></div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
export default gameModal;
