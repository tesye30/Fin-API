const { response } = require('express');
const express = require('express');

const app = express();

app.get("/", (request, response) => {
    return response.send("Teste  dsadasdasdas");
});

app.listen(8080);