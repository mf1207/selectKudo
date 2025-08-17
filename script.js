const TOTAL_ROUNDS = 2;
const IMAGE_LIST = [
  { src: "images/a/a1.jpg", type: "A" },
  { src: "images/a/a2.jpg", type: "A" },
  { src: "images/a/a3.jpg", type: "A" },
  { src: "images/a/a4.jpg", type: "A" },
  { src: "images/a/a5.jpg", type: "A" },
  { src: "images/a/a6.jpg", type: "A" },
  { src: "images/a/a7.jpg", type: "A" },
  { src: "images/a/a8.jpg", type: "A" },
  { src: "images/a/a9.jpg", type: "A" },
  { src: "images/a/a10.jpg", type: "A" },
  { src: "images/a/a11.jpg", type: "A" },
  { src: "images/a/a12.jpg", type: "A" },
  { src: "images/a/a13.jpg", type: "A" },
  { src: "images/a/a14.jpg", type: "A" },
  { src: "images/a/a15.jpg", type: "A" },

  { src: "images/not_a/not_a1.jpg", type: "B" },
  { src: "images/not_a/not_a2.jpg", type: "B" },
  { src: "images/not_a/not_a3.jpg", type: "B" },
  { src: "images/not_a/not_a4.jpg", type: "B" },
  { src: "images/not_a/not_a5.jpg", type: "B" },
  { src: "images/not_a/not_a6.jpg", type: "B" },
  { src: "images/not_a/not_a7.jpg", type: "B" },
  { src: "images/not_a/not_a8.jpg", type: "B" },
  { src: "images/not_a/not_a9.jpg", type: "B" },
  { src: "images/not_a/not_a10.jpg", type: "B" },
  { src: "images/not_a/not_a11.jpg", type: "B" },
  { src: "images/not_a/not_a12.jpg", type: "B" },
  { src: "images/not_a/not_a13.jpg", type: "B" },
  { src: "images/not_a/not_a14.jpg", type: "B" },
  { src: "images/not_a/not_a15.jpg", type: "B" },

];

// ===== 상태 =====
let currentRound = 1;
let correctCount = 0;
let targetType = "A";
let currentNine = [];

// ===== DOM =====
const questionEl = document.getElementById("question");
const gridEl = document.getElementById("image-grid");
const submitBtn = document.getElementById("submit-btn");
const reshuffleBtn = document.getElementById("reshuffle-btn");
const progressText = document.getElementById("progress-text");
const resultScreen = document.getElementById("result-screen");
const resultText = document.getElementById("result-text");
const resultDetail = document.getElementById("result-detail");
const restartBtn = document.getElementById("restart-btn");

// ===== 유틸 =====
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandomNine() {
  return shuffle(IMAGE_LIST).slice(0, 9);
}

function renderGrid(items) {
  gridEl.innerHTML = "";
  items.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.type = item.type;
    card.dataset.index = String(idx);

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = (item.type === "A" ? "A" : "B") + " category image";

    card.appendChild(img);
    const label = document.createElement("label");
    label.textContent = item.src.split("/").pop();
    card.appendChild(label);
    card.addEventListener("click", () => card.classList.toggle("selected"));
    gridEl.appendChild(card);
  });
}

function startRound() {
  targetType = "A";
  progressText.textContent = `${currentRound} / ${TOTAL_ROUNDS}`;
  currentNine = pickRandomNine();
  renderGrid(currentNine);
}

function evaluate() {
  const cards = Array.from(document.querySelectorAll(".card"));
  let allCorrect = true;

  for (const card of cards) {
    const isTarget = card.dataset.type === targetType;
    const isSelected = card.classList.contains("selected");
    if (isSelected && !isTarget) allCorrect = false;     // 오선택
    if (isTarget && !isSelected) allCorrect = false;     // 미선택
  }
  return allCorrect;
}

function showResult() {
  document.getElementById("round").classList.add("hidden");
  resultScreen.classList.remove("hidden");

  if (correctCount === TOTAL_ROUNDS) {
    resultText.textContent = "✅ Success!";
  } else {
    resultText.textContent = "❌ Fail";
    resultDetail.textContent = `${correctCount} / ${TOTAL_ROUNDS}`;
  }
}

submitBtn.addEventListener("click", () => {
  const ok = evaluate();
  if (ok) correctCount++;

  if (currentRound < TOTAL_ROUNDS) {
    currentRound++;
    startRound();
  } else {
    showResult();
  }
});

reshuffleBtn.addEventListener("click", () => {
  currentNine = pickRandomNine();
  renderGrid(currentNine);
});

restartBtn.addEventListener("click", () => {
  currentRound = 1;
  correctCount = 0;
  document.getElementById("round").classList.remove("hidden");
  resultScreen.classList.add("hidden");
  startRound();
});

// 시작
document.addEventListener("DOMContentLoaded", startRound);
