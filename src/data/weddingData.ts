import { WeddingConfig, ElevationStage } from '../types/wedding';

export const weddingData: WeddingConfig = {
  bride: "MAHESHI PRIYANVADA",
  groom: "SUPUN PRIYANJANA",
  brideShort: "Maheshi",
  groomShort: "Supun",
  parents: {
    bride: {
      father: "HEWA LUNUWILAGE CHANDRASIRI SUNIL",
      mother: "NALLA PERUMA ARACHCHIGE PUNYA",
    },
    groom: {
      father: "JUDE PRIYANTHA DE SILVA",
      mother: "UDENI SHYAMA THUSHARI DE SILVA",
    },
  },
  date: "01ST DECEMBER 2026",
  dateFull: "Tuesday, 01st December 2026",
  dateISO: "2026-12-01T10:30:00+05:30",
  time: "10.30 A.M. – 15.30 P.M.",
  venue: "Grandeeza Luxury Hotel, Negombo",
  location: "Negombo, Sri Lanka",
  locationUrl: "https://bit.ly/4yUijdT",
  theme: "Greenery + Icy Mountains",
  colors: {
    forestGreen: "#11261a",
    primary: "#1d442e",
    secondary: "#4d7a61",
    accent: "#8c6721",
    icyWhite: "#ffffff",
  },
  timeline: [
    {
      id: "tl-1",
      time: "10.30 A.M.",
      title: "Arrival & Welcome",
      description: "Guest reception in the Grandeeza foyer.",
      highlight: true,
    },
    {
      id: "tl-2",
      time: "11.30 A.M.",
      title: "Ceremony & Blessings",
      description: "Traditional customs and rings exchange.",
      highlight: true,
    },
    {
      id: "tl-3",
      time: "13.00 P.M.",
      title: "Wedding Luncheon",
      description: "Celebration banquet and family toasts.",
    },
    {
      id: "tl-4",
      time: "14.30 P.M.",
      title: "Cake Cutting & Celebration",
      description: "Joyful moments with family and friends.",
    },
    {
      id: "tl-5",
      time: "15.30 P.M.",
      title: "Celebration Farewell",
      description: "Closing celebration and departure.",
      highlight: true,
    },
  ],
  photos: [
    {
      id: "photo-1",
      title: "Lush Greenery Vista",
      caption: "Emerald slopes framed by morning mist.",
      scenicType: "forest",
      rotationDeg: -1.5,
    },
    {
      id: "photo-2",
      title: "Crystal Waterfall",
      caption: "Cascading pure mountain streams.",
      scenicType: "waterfall",
      rotationDeg: 1.5,
    },
    {
      id: "photo-3",
      title: "Icy Mountain Peak",
      caption: "Snow-kissed summits touching the clouds.",
      scenicType: "peak",
      rotationDeg: -1,
    },
    {
      id: "photo-4",
      title: "White Floral Meadow",
      caption: "Pristine white blooms on mountain paths.",
      scenicType: "meadow",
      rotationDeg: 1,
    },
  ],
  music: {
    title: "Wedding Theme Song",
    youtubeUrl: "https://youtu.be/eUDVUZZyA0M?si=P7P7D8UIGWv8xnZ",
    videoId: "eUDVUZZyA0M",
  },
  elevationBase: 650,
  elevationPeak: 3200,
};

export const WEDDING_COUPLE = {
  bride: weddingData.bride,
  groom: weddingData.groom,
  initials: "M & S",
  dateFormatted: weddingData.date,
  dateISO: weddingData.dateISO,
  venue: weddingData.venue,
  location: weddingData.location,
  tagline: "A Mountain Wedding Celebration",
  elevationPeak: weddingData.elevationPeak,
  elevationBase: weddingData.elevationBase,
};

export const ELEVATION_STAGES: ElevationStage[] = [
  {
    id: "hero",
    elevationMeters: 650,
    title: "The Beginning",
    subtitle: "Lush Green Foothills",
    scrollRatioStart: 0,
    scrollRatioEnd: 0.15,
  },
  {
    id: "parents",
    elevationMeters: 1450,
    title: "Parents' Blessings",
    subtitle: "Garden Viewpoint",
    scrollRatioStart: 0.15,
    scrollRatioEnd: 0.35,
  },
  {
    id: "details",
    elevationMeters: 2100,
    title: "Wedding Details",
    subtitle: "Date, Time & Venue",
    scrollRatioStart: 0.35,
    scrollRatioEnd: 0.55,
  },
  {
    id: "timeline",
    elevationMeters: 2600,
    title: "Event Timeline",
    subtitle: "10.30 A.M. – 15.30 P.M.",
    scrollRatioStart: 0.55,
    scrollRatioEnd: 0.72,
  },
  {
    id: "photos",
    elevationMeters: 2900,
    title: "Moments & Photos",
    subtitle: "Photo Gallery",
    scrollRatioStart: 0.72,
    scrollRatioEnd: 0.86,
  },
  {
    id: "summit",
    elevationMeters: 3200,
    title: "Icy Mountain Summit",
    subtitle: "Final Invitation & RSVP",
    scrollRatioStart: 0.86,
    scrollRatioEnd: 1.0,
  },
];

export const INITIAL_GUESTBOOK_BLESSINGS = [
  {
    id: "bless-1",
    name: "The De Silva Family",
    location: "Colombo",
    message: "May your lives be blessed with unending joy and harmony.",
    timestamp: "2 hours ago",
  },
  {
    id: "bless-2",
    name: "The Hewa Lunuwilage Family",
    location: "Negombo",
    message: "Wishing Maheshi and Supun a beautiful journey filled with love.",
    timestamp: "Yesterday",
  },
];
