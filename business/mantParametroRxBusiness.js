const e = require('express');
const request					= require('request-promise-native');  
const genericaTxDao				= require('../dao/GenericaTxDao'); 
const genericaRxDao				= require('../dao/GenericaRxDao'); 
const utils 					= require('../utils/utils'); 
 
/**
 * @description Función que permite consultar tabla Maestra
 * @creation David Villanueva 30/11/2020
 * @update
 */
exports.consultarParametro = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
		 //Verificamos si ya exista la tabla
		 var oFiltroTabla = {};
		 oFiltroTabla.sCodigoTabla  = req.query.sCodigoTabla;
		 oFiltroTabla.sCodigo 		= req.query.sCodigo;
		 oFiltroTabla.sTipo		     = "C";
		 var consultarTablaResponse =  await genericaRxDao.consultarGenerica(oFiltroTabla);
		 if(consultarTablaResponse.iCode !== 1){
			throw new Error(consultarTablaResponse.iCode + "||" + consultarTablaResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarTablaResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 