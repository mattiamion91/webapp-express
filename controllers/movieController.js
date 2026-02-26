//importo il file di connessione al db
const connection = require('../data/db')

// Index
function index(req, res) {
    // prepariamo la query
    const sql = 'SELECT * FROM movies';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        //creo una copia dei risultati con modifica percorso immagine imagepath
        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })
        res.json(movies);
    });
}

//Show
function show(req, res) {
    // recuper id da param dinamico 
    const { id } = req.params
    const movieSql = 'SELECT * FROM movies WHERE id = ?';
    const reviewSql = `SELECT * FROM reviews WHERE movie_id = ?`;
    // Eseguiamo la prima query per il post
    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'movie not found' });
        // Recuperiamo il post
        const movie = movieResults[0];
        //aggiungo path immagine
        movie.image = req.imagePath + movie.image
        // Se è andata bene, eseguiamo la seconda query per le reviews
        connection.query(reviewSql, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            // Aggoiungiamo le reviews ai movies
            movie.reviews = reviewResults;
            res.json(movie);
        });
    });
}

//store delle reviews
function storeReviews(req, res) {
    //recuero id da params dinamico
    const { id } = req.params

    //recupero le info dal body della req
    const { name, vote, text } = req.body

    //preparo la query richesta db
    const sql = 'INSERT INTO reviews (name, vote, text, movie_id) VALUES (?,?,?,?)';

    //eseguo la query
    connection.query(sql, [name, vote, text, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'database query failed' });
        res.status(201).json({ message: 'recensione aggiunta', id: results.insertId })
    })
}

module.exports = { index, show, storeReviews }