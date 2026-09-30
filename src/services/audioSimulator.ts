// Immersive Web Audio & Storytelling Ambient Sound Generator
// Generates realistic multi-sensory ambient sounds (temple bell, alley chatter, boat ripples, craft hammers)
// and handles Vietnamese speech synthesis for GPS Smart Audio Storytelling.

class AudioSimulatorService {
  private audioCtx: AudioContext | null = null;
  private isAmbientPlaying = false;
  private ambientInterval: any = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play a soft temple bell / gong chime (tiếng chuông chùa ngân vang)
  playTempleBell(freq = 280) {
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, this.audioCtx.currentTime + 3.0);

      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 3.5);
    } catch (e) {
      console.warn('Audio bell error', e);
    }
  }

  // Play wooden chisel/hammer craft tap (tiếng đục gõ nan tre / mộc bản)
  playCraftTap() {
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.audioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.13);
    } catch (e) {
      console.warn('Audio tap error', e);
    }
  }

  // Play river water ripple (tiếng sóng vỗ mạn thuyền sông Hương)
  playWaterRipple() {
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const bufferSize = this.audioCtx.sampleRate * 0.4;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.audioCtx.sampleRate * 0.1));
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.38);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      noise.start();
    } catch (e) {
      console.warn('Water audio error', e);
    }
  }

  // Play gentle royal chord
  playRoyalChime() {
    [329.63, 440, 523.25, 659.25].forEach((freq, index) => {
      setTimeout(() => {
        this.playTempleBell(freq);
      }, index * 120);
    });
  }

  // Start continuous ambient soundscape according to type
  startAmbient(type: 'royal_court' | 'temple_bell' | 'river_boat' | 'alley_street' | 'craft_hammer') {
    this.stopAmbient();
    this.isAmbientPlaying = true;
    this.initContext();

    switch (type) {
      case 'temple_bell':
        this.playTempleBell(220);
        this.ambientInterval = setInterval(() => {
          if (this.isAmbientPlaying) {
            this.playTempleBell(220 + Math.random() * 80);
          }
        }, 4000);
        break;

      case 'craft_hammer':
        this.playCraftTap();
        this.ambientInterval = setInterval(() => {
          if (this.isAmbientPlaying) {
            this.playCraftTap();
            if (Math.random() > 0.5) {
              setTimeout(() => this.playCraftTap(), 140);
            }
          }
        }, 1200);
        break;

      case 'river_boat':
        this.playWaterRipple();
        this.ambientInterval = setInterval(() => {
          if (this.isAmbientPlaying) {
            this.playWaterRipple();
          }
        }, 2200);
        break;

      case 'royal_court':
        this.playRoyalChime();
        this.ambientInterval = setInterval(() => {
          if (this.isAmbientPlaying) {
            this.playRoyalChime();
          }
        }, 6000);
        break;

      case 'alley_street':
      default:
        this.playWaterRipple();
        this.ambientInterval = setInterval(() => {
          if (this.isAmbientPlaying) {
            if (Math.random() > 0.6) this.playCraftTap();
            else this.playWaterRipple();
          }
        }, 2500);
        break;
    }
  }

  stopAmbient() {
    this.isAmbientPlaying = false;
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  // Text-To-Speech for Storytelling
  speak(text: string, onEnd?: () => void, onBoundary?: (charIndex: number) => void) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Pick best Vietnamese voice if available
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'));
    if (viVoice) {
      utterance.voice = viVoice;
    }
    utterance.rate = 0.95; // Gentle, lyrical cadence for Huế storytelling
    utterance.pitch = 1.05;

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    if (onBoundary) {
      utterance.onboundary = (e) => {
        onBoundary(e.charIndex);
      };
    }

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  stopAll() {
    this.stopAmbient();
    this.stopSpeaking();
  }
}

export const audioSimulator = new AudioSimulatorService();
