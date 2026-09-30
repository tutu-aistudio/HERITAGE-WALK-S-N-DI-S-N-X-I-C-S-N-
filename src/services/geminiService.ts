import { HUE_LOCATIONS } from '../data/hueData';
import { LocationItem } from '../types';

export interface GeneratedRouteResult {
  routeName: string;
  hueGreeting: string;
  stops: LocationItem[];
  totalEstCost: number;
  budgetFitAnalysis: string;
  socialFlexCaption: string;
  source: 'gemini' | 'local_engine';
}

export async function generateSmartRoute(params: {
  budget: number;
  vibe: string;
  outfitColor: string;
  startPoint: string;
  currentPocketMoney: number;
}): Promise<GeneratedRouteResult> {
  try {
    const res = await fetch('/api/generate-route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (data.success && data.source === 'gemini' && data.data && data.data.stops) {
      // Find matching items from local db by type/name or adapt them
      const stops: LocationItem[] = [];
      const aiStops = data.data.stops;

      for (const item of aiStops) {
        const found = HUE_LOCATIONS.find(
          (loc) =>
            loc.name.toLowerCase().includes(item.name.toLowerCase()) ||
            item.name.toLowerCase().includes(loc.name.toLowerCase()) ||
            loc.category === item.type
        );
        if (found && !stops.some((s) => s.id === found.id)) {
          stops.push({
            ...found,
            outfitTip: item.outfitMatchReason || found.outfitTip,
            genZReview: item.tip || found.genZReview,
          });
        }
      }

      // If needed, complete 3 stops (1 heritage, 1 food, 1 craft)
      completeThreeStops(stops, params.budget, params.vibe);

      return {
        routeName: data.data.routeName || 'Lộ Trình Kiệt Hẻm Độc Bản Cố Đô',
        hueGreeting: data.data.hueGreeting || 'Dạ chào bạn trẻ! Hôm nay dạo quanh Huế thương cùng ROUTEEN nghen!',
        stops,
        totalEstCost: data.data.totalEstCost || stops.reduce((sum, s) => sum + s.estPrice, 0),
        budgetFitAnalysis: data.data.budgetFitAnalysis || `Lộ trình tối ưu vừa in ví tiền ${params.currentPocketMoney.toLocaleString('vi-VN')}đ của bạn!`,
        socialFlexCaption: data.data.socialFlexCaption || `Check-in kiệt hẻm Cố Đô Huế cùng #Routeen #HeritageWalk #SanDiSanXoiDacSan`,
        source: 'gemini',
      };
    }
  } catch (err) {
    console.warn('Backend route generation unavailable, switching to local smart curation engine', err);
  }

  // Fallback: Local smart algorithm
  return generateLocalSmartRoute(params);
}

function completeThreeStops(stops: LocationItem[], budget: number, vibe: string) {
  const categories: ('heritage' | 'food' | 'craft')[] = ['heritage', 'food', 'craft'];
  for (const cat of categories) {
    if (!stops.some((s) => s.category === cat)) {
      const candidate = HUE_LOCATIONS.find(
        (loc) => loc.category === cat && !stops.some((s) => s.id === loc.id)
      );
      if (candidate) stops.push(candidate);
    }
  }
}

export function generateLocalSmartRoute(params: {
  budget: number;
  vibe: string;
  outfitColor: string;
  startPoint: string;
  currentPocketMoney: number;
}): GeneratedRouteResult {
  const { vibe, outfitColor, currentPocketMoney } = params;

  // 1. Pick Heritage (cost: 0)
  const heritageCandidates = HUE_LOCATIONS.filter((l) => l.category === 'heritage');
  const matchedHeritage =
    heritageCandidates.find((h) => h.vibeTags.includes(vibe) || h.recommendedOutfitColors.includes(outfitColor)) ||
    heritageCandidates[0];

  // 2. Pick Food Kiệt Hẻm within budget
  const foodCandidates = HUE_LOCATIONS.filter((l) => l.category === 'food' && l.estPrice <= currentPocketMoney * 0.6);
  const matchedFood =
    foodCandidates.find((f) => f.vibeTags.includes(vibe)) ||
    foodCandidates[0] ||
    HUE_LOCATIONS.find((l) => l.category === 'food')!;

  // 3. Pick Craft Village within remaining budget
  const spentSoFar = (matchedHeritage?.estPrice || 0) + (matchedFood?.estPrice || 0);
  const remainingForCraft = Math.max(0, currentPocketMoney - spentSoFar);
  const craftCandidates = HUE_LOCATIONS.filter((l) => l.category === 'craft');
  const matchedCraft =
    craftCandidates.find((c) => c.estPrice <= remainingForCraft && c.recommendedOutfitColors.includes(outfitColor)) ||
    craftCandidates.find((c) => c.estPrice <= remainingForCraft) ||
    craftCandidates[0];

  const stops = [matchedHeritage, matchedFood, matchedCraft].filter(Boolean);
  const totalEstCost = stops.reduce((sum, item) => sum + item.estPrice, 0);

  const routeName = `Combo 1-Click: ${matchedHeritage.name.split('&')[0]} - ${matchedFood.name.split('(')[0]} - ${matchedCraft.name}`;
  const hueGreeting = `Răng rứa bạn ơi? Hôm nay diện outfit ${outfitColor}, dắt lưng ${currentPocketMoney.toLocaleString('vi-VN')}đ là tha hồ phá đảo kiệt hẻm Cố Đô rồi nghen!`;
  const budgetFitAnalysis = `Tổng chi phí dự kiến chỉ ${totalEstCost.toLocaleString('vi-VN')} VNĐ, bạn vẫn còn dư ${(currentPocketMoney - totalEstCost).toLocaleString('vi-VN')} VNĐ uống thêm ly cafe muối hoặc chè hẻm mụ Kiệt!`;
  const socialFlexCaption = `✨ Đã "săn di sản, xơi đặc sản" phá đảo 3 toạ độ kiệt hẻm xứ Huế với đúng ${totalEstCost.toLocaleString('vi-VN')}đ! Vừa ăn ngon, vừa check-in cháy máy không sợ bị chém giá. 📸💜 #HeritageWalk #Routeen #SanDiSanXoiDacSan #HueKiethEm`;

  return {
    routeName,
    hueGreeting,
    stops,
    totalEstCost,
    budgetFitAnalysis,
    socialFlexCaption,
    source: 'local_engine',
  };
}
