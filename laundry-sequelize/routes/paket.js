const express = require("express")
const router = express()
router.use(express.json())
const model = require('../models/index').Paket
const modelPaket = model
const modelDT = require('../models/index').Detail_Transaksi
const modelDetailTransaksi = modelDT
router.get("/", (req, res) => {
    modelPaket.findAll()
        .then(result => {
            res.json({
                paket : result
            })
        })
        .catch(err => {
            return res.json({
                message : err.message
            })
        })
})

router.post("/tambah-paket", (req, res) => {
    let paket = {
        jenis : req.body.jenis,
        harga : req.body.harga
    }
    modelPaket.create(paket)
       .then(result => {
        return res.json({
            message : "success add paket",
            paket : result
        })
       })
       .catch(err => {
            return res.json({
                message : err.message
            })
       })
})

router.put("/:id_paket", (req, res) => {
    let id_paket = req.params.id_paket
    let paket = {
       jenis : req.body.jenis,
       harga : req.body.harga
    }
    modelPaket.update(paket, {where : {id_paket : id_paket}})
    .then(result => {
        return res.json({
            message : "success edit paket",
            paket : result
        })
    })
    .catch(err => {
        return res.json({
            message : err.message
        })
    })
})

router.delete("/:id_paket", (req, res) => {
    let id_paket = req.params.id_paket

    //delete detail
    modelDetailTransaksi.destroy({where : {id_paket : id_paket}})
    .then((result) => {
        modelPaket.destroy({where : {id_paket : id_paket}})
    .then(result => {
        return res.json({
            message : "success delete paket",
        })
    })
    .catch(err => {
        return res.json({
            message : err.message
        })
    })
    })
    .catch((err) => {
        return res.json({
          message: err.message,
        });
      });
})

module.exports = router