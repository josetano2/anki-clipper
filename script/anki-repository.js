import { conn } from "./var.js";

export async function getDeckNames() {
  try {
    const response = await fetch(conn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "deckNames",
        version: 6,
      }),
    });

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getTemplates() {
  try {
    const response = await fetch(conn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "modelNames",
        version: 6,
      }),
    });

    const data = await response.json();
    return data.result?.[0];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getLatestCardId() {
  try {
    const response = await fetch(conn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "findCards",
        version: 6,
        params: {
          query: "added:1",
        },
      }),
    });
    const data = await response.json();
    console.log(data.result[0])
    return data.result[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getNoteId(cardId) {
  try {
    const response = await fetch(conn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "getCardsInfo",
        version: 6,
        params: {
          cards: [cardId],
        },
      }),
    });
    const data = await response.json();
    console.log(data);
    return data.result;
  } catch (error) {
    console.error(error);
  }
}

export async function addSelectedSentenceToTheLastCreatedCard(
  cardId,
  selectedSentence
) {
  try {
    const response = await fetch(conn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "updateNoteFields",
        version: 6,
        params: {
          note: {
            id: cardId,
            fields: {
              sentence: selectedSentence,
            },
          },
        },
      }),
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
