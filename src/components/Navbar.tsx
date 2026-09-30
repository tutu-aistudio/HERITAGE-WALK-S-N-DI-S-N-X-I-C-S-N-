import React from 'react';
import { Compass, Headphones, Utensils, Award, Wallet, Info, Sparkles, Flame, Plus } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streakCount: number;
  remainingBudget: number;
  totalBudget: number;
  onOpenBudgetModal: () => void;
  onOpenAboutModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streakCount,
  remainingBudget,
  totalBudget,
  onOpenBudgetModal,
  onOpenAboutModal,
}) => {
  const navItems = [
    { id: 'route', label: 'Lộ Trình 1-Click', icon: Compass },
    { id: 'audio', label: 'Audio GPS 10m', icon: Headphones },
    { id: 'food', label: 'Món Ngon Kiệt Hẻm', icon: Utensils },
    { id: 'craft', label: 'Trạm Nghệ Nhân', icon: Sparkles },
    { id: 'expense', label: 'Quản Lý Chi Tiêu', icon: Wallet },
    { id: 'badges', label: 'Huy Hiệu & Streak', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F2]/95 backdrop-blur-md border-b border-[#C59B27]/20 shadow-xs">
      {/* Top Banner: Gen Z & Hue Heritage Bar */}
      <div className="bg-[#4A2E65] text-[#FBF8F2] px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C59B27] animate-pulse"></span>
          <span>Dự án ROUTEEN · Trường ĐH Kinh tế - ĐH Đà Nẵng</span>
          <span className="hidden sm:inline text-white/50">|</span>
          <span className="hidden sm:inline text-[#F4EFE6]/90 font-royal italic">
            "Chạm di sản kiệt hẻm - Làm chủ ngân sách Gen Z"
          </span>
        </div>
        <button
          onClick={onOpenAboutModal}
          className="flex items-center gap-1 text-[#C59B27] hover:text-white transition-colors cursor-pointer text-xs"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Về dự án</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div 
          onClick={() => setActiveTab('route')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A2E65] to-[#2d1b3f] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27] font-royal font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
            <span>R</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-royal font-bold tracking-wider text-[#4A2E65] text-lg sm:text-xl">
                ROUTEEN
              </span>
              <span className="text-xs bg-[#C59B27]/15 text-[#8E2829] font-semibold px-1.5 py-0.5 rounded-sm">
                Huế
              </span>
            </div>
            <p className="text-[11px] text-[#4A2E65]/70 font-medium -mt-0.5 tracking-tight">
              HERITAGE WALK · Săn di sản, Xơi đặc sản
            </p>
          </div>
        </div>

        {/* Right Stats & Quick Budget Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak indicator */}
          <div 
            onClick={() => setActiveTab('badges')}
            className="flex items-center gap-1.5 bg-[#8E2829]/10 hover:bg-[#8E2829]/20 text-[#8E2829] px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            title="Chuỗi thám hiểm di sản liên tục"
          >
            <Flame className="w-4 h-4 fill-[#8E2829]" />
            <span>{streakCount} Ngày Streak</span>
          </div>

          {/* Pocket Money Display */}
          <div 
            onClick={onOpenBudgetModal}
            className="flex items-center gap-2 bg-[#F4EFE6] border border-[#C59B27]/30 hover:border-[#C59B27] px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-all shadow-xs"
            title="Bấm để cập nhật ngân sách chuyến đi"
          >
            <Wallet className="w-4 h-4 text-[#005A5B]" />
            <div className="text-left">
              <div className="text-[10px] text-gray-500 leading-tight">Ví còn lại</div>
              <div className="font-bold text-[#005A5B] leading-tight">
                {remainingBudget.toLocaleString('vi-VN')}đ
              </div>
            </div>
            <Plus className="w-3.5 h-3.5 text-gray-400 hover:text-gray-700" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Mobile scrollable, Desktop inline) */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none border-t border-[#C59B27]/10">
        <div className="flex items-center gap-1 py-1.5 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4A2E65] text-[#FBF8F2] shadow-xs'
                    : 'text-[#4A2E65]/80 hover:bg-[#4A2E65]/10 hover:text-[#4A2E65]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C59B27]' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
