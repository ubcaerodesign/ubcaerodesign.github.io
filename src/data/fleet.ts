export interface AircraftPlacements {
  overall?: string;
  flight?: string;
  designReport?: string;
  presentation?: string;
}

export interface AircraftMediaItem {
  url: string;
  type: 'image' | 'video';
  alt: string;
  filename: string;
}

export interface AircraftSubEntry {
  year: string;
  aircraftClass: string;
  result: string;
}

export interface AircraftEntry {
  /** Must match the folder name under `src/assets/aircraft/<id>/` */
  id: string;
  /** Full season label, e.g. '2025–2026' */
  year: string;
  /** Compact season label for the rail, e.g. '2025–26' */
  shortYear: string;
  name: string;
  /** Short tag for the rail, e.g. 'MCR' | 'ADV' | 'REG' | 'OPEN' */
  classCode: string;
  /** Full class name for the detail card */
  aircraftClass: string;
  summary: string;
  placements?: AircraftPlacements;
  /** Optional season-by-season breakdown for grouped eras */
  subEntries?: AircraftSubEntry[];
  /** Optional external media entries (e.g. hosted video URLs) appended after local folder files */
  extraMedia?: AircraftMediaItem[];
}

/**
 * Automatically discovers every photo and video inside `src/assets/aircraft/<id>/`.
 * Both lowercase and uppercase extensions are matched for Linux/GitHub Actions builds.
 */
const discoveredFiles = import.meta.glob<string>(
  '../assets/aircraft/*/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF,gif,GIF,mp4,MP4,webm,WEBM,mov,MOV}',
  { eager: true, import: 'default' }
);

const mediaByAircraftId: Record<string, AircraftMediaItem[]> = {};

for (const [path, url] of Object.entries(discoveredFiles)) {
  const match = path.match(/\/aircraft\/([^/]+)\/([^/]+)$/);
  if (!match) continue;

  const [, aircraftId, filename] = match;
  const isVideo = /\.(mp4|webm|mov)$/i.test(filename);
  const readableName = filename
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[-_\s]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim();

  if (!mediaByAircraftId[aircraftId]) {
    mediaByAircraftId[aircraftId] = [];
  }

  mediaByAircraftId[aircraftId].push({
    url,
    type: isVideo ? 'video' : 'image',
    alt: readableName || aircraftId,
    filename,
  });
}

for (const items of Object.values(mediaByAircraftId)) {
  items.sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: 'base' })
  );
}

export function getAircraftMedia(entry: AircraftEntry): AircraftMediaItem[] {
  return [...(mediaByAircraftId[entry.id] ?? []), ...(entry.extraMedia ?? [])];
}

/**
 * Full team aircraft archive (oldest -> newest) so scrubbing/clicking left travels back in time.
 * To add media for any aircraft below, place photos/videos in `src/assets/aircraft/<id>/`.
 */
export const AIRCRAFT_FLEET: AircraftEntry[] = [
  {
    id: 'dark-ages',
    year: '1991–2015',
    shortYear: '1991–15',
    name: 'Dark Ages',
    classCode: 'REG / OPEN',
    aircraftClass: 'Regular & Open Class',
    summary:
      'Our earliest archival era (1991–2015), spanning UBC Heavy Lift’s 1st-place overall victories in the 1990s through Regular and Open Class campaigns of the 2000s—including a Predator-drone-inspired Open Class entry (2001–02), an Open Class 1st-place overall win (2004–05), and the transition from gas to electric propulsion.',
    placements: {
      overall: '1st (×4)',
      designReport: '1st (1999–00)',
      presentation: '1st (2006–08)',
    },
    subEntries: [
      { year: '1991–92', aircraftClass: 'REG', result: '1st Overall' },
      { year: '1992–93', aircraftClass: 'REG', result: '1st Overall' },
      { year: '1995–96', aircraftClass: 'REG', result: '1st Overall' },
      { year: '1996–97', aircraftClass: 'REG', result: '6th Overall' },
      { year: '1997–98', aircraftClass: 'REG', result: '4th Overall' },
      { year: '1999–00', aircraftClass: 'REG', result: '3rd Overall · 1st Design Report' },
      { year: '2000–01', aircraftClass: 'REG', result: '7th Overall · 2nd Design Report' },
      { year: '2001–02', aircraftClass: 'REG', result: '7th Overall' },
      { year: '2001–02', aircraftClass: 'OPEN', result: '4th Overall (Predator-style airframe)' },
      { year: '2002–03', aircraftClass: 'REG', result: '4th Overall' },
      { year: '2002–03', aircraftClass: 'OPEN', result: '3rd Overall' },
      { year: '2003–04', aircraftClass: 'REG', result: '11th Overall' },
      { year: '2003–04', aircraftClass: 'OPEN', result: '3rd Overall' },
      { year: '2004–05', aircraftClass: 'REG', result: '9th Overall' },
      { year: '2004–05', aircraftClass: 'OPEN', result: '1st Overall' },
      { year: '2005–06', aircraftClass: 'REG', result: '12th Overall' },
      { year: '2005–06', aircraftClass: 'OPEN', result: '2nd Overall' },
      { year: '2006–07', aircraftClass: 'REG', result: '4th Overall · 1st Presentation' },
      { year: '2007–08', aircraftClass: 'REG', result: '4th Overall · 1st Presentation' },
      { year: '2008–09', aircraftClass: 'REG', result: '3rd Overall · 2nd Presentation' },
      { year: '2009–10', aircraftClass: 'REG', result: '5th Overall · 2nd Design Report' },
      { year: '2010–11', aircraftClass: 'REG', result: '8th Overall' },
      { year: '2011–12', aircraftClass: 'REG', result: '6th Overall' },
      { year: '2012–13', aircraftClass: 'REG', result: '8th Overall' },
      { year: '2013–14', aircraftClass: 'REG', result: '20th Overall' },
      { year: '2014–15', aircraftClass: 'REG', result: '22nd Overall (Gas-to-electric transition)' },
    ],
  },
  {
    id: '2015-2016-north-star',
    year: '2015–2016',
    shortYear: '2015–16',
    name: 'North Star',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2015–2016 Regular Class aircraft, earning 3rd place in Design Report.',
    placements: { overall: '11th', designReport: '3rd' },
  },
  {
    id: '2016-2017-black-jay',
    year: '2016–2017',
    shortYear: '2016–17',
    name: 'Black Jay',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2016–2017 Regular Class podium finisher — 1st in Design Report, 3rd in Flight, and 3rd overall.',
    placements: { overall: '3rd', flight: '3rd', designReport: '1st', presentation: '9th' },
  },
  {
    id: '2017-2018-reg',
    year: '2017–2018',
    shortYear: '2017–18',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2017–2018 Regular Class entry, placing 4th in Presentation.',
    placements: { overall: '11th', designReport: '7th', presentation: '4th' },
  },
  {
    id: '2018-2019-adv',
    year: '2018–2019',
    shortYear: '2018–19',
    name: 'First ADV Plane',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary: 'UBC AeroDesign’s first-ever Advanced Class aircraft, placing 2nd in Design Report and 5th overall.',
    placements: { overall: '5th', designReport: '2nd' },
  },
  {
    id: '2018-2019-reg',
    year: '2018–2019',
    shortYear: '2018–19',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2018–2019 Regular Class entry, placing 5th in Design Report.',
    placements: { overall: '14th', designReport: '5th' },
  },
  {
    id: '2019-2020-ray',
    year: '2019–2020',
    shortYear: '2019–20',
    name: 'Ray?',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary: '2019–2020 Advanced Class aircraft — 3rd overall and 3rd in Presentation (flights cancelled due to COVID-19).',
    placements: { overall: '3rd', flight: 'N/A (COVID)', presentation: '3rd' },
  },
  {
    id: '2019-2020-bye-plane',
    year: '2019–2020',
    shortYear: '2019–20',
    name: 'Bye-Plane',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2019–2020 Regular Class champion — sweeping 1st in Design Report, 1st in Presentation, and 1st overall.',
    placements: { overall: '1st', flight: 'N/A (COVID)', designReport: '1st', presentation: '1st' },
  },
  {
    id: '2020-2021-mantine',
    year: '2020–2021',
    shortYear: '2020–21',
    name: 'Mantine',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary: '2020–2021 Advanced Class aircraft, finishing 2nd in Presentation during the virtual COVID-19 season.',
    placements: { flight: 'N/A (COVID)', designReport: '9th', presentation: '2nd' },
  },
  {
    id: '2020-2021-wailord',
    year: '2020–2021',
    shortYear: '2020–21',
    name: 'Wailord',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2020–2021 Regular Class aircraft, capturing 1st place in Design Report during the virtual COVID-19 season.',
    placements: { flight: 'N/A (COVID)', designReport: '1st', presentation: '5th' },
  },
  {
    id: '2021-2022-kyogre',
    year: '2021–2022',
    shortYear: '2021–22',
    name: 'Kyogre',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary: '2021–2022 Advanced Class aircraft, finishing 5th overall.',
    placements: { overall: '5th', designReport: '6th', presentation: '9th' },
  },
  {
    id: '2021-2022-snorlax',
    year: '2021–2022',
    shortYear: '2021–22',
    name: 'Snorlax',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2021–2022 Regular Class aircraft — 2nd in Design Report and 2nd in Presentation.',
    placements: { overall: '10th', designReport: '2nd', presentation: '2nd' },
  },
  {
    id: '2022-2023-spirit',
    year: '2022–2023',
    shortYear: '2022–23',
    name: 'Spirit',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary: '2022–2023 Advanced Class aircraft — 1st place in Presentation and 7th overall.',
    placements: { overall: '7th', designReport: '6th', presentation: '1st' },
  },
  {
    id: '2022-2023-indomitable',
    year: '2022–2023',
    shortYear: '2022–23',
    name: 'Indomitable',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary:
      'Indomitable was likely the largest aircraft ever pursued by our team. With a massive 45 lb maximum takeoff weight and a 15.5 ft wingspan, it was a truly colossal aircraft. It carried a steel-plate payload of up to 15 lbs, and its structure was divided into 37" sections. Indomitable competed in SAE Aero Design East 2023, with an 8th-place overall finish.',
    placements: { overall: '8th', designReport: '5th', presentation: '6th' },
  },
  {
    id: '2023-2024-sonic',
    year: '2023–2024',
    shortYear: '2023–24',
    name: 'Sonic',
    classCode: 'MCR',
    aircraftClass: 'Micro Class',
    summary:
      'Sonic was the team’s first attempt at the Micro Class competition. This year coincided with the first year of a new ruleset that prioritized carrying water payload, minimizing empty weight, minimizing wingspan, and minimizing takeoff distance. The aircraft featured a blended-wing-body configuration with an inverted U-tail and a flexible payload. Sonic’s design was an ambitious entry to a novel competition, unfortunately leading to stability difficulties at SAE Aero Design West 2024. The lessons learned from Sonic’s design allowed the team to pursue further-optimized blended-wing designs in the future.',
    placements: { overall: '8th', designReport: '6th', presentation: '7th' },
  },
  {
    id: '2023-2024-shadow',
    year: '2023–2024',
    shortYear: '2023–24',
    name: 'Shadow',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary:
      'Shadow was the team’s entry to the Advanced Class 2024 SAE Aero Design competition, marking the end of the three-year rules cycle with low-risk, reliable primary and secondary delivery vehicles. Lifting 10 lbs of payload with a 120" blended-wing-body primary aircraft, a 22" flying-wing PADA, and a single-motor RWD GTV, Shadow looped the airfield to locate landing zones before releasing the PADA to navigate and land autonomously.',
    placements: { overall: '7th', designReport: '4th', presentation: '3rd' },
  },
  {
    id: '2024-2025-barbie',
    year: '2024–2025',
    shortYear: '2024–25',
    name: 'Barbie',
    classCode: 'MCR',
    aircraftClass: 'Micro Class',
    summary:
      'Barbie was the team’s second Micro aircraft. After Sonic’s risky design, Barbie returned to a much more conventional layout that proved instrumental to her excellent competition performance. Designed to be safe and tough to secure repeated flight scoring, she completed over 30 total flights—more than the cumulative sum of years of prior flying—earning 2nd overall and 1st place Design Report at SAE Aero Design East 2025, while her colour scheme made her a fan favourite.',
    placements: { overall: '2nd', flight: '5th', designReport: '1st', presentation: '8th' },
  },
  {
    id: '2024-2025-kuromi',
    year: '2024–2025',
    shortYear: '2024–25',
    name: 'Kuromi',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary:
      'Kuromi is UBC AeroDesign’s submission to the Advanced Class 2025 SAE Aero Design competition. As the first year of a new three-year rules cycle, the team focused on a low-risk, reliable payload release and capture aircraft with custom flight controller hardware and software for manual and autonomous flight. Featuring a 60" wingspan, conventional fuselage and tail, autonomous release, and manual capture, Kuromi served as a baseline for future avionics systems.',
    placements: { overall: '6th', flight: '5th', designReport: '5th', presentation: '10th' },
  },
  {
    id: '2025-2026-light-fury',
    year: '2025–2026',
    shortYear: '2025–26',
    name: 'Light Fury',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary:
      'Light Fury was the team’s second entry of the three-year ADV ruleset and our first time pursuing a Vertical Take-off and Landing (VTOL) aircraft. With a 45" wingspan, conventional fuselage, U-tail, tail-dragger gear, and a tri-motor tilt-wing/hover configuration, it uses custom in-house hardware and firmware with GNSS and camera localization for autonomous DLZ payload delivery and capture—securing 1st place in flight score and 2nd place overall.',
    placements: { overall: '2nd', flight: '1st', designReport: '10th', presentation: '8th' },
  },
  {
    id: '2025-2026-toothless',
    year: '2025–2026',
    shortYear: '2025–26',
    name: 'Toothless',
    classCode: 'MCR',
    aircraftClass: 'Micro Class',
    summary:
      'As the third and final aircraft in the team’s first Micro Class ruleset, Toothless was designed as the culmination of recent experiences in the Micro competition. Toothless featured a blended-wing-body design with a conventional tail, balancing superior weight optimization with improved controllability—achieving 1st place in Presentation, 2nd in Design Report, and 5th overall.',
    placements: { overall: '5th', flight: '5th', designReport: '2nd', presentation: '1st' },
  },
];