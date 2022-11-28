const express = require("express")
const router = express()
router.use(express.json())
// const member = require("../models/index").Member
const model = require('../models/index').Member
const modelMember = model
const Sequelize = require("sequelize").Op

router.get("/", (req,res) => {
    modelMember.findAll()
        .then(result => {
            res.json({
                member : result
            })
        })
        .catch(error => {
             res.json({
                message: error.message
            })
        })
})
router.get("/:id_member", async (req, res) => {
    let param = {
        id_member : req.params.id_member
    }
    let result = await modelMember.findOne({
        where: param,
    })
    res.json({
        member: result
    })
})
router.post("/tambah-member", (req,res) => {
   
    let member = {
        nama_member : req.body.nama_member,
        alamat : req.body.alamat,
        jenis_kelamin : req.body.jenis_kelamin,
        telepon : req.body.telepon
    }
    modelMember.create(member)
        .then(result => {
            res.json({
                message: "data has been inserted",
                member : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
// router.post("/pilih-member", async (req, res) => {
//     let cari = req.body.cari;
//     let result = await modelMember.findAll({
//         where : {
//             [Sequelize.or] : [
//                 {
//                     id_member: {
//                         [Sequelize.like] : `%${cari}%`
//                     }
//                 },
//                 {
//                     nama_member : {
//                         [Sequelize.like] : `%${cari}%`
//                     }
//                 },
//                 {
//                     alamat : {
//                         [Sequelize.like] : `%${cari}%`
//                     }
//                 },
//                 {
//                     jenis_kelamin : {
//                         [Sequelize.like] : `%${cari}%`
//                     }
//                 },
//                 {
//                     telepon : {
//                         [Sequelize.like] : `%${cari}%`
//                     }
//                 }
//             ]
//         }
//     })
//     res.json({
//         member : result
//     })
// })
router.put("/:id_member", (req, res) => {
    let id_member = req.params.id_member
    let member = {
        nama_member : req.body.nama_member,
        alamat : req.body.alamat,
        jenis_kelamin : req.body.jenis_kelamin,
        telepon : req.body.telepon,
    }
    modelMember.update(member, {where : {id_member : id_member}})
    .then(result => {
        res.json({
            message : "success edit member",
            member : result
        })
    })
    .catch(err => {
        res.json({
            message : err.message
        })
    })
})

router.delete("/:id_member", (req, res) => {
    let id_member = req.params.id_member
    modelMember.destroy({where : {id_member : id_member}})
    .then(res => {
        return res.json({
            message : "success delete member",
        })
    })
    .catch(err => {
        res.json({
            message : err.message
        })
    })
})

module.exports = router;