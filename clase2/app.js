const express = require('express');
const app = express();
const port = process.env.DEFAULT_PORT || 3000;
const movies = require('./movies.json');
app.use(express.json());

app.get('/', (req, res) => {
    res.json(movies);
});

app.get('/movies', (req, res) => {
    const { year, genre } = req.query;
    if(year && genre){
        const response = movies.filter((movie) => {return Number(year) === movie.year && genre === movie.genre});
        res.json(response);
    } else {
        res.status(400).json({
            code: 'bad_request',
            message: 'Invalid request, check your query params',
            severity: 'LOW'
        });
    }
});

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const regex = /^tt[0-9]{7}$/
    if(regex.test(id)){
        const response = movies.find((movie) => id === movie.imdb_title_id);
        if(!response){
            res.status(404);
        }
        res.json(response);
    } else {
        res.status(400).json({
            code: 'bad_request',
            message: 'Invalid request, check that the ID is valid',
            severity: 'LOW'
        });
    }
});

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});