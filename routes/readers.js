var express = require('express');
const { compile } = require('morgan');
const { query } = require('../settings/db');
var router = express.Router();
var db = require('../settings/db');
//выгрузка данных по читателям
router.get('/', (req, res) => {
    db.any('SELECT * FROM "readers"')
    .then(data => {
        res.send(data);
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
});
//поиск по читателям(filters WIP)
router.post('/search', (req, res) => {
    console.log(req.body.last_name);
    var search = [
        req.body.last_name,
        req.body.num,
        req.body.other,
        req.body.teacher
    ];
    db.any('SELECT * FROM "readers" WHERE last_n = $1 OR other = $3 OR teacher = $4 OR class_num = $2', search)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
    });
});
//Выдача книги
router.post('/update', (req, res) => {
    
    var update = [
        req.body.first_n,
        req.body.last_n,
        req.body.inv_num
    ];
    console.log(update);
    db.any('UPDATE "readers" SET inv_num = $3 WHERE last_n = $2 and first_n = $1', update)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
})
//Добавление читателей
router.post('/insert', (req, res) => {
    var insert = [
        req.body.first_n,
        req.body.last_n,
        req.body.class_num,
        req.body.class_let,
        req.body.num,
        req.body.birth_date,
        req.body.reg_date,
        req.body.liv_add,
        req.body.other,
        req.body.teacher,
        req.body.login,
        req.body.password
    ];
    db.any('INSERT INTO "readers"(first_n, last_n, class_num, class_let, id_knigi, birth_date, reg_date, liv_add, other, teacher, login, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ', insert)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;