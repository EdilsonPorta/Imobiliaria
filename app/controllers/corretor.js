module.exports.listaCorretor = function (application, req, res) {
    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    const connection = application.config.dbConnection();

    const corretorModel = new application.app.models.CorretorDAO(connection);

    corretorModel.getCorretores((err, result) => {
        res.render('corretor/listaCorretor', { corretor: result, sucess: msg });
    });

}

module.exports.cadastraCorretor = function (application, req, res) {
    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    if (req.query.id != undefined) {

        const connection = application.config.dbConnection();
        const corretorModel = new application.app.models.CorretorDAO(connection);

        corretorModel.getCorretor(req.query.id, (err, result) => {
            if (err != null) {
                res.render('corretor/cadastraCorretor', { sucess: msg, corretor: result[0] });
            }
            else {
                res.render('corretor/cadastraCorretor', { sucess: msg, corretor: result[0] });
            }
        });
    }
    else {
        res.render('corretor/cadastraCorretor', { sucess: msg, corretor: {} });
    }
}

module.exports.cadastrar = function (application, req, res) {

    let corretor = req.body;
    const connection = application.config.dbConnection();
    const corretorModel = new application.app.models.CorretorDAO(connection);

    if (corretor.id_corretor == '') {
        corretorModel.postCorretor(corretor, (err, result) => {
            if (err != null) {
                res.redirect('/cadastraCorretor?msg=F');
            }
            else {
                res.redirect('/cadastraCorretor?msg=T');
            }
        });
    } else {
        corretorModel.putCorretor(corretor, (err, result) => {
            if (err != null) {
                res.redirect('/cadastraCorretor?msg=F');
            }
            else {
                res.redirect('/cadastraCorretor?msg=T');
            }
        });
    }
}

module.exports.excluirCorretor = function (application, req, res) {
    let corretor = req.body;
    const connection = application.config.dbConnection();
    const corretorModel = new application.app.models.CorretorDAO(connection);
    const imovelModel = new application.app.models.ImovelDAO(connection);

    if (req.query.id != undefined) {

        imovelModel.getImoveisCorretor(req.query.id, (err, result) => {
            if (err != null) {
                res.redirect('/listaCorretor?msg=F');
            }
            else {
                if (result.length > 0) {
                    res.redirect('/listaCorretor?msg=B');
                }
                else {
                    corretorModel.deleteCorretor(req.query.id, (err, result) => {
                        if (err != null) {
                            res.redirect('/listaCorretor?msg=F');
                        }
                        else {
                            res.redirect('/listaCorretor?msg=T');
                        }
                    });
                }
            }
        });


    } else {
        res.redirect('/listaCorretor?msg=F');
    }
}