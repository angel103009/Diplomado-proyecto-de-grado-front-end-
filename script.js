document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");
  const fileInput = document.getElementById("archivo");
  const statusDiv = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    if (!file) {
      statusDiv.textContent = "❌ Por favor selecciona un archivo.";
      return;
    }

    const formData = new FormData();
    formData.append("archivo", file);

    try {
      const response = await fetch("https://diplomado-backend1.onrender.com/upload", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        statusDiv.textContent = result.message || "✅ Archivo enviado correctamente.";
      } else {
        const error = await response.json();
        statusDiv.textContent = `❌ Error: ${error.message || "No se pudo enviar el archivo"}`;
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      statusDiv.textContent = "❌ Error de conexión con el servidor.";
    }
  });
});
