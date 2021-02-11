import React, { useContext, useState } from 'react';
import UserProvider from './contexts/UserProvider';
//import _ from 'lodash'

const PassportProfile = () => {
  const userData = useContext(UserProvider.context);
  const options = Object.keys(userData).filter((key) => {
    return userData[key] !== null;
  });
  const load = function storageData() {
    //console.log(UserProvider.context, `UserProvider.context`)
    //console.log(userData, `user Data del archivo passportProfile `)
    if (userData.id) {
      var provider = userData.provider;
      var jsonPass = userData._json;
      localStorage.setItem('name', jsonPass.name),
        localStorage.setItem('picture', jsonPass.picture),
        localStorage.setItem('provider', provider),
        localStorage.setItem('language', jsonPass.language),
        //console.log(userData, `este userData`)
        fetch('users/registerPass', {
          method: 'POST',
          body: JSON.stringify({ jsonPass, provider }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((json) =>
            localStorage.setItem(
              'userData',
              JSON.stringify(json),
              sessionStorage.setItem('userSession', JSON.stringify(json))
            )
          );
      //localStorage.setItem('userData', JSON.stringify(userData))
      //sessionStorage.setItem('userSession', JSON.stringify(userData))
    }
  };
  load();
  return <span id='passportProfile'></span>;
};

export default PassportProfile;
