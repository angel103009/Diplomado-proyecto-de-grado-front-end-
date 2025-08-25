// Acordeón: mostrar solo el módulo seleccionado
document.querySelectorAll(".modulo-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;

    // Cerrar todos los demás
    document.querySelectorAll(".modulo-content").forEach((other) => {
      if (other !== content) {
        other.style.maxHeight = null;
        other.classList.remove("open");
      }
    });

    // Alternar el módulo clicado
    if (content.classList.contains("open")) {
      content.style.maxHeight = null;
      content.classList.remove("open");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("open");
    }
  });
});

// Botón de cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "index.html"; // Redirige al login
});
