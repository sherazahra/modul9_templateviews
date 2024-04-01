const express = require("express");
const router = express.Router();
const Model_Kategori = require("../model/Model_Kategori.js");

router.get("/", async (req, res, next) => {
  try {
    let rows = await Model_Kategori.getAll();
    res.render("kategori/index", { data: rows, messages: req.flash() });
  } catch (error) {
    next(error);
  }
});

router.get("/create", (req, res) => {
  res.render("kategori/create");
});

router.post("/store", async (req, res, next) => {
  try {
    const kategoriData = req.body;
    await Model_Kategori.store(kategoriData);
    req.flash("success", "Berhasil menyimpan data kategori");
    res.redirect("/kategori");
  } catch (error) {
    console.log(error); // Tambahkan ini
    req.flash("error", "Gagal menyimpan data kategori");
    res.redirect("/kategori");
  }
});

router.get("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let rows = await Model_Kategori.getById(id);
    res.render("kategori/edit", {
      id: id,
      nama_kategori: rows[0].nama_kategori,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const kategoriData = req.body;
    await Model_Kategori.update(id, kategoriData);
    req.flash("success", "Berhasil mengupdate data kategori");
    res.redirect("/kategori");
  } catch (error) {
    req.flash("error", "Gagal menyimpan data kategori");
    res.redirect("/kategori");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Model_Kategori.delete(id);
    req.flash("success", "Berhasil menghapus data kategori");
    res.redirect("/kategori");
  } catch (error) {
    req.flash("error", "Gagal menghapus data kategori");
    res.redirect("/kategori");
  }
});

module.exports = router;
