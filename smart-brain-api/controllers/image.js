const Clarifai = require('clarifai');

const app = new Clarifai.App({ // klucz do api pozwalający dostawcy na identyfikację użytkownika korzystającego z api co pozwala na kontrolę ilości wykorzystywanych zasobów API. Praktycznie każde api korzysta z API key do tego celu. App jest zdefiniowane po to aby potem można bylo z niego korzystąć dalej w kodzie.
    apiKey: 'f8a1d29279af4530bda0c69f0c9de3bb'
    });

const handleApiCall = (req,res) => {
        app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)  // w nawiasie model, i po przecinku preóbka czyli jakieś zdjęcie. Modele możnazobaczyć w dokumentacji w odnośniku do githuba clarifai w pliku index
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
    }


const handleImage =  (req, res, db) => {
    const {id} = req.body // destrukturyzujemy id z parametrów URL
    db('users').where('id', id).increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    }).catch(err => res.status(400).json('unable to get '))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}