const express = require("express");
const router = express.Router();
const AlatTangkapModel = require("../model/AlatTangkapModel.js");

router.get("/", async (req, res, next) => {
  try {
    let rows = await AlatTangkapModel.getAll();
    res.render("alat_tangkap/index", { data: rows, messages: req.flash() });
  } catch (error) {
    next(error);
  }
});

router.get("/create", (req, res) => {
  res.render("alat_tangkap/create");
});

router.post("/store", async (req, res, next) => {
  try {
    const alatTangkapData = req.body;
    await AlatTangkapModel.store(alatTangkapData);
    req.flash("success", "Berhasil menyimpan data Alat Tangkap");
    res.redirect("/alat_tangkap");
  } catch (error) {
    console.log(error);
    req.flash("error", "Gagal menyimpan data Alat Tangkap");
    res.redirect("/alat_tangkap");
  }
});

router.get("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let rows = await AlatTangkapModel.getById(id);
    res.render("alat_tangkap/edit", {
      id: id,
      nama_alat_tangkap: rows[0].nama_alat_tangkap,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const alatTangkapData = req.body;
    await AlatTangkapModel.update(id, alatTangkapData);
    req.flash("success", "Berhasil mengupdate data Alat Tangkap");
    res.redirect("/alat_tangkap");
  } catch (error) {
    req.flash("error", "Gagal menyimpan data Alat Tangkap");
    res.redirect("/alat_tangkap");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await AlatTangkapModel.delete(id);
    req.flash("success", "Berhasil menghapus data Alat Tangkap");
    res.redirect("/alat_tangkap");
  } catch (error) {
    req.flash("error", "Gagal menghapus data Alat Tangkap");
    res.redirect("/alat_tangkap");
  }
});

module.exports = router;
