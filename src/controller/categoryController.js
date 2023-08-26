const {postCategory, getCategoryAll, putCategoryById} = require('../model/categoryModel')

const categoryController = {
    addCategory: async (req, res) => {
        try {
            const name = req.body
            const result = await postCategory(name)
            if(result.rows[0]){
                return res.status(200).json({status:200, message:"Category added!", data:result.rows[0]})
            }
        } catch (error) {
            console.error('Error when adding category', error.message)
            return res.status(500).json({status:500, message:"Add category failed!"})
        }
    },
    getCategory: async (req, res) => {
        try {
            const result = await getCategoryAll()
            if(result.rowCount > 0){
                return res.status(200).json({status:200, message:"Get category success!", data:result.rows})
            } else {
                return res.status(404).json({Status:404, message:"Category not found!"})
            }
        } catch (error) {
            console.error('error when get data category', error.message)
            return res.status(500).json({status:500, message:"Get category failed!"})
        }
    },
    editCategory: async (req, res) => {
        try {
            const {id} = req.params
            const {name} = req.body
            let post = {
                id: id,
                name: name
            }
            const result = await putCategoryById(post)
            if(result.rows[0]){
                return res.status(200).json({status:200, message:"Update category success!", data:result.rows[0]})
            } else {
                return res.status(404).json({status:404, message:"Category not found!"})
            }
        } catch (error) {
            console.error('Error when edit category', error.message)
            return res.status(500).json({status:500, message:"Update category failed!"})
        }
    }
}

module.exports= categoryController