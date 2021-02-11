// React imports
import React, { Component } from 'react';

import '../../../styles/main/user/accessOrganizer.scss';

class OrganizersAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      organizerGames: [],
      gameSelect: false,
    };
  }
  async submitAccess() {
    event.preventDefault();
    var token = document.getElementById('token-input').value;
    const submitAccess = await fetch(`organizer/access/${token}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.alert) {
          alert(data.alert);
        } else {
          if (data.game[1]) {
            for (const prop in data) {
              console.log(prop);
              sessionStorage.setItem(`${prop}`, data[prop]);
            }
            this.setState({
              organizerGames: data.game,
              gameSelect: true,
            });
          } else {
            for (const prop in data) {
              console.log(prop);
              sessionStorage.setItem(`${prop}`, data[prop]);
            }
            location.href = `#/${data.game[0][0]}-organizer`;
          }
        }
      });
  }
  // Right Menu Functions
  componentDidMount() {}

  componentWillUnmount() {
    // Materialice Modal init
    //location.reload();
  }

  render() {
    if (this.state.gameSelect) {
      return (
        <div id='organizer-access-wrapper' className='organizer-access-wrapper'>
          <div id='access-wrapper' className='access-wrapper'>
            <div id='access-box' className='access-box'>
              <label id='token-tittle' className='token-tittle'>
                Selecciona el juego
              </label>
              <div id='game-list' className='game-list'>
                {this.state.organizerGames.map((obj, index) => {
                  console.log(obj);
                  return (
                    <button
                      id={`gameButton-${index}`}
                      src={`${obj[1]}`}
                      key={index}
                      className='gameButton'
                      onClick={() => {
                        location.href = `#/${obj[0]}-organizer`;
                      }}>
                      <img
                        id={`gameImg-${index}`}
                        src={`${obj[1]}`}
                        key={`${index}-img`}
                        className='gameImg'
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id='organizer-access-wrapper' className='organizer-access-wrapper'>
          <div id='access-wrapper' className='access-wrapper'>
            <div id='access-box' className='access-box'>
              <label id='token-tittle' className='token-tittle'>
                Acceso al panel de organizador
              </label>
              <form id='form-token' className='form-token'>
                <label
                  id='label-token'
                  className='label-token'
                  htmlFor='label-token'>
                  TOKEN
                </label>
                <div id='input-wrapper-token' className='input-wrapper-token'>
                  <input
                    id='token-input'
                    className='token-input'
                    type='text'
                    placeholder='Ingrese su token'
                    autoComplete='off'
                  />
                  <button
                    id='btn-form-submit-token'
                    className='btn-form-submit-token'
                    onClick={() => this.submitAccess()}>
                    ACCEDER
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default OrganizersAccess;
