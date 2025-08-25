document.addEventListener("DOMContentLoaded", () => {
  // ====== Lógica para acordeón en dashboard ======
  const botonesModulo = document.querySelectorAll(".modulo-btn");

  botonesModulo.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const isOpen = content.style.maxHeight;

      // Cerrar todos antes de abrir uno
      document.querySelectorAll(".modulo-content").forEach(c => {
        c.style.maxHeight = null;
        c.classList.remove("open");
      });

      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
      }
    });
  });

  // ====== Lógica de subida de archivos (actividad.html) ======
  const form = document.getElementById("uploadForm");
  const fileInput = document.getElementById("archivo");
  const statusDiv = document.getElementById("status") || document.getElementById("mensaje");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const file = fileInput.files[0];
      if (!file) {
        statusDiv.textContent = "❌ Por favor selecciona un archivo.";
        return;
      }

      const formData = new FormData(form);

      try {
        const response = await fetch("http://localhost:3000/upload", {
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
  }
});
