/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OneClickRouteGenerator } from './components/OneClickRouteGenerator';
import { AudioStoryPlayer } from './components/AudioStoryPlayer';
import { KietHemFoodMap } from './components/KietHemFoodMap';
import { CraftStoryStation } from './components/CraftStoryStation';
import { ExpenseTracker } from './components/ExpenseTracker';
import { HeritageStreakBadges } from './components/HeritageStreakBadges';
import { SocialFlexModal } from './components/SocialFlexModal';
import { AboutProjectModal } from './components/AboutProjectModal';
import { HUE_LOCATIONS, INITIAL_BADGES } from './data/hueData';
import { LocationItem, ExpenseRecord, Badge, CategoryType } from './types';
import { GeneratedRouteResult } from './services/geminiService';
import { CheckCircle2, Wallet, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('route');

  // Budget state (persisted or defaults)
  const [totalBudget, setTotalBudget] = useState<number>(() => {
    const saved = localStorage.getItem('routteen_total_budget');
    return saved ? Number(saved) : 200000;
  });

  const [expenses, setExpenses] = useState<ExpenseRecord[]>(() => {
    const saved = localStorage.getItem('routteen_expenses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Initial sample expenses for realistic first impression
    return [
      {
        id: 'init-1',
        locationName: 'Bánh Canh Nam Phổ O Thu',
        category: 'food',
        title: 'Tô bánh canh Nam Phổ tôm cua đặc biệt',
        amount: 20000,
        timestamp: 'Hôm nay, 08:30',
        note: 'Kiệt 374 Phạm Hồng Thái',
      },
      {
        id: 'init-2',
        locationName: 'Làng Hoa Giấy Thanh Tiên',
        category: 'craft',
        title: 'Workshop vuốt hoa sen giấy cùng nghệ nhân Thân Văn Huy',
        amount: 20000,
        timestamp: 'Hôm nay, 10:15',
        note: 'Xã Phú Mậu',
      },
    ];
  });

  const [streakCount, setStreakCount] = useState<number>(() => {
    const saved = localStorage.getItem('routteen_streak');
    return saved ? Number(saved) : 3;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('routteen_badges');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_BADGES;
  });

  // Selected audio track for cross-tab jumping
  const [selectedAudioLocation, setSelectedAudioLocation] = useState<LocationItem | null>(null);

  // Modals state
  const [isFlexModalOpen, setIsFlexModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [tempBudgetInput, setTempBudgetInput] = useState(totalBudget.toString());

  // Current route for flexing
  const [activeRouteResult, setActiveRouteResult] = useState<GeneratedRouteResult | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('routteen_total_budget', totalBudget.toString());
  }, [totalBudget]);

  useEffect(() => {
    localStorage.setItem('routteen_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('routteen_streak', streakCount.toString());
  }, [streakCount]);

  useEffect(() => {
    localStorage.setItem('routteen_badges', JSON.stringify(badges));
  }, [badges]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = totalBudget - totalSpent;

  // Add expense from stops / menu items
  const handleAddExpense = (
    item: LocationItem,
    customTitle?: string,
    customPrice?: number
  ) => {
    const amount = customPrice !== undefined ? customPrice : item.estPrice;
    const newRecord: ExpenseRecord = {
      id: Date.now().toString(),
      locationName: item.name,
      category: item.category,
      title: customTitle || item.name,
      amount,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      note: item.kietAddress,
    };

    setExpenses((prev) => [newRecord, ...prev]);
    showToast(`Đã thêm "${newRecord.title}" (${amount > 0 ? `${amount.toLocaleString('vi-VN')}đ` : 'Miễn phí'}) vào sổ chi tiêu!`);
  };

  const handleAddCustomExpense = (
    title: string,
    amount: number,
    category: CategoryType,
    note?: string
  ) => {
    const newRecord: ExpenseRecord = {
      id: Date.now().toString(),
      locationName: 'Tự thêm ngoài kiệt',
      category,
      title,
      amount,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      note,
    };

    setExpenses((prev) => [newRecord, ...prev]);
    showToast(`Đã lưu "${title}" (${amount.toLocaleString('vi-VN')}đ)!`);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    showToast('Đã xóa khoản chi!');
  };

  const handleUpdateTotalBudget = (newVal: number) => {
    setTotalBudget(newVal);
    showToast(`Đã cập nhật ngân sách chuyến đi: ${newVal.toLocaleString('vi-VN')}đ`);
  };

  // Switch to audio tab and focus on the chosen location
  const handleListenAudio = (loc: LocationItem) => {
    setSelectedAudioLocation(loc);
    setActiveTab('audio');
    showToast(`Đang chuyển tới Audio Guide 10m: ${loc.name}`);
  };

  // Streak check-in
  const handleCheckinStreak = () => {
    const newStreak = streakCount + 1;
    setStreakCount(newStreak);

    // Unlock badge if threshold met
    let newlyUnlocked = false;
    const updated = badges.map((b) => {
      if (!b.unlocked && newStreak >= b.requiredStreak) {
        newlyUnlocked = true;
        return {
          ...b,
          unlocked: true,
          unlockedAt: 'Hôm nay',
        };
      }
      return b;
    });

    if (newlyUnlocked) {
      setBadges(updated);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      showToast(`Chúc mừng! Bạn đã mở khóa Huy Hiệu Hoàng Gia mới! 🏅`);
    } else {
      showToast(`Điểm danh thành công! Streak tăng lên ${newStreak} ngày! 🔥`);
    }
  };

  const handleOpenSocialFlexWithRoute = (route: GeneratedRouteResult) => {
    setActiveRouteResult(route);
    setIsFlexModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F2] text-[#2C241D] selection:bg-[#C59B27]/30 selection:text-[#4A2E65]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#4A2E65] text-white border border-[#C59B27] px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streakCount={streakCount}
        remainingBudget={remainingBudget}
        totalBudget={totalBudget}
        onOpenBudgetModal={() => {
          setTempBudgetInput(totalBudget.toString());
          setIsBudgetModalOpen(true);
        }}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'route' && (
          <OneClickRouteGenerator
            currentBudget={remainingBudget > 0 ? remainingBudget : totalBudget}
            onUpdateBudget={(val) => {
              if (val > totalBudget) setTotalBudget(val);
            }}
            onAddExpense={handleAddExpense}
            onSelectAudioStop={handleListenAudio}
            onOpenSocialFlex={handleOpenSocialFlexWithRoute}
          />
        )}

        {activeTab === 'audio' && (
          <AudioStoryPlayer
            selectedLocation={selectedAudioLocation}
            onSelectLocation={(loc) => setSelectedAudioLocation(loc)}
            onStreakAction={() => {
              showToast('Đã nghe trọn vẹn câu chuyện di sản kiệt hẻm!');
            }}
          />
        )}

        {activeTab === 'food' && (
          <KietHemFoodMap
            onAddExpense={handleAddExpense}
            onListenAudio={handleListenAudio}
          />
        )}

        {activeTab === 'craft' && (
          <CraftStoryStation
            onListenAudio={handleListenAudio}
            onAddExpense={handleAddExpense}
          />
        )}

        {activeTab === 'expense' && (
          <ExpenseTracker
            expenses={expenses}
            totalBudget={totalBudget}
            onUpdateTotalBudget={handleUpdateTotalBudget}
            onAddCustomExpense={handleAddCustomExpense}
            onDeleteExpense={handleDeleteExpense}
            onOpenFlexModal={() => setIsFlexModalOpen(true)}
          />
        )}

        {activeTab === 'badges' && (
          <HeritageStreakBadges
            streakCount={streakCount}
            badges={badges}
            onCheckinStreak={handleCheckinStreak}
            onOpenFlexModal={() => setIsFlexModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#231B15] text-[#FBF8F2] border-t border-[#C59B27]/30 mt-12 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/70">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-royal font-bold text-base text-[#C59B27]">
                HERITAGE WALK · ROUTEEN
              </span>
              <span className="px-1.5 py-0.5 rounded-xs bg-[#4A2E65] text-[10px] text-white font-medium">
                TP. Huế
              </span>
            </div>
            <p className="text-[11px] text-white/60">
              Đơn vị thực hiện: <strong>Nhóm ROUTEEN</strong> (Trường Đại học Kinh tế - Đại học Đà Nẵng).
            </p>
            <p className="text-[11px] text-white/50 italic">
              "Chạm di sản kiệt hẻm - Làm chủ ngân sách Gen Z"
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setActiveTab('route')}
              className="hover:text-[#C59B27] cursor-pointer"
            >
              Lộ trình 1-Click
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('audio')}
              className="hover:text-[#C59B27] cursor-pointer"
            >
              Audio GPS 10m
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('food')}
              className="hover:text-[#C59B27] cursor-pointer"
            >
              Món ngon kiệt hẻm
            </button>
            <span>·</span>
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="hover:text-[#C59B27] cursor-pointer font-semibold text-[#C59B27]"
            >
              Về nhóm nghiên cứu
            </button>
          </div>
        </div>
      </footer>

      {/* Social Flex Modal */}
      <SocialFlexModal
        isOpen={isFlexModalOpen}
        onClose={() => setIsFlexModalOpen(false)}
        stops={activeRouteResult?.stops || HUE_LOCATIONS.slice(0, 3)}
        totalSpent={totalSpent > 0 ? totalSpent : 40000}
        badgeTitle={badges.find((b) => b.unlocked)?.name || 'Thẻ Bài Kim Khánh'}
      />

      {/* About Project & Team Dossier Modal */}
      <AboutProjectModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Quick Budget Modifier Modal */}
      {isBudgetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-[#C59B27]/40 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-royal font-bold text-[#4A2E65] text-base flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-[#005A5B]" />
                <span>Cài Đặt Ngân Sách Chuyến Đi</span>
              </h3>
              <button
                onClick={() => setIsBudgetModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer text-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Nhập số tiền bạn dự định chi tiêu trong chuyến đi Huế hôm nay:
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const val = Number(tempBudgetInput);
                if (!isNaN(val) && val > 0) {
                  handleUpdateTotalBudget(val);
                  setIsBudgetModalOpen(false);
                }
              }}
              className="space-y-3"
            >
              <div className="relative">
                <input
                  type="number"
                  step={10000}
                  value={tempBudgetInput}
                  onChange={(e) => setTempBudgetInput(e.target.value)}
                  className="w-full bg-[#FBF8F2] border border-[#C59B27]/40 rounded-xl px-3 py-2 text-base font-bold text-[#4A2E65] focus:outline-none focus:ring-2 focus:ring-[#C59B27]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
                  VNĐ
                </span>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <button
                  type="button"
                  onClick={() => setTempBudgetInput('100000')}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                  100k
                </button>
                <button
                  type="button"
                  onClick={() => setTempBudgetInput('150000')}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                  150k
                </button>
                <button
                  type="button"
                  onClick={() => setTempBudgetInput('250000')}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                  250k
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBudgetModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4A2E65] text-[#C59B27] font-bold text-xs rounded-xl shadow-xs hover:bg-[#392150] cursor-pointer"
                >
                  Lưu Ngân Sách
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
