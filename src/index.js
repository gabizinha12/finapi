const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express();
const customers = []
app.use(express.json())
app.post('/account', (request, response) => {
    const { cpf, name } = request.body;
    const customerArleadyExists = customers.some((customer) => customer.cpf === cpf)

    const id = uuidv4()
    if (customerArleadyExists) {
        return response.status(400).json({ error: "Customer arleady exists" })
    }


    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })
    return response.status(201).send()
})

app.get('/statement/:cpf', (request, response) => {
    const { cpf } = request.params;
    const customer = customers.find(customer => customer.cpf === cpf)
    return response.json(customer.statement)
})

app.listen(3333)