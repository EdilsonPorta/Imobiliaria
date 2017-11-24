function ImovelDAO(connection){
    this._connection = connection;
}

ImovelDAO.prototype.postImovel= function(imovel, callback){
    delete imovel.id_imovel;
    this._connection.query('insert into imovel set ?', imovel, callback);
}

ImovelDAO.prototype.getImoveis = function(callback){
    this._connection.query("select i.id_imovel, i.registro, i.lote, i.endereco,i.numero, i.bairro, i.cidade, i.estado, i.valor,c.nome as corretor  from imovel as i inner join corretor as  c on c.id_corretor = i.corretor", callback);
}

ImovelDAO.prototype.getImovel = function(id, callback){
    this._connection.query('select * from imovel where id_imovel = ' + id, callback);
}

ImovelDAO.prototype.getImoveisCorretor = function(id_corretor, callback){
    this._connection.query("select * from imovel where corretor = ?", id_corretor, callback);
}

ImovelDAO.prototype.putImovel = function(imovel, callback){
    let id_imovel = imovel.id_imovel;
    delete imovel.id_imovel;
    this._connection.query('update imovel set ? where id_imovel = ?', [imovel, id_imovel], callback);
}

ImovelDAO.prototype.deleteImovel = function(id_imovel, callback){
    this._connection.query('delete from imovel where id_imovel = ?', id_imovel, callback);
}

module.exports = function(){
    return ImovelDAO;
}