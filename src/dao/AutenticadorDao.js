const UsuarioDto = require("../dto/UsuarioDto");
const Param = require("../util/Param");
const Query = require("../util/Query");
const ConnectionFactory = require("./ConnectionFactory")

module.exports = function AutenticadorDao() {

    var connection = new ConnectionFactory().getConnection();

    this.obterUsuario = function(usuario) {
        let query = new Query();
        let param = new Param();

        query.append(" SELECT                               ");
        query.append("  ID,                                 ");
        query.append(" 	NOME,                               ");
        query.append(" 	EMAIL,                              ");
        query.append(" 	SENHA,                              ");
        query.append(" 	SALT                                ");
        query.append(" FROM USUARIO WHERE 1=1 ");

        if(usuario.email) {
            query.append(" AND EMAIL = ? ");
            param.append(usuario.email);
        }

        if(usuario.nome) {
            query.append(" AND NOME = ? ");
            param.append(usuario.nome);
        }
        
        return new Promise((resolve) => {
            connection.get(query.get(), param.get(), (err, row) => {
                if(err || !row) {
                    return resolve(null);
                }

                var usuarioDatabase = new UsuarioDto();
                usuarioDatabase.id = row.DB;
                usuarioDatabase.nome = row.NOME;
                usuarioDatabase.email = row.EMAIL;
                usuarioDatabase.senha = row.SENHA;
                usuarioDatabase.salt = row.SALT;

                resolve(usuarioDatabase);
            });
        })
    }

    this.cadastrarUsuario = function(usuario) {
        let query = new Query();
        let param = new Param();

        query.append(" INSERT INTO USUARIO (       ");
        query.append(" 	NOME,                      ");
        query.append(" 	EMAIL,                     ");
        query.append(" 	SENHA,                     ");
        query.append(" 	SALT                       ");
        query.append(" ) VALUES (?, ?, ?, ?)       ");

        param.append(usuario.nome);
        param.append(usuario.email);
        param.append(usuario.senha);
        param.append(usuario.salt);

        connection.run(query.get(), param.get());
    }

}