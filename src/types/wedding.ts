export interface ParentInfo {
  father: string;
  mother: string;
}

export interface ParentsConfig {
  bride: ParentInfo;
  groom: ParentInfo;
}

export interface PhotoMemory {
  id: string;
  title: string;
  caption: string;
  imageUrl?: string;
  scenicType: 'lake' | 'meadow' | 'starlight' | 'peak' | 'forest' | 'waterfall';
  rotationDeg: number;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface WeddingConfig {
  bride: string;
  groom: string;
  brideShort: string;
  groomShort: string;
  parents: ParentsConfig;
  date: string;
  dateFull: string;
  dateISO: string;
  time: string;
  venue: string;
  location: string;
  locationUrl: string;
  theme: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    icyWhite: string;
    forestGreen: string;
  };
  timeline: TimelineEvent[];
  photos: PhotoMemory[];
  music: {
    title: string;
    youtubeUrl: string;
    videoId: string;
  };
  elevationPeak: number;
  elevationBase: number;
}

export interface StoryMilestone {
  id: string;
  elevation: number;
  stageName: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  scenicIcon: 'seed' | 'lantern' | 'pine' | 'waterfall' | 'ring';
  quote: string;
}

export interface ElevationStage {
  id: string;
  elevationMeters: number;
  title: string;
  subtitle: string;
  scrollRatioStart: number;
  scrollRatioEnd: number;
}

export interface RSVPData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  dietaryChoice: string;
  allergies?: string;
  songRequest?: string;
  blessing?: string;
  timestamp: string;
}
