const handleTop = (req, res, db) => { 
    db.select('name', 'entries', 'username').table('users').orderBy('entries', 'desc').limit(10).offset(0)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json('cannot get top users')
    })
}
module.exports = {
    handleTop
}