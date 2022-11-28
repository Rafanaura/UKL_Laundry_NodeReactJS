const express = require("express")
const router = express()
router.use(express.json())
const model = require('../models/index').Outlet
const modelOutlet = model

router.get("/", (req, res) => {
    modelOutlet.findAll()
        .then(result => {
            res.json({
                outlet : result
            })
        })
        .catch(err => {
            res.json({
                message : err.message
            })
        })
})

router.post("/tambah-outlet", (req, res) => {
    let outlet = {
        nama : req.body.nama,
        alamat : req.body.alamat,
        telepon : req.body.telepon
    }
    modelOutlet.create(outlet)
       .then(result => {
        return res.json({
            message : "success add outlet",
            outlet
        })
       })
       .catch(err => {
            return res.json({
                message : err.message
            })
       })
})

router.put("/:id_outlet", (req, res) => {
    let id_outlet = req.params.id_outlet
    let outlet = {
        nama : req.body.nama,
        alamat : req.body.alamat,
        telepon : req.body.telepon
    }
    modelOutlet.update(outlet, {where : {id_outlet : id_outlet}})
    .then(result => {
        return res.json({
            message : "success edit outlet",
            outlet
        })
    })
    .catch(err => {
        return res.json({
            message : err.message
        })
    })
})

router.delete("/:id_outlet", (req, res) => {
    let id_outlet = req.params.id_outlet
    modelOutlet.destroy({where : {id_outlet : id_outlet}})
    .then(res => {
        return res.json({
            message : "success delete outlet",
        })
    })
    .catch(err => {
        return res.json({
            message : err.message
        })
    })
})

module.exports = router