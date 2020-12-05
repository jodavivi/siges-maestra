const Sequelize =  require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('generica', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    EstadoId            : Sequelize.INTEGER,
    UsuarioCreador      : Sequelize.STRING(64),
    FechaCreacion       : Sequelize.DATE,
    TerminalCreacion    : Sequelize.STRING(64),
    UsuarioModificador  : Sequelize.STRING,
    FechaModificacion   : Sequelize.DATE,
    TerminalModificador : Sequelize.STRING(64),
    TransaccionId       : Sequelize.STRING(64),
    Codigo              : Sequelize.STRING(16),
    CodigoTabla         : Sequelize.STRING(64),
    DescripcionTabla    : Sequelize.STRING(128),
    Campo1              : Sequelize.STRING(1024),
    Campo2              : Sequelize.STRING(1024),
    Campo2              : Sequelize.STRING(1024),
    Campo3              : Sequelize.STRING(1024),
    Campo4              : Sequelize.STRING(1024),
    Campo5              : Sequelize.STRING(1024),
    Campo6              : Sequelize.STRING(1024),
    Campo7              : Sequelize.STRING(1024),
    Campo8              : Sequelize.STRING(1024),
    Campo9              : Sequelize.STRING(1024),
    Campo10             : Sequelize.STRING(1024), 
    Orden               : Sequelize.INTEGER,
    Fuente              : Sequelize.STRING(8),
    Tipo                : Sequelize.STRING(1), 
    PadreId             : Sequelize.INTEGER,
    EstadoCampo         : Sequelize.INTEGER
} 
,
{
    schema: "sistemas",
});

module.exports = Proyectos;