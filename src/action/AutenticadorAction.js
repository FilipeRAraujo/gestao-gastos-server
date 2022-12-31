const AutenticadorFacade = require('../facade/AutenticadorFacade');

module.exports = function AutenticadorAction() {
    
    var autenticadorFacade = new AutenticadorFacade();

    this.logar = function(req, resp, next) {
        console.log("Server Login");
        autenticadorFacade.logar(req, resp, next);
    }

    this.registrar = function(req, resp, next) {
        autenticadorFacade.registrar(req, resp, next);
    }

}