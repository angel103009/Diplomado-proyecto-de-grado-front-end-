const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

// === CONFIGURACIÓN DE SUBIDA DE ARCHIVOS ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    console.log("📂 Archivo recibido:", uniqueName); // <-- muestra en consola
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.static("uploads"));

// === RUTA PARA SUBIR ARCHIVO ===
app.post("/upload", upload.single("archivo"), (req, res) => {
  console.log("✅ Archivo guardado en:", req.file.path);
  res.json({ message: "✅ Archivo subido correctamente", file: req.file });
});

// === RUTA PARA LISTAR ARCHIVOS (para admin.html) ===
app.get("/list", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) {
      return res.status(500).json({ error: "No se pudieron listar los archivos" });
    }
    res.json({ archivos: files });
  });
});

// === INICIAR SERVIDOR ===
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

