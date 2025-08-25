// script.js
document.addEventListener("DOMContentLoaded", () => {
  // === Detectar en qué página estamos ===
  const path = window.location.pathname;

  // ================= LOGIN =================
  if (path.includes("index.html")) {
    const loginForm = document.getElementById("loginForm");
    const errorMsg = document.getElementById("errorMsg");

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const u = document.getElementById("usuario").value;
      const p = document.getElementById("password").value;

      // Simulación básica de login
      if (u === "admin" && p === "1234") {
        window.location.href = "dashboard.html";
      } else {
        errorMsg.innerText = "Usuario o contraseña incorrectos";
      }
    });
  }

  // ================= ACTIVIDAD =================
  if (path.includes("actividad.html")) {
    const params = new URLSearchParams(window.location.search);
    const actividad = params.get("actividad");
    const apiOverride = params.get("api");
    const API_BASE =
      apiOverride ||
      (location.hostname.includes("localhost")
        ? "http://localhost:3000"
        : "https://diplomado-backend1.onrender.com");

    if (actividad) {
      document.getElementById("actividad-title").innerText =
        "Entrega de Actividad " + actividad;
      document.getElementById("actividadInput").value = actividad;
    }

    const form = document.getElementById("uploadForm");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        const res = await fetch(`${API_BASE}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`HTTP ${res.status} - ${txt}`);
        }

        const data = await res.json();
        mensaje.innerText = data.message || "✅ Archivo enviado correctamente";
      } catch (err) {
        console.error("Error al subir:", err);
        mensaje.innerText = "❌ Error al subir el archivo";
      }
    });
  }

  // ================= ADMIN =================
  if (path.includes("admin.html")) {
    const params = new URLSearchParams(window.location.search);
    const apiOverride = params.get("api");
    const API_BASE =
      apiOverride ||
      (location.hostname.includes("localhost")
        ? "http://localhost:3000"
        : "https://diplomado-backend1.onrender.com");

    async function cargarArchivos() {
      try {
        const res = await fetch(`${API_BASE}/list`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const lista = document.getElementById("lista-archivos");
        lista.innerHTML = "";

        data.archivos.forEach((item) => {
          const url = item.url || `${API_BASE}/uploads/${item.name || item}`;
          const nombre = item.name || item;
          const li = document.createElement("li");
          li.innerHTML = `<a href="${url}" target="_blank" rel="noopener">${nombre}</a>`;
          lista.appendChild(li);
        });
      } catch (err) {
        console.error("Error cargando lista:", err);
        document.getElementById("lista-archivos").innerHTML =
          "<li>❌ No se pudieron cargar los archivos</li>";
      }
    }

    cargarArchivos();
  }

  // ================= DASHBOARD =================
  if (path.includes("dashboard.html")) {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }

    // Acordeón de módulos
    const modulos = document.querySelectorAll(".modulo-btn");
    modulos.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("activo");
        const content = btn.nextElementSibling;
        content.style.display =
          content.style.display === "block" ? "none" : "block";
      });
    });
  }
});
