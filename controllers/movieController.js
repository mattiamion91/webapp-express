//importo il file di connessione al db
const connection = require('../data/db')

// Index
function index(req, res) {
    // prepariamo la query
    const sql = 'SELECT * FROM movies';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

//Show
function show(req, res) {
    // recuperiamo l'id dall' URL
    const id = req.params.id
    const movieSql = 'SELECT * FROM movies WHERE id = ?';
    const reviewql = `SELECT T.* FROM reviews JOIN movies ON movies.id = reviews.movie_id WHERE PT.post_id = ?`;
    // Eseguiamo la prima query per il post
    connection.query(postSql, [id], (err, postResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (postResults.length === 0) return res.status(404).json({ error: 'Pizza not found' });
        // Recuperiamo il post
        const post = postResults[0];
        // Se è andata bene, eseguiamo la seconda query per i tags
        connection.query(tagsSql, [id], (err, tagsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            // Aggoiungiamo i tags al post
            post.tags = tagsResults;
            res.json(post);
        });
    });
}

module.exports = {index, show}