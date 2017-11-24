module.exports = function (application) {
    application.get('/listaCorretor', (req, res) => {
        application.app.controllers.corretor.listaCorretor(application, req, res);
    });

    application.get('/cadastraCorretor', (req, res) => {
        application.app.controllers.corretor.cadastraCorretor(application, req, res);
    });

    application.post('/corretor/cadastrar', (req, res) => {
        application.app.controllers.corretor.cadastrar(application, req, res);
    });

    application.get('/excluiCorretor', (req, res) => {
        application.app.controllers.corretor.excluirCorretor(application, req, res);
    });
}