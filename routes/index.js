const express = require('express');
const router = express.Router();

const mantTablaTxBusiness       = require('../business/mantTablaTxBusiness');  
const mantTablaRxBusiness       = require('../business/mantTablaRxBusiness'); 
const mantParametroTxBusiness   = require('../business/mantParametroTxBusiness');  
const mantParametroRxBusiness   = require('../business/mantParametroRxBusiness');  

module.exports = function(){

    router.post('/tabla', mantTablaTxBusiness.registrarTabla); 
    router.put('/tabla/:id', mantTablaTxBusiness.actualizarTabla); 
    router.delete('/tabla/:id', mantTablaTxBusiness.eliminarTabla);  
    router.get('/tabla', mantTablaRxBusiness.consultarTabla); 

    router.post('/tabla/:idTabla/parametro', mantParametroTxBusiness.registrarParametro); 
    router.put('/tabla/:idTabla/parametro/:id', mantParametroTxBusiness.actualizarParametro); 
    router.delete('/tabla/:idTabla/parametro', mantParametroTxBusiness.eliminarParametro);  
    router.get('/tabla/:idTabla/parametro', mantParametroRxBusiness.consultarParametro); 
    
    return router;
}

