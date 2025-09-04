document.addEventListener("DOMContentLoaded", () => {
  const themeSwitch = document.getElementById("theme-switch");
  const body = document.body;

  // Carregar preferência salva
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("darkmode");
  }

  themeSwitch.addEventListener("click", () => {
    body.classList.toggle("darkmode");

    // Salvar no localStorage
    if (body.classList.contains("darkmode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});
