create database bdimobi;
use bdimobi;

create table corretor (
id_corretor int not null primary key auto_increment,
nome varchar(100),
cpf bigint,
ddd numeric,
celular bigint,
email varchar(100),
endereco varchar(100),
numero varchar(100),
bairro varchar(100),
cidade varchar(100),
estado varchar(2)
);

create table imovel (
id_imovel int not null primary key auto_increment,
registro varchar(100),
lote varchar(100),
endereco varchar(100),
numero varchar(100),
bairro varchar(100),
cidade varchar(100),
estado varchar(2),
valor varchar(30),
corretor int,
foreign key (corretor) references corretor (id_corretor)
);