const e = require('express');
const request					= require('request-promise-native');  
const genericaTxDao				= require('../dao/GenericaTxDao');  
const utils 					= require('../utils/utils'); 
 
/**
 * @description Función que permite registrar un parametro a la Maestra
 * @creation David Villanueva 02/12/2020
 * @update
 */
exports.registrarParametro = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 //Registramos el parametro
		 var oTabla = {};
		 oTabla.oAuditRequest = oRequest.oAuditRequest;
		 oTabla.oData		  = oRequest.oData;
		 oTabla.oData.sTipo	  = "C";
		 oTabla.oData.sFuente = "APP"; 
		 const crearGenericaResponse = await  genericaTxDao.crearGenerica(oTabla);
		 if(crearGenericaResponse.iCode !== 1){
			throw new Error(crearGenericaResponse.iCode + "||" + crearGenericaResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};


/**
 * @description Función que permite actualizar una tabla Maestra
 * @creation David Villanueva 01/12/2020
 * @update
 */
exports.actualizarParametro = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		console.log("INGRESAAAAAAAAaaaaa");
		oRequest		 = utils.customRequest(req);
		//actualizamos la tabla
		var oTabla = {};
		oTabla.oAuditRequest  = oRequest.oAuditRequest;
		oTabla.oData		  = oRequest.oData; 
		oTabla.oData.iId	  = parseInt(req.params.id, 10); 
		const actualizarGenericaResponse = await  genericaTxDao.actualizarGenerica(oTabla);
		if(actualizarGenericaResponse.iCode !== 1){
		   throw new Error(actualizarGenericaResponse.iCode + "||" + actualizarGenericaResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= oTabla.oData
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

/**
 * @description Función que permite eliminar una tabla Maestra
 * @creation David Villanueva 02/12/2020
 * @update
 */
exports.eliminarParametro = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//actualizamos la tabla
		oRequest.oData.aItems.forEach(async function(e){
			var oTabla = {};
			oTabla.oAuditRequest  = oRequest.oAuditRequest;
			oTabla.oData		  = e;  
			const eliminarGenericaResponse = await  genericaTxDao.eliminarGenerica(oTabla);
			if(eliminarGenericaResponse.iCode !== 1){
			throw new Error(eliminarGenericaResponse.iCode + "||" + eliminarGenericaResponse.sMessage);
			} 
		});
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};
