const { query } = require('../database');

// Listar todas as formas de pagamento
exports.listarFormaPagamento = async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM public.forma_pagamento ORDER BY id_forma_pagamento'
        );

        res.json({
            sucesso: true,
            forma_pagamento: result.rows
        });

    } catch (error) {
        console.error('Erro ao listar formas de pagamento:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar formas de pagamento.'
        });
    }
};

// Obter forma de pagamento por ID
exports.obterFormaPagamento = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID inválido.'
            });
        }

        const result = await query(
            'SELECT * FROM public.forma_pagamento WHERE id_forma_pagamento = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Forma de pagamento não encontrada.'
            });
        }

        res.json({
            sucesso: true,
            forma_pagamento: result.rows[0]
        });

    } catch (error) {
        console.error('Erro ao obter forma de pagamento:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno do servidor.'
        });
    }
};

// Criar forma de pagamento
exports.criarFormaPagamento = async (req, res) => {
    try {
        const { nome_forma_pagamento } = req.body;

        if (!nome_forma_pagamento) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'O nome da forma de pagamento é obrigatório.'
            });
        }

        const sql = `
            INSERT INTO public.forma_pagamento (nome_forma_pagamento)
            VALUES ($1)
            RETURNING *
        `;

        const result = await query(sql, [nome_forma_pagamento]);

        res.status(201).json({
            sucesso: true,
            mensagem: 'Forma de pagamento inserida com sucesso!',
            forma_pagamento: result.rows[0]
        });

    } catch (error) {
        console.error('Erro ao criar forma de pagamento:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao inserir forma de pagamento no banco de dados.'
        });
    }
};

// Atualizar forma de pagamento
exports.atualizarFormaPagamento = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome_forma_pagamento } = req.body;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID inválido.'
            });
        }

        if (!nome_forma_pagamento) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'O nome da forma de pagamento é obrigatório.'
            });
        }

        const sql = `
            UPDATE public.forma_pagamento
            SET nome_forma_pagamento = $1
            WHERE id_forma_pagamento = $2
            RETURNING *
        `;

        const result = await query(sql, [nome_forma_pagamento, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Forma de pagamento não encontrada.'
            });
        }

        res.json({
            sucesso: true,
            mensagem: 'Forma de pagamento alterada com sucesso!',
            forma_pagamento: result.rows[0]
        });

    } catch (error) {
        console.error('Erro ao atualizar forma de pagamento:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar forma de pagamento.'
        });
    }
};

// Deletar forma de pagamento
exports.deletarFormaPagamento = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID inválido.'
            });
        }

        await query(
            'DELETE FROM public.forma_pagamento WHERE id_forma_pagamento = $1',
            [id]
        );

        res.json({
            sucesso: true,
            mensagem: 'Forma de pagamento excluída com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao deletar forma de pagamento:', error);

        if (error.code === '23503') {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Não é possível excluir: esta forma de pagamento está sendo utilizada em um pagamento.'
            });
        }

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao excluir forma de pagamento.'
        });
    }
};