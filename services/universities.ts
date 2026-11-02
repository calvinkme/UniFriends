import { UNIVERSITIES_DATA } from "@/constants/degrees";

type HipolabsUniversity = {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
  alpha_two_code: string;
};

// Universities that have full degree/major data in the app.
const IN_SYSTEM_NAMES = Object.keys(UNIVERSITIES_DATA);
const IN_SYSTEM_LOWER = new Set(IN_SYSTEM_NAMES.map((n) => n.toLowerCase()));

/** True if the university has curated degree/major data in the app. */
export function isInSystemUniversity(name: string): boolean {
  return IN_SYSTEM_LOWER.has(name.trim().toLowerCase());
}

const COUNTRY_MAP: Record<string, string> = {
  AU: "australia",
  US: "united states",
  UK: "united kingdom",
};

const cache: Record<string, HipolabsUniversity[]> = {};

// Fallback universities if API fails
const FALLBACK_UNIVERSITIES: Record<string, string[]> = {
  AU: [
    "University of Melbourne",
    "University of Sydney",
    "Australian National University",
    "University of Queensland",
    "Monash University",
    "UNSW Sydney",
    "University of Western Australia",
    "University of Adelaide",
    "Macquarie University",
    "RMIT University",
    "University of Technology Sydney",
    "Deakin University",
    "Griffith University",
    "La Trobe University",
    "Curtin University",
    "Swinburne University of Technology",
    "University of Wollongong",
    "Queensland University of Technology",
    "University of Newcastle",
    "University of Tasmania",
  ],
  US: [
    "Harvard University",
    "Stanford University",
    "Massachusetts Institute of Technology",
    "Yale University",
    "Princeton University",
    "Columbia University",
    "University of Chicago",
    "University of Pennsylvania",
    "California Institute of Technology",
    "Duke University",
    "Northwestern University",
    "Johns Hopkins University",
    "Cornell University",
    "University of Michigan",
    "University of California, Berkeley",
    "University of California, Los Angeles",
    "New York University",
    "Carnegie Mellon University",
    "University of Virginia",
    "Georgia Institute of Technology",
  ],
  UK: [
    "University of Oxford",
    "University of Cambridge",
    "Imperial College London",
    "University College London",
    "London School of Economics and Political Science",
    "University of Edinburgh",
    "King's College London",
    "University of Manchester",
    "University of Bristol",
    "University of Warwick",
    "University of Glasgow",
    "University of Birmingham",
    "University of Sheffield",
    "University of Leeds",
    "University of Nottingham",
    "University of Southampton",
    "University of Liverpool",
    "University of Exeter",
    "University of York",
    "Durham University",
  ],
};

async function fetchCountryUniversities(countryCode: string): Promise<HipolabsUniversity[]> {
  const countryName = COUNTRY_MAP[countryCode];
  if (!countryName) return [];

  if (cache[countryCode]) return cache[countryCode];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      `https://universities.hipolabs.com/search?country=${encodeURIComponent(countryName)}`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    const data: HipolabsUniversity[] = await response.json();
    cache[countryCode] = data;
    return data;
  } catch {
    // API failed — return fallback as HipolabsUniversity-shaped objects
    const fallback = FALLBACK_UNIVERSITIES[countryCode] ?? [];
    const shaped = fallback.map((name) => ({
      name,
      country: countryName,
      domains: [],
      web_pages: [],
      alpha_two_code: countryCode,
    }));
    cache[countryCode] = shaped;
    return shaped;
  }
}

export async function searchUniversities(query: string): Promise<string[]> {
  if (query.length < 2) return [];

  // Search Australian, UK, and US universities in parallel
  const [auUniversities, ukUniversities, usUniversities] = await Promise.all([
    fetchCountryUniversities("AU"),
    fetchCountryUniversities("UK"),
    fetchCountryUniversities("US"),
  ]);

  const lowerQuery = query.toLowerCase();

  // Start with in-system universities so they can always be found by name,
  // even if the external API names them differently or omits them.
  const combined = [
    ...IN_SYSTEM_NAMES.map((name) => ({ name })),
    ...auUniversities,
    ...ukUniversities,
    ...usUniversities,
  ];

  // Deduplicate by lowercase name and filter by query
  const seen = new Set<string>();
  const matches = combined.filter((u) => {
    const lower = u.name.toLowerCase();
    if (seen.has(lower)) return false;
    seen.add(lower);
    return lower.includes(lowerQuery);
  });

  // Prioritise universities that have curated degree/major data in the app
  return matches
    .sort((a, b) => {
      const aIn = isInSystemUniversity(a.name) ? 0 : 1;
      const bIn = isInSystemUniversity(b.name) ? 0 : 1;
      if (aIn !== bIn) return aIn - bIn;
      return a.name.localeCompare(b.name);
    })
    .map((u) => u.name)
    .slice(0, 20);
}

export function getCountryCodes(): string[] {
  return Object.keys(COUNTRY_MAP);
}
