const generica = require('../modelBd/Generica'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear tabla 
 * @creation David Villanueva 01/12/2020
 * @update
 */
exports.crearGenerica = async function (oParam) { 
    const oResponse = {};
    try {
        var seqGenerica = "'" +config.seqGenerica +"'";
        var seq = await utilsDao.obtenetSequencia(seqGenerica);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oTabla = {};
        oTabla.Id               = parseInt(seq.oData, 10);
        oTabla.EstadoId         = 1;
        oTabla.UsuarioCreador   = oParam.oAuditRequest.sUsuario;
        oTabla.FechaCreacion    = new Date(oParam.oAuditRequest.dFecha);
        oTabla.TerminalCreacion = oParam.oAuditRequest.sTerminal;
        oTabla.Codigo           = utilsGen.generarCodigo(seq.oData,6,oParam.oData.sTipo);
        oTabla.CodigoTabla      = oParam.oData.sCodigoTabla;
        oTabla.DescripcionTabla = oParam.oData.sDescripcionTabla;
        oTabla.Campo1           = oParam.oData.sCampo1;
        oTabla.Campo2           = oParam.oData.sCampo2;
        oTabla.Campo3           = oParam.oData.sCampo3;
        oTabla.Campo4           = oParam.oData.sCampo4;
        oTabla.Campo5           = oParam.oData.sCampo5;
        oTabla.Campo6           = oParam.oData.sCampo6;
        oTabla.Campo7           = oParam.oData.sCampo7;
        oTabla.Campo8           = oParam.oData.sCampo8;
        oTabla.Campo9           = oParam.oData.sCampo9;
        oTabla.Campo10          = oParam.oData.sCampo10;
        oTabla.Orden            = oParam.oData.iOrden;
        oTabla.Fuente           = oParam.oData.sFuente;
        oTabla.Tipo             = oParam.oData.sTipo;
        oTabla.EstadoCampoId    = oParam.oData.iEstadoCampoId;
        oTabla.EstadoCampo      = oParam.oData.sEstadoCampo;
        oTabla.PadreId          = oParam.oData.iPadreId;
        oTabla.PadreCod         = oParam.oData.sPadreCod;
        const crearTablaPromise = await generica.create(oTabla);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oTabla;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: generica, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar tabla 
 * @creation David Villanueva 01/12/2020
 * @update
 */
exports.actualizarGenerica = async function (oParam) { 
    const oResponse = {};
    try {
        var oTabla = {}; 
        oTabla.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oTabla.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oTabla.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        if(oParam.oData.sDescripcionTabla !== undefined){
            oTabla.DescripcionTabla     = oParam.oData.sDescripcionTabla; 
        }
        if(oParam.oData.sCampo1 !== undefined){
            oTabla.Campo1     = oParam.oData.sCampo1; 
        }
        if(oParam.oData.sCampo2 !== undefined){
            oTabla.Campo2     = oParam.oData.sCampo2; 
        }
        if(oParam.oData.sCampo3 !== undefined){
            oTabla.Campo3     = oParam.oData.sCampo3; 
        }
        if(oParam.oData.sCampo4 !== undefined){
            oTabla.Campo4     = oParam.oData.sCampo4; 
        }
        if(oParam.oData.sCampo5 !== undefined){
            oTabla.Campo5     = oParam.oData.sCampo5; 
        }
        if(oParam.oData.sCampo6 !== undefined){
            oTabla.Campo6     = oParam.oData.sCampo6; 
        }
        if(oParam.oData.sCampo7 !== undefined){
            oTabla.Campo7     = oParam.oData.sCampo7; 
        }
        if(oParam.oData.sCampo8 !== undefined){
            oTabla.Campo8     = oParam.oData.sCampo8; 
        }
        if(oParam.oData.sCampo9 !== undefined){
            oTabla.Campo9     = oParam.oData.sCampo9; 
        }
        if(oParam.oData.sCampo10 !== undefined){
            oTabla.Campo10     = oParam.oData.sCampo10; 
        }
        if(oParam.oData.iPadreId !== undefined && oParam.oData.iPadreId !== null){
            oTabla.PadreId     = oParam.oData.iPadreId; 
        }else{
            if(oParam.oData.iPadreId === null){
                oTabla.PadreId  = null;
            }
        }
        if(oParam.oData.sPadreCod !== undefined && oParam.oData.sPadreCod !== null){
            oTabla.PadreCod     = oParam.oData.sPadreCod; 
        }else{
            if(oParam.oData.sPadreCod === null){
                oTabla.PadreCod     = null; 
            }
        }
        if(oParam.oData.iEstadoCampoId !== undefined){
            oTabla.EstadoCampoId     = oParam.oData.iEstadoCampoId; 
        }
        if(oParam.oData.sEstadoCampo !== undefined){
            oTabla.EstadoCampo     = oParam.oData.sEstadoCampo; 
        }
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarTablaPromise = await generica.update(oTabla, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oTabla;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: generica, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar tabla 
 * @creation David Villanueva 01/12/2020
 * @update
 */
exports.eliminarGenerica = async function (oParam) { 
    const oResponse = {};
    try {
   
        var oTabla = {}; 
        oTabla.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oTabla.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oTabla.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oTabla.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarTablaPromise = await generica.update(oTabla, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oTabla;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: generica, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar tabla y sus parametros
 * @creation David Villanueva 12/01/2021
 * @update
 */
exports.eliminarGenericaxTabla = async function (oParam) { 
    const oResponse = {};
    try {
   
        var oTabla = {}; 
        oTabla.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oTabla.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oTabla.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oTabla.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.CodigoTabla = oParam.oData.sCodigoTabla;
        const acrualizarTablaPromise = await generica.update(oTabla, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oTabla;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: generica, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}