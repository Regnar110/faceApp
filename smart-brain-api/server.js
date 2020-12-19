const express = require('express'); // importujemy expressa
const bodyParser = require('body-parser'); // importujemy body-parsera
const bcrypt = require('bcrypt-nodejs') //imporujemy b crypta do hashowania haseł
const cors = require('cors');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const top = require('./controllers/top')

const db = require('knex')({ // łączenie z bazą(inicjalizacja). Knex to biblioteka pozwalająca na łączenie się z relacyjnymi bazami danych.
    client: 'pg', // posgres
    connection: {
      host : '127.0.0.1', // miejsce w sieci w ktgórym znajduje się baza danych. My mamy na localhoscie a 127.0.0.1 to to samo co localhost.
      user : 'postgres', // nazwa użytkownika
      password : '',
      database : 'smartbrain'
    }
  });


const app = express(); // uruchamiamy expressa

app.use(bodyParser.json()) // middleware, który uruchamia  body-parsera!! NIE MOŻNA TEGO ZAPOMINAĆ!
app.use(cors())

app.get('/top', (req,res) => {
    top.handleTop(req, res, db)
});

app.post('/signin', (req,res) => {
    signIn.handleSignIn(req, res, db, bcrypt) // przekazujemy do funkcji z pliku signin.js parametry req i res oraz db i bcrypt aby ta mogla uzywac funkcjonalności knexa i b crypta
})

app.post('/register', (req,res) =>  {
    register.handleRegister(req, res, db, bcrypt) // przekazujemy do funkcji z pliku register.js parametry req i res oraz db i bcrypt aby ta mogla uzywac funkcjonalności knexa i b crypta
})

app.get('/profile/:id', (res, req) => {
    profile.handleProfile(res, req, db) // przekazujemy do funkcji z pliku profile.js parametry req i res oraz db  aby ta mogla uzywac funkcjonalności knexa 
})

app.put('/image', (res, req) => {
    image.handleImage(res, req, db); // przekazujemy do funkcji z pliku image.js parametry req i res oraz db  aby ta mogla uzywac funkcjonalności knexa 
})

app.post('/imageUrl', (res, req) => {
    image.handleApiCall(res, req); // przekazujemy do funkcji z pliku image.js parametry req i res oraz db  aby ta mogla uzywac funkcjonalności knexa 
})
const port = 3000;
app.listen(port,() => {
    console.log('serwer działa na porcie ', port);
});








/* 
ENDPOINTS(punkty końcowe URl)
 ZAPLANOWANE ROUTY:

 / --> res = working
 /signin --> POST res= succes lub fail // tutaj wywysłamy hasło i nazwe użytkownika przez POST Mimo że nie tworzymy nowych danych. Jest to dlatego, że chcemy aby te dane przeszły przez body request w HTTPS. Dane te będą więc zabezpieczone przed próbą ich wykradnięcia w trakcie przesyłu jak np przy query stringu
 /register --> POST = nowy user object
 /profile/:userID --> GET  = zwróci user (userId to parametr URL)
/image --> PUT --> aktualizujemy obiekt user i w nimm wynik pokazujacy ilośc wrzuconych zdjęć
*/