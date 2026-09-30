import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Radio, 
  MapPin, 
  Compass, 
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { HUE_LOCATIONS } from '../data/hueData';
import { LocationItem } from '../types';
import { audioSimulator } from '../services/audioSimulator';

interface AudioStoryPlayerProps {
  selectedLocation: LocationItem | null;
  onSelectLocation: (loc: LocationItem) => void;
  onStreakAction: () => void;
}

export const AudioStoryPlayer: React.FC<AudioStoryPlayerProps> = ({
  selectedLocation,
  onSelectLocation,
  onStreakAction,
}) => {
  const [currentLoc, setCurrentLoc] = useState<LocationItem>(
    selectedLocation || HUE_LOCATIONS[0]
  );
  const [distanceMeters, setDistanceMeters] = useState<number>(25); // Simulated distance
  const [autoTriggered, setAutoTriggered] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isAmbientOn, setIsAmbientOn] = useState<boolean>(true);
  const [speakingProgress, setSpeakingProgress] = useState<number>(0);

  // Sync when prop changes
  useEffect(() => {
    if (selectedLocation && selectedLocation.id !== currentLoc.id) {
      setCurrentLoc(selectedLocation);
      setDistanceMeters(25);
      setAutoTriggered(false);
      stopAudio();
    }
  }, [selectedLocation]);

  // Handle GPS distance change simulation
  useEffect(() => {
    if (distanceMeters <= 10 && !autoTriggered) {
      setAutoTriggered(true);
      startAudioExperience();
    }
  }, [distanceMeters, autoTriggered]);

  const startAudioExperience = () => {
    setIsPlayingAudio(true);

    // 1. Play surround ambient soundscape
    if (isAmbientOn) {
      audioSimulator.startAmbient(currentLoc.audioStory.ambientSound);
    }

    // 2. Play speech narration
    audioSimulator.speak(
      currentLoc.audioStory.transcript,
      () => {
        setIsPlayingAudio(false);
        audioSimulator.stopAmbient();
        onStreakAction();
      },
      (charIdx) => {
        const total = currentLoc.audioStory.transcript.length;
        setSpeakingProgress(Math.min(100, Math.round((charIdx / total) * 100)));
      }
    );
  };

  const stopAudio = () => {
    setIsPlayingAudio(false);
    audioSimulator.stopAll();
    setSpeakingProgress(0);
  };

  const togglePlay = () => {
    if (isPlayingAudio) {
      stopAudio();
    } else {
      startAudioExperience();
    }
  };

  const toggleAmbient = () => {
    if (isAmbientOn) {
      audioSimulator.stopAmbient();
      setIsAmbientOn(false);
    } else {
      setIsAmbientOn(true);
      if (isPlayingAudio) {
        audioSimulator.startAmbient(currentLoc.audioStory.ambientSound);
      }
    }
  };

  // Change location
  const handleSelectLocation = (loc: LocationItem) => {
    stopAudio();
    setCurrentLoc(loc);
    onSelectLocation(loc);
    setDistanceMeters(30);
    setAutoTriggered(false);
  };

  // Simulate walking into the 10m boundary
  const handleSimulateWalkIn = () => {
    setDistanceMeters(8);
  };

  const getAmbientLabel = (type: string) => {
    switch (type) {
      case 'temple_bell':
        return 'Tiếng chuông thiền tự & thông reo';
      case 'craft_hammer':
        return 'Tiếng búa đục đồng & chuốt nan tre';
      case 'river_boat':
        return 'Tiếng sóng vỗ mạn thuyền sông Hương';
      case 'royal_court':
        return 'Nhã nhạc cung đình Huế ngân vang';
      case 'alley_street':
      default:
        return 'Tiếng rao hàng & nhịp sống kiệt hẻm';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="bg-[#F4EFE6] border border-[#C59B27]/30 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#4A2E65] text-[#C59B27] px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>GPS Smart Audio Storytelling</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-royal font-bold text-[#4A2E65]">
              "Nghe Câu Chuyện - Chạm Không Gian"
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl font-light">
              Tự động kích hoạt kịch truyền thanh ngắn khi du khách bước vào bán kính <span className="font-semibold text-[#8E2829]">10m</span> của điểm di sản hoặc quán ăn kiệt hẻm. Tích hợp âm thanh vòm chân thực mô phỏng tiếng chuông chùa, sóng sông Hương, tiếng gõ đục nghệ nhân.
            </p>
          </div>

          {/* Quick simulation button */}
          <button
            onClick={handleSimulateWalkIn}
            className="px-4 py-2 bg-[#005A5B] hover:bg-[#004748] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer transition-all shrink-0"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Mô Phỏng Bước Vào Bán Kính 10m</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Location Selection & Radar (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Radar Simulation Card */}
          <div className="bg-white border border-[#C59B27]/25 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#4A2E65] uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Mô Phỏng GPS Radar 10m</span>
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  distanceMeters <= 10
                    ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {distanceMeters <= 10 ? 'Đã Vào Bán Kính 10m' : `Cách ${distanceMeters}m`}
              </span>
            </div>

            {/* Radar Visualizer */}
            <div className="relative w-full h-48 bg-[#231B15] rounded-xl overflow-hidden flex items-center justify-center border border-[#C59B27]/30">
              {/* Radar concentric circles */}
              <div className="absolute w-40 h-40 rounded-full border border-[#C59B27]/20"></div>
              <div className="absolute w-28 h-28 rounded-full border border-[#C59B27]/30"></div>
              <div
                className={`absolute w-16 h-16 rounded-full border-2 transition-colors ${
                  distanceMeters <= 10
                    ? 'border-emerald-400 bg-emerald-400/20 shadow-[0_0_20px_rgba(52,211,153,0.5)]'
                    : 'border-[#C59B27]/50'
                }`}
              ></div>

              {/* Sweep animation line */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-[#C59B27] origin-left animate-spin duration-3000"></div>
              </div>

              {/* Center user dot */}
              <div className="z-10 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#C59B27] ring-4 ring-[#C59B27]/30 shadow-md"></div>
                <span className="text-[10px] text-white/80 font-medium mt-1">Vị trí của bạn</span>
              </div>

              {/* Target pin position */}
              <div 
                className="absolute z-10 transition-all duration-500 flex flex-col items-center"
                style={{
                  top: `${Math.max(15, 50 - distanceMeters * 1.1)}%`,
                  right: `${Math.max(15, 50 - distanceMeters * 1.1)}%`,
                }}
              >
                <div className="p-1 rounded-full bg-[#8E2829] text-white shadow-lg animate-bounce">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] text-[#FBF8F2] font-semibold bg-black/60 px-1 rounded-xs backdrop-blur-xs whitespace-nowrap">
                  {currentLoc.name.split('(')[0]}
                </span>
              </div>
            </div>

            {/* Slider to test manual distance */}
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Khoảng cách đến điểm:</span>
                <span className="font-bold text-[#4A2E65]">{distanceMeters} mét</span>
              </div>
              <input
                type="range"
                min={2}
                max={50}
                value={distanceMeters}
                onChange={(e) => setDistanceMeters(Number(e.target.value))}
                className="w-full accent-[#4A2E65] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>2m (Chạm cửa kiệt)</span>
                <span className="text-emerald-700 font-bold">10m (Vùng kích hoạt audio)</span>
                <span>50m (Ngoài xa)</span>
              </div>
            </div>
          </div>

          {/* Quick Location Switcher */}
          <div className="bg-white border border-[#C59B27]/25 rounded-2xl p-4 shadow-xs">
            <h3 className="text-xs font-bold text-[#4A2E65] uppercase tracking-wider mb-2">
              Chọn Điểm Để Trải Nghiệm Audio
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {HUE_LOCATIONS.map((loc) => {
                const isSelected = loc.id === currentLoc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectLocation(loc)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'border-[#4A2E65] bg-[#4A2E65]/5 font-semibold text-[#4A2E65]'
                        : 'border-gray-200 hover:border-[#C59B27]/50 text-gray-700'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs truncate">{loc.name}</div>
                      <div className="text-[10px] text-gray-500 truncate">{loc.audioStory.title}</div>
                    </div>
                    <span className="text-[10px] text-[#C59B27] shrink-0 font-medium">
                      {loc.audioStory.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Audio Experience Player & Story Transcript (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[#C59B27]/30 rounded-2xl p-6 shadow-sm space-y-5">
            {/* Header: Track metadata */}
            <div className="flex items-start justify-between gap-3 border-b border-[#C59B27]/20 pb-4">
              <div>
                <span className="text-xs font-bold text-[#8E2829] uppercase tracking-wider">
                  Kịch Truyền Thanh Kiệt Hẻm
                </span>
                <h3 className="text-lg sm:text-xl font-royal font-bold text-[#4A2E65] mt-0.5">
                  {currentLoc.audioStory.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                  <span>Giọng kể:</span>
                  <span className="font-semibold text-gray-800">
                    {currentLoc.audioStory.narratorName}
                  </span>
                  <span>·</span>
                  <span>Thời lượng: {currentLoc.audioStory.duration}</span>
                </p>
              </div>

              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#C59B27]/40 shadow-xs">
                <img
                  src={currentLoc.imageUrl}
                  alt={currentLoc.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Ambient Soundscape Status */}
            <div className="bg-[#FBF8F2] border border-[#C59B27]/30 rounded-xl p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isAmbientOn ? 'bg-emerald-500 animate-ping' : 'bg-gray-400'}`}></div>
                <div>
                  <span className="font-semibold text-[#4A2E65]">Âm thanh vòm Cố Đô: </span>
                  <span className="text-gray-600">{getAmbientLabel(currentLoc.audioStory.ambientSound)}</span>
                </div>
              </div>
              <button
                onClick={toggleAmbient}
                className="text-xs font-medium text-[#005A5B] hover:text-[#4A2E65] flex items-center gap-1 cursor-pointer"
              >
                {isAmbientOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isAmbientOn ? 'Đang bật' : 'Đã tắt'}</span>
              </button>
            </div>

            {/* Speaking Audio Visualizer & Waveform */}
            <div className="bg-[#231B15] text-white p-4 rounded-xl flex items-center justify-between gap-4">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-[#C59B27] hover:bg-[#d8ab31] text-[#231B15] flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer shrink-0"
                title={isPlayingAudio ? 'Tạm dừng kể' : 'Bắt đầu nghe kịch truyền thanh'}
              >
                {isPlayingAudio ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              {/* Animated Audio Waveform */}
              <div className="flex-1 flex items-center gap-1 h-8 justify-center overflow-hidden">
                {Array.from({ length: 28 }).map((_, i) => {
                  const barHeight = isPlayingAudio
                    ? Math.max(15, Math.sin(i * 0.5 + Date.now() * 0.005) * 80 + 20)
                    : 15;
                  return (
                    <div
                      key={i}
                      className="w-1 bg-[#C59B27] rounded-full transition-all duration-150"
                      style={{ height: `${barHeight}%`, opacity: isPlayingAudio ? 0.9 : 0.3 }}
                    ></div>
                  );
                })}
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-[#C59B27] font-semibold block">
                  {isPlayingAudio ? 'Đang thuyết minh' : 'Sẵn sàng'}
                </span>
                <span className="text-[10px] text-gray-400">
                  {speakingProgress > 0 ? `${speakingProgress}%` : currentLoc.audioStory.duration}
                </span>
              </div>
            </div>

            {/* Transcript text with Royal styling */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#4A2E65] uppercase tracking-wider">
                  Lời Kể Chuyện Truyền Cảm
                </span>
                <span className="text-[11px] text-gray-500 italic">
                  Đã tinh gọn 1-2 phút chuẩn thói quen nghe của Gen Z
                </span>
              </div>
              <div className="bg-[#FBF8F2] border border-[#C59B27]/20 rounded-xl p-4 text-xs sm:text-sm text-[#2C241D] leading-relaxed font-royal">
                "{currentLoc.audioStory.transcript}"
              </div>
            </div>

            {/* Artisan quote / local detail if available */}
            {currentLoc.artisanInfo && (
              <div className="border-t border-[#C59B27]/20 pt-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#005A5B]/15 text-[#005A5B] flex items-center justify-center font-bold text-xs shrink-0">
                  🌿
                </div>
                <div>
                  <div className="text-xs font-bold text-[#4A2E65]">
                    {currentLoc.artisanInfo.name} · {currentLoc.artisanInfo.generation}
                  </div>
                  <div className="text-[11px] text-gray-600 italic">
                    "{currentLoc.artisanInfo.quote}"
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
