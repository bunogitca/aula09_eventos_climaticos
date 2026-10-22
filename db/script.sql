drop database if exists registros_climaticos;
create database registros_climaticos;
use registros_climaticos;

create table usuario (
    id int not null auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(100) not null
);
create table evento (
    id int not null auto_increment primary key,
    usuarioId int not null,
    cidade varchar(100) not null,
    tipoEvento varchar(100) not null,
    temperaturaMaxima decimal(10,2) not null,
    data Date default(curdate()) not null,
    nivelImpacto enum('Baixo', 'Médio', 'Alto') default('Médio') not null
);
alter table evento add constraint fk_registra
foreign key (usuarioId) references usuario(id);
