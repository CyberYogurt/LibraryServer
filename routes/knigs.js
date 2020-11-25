var express = require('express');
const { compile } = require('morgan');
const { query } = require('../settings/db');
var router = express.Router();
var db = require('../settings/db');
//выгрузка данных из БД
router.get('/', (req, res) => {
    db.any('SELECT * FROM "knigs"')
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
    });
});
//поиск по читателям(filters WIP)
router.post('/search', (req, res) => {
    console.log(req.body); 
    var search = [
        req.body.name, 
        req.body.bbk, 
        req.body.krae,
        req.body.uchebnik
    ];
    db.any('SELECT * FROM "knigs" WHERE knig_name = $1 OR author_name = $1 OR id_bbk = $2 OR krae = $3 OR uchebnik = $4', search)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
    });
});
//добавление книги
router.post('/insert', (req, res) => {
    console.log(req.body);
    var insert = [
       req.body.id_bbk,
       req.body.inv_num,
       req.body.knig_name,
       req.body.author_name,
       req.body.author_sign,
       req.body.god_izd,
       req.body.kol_vo,
       req.body.krae,
       req.body.uchebnik
    ];
    console.log(insert);
    db.any('INSERT INTO "knigs"(id_bbk, inv_num, knig_name, author_name, author_sign, god_izd, kol_vo, krae, uchebnik) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', insert)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;

