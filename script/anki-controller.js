import {
  getDeckNames,
  getTemplates,
  getLatestCardId,
  getNoteId,
  addSelectedSentenceToTheLastCreatedCard,
  checkConnection,
} from "./anki-repository.js";

export const checkAnkiConnection = async () => {
  return await checkConnection();
};

export const fetchDeckNames = async () => {
  return await getDeckNames();
};

export const fetchTemplates = async () => {
  return await getTemplates();
};

export const fetchLatestCardId = async () => {
  return await getLatestCardId();
};

export const fetchNoteIdFromCardId = async () => {
  const id = await fetchLatestCardId();
  return await getNoteId(id);
};

export const addNewSentence = async (selectedSentence) => {
  const id = await fetchLatestCardId();
  await addSelectedSentenceToTheLastCreatedCard(id, selectedSentence);
};
