// birth.js
window.addEventListener("DOMContentLoaded", () => {
  const nextBox = document.getElementById("nextBox");

  if (!nextBox) return;

  // NEXT-Button → weiter zu tut.html
  nextBox.addEventListener("click", () => {
    window.location.href = "tut.html";
  });
});
