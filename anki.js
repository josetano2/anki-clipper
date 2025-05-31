import {
  addNewSentence,
  fetchLatestCardId,
  fetchNoteIdFromCardId,
} from "./script/anki-controller.js";
import { MENU } from "./script/var.js";

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: MENU.mineSentence,
    title: "Mine sentence",
    type: "normal",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((item) => {
  const menuId = item.menuItemId;
  if (menuId === MENU.mineSentence) {
    const selectedText = item.selectionText;

    /**
     * TODO: Insert to the last anki created card on the deck
     */
    addNewSentence(selectedText);
  }
});
