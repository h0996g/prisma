const prisma = require('../db')
exports.getProducts = async (req, res) => {
    try {
        const product = await prisma.user.findMany({
            include: {
                products: true
            }


        })
        res.json({ data: product })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
exports.getMyProducts = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
            , include: {
                products: true
            }
        })
        res.json({ data: user.products })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
exports.getOneProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await prisma.product.findFirst({
            where: {
                id: id,
                belongsToId: req.user.id

            }
        })
        res, json({ data: product })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
exports.creatProduct = async (req, res) => {
    try {
        const id = req.params.id

        const product = await prisma.product.create({
            data: {
                belongsToId: req.user.id,
                name: req.body.name
            }
        })
        res.json({ data: product })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
exports.updateProduct = async (req, res) => {
    try {
        const updated = await prisma.product.update({
            where: {
                id: req.params.id,
                belongsToId: req.user.id,

            },
            data: {
                name: req.body.name
            }
        })
        res.json({ data: updated })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
exports.deletProduct = async (req, res) => {
    try {
        const deleted = await prisma.product.delete({
            where: {
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id
                }
            }
        })
        res.json({ data: deleted })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}