const con = require('../db')

// [AULA ANTERIOR] Cadastrar Evento Climático
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

// [AULA ANTERIOR] Listar Eventos Climáticos
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

// [NOVO] Atualizar Evento Climático
const atualizar = (req, res) => {
    const { id } = req.params
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto } = req.body

    try {
        const query = 'UPDATE evento SET usuarioId = ?, cidade = ?, tipoEvento = ?, temperaturaMaxima = ?, data = ?, nivelImpacto = ? WHERE id = ?;'
        
        con.query(query, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, id], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao atualizar evento climático' })
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Evento climático não encontrado' })
            } else {
                res.json({ message: 'Evento climático atualizado com sucesso', id, ...req.body })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao processar requisição de atualização' })
    }
}

// [NOVO] Excluir Evento Climático
const excluir = (req, res) => {
    const { id } = req.params

    try {
        const query = 'DELETE FROM evento WHERE id = ?;'
        
        con.query(query, [id], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao excluir evento climático' })
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Evento climático não encontrado' })
            } else {
                res.json({ message: 'Evento climático excluído com sucesso', id_excluido: id })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao processar requisição de exclusão' })
    }
}

module.exports = {
    cadastrar,
    listar,
    atualizar,
    excluir
}
