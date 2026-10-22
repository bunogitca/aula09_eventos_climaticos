const con = require('../db')

const cadastrar = (req, res) => {
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body
    
    try {
        const query = 'INSERT INTO evento (usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto) VALUES (?, ?, ?, ?, ?, ?);'
        
        con.query(query, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar evento climático' })
            } else {
                const novoEvento = req.body
                novoEvento.id = results.insertId
                res.status(201).json({ message: 'Evento climático cadastrado com sucesso', evento: novoEvento })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ 
            error: 'Erro ao cadastrar evento', 
            details: 'Informe { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto }' 
        })
    }
}

const listar = (req, res) => {
    const query = 'SELECT * FROM evento;'
    
    con.query(query, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar eventos climáticos' })
        } else {
            res.json(results)
        }
    })
}

module.exports = {
    cadastrar,
    listar
}
