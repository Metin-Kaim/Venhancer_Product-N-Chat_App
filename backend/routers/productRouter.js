const router = require("express").Router()
const client = require('./db')

router.get("/", async (req, res) => {
    const result = await client.query("Select * from products")
    if (result) {
        console.log(`Datalar alındı.`);
        res.json(result.rows)

    }
    else {
        console.error('Ürünler getirilirken bir hata oluştu:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.post("/", async (req, res) => {
    try{
        const newproduct = req.body
        const result = await client.query('Insert into products (id,name,"catId") values ($1,$2,$3) returning *',[newproduct.id,newproduct.name,newproduct.catId])
        console.log('added:', newproduct)
        res.status(201).json(result.rows[0])
    }
    catch(err){
        console.error('Ürün eklenirken bir hata oluştu:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const result = await client.query(`Delete from products where id = $1 returning *`,[id])
        console.log(`Deleted: ${id}`)
        res.status(200).json(result.rows)
    }
    catch(err){
        console.error('Ürün silinirken bir hata oluştu:', err);
        res.status(500).json({ error: err.message})
    }
})

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const {name,catId} = req.body
        const result = await client.query(`Update products Set name = $1, "catId" = $2 returning *`,[name,catId])
        console.log(`Updated: ${id}`)
        res.status(200).json(result.rows)
    }
    catch(err){
        console.error('Ürün düzenlenirken bir hata oluştu:', err);
        res.status(500).json({ error: err.message})
    }
})

module.exports = router
