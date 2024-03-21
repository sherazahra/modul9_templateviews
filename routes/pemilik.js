const express = require("express");
const router = express.Router();
const PemilikModel = require("../model/PemilikModel.js");

router.get("/", async (req, res, next) => {
  try {
    let rows = await PemilikModel.getAll();
    res.render("pemilik/index", { data: rows, messages: req.flash() });
  } catch (error) {
    next(error);
  }
});

router.get("/create", (req, res) => {
  res.render("pemilik/create");
});

router.post("/store", async (req, res, next) => {
  try {
    const pemilikData = req.body;
    await PemilikModel.store(pemilikData);
    req.flash("success", "Berhasil menyimpan data Pemilik");
    res.redirect("/pemilik");
  } catch (error) {
    console.log(error); // Tambahkan ini
    req.flash("error", "Gagal menyimpan data Pemilik");
    res.redirect("/pemilik");
  }
});

router.get("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let rows = await PemilikModel.getById(id);
    res.render("pemilik/edit", {
      id: id,
      nama_pemilik: rows[0].nama_pemilik,
      alamat: rows[0].alamat,
      no_hp: rows[0].no_hp,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const pemilikData = req.body;
    await PemilikModel.update(id, pemilikData);
    req.flash("success", "Berhasil mengupdate data Pemilik");
    res.redirect("/pemilik");
  } catch (error) {
    req.flash("error", "Gagal menyimpan data Pemilik");
    res.redirect("/pemilik");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await PemilikModel.delete(id);
    req.flash("success", "Berhasil menghapus data Pemilik");
    res.redirect("/pemilik");
  } catch (error) {
    req.flash("error", "Gagal menghapus data Pemilik");
    res.redirect("/pemilik");
  }
});

module.exports = router;
