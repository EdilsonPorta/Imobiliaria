module.exports = function (application) {
    application.get('/listaImovel', (req, res) => {
        application.app.controllers.imovel.listaImovel(application, req, res);
    });

    application.get('/cadastraImovel', (req, res) => {
        application.app.controllers.imovel.cadastraImovel(application, req, res);
    });

    application.post('/imovel/cadastrar', (req, res) => {
        application.app.controllers.imovel.cadastrar(application, req, res);
    });

    application.get('/excluirImovel', (req, res) => {
        application.app.controllers.imovel.excluirImovel(application, req, res);
    });
}