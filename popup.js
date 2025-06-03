import { fetchDeckNames, fetchTemplates, checkAnkiConnection } from "./script/anki-controller.js";

const setupAnki = async () => {
  await updateConnectionStatus();
  await deckSetup();
  await templateSetup();
};

const updateConnectionStatus = async () => {
  const isConnected = await checkAnkiConnection();
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.status-text');

  if (isConnected) {
    statusDot.classList.remove('disconnected');
    statusText.classList.remove('disconnected');
    statusText.textContent = 'Connected to Anki';
  } else {
    statusDot.classList.add('disconnected');
    statusText.classList.add('disconnected');
    statusText.textContent = 'Anki not connected';
  }
};

const deckSetup = async () => {
  const decks = await fetchDeckNames();

  if (!Array.isArray(decks)) {
    console.error('Decks is not an array:', decks);
    return;
  }

  const form = document.getElementById("form");

  const container = document.createElement("div");
  container.className = "form-container";

  const label = document.createElement("label");
  label.className = "form-label";
  label.textContent = "Deck Name:";

  const select = document.createElement("select");
  select.name = "deck";
  select.id = "deckSelect";

  decks.forEach((deck) => {
    const option = document.createElement("option");
    option.value = deck;
    option.textContent = deck;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const selectedDeck = select.value;
    chrome.storage.local.set({ selectedDeck });
  });

  chrome.storage.local.get("selectedDeck", (result) => {
    if (result.selectedDeck) {
      select.value = result.selectedDeck;
    }
  });

  container.appendChild(label);
  container.appendChild(select);
  form.appendChild(container);
};

const templateSetup = async () => {
  const templates = await fetchTemplates();

  if (!Array.isArray(templates)) {
    console.error('Templates is not an array:', templates);
    return;
  }

  const form = document.getElementById("form");

  const container = document.createElement("div");
  container.className = "form-container";

  const label = document.createElement("label");
  label.className = "form-label";
  label.textContent = "Deck Template:";

  const select = document.createElement("select");
  select.name = "deck";
  select.id = "templateSelect";

  templates.forEach((template) => {
    const option = document.createElement("option");
    option.value = template;
    option.textContent = template;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const selectedTemplate = select.value;
    chrome.storage.local.set({ selectedTemplate });
  });

  chrome.storage.local.get("selectedTemplate", (result) => {
    if (result.selectedTemplate) {
      select.value = result.selectedTemplate;
    }
  });

  container.appendChild(label);
  container.appendChild(select);
  form.appendChild(container);
};

setupAnki();
