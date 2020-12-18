const handleProfile = (req, res, db) => {
    const {id} = req.params // destrukturyzujemy id z parametrów URL
    db.select('*').from('users').where('id', id).then(user => { // wybieramy uzytkownika o określonym id z parametrów URL
        if(user.length){
            res.json(user[0]);
        } else {
            res.status(400).json('cannot find the user');
        }
    }).catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfile: handleProfile
}