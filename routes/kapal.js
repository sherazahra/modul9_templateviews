const express = require("express");
const router = express.Router();
const Kapal = require("../model/Kapal");
const AlatTangkapModel = require("../model/AlatTangkapModel");
const PemilikModel = require("../model/PemilikModel");
const dpiModel = require("../model/dpiModel");

let title = "kapal";

router.get("/", async (req, res, next) => {
  let rows = await Kapal.getAll();
  res.render("kapal/index", { data: rows, title });
});

router.post("/store", async (req, res, next) => {
  try {
    const data = req.body;
    await Kapal.store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/kapal");
  } catch (error) {
    console.log(error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/kapal");
  }
});

router.get("/create", async function (req, res, next) {
  try {
    let pemilik = await PemilikModel.getAll();
    let dpi = await dpiModel.getAll();
    let alat_tangkap = await AlatTangkapModel.getAll();
    res.render("kapal/create", {
      dataPemilik: pemilik,
      dataDPI: dpi,
      dataAlatTangkap: alat_tangkap,
    });
    console.log(pemilik);
  } catch (error) {
    console.log(error);
    req.flash("error", "Terjadi kesalahan pada server");
    res.redirect("/kapal");
  }
});

router.get("/edit/(:id)", async function (req, res, next) {
  let id = req.params.id;
  let pemilik = await PemilikModel.getAll();
  let dpi = await dpiModel.getAll();
  let alat_tangkap = await AlatTangkapModel.getAll();
  let rows = await Kapal.getById(id);
  res.render("kapal/edit", {
    id: rows[0].id_kapal,
    nama_kapal: rows[0].nama_kapal,
    id_pemilik: rows[0].id_pemilik,
    id_alat_tangkap: rows[0].id_alat_tangkap,
    id_dpi: rows[0].id_dpi,
    data_pemilik: pemilik,
    data_dpi: dpi,
    data_alat_tangkap: alat_tangkap,
  });
});

router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Kapal.update(id, data);
    req.flash("success", "Berhasil mengupdate data");
    res.redirect("/kapal");
  } catch (error) {
    console.log(error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/kapal");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Kapal.delete(id);
    req.flash("success", "Berhasil menghapus data");
    res.redirect("/kapal");
  } catch (error) {
    req.flash("error", "Gagal menghapus data");
    res.redirect("/kapal");
  }
});

module.exports = router;
