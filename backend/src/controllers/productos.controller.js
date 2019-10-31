const ProductoModel = require('../models/Producto');

module.exports = {
    async getProducto(req, res){
        try {
            const producto = await ProductoModel.findById(req.params.id);
            res.json(producto);
        } catch (error) {
            res.json({
                success: false,
                message: 'No se pudo obtener el producto'
            });
        }
    },

    async getProductos(req, res){
        try {
            const productos = await ProductoModel.find();
            res.json(productos);
        } catch (error) {
            res.json({
                success: false,
                message: 'No se pudo obtener los productos'
            });
        }
    },

    async createProducto(req, res){
        const {nombre, precio, stock} = req.body;

        if(!nombre){
            return res.json({
                success: false,
                message: 'El nombre no puede estar vacío'
            });
        }

        if(!precio){
            return res.json({
                success: false,
                message: 'El precio no puede estar vacío'
            });
        }

        if(!stock){
            return res.json({
                success: false,
                message: 'El stock no puede estar vacío'
            });
        }

        try {
            const newProducto = new ProductoModel({
                nombre,
                precio,
                stock
            });

            await newProducto.save();
            res.json({
                success: true,
                message: 'Producto creado'
            });
        } catch (error) {
            res.json({
                success: false,
                message: 'No se pudo crear el producto'
            });
        }
    },

    async updateProducto(req, res){
        try {
            await ProductoModel.findByIdAndUpdate({_id: req.params.id}, req.body);
            res.json({
                success: true,
                message: 'Producto actualizado'
            });
        } catch (error) {
            res.json({
                success: false,
                message: 'No se pudo actualizar el producto'
            });
        }
    },

    async deleteProducto(req, res){
        try {
            await ProductoModel.findByIdAndDelete(req.params.id);
            res.json({
                success: true,
                message: 'Producto eliminado'
            });
        } catch (error) {
            res.json({
                success: false,
                message: 'No se pudo eliminar el producto'
            });
        }
    }
}