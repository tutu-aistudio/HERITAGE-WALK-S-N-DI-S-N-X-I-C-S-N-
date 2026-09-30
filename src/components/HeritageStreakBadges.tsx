import React from 'react';
import { 
  Flame, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Compass, 
  Crown,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Badge } from '../types';

interface HeritageStreakBadgesProps {
  streakCount: number;
  badges: Badge[];
  onCheckinStreak: () => void;
  onOpenFlexModal: () => void;
}

export const HeritageStreakBadges: React.FC<HeritageStreakBadgesProps> = ({
  streakCount,
  badges,
  onCheckinStreak,
  onOpenFlexModal,
}) => {
  const getRank = (streak: number) => {
    if (streak >= 5) {
      return { title: 'Đại Sứ Di Sản Cố Đô', level: 3, next: 'Đạt đỉnh phong vinh dự', color: 'text-[#C59B27]' };
    }
    if (streak >= 3) {
      return { title: 'Sành Ăn Kiệt Hẻm Cố Đô', level: 2, next: 'Cần thêm 2 ngày để lên Đại Sứ', color: 'text-[#005A5B]' };
    }
    return { title: 'Tập Sự Khám Phá Huế', level: 1, next: 'Cần thêm 1 ngày để lên Sành Ăn', color: 'text-[#8E2829]' };
  };

  const currentRank = getRank(streakCount);

  const handleCelebrateCheckin = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4A2E65', '#C59B27', '#005A5B', '#8E2829', '#FBF8F2']
    });
    onCheckinStreak();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Heritage Streak */}
      <div className="bg-gradient-to-r from-[#8E2829] via-[#4A2E65] to-[#2D1A3E] text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 text-9xl opacity-10 font-royal select-none pointer-events-none">
          🔥
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-[#C59B27] text-[#2C241D] px-2.5 py-0.5 rounded-full text-xs font-bold shadow-xs">
              <Crown className="w-3.5 h-3.5" />
              <span>Cấp Bậc: {currentRank.title}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-royal font-bold">
              Heritage Streak · Chuỗi Khám Phá Di Sản
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Duy trì chuỗi ngày "săn di sản, xơi đặc sản" để mở khóa các huy hiệu hoàng gia Cung Đình Huế và nhận ưu đãi độc quyền từ các đối tác quán ăn kiệt hẻm.
            </p>
          </div>

          {/* Interactive Check-in Button */}
          <div className="bg-white/10 backdrop-blur-md border border-[#C59B27]/40 rounded-2xl p-4 text-center shrink-0 w-full sm:w-auto space-y-2">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-[#FFDF78]">
              <Flame className="w-7 h-7 fill-[#FFDF78]" />
              <span>{streakCount} Ngày Liên Tiếp</span>
            </div>
            <button
              onClick={handleCelebrateCheckin}
              className="w-full px-5 py-2.5 bg-[#C59B27] hover:bg-[#d8ab31] text-[#2C241D] font-bold text-xs rounded-xl shadow-md transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#4A2E65]" />
              <span>Điểm Danh Di Sản Hôm Nay</span>
            </button>
            <span className="text-[10px] text-white/60 block">{currentRank.next}</span>
          </div>
        </div>
      </div>

      {/* Badges Collection Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-royal font-bold text-[#4A2E65] text-lg sm:text-xl flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C59B27]" />
            <span>Bộ Sưu Tập Huy Hiệu Cung Đình Hoàng Gia</span>
          </h3>
          <button
            onClick={onOpenFlexModal}
            className="text-xs text-[#005A5B] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Khoe huy hiệu lên story</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-white border-[#C59B27]/40 shadow-xs ring-1 ring-[#C59B27]/20'
                  : 'bg-[#F4EFE6]/60 border-gray-200 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs ${
                    badge.unlocked ? 'bg-[#FBF8F2] border border-[#C59B27]/40' : 'bg-gray-100'
                  }`}>
                    {badge.unlocked ? badge.icon : '🔒'}
                  </div>

                  {badge.unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Đã mở khóa</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      <span>Streak {badge.requiredStreak} ngày</span>
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#C59B27]">
                    {badge.royalTitle}
                  </div>
                  <h4 className="font-royal font-bold text-[#4A2E65] text-base">
                    {badge.name}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              {badge.unlocked && badge.unlockedAt && (
                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
                  Mở khóa: {badge.unlockedAt}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
