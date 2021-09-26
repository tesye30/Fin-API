
const { request, response } = require('express');
const express = require('express');
const { v4 : uuidv4 } = require("uuid")

const app = express();
app.use(express.json());
const customers = [];
/**
 * GET - Buscar uma informação dentro do servidor
 * POST - Inserir uma informação no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informação especifica
 * DELETE - Deletar uma informação no servidor 
 */
/**
 * cpf - string
 * name - string
 * id - uuid
 * statement []
 */

// Middleware
function verifyIfExistsAccontCPF(request, response, next){
    const { cpf} = request.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);

    if(!customer) {
        return response.status(400).json({ error: "Customer not found"});

    }

    request.customer = customer;
    return next();
}

app.post("/account", (request, response) => {
    const {cpf, name} = request.body;

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
        );

        if(customerAlreadyExists) {
            return response.status(400).json({ error: "Customer already exists !"});
        }
    const id = uuidv4();

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: [],
    });
    return response.status(201).send();
});

// app.use(verifyIfExistsAccontCPF);

app.get("/statement", verifyIfExistsAccontCPF,(request, response) => {
    const {customer} = request;
    return response.json(customer.statement);
});

app.listen(8080);