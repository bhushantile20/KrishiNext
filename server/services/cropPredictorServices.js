const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function cropPredictorServices(soil, altitude, temperature, humidity, rainfall) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Given the following conditions:
- Soil type: ${soil}
- Altitude: ${altitude} km
- Temperature: ${temperature}°C
- Humidity: ${humidity}%
- Rainfall: ${rainfall} mm

List 4–6 crops that will thrive under these conditions. For each crop, provide a short reason (1 line) explaining why it's suitable.

Format the output **as raw JSON** like this:
[
  { "crop": "Wheat", "reason": "Tolerates clay soil and low rainfall." },
  { "crop": "Tea", "reason": "Thrives in high altitude and humidity." }
]

Respond with **only** the JSON array — no extra text or explanation.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    console.log('Raw Gemini response:', text);

    // Clean Markdown formatting (```json ... ```) if present
    text = text.trim();
    if (text.startsWith("```json") || text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    let crops;
    try {
      crops = JSON.parse(text);
    } catch (parseError) {
      console.error("❌ Failed to parse Gemini response as JSON:", parseError.message);
      throw new Error("Invalid response format from Gemini API");
    }

    return crops;
  } catch (error) {
    console.error("🌩️ Error in cropPredictorServices:", error.message || error);
    throw new Error("Failed to generate crop prediction");
  }
}

module.exports = {
  cropPredictorServices,
};
