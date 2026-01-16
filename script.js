// NFC Golf - per-club storage + edit form (supports ?club=1 or #1)

const params = new URLSearchParams(window.location.search);
const fromQuery = params.get("club");
const fromHash = (window.location.hash || "").replace("#", "").trim();

const clubId = fromQuery || fromHash || "default";
const dataKey = "club_" + clubId;

const data = JSON.parse(localStorage.getItem(dataKey)) || {
  brandModel: "",
  clubType: "",
  distance: "",
  use: "",
  consistency: "",
  notes: ""
};

function setText(id, value, fallback = "Not set") {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = (value && String(value).trim()) ? value : fallback;
}

setText("club-brand-model", data.brandModel);
setText("club-type", data.clubType);
setText("club-distance", data.distance);
setText("club-use", data.use);
setText("club-consistency", data.consistency);
setText("club-notes", data.notes, "None");

const editBtn = document.getElementById("editBtn");
if (editBtn) {
  editBtn.onclick = () => {
    const brandModel = prompt("Club brand/model:", data.brandModel || "") ?? data.brandModel;
    const clubType = prompt("Club type (e.g., 7 Iron, Driver):", data.clubType || "") ?? data.clubType;
    const distance = prompt("Typical distance:", data.distance || "") ?? data.distance;
    const use = prompt("Shot/use (when you pull it):", data.use || "") ?? data.use;
    const consistency = prompt("Consistency (e.g., 1-10 or High/Med/Low):", data.consistency || "") ?? data.consistency;
    const notes = prompt("Swing cue / notes:", data.notes || "") ?? data.notes;

    const newData = { brandModel, clubType, distance, use, consistency, notes };
    localStorage.setItem(dataKey, JSON.stringify(newData));
    location.reload();
  };
}
