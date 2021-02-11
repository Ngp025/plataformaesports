function customerUrl(customer){
    switch(customer){
        case "ROSARIO" :
            return "copaciudadrosario";
        case "CIUDAD" : 
            return "ciudadesports";
        case "AMBA" :
            return "ciudadautodromo";
        case "CVT" :
            return "copavenadotuerto";
        default: 
            return "loading";
      }
}

module.exports = customerUrl