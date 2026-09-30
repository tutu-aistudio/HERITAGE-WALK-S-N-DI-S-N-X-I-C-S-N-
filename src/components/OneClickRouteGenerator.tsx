import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Navigation, 
  Wallet, 
  Shirt, 
  Flame, 
  Clock, 
  Volume2, 
  Share2, 
  PlusCircle, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw,
  Info
} from 'lucide-react';
import { HUE_START_POINTS, VIBE_OPTIONS, OUTFIT_COLORS, HUE_LOCATIONS } from '../data/hueData';
import { LocationItem, CategoryType } from '../types';
import { generateSmartRoute, GeneratedRouteResult } from '../services/geminiService';

interface OneClickRouteGeneratorProps {
  currentBudget: number;
  onUpdateBudget: (val: number) => void;
  onAddExpense: (stop: LocationItem) => void;
  onSelectAudioStop: (stop: LocationItem) => void;
  onOpenSocialFlex: (route: GeneratedRouteResult) => void;
}

export const OneClickRouteGenerator: React.FC<OneClickRouteGeneratorProps> = ({
  currentBudget,
  onUpdateBudget,
  onAddExpense,
  onSelectAudioStop,
  onOpenSocialFlex,
}) => {
  const [startPoint, setStartPoint] = useState(HUE_START_POINTS[0].name);
  const [pocketMoney, setPocketMoney] = useState(currentBudget || 150000);
  const [selectedVibe, setSelectedVibe] = useState(VIBE_OPTIONS[0]);
  const [selectedOutfit, setSelectedOutfit] = useState(OUTFIT_COLORS[0].name);
  const [isGenerating, setIsGenerating] = useState(false);
  const [routeResult, setRouteResult] = useState<GeneratedRouteResult | null>(null);
  const [addedStops, setAddedStops] = useState<Record<string, boolean>>({});

  const handleGenerate = async () => {
    setIsGenerating(true);
    onUpdateBudget(pocketMoney);

    try {
      const res = await generateSmartRoute({
        budget: pocketMoney,
        currentPocketMoney: pocketMoney,
        vibe: selectedVibe,
        outfitColor: selectedOutfit,
        startPoint,
      });
      setRouteResult(res);
      setAddedStops({});
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Initial load auto-generate one recommendation
  React.useEffect(() => {
    if (!routeResult) {
      handleGenerate();
    }
  }, []);

  const handleToggleAddExpense = (stop: LocationItem) => {
    if (!addedStops[stop.id]) {
      onAddExpense(stop);
      setAddedStops((prev) => ({ ...prev, [stop.id]: true }));
    }
  };

  const getCategoryBadge = (cat: CategoryType) => {
    switch (cat) {
      case 'heritage':
        return { label: 'Di sản kiệt hẻm', bg: 'bg-[#4A2E65]/10 text-[#4A2E65]' };
      case 'food':
        return { label: 'Quán ăn kiệt hẻm', bg: 'bg-[#8E2829]/10 text-[#8E2829]' };
      case 'craft':
        return { label: 'Làng nghề nghệ nhân', bg: 'bg-[#005A5B]/10 text-[#005A5B]' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4A2E65] via-[#3B2252] to-[#005A5B] text-white p-6 sm:p-8 shadow-md">
        <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full bg-[#C59B27]/10 pointer-events-none blur-xl"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#C59B27]/25 text-[#FBF8F2] px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-[#C59B27]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>AI Smart Route Engine · Thế Hệ Trẻ Cố Đô</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-royal font-bold tracking-tight text-[#FBF8F2] mb-2 leading-tight">
            Thiết Kế Lộ Trình Độc Bản 1-Click
          </h1>
          <p className="text-sm sm:text-base text-[#F4EFE6]/80 leading-relaxed font-light">
            Không lo "bẫy giá cả", không đi theo lối mòn du lịch bề nổi. Dựa vào vị trí GPS hiện tại và số tiền còn lại trong túi, ROUTEEN gợi ý combo hoàn hảo: <span className="font-semibold text-[#C59B27]">1 Di sản + 1 Quán ăn kiệt hẻm + 1 Điểm trải nghiệm làng thủ công</span>.
          </p>
        </div>
      </div>

      {/* Control Panel: Parameters Box */}
      <div className="bg-[#FBF8F2] border border-[#C59B27]/30 rounded-2xl p-5 sm:p-6 shadow-xs">
        <h2 className="text-base sm:text-lg font-royal font-bold text-[#4A2E65] mb-4 flex items-center gap-2">
          <span>⚙️</span>
          <span>Tùy Biến Lộ Trình Chuẩn Gu Gen Z</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Start Point */}
          <div>
            <label className="block text-xs font-bold text-[#4A2E65] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#005A5B]" />
              <span>Vị Trí Xuất Phát (GPS)</span>
            </label>
            <select
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="w-full bg-white border border-[#C59B27]/30 rounded-xl px-3 py-2 text-sm text-[#2C241D] focus:outline-none focus:ring-2 focus:ring-[#C59B27] cursor-pointer"
            >
              {HUE_START_POINTS.map((sp) => (
                <option key={sp.name} value={sp.name}>
                  {sp.name}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-gray-500 mt-1 block">Tự động tính cự ly di chuyển gần nhất</span>
          </div>

          {/* 2. Pocket Budget */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#4A2E65] uppercase tracking-wider flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-[#005A5B]" />
                <span>Tiền Còn Trong Túi</span>
              </label>
              <span className="text-xs font-bold text-[#8E2829]">
                {pocketMoney.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
            <input
              type="range"
              min={30000}
              max={400000}
              step={10000}
              value={pocketMoney}
              onChange={(e) => setPocketMoney(Number(e.target.value))}
              className="w-full accent-[#4A2E65] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <button 
                onClick={() => setPocketMoney(50000)} 
                className="hover:text-[#4A2E65] cursor-pointer"
              >
                50k (Tiết kiệm)
              </button>
              <button 
                onClick={() => setPocketMoney(150000)} 
                className="hover:text-[#4A2E65] font-semibold text-[#005A5B] cursor-pointer"
              >
                150k (Chuẩn gu)
              </button>
              <button 
                onClick={() => setPocketMoney(300000)} 
                className="hover:text-[#4A2E65] cursor-pointer"
              >
                300k (Thoải mái)
              </button>
            </div>
          </div>

          {/* 3. Vibe Filter */}
          <div>
            <label className="block text-xs font-bold text-[#4A2E65] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#8E2829]" />
              <span>Vibe Mong Muốn</span>
            </label>
            <select
              value={selectedVibe}
              onChange={(e) => setSelectedVibe(e.target.value)}
              className="w-full bg-white border border-[#C59B27]/30 rounded-xl px-3 py-2 text-sm text-[#2C241D] focus:outline-none focus:ring-2 focus:ring-[#C59B27] cursor-pointer"
            >
              {VIBE_OPTIONS.map((vb) => (
                <option key={vb} value={vb}>
                  {vb}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-gray-500 mt-1 block">Lọc không gian kiến trúc & âm hưởng</span>
          </div>

          {/* 4. Outfit Color Match */}
          <div>
            <label className="block text-xs font-bold text-[#4A2E65] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Shirt className="w-3.5 h-3.5 text-[#4A2E65]" />
              <span>Màu Outfit Đang Mặc</span>
            </label>
            <select
              value={selectedOutfit}
              onChange={(e) => setSelectedOutfit(e.target.value)}
              className="w-full bg-white border border-[#C59B27]/30 rounded-xl px-3 py-2 text-sm text-[#2C241D] focus:outline-none focus:ring-2 focus:ring-[#C59B27] cursor-pointer"
            >
              {OUTFIT_COLORS.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-gray-500 mt-1 block">Gợi ý góc chụp sống ảo match màu</span>
          </div>
        </div>

        {/* Generate CTA Button */}
        <div className="mt-5 pt-4 border-t border-[#C59B27]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#2C241D]/70 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Cam kết 100% quán ăn kiệt hẻm niêm yết giá công khai, không chèo kéo</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#C59B27] hover:bg-[#b0881f] text-[#2C241D] font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#4A2E65]" />
                <span>Đang tính toán lộ trình tối ưu...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#4A2E65]" />
                <span>Tạo Lộ Trình Độc Bản 1-Click</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Route Display */}
      {routeResult && (
        <div className="space-y-4">
          {/* Header of the Route */}
          <div className="bg-[#F4EFE6] border border-[#C59B27]/40 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#C59B27]/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-[#4A2E65] text-white">
                    Lộ Trình Độc Bản
                  </span>
                  <span className="text-xs text-[#8E2829] font-medium">
                    {routeResult.source === 'gemini' ? 'Được đề xuất bởi Gemini AI' : 'Thuật toán Tối ưu ROUTEEN'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-royal font-bold text-[#4A2E65] mt-1">
                  {routeResult.routeName}
                </h3>
              </div>

              {/* Flex Button */}
              <button
                onClick={() => onOpenSocialFlex(routeResult)}
                className="px-4 py-2 bg-gradient-to-r from-[#4A2E65] to-[#8E2829] hover:opacity-90 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all shrink-0"
              >
                <Share2 className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Xuất Card "Flexing" MXH</span>
              </button>
            </div>

            {/* Hue Greeting & Budget Analysis */}
            <div className="mt-3 bg-white/70 rounded-xl p-3.5 border border-[#C59B27]/20 text-xs sm:text-sm space-y-1.5">
              <p className="font-royal text-[#4A2E65] italic font-semibold">
                "{routeResult.hueGreeting}"
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-700">
                <span className="flex items-center gap-1 font-semibold text-[#005A5B]">
                  <Wallet className="w-3.5 h-3.5" />
                  Tổng chi phí dự kiến: {routeResult.totalEstCost.toLocaleString('vi-VN')} VNĐ
                </span>
                <span>·</span>
                <span className="text-gray-600">
                  {routeResult.budgetFitAnalysis}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Stops Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {routeResult.stops.map((stop, index) => {
              const badge = getCategoryBadge(stop.category);
              const isAdded = addedStops[stop.id];

              return (
                <div
                  key={stop.id}
                  className="bg-white rounded-2xl border border-[#C59B27]/20 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image with Stop Sequence Pill */}
                    <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                      <img
                        src={stop.imageUrl}
                        alt={stop.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-[#4A2E65] text-[#C59B27] font-bold text-xs px-2.5 py-1 rounded-lg shadow-sm border border-[#C59B27]/30 flex items-center gap-1">
                        <span>Chặng {index + 1}</span>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-xs font-semibold px-2 py-0.5 rounded-md text-[#2C241D]">
                        {stop.priceRange}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${badge.bg}`}>
                          {badge.label}
                        </span>
                        <h4 className="font-royal font-bold text-[#4A2E65] text-base mt-1.5 line-clamp-1">
                          {stop.name}
                        </h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#8E2829] shrink-0" />
                          <span className="line-clamp-1">{stop.kietAddress}</span>
                        </p>
                      </div>

                      {/* Outfit tip */}
                      <div className="bg-[#FBF8F2] border border-[#C59B27]/20 rounded-lg p-2.5 text-xs">
                        <div className="text-[11px] font-semibold text-[#C59B27] flex items-center gap-1 mb-0.5">
                          <Shirt className="w-3 h-3" />
                          <span>Hợp Outfit {selectedOutfit}:</span>
                        </div>
                        <p className="text-gray-600 text-[11px] leading-relaxed">
                          {stop.outfitTip}
                        </p>
                      </div>

                      {/* Gen Z tip */}
                      <p className="text-xs text-gray-600 italic bg-gray-50 p-2 rounded-lg border-l-2 border-[#005A5B]">
                        "{stop.genZReview}"
                      </p>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-4 pt-0 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectAudioStop(stop)}
                        className="px-2.5 py-2 bg-[#4A2E65]/10 hover:bg-[#4A2E65]/20 text-[#4A2E65] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="Nghe kịch truyền thanh audio GPS 10m"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#4A2E65]" />
                        <span>Nghe Audio</span>
                      </button>

                      <button
                        onClick={() => handleToggleAddExpense(stop)}
                        disabled={isAdded}
                        className={`px-2.5 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-[#C59B27]/20 hover:bg-[#C59B27]/30 text-[#8E2829]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Đã ghi chi tiêu</span>
                          </>
                        ) : (
                          <>
                            <PlusCircle className="w-3.5 h-3.5 text-[#8E2829]" />
                            <span>+ {stop.estPrice > 0 ? `${stop.estPrice.toLocaleString('vi-VN')}đ` : 'Miễn phí'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
