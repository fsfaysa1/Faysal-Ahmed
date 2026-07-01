import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Read JSON data for grounding the AI using process.cwd() (works on ESM and CJS identically)
const loadDataFile = (filename: string) => {
  try {
    const filePath = path.join(process.cwd(), "src", "data", filename);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (err) {
    console.error(`Error loading data file ${filename}:`, err);
  }
  return {};
};

const profileData = loadDataFile("profile.json");
const projectsData = loadDataFile("projects.json");
const servicesData = loadDataFile("services.json");
const skillsData = loadDataFile("skills.json");
const faqData = loadDataFile("faq.json");

// System Instruction for AI Assistant
const systemInstruction = `
You are the AI Portfolio Assistant for Faysal Ahmed, a Junior Software Engineer, Full-Stack Web Developer, and UI/UX Designer based in Mymensingh, Bangladesh.
Your core purpose is to behave as his friendly, professional, and natural personal assistant.

Here is the authoritative information about Faysal Ahmed:
---
PROFILE INFORMATION:
${JSON.stringify(profileData, null, 2)}

PROJECTS:
${JSON.stringify(projectsData, null, 2)}

SERVICES OFFERED:
${JSON.stringify(servicesData, null, 2)}

SKILLS & TECH STACK:
${JSON.stringify(skillsData, null, 2)}

FREQUENTLY ASKED QUESTIONS (FAQ):
${JSON.stringify(faqData, null, 2)}
---

STRICT INSTRUCTIONS FOR YOUR BEHAVIOR:
1. Only answer questions using the facts provided above. If a question is about something not present in the facts, politely say that you don't have that information but encourage them to contact Faysal directly to ask. Never invent, hallucinate, or assume any detail.
2. Maintain a friendly, polite, professional, and natural helper persona. Speak as Faysal's assistant (using "he/him" or "Faysal" to refer to Faysal, and "I" to refer to yourself, e.g., "I can certainly help you with that! Faysal is a talented developer...").
3. Recommend suitable projects of Faysal based on the user's inquiry:
   - If they ask about IPTV or streaming, talk about "Faysal TV".
   - If they ask about invoicing, payments, or business tracking, recommend the "Billing & Invoicing System".
   - If they ask about ISP support or tickets, recommend the "ISP Ticket Support System".
   - If they ask about reading/listening or Islamic platforms, recommend the "Quran Listening & Reading" application.
4. If the visitor wants to contact Faysal, ALWAYS provide his contact links in an easy-to-read, formatted bullet list:
   - Phone: 01736705156
   - Email: fa2626813@gmail.com
   - Website: https://faysal.kesug.com/contact
   - WhatsApp: mrfaysal007 (https://wa.me/8801736705156)
   - Facebook: https://www.facebook.com/profile.php?id=100090807396322
   - LinkedIn: https://www.linkedin.com/in/faysal-ahmed-b81a03398/
   - GitHub: https://github.com/fsfaysa1
   - Instagram: https://www.instagram.com/mrfaysal007/
   - X (Twitter): https://x.com/dnhfaysal
   - TikTok: https://www.tiktok.com/@imfaysa1
5. Always encourage the visitor to contact Faysal for freelance work, collaborations, job opportunities, or business inquiries.
6. Keep answers concise, highly readable, and formatted beautifully in Markdown.
`;

// API routes first
app.get("/api/profile", (req: Request, res: Response) => {
  res.json({ profile: profileData, projects: projectsData, services: servicesData, skills: skillsData, faq: faqData });
});

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
      return;
    }

    const ai = getGeminiClient();

    // Map the conversation history format to Gemini format
    const formattedContents = messages.map((msg: any) => {
      return {
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Error in /api/chat endpoint:", error);
    res.status(500).json({
      error: "An error occurred during communication with the AI Assistant. Make sure the GEMINI_API_KEY is configured correctly.",
      details: error.message,
    });
  }
});

async function startServer() {
  // Vite middleware setup for assets and SPA router
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
