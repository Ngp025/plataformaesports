import React, { createContext, useState, useEffect } from 'react';
const context = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const x = false;
  useEffect(() => {
    fetch('/user')
      .then((res) => res.json())
      .then((res) => setUser(res))
      .catch((err) => {
        //console.log(err);
      });
  }, []);
  //esto es una herramienta de loader donde se envia la info de la funcion a un array
  //sin dependencia evitando la carga de dom gracias a que no se guarda en props y trabajando con el server de express
  //donde se monta y desmonta
  if (x) {
    return <context.Provider value={[]}>{children}</context.Provider>;
  } else {
    return <context.Provider value={user}>{children}</context.Provider>;
  }
};

UserProvider.context = context;

export default UserProvider;
