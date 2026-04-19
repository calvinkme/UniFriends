import type { UserProfile } from "@/types";

export type ScoredProfile = UserProfile & { compatibilityScore: number };

/**
 * Degree families for partial matching.
 * Degrees in the same family get partial credit.
 */
const DEGREE_FAMILIES: Record<string, string[]> = {
  Computing: [
    "Computer Science", "Computer Science & AI", "Software Engineering", "Data Science",
    "Information Technology", "Computing", "Mathematics and Computer Science",
    "BA in Computer Science", "BSc Computer Science", "BEng/MEng Computing",
    "BSc Data Science",
  ],
  Engineering: [
    "Engineering", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering",
    "Engineering Science", "Aeronautical Engineering", "Chemical Engineering",
    "Biomedical Engineering", "Design Engineering", "Electrical and Electronic Engineering",
    "Materials Science and Engineering",
    "BA in Engineering Science", "BA in Engineering", "BEng/MEng Engineering",
    "BEng/MEng Aeronautical Engineering", "BEng/MEng Biomedical Engineering",
    "BEng/MEng Chemical Engineering", "BEng/MEng Civil Engineering",
    "BEng/MEng Electrical and Electronic Engineering", "BEng/MEng Mechanical Engineering",
    "BEng/MEng Materials Science and Engineering", "BEng/MEng Design Engineering",
    "BA in Chemical Engineering",
  ],
  Design: [
    "Design", "Architecture", "Architecture & Design", "Fine Arts", "Fine Arts & Curation",
    "Fine Art", "BA in Fine Art", "BA Fine Art", "BA Architecture",
  ],
  Health: [
    "Medicine", "Medicine & Health Sciences", "Psychology", "Biomedical Science",
    "Medicine (Preclinical)", "Psychological and Behavioural Sciences",
    "Psychological and Behavioural Science", "Life Sciences", "Neuroscience",
    "BA in Medicine (Preclinical)", "BA in Medicine", "MBBS Medicine",
    "BA in Psychology, Philosophy and Linguistics",
    "BSc Psychology", "BSc Neuroscience",
    "BA in Veterinary Medicine",
  ],
  Business: [
    "Economics", "Economics & Finance", "Commerce", "Business", "Accounting",
    "Economics and Management", "Finance", "Management", "Accounting and Finance",
    "Actuarial Science", "Land Economy",
    "BA in Economics and Management", "BSc Economics", "BSc Finance",
    "BSc Management", "BSc Accounting and Finance", "BSc Actuarial Science",
    "BSc Mathematics and Economics", "BSc Mathematics, Statistics and Business",
    "BA in Land Economy", "BA in Economics",
    "BSc Environmental Policy with Economics",
  ],
  Humanities: [
    "Law", "Legal Studies", "Philosophy", "History", "Political Science",
    "Jurisprudence", "Philosophy, Politics and Economics",
    "Human, Social, and Political Sciences", "International Relations",
    "Sociology", "Government", "Social Policy", "Anthropology", "Politics",
    "Philosophy, Logic and Scientific Method",
    "BA in Jurisprudence", "BA in Philosophy, Politics and Economics",
    "BA in History", "BA in Philosophy",
    "BA in Human, Social, and Political Sciences",
    "BSc Politics", "BSc International Relations", "BSc Government",
    "BSc Sociology", "BSc Social Policy", "BSc Anthropology",
    "BSc Philosophy, Logic and Scientific Method",
    "BSc History", "LLB Laws", "BA History",
    "BA in Archaeology and Anthropology",
  ],
  Science: [
    "Physics", "Chemistry", "Biology", "Mathematics",
    "Natural Sciences", "Biological Sciences", "Biochemistry",
    "Earth and Planetary Science", "Earth Sciences", "Materials Science",
    "BA in Natural Sciences", "BA in Biological Sciences", "BA in Physics",
    "BA in Chemistry", "BA in Biochemistry", "BA in Mathematics",
    "BA in Earth Sciences", "BA in Materials Science",
    "BSc Mathematics", "BSc Physics", "BSc Chemistry",
    "BSc Life Sciences", "BSc Biochemistry", "BSc Biotechnology",
    "BSc Earth and Planetary Science", "BSc Natural Sciences",
    "BSc Statistical Science", "BSc Statistics",
    "BA in Human Sciences",
  ],
  Languages: [
    "Modern Languages", "Modern and Medieval Languages", "Classics",
    "English Language and Literature", "English", "Linguistics",
    "BA in Modern Languages", "BA in Modern and Medieval Languages",
    "BA in Classics", "BA in English Language and Literature",
    "BA in English", "BA English", "BA Linguistics", "BA in Linguistics",
    "BA in Oriental Studies", "BA in Asian and Middle Eastern Studies",
    "BA Modern Languages",
  ],
};

function normalize(values: string[] | undefined): string[] {
  return (values ?? []).map((value) => value.toLowerCase());
}

function getDegreeFamilies(degree: string): string[] {
  const families: string[] = [];
  for (const [family, degrees] of Object.entries(DEGREE_FAMILIES)) {
    if (degrees.some((value) => value.toLowerCase() === degree.toLowerCase())) {
      families.push(family);
    }
  }
  return families;
}

function countOverlap(left: string[] | undefined, right: string[] | undefined): number {
  const rightSet = new Set(normalize(right));
  return normalize(left).filter((value) => rightSet.has(value)).length;
}

export function computeCompatibilityScore(
  currentUser: UserProfile,
  candidate: UserProfile,
): number {
  let score = 0;

  // University match (max 30) — highest priority, but not a gate
  if (currentUser.university.toLowerCase() === candidate.university.toLowerCase()) {
    score += 40;
  }

  const sharedMajors = countOverlap(currentUser.majors, candidate.majors);
  score += Math.min(25, sharedMajors * 12);

  const sharedCourses = countOverlap(currentUser.activeCourses, candidate.activeCourses);
  score += Math.min(15, sharedCourses * 5);

  // Degree match (max 10)
  if (currentUser.degree.toLowerCase() === candidate.degree.toLowerCase()) {
    score += 10;
  } else {
    const currentFamilies = getDegreeFamilies(currentUser.degree);
    const candidateFamilies = getDegreeFamilies(candidate.degree);
    if (currentFamilies.some((family) => candidateFamilies.includes(family))) {
      score += 5;
    }
  }

  // Interests overlap (max 25) — Jaccard-style
  const sharedInterests = countOverlap(currentUser.interests, candidate.interests);
  score += Math.min(10, sharedInterests * 3);

  // Academic year proximity (max 10)
  const yearDiff = Math.abs(currentUser.academicYear - candidate.academicYear);
  score += Math.max(0, 5 - yearDiff * 2);

  return Math.min(100, score);
}

/**
 * Rank all profiles by compatibility — includes everyone, sorted by score.
 * Used by the Main feed (no filtering, algorithm-only).
 */
export function rankAllProfiles(
  currentUser: UserProfile,
  candidates: UserProfile[],
): ScoredProfile[] {
  return candidates
    .filter((candidate) => candidate.id !== currentUser.id)
    .map((candidate) => ({
      ...candidate,
      compatibilityScore: computeCompatibilityScore(currentUser, candidate),
    }))
    .sort((left, right) => right.compatibilityScore - left.compatibilityScore);
}

/**
 * Rank profiles with a minimum score threshold.
 * Used by Discovery (filtered browsing).
 */
export function rankProfiles(
  currentUser: UserProfile,
  candidates: UserProfile[],
): ScoredProfile[] {
  return rankAllProfiles(currentUser, candidates).filter((profile) => profile.compatibilityScore > 0);
}
