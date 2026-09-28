import React, { useState } from 'react';
import { MountainJourney } from './components/MountainJourney';
import { WeddingHero } from './components/WeddingHero';
import { StorySection } from './components/StorySection';
import { ParentsSection } from './components/ParentsSection';
import { WeddingDetails } from './components/WeddingDetails';
import { VenueSection } from './components/VenueSection';
import { EventTimeline } from './components/EventTimeline';
import { MemoryGallery } from './components/MemoryGallery';
import { SummitSection } from './components/SummitSection';
import { RSVPSection } from './components/RSVPSection';
import { MusicPlayer } from './components/MusicPlayer';
import { IntroScreen } from './components/IntroScreen';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  if (!hasEntered) {
    return <IntroScreen onComplete={() => setHasEntered(true)} />;
  }

  return (
    <MountainJourney>
      {/* 1. HERO — THE JOURNEY BEGINS */}
      <WeddingHero />

      {/* 2. OUR STORY / JOURNEY */}
      <StorySection />

      {/* 3. FAMILY SECTION */}
      <ParentsSection />

      {/* 4. MEMORY / PHOTO SECTION */}
      <MemoryGallery />

      {/* 5. WEDDING DETAILS — HIGHER MOUNTAIN */}
      <WeddingDetails />

      {/* 6. VENUE SECTION */}
      <VenueSection />

      {/* 7. EVENT TIMELINE */}
      <EventTimeline />

      {/* 8. ICY MOUNTAIN TRANSITION & SUMMIT — FINAL INVITATION */}
      <SummitSection />

      {/* RSVP */}
      <RSVPSection />

      {/* BACKGROUND MUSIC */}
      <MusicPlayer />
    </MountainJourney>
  );
}
