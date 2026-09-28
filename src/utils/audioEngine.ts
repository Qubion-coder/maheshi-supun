/**
 * Luxury Mountain Audio Engine using Web Audio API
 * Generates an ethereal, peaceful high-mountain soundscape:
 * - Subdued alpine breeze (warm filtered noise with breathing modulation)
 * - Warm harmonic drone pads (resembling muted cello/organ resonance)
 * - Resonant mountain wind chimes (D-major pentatonic pure crystal bells)
 */

class MountainAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private bellIntervalId: number | null = null;
  private droneOscillators: OscillatorNode[] = [];

  public init() {
    if (this.ctx) return;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public async start(): Promise<boolean> {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return false;

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      this.isPlaying = true;
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.32, now + 2.5);

      this.startWind();
      this.startWarmDrone();
      this.startHarmonicChimes();
      return true;
    } catch {
      return false;
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1.2);

    setTimeout(() => {
      this.isPlaying = false;
      if (this.bellIntervalId) {
        clearInterval(this.bellIntervalId);
        this.bellIntervalId = null;
      }
      this.droneOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.droneOscillators = [];
    }, 1300);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startWind() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.018 * white) / 1.018;
      lastOut = data[i];
      data[i] *= 3.2;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.6, this.ctx.currentTime);

    // LFO for organic wind swells
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.09, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(windGain);
    windGain.connect(this.masterGain);

    noiseSource.start();
    lfo.start();
  }

  private startWarmDrone() {
    if (!this.ctx || !this.masterGain) return;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.045, this.ctx.currentTime);

    // Warm peaceful fifth chord: D2 (73.42Hz), A2 (110Hz), F#3 (185Hz)
    const freqs = [73.42, 110.0, 185.0];
    this.droneOscillators = [];

    freqs.forEach((freq) => {
      if (!this.ctx || !this.droneGain) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const subtleGain = this.ctx.createGain();
      subtleGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

      osc.connect(subtleGain);
      subtleGain.connect(this.droneGain);
      osc.start();
      this.droneOscillators.push(osc);
    });

    this.droneGain.connect(this.masterGain);
  }

  private startHarmonicChimes() {
    if (!this.ctx) return;

    // D-major pentatonic bell frequencies
    const notes = [293.66, 369.99, 440.0, 587.33, 739.99, 880.0, 1174.66];

    const playRandomChime = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const freq = notes[Math.floor(Math.random() * notes.length)];

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.05, now + 0.06);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 4.5);
    };

    this.bellIntervalId = window.setInterval(() => {
      if (Math.random() > 0.25) {
        playRandomChime();
        if (Math.random() > 0.5) {
          setTimeout(playRandomChime, 550);
        }
      }
    }, 3800);
  }
}

export const mountainAudio = new MountainAudioEngine();
