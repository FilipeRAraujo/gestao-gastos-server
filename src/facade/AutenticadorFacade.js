const AutenticadorDao = require("../dao/AutenticadorDao");
const UsuarioDto = require("../dto/UsuarioDto");
const Crypto = require("../util/Crypto");
const { sign } = require('jsonwebtoken');
const TokenPayloadResponse = require("../payload/TokenPayloadResponse");
const MessagePayloadResponse = require("../payload/MessagePayloadResponse");


module.exports = function AutenticadorFacade() {
    
    var autenticadorDao = new AutenticadorDao();
    var crypto = new Crypto();

    var validarCamposBrancoOuNulos = function(usuario) {
        var resultado = true;
        if(usuario.nome || usuario.email || usuario.senha) {
            resultado = false;
        }
        
        if(usuario.nome.trim().length > 0 && usuario.email.trim().length > 0 && usuario.senha.trim().length > 0) {
            resultado = true;
        }

        return resultado;
    }

    this.logar = async function(req, resp, next) {
        var usuario = new UsuarioDto();
        usuario.email = req.body.email;
        usuario.senha = req.body.senha;
        
        var usuarioBanco = await autenticadorDao.obterUsuario(usuario);
        
        if(usuarioBanco) {
            var data = crypto.hashSenha(usuario.senha, usuarioBanco.salt);

            if(crypto.compararHashes(data.hashSenha, usuarioBanco.senha)) {
                var id = usuarioBanco.id;
                var auth = sign({ id }, "8xA6VxVZUK");
                
                return resp.json(new TokenPayloadResponse(auth, true));
            }
        }

        return resp.status(500).json(new MessagePayloadResponse("Foi não"));
    }

    this.registrar = function(req, resp, next) {
        var usuario = new UsuarioDto();
        usuario.nome = req.body.nome;
        usuario.email = req.body.email;
        usuario.senha = req.body.senha;

        if(validarCamposBrancoOuNulos(usuario)) {
            var salt = crypto.gerarSalt();
            var data = crypto.hashSenha(usuario.senha, salt);

            usuario.senha = data.hashSenha;
            usuario.salt = data.salt;

            autenticadorDao.cadastrarUsuario(usuario);
            return resp.json(new MessagePayloadResponse("Pronto, criou"));
        }

        return resp.status(500).json(new MessagePayloadResponse("Tem campo faltando ai em..."));
    }
    
}