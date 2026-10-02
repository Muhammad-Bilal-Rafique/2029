# Bilal Rafique & Maria Jakhro — Digital Wedding Invitation Website

A bespoke, cinematic, and culturally authentic Pakistani digital wedding invitation website built with Next.js (App Router), React, TypeScript, Tailwind CSS, and Framer Motion.

Designed to evoke the tactile luxury of receiving and opening a high-end physical wedding invitation envelope, followed by an editorial, romantic celebration of love.

---

## 🌹 Wedding Details & Overview

* **Groom**: Muhammad Bilal Rafique (Lahore, Pakistan)
* **Bride**: Maria Jakhro (Karachi, Pakistan)
* **Wedding Events**:
  1. **Mehndi** — 11 September 2029 (Tuesday)
  2. **Baraat** — 12 September 2029 (Wednesday) · Karachi, Pakistan *(Central Wedding Day)*
  3. **Walima** — 13 September 2029 (Thursday)
* **Music Selection**: *"Him & I"* by G-Eazy & Halsey

---

## ✨ Features & Architecture

1. **Section 1: The Opening Experience (`OpeningEnvelope.tsx`)**
   - Full-screen layered paper envelope with a gold rim and antique wax seal featuring the **B & M** floral monogram.
   - Smooth 3D flap unfold, seal break animation, and emerging invitation card.
   - Includes a *"Skip to Invitation"* button for instant access.

2. **Section 2: Hero Invitation (`HeroInvitation.tsx`)**
   - High-contrast editorial typography featuring *Cormorant Garamond* and *Manrope*.
   - Architectural dual portrait frames for Bilal & Maria with graceful monogram fallbacks if photographs are not yet added.

3. **Section 3: A Personal Welcome (`WelcomeSection.tsx`)**
   - Sacred blessing and personal greeting editable via `src/config/wedding.ts`.
   - Delicate Jasmine (*Motia*) floral motifs and antique gold accents.

4. **Section 4: Our Wedding Celebrations (`WeddingEvents.tsx` & `EventCard.tsx`)**
   - Visual identity for all 3 days:
     - **Mehndi**: Golden & muted sage accents, henna/botanical filigree.
     - **Baraat**: Featured spotlight card with deep burgundy, antique gold, and regal Mughal arches.
     - **Walima**: Champagne gold, ivory, and soft rose reception styling.
   - Days of the week calculated programmatically.
   - Clear placeholders for unconfirmed venues and timings.

5. **Section 5: Countdown to Forever (`Countdown.tsx`)**
   - Real-time ticker targeting the Baraat on 12 September 2029 in `Asia/Karachi` time zone (PKT, UTC+5).
   - Timezone-aware calculation with no negative numbers and polite screen-reader accessibility.

6. **Section 6: Wedding Details & Itinerary (`WeddingDetails.tsx`)**
   - Structured schedule table with dress codes and venue placeholders.
   - Travel notice for the Baraat celebration taking place in Karachi.
   - Configurable Google Maps directions link (automatically displays once venue is provided).

7. **Section 7: A Note From Us (`PersonalLetter.tsx`)**
   - Vellum letter card with deckled gold edges, wax seal stamp, and interactive unfold/fold toggle.

8. **Section 8: RSVP Form (`RSVPSection.tsx`)**
   - Guest name, guest count (1-10), event-by-event attendance checkboxes, and optional warm wishes.
   - **Honest Preview Mode**: Transparently notifies guests that submission is in preview until a backend endpoint is connected, providing a preview modal and couple's direct contact placeholder.
   - Privacy-conscious with zero unnecessary personal data collection.

9. **Section 9: Music & Closing Experience (`ClosingSection.tsx` & `MusicPlayer.tsx`)**
   - Closing message of gratitude and *"Return to Top"* / *"Re-view Envelope"* buttons.
   - Integrated and floating audio player for *"Him & I"*.
   - **Zero Autoplay Policy**: Requires explicit user interaction to play.
   - Graceful fallback notice if the audio file has not yet been placed locally.

---

## 🛠️ Project Structure

