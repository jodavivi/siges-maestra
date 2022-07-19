const generica = require('../modelBd/Generica'); 
const utils = require('./utils/utils'); 
const config = require('../config/config.json');  

exports.consultarGenerica = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroTabla = {}; 
        oFiltroTabla.where ={}; 
        if(oFiltro.sCodEmpresa !== undefined){
            oFiltroTabla.where.CodEmpresa  = oFiltro.sCodEmpresa; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroTabla.where.Id  = oFiltro.iId; 
        } 
        if(oFiltro.sCodigoTabla !== undefined){
            oFiltroTabla.where.CodigoTabla  = oFiltro.sCodigoTabla; 
        } 
        if(oFiltro.sTipo !== undefined){
            oFiltroTabla.where.Tipo  = oFiltro.sTipo; 
        } 
        if(oFiltro.sCodigo !== undefined){
            oFiltroTabla.where.Codigo  = oFiltro.sCodigo; 
        }
        if(oFiltro.aListaCodigoTabla !== undefined 
            && oFiltro.aListaCodigoTabla !== null
                && oFiltro.aListaCodigoTabla.length > 0){
            oFiltroTabla.where.CodigoTabla  = oFiltro.aListaCodigoTabla; 
        }
        if(oFiltro.iEstadoCampoId !== undefined){
            oFiltroTabla.where.EstadoCampoId  = oFiltro.iEstadoCampoId; 
        }
        oFiltroTabla.where.EstadoId     = 1; 
        const consultarTablaResponse = await  generica.findAll(oFiltroTabla); 
        if(consultarTablaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarTablaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de la Maestra o Parametros'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: generica, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}