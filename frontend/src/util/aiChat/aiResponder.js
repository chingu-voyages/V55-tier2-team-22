import { GoogleGenAI } from "@google/genai";

const aiContext =
  "Use the following context information to answer the next question: " +
  "* You are a helper bot designed to help the user using this application/website. Prefer short responses. Be professional. " +
  "* The purpose of this app is help users find developer resources in an organized manner. " +
  "* Resources are organized as cards in the middle of the page. " +
  "* The user can flip through card pages by using the pagination bar at the bottom. " +
  "* The user can sort resources by type in ascending or descending order by using the dropdown at the top of the page. " +
  "* The user can filter resources by title or author, by using the search bar at the top of the page." +
  "* The user can filter resources by tag type, by using the tag dropdown at the top of the page. "
  // The AI keeps saying there's a "save resource" feature for some reason! I don't know why!
  "* There is no 'save resource' feature in this application. ";

export class AiResponser {
  constructor() {
    this.ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  }

  async getResponse(prompt) {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: aiContext.concat(" ", prompt)
    });

    return response.text;
  }
}
