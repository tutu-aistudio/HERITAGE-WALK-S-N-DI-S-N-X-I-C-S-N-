import React from 'react';
import { 
  X, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Compass, 
  Award, 
  Target, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  Users
} from 'lucide-react';

interface AboutProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutProjectModal: React.FC<AboutProjectModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FBF8F2] border border-[#C59B27]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#C59B27]/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#4A2E65] text-[#C59B27] px-2.5 py-0.5 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dự Án Nghiên Cứu & Phát Triển Nền Tảng</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-royal font-bold text-[#4A2E65]">
              HERITAGE WALK · ROUTEEN
            </h2>
            <p className="text-xs sm:text-sm text-[#8E2829] font-semibold mt-0.5">
              "Chạm di sản kiệt hẻm - Làm chủ ngân sách Gen Z"
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Essence */}
        <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#F4EFE6] border border-[#C59B27]/30 p-4 rounded-2xl">
          <p>
            <strong className="text-[#4A2E65]">ROUTEEN</strong> là sự kết hợp giữa <em>“Route”</em> (lộ trình) và <em>“Teen”</em> (thế hệ trẻ), thể hiện niềm đam mê lối sống xê dịch và mong muốn khám phá của Gen Z. Nền tảng Web App thông minh cá nhân hóa lộ trình & minh bạch chi tiêu kết nối thế hệ trẻ với các di sản văn hóa, làng nghề nghệ nhân và quán ăn đặc sản ẩn mình trong các kiệt hẻm tại địa bàn Thành phố Huế.
          </p>
        </div>

        {/* Research Team Profiles */}
        <div className="space-y-3">
          <h3 className="font-royal font-bold text-[#4A2E65] text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C59B27]" />
            <span>Đơn Vị Thực Hiện: Nhóm ROUTEEN (ĐH Kinh tế - ĐH Đà Nẵng)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Leader: Nguyen Thi Anh Thu */}
            <div className="bg-white border border-[#C59B27]/30 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#4A2E65] text-[#C59B27] flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-[#4A2E65] text-sm">Nguyễn Thị Anh Thư</h4>
                  <span className="text-[11px] text-[#8E2829] font-semibold">Trưởng nhóm dự án</span>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-1 pt-1 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
                  <span>Lớp 51K35.1-P · Khoa Kinh doanh quốc tế</span>
                </div>
                <div className="text-gray-500 pl-5">
                  Trường Đại học Kinh tế - Đại học Đà Nẵng (2025-2029)
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <a href="mailto:nguyenthianhthu.nt06@gmail.com" className="text-[#005A5B] hover:underline truncate">
                    nguyenthianhthu.nt06@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>0337432028</span>
                </div>
              </div>
            </div>

            {/* Member 2: Ho Tran Bich Chau */}
            <div className="bg-white border border-[#C59B27]/30 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#005A5B] text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-[#4A2E65] text-sm">Hồ Trần Bích Châu</h4>
                  <span className="text-[11px] text-[#005A5B] font-semibold">Thành viên nòng cốt</span>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-1 pt-1 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
                  <span>Lớp 51K35.1-P · Khoa Kinh doanh quốc tế</span>
                </div>
                <div className="text-gray-500 pl-5">
                  Trường Đại học Kinh tế - Đại học Đà Nẵng (2025-2029)
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <a href="mailto:htbchau1310@gmail.com" className="text-[#005A5B] hover:underline truncate">
                    htbchau1310@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>0768578863</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Phase Implementation Plan */}
        <div className="space-y-3">
          <h3 className="font-royal font-bold text-[#4A2E65] text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#8E2829]" />
            <span>Kế Hoạch Triển Khai 3 Giai Đoạn Tại TP. Huế</span>
          </h3>

          <div className="space-y-2.5">
            {/* Phase 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-[#4A2E65]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Phase 1: Thử Nghiệm (Beta)</span>
                </span>
                <span className="text-[#8E2829]">10 - 20 HS-SV tại Huế</span>
              </div>
              <p className="text-gray-600">
                Thử nghiệm Beta tính năng lọc ngân sách, Audio Guide tại các kiệt hẻm Huế và thu thập phản hồi UI/UX chuẩn hóa theo thang đo học thuật.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-[#4A2E65]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#005A5B]"></span>
                  <span>Phase 2: Mở Rộng Nội Tỉnh & Lân Cận</span>
                </span>
                <span className="text-[#005A5B]">50 - 60 HS-SV Huế, Đà Nẵng, Quảng Trị</span>
              </div>
              <p className="text-gray-600">
                Số hóa thông tin làng nghề/nghệ nhân Huế (Thanh Tiên, làng Sình, Bao La, Phường Đúc), đẩy mạnh chia sẻ lộ trình tự nhiên trên MXH.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-[#4A2E65]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Phase 3: Bùng Nổ & Nhân Rộng</span>
                </span>
                <span className="text-emerald-700">100+ Du khách trẻ toàn quốc</span>
              </div>
              <p className="text-gray-600">
                Hoàn thiện hệ sinh thái đối tác kiệt hẻm và làng nghề thủ công Huế, biến mỗi bạn trẻ Gen Z thành một đại sứ du lịch tự nhiên cho Cố Đô.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#C59B27]/20 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#4A2E65] text-[#C59B27] font-bold text-xs rounded-xl shadow-xs hover:bg-[#38204f] cursor-pointer transition-colors"
          >
            Đóng & Tiếp Tục Khám Phá
          </button>
        </div>
      </div>
    </div>
  );
};
