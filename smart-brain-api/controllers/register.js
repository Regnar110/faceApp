const handleRegister = (req, res, db, bcrypt) => { // funkcja którą exportujemy na dole do pliku server.js gdzie jest ona wywoływana gdy zostanie wywoły endpoint /register
    const {name, email, password} = req.body;

    if(!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    
    const hash = bcrypt.hashSync(password)

    // bcrypt.hash(password, null, null, function(err, hash) { // bcrypt hashuje hasło i zwraca nam z funckji hash więc możemy to umieścić w console.log(hash) JEST TO METODA ASYNCHRONICZNA
    //     console.log(hash)
    // });
    // TRANSAKCJE to blok kodu który pozwala nam się upewnić, że gdy robimy wiele operacji na bazie danych to gdy jedna z tych operacji zawiedzie(failure) to wtedy one wszystkie zawiodą
    db.transaction(trx => { // transakcja  z parametrem trx który zastępuje db na czas transakcji
        trx.insert({ // co wprowadzamy w trx
            hash: hash,
            email: email
        })
        .into('login') // obiekt wprowadzony w trx wprowadzamy do tablicy login
        .returning('email') // zwracamy columne email wprowadzanego obiektu
        .then(loginEmail => { // potem ten zwrócony email pod nazwą loginEmail(tablica)
             return trx('users') // wybieramy obiekt trx , jest to następna transakcja którą zwracamy 
            .returning('*') // metoda knex która mówi co zostanie zwrócone iw  tym wypadku zwracamy cały obiekt użytkownika ktyóry się zarejesttrował
            .insert({ // to co zostanie wprowadzone do bazy danych
                email: loginEmail[0], // wprowadzamy loginEmail zwrócony przy wprowadzaniud anych do tablicy login jest to w formie loginEmail[0] z tego względu że potem w bazie email pokazuje sie jako obiekt, a z wybraniem z tablicy indexu 0 pokazuje sie normalnie
                name: name,
                joined: new Date()
            })
            .then(user => { // potem w odpowiedzi do front-dendu wysyłamy odpowiedź czyli to co zwróciła funkcja returning('*') czyli cały nowy obiekt użytkownika. UWAGA TO WSZYSTKO DZIAŁA JAK OBIETNICE!
                res.json(user[0]);
            })
        })
        .then(trx.commit) // jeżeli wszystko zakończy się sukcesem to commituj dane do bazy
        .catch(trx.rollback) // jeżeli coś zawiedzie to rollbackujemy zmiany , czyli je cofamy
    })
    .catch(err => res.status(400).json('unable to register,'))
}

module.exports = { // exportujemy funkcję handleRegister
    handleRegister: handleRegister
};