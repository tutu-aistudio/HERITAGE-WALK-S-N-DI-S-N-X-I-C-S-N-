import React, { useState } from 'react';
import { 
  Wallet, 
  Plus, 
  Trash2, 
  ArrowUpRight, 
  TrendingDown, 
  ShieldCheck, 
  Sparkles, 
  Share2, 
  Receipt,
  PieChart,
  AlertTriangle
} from 'lucide-react';
import { ExpenseRecord, CategoryType } from '../types';

interface ExpenseTrackerProps {
  expenses: ExpenseRecord[];
  totalBudget: number;
  onUpdateTotalBudget: (amount: number) => void;
  onAddCustomExpense: (title: string, amount: number, category: CategoryType, note?: string) => void;
  onDeleteExpense: (id: string) => void;
  onOpenFlexModal: () => void;
}

export const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({
  expenses,
  totalBudget,
  onUpdateTotalBudget,
  onAddCustomExpense,
  onDeleteExpense,
  onOpenFlexModal,
}) => {
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(totalBudget.toString());
  
  // Custom expense form state
  const [itemTitle, setItemTitle] = useState('');
  const [itemAmount, setItemAmount] = useState('');
  const [itemCategory, setItemCategory] = useState<CategoryType>('food');
  const [itemNote, setItemNote] = useState('');

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = totalBudget - totalSpent;
  const spentPercent = totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0;
  const isOverBudget = remaining < 0;

  // Commercial tour comparison savings
  const estimatedTraditionalTourCost = 450000;
  const savedAmount = Math.max(0, estimatedTraditionalTourCost - totalSpent);

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(budgetInput);
    if (!isNaN(val) && val > 0) {
      onUpdateTotalBudget(val);
      setIsEditingBudget(false);
    }
  };

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(itemAmount);
    if (!itemTitle.trim() || isNaN(amt) || amt <= 0) return;

    onAddCustomExpense(itemTitle.trim(), amt, itemCategory, itemNote.trim());
    setItemTitle('');
    setItemAmount('');
    setItemNote('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#4A2E65] text-white rounded-2xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#C59B27] text-[#231B15] px-2.5 py-0.5 rounded-full text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Minh Bạch Tài Chính · Không Bẫy Chi Phí</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-royal font-bold">
              Quản Lý Chi Tiêu & Làm Chủ Ngân Sách Gen Z
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl font-light">
              Xóa tan nỗi lo "cháy túi" khi đi du lịch Cố Đô. Theo dõi tường minh từng nghìn đồng mua ly chè hẻm hay vé trải nghiệm làng nghề.
            </p>
          </div>

          <button
            onClick={onOpenFlexModal}
            className="px-4 py-2.5 bg-gradient-to-r from-[#C59B27] to-[#e6b93d] hover:opacity-95 text-[#2C241D] text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer transition-all shrink-0"
          >
            <Share2 className="w-4 h-4 text-[#4A2E65]" />
            <span>Xuất Card "Flexing" Chi Tiêu</span>
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Budget Card */}
        <div className="bg-white border border-[#C59B27]/25 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Ngân Sách Ban Đầu</span>
            <button
              onClick={() => setIsEditingBudget(!isEditingBudget)}
              className="text-[#4A2E65] hover:underline font-semibold cursor-pointer text-[11px]"
            >
              {isEditingBudget ? 'Đóng' : 'Đổi ngân sách'}
            </button>
          </div>

          {isEditingBudget ? (
            <form onSubmit={handleSaveBudget} className="flex gap-2 mt-2">
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="w-full bg-[#FBF8F2] border border-[#C59B27]/40 rounded-lg px-2 py-1 text-sm font-bold"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-[#4A2E65] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Lưu
              </button>
            </form>
          ) : (
            <div className="text-xl sm:text-2xl font-bold text-[#4A2E65]">
              {totalBudget.toLocaleString('vi-VN')} <span className="text-xs font-normal text-gray-500">VNĐ</span>
            </div>
          )}
          <span className="text-[11px] text-gray-400 block mt-1">Hạn mức chi tiêu bạn đặt ra</span>
        </div>

        {/* Spent Card */}
        <div className="bg-white border border-[#C59B27]/25 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Đã Chi Thực Tế</span>
            <span className="text-xs font-bold text-[#8E2829]">{spentPercent}%</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#8E2829]">
            {totalSpent.toLocaleString('vi-VN')} <span className="text-xs font-normal text-gray-500">VNĐ</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOverBudget ? 'bg-red-500' : 'bg-[#C59B27]'
              }`}
              style={{ width: `${spentPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Remaining Pocket Money Card */}
        <div className={`border rounded-2xl p-4 shadow-xs transition-colors ${
          isOverBudget ? 'bg-red-50 border-red-200' : 'bg-white border-[#C59B27]/25'
        }`}>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Ví Còn Lại</span>
            {isOverBudget ? (
              <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Vượt ngân sách!
              </span>
            ) : (
              <span className="text-xs font-bold text-emerald-700">An toàn</span>
            )}
          </div>
          <div className={`text-xl sm:text-2xl font-bold ${isOverBudget ? 'text-red-600' : 'text-[#005A5B]'}`}>
            {remaining.toLocaleString('vi-VN')} <span className="text-xs font-normal text-gray-500">VNĐ</span>
          </div>
          <span className="text-[11px] text-gray-500 block mt-1">
            {isOverBudget ? 'Bạn nên cân nhắc các điểm miễn phí' : 'Vừa vặn cho chuyến đi trọn vẹn'}
          </span>
        </div>
      </div>

      {/* Smart Comparison Banner */}
      <div className="bg-[#F4EFE6] border border-[#C59B27]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#005A5B]/10 text-[#005A5B] flex items-center justify-center font-bold text-base shrink-0">
            💡
          </div>
          <div>
            <div className="font-bold text-[#4A2E65]">
              Tiết kiệm thông minh chuẩn Gen Z
            </div>
            <div className="text-gray-600 text-xs">
              Nhờ đi kiệt hẻm bản địa với giá niêm yết, bạn đã tiết kiệm khoảng{' '}
              <span className="font-bold text-[#005A5B]">{savedAmount.toLocaleString('vi-VN')}đ</span>{' '}
              so với các tour du lịch thương mại qua trung gian!
            </div>
          </div>
        </div>
      </div>

      {/* Main Expense Table & Quick Add (Grid 8:4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Expenses List (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#C59B27]/25 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-royal font-bold text-[#4A2E65] text-base flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#C59B27]" />
              <span>Sổ Hóa Đơn Kiệt Hẻm ({expenses.length} khoản)</span>
            </h3>
            <span className="text-xs text-gray-500">Đã lưu trữ tức thì</span>
          </div>

          {expenses.length === 0 ? (
            <div className="py-12 text-center text-gray-400 space-y-2">
              <Wallet className="w-8 h-8 mx-auto text-gray-300" />
              <p className="text-xs">Chưa có khoản chi nào được ghi nhận.</p>
              <p className="text-[11px] text-gray-500">
                Hãy tạo lộ trình 1-click hoặc bấm nút "+" ở quán ăn kiệt hẻm để ghi lại!
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1 divide-y divide-gray-100">
              {expenses.map((item) => (
                <div
                  key={item.id}
                  className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="p-2 rounded-xl bg-[#FBF8F2] border border-[#C59B27]/20 text-[#4A2E65] font-bold text-sm shrink-0">
                      {item.category === 'food' ? '🥢' : item.category === 'craft' ? '🌸' : '🏛️'}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-[#2C241D] truncate">{item.title}</div>
                      <div className="text-[11px] text-gray-500 truncate flex items-center gap-1.5">
                        <span>{item.locationName}</span>
                        <span>·</span>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-[#8E2829] text-sm">
                      {item.amount > 0 ? `${item.amount.toLocaleString('vi-VN')}đ` : '0đ'}
                    </span>
                    <button
                      onClick={() => onDeleteExpense(item.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                      title="Xóa khoản chi này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick Add Expense Box (4 cols) */}
        <div className="lg:col-span-4 bg-[#FBF8F2] border border-[#C59B27]/30 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-royal font-bold text-[#4A2E65] text-sm uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-[#005A5B]" />
            <span>Ghi Khoản Chi Mới</span>
          </h3>

          <form onSubmit={handleAddExpenseSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Tên món / Vé / Chi phí</label>
              <input
                type="text"
                required
                placeholder="VD: Cà phê muối kiệt 10 Nguyễn Huệ"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                className="w-full bg-white border border-[#C59B27]/30 rounded-xl p-2 focus:ring-1 focus:ring-[#C59B27] outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Số tiền (VNĐ)</label>
              <input
                type="number"
                required
                placeholder="VD: 22000"
                value={itemAmount}
                onChange={(e) => setItemAmount(e.target.value)}
                className="w-full bg-white border border-[#C59B27]/30 rounded-xl p-2 focus:ring-1 focus:ring-[#C59B27] outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Phân loại</label>
              <select
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value as CategoryType)}
                className="w-full bg-white border border-[#C59B27]/30 rounded-xl p-2 focus:ring-1 focus:ring-[#C59B27] outline-none cursor-pointer"
              >
                <option value="food">Ăn uống đặc sản kiệt hẻm</option>
                <option value="craft">Trải nghiệm làng nghề thủ công</option>
                <option value="heritage">Vé tham quan di sản / Thuyền</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Ghi chú (Tùy chọn)</label>
              <input
                type="text"
                placeholder="VD: Đi chung 2 người, ăn siêu no"
                value={itemNote}
                onChange={(e) => setItemNote(e.target.value)}
                className="w-full bg-white border border-[#C59B27]/30 rounded-xl p-2 focus:ring-1 focus:ring-[#C59B27] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#4A2E65] hover:bg-[#392150] text-[#C59B27] font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Lưu Vào Sổ Chi Tiêu</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
