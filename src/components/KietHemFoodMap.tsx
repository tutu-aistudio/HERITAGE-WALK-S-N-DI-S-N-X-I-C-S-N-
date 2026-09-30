import React, { useState } from 'react';
import { 
  Utensils, 
  MapPin, 
  Tag, 
  ShieldCheck, 
  Volume2, 
  PlusCircle, 
  Search, 
  DollarSign, 
  ExternalLink,
  CheckCircle2,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { HUE_LOCATIONS } from '../data/hueData';
import { LocationItem } from '../types';

interface KietHemFoodMapProps {
  onAddExpense: (item: LocationItem, menuItemName?: string, price?: number) => void;
  onListenAudio: (item: LocationItem) => void;
}

export const KietHemFoodMap: React.FC<KietHemFoodMapProps> = ({
  onAddExpense,
  onListenAudio,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('all'); // all, under20, 20to40
  const [selectedSpot, setSelectedSpot] = useState<LocationItem | null>(null);
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  const foodSpots = HUE_LOCATIONS.filter((l) => l.category === 'food');

  const filteredSpots = foodSpots.filter((spot) => {
    const matchesSearch =
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.kietAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesPrice = true;
    if (priceFilter === 'under20') {
      matchesPrice = spot.estPrice <= 20000;
    } else if (priceFilter === '20to40') {
      matchesPrice = spot.estPrice > 20000 && spot.estPrice <= 40000;
    }

    return matchesSearch && matchesPrice;
  });

  const handleAddDish = (spot: LocationItem, itemTitle: string, price: number) => {
    const key = `${spot.id}-${itemTitle}`;
    onAddExpense(spot, itemTitle, price);
    setAddedItemMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#8E2829] text-white rounded-2xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 font-royal text-8xl font-bold select-none pointer-events-none">
          HUẾ
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-[#C59B27] text-[#2C241D] px-2.5 py-0.5 rounded-full text-xs font-bold mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Minh Bạch 100% · Giải Quyết Nỗi Lo "Chặt Chém"</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-royal font-bold tracking-tight">
            Bản Đồ Món Ngon Kiệt Hẻm Huế
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-light leading-relaxed">
            Tuyển tập các quán ăn lâu đời ẩn sâu trong kiệt nhỏ xứ Huế. Toàn bộ thực đơn được niêm yết giá chính xác từng nghìn đồng, được giới học sinh - sinh viên và người Huế bản địa kiểm chứng.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-[#C59B27]/25 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm bánh canh, bún bò, chè hẻm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FBF8F2] border border-[#C59B27]/30 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B27]"
          />
        </div>

        {/* Price segmented filter */}
        <div className="flex items-center gap-1 bg-[#FBF8F2] p-1 rounded-xl border border-[#C59B27]/20 w-full sm:w-auto">
          <button
            onClick={() => setPriceFilter('all')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              priceFilter === 'all'
                ? 'bg-[#4A2E65] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#4A2E65]'
            }`}
          >
            Tất cả quán
          </button>
          <button
            onClick={() => setPriceFilter('under20')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              priceFilter === 'under20'
                ? 'bg-[#005A5B] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#005A5B]'
            }`}
          >
            Dưới 20k (Tiết kiệm)
          </button>
          <button
            onClick={() => setPriceFilter('20to40')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              priceFilter === '20to40'
                ? 'bg-[#8E2829] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#8E2829]'
            }`}
          >
            20k - 40k (No nê)
          </button>
        </div>
      </div>

      {/* Grid of Food Spots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className="bg-white rounded-2xl border border-[#C59B27]/20 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo & price badge */}
              <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                <img
                  src={spot.imageUrl}
                  alt={spot.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#8E2829] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>{spot.priceRange}</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-royal font-bold text-[#4A2E65] text-base leading-snug">
                    {spot.name}
                  </h3>
                  <p className="text-xs text-[#8E2829] font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{spot.kietAddress}</span>
                  </p>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {spot.story}
                </p>

                {/* Transparent Menu with Exact Prices */}
                <div className="bg-[#FBF8F2] border border-[#C59B27]/20 rounded-xl p-3 space-y-2">
                  <div className="text-[11px] font-bold text-[#4A2E65] uppercase tracking-wider flex items-center justify-between">
                    <span>Bảng Giá Niêm Yết Cố Định</span>
                    <span className="text-[10px] text-emerald-700">✓ Không phụ thu</span>
                  </div>
                  <div className="space-y-1.5 divide-y divide-gray-100">
                    {spot.menuOrTickets?.map((dish, i) => {
                      const key = `${spot.id}-${dish.item}`;
                      const isAdded = addedItemMap[key];
                      return (
                        <div
                          key={i}
                          className="pt-1.5 first:pt-0 flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <div className="font-medium text-gray-800 truncate">{dish.item}</div>
                            {dish.description && (
                              <div className="text-[10px] text-gray-500 truncate">{dish.description}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-bold text-[#005A5B]">
                              {dish.price.toLocaleString('vi-VN')}đ
                            </span>
                            <button
                              onClick={() => handleAddDish(spot, dish.item, dish.price)}
                              className={`p-1 rounded-md transition-colors cursor-pointer ${
                                isAdded
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-[#C59B27]/20 hover:bg-[#C59B27]/40 text-[#4A2E65]'
                              }`}
                              title="Thêm món này vào bảng chi tiêu"
                            >
                              {isAdded ? (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              ) : (
                                <PlusCircle className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Gen Z tip */}
                <div className="text-xs bg-amber-50 text-amber-900 border-l-2 border-[#C59B27] p-2 rounded-r-lg">
                  <span className="font-bold">Mẹo luồn kiệt: </span>
                  <span>{spot.genZReview}</span>
                </div>
              </div>
            </div>

            {/* Bottom button */}
            <div className="p-4 pt-0">
              <button
                onClick={() => onListenAudio(spot)}
                className="w-full py-2 bg-[#4A2E65]/10 hover:bg-[#4A2E65]/20 text-[#4A2E65] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#4A2E65]" />
                <span>Nghe Câu Chuyện O Chủ Quán (1:30)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
