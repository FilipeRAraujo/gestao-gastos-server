const { randomBytes, createHmac, pbkdf2Sync } = require('crypto');

module.exports = function Crypto() {

    const HASHSIZE = 64;

    this.gerarSalt = function() {
        return randomBytes(Math.ceil(HASHSIZE / 2)).toString('hex').slice(0, HASHSIZE);
    }

    this.hashSenha = function(senha, salt) {
        var hash = createHmac('sha512', salt);
        hash.update(senha);

        var hashSenha = hash.digest('hex');

        return {
            salt : salt,
            hashSenha : hashSenha
        }
    }

    this.compararHashes = function(senha, senhaBanco) {
        return senha === senhaBanco; 
    }

}