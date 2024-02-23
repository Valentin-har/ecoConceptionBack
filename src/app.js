const mysql = require('mysql');
const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const router = express.Router();
app.use("/test-static", express.static("public"));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(bodyParser.json());

const config = {
    host: 'mysql-eco-conception.alwaysdata.net',
    user: '349034_admin',
    password: 'mdpadmin',
    database: 'eco-conception_data',
};

const connection = mysql.createConnection(config);


const port = 8080;

//// ---------------------- CREW ----------------------- ////

//Récupérer les équipages valides
app.get('/crew', (req, res) => {
    const query = `SELECT * FROM crew`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la sélection des équipages dans la table "crew" :', err);
            res.status(500).json({ error: 'Erreur lors de la sélection des équipages dans la table "crew"' });
            return;
        }
        res.json(result);
    });
});

//Ajouter un équipage
app.post('/crew', (req, res) => {
    const {crew_name, crew_description, crew_flag} = req.body
    const query = 'INSERT INTO crew (crew_name, crew_description, crew_flag) VALUES (?, ?, ?)';
    const values = [crew_name, crew_description, crew_flag]
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion dans la table "crew" :', err);
            res.status(500).json({ error: 'Erreur lors de l\'insertion dans la table "crew"' });
            return;
        }
        console.log('Valeurs insérées avec succès dans la table "crew"');
        res.status(200).json({ message: 'Valeurs insérées avec succès dans la table "crew"' });
    });
});


//Supprimer un équipage depuis le menu classique
app.delete('/crew/:id', (req, res) => {
    const id = req.params.id;
    const values = [id];
    const query = `DELETE FROM crew WHERE crew_key = $1`;
    connection.query(query, values,(err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'occurrence dans la table "crew" :', err);
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'occurrence dans la table "crew"' });
            return;
        }
        console.log('Occurrence supprimée avec succès de la table "crew"');
        res.status(200).json({ message: 'Occurrence supprimée avec succès de la table "crew"' });
    });
});


//// ---------------------- CHARACTER ----------------------- ////



//Récupérer les personnages valides
app.get('/pirate', (req, res) => {
    const query = `SELECT * FROM pirate`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la sélection des pirates dans la table "pirate" :', err);
            res.status(500).json({ error: 'Erreur lors de la sélection des pirates dans la table "character"' });
            return;
        }
        res.json(result);
    });
});

//Ajouter un personnage
app.post('/pirate', (req, res) => {
    const {pir_name, pir_picture, pir_description} = req.body
    const query = 'INSERT INTO pirate (pir_name, pir_picture, pir_description) VALUES (?, ?, ?)';
    const values = [pir_name, pir_picture, pir_description]
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion dans la table "pirate" :', err);
            res.status(500).json({ error: 'Erreur lors de l\'insertion dans la table "pirate"' });
            return;
        }
        console.log('Valeurs insérées avec succès dans la table "pirate"');
        res.status(200).json({ message: 'Valeurs insérées avec succès dans la table "pirate"' });
    });
});

//Supprimer un personnage depuis le menu classique
app.delete('/pirate/:id', (req, res) => {
    const id = req.params.id;
    const values = [id];
    const query = `DELETE FROM pirate WHERE pir_key = $1`;
    connection.query(query, values,(err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'occurrence dans la table "pirate" :', err);
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'occurrence dans la table "pirate"' });
            return;
        }
        console.log('Occurrence supprimée avec succès de la table "pirate"');
        res.status(200).json({ message: 'Occurrence supprimée avec succès de la table "pirate"' });
    });
});


//// ---------------------- FRUIT ----------------------- ////



//Récupérer les fruits du démon valides
app.get('/fruit', (req, res) => {
    const query = `SELECT * FROM fruit`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la sélection des fruits du démon valides dans la table "fruit" :', err);
            res.status(500).json({ error: 'Erreur lors de la sélection des fruits du démon valides dans la table "fruit"' });
            return;
        }
        res.json(result);
    });
});

//Ajouter un fruit du démon
app.post('/fruit', (req, res) => {
    const { fruit_name, fruit_picture, fruit_description } = req.body
    const query = 'INSERT INTO fruit (fruit_name, fruit_picture, fruit_description) VALUES (?, ?, ?)';
    const values = [fruit_name, fruit_picture, fruit_description]
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion dans la table "fruit" :', err);
            res.status(500).json({ error: 'Erreur lors de l\'insertion dans la table "fruit"' });
            return;
        }
        res.status(200).json({ message: 'Valeurs insérées avec succès dans la table "fruit"' });
    });
});

//Supprimer un fruit du démon depuis le menu classique
app.delete('/fruit/:id', (req, res) => {
    const id = req.params.id;
    const values = [id];
    const query = `DELETE FROM fruit WHERE fruit_key = $1`;
    connection.query(query, values,(err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'occurrence dans la table "fruit" :', err);
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'occurrence dans la table "fruit"' });
            return;
        }
        res.status(200).json({ message: 'Occurrence supprimée avec succès de la table "fruit"' });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
