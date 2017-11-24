function CorretorDAO(connection){
    this._connection = connection;
}

CorretorDAO.prototype.postCorretor = function(corretor, callback){
    delete corretor.id_corretor;
    this._connection.query('insert into corretor set ?', corretor, callback);
}

CorretorDAO.prototype.getCorretores = function(callback){
    this._connection.query('select * from corretor', callback);
}

CorretorDAO.prototype.getCorretor = function(id, callback){
    this._connection.query('select * from corretor where id_corretor = ' + id, callback);
}

CorretorDAO.prototype.putCorretor = function(corretor, callback){
    let id_corretor= corretor.id_corretor
    delete corretor.id_corretor;

    this._connection.query('update corretor set ? where id_corretor = ?', [corretor, id_corretor], callback);
}

CorretorDAO.prototype.getCorretorSelect = function(callback){
    this._connection.query('select id_corretor, nome from corretor', callback);
}

CorretorDAO.prototype.deleteCorretor = function(id_corretor, callback){
    this._connection.query('delete from corretor where id_corretor = ?', id_corretor, callback);
}

module.exports = function(){
    return CorretorDAO;
}