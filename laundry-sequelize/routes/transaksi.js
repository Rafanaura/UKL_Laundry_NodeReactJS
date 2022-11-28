const express = require("express");
const moment = require("moment");
const router = express();
router.use(express.json());
const modelT = require('../models/index').Transaksi
const modelTransaksi = modelT
const modelDT = require('../models/index').Detail_Transaksi
const modelDetailTransaksi = modelDT

router.get("/", async (req, res) => {
  try {
    let result = await modelTransaksi.findAll({
      include: [
        "Member",
        // "Outlet",
        "User",
        {
          model: modelDetailTransaksi,
          as: "Detail_Transaksi",
          include: ["Paket"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    // let sumTotal = await modelTransaksi.sum("total", {
    //   where : 
    // })
    return res.json({
      message: "show all data transaksi",
      transaksi : result
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
});

router.get ("/detail/:id_transaksi", async (req,res) => {
  let param = { id_transaksi: req.params.id_transaksi}
  let result = await modelTransaksi.findOne({
      where: param,
      include: [
          "Member",
          "User",
          // "outlet",
          {
            model: modelDetailTransaksi,
            as: "Detail_Transaksi",
            include: ["Paket"]
          },
      ],
  })
  let totalAkhir = await modelTransaksi.sum("totalAkhir", {
    where : param
})
  res.json({
    transaksi : result,
    totalAkhir : totalAkhir
})
})

router.get("/detail", async (req, res) => {
  try {
    let detail = await modelDetailTransaksi.findAll({
      include: [
        // "Member",
        // "Outlet",
        // "User",
        "Paket",
        {
          model: modelTransaksi,
          as: "Transaksi",
          include: ["Member", "User"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    // let sumTotal = await modelTransaksi.sum("total", {
    //   where : 
    // })
    return res.json({
      message: "show all data detail transaksi",
      detail
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
});

router.post("/tambah-transaksi", (req, res) => {
  let tgl = new Date();
  let now = moment(tgl).format("YYYY-MM-DD");
  let tgl_batas = new Date()
  let batas_waktu = tgl_batas.setDate(tgl_batas.getDate() + 5);
  let transaksi = {
    id_member: req.body.id_member,
    id_user: req.body.id_user,
    tanggal: now,
    batas_waktu: batas_waktu,
    tanggal_bayar: req.body.tanggal_bayar,
    status: req.body.status,
    dibayar: req.body.dibayar,
    totalAkhir: req.body.totalAkhir,
  };
  modelTransaksi.create(transaksi)
    .then(result => {
      let lastID = result.id_transaksi;
    //   console.log(lastID);
      detail = req.body.detail;
      detail.forEach(element => {
        element.id_transaksi = lastID;
        console.log(element.id_transaksi)
      });
      console.log(detail)
      modelDetailTransaksi
        .bulkCreate(detail, {individualHooks:true})
        .then(result => {
          res.json({
            message: "Data has been inserted",
            detail: result
          });
        })
        .catch(error => {
          res.json({
            message: error.message,
          });
        });
    })
    .catch(error => {
      res.json({
        message: error.message,
      });
    });
});

router.put("/:id_transaksi", (req, res) => {
  let current = new Date();
  let now = moment(current).format("YYYY-MM-DD");
  let param = {
    id_transaksi: req.params.id_transaksi
  }
  let transaksi = {
    status: req.body.status,
    // dibayar: req.body.dibayar,
  };
  if (transaksi.status === "diambil") {
    (transaksi.tanggal_bayar = now), (transaksi.dibayar = "dibayar");
  }
  modelTransaksi
    .update(transaksi, { where: param })
    .then((result) => {
      return res.json({
        message: "data updated",
        transaksi : result
      });
    })
    .catch((err) => {
      return res.json({
        message: err.message,
      });
    });
});

router.delete("/:id_transaksi", (req, res) => {
  let id_transaksi = req.params.id_transaksi;

  //delete detail
  modelDetailTransaksi.destroy({where : {id_transaksi : id_transaksi}})
  .then((result) => {
    modelTransaksi
    .destroy({ where: { id_transaksi: id_transaksi } })
    .then((result) => {
      return res.json({
        message : "data transaksi deleted"
      })
    })
    .catch((err) => {
      return res.json({
        message: err.message,
      });
    });
  })
  .catch((err) => {
    return res.json({
      message: err.message,
    });
  });
});

module.exports = router;
