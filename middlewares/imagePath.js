function imagePath (req, res, next) {
//creo nuova proprita da aggiungere a req per path img
req.imagePath = `${req.protocol}://${req.get('host')}/imgs/`
//procedi con l;a risposta del server 
next();
};

module.exports = imagePath;