const MAX_OPTIONS = 10;

const mealForm = document.querySelector("#mealForm");
const editingIdInput = document.querySelector("#editingId");
const mealNameInput = document.querySelector("#mealName");
const costRatingInput = document.querySelector("#costRating");
const healthRatingInput = document.querySelector("#healthRating");
const travelRatingInput = document.querySelector("#travelRating");
const formTitle = document.querySelector("#formTitle");
const formError = document.querySelector("#formError");
const submitButton = document.querySelector("#submitButton");
const cancelEditButton = document.querySelector("#cancelEditButton");
const resetButton = document.querySelector("#resetButton");
const calculateButton = document.querySelector("#calculateButton");
const randomButton = document.querySelector("#randomButton");
const optionList = document.querySelector("#optionList");
const rankingList = document.querySelector("#rankingList");
const optionCount = document.querySelector("#optionCount");
const emptyOptions = document.querySelector("#emptyOptions");
const emptyResults = document.querySelector("#emptyResults");
const pickResult = document.querySelector("#pickResult");

let options = [];
let currentRanking = [];

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getScore(option) {
  return option.cost + option.health + option.travel;
}

function normalizeName(name) {
  return name.trim().toLowerCase();
}

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function clearError() {
  formError.textContent = "";
}

function showError(message) {
  formError.textContent = message;
}

function getFormValues() {
  return {
    id: editingIdInput.value || createId(),
    name: mealNameInput.value.trim(),
    cost: Number(costRatingInput.value),
    health: Number(healthRatingInput.value),
    travel: Number(travelRatingInput.value)
  };
}

function validateOption(option, editingId = "") {
  if (!option.name || !option.cost || !option.health || !option.travel) {
    return "Please enter a name and choose all three ratings.";
  }

  const duplicate = options.some((existingOption) => {
    return existingOption.id !== editingId && normalizeName(existingOption.name) === normalizeName(option.name);
  });

  if (duplicate) {
    return "That option is already in your list.";
  }

  if (!editingId && options.length >= MAX_OPTIONS) {
    return "You can add up to 10 options.";
  }

  return "";
}

function resetForm() {
  mealForm.reset();
  editingIdInput.value = "";
  formTitle.textContent = "Add an option";
  submitButton.textContent = "Add option";
  cancelEditButton.classList.add("hidden");
  clearError();
}

function clearResults() {
  currentRanking = [];
  rankingList.innerHTML = "";
  emptyResults.classList.remove("hidden");
  pickResult.textContent = "Use Random Pick after calculating your top choices.";
}

function renderOptions() {
  optionList.innerHTML = "";
  optionCount.textContent = `${options.length} of ${MAX_OPTIONS} added`;
  emptyOptions.classList.toggle("hidden", options.length > 0);

  options.forEach((option) => {
    const item = document.createElement("li");
    item.className = "option-card";
    const safeName = escapeHtml(option.name);
    const safeLabel = escapeAttribute(option.name);
    item.innerHTML = `
      <div class="option-main">
        <p class="option-name">${safeName}</p>
        <span class="score-pill">${getScore(option)}/15</span>
      </div>
      <div class="rating-row" aria-label="Ratings for ${safeLabel}">
        <span class="rating-chip">Cost ${option.cost}</span>
        <span class="rating-chip">Health ${option.health}</span>
        <span class="rating-chip">Travel ${option.travel}</span>
      </div>
      <div class="card-actions">
        <button class="icon-button" type="button" data-action="edit" data-id="${option.id}">Edit</button>
        <button class="icon-button danger-button" type="button" data-action="delete" data-id="${option.id}">Delete</button>
      </div>
    `;
    optionList.appendChild(item);
  });
}

function shuffleGroup(group) {
  return [...group].sort(() => Math.random() - 0.5);
}

function rankOptions() {
  const groups = new Map();

  options.forEach((option) => {
    const score = getScore(option);
    if (!groups.has(score)) {
      groups.set(score, []);
    }
    groups.get(score).push(option);
  });

  return [...groups.keys()]
    .sort((a, b) => b - a)
    .flatMap((score) => shuffleGroup(groups.get(score)))
    .slice(0, 3);
}

function renderRanking() {
  rankingList.innerHTML = "";
  emptyResults.classList.toggle("hidden", currentRanking.length > 0);

  currentRanking.forEach((option) => {
    const item = document.createElement("li");
    item.className = "ranking-card";
    const safeName = escapeHtml(option.name);
    const safeLabel = escapeAttribute(option.name);
    item.innerHTML = `
      <div class="ranking-main">
        <p class="ranking-name">${safeName}</p>
        <span class="score-pill">${getScore(option)}/15</span>
      </div>
      <div class="rating-row" aria-label="Ratings for ranked option ${safeLabel}">
        <span class="rating-chip">Cost ${option.cost}</span>
        <span class="rating-chip">Health ${option.health}</span>
        <span class="rating-chip">Travel ${option.travel}</span>
      </div>
    `;
    rankingList.appendChild(item);
  });
}

function startEdit(id) {
  const option = options.find((currentOption) => currentOption.id === id);
  if (!option) {
    return;
  }

  editingIdInput.value = option.id;
  mealNameInput.value = option.name;
  costRatingInput.value = option.cost;
  healthRatingInput.value = option.health;
  travelRatingInput.value = option.travel;
  formTitle.textContent = "Edit option";
  submitButton.textContent = "Save changes";
  cancelEditButton.classList.remove("hidden");
  clearError();
  mealNameInput.focus();
}

function deleteOption(id) {
  options = options.filter((option) => option.id !== id);
  resetForm();
  clearResults();
  renderOptions();
}

mealForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const editingId = editingIdInput.value;
  const option = getFormValues();
  const error = validateOption(option, editingId);

  if (error) {
    showError(error);
    return;
  }

  if (editingId) {
    options = options.map((existingOption) => {
      return existingOption.id === editingId ? option : existingOption;
    });
  } else {
    options.push(option);
  }

  resetForm();
  clearResults();
  renderOptions();
});

optionList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  const { action, id } = button.dataset;

  if (action === "edit") {
    startEdit(id);
  }

  if (action === "delete") {
    deleteOption(id);
  }
});

cancelEditButton.addEventListener("click", resetForm);

calculateButton.addEventListener("click", () => {
  if (options.length < 2) {
    showError("Add at least 2 options before calculating.");
    return;
  }

  clearError();
  currentRanking = rankOptions();
  pickResult.textContent = "Use Random Pick to choose from these top options.";
  renderRanking();
});

randomButton.addEventListener("click", () => {
  if (currentRanking.length === 0) {
    showError("Calculate your top choices before using Random Pick.");
    return;
  }

  clearError();
  const selected = currentRanking[Math.floor(Math.random() * currentRanking.length)];
  pickResult.innerHTML = `<strong>${escapeHtml(selected.name)}</strong>Randomly chosen from your calculated top ${currentRanking.length}.`;
});

resetButton.addEventListener("click", () => {
  options = [];
  resetForm();
  clearResults();
  renderOptions();
});

renderOptions();
clearResults();
