// NFC Golf - per-club storage + edit prompts (supports ?club=1 or #1)
// Saves to localStorage and updates the UI instantly (no page reload)

const params = new URLSearchParams(window.location.search);
const fromQuery = params.get("club");
const fromHash = (window.location.hash || "").replace("#", "").trim();

// Default to "1" so you never fall into "default" accidentally
const clubId = (fromQuery || fromHash || "1").trim();
const dataKey = "club_" + clubId;

function setText(id, value, fallback = "Not set") {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = (value && String(value).trim()) ? value : fallback;
}

function loadData() {
  return JSON.parse(localStorage.getItem(dataKey)) || {
    brandModel: "",
    clubType: "",
    distance: "",
    use: "",
    consistency: "",
    notes: ""
  };
}

function render(d) {
  setText("club-brand-model", d.brandModel);
  setText("club-type", d.clubType);
  setText("club-distance", d.distance);
  setText("club-use", d.use);
  setText("club-consistency", d.consistency);
  setText("club-notes", d.notes, "None");
}

// Load + render once on page load
let data = loadData();
render(data);

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

    // Save
    localStorage.setItem(dataKey, JSON.stringify(newData));

    // Update in-memory + UI instantly (no reload)
    data = newData;
    render(data);
  };
}
