const express = require("express");
const router = express.Router();
const dpiModel = require("../model/dpiModel.js");

router.get("/", async (req, res, next) => {
  try {
    let rows = await dpiModel.getAll();
    res.render("dpi/index", { data: rows, messages: req.flash() });
  } catch (error) {
    next(error);
  }
});

router.get("/create", (req, res) => {
  res.render("dpi/create");
});

router.post("/store", async (req, res, next) => {
  try {
    const dpiData = req.body;
    await dpiModel.store(dpiData);
    req.flash("success", "Berhasil menyimpan data DPI");
    res.redirect("/dpi");
  } catch (error) {
    console.log(error); // Tambahkan ini
    req.flash("error", "Gagal menyimpan data DPI");
    res.redirect("/dpi");
  }
});

router.get("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let rows = await dpiModel.getById(id);
    res.render("dpi/edit", {
      id: id,
      nama_dpi: rows[0].nama_dpi,
      luas: rows[0].luas,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const dpiData = req.body;
    await PemilikModel.update(id, dpiData);
    req.flash("success", "Berhasil mengupdate data DPI");
    res.redirect("/dpi");
  } catch (error) {
    req.flash("error", "Gagal menyimpan data DPI");
    res.redirect("/dpi");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await dpiModel.delete(id);
    req.flash("success", "Berhasil menghapus data DPI");
    res.redirect("/dpi");
  } catch (error) {
    req.flash("error", "Gagal menghapus data DPI");
    res.redirect("/dpi");
  }
});

module.exports = router;
