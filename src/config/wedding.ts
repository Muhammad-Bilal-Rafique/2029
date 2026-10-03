export interface WeddingEvent {
  id: 'mehndi' | 'baraat' | 'walima';
  title: string;
  tagline: string;
  dateString: string; // ISO date 'YYYY-MM-DD'
  displayDate: string;
  shortDescription: string;
  city: string;
  venue: string | null;
  venuePlaceholder: string;
  time: string | null;
  timePlaceholder: string;
  dressCode: string;
  themeColor: {
    accent: string;
    border: string;
    bg: string;
    badge: string;
  };
  isFeatured?: boolean;
  travelNote?: string;
  mapUrl?: string | null;
}

export interface WeddingConfig {
  couple: {
    groom: {
      fullName: string;
      firstName: string;
      hometown: string;
      photo: string;
      initial: string;
    };
    bride: {
      fullName: string;
      firstName: string;
      hometown: string;
      photo: string | null;
      initial: string;
    };
    displayNames: string;
    initials: string;
  };
  invitation: {
    tagline: string;
    subtitle: string;
    primaryDate: string;
    primaryDateFormatted: string;
    primaryLocation: string;
    targetCountdownDateIso: string; // Karachi timezone target ISO string
    targetTimezone: string;
  };
  welcome: {
    heading: string;
    quote: string;
    body: string;
  };
  events: WeddingEvent[];
  letter: {
    heading: string;
    salutation: string;
    paragraphs: string[];
    signoff: string;
    signature: string;
  };
  rsvp: {
    heading: string;
    subtitle: string;
    isConfigured: boolean; // Set to true when an API/form endpoint is wired
    destinationType: 'demo' | 'email' | 'formspree' | 'api';
    endpointUrl: string; // e.g., 'https://formspree.io/f/xyz' or your backend endpoint
    contactPlaceholder: string;
    previewNotice: string;
  };
  music: {
    title: string;
    artist: string;
    audioSrc: string; // Path in public directory
    note: string;
  };
  closing: {
    heading: string;
    message: string;
    signature: string;
  };
  seo: {
    title: string;
    description: string;
    siteUrl: string;
  };
  security: {
    isPasswordProtected: boolean;
    password: string;
    storageKey: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      fullName: "Muhammad Bilal Rafique",
      firstName: "Bilal",
      hometown: "Lahore, Pakistan",
      photo: "/images/bilal.jpg",
      initial: "B",
    },
    bride: {
      fullName: "Maria Jakhro",
      firstName: "Maria",
      hometown: "Karachi, Pakistan",
      photo: null,
      initial: "M",
    },
    displayNames: "Bilal & Maria",
    initials: "B & M",
  },
  invitation: {
    tagline: "Together with their families",
    subtitle: "Joyfully invite you to celebrate their wedding",
    primaryDate: "12 · 09 · 2029",
    primaryDateFormatted: "12 September 2029",
    primaryLocation: "Karachi, Pakistan",
    // 12 September 2029, 19:00 (7:00 PM) PKT (UTC+5)
    targetCountdownDateIso: "2029-09-12T19:00:00+05:00",
    targetTimezone: "Asia/Karachi",
  },
  welcome: {
    heading: "A Celebration of Love",
    quote: "“And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.”",
    body: "With grateful hearts and the blessings of our families, we invite you to join us as we begin a beautiful new chapter together. Your presence and prayers will make our celebration even more special.",
  },
  events: [
    {
      id: "mehndi",
      title: "Mehndi",
      tagline: "An Evening of Music & Henna",
      dateString: "2029-09-11",
      displayDate: "11 September 2029",
      shortDescription:
        "A day of colour, laughter, music and beautiful traditions as we celebrate the beginning of our wedding festivities.",
      city: "Karachi, Pakistan",
      venue: null,
      venuePlaceholder: "Venue to be announced",
      time: null,
      timePlaceholder: "Time to be announced",
      dressCode: "Traditional Yellows, Greens & Festive Attire",
      themeColor: {
        accent: "#C6A46A",
        border: "border-amber-200/50",
        bg: "from-amber-950/20 via-stone-900/40 to-emerald-950/20",
        badge: "bg-amber-900/30 text-amber-200 border-amber-700/40",
      },
      mapUrl: null,
    },
    {
      id: "baraat",
      title: "Baraat",
      tagline: "The Union of Two Families",
      dateString: "2029-09-12",
      displayDate: "12 September 2029",
      shortDescription:
        "Surrounded by family, friends and blessings, we invite you to celebrate the day we begin our journey together.",
      city: "Karachi, Pakistan",
      venue: null,
      venuePlaceholder: "Venue to be announced",
      time: null,
      timePlaceholder: "Time to be announced",
      dressCode: "Traditional Formal & Regal Elegance",
      themeColor: {
        accent: "#581D35",
        border: "border-rose-400/40",
        bg: "from-rose-950/40 via-stone-900/60 to-red-950/30",
        badge: "bg-rose-900/40 text-rose-200 border-rose-600/50",
      },
      isFeatured: true,
      travelNote: "The Baraat celebration will take place in Karachi.",
      mapUrl: null,
    },
    {
      id: "walima",
      title: "Walima",
      tagline: "An Evening of Gratitude & Grace",
      dateString: "2029-09-13",
      displayDate: "13 September 2029",
      shortDescription:
        "Join us for an evening of gratitude, joy and togetherness as we celebrate this new beginning with our loved ones.",
      city: "Karachi, Pakistan",
      venue: null,
      venuePlaceholder: "Venue to be announced",
      time: null,
      timePlaceholder: "Time to be announced",
      dressCode: "Formal Evening Attire & Soft Pastels",
      themeColor: {
        accent: "#C58C91",
        border: "border-champagne/40",
        bg: "from-stone-900/50 via-rose-950/20 to-stone-950/60",
        badge: "bg-stone-800/60 text-stone-200 border-stone-600/40",
      },
      mapUrl: null,
    },
  ],
  letter: {
    heading: "A Note From Us",
    salutation: "To our beloved family and friends,",
    paragraphs: [
      "As we prepare to begin this beautiful chapter of our lives, we are grateful for the love, kindness and prayers that surround us.",
      "It would mean so much to have you with us as we celebrate these special moments. Your presence will make our wedding celebrations unforgettable.",
    ],
    signoff: "With love and gratitude,",
    signature: "Bilal & Maria",
  },
  rsvp: {
    heading: "We Would Be Honoured by Your Presence",
    subtitle: "Please let us know if you will be joining us in celebrating our special days.",
    isConfigured: false, // Set to true when real endpoint is wired
    destinationType: "demo",
    endpointUrl: "", // Couple can add Formspree or custom API url here
    contactPlaceholder: "Contact the couple directly or update config/wedding.ts with your RSVP endpoint.",
    previewNotice:
      "RSVP submission is currently in preview mode. Connect your preferred backend in config/wedding.ts.",
  },
  music: {
    title: "Him & I",
    artist: "G-Eazy & Halsey",
    audioSrc: "/audio/him-and-i.mp3",
    note: "Wedding celebration soundtrack.",
  },
  closing: {
    heading: "And So, Our Forever Begins",
    message: "Thank you for being part of our story. We look forward to celebrating these beautiful moments with you.",
    signature: "With love, Bilal & Maria",
  },
  seo: {
    title: "Bilal & Maria | Wedding Invitation",
    description:
      "Together with their families, Muhammad Bilal Rafique & Maria Jakhro joyfully invite you to celebrate their wedding in Karachi, Pakistan.",
    siteUrl: "https://bilalandmaria.wedding",
  },
  security: {
    isPasswordProtected: true,
    password: "ummah_kissy_huggy_cuddley",
    storageKey: "bilal_maria_wedding_auth",
  },
};
