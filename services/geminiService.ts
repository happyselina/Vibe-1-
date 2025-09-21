
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we assume the key is present.
  console.warn("API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const SYSTEM_INSTRUCTION = `你是一位溫柔且富有同情心的引導師，專為高敏感族群（HSP）服務。你的任務是提供簡短、有力量且能帶來平靜的自我肯定語句。請避免使用陳腔濫調或過於激昂的語言。專注於驗證感受、將敏感視為一種力量，並鼓勵自我關懷。回應必須使用繁體中文，且只包含一句精煉的肯定語句，不要有任何額外的解釋或前言。`;

export const generateAffirmation = async (feeling: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("API 金鑰未設定。請檢查您的環境變數。");
  }
  
  try {
    const prompt = `為一個正在經歷以下感受的人生成一句自我肯定語句：「${feeling}」`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.8,
            topP: 0.95,
        }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating affirmation:", error);
    return "抱歉，我現在無法產生肯定語句。請稍後再試。";
  }
};
