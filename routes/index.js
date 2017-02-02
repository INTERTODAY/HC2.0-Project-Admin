const express = require('express');
const router = express.Router();
const mysql_dbc = require('../commons/db_conn')();
const connection = mysql_dbc.init();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const async = require('async');
const QUERY = require('../database/query');
const JSON = require('JSON');
require('../database/redis')(router, 'local'); // redis
require('../helpers/helpers');


const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

router.get('/', isAuthenticated, (req, res) => {
    console.log(req.user);
    console.log('asdasd');
    res.render('index', {
        current_path: 'INDEX',
        title: PROJ_TITLE,
        loggedIn: req.user
    });
});


router.get('/login', function (req, res) {
    if (req.user == null) {
        res.render('login', {
            current_path: 'login',
            title: PROJ_TITLE + 'login'
        });
    } else {
        res.redirect('/');
    }
});


/*------------TEST CODE----------*/


router.get('/test', (req, res) => {
    res.json({result: 'Hello World'});
});

// TEST CSRF token
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({extended: false});
// todo app.js에서 사용하고 있는 global에 바인딩된 것은 왜 사용하지 못하지?


router.get('/test/form', csrfProtection, (req, res) => {
    res.render('form', {
        title: PROJ_TITLE
        , csrfToken: req.csrfToken()
        // test : mysql_location // this is working!!
    });
});

router.post('/test/form/submit', parseForm, csrfProtection, (req, res) => {
    res.send('data is being processed');
});

module.exports = router;