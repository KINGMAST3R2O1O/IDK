const levels = [
  { name:"Grief", creator:"nullgdscr", creators:"nullgdscr", verifier:"Raz0r_gd", publisher:"nullgdscr", points:"5000", id:"https://scratch.mit.edu/projects/1136377741/", video:"https://www.youtube.com/watch?v=9lUkjJmZPmY", rank:1, records: [] },
  { name:"Every End", creators:"Showerless2804, MoseCoder", verifier:"Aqua Gd", publisher:"Showerless2804", points:"4900", id:"https://scratch.mit.edu/projects/1161286985/", video:"https://www.youtube.com/watch?v=hSBlAd6RwlI&t=278s", rank:2, records: [] },
  { name:"Night Rider", creators:"Showerless2804", verifier:"Showerless", publisher:"Showerless2804", points:"4750", id:"https://scratch.mit.edu/projects/1146157232/", video:"https://www.youtube.com/watch?v=YA9pMaUhYUI", rank:3, records: [] },
  { name:"Amethyst", creators:"GdAqua", verifier:"Showerless", publisher:"GdAqua", points:"4500", id:"https://scratch.mit.edu/projects/1161286985/", video:"https://www.youtube.com/watch?v=hSBlAd6RwlI&t=278s", rank:4, records: [] },
  { name:"Wasureta", creators:"gdscractch", verifier:"KING_MAST3R2O1O", publisher:"gdscractch", points:"4200", id:"https://scratch.mit.edu/projects/1165397248/", video:"https://www.youtube.com/watch?v=QlNvs341MPI", rank:5, records: [] },
  { name:"Tidal Wave", creators:"MoseCoder", verifier:"Showerless", publisher:"MoseCoder", points:"3800", id:"https://scratch.mit.edu/projects/1121950892/", video:"https://www.youtube.com/watch?v=a385Fo8-gHE", rank:6, records: [] },
  { name:"Defeated Circles", creators:"gdscractch", verifier:"KING_MAST3R2O1O", publisher:"gdscractch", points:"2500", id:"https://scratch.mit.edu/projects/1183427199/", video:"https://www.youtube.com/watch?v=J6IBEQFZxeE", rank:7, records: [] },
  { name:"Solar Flare", creators:"dasamonky", verifier:"KING_MAST3R2O1O", publisher:"dasamonky", points:"2100", id:"https://scratch.mit.edu/projects/1390124247/", video:"https://www.youtube.com/watch?v=rMZdNWoME8M", rank:8, records: [] },
  { name:"Ephemeral Abyss", creators:"GdAqua", verifier:"ShayK47", publisher:"GdAqua", points:"1600", id:"https://scratch.mit.edu/projects/1136878874/", video:"https://www.youtube.com/watch?v=tvZEgNGRUUc", rank:9, records: [] },
  { name:"The Third Variant", creators:"GdAqua", verifier:"Aqua Gd", publisher:"GdAqua", points:"700", id:"https://scratch.mit.edu/projects/1136745773/", password:"N/A", video:"https://www.youtube.com/watch?v=-VDY-pks5dM", rank:10, records: [] }
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
    if (!levelButtons) return;
    levelButtons.innerHTML = levels.map((level, index) => `
        <button class="level-button ${index === selectedLevel ? "active" : ""}" data-index="${index}">
            <span class="rank">#${level.rank || index + 1}</span><span>${level.name}</span>
        </button>`).join("");

    document.querySelectorAll(".level-button").forEach(button => {
        button.addEventListener("click", () => {
            selectedLevel = Number(button.dataset.index);
            renderLevelList();
            showLevel();
        });
    });
}

function showLevel() {
    const level = levels[selectedLevel];
    if (!level) return;
    
    const match = level.video ? level.video.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/) : null;
    const videoId = match ? match[1] : "";

    const videoHTML = videoId
        ? `<div class="video-placeholder" id="videoBox">
             <div class="video-top-bar">SCRATCH // ${level.name} (VERIFIED) // Top ${level.rank}</div>
             <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${level.name} thumbnail">
             <button class="play-btn" onclick="document.getElementById('videoBox').innerHTML='<iframe src=\\'https://www.youtube.com/embed/${videoId}?autoplay=1\\' allow=\\'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\\' allowfullscreen></iframe>'">▶</button>
             <a href="${level.video}" target="_blank" rel="noopener">Watch on YouTube ↗</a>
           </div>`
        : `<div class="video-placeholder"><span>${level.name}<br><small>NO VIDEO AVAILABLE</small></span></div>`;

    const recordsHTML = (level.records && level.records.length > 0)
        ? level.records.map((r, i) => `
            <div class="table-row">
                <div><b>#${i + 1}</b></div>
                <div><span>${r.player}</span></div>
                <div><span>${r.percent}%</span></div>
            </div>`).join("")
        : `<p style="color: var(--muted); margin-top: 15px;">No records submitted yet.</p>`;

    mainContent.innerHTML = `
        <h1>${level.name}</h1>
        <div class="meta">
            <strong>CREATORS</strong><span>${level.creators || level.creator || "Unknown"}</span>
            <strong>VERIFIER</strong><span>${level.verifier}</span>
            <strong>PUBLISHER</strong><span>${level.publisher}</span>
        </div>
        
        ${videoHTML}

     <div class="stats">
            <div class="stat"><b>POINTS WHEN COMPLETED:</b><span>${level.points}</span></div>
            <div class="stat"><b>ID:</b><span><a href="${level.id}" target="_blank" style="color:inherit; text-decoration:underline;">Project Link</a></span></div>
            <div class="stat"><b>PASSWORD:</b><span>${level.password || "N/A"}</span></div>
        </div>

        <div class="page-panel" style="margin-top: 36px; text-align: left;">
            <h2 style="margin-top: 0; text-align: center;">Records</h2>
            <p style="color: var(--muted); text-align: center; font-size: 14px; margin-top: -10px; margin-bottom: 20px;">100% or better to qualify</p>
            ${recordsHTML}
        </div>
    `;
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
    document.getElementById("rouletteResult তাপমাত্রা" || "rouletteResult").textContent = result.name;
  });
}

document.querySelectorAll(".nav-link").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const page = button.dataset.page;
    if (page === "list") { renderLevelList(); showLevel(); }
    if (page === "leaderboard") showLeaderboard();
    if (page === "roulette") showRoulette();
  });
});

const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// Initial Load
renderLevelList();
showLevel();
