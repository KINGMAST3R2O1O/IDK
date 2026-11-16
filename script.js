const levels = [
  { name:"Every End", creators:"Showerless2804, MoseCoder", verifier:"Aqua Gd", publisher:"Showerless2804", points:"350", id:"https://scratch.mit.edu/projects/1161286985/", video:"https://www.youtube.com/watch?v=hSBlAd6RwlI&t=278s", rank:1 },
  { name:"Solar Flare", creators:"Add creator names", verifier:"Add verifier", publisher:"Add publisher", points:"150", id:"Add level ID", password:"N/A", video:"", rank:2 },
  { name:"Ephemeral Abyss", creators:"Add creator names", verifier:"Add verifier", publisher:"Add publisher", points:"100", id:"Add level ID", password:"N/A", video:"", rank:3 },
  { name:"The Third Variant", creators:"Add creator names", verifier:"Add verifier", publisher:"Add publisher", points:"75", id:"Add level ID", password:"N/A", video:"", rank:4 }
];

let selectedLevel = 0;
const levelButtons = document.getElementById("levelButtons");
const mainContent = document.getElementById("mainContent");

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
  mainContent.innerHTML = `
    <h1>${level.name}</h1>
    <div class="meta">
      <strong>CREATORS</strong><span>${level.creators}</span>
      <strong>VERIFIER</strong><span>${level.verifier}</span>
      <strong>PUBLISHER</strong><span>${level.publisher}</span>
    </div>
    <div class="video-placeholder">
      <span>${level.name}<br><small>LEVEL VIDEO</small></span>
      ${level.video ? `<a href="${level.video}" target="_blank" rel="noopener">Watch video ↗</a>` : ""}
    </div>
    <div class="stats">
      <div class="stat"><b>POINTS WHEN COMPLETED</b><span>${level.points}</span></div>
      <div class="stat"><b>ID</b><span>${level.id}</span></div>
      <div class="stat"><b>PASSWORD</b><span>${level.password}</span></div>
    </div>`;
}

function showLeaderboard() {
  mainContent.innerHTML = `<div class="page-panel"><h1>Leaderboard</h1>
    <div class="table-row"><span>Rank</span><span>Player</span><span>Records</span></div>
    <div class="table-row"><b>#1</b><span>Add player</span><span>0</span></div>
    <div class="table-row"><b>#2</b><span>Add player</span><span>0</span></div>
    <p>Player rankings will appear here when you add record data.</p></div>`;
}
function showRoulette() {
  mainContent.innerHTML = `<div class="page-panel"><h1>Roulette</h1><p>Pick a random level from the list.</p>
    <div class="roulette-result" id="rouletteResult">Ready?</div>
    <button class="action-button" id="spinButton">Spin the roulette</button></div>`;
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
document.getElementById("openSubmit").addEventListener("click", () => dialog.showModal());
document.getElementById("submitLevel").innerHTML = levels.map(level => `<option>${level.name}</option>`).join("");
document.getElementById("submitForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  alert(`Demo submission received for ${data.get("player")} — ${data.get("progress")}% on ${data.get("level")}. To save submissions, connect a backend/database.`);
  dialog.close();
  event.currentTarget.reset();
});

renderLevelList();
showLevel();