```text
├── public/
│   ├── images/
│   │   ├── bilal.jpg         <-- Place Bilal's portrait here
│   │   ├── maria.jpg         <-- Place Maria's portrait here
│   │   └── README.txt
│   └── audio/
│       ├── him-and-i.mp3     <-- Place licensed song here
│       └── README.txt
├── src/
│   ├── app/
│   │   ├── globals.css       <-- Color tokens, gold foil gradients, paper textures
│   │   ├── layout.tsx        <-- Fonts (Cormorant, Manrope, Alex Brush) & SEO metadata
│   │   ├── not-found.tsx     <-- 404 error page matching theme
│   │   └── page.tsx          <-- Single-page invitation experience
│   ├── components/
│   │   ├── invitation/
│   │   │   ├── OpeningEnvelope.tsx
│   │   │   ├── HeroInvitation.tsx
│   │   │   ├── WelcomeSection.tsx
│   │   │   ├── WeddingEvents.tsx
│   │   │   ├── EventCard.tsx
│   │   │   ├── Countdown.tsx
│   │   │   ├── WeddingDetails.tsx
│   │   │   ├── PersonalLetter.tsx
│   │   │   ├── RSVPSection.tsx
│   │   │   ├── MusicPlayer.tsx
│   │   │   └── ClosingSection.tsx
│   │   ├── navigation/
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileNavigation.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── FloralDecoration.tsx
│   │       ├── OrnamentalDivider.tsx
│   │       ├── PortraitFrame.tsx
│   │       └── SectionHeading.tsx
│   ├── config/
│   │   └── wedding.ts        <-- Central source of truth for all wedding details
│   ├── hooks/
│   │   ├── useAudio.ts
│   │   ├── useCountdown.ts
│   │   └── useReducedMotionPreference.ts
│   └── lib/
│       ├── date-utils.ts
│       └── validation.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (version 18.18 or higher recommended)
* npm, pnpm, or yarn

### 2. Installation
Install the project dependencies:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📸 How to Add Local Photographs

The couple's portraits are served locally and are never uploaded to any third-party image hosting service.

1. **Bilal's Portrait**:
   - Save your portrait photograph as `bilal.jpg`.
   - Place it inside the `public/images/` directory:
     ```text
     public/images/bilal.jpg
     ```
   - Recommended resolution: 800×1000px (4:5 vertical portrait aspect ratio).

2. **Maria's Portrait**:
   - Save your portrait photograph as `maria.jpg`.
   - Place it inside the `public/images/` directory:
     ```text
     public/images/maria.jpg
     ```
   - Recommended resolution: 800×1000px (4:5 vertical portrait aspect ratio).

> **Graceful Fallback**: If either portrait is missing, the website will automatically display an architectural Mughal arch portrait card with the couple's gold monogram (**B** and **M**), maintaining the layout without broken image icons.

---

## 🎵 How to Add the Music Track

The selected song is **"Him & I" by G-Eazy & Halsey**.

1. Obtain your legally licensed audio file.
2. Save or convert it as an MP3 file named `him-and-i.mp3`.
3. Place the file inside the `public/audio/` directory:
   ```text
   public/audio/him-and-i.mp3
   ```
4. Once added, the floating music button (bottom right) and the closing section player will automatically enable playback upon click.

---

## 📝 Centralized Configuration (`src/config/wedding.ts`)

All wedding content, dates, venue details, and messages can be customized in **one single file**: `src/config/wedding.ts`.

### Updating Venues and Timings
When venues and timings are finalized, update the `events` array in `src/config/wedding.ts`:
```typescript
{
  id: "baraat",
  title: "Baraat",
  venue: "The Pearl Continental Grand Ballroom", // Replace null with your venue name
  time: "8:00 PM onwards",                      // Replace null with your confirmed timing
  mapUrl: "https://maps.google.com/?q=Pearl+Continental+Karachi", // Optional Google Maps link
  // ...
}
```

### Configuring Live RSVP Submissions
By default, the RSVP form runs in **Preview / Demo Mode** to respect user privacy and avoid sending data to unconfigured servers.

To connect a live destination (such as Formspree, a Google Sheet webhook, or your own custom API):
1. Open `src/config/wedding.ts`.
2. Update the `rsvp` configuration:
```typescript
rsvp: {
  heading: "We Would Be Honoured by Your Presence",
  subtitle: "Please let us know if you will be joining us in celebrating our special days.",
  isConfigured: true,                        // Set to true
  destinationType: 'formspree',              // 'formspree' | 'api' | 'email'
  endpointUrl: 'https://formspree.io/f/your_form_id', // Add your submission endpoint
  contactPlaceholder: '+92 300 1234567',
  previewNotice: '...'
}
```
The form will now securely POST the guest's RSVP response to your endpoint.

---

## 🔒 Password Protection

The wedding invitation is protected by a private security gate.

* **Current Passcode**: `ummah_kissy_huggy_cuddley`
* **How it works**:
  - Unauthenticated guests see the regal Private Invitation Access Gate before any wedding details or envelope can be viewed.
  - Guests enter the passcode (with show/hide visibility toggle).
  - Upon successful verification, the invitation unlocks smoothly and stores session authentication in `localStorage` and a secure cookie, so returning guests are not prompted repeatedly.
  - A discreet **Lock Invitation** button is provided in the navigation bar to re-lock the screen anytime.

### How to Change or Disable the Password
In `src/config/wedding.ts`:
```typescript
security: {
  isPasswordProtected: true, // Set to false to disable the password gate completely
  password: "ummah_kissy_huggy_cuddley", // Update with your preferred passcode
  storageKey: "bilal_maria_wedding_auth",
}
```

---

## 🌐 Deploying to Vercel

The website is optimized for instantaneous zero-configuration deployment on [Vercel](https://vercel.com/):

1. Push this repository to your GitHub, GitLab, or Bitbucket account:
   ```bash
   git init
   git add .
   git commit -m "Bilal & Maria Wedding Invitation"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your wedding invitation repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **"Deploy"**.
6. In less than 2 minutes, your wedding invitation website will be live with free global CDN and HTTPS!

---

## 🎨 Color Palette & Typography

| Color Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Warm Ivory** | `#F8F3EA` | Background canvas, stationery paper |
| **Deep Burgundy** | `#581D35` | Primary contrast, Baraat card, names |
| **Antique Gold** | `#C6A46A` | Borders, foil ornaments, divider filigree |
| **Soft Champagne** | `#E9DCC5` | Cards, buttons, subtle highlights |
| **Deep Plum** | `#30202D` | High-contrast typography & envelope body |
| **Muted Rose** | `#C58C91` | Accents, verse quotes, floral motifs |
| **Muted Sage** | `#8B9780` | Mehndi accents, botanical details |

**Typography**:
- **Titles & Names**: *Cormorant Garamond* (Google Fonts)
- **Body & Information**: *Manrope* (Google Fonts)
- **Calligraphic Details**: *Alex Brush* (Google Fonts)

---

*“With grateful hearts and the blessings of our families, we invite you to join us as we begin a beautiful new chapter together.”*
— **Bilal & Maria**
