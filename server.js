const http = require('http'),
    express = require('express')
    cors = require('cors'),
    app = express();

const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const AutenticadorAction = require('./src/action/AutenticadorAction');

// AUTENTICAÇÃO
app.post('/login', new AutenticadorAction().logar);
app.post('/register', new AutenticadorAction().registrar);


// PLANILHA

// app.post('/home', (req, resp, next) => {});




// OUTROS
app.get('/aboutMe', (req, resp, next) => {
    resp.send({ me: 'Analista de Sistemas Java' });
})

app.listen(8000);