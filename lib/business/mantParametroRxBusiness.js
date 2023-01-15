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
	 var oRequest			= null;
     try { 
		oRequest		 = utils.customRequest(req);
		var oEmpresa =  JSON.parse(oRequest.oAuditRequest.oEmpresa);
		
		 //Consultamos información de la tabla
		 var oFiltroTabla 	= {};
		 oFiltroTabla.iId  	= req.query.iIdTabla; 
		 oFiltroTabla.sTipo = "T";
		 oFiltroTabla.sCodEmpresa = oEmpresa.CodEmpresa;
		 var consultarTablaResponse =  await genericaRxDao.consultarGenerica(oFiltroTabla);
		 if(consultarTablaResponse.iCode !== 1){
			throw new Error(consultarTablaResponse.iCode + "||" + consultarTablaResponse.sMessage);
		 } 
		 var oMaestra = consultarTablaResponse.oData[0]; 
		 var oInfoTabla 				 = {};
		 oInfoTabla.oMaestra 			 = oMaestra.toJSON();
		 oInfoTabla.oMaestra.aParametros = [];

		 var oFiltroTabla 			= {};
		 oFiltroTabla.sCodigoTabla  = oMaestra.CodigoTabla; 
		 oFiltroTabla.sTipo		     = "C";
		 var consultarParamResponse =  await genericaRxDao.consultarGenerica(oFiltroTabla);
		 if(consultarParamResponse.iCode < 1){
			throw new Error(consultarParamResponse.iCode + "||" + consultarParamResponse.sMessage);
		 }
		 if(consultarParamResponse.iCode === 1){
			oInfoTabla.oMaestra.aParametros = consultarParamResponse.oData; 
		 }
		  
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= oInfoTabla;
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

/**
 * @description Función que permite consultar tabla Maestra
 * @creation David Villanueva 30/11/2020
 * @update
 */
exports.consultarParametroxFiltro = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {}; 
	var oRequest			= null;
	try { 
		oRequest		 = utils.customRequest(req);
		var oEmpresa =  JSON.parse(oRequest.oAuditRequest.oEmpresa);
		var oFiltroParam 				= {};
		oFiltroParam.sCodEmpresa 		= oEmpresa.CodEmpresa;
		oFiltroParam.sCodigo   			 = req.query.sCodigo; 
		oFiltroParam.iId   				 = req.query.iId; 
		oFiltroParam.iEstadoCampoId		 = req.query.iEstadoCampoId; 
		if(req.query.sListaCodigoTabla !== undefined 
			&& req.query.sListaCodigoTabla !== null){
			  oFiltroParam.sListaCodigoTabla   =  req.query.sListaCodigoTabla;
			  oFiltroParam.aListaCodigoTabla   = req.query.sListaCodigoTabla.split(",");
		
		} 
		
		oFiltroParam.sTipo		   		 = "C";
		var consultarParamResponse =  await genericaRxDao.consultarGenerica(oFiltroParam);
		if(consultarParamResponse.iCode !== 1){
		   throw new Error(consultarParamResponse.iCode + "||" + consultarParamResponse.sMessage);
		}
 
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= consultarParamResponse.oData;
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
 