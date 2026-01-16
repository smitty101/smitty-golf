const params = new URLSearchParams(window.location.search);
const fromQuery = params.get("club");
const fromHash = (window.location.hash || "").replace("#", "").trim();

const clubId = fromQuery || fromHash || "default";
const dataKey = "club_" + clubId;

const data = JSON.parse(localStorage.getItem(dataKey)) || {};

document.getElementById("club-name").textContent = data.name || "Not set";
document.getElementById("club-distance").textContent = data.distance || "Not set";
document.getElementById("club-notes").textContent = data.notes || "None";

document.getElementById("editBtn").onclick = () => {
  const name = prompt("Club name:", data.name || "");
  const distance = prompt("Distance:", data.distance || "");
  const notes = prompt("Notes:", data.notes || "");

  const newData = { name, distance, notes };
  localStorage.setItem(dataKey, JSON.stringify(newData));
  location.reload();
};
