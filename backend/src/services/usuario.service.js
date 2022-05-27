const nodemailer = require('nodemailer');
const { Sequelize, sequelize } = require("./bd.service");
const { UsuarioModel: UsuarioModel } = require("../models/usuario.model");
const { QueryTypes } = require("sequelize");
const mime = require('mime');
const fs = require('file-system');
const jwt = require("../helpers/jwt");
const res = require("express/lib/response");
const { options } = require('pg/lib/defaults');

const list = async(query, pageStart = 0, pageLimit = 10) => {
    let result = await sequelize.query(
        `SELECT * FROM usuarios `)
    result = (result && result[0]) ? result[0] : [];
    return result;
};

const listFilter = async(query, pageStart = 0, pageLimit = 10) => {
    let usuariosResult = await sequelize.query(
        `SELECT * FROM usuarios WHERE (UPPER(usu_nombre) LIKE :q
                                        OR UPPER(usu_email) LIKE :q)
                                        ORDER BY usu_id`, {
            replacements: {
                q: query ? "%" + query.toUpperCase() + "%" : "%",
            },
        }
    );

    usuariosResult = usuariosResult && usuariosResult[0] ? usuariosResult[0] : [];
    return usuariosResult;
};


const logout = async(data) => {

    let id = jwt.decodificarToken(data);

    if (id && id.usu_id) {

        let usuariosResult = await sequelize.query(
            `update usuarios set usu_token=:token 
        WHERE 
        usu_id=:id;`, {
                replacements: {
                    id: id.usu_id,
                    token: ''
                },
            }
        );

        return true

    }
    throw ("Datos invalidos")




}

const getById = async(usu_codigo) => {
    let usuariosResult = await sequelize.query(
        `SELECT * FROM usuarios 
        WHERE 
        usu_id=:id`, {
            replacements: {
                id: usu_codigo,
            },
        }
    );



    return usuariosResult[0][0];
};

const getByLoginContrasena = async(email, pass) => {

    let usuariosResult = await sequelize.query(
        `SELECT * FROM usuarios
        WHERE 
        usu_password=:pass
        and
        Upper(usu_email)=:email`, {
            replacements: {
                pass: pass,
                email: email.toUpperCase()
            },
        }
    );


    return usuariosResult[0][0];
};

const updateToken = async(id, token) => {
    try {
        let result = await sequelize.query(
            `UPDATE usuarios SET usu_token=:token
            WHERE usu_id=:id returning usu_id, usu_token,usu_nombre, usu_rol,usu_email`, {
                replacements: {
                    id: id,
                    token: token
                },
            }
        );
        return result[0][0];
    } catch (error) {
        return error
    }

}


const login = async(data) => {



    //Validar contraseña y login 
    let usuarioFromDb = await getByLoginContrasena(data.email, data.password);

    if (usuarioFromDb && usuarioFromDb.usu_id) {
        console.log("entra")
        let payload = { "usu": usuarioFromDb.usu_id }
        let token = await jwt.generarJWT(payload)

        a = await updateToken(usuarioFromDb.usu_id, token);
        return { usuario: a, token }
    }
    throw ("Credenciales invalidas");
}

//si el loguin O contraseña no son validos


const registrarAdm = async(data) => {

    let usuariosResult = await sequelize.query(
        `INSERT INTO 
        usuarios
            ( 
                    usu_nombre, 
                     usu_telefono, 
                     usu_email, 
                     usu_password, 
                     usu_fecha, 
                     usu_documento, 
                     usu_rol
            )
    VALUES
            ( 
                    :usu, 
                    :telefono, 
                    :email, 
                    :pass, 
                    CURRENT_DATE, 
                    :docu, 
                    :rol
            );`, {
            replacements: {
                usu: data.usu,
                telefono: data.telefono,
                email: data.email,
                pass: data.pass,
                docu: data.docu,
                rol: data.rol
            },
        }
    );


    return usuariosResult[0][0];
}


const registrar = async(data) => {

    let usuariosResult = await sequelize.query(
        `INSERT INTO 
        usuarios
            ( 
                    usu_nombre, 
                     usu_telefono, 
                     usu_email, 
                     usu_password, 
                     usu_fecha, 
                     usu_documento, 
                     usu_rol
            )
    VALUES
            ( 
                    :usu, 
                    :telefono, 
                    :email, 
                    :pass, 
                    CURRENT_DATE, 
                    :docu, 
                    :rol
            );`, {
            replacements: {
                usu: data.usu,
                telefono: data.telefono,
                email: data.email,
                pass: data.pass,
                docu: data.docu,
                rol: "usuario"
            },
        }
    );


    return usuariosResult[0][0];
}


const getByToken = async(token) => {
    let usuariosResult = await sequelize.query(
        `SELECT * FROM usuarios
        WHERE  usu_token=:token
                              `, {
            replacements: {
                token: token.replace(`"`, "")
            },
        }
    );


    return (usuariosResult && usuariosResult[0].length > 0 && usuariosResult[0][0]) ? usuariosResult[0][0] : null;


}

const getByEmail = async(email) => {
    let usuariosResult = await sequelize.query(
        `SELECT * FROM usuarios
        WHERE  usu_email=:email
                              `, {
            replacements: {
                email: email
            },
        }
    );


    return (usuariosResult && usuariosResult[0].length > 0 && usuariosResult[0][0]) ? usuariosResult[0][0] : null;


}



const create = async(data) => {
    //Guardar el data en la BD
    const usuarioModelResult = await UsuarioModel.create(data);
    if (usuarioModelResult) {
        return usuarioModelResult.dataValues;
    } else {
        return null;
    }
};


const updateUsuarioById = async(id, data) => {
    let usuariosResult = await sequelize.query(

        `
UPDATE usuarios
	SET  usu_nombre=:nom, 
    usu_telefono=:tel, 
    usu_email=:email, 
    usu_password=:pass,
    usu_documento=:doc, 
    usu_rol=:rol
	WHERE 
     usu_id=:id;
`, {
            replacements: {
                nom: data.usu_nombre,
                tel: data.usu_telefono,
                email: data.usu_email,
                pass: data.usu_password,
                doc: data.usu_documento,
                id: id,
                rol: data.usu_rol
            },
        }
    );


    return usuariosResult[0][0];
};

const removeUsuario = async(id) => {
    //elimina el data en la BD
    const usuarioModelCount = await UsuarioModel.destroy({
        where: {
            usu_id: id,
        },
    });
    if (usuarioModelCount > 0) {
        return true;
    } else {
        return false;
    }
};

const recuperarContrasena = async(data) => {

    const datos = await getByEmail(data);

    if (datos && datos.usu_email) {
        return await enviarEmail(datos);

    }
    throw ("Email invalido")

}

const enviarEmail = async(data) => {
    //Requerimos el paquete


    //Creamos el objeto de transporte

    let op = {
        service: 'Gmail',
        auth: {
            user: 'refuelpy@gmail.com',
            pass: 'refuelapp123456'
        }
    };

    var transporter = nodemailer.createTransport(op);


    return transporter.sendMail({
        from: `refuelpy@gmail.com`,
        to: `${data.usu_email}`,
        subject: "Recuperar contraseña",
        html: `<div>
        <h1>Tu contraseña es: ${data.usu_password}</h1>
        </div>
        `
    }, (err, info) => {
        if (err) {
            console.log(err)
            return false;
        }
        console.log(info)
    })
}



module.exports = {
    list,
    listFilter,
    getById,
    create,
    updateUsuarioById,
    removeUsuario,
    login,
    getByToken,
    registrar,
    logout,
    registrarAdm,
    recuperarContrasena
}