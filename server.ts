import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API endpoint for AI-powered Lộ trình Độc bản 1-Click
app.post('/api/generate-route', async (req: Request, res: Response) => {
  try {
    const { budget, vibe, outfitColor, startPoint, currentPocketMoney } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback to intelligent local curation if API key is not configured
      return res.json({
        success: true,
        source: 'local_engine',
        data: null,
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Bạn là cố vấn du lịch kiệt hẻm Cố Đô Huế cho Web App ROUTEEN - "HERITAGE WALK: Săn di sản, Xơi đặc sản" (Key message: "Chạm di sản kiệt hẻm - Làm chủ ngân sách Gen Z").
Người dùng là bạn trẻ Gen Z với thông tin chuyến đi:
- Điểm xuất phát: ${startPoint || 'Cầu Tràng Tiền, Huế'}
- Ngân sách còn lại trong túi: ${currentPocketMoney || budget || '150.000'} VNĐ
- Vibe mong muốn: ${vibe || 'Cổ kính rêu phong & kiệt hẻm authentic'}
- Màu outfit đang mặc: ${outfitColor || 'Áo dài tím / Áo thun trắng vintage'}

Hãy viết một gợi ý "Lộ trình Độc bản 1-Click" gồm đúng 3 chặng:
1. Một di sản văn hóa / công trình kiến trúc ít người biết (ẩn trong kiệt hẻm hoặc ven sông Hương) hợp màu outfit.
2. Một quán ăn đặc sản lâu đời nằm sâu trong kiệt hẻm với giá niêm yết rõ ràng minh bạch (bánh bèo, bánh ép, bún bò kiệt, bánh canh Nam Phổ, v.v.).
3. Một điểm trải nghiệm làng thủ công nghệ nhân Huế (nón lá Phú Cam/Tây Hồ, hoa giấy Thanh Tiên, tranh Sình, đúc đồng...).

Giọng điệu: Dí dỏm, đậm chất Gen Z nhưng thấu hiểu chiều sâu văn hóa Cố Đô, dùng từ ngữ Huế dễ thương (mệ, o, tê, rứa, nghen).
Định dạng trả về JSON với cấu trúc:
{
  "routeName": "tên lộ trình bắt tai",
  "hueGreeting": "lời chào dí dỏm bằng tiếng Huế",
  "stops": [
    {"type": "heritage", "name": "...", "kietAddress": "...", "estCost": 0, "outfitMatchReason": "...", "tip": "..."},
    {"type": "food", "name": "...", "kietAddress": "...", "estCost": 35000, "outfitMatchReason": "...", "tip": "..."},
    {"type": "craft", "name": "...", "kietAddress": "...", "estCost": 20000, "outfitMatchReason": "...", "tip": "..."}
  ],
  "totalEstCost": 55000,
  "budgetFitAnalysis": "giải thích vì sao vừa in túi tiền",
  "socialFlexCaption": "gợi ý caption đăng Facebook / TikTok / Instagram"
}
Chỉ trả về JSON thuần túy, không có markdown formatting thừa.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '{}';
    let parsedData = {};
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = { raw: text };
    }

    return res.json({
      success: true,
      source: 'gemini',
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Gemini route generation error:', error?.message || error);
    return res.json({
      success: false,
      error: error?.message || 'Server error',
      source: 'local_engine',
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Heritage Walk ROUTEEN server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
