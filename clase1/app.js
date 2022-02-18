const express = require("express");
const app = express();
const port = process.env.DEFAULT_PORT || 3000;
app.use(express.json());

app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    const data = {
        '1234': {
            name: "ignacio",
            job: "dev"
        },
        '1235': {
            name: "pepito"
        }
    }
    res.json(data[id]);
})

app.post('/user/create', (req,res) => {
    const data = req.body;
    if(data.user && data.password){
        res.json({
            message:'User created succefully'
    });
    } else {
        res.status(400).json({
            message: "Error while creating the user. Did you send all the data?"
        });
    }
})

app.listen(port, () => {
    console.log('Server started at',port);
})