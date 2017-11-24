module.exports.listaImovel = function (application, req, res) {
    const connection = application.config.dbConnection();

    const imovelModel = new application.app.models.ImovelDAO(connection);

    imovelModel.getImoveis((err, result) => {
        res.render('imovel/listaImovel', {imovel: result });
    });

}

module.exports.cadastraImovel = function (application, req, res) {
    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    const connection = application.config.dbConnection();
    const corretorModel = new application.app.models.CorretorDAO(connection);
    const imovelModel = new application.app.models.ImovelDAO(connection);

    if (req.query.id != undefined) {

        imovelModel.getImovel(req.query.id, (err, result) => {
            corretorModel.getCorretorSelect((err2, result2) => {
                if (err2 != null) {
                    res.render('imovel/cadastraImovel', { sucess: msg, imovel: result[0], selectCorretor: result2 });
                } else {
                    res.render('imovel/cadastraImovel', { sucess: msg, imovel: result[0], selectCorretor: result2 });
                }
            });
        });
    } else {
        corretorModel.getCorretorSelect((err, result) => {
            res.render('imovel/cadastraImovel', { sucess: msg, imovel: {}, selectCorretor: result });
        });
    }
}

module.exports.cadastrar = function (application, req, res) {

    let imovel = req.body;
    const connection = application.config.dbConnection();
    const imovelModel = new application.app.models.ImovelDAO(connection);

    if (imovel.id_imovel == '') {
        imovelModel.postImovel(imovel, (err, result) => {
            if (err != null) {
                res.redirect('/cadastraImovel?msg=F');
            }
            else {
                res.redirect('/cadastraImovel?msg=T');
            }
        });
    } else {
        imovelModel.putImovel(imovel, (err, result) => {
            if (err != null) {
                res.redirect('/cadastraImovel?msg=F');
            }
            else {
                res.redirect('/cadastraImovel?msg=T');
            }
        });
    }
}

// Excluir
module.exports.excluirImovel = function (application, req, res) {
    let imovel = req.body;
    const connection = application.config.dbConnection();
    const imovelModel = new application.app.models.ImovelDAO(connection);

    if (req.query.id != undefined) {

        imovelModel.deleteImovel(req.query.id, (err, result) => {
            if (err != null) {
                res.redirect('/listaImovel?msg=F');
            }
            else {
                res.redirect('/listaImovel?msg=T');
            }
        });
    }
    else {
        res.redirect('/listaImovel?msg=F');
    }
}
