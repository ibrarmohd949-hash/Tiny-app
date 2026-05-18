import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));

// AI API Endpoints
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
  } catch (error: any) {
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
        responseMimeType: "application/json",
      }
    });
    res.json(JSON.parse(response.text));
  } catch (error: any) {
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/ai/recommendations", async (req, res) => {
  try {
    const { userInterests, recentViews, availableVideos } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User interests: ${JSON.stringify(userInterests)}. Recent viewed video tags: ${JSON.stringify(recentViews)}. 
                Available videos: ${JSON.stringify(availableVideos)}.
                Return a JSON array of video IDs ranked by relevance to this user.`,
      config: { responseMimeType: "application/json" }
    });
    res.json(JSON.parse(response.text));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/notifications/target", async (req, res) => {
  try {
    const { campaignType, targetAudience } = req.body;
    console.log(`Sending ${campaignType} notification to ${targetAudience}`);
    res.json({ success: true, message: "Campaign scheduled" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== "true",
        watch: process.env.DISABLE_HMR === "true" ? null : {},
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else if (!process.env.VERCEL) {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();


