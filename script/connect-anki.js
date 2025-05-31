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
    console.error("Fetch Error:", error);
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
    return data.result;
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}
