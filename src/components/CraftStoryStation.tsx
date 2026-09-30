import React, { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  Send, 
  MessageSquare, 
  MapPin, 
  Volume2, 
  PlusCircle, 
  CheckCircle2, 
  UserCheck, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { HUE_LOCATIONS } from '../data/hueData';
import { LocationItem } from '../types';

interface CraftStoryStationProps {
  onListenAudio: (item: LocationItem) => void;
  onAddExpense: (item: LocationItem, workshopName?: string, price?: number) => void;
}

interface ArtisanMessage {
  id: string;
  artisanName: string;
  senderName: string;
  school: string;
  message: string;
  timestamp: string;
}

export const CraftStoryStation: React.FC<CraftStoryStationProps> = ({
  onListenAudio,
  onAddExpense,
}) => {
  const craftVillages = HUE_LOCATIONS.filter((l) => l.category === 'craft');
  const [selectedVillage, setSelectedVillage] = useState<LocationItem>(craftVillages[0]);
  
  // Interactive community messages to artisans
  const [messages, setMessages] = useState<ArtisanMessage[]>([
    {
      id: 'm1',
      artisanName: 'Nghệ nhân Thân Văn Huy',
      senderName: 'Minh Anh',
      school: 'ĐH Kinh tế - ĐH Đà Nẵng',
      message: 'Cảm ơn chú Huy đã tận tình hướng dẫn nhóm con vuốt từng cánh hoa sen giấy. Tụi con học được tính kiên nhẫn và càng thêm yêu văn hóa xứ Huế!',
      timestamp: '2 giờ trước'
    },
    {
      id: 'm2',
      artisanName: 'Nghệ nhân Kỳ Hữu Phước',
      senderName: 'Hoàng Long',
      school: 'THPT Chuyên Quốc Học Huế',
      message: 'Bức tranh mộc bản con tự tay in mực khói tàu đẹp lắm bác ơi, con dán ngay góc học tập để nhớ về làng Sình!',
      timestamp: 'Hôm qua'
    },
    {
      id: 'm3',
      artisanName: 'O Thuận Nón Lá',
      senderName: 'Khánh Vy',
      school: 'ĐH Sư Phạm Huế',
      message: 'Chiếc nón bài thơ soi lên thấy chùa Thiên Mụ bạn bè con ở Sài Gòn mê tít, cảm ơn O đã gìn giữ nghề đẹp đẽ này!',
      timestamp: '3 ngày trước'
    }
  ]);

  const [senderName, setSenderName] = useState('');
  const [senderSchool, setSenderSchool] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);

  // Community suggestion state
  const [suggestName, setSuggestName] = useState('');
  const [suggestKiet, setSuggestKiet] = useState('');
  const [suggestStory, setSuggestStory] = useState('');
  const [suggestSubmitted, setSuggestSubmitted] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !senderName.trim()) return;

    const newMsg: ArtisanMessage = {
      id: Date.now().toString(),
      artisanName: selectedVillage.artisanInfo?.name || selectedVillage.name,
      senderName: senderName.trim(),
      school: senderSchool.trim() || 'Sinh viên yêu Cố Đô',
      message: inputMessage.trim(),
      timestamp: 'Vừa xong'
    };

    setMessages([newMsg, ...messages]);
    setInputMessage('');
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestSubmitted(true);
    setTimeout(() => {
      setSuggestSubmitted(false);
      setShowSuggestModal(false);
      setSuggestName('');
      setSuggestKiet('');
      setSuggestStory('');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#005A5B] to-[#4A2E65] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-[#C59B27] text-[#231B15] px-2.5 py-0.5 rounded-full text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Không Gian Tiếp Nối Di Sản Gia Truyền</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-royal font-bold tracking-tight">
            Trạm Kể Chuyện Nghệ Nhân & Làng Nghề Cổ
          </h2>
          <p className="text-xs sm:text-sm text-[#FBF8F2]/80 mt-1 leading-relaxed font-light">
            Nơi thế hệ trẻ lắng nghe câu chuyện đời, chuyện nghề của các nghệ nhân làng hoa giấy Thanh Tiên, tranh dân gian Sình, đúc đồng Phường Đúc, nón bài thơ Phú Cam, gốm Phước Tích, đan lát Bao La... Cùng kết nối và lan tỏa kinh tế kiệt hẻm Huế.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setShowSuggestModal(true)}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-xs text-white text-xs font-semibold rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>+ Đề xuất kiệt hẻm / Nghệ nhân mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Artisan Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Artisan Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-[#4A2E65] uppercase tracking-wider">
            Các Bậc Thầy Làng Nghề Xứ Huế
          </h3>
          <div className="space-y-2.5">
            {craftVillages.map((village) => {
              const isSelected = village.id === selectedVillage.id;
              return (
                <div
                  key={village.id}
                  onClick={() => setSelectedVillage(village)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-white border-[#C59B27] shadow-sm ring-1 ring-[#C59B27]/40'
                      : 'bg-[#FBF8F2] border-[#C59B27]/20 hover:bg-white'
                  }`}
                >
                  <img
                    src={village.imageUrl}
                    alt={village.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#C59B27]/30"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#4A2E65] truncate font-royal">
                      {village.name}
                    </h4>
                    <p className="text-[11px] text-[#8E2829] font-medium truncate">
                      {village.artisanInfo?.name || village.tagline}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">
                      {village.artisanInfo?.craftName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Featured Artisan Detail & Story (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white border border-[#C59B27]/30 rounded-2xl p-6 shadow-xs space-y-5">
            {/* Header with image */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#C59B27]/20 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#005A5B] uppercase tracking-wider">
                  {selectedVillage.artisanInfo?.generation || 'Gìn giữ tinh hoa Cố Đô'}
                </span>
                <h3 className="text-xl sm:text-2xl font-royal font-bold text-[#4A2E65]">
                  {selectedVillage.artisanInfo?.name || selectedVillage.name}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8E2829]" />
                  <span>{selectedVillage.kietAddress}</span>
                </p>
              </div>

              <button
                onClick={() => onListenAudio(selectedVillage)}
                className="px-4 py-2 bg-[#4A2E65] hover:bg-[#392150] text-[#C59B27] text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer transition-all shrink-0"
              >
                <Volume2 className="w-4 h-4 text-[#C59B27]" />
                <span>Nghe Giọng Kể Nghệ Nhân</span>
              </button>
            </div>

            {/* Quote of Artisan */}
            {selectedVillage.artisanInfo?.quote && (
              <div className="bg-[#FBF8F2] border-l-4 border-[#C59B27] p-4 rounded-r-xl">
                <p className="font-royal text-sm sm:text-base text-[#4A2E65] italic leading-relaxed">
                  "{selectedVillage.artisanInfo.quote}"
                </p>
                <span className="block text-right text-xs text-gray-500 font-semibold mt-1">
                  — {selectedVillage.artisanInfo.name}
                </span>
              </div>
            )}

            {/* Craft history & Gen Z value */}
            <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <h4 className="font-bold text-[#4A2E65] text-xs uppercase tracking-wider">
                Câu Chuyện Di Sản Gia Truyền
              </h4>
              <p>{selectedVillage.story}</p>
            </div>

            {/* Affordable Workshop / Souvenir Price list */}
            <div className="bg-[#F4EFE6] border border-[#C59B27]/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#4A2E65] uppercase tracking-wider">
                  Trải Nghiệm Tại Xưởng Nghệ Nhân (Chuẩn Ngân Sách Sinh Viên)
                </span>
                <span className="text-[11px] text-[#005A5B] font-semibold">
                  Chỉ từ 15.000đ - 25.000đ
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedVillage.menuOrTickets?.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-lg border border-[#C59B27]/20 flex items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-gray-800">{item.item}</div>
                      <div className="text-[10px] text-gray-500">{item.description}</div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-bold text-[#8E2829]">
                        {item.price > 0 ? `${item.price.toLocaleString('vi-VN')}đ` : 'Miễn phí'}
                      </span>
                      <button
                        onClick={() => onAddExpense(selectedVillage, item.item, item.price)}
                        className="p-1 rounded-md bg-[#C59B27]/20 hover:bg-[#C59B27]/40 text-[#4A2E65] transition-colors cursor-pointer"
                        title="Thêm trải nghiệm này vào sổ chi tiêu"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Section: Send message & Love to Artisan */}
            <div className="border-t border-[#C59B27]/20 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-[#4A2E65] uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#8E2829] fill-[#8E2829]" />
                <span>Gửi Lời Nhắn & Tri Ân Tới Nghệ Nhân</span>
              </h4>

              <form onSubmit={handleSendMessage} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên của bạn..."
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-[#FBF8F2] border border-[#C59B27]/30 rounded-xl px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                  <input
                    type="text"
                    placeholder="Trường / Lớp (VD: 51K35.1-P ĐHKT Đà Nẵng)..."
                    value={senderSchool}
                    onChange={(e) => setSenderSchool(e.target.value)}
                    className="w-full bg-[#FBF8F2] border border-[#C59B27]/30 rounded-xl px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder={`Gửi lời nhắn động viên tới ${selectedVillage.artisanInfo?.name || 'nghệ nhân'}...`}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 bg-[#FBF8F2] border border-[#C59B27]/30 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8E2829] hover:bg-[#742021] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                  >
                    <Send className="w-3 h-3" />
                    <span>Gửi</span>
                  </button>
                </div>
                {isSent && (
                  <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Lời tri ân ấm áp của bạn đã được chuyển tới nghệ nhân!</span>
                  </p>
                )}
              </form>

              {/* Recent Community Messages */}
              <div className="mt-4 space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-gray-500">
                  Lời tri ân từ các bạn trẻ gần đây:
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className="bg-[#FBF8F2] p-2.5 rounded-xl border border-[#C59B27]/15 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-gray-600">
                        <span className="font-bold text-[#4A2E65]">
                          {m.senderName} · <span className="font-normal text-gray-500">{m.school}</span>
                        </span>
                        <span className="text-[10px] text-gray-400">{m.timestamp}</span>
                      </div>
                      <p className="text-gray-700 italic">"{m.message}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggest New Kiet Hem Modal */}
      {showSuggestModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#C59B27]/40 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-royal font-bold text-[#4A2E65] text-lg">
                Đề Xuất Kiệt Hẻm / Nghệ Nhân
              </h3>
              <button
                onClick={() => setShowSuggestModal(false)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Bạn biết một gánh hàng sâu trong kiệt hay một nghệ nhân gia truyền chưa được nhiều người biết tới? Hãy chia sẻ để nhóm ROUTEEN xác thực và số hóa đưa lên bản đồ di sản!
            </p>

            {suggestSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center text-xs space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <div className="font-bold">Đề xuất thành công!</div>
                <div>Nhóm dự án ROUTEEN sẽ liên hệ khảo sát thực tế và niêm yết lên app nghen.</div>
              </div>
            ) : (
              <form onSubmit={handleSuggestSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Tên quán / Làng nghề / Nghệ nhân
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Bánh ướt cuốn thịt nướng kiệt Kim Long"
                    value={suggestName}
                    onChange={(e) => setSuggestName(e.target.value)}
                    className="w-full bg-[#FBF8F2] border border-[#C59B27]/30 rounded-xl p-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Địa chỉ kiệt hẻm cụ thể
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Kiệt 12 sau đình Kim Long, TP. Huế"
                    value={suggestKiet}
                    onChange={(e) => setSuggestKiet(e.target.value)}
                    className="w-full bg-[#FBF8F2] border border-[#C59B27]/30 rounded-xl p-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Điểm đặc biệt / Giá tham khảo
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="VD: Quán mệ bán hơn 30 năm, 1 dĩa 25k đầy ắp thịt nướng than hoa, mệ cực hiền lành..."
                    value={suggestStory}
                    onChange={(e) => setSuggestStory(e.target.value)}
                    className="w-full bg-[#FBF8F2] border border-[#C59B27]/30 rounded-xl p-2"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSuggestModal(false)}
                    className="px-3 py-1.5 text-gray-600 text-xs rounded-lg cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4A2E65] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer hover:bg-[#38204f]"
                  >
                    Gửi Đề Xuất
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
