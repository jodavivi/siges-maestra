const e = require('express');
const request					= require('request-promise-native');  
const genericaTxDao				= require('../dao/GenericaTxDao'); 
const genericaRxDao				= require('../dao/GenericaRxDao'); 
const utils 					= require('../utils/utils'); 
const config 					= require('../config/config.json');  
 
/**
 * @description Función que permite registrar una tabla Maestra
 * @creation David Villanueva 30/11/2020
 * @update
 */
exports.registrarTabla = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req);
		 var oEmpresa =  JSON.parse(oRequest.oAuditRequest.oEmpresa);
		 //Verificamos si ya exista la tabla
		 var oFiltroTabla = {};
		 oFiltroTabla.sCodigoTabla = oRequest.oData.sCodigoTabla;
		 oFiltroTabla.sTipo		   = "T";
		 var consultarTablaResponse =  await genericaRxDao.consultarGenerica(oFiltroTabla);
		 if(consultarTablaResponse.iCode !== 2){
			throw new Error(3 + "||" + "La Tabla: "+oRequest.oData.sCodigoTabla +", ya existe.");
		 }
		 //Registramos la tabla
		 var oTabla = {};
		 oTabla.oAuditRequest = oRequest.oAuditRequest;
		 oTabla.oData		  = oRequest.oData;
		 oTabla.oData.sTipo	  = "T";
		 oTabla.oData.sFuente = "APP"; 
		 //if(oRequest.oData.iEstadoCampoId === 1){
		 oTabla.oData.iEstadoCampoId = config.idEstadoActivo;	
		 oTabla.oData.sEstadoCampo   = config.estadoActivo;
		 //}else{
			//oTabla.oData.sEstadoCampo = config.estadoDesactivo;
		 //}
		 oTabla.oData.sCodEmpresa = oEmpresa.CodEmpresa;
		 oTabla.oData.sEmpresa = oEmpresa.RazonSocial;
		 const crearTablaResponse = await  genericaTxDao.crearGenerica(oTabla);
		 if(crearTablaResponse.iCode !== 1){
			throw new Error(crearTablaResponse.iCode + "||" + crearTablaResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= crearTablaResponse.oData;
		
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
exports.actualizarTabla = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//actualizamos la tabla
		var oTabla = {};
		oTabla.oAuditRequest  = oRequest.oAuditRequest;
		oTabla.oData		  = oRequest.oData; 
		oTabla.oData.iId	  = parseInt(req.query.iId, 10); 
		const actualizarTablaResponse = await  genericaTxDao.actualizarGenerica(oTabla);
		if(actualizarTablaResponse.iCode !== 1){
		   throw new Error(actualizarTablaResponse.iCode + "||" + actualizarTablaResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarTablaResponse.oData;
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
exports.eliminarTabla = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);

		//COnsultamos la tabla 
		var oFiltroTabla = {}; 
		oFiltroTabla.iId 		   = parseInt(req.query.iId, 10); 
		oFiltroTabla.sTipo		   = "T";
		var consultarTablaResponse =  await genericaRxDao.consultarGenerica(oFiltroTabla);
		if(consultarTablaResponse.iCode !== 1){
		   throw new Error(consultarTablaResponse.iCode + "||" + consultarTablaResponse.sMessage);
		}
 
		//Eliminamos la tabla y sus parametros
		var oTabla = {};
		oTabla.oAuditRequest  		= oRequest.oAuditRequest;
		oTabla.oData		  		= oRequest.oData; 
		oTabla.oData.sCodigoTabla	= consultarTablaResponse.oData[0].CodigoTabla; 
		const eliminarGenericaxTablaResponse = await  genericaTxDao.eliminarGenericaxTabla(oTabla);
		if(eliminarGenericaxTablaResponse.iCode !== 1){
		   throw new Error(eliminarGenericaxTablaResponse.iCode + "||" + eliminarGenericaxTablaResponse.sMessage);
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

