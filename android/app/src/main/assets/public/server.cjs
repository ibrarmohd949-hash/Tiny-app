var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_cors = __toESM(require("cors"), 1);
var import_helmet = __toESM(require("helmet"), 1);
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use((0, import_cors.default)());
  app.use((0, import_helmet.default)({
    contentSecurityPolicy: false
    // For easier integration with Firebase and external images
  }));
  app.use(import_express.default.json());
  app.post("/api/ai/generate-metadata", async (req, res) => {
    try {
      const { prompt } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "Generate a catchy title, 5 trending hashtags, and a 2-3 sentence engaging caption for a short video described by the user. Return JSON with keys: title, hashtags (array), caption."
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: error.message });
    }
  });
  app.post("/api/ai/moderate", async (req, res) => {
    try {
      const { text, type } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following ${type} for a short video platform. Check for adult content, hate speech, spam, or extreme violence. Return JSON with 'status' (approved or rejected) and 'reason' (string). ${type}: "${text}"`,
        config: {
          responseMimeType: "application/json"
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.get("/api/trending", async (req, res) => {
    res.json({
      hashtags: ["Viral2026", "TechReels", "AiDance", "FoodieTok", "ShortsGenZ"],
      topCreators: ["reels_master", "dance_queen", "ai_wizard"]
    });
  });
  app.post("/api/ai/calculate-viral-score", async (req, res) => {
    try {
      const { views, likes, comments, shares, ageInHours } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given these metrics for a short video: Views:${views}, Likes:${likes}, Comments:${comments}, Shares:${shares}, Age:${ageInHours}h. 
                  Calculate a "Viral Score" from 0-100. Consider high engagement relative to views and lower age as higher score. 
                  Return JSON with key 'score' (number).`,
        config: { responseMimeType: "application/json" }
      });
      res.json(JSON.parse(response.text));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== "true",
        watch: process.env.DISABLE_HMR === "true" ? null : {}
      },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
