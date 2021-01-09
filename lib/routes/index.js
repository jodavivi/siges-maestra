const express = require('express');
const router = express.Router();

const mantTablaTxBusiness       = require('../business/mantTablaTxBusiness');  
const mantTablaRxBusiness       = require('../business/mantTablaRxBusiness'); 
const mantParametroTxBusiness   = require('../business/mantParametroTxBusiness');  
const mantParametroRxBusiness   = require('../business/mantParametroRxBusiness');  

module.exports = function(){

    router.post('/tabla', mantTablaTxBusiness.registrarTabla); 
    router.put('/tabla', mantTablaTxBusiness.actualizarTabla); 
    router.delete('/tabla', mantTablaTxBusiness.eliminarTabla);  
    router.get('/tabla', mantTablaRxBusiness.consultarTabla); 

    router.post('/tabla/parametro', mantParametroTxBusiness.registrarParametro); 
    router.put('/tabla/parametro', mantParametroTxBusiness.actualizarParametro); 
    router.delete('/tabla/parametro', mantParametroTxBusiness.eliminarParametro);  
    router.get('/tabla/parametro', mantParametroRxBusiness.consultarParametro); 
    
    return router;
}

