// tut.js
window.addEventListener("DOMContentLoaded", () => {
  const nextBox = document.getElementById("nextBox");

  if (!nextBox) return;

  // NEXT-Button → weiter zu tutfinal.html
  nextBox.addEventListener("click", () => {
    window.location.href = "tutfinal.html";
  });
});
