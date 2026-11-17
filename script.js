const levels = [
  { name:"Grief", creator:"nullgdscr", creators:"nullgdscr", verifier:"Raz0r_gd", publisher:"nullgdscr", points:"2500", id:"https://scratch.mit.edu/projects/1136377741/", video:"https://www.youtube.com/watch?v=9lUkjJmZPmY", rank:1 },
  { name:"Every End", creators:"Showerless2804, MoseCoder", verifier:"Aqua Gd", publisher:"Showerless2804", points:"2250", id:"https://scratch.mit.edu/projects/1161286985/", video:"https://www.youtube.com/watch?v=hSBlAd6RwlI&t=278s", rank:2 },
  { name:"Night Rider", creators:"Showerless2804", verifier:"Showerless", publisher:"Showerless2804", points:"2000", id:"https://scratch.mit.edu/projects/1146157232/", video:"https://www.youtube.com/watch?v=YA9pMaUhYUI", rank:3 },
  { name:"Amethyst", creators:"GdAqua", verifier:"Showerless", publisher:"GdAqua", points:"2000", id:"https://scratch.mit.edu/projects/1161286985/", video:"https://www.youtube.com/watch?v=hSBlAd6RwlI&t=278s", rank:4 },
  { name:"Solar Flare", creators:"Add creator names", verifier:"Add verifier", publisher:"Add publisher", points:"1900", id:"https://scratch.mit.edu/projects/1390124247/", video:"https://www.youtube.com/watch?v=rMZdNWoME8M", rank:5 },
  { name:"Ephemeral Abyss", creators:"GdAqua", verifier:"ShayK47", publisher:"GdAqua", points:"1500", id:"https://scratch.mit.edu/projects/1136878874/", video:"https://www.youtube.com/watch?v=tvZEgNGRUUc", rank:6 },
  { name:"The Third Variant", creators:"Add creator names", verifier:"Add verifier", publisher:"Add publisher", points:"75", id:"Add level ID", password:"N/A", video:"", rank:7 }
];

let selectedLevel = 0;
const levelButtons = document.getElementById("levelButtons");
const mainContent = document.getElementById("mainContent");

function getYouTubeThumbnail(videoUrl) {
  if (!videoUrl) return "";
  const match = videoUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "";
}

function renderLevelList() {
  levelButtons.innerHTML = levels.map((level, index) => `
    <button class="level-button ${index === selectedLevel ? "active" : ""}" data-index="${index}">
      <span class="rank">#${level.rank}</span><span>${level.name}</span>
    </button>`).join("");

  levelButtons.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      selectedLevel = Number(button.dataset.index);
      renderLevelList();
      showLevel();
    });
  });
}

function showLevel() {
  const level = levels[selectedLevel];
  const thumbnail = getYouTubeThumbnail(level.video || "");

  mainContent.innerHTML = `
    <h1>${level.name}</h1>
    <div class="meta">
      <strong>CREATORS</strong><span>${level.creators || level.creator || "Unknown"}</span>
      <strong>VERIFIER</strong><span>${level.verifier}</span>
      <strong>PUBLISHER</strong><span>${level.publisher}</span>
    </div>
    <div class="video-placeholder">
      ${thumbnail
        ? `<a href="${level.video}" target="_blank" rel="noopener"><img src="${thumbnail}" alt="${level.name} YouTube thumbnail"></a>`
        : `<span>${level.name}<br><small>NO VIDEO AVAILABLE</small></span>`
      }
      ${level.video ? `<a href="${level.video}" target="_blank" rel="noopener">Watch video ↗</a>` : ""}
    </div>
    <div class="stats">
      <div class="stat"><b>POINTS WHEN COMPLETED</b><span>${level.points}</span></div>
      <div class="stat"><b>ID</b><span>${level.id}</span></div>
      <div class="stat"><b>PASSWORD</b><span>${level.password || "N/A"}</span></div>
    </div>`;
}

function showLeaderboard() {
  mainContent.innerHTML = `
    <div class="page-panel">
      <h1>Leaderboard</h1>
      <div class="table-row"><span>Rank</span><span>Player</span><span>Records</span></div>
      <div class="table-row"><b>#1</b><span>Add player</span><span>0</span></div>
      <div class="table-row"><b>#2</b><span>Add player</span><span>0</span></div>
      <p>Player rankings will appear here when you add record data.</p>
    </div>`;
}

function showRoulette() {
  mainContent.innerHTML = `
    <div class="page-panel">
      <h1>Roulette</h1>
      <p>Pick a random level from the list.</p>
      <div class="roulette-result" id="rouletteResult">Ready?</div>
      <button class="action-button" id="spinButton">Spin the roulette</button>
    </div>`;

  document.getElementById("spinButton").addEventListener("click", () => {
    const result = levels[Math.floor(Math.random() * levels.length)];
    document.getElementById("rouletteResult").textContent = result.name;
  });
}

document.querySelectorAll(".nav-link").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    if (button.dataset.page === "list") { renderLevelList(); showLevel(); }
    if (button.dataset.page === "leaderboard") showLeaderboard();
    if (button.dataset.page === "roulette") showRoulette();
  });
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const dialog = document.getElementById("submitDialog");
const openSubmitBtn = document.getElementById("openSubmit");
if (openSubmitBtn && dialog) {
  openSubmitBtn.addEventListener("click", () => dialog.showModal());
}

const submitLevelSelect = document.getElementById("submitLevel");
if (submitLevelSelect) {
  submitLevelSelect.innerHTML = levels.map(level => `<option>${level.name}</option>`).join("");
}

const submitForm = document.getElementById("submitForm");
if (submitForm) {
  submitForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    alert(`Demo submission received for ${data.get("player")} — ${data.get("progress")}% on ${data.get("level")}. To save submissions, connect a backend/database.`);
    dialog.close();
    event.currentTarget.reset();
  });
}

renderLevelList();
showLevel();
