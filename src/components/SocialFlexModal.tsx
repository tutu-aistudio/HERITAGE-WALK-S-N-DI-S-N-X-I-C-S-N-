import React, { useRef, useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  MapPin, 
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';
import { LocationItem, ExpenseRecord } from '../types';

interface SocialFlexModalProps {
  isOpen: boolean;
  onClose: () => void;
  stops: LocationItem[];
  totalSpent: number;
  userName?: string;
  badgeTitle?: string;
}

export const SocialFlexModal: React.FC<SocialFlexModalProps> = ({
  isOpen,
  onClose,
  stops,
  totalSpent,
  userName = 'Gen Z Khám Phá Huế',
  badgeTitle = 'Đệ Nhất Thám Hiểm Kiệt Hẻm',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);

  if (!isOpen) return null;

  const defaultStops = stops.length > 0 ? stops : [
    { name: 'Chùa Từ Hiếu', kietAddress: 'Đồi thông Thủy Xuân', category: 'heritage', estPrice: 0 },
    { name: 'Bánh Canh Nam Phổ O Thu', kietAddress: 'Kiệt 374 Phạm Hồng Thái', category: 'food', estPrice: 20000 },
    { name: 'Làng Hoa Giấy Thanh Tiên', kietAddress: 'Bờ sông Hương, Phú Mậu', category: 'craft', estPrice: 20000 }
  ];

  const viralCaption = `✨ Đã "săn di sản, xơi đặc sản" phá đảo Cố Đô Huế chỉ với đúng ${totalSpent.toLocaleString('vi-VN')} VNĐ! 🌿💜
Tụi mình vừa hoàn thành lộ trình kiệt hẻm chuẩn vibe Gen Z:
${defaultStops.map((s, idx) => `📍 Chặng ${idx + 1}: ${s.name} (${s.kietAddress})`).join('\n')}
💰 Ăn ngon chuẩn vị Huế gốc, giá niêm yết rõ ràng không lo bị chém. Bật audio guide GPS 10m nghe các o kể chuyện mê chữ ê kéo dài!
Khám phá thêm trên Web App ROUTEEN - Chạm di sản kiệt hẻm, làm chủ ngân sách Gen Z!
#HeritageWalk #Routeen #SanDiSanXoiDacSan #HueKiethEm #GenZDuLichHue #DuLichHueTietKiem`;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(viralCaption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleDownloadCard = () => {
    setIsGeneratingImg(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350; // 4:5 Instagram/TikTok portrait ratio
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsGeneratingImg(false);
      return;
    }

    // 1. Background gradient (Heritage Purple to Deep Plum)
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, '#4A2E65');
    gradient.addColorStop(0.6, '#321A47');
    gradient.addColorStop(1, '#1A0D26');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1350);

    // 2. Gold decorative borders
    ctx.strokeStyle = '#C59B27';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1020, 1290);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 40, 1000, 1270);

    // Decorative corner accents
    ctx.fillStyle = '#C59B27';
    [
      [50, 50], [1030, 50], [50, 1300], [1030, 1300]
    ].forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Header branding
    ctx.fillStyle = '#C59B27';
    ctx.font = 'bold 32px serif';
    ctx.textAlign = 'center';
    ctx.fillText('★ ROUTEEN · HUẾ HERITAGE WALK ★', 540, 110);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 54px serif';
    ctx.fillText('SĂN DI SẢN · XƠI ĐẶC SẢN', 540, 185);

    ctx.fillStyle = '#E8D5A3';
    ctx.font = 'italic 28px sans-serif';
    ctx.fillText('"Chạm di sản kiệt hẻm - Làm chủ ngân sách Gen Z"', 540, 235);

    // 4. Spent Highlight Box (Golden Badge)
    ctx.fillStyle = 'rgba(197, 155, 39, 0.15)';
    ctx.roundRect(140, 280, 800, 150, 24);
    ctx.fill();
    ctx.strokeStyle = '#C59B27';
    ctx.lineWidth = 2;
    ctx.roundRect(140, 280, 800, 150, 24);
    ctx.stroke();

    ctx.fillStyle = '#E8D5A3';
    ctx.font = '24px sans-serif';
    ctx.fillText('TỔNG CHI TIÊU TOÀN BỘ CHUYẾN ĐI', 540, 330);

    ctx.fillStyle = '#FFDF78';
    ctx.font = 'bold 64px sans-serif';
    ctx.fillText(`${totalSpent.toLocaleString('vi-VN')} VNĐ`, 540, 400);

    // 5. Itinerary Path Heading
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 34px serif';
    ctx.fillText('Lộ Trình Đã Phá Đảo:', 140, 495);

    // Draw route stops
    defaultStops.slice(0, 3).forEach((stop, index) => {
      const y = 550 + index * 170;

      // Connecting line
      if (index < 2) {
        ctx.strokeStyle = '#C59B27';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(170, y + 40);
        ctx.lineTo(170, y + 150);
        ctx.stroke();
      }

      // Step circle
      ctx.fillStyle = '#C59B27';
      ctx.beginPath();
      ctx.arc(170, y + 30, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#231B15';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${index + 1}`, 170, y + 37);

      // Stop Card container
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.roundRect(220, y - 5, 720, 110, 16);
      ctx.fill();

      // Text inside
      ctx.textAlign = 'left';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 30px serif';
      ctx.fillText(stop.name, 245, y + 38);

      ctx.fillStyle = '#CFC5BA';
      ctx.font = '22px sans-serif';
      ctx.fillText(`📍 ${stop.kietAddress}`, 245, y + 78);
    });

    // 6. Royal Achievement Badge
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(197, 155, 39, 0.2)';
    ctx.roundRect(140, 1070, 800, 90, 20);
    ctx.fill();
    ctx.fillStyle = '#FFDF78';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(`🏅 DANH HIỆU: ${badgeTitle.toUpperCase()}`, 540, 1125);

    // 7. Footer
    ctx.fillStyle = '#9C87A6';
    ctx.font = '22px sans-serif';
    ctx.fillText('Đề tài: ROUTEEN - Trường Đại học Kinh tế, ĐH Đà Nẵng', 540, 1220);
    ctx.fillText('#HeritageWalk #Routeen #SanDiSanXoiDacSan #HueKiethEm', 540, 1260);

    // Export image
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `HeritageWalk_Hue_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    setIsGeneratingImg(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FBF8F2] border border-[#C59B27]/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#C59B27]/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#C59B27]/20 text-[#4A2E65]">
              <Sparkles className="w-4 h-4 text-[#C59B27]" />
            </span>
            <div>
              <h3 className="font-royal font-bold text-[#4A2E65] text-lg sm:text-xl">
                Card "Flexing" Di Sản & Chi Tiêu
              </h3>
              <p className="text-[11px] text-gray-500">
                Xuất ảnh poster chuẩn tỉ lệ Instagram Story / TikTok
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Visual Card Preview */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#4A2E65] via-[#321A47] to-[#1A0D26] text-white p-5 border-2 border-[#C59B27] shadow-lg overflow-hidden">
          {/* Subtle dragon/motif watermark */}
          <div className="absolute top-2 right-3 text-5xl opacity-10 select-none">
            🐉
          </div>

          <div className="text-center space-y-1">
            <div className="text-[#C59B27] text-[11px] font-bold tracking-widest uppercase">
              ★ ROUTEEN · HUẾ HERITAGE WALK ★
            </div>
            <h4 className="font-royal font-bold text-xl sm:text-2xl text-white">
              SĂN DI SẢN · XƠI ĐẶC SẢN
            </h4>
            <p className="text-[11px] text-[#E8D5A3] italic">
              "Chạm di sản kiệt hẻm - Làm chủ ngân sách Gen Z"
            </p>
          </div>

          {/* Spend Highlight */}
          <div className="my-4 bg-[#C59B27]/20 border border-[#C59B27]/60 rounded-xl p-3 text-center">
            <div className="text-[10px] uppercase tracking-wider text-[#E8D5A3]">
              Tổng Chi Tiêu Toàn Bộ Chuyến Đi
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#FFDF78]">
              {totalSpent.toLocaleString('vi-VN')} VNĐ
            </div>
          </div>

          {/* Stops preview */}
          <div className="space-y-2 text-xs">
            <div className="text-[11px] font-bold text-[#C59B27] uppercase tracking-wider">
              Lộ trình đã phá đảo:
            </div>
            {defaultStops.slice(0, 3).map((st, i) => (
              <div
                key={i}
                className="bg-white/10 rounded-lg p-2 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-[#C59B27] text-[#2C241D] font-bold text-[10px] flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">{st.name}</div>
                    <div className="text-[10px] text-gray-300 truncate">{st.kietAddress}</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#C59B27] font-semibold shrink-0">
                  {st.estPrice > 0 ? `${st.estPrice.toLocaleString('vi-VN')}đ` : 'Miễn phí'}
                </span>
              </div>
            ))}
          </div>

          {/* Badge & Footer */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-300">
            <span className="flex items-center gap-1 text-[#FFDF78] font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>{badgeTitle}</span>
            </span>
            <span>#HeritageWalk #Routeen</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={handleDownloadCard}
              disabled={isGeneratingImg}
              className="w-full py-2.5 bg-[#4A2E65] hover:bg-[#38204f] text-[#C59B27] font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-[#C59B27]" />
              <span>{isGeneratingImg ? 'Đang tạo ảnh...' : 'Tải Ảnh Check-in (PNG)'}</span>
            </button>

            <button
              onClick={handleCopyCaption}
              className="w-full py-2.5 bg-[#C59B27] hover:bg-[#b0881f] text-[#2C241D] font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {copiedCaption ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>Đã sao chép caption!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#4A2E65]" />
                  <span>Sao Chép Caption MXH</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[11px] text-gray-500 text-center">
            Mỗi lượt chia sẻ của bạn là một bước giúp các nghệ nhân và gánh hàng kiệt hẻm Cố Đô tiếp cận gần hơn với du khách trẻ!
          </div>
        </div>
      </div>
    </div>
  );
};
