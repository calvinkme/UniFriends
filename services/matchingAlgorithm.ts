import type { UserProfile } from "@/types";

export type ScoredProfile = UserProfile & { compatibilityScore: number };

const DEGREE_FAMILIES: Record<string, string[]> = {
  Computing: [
    "Computer Science", "Computer Science & AI", "Software Engineering", "Data Science",
    "Information Technology", "Computing", "Mathematics and Computer Science",
    "Bachelor of Advanced Computing", "Bachelor of Computer Science",
    "Bachelor of Information Technology", "Bachelor of Data Science and Decisions",
    "Bachelor of Data Science", "Bachelor of Cyber Security",
    "Bachelor of Advanced Computer Science (Honours)",
    "Bachelor of Software Engineering (Honours)", "Bachelor of Software Engineering (Professional)",
    "BA in Computer Science", "BSc Computer Science", "BEng/MEng Computing",
    "BSc Data Science", "BSc Mathematics and Computer Science",
  ],
  Engineering: [
    "Engineering", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering",
    "Engineering Science", "Aeronautical Engineering", "Chemical Engineering",
    "Biomedical Engineering", "Design Engineering", "Electrical and Electronic Engineering",
    "Materials Science and Engineering",
    "Bachelor of Engineering Honours", "Bachelor of Engineering (Honours)",
    "Bachelor of Engineering (Honours) (Flexible First Year)",
    "BA in Engineering Science", "BA in Engineering", "BEng/MEng Engineering",
    "BEng/MEng Aeronautical Engineering", "BEng/MEng Biomedical Engineering",
    "BEng/MEng Chemical Engineering", "BEng/MEng Civil Engineering",
    "BEng/MEng Electrical and Electronic Engineering", "BEng/MEng Mechanical Engineering",
    "BEng/MEng Materials Science and Engineering", "BEng/MEng Design Engineering",
    "BA in Chemical Engineering",
  ],
  Design: [
    "Design", "Architecture", "Architecture & Design", "Fine Arts", "Fine Arts & Curation",
    "Fine Art", "Bachelor of Design", "Bachelor of Visual Arts",
    "Bachelor of Graphic Design", "Bachelor of Fine Arts",
    "BA in Fine Art", "BA Fine Art", "BA Architecture",
  ],
  Health: [
    "Medicine", "Medicine & Health Sciences", "Psychology", "Biomedical Science",
    "Medicine (Preclinical)", "Psychological and Behavioural Sciences",
    "Life Sciences", "Neuroscience",
    "Bachelor of Psychology", "Bachelor of Biomedicine", "Bachelor of Health Sciences",
    "Bachelor of Nursing", "Bachelor of Medical Science", "Bachelor of Biomedical Science",
    "Bachelor of Biomedical and Health Sciences", "Bachelor of Medical Science (Honours)",
    "BA in Medicine (Preclinical)", "BA in Medicine", "MBBS Medicine",
    "BA in Psychology, Philosophy and Linguistics",
    "BSc Psychology", "BSc Neuroscience", "BA in Veterinary Medicine",
  ],
  Business: [
    "Economics", "Economics & Finance", "Commerce", "Business", "Accounting",
    "Economics and Management", "Finance", "Management", "Accounting and Finance",
    "Actuarial Science", "Land Economy",
    "Bachelor of Commerce", "Bachelor of Business", "Bachelor of Economics",
    "Bachelor of Business Management", "Bachelor of Actuarial Studies",
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
    "Bachelor of Arts", "Bachelor of Laws (Honours)", "Bachelor of International Studies",
    "Bachelor of Social Work", "Bachelor of Criminology and Criminal Justice",
    "BA in Jurisprudence", "BA in Philosophy, Politics and Economics",
    "BA in History", "BA in Philosophy",
    "BA in Human, Social, and Political Sciences",
    "BSc Politics", "BSc International Relations", "BSc Government",
    "BSc Sociology", "BSc Social Policy", "BSc Anthropology",
    "LLB Laws", "BA History", "BA in Archaeology and Anthropology",
  ],
  Science: [
    "Physics", "Chemistry", "Biology", "Mathematics",
    "Natural Sciences", "Biological Sciences", "Biochemistry",
    "Earth and Planetary Science", "Earth Sciences", "Materials Science",
    "Bachelor of Science", "Bachelor of Science (Honours)", "Bachelor of Science (Extended)",
    "Bachelor of Science (Advanced) (Honours)", "Bachelor of Advanced Science (Honours)",
    "Bachelor of Mathematical Sciences", "Bachelor of Mathematics",
    "BA in Natural Sciences", "BA in Biological Sciences", "BA in Physics",
    "BA in Chemistry", "BA in Biochemistry", "BA in Mathematics",
    "BA in Earth Sciences", "BA in Materials Science",
    "BSc Mathematics", "BSc Physics", "BSc Chemistry",
    "BSc Life Sciences", "BSc Biochemistry", "BSc Biotechnology",
    "BSc Earth and Planetary Science", "BSc Natural Sciences",
    "BSc Statistical Science", "BSc Statistics", "BA in Human Sciences",
  ],
  Languages: [
    "Modern Languages", "Modern and Medieval Languages", "Classics",
    "English Language and Literature", "English", "Linguistics",
    "Bachelor of Languages", "Bachelor of Media and Communications",
    "BA in Modern Languages", "BA in Modern and Medieval Languages",
    "BA in Classics", "BA in English Language and Literature",
    "BA in English", "BA English", "BA Linguistics", "BA in Linguistics",
    "BA in Oriental Studies", "BA in Asian and Middle Eastern Studies",
    "BA Modern Languages",
  ],
};

const MAJOR_FAMILIES: Record<string, string[]> = {
  Computing: [
    "Computer Science", "Data Science", "Software Engineering",
    "Artificial Intelligence", "Software Systems", "Cyber Security",
    "Cybersecurity", "Information Technology", "Machine Learning",
    "Game Development", "Information Systems", "Human-Computer Interaction",
    "Computing and Software Systems", "Data Analytics", "Web Development",
    "Mobile App Development", "Cloud Computing", "Database Systems",
    "Software Development", "Computational Science",
  ],
  Mathematics: [
    "Mathematics", "Applied Mathematics", "Pure Mathematics", "Statistics",
    "Computational Mathematics", "Financial Mathematics", "Mathematical Statistics",
    "Mathematics and Statistics", "Statistical Science", "Data Science",
    "Actuarial Science", "Actuarial Studies", "Econometrics",
  ],
  Physics: [
    "Physics", "Astrophysics", "Theoretical Physics", "Applied Physics",
    "Mathematical Physics", "Quantum Computing", "Space Science",
  ],
  Biology: [
    "Biology", "Biochemistry", "Biomedical Science", "Genetics",
    "Microbiology", "Neuroscience", "Cell Biology", "Molecular Biology",
    "Ecology", "Zoology", "Botany", "Physiology", "Immunology",
    "Pathology", "Pharmacology", "Marine Biology", "Biotechnology",
  ],
  Engineering: [
    "Mechanical Engineering", "Civil Engineering", "Electrical Engineering",
    "Chemical Engineering", "Biomedical Engineering", "Environmental Engineering",
    "Aerospace Engineering", "Aeronautical Engineering", "Mechatronic Engineering",
    "Robotics", "Materials Engineering", "Structural Engineering",
    "Space Engineering", "Software Engineering",
  ],
  Business: [
    "Accounting", "Finance", "Marketing", "Business Management", "Management",
    "Human Resources", "International Business", "Business Analytics",
    "Economics", "Microeconomics", "Macroeconomics", "Taxation",
  ],
  Health: [
    "Clinical Medicine", "Public Health", "Nursing", "Physiotherapy",
    "Occupational Therapy", "Psychology", "Cognitive Psychology",
    "Clinical Psychology", "Health Promotion", "Developmental Psychology",
    "Social Psychology", "Health Psychology",
  ],
  Design: [
    "Graphic Design", "Interaction Design", "Visual Communication",
    "Product Design", "Architecture", "Fashion Design", "Industrial Design",
    "Painting", "Sculpture", "Contemporary Art", "Photography",
    "Digital Art", "Digital Design", "Landscape Architecture",
  ],
  Humanities: [
    "English", "History", "Philosophy", "Sociology", "Political Science",
    "Linguistics", "Classics", "Music", "Creative Writing",
    "Cultural Studies", "Gender Studies", "Art History", "Anthropology",
    "International Relations", "Archaeology",
  ],
  Law: [
    "Commercial Law", "Constitutional Law", "Criminal Law", "International Law",
    "Corporate Law", "Environmental Law", "Intellectual Property Law",
    "Legal Studies", "Human Rights", "Employment Law",
  ],
};

function normalize(values: string[] | undefined): string[] {
  return (values ?? []).map((value) => value.toLowerCase());
}

export function getDegreeFamilies(degree: string): string[] {
  const families: string[] = [];
  for (const [family, degrees] of Object.entries(DEGREE_FAMILIES)) {
    if (degrees.some((value) => value.toLowerCase() === degree.toLowerCase())) {
      families.push(family);
    }
  }
  return families;
}

function getMajorFamilies(major: string): string[] {
  const families: string[] = [];
  for (const [family, majors] of Object.entries(MAJOR_FAMILIES)) {
    if (majors.some((m) => m.toLowerCase() === major.toLowerCase())) {
      families.push(family);
    }
  }
  return families;
}

function countOverlap(left: string[] | undefined, right: string[] | undefined): number {
  const rightSet = new Set(normalize(right));
  return normalize(left).filter((value) => rightSet.has(value)).length;
}

function countMajorFamilyOverlap(left: string[] | undefined, right: string[] | undefined): number {
  const leftFamilies = new Set((left ?? []).flatMap((m) => getMajorFamilies(m)));
  const rightFamilies = new Set((right ?? []).flatMap((m) => getMajorFamilies(m)));
  let count = 0;
  for (const family of leftFamilies) {
    if (rightFamilies.has(family)) count++;
  }
  return count;
}

export function computeCompatibilityScore(
  currentUser: UserProfile,
  candidate: UserProfile,
): number {
  let score = 0;

  // University match (40 pts) — highest priority
  if (currentUser.university.toLowerCase() === candidate.university.toLowerCase()) {
    score += 40;
  }

  // Degree match (max 15) — exact or family
  if (currentUser.degree.toLowerCase() === candidate.degree.toLowerCase()) {
    score += 15;
  } else {
    const currentFamilies = getDegreeFamilies(currentUser.degree);
    const candidateFamilies = getDegreeFamilies(candidate.degree);
    if (currentFamilies.some((family) => candidateFamilies.includes(family))) {
      score += 8;
    }
  }

  // Major match (max 30) — exact overlap + family-level overlap
  const exactMajors = countOverlap(currentUser.majors, candidate.majors);
  const familyOverlap = countMajorFamilyOverlap(currentUser.majors, candidate.majors);
  const familyOnlyOverlap = Math.max(0, familyOverlap - exactMajors);
  score += Math.min(30, exactMajors * 14 + familyOnlyOverlap * 7);

  // Course overlap (max 8)
  const sharedCourses = countOverlap(currentUser.activeCourses, candidate.activeCourses);
  score += Math.min(8, sharedCourses * 4);

  // Interests overlap (max 5)
  const sharedInterests = countOverlap(currentUser.interests, candidate.interests);
  score += Math.min(5, sharedInterests * 2);

  // Academic year proximity (max 2)
  const yearDiff = Math.abs(currentUser.academicYear - candidate.academicYear);
  score += Math.max(0, 2 - yearDiff);

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

export function selectTopCompatibleMembers(
  currentUser: UserProfile,
  candidates: UserProfile[],
  count: number,
): ScoredProfile[] {
  return rankAllProfiles(currentUser, candidates).slice(0, count);
}

const UNIVERSITY_SHORT_NAMES: Record<string, string> = {
  "University of Melbourne": "UniMelb",
  "Monash University": "Monash",
  "RMIT University": "RMIT",
  "University of Sydney": "USyd",
  "University of Technology Sydney": "UTS",
  "University of Queensland": "UQ",
  "University of Western Australia": "UWA",
  "University of Adelaide": "Adelaide",
  "University of Oxford": "Oxford",
  "University of Cambridge": "Cambridge",
};

function getShortUniversityName(university: string): string {
  return UNIVERSITY_SHORT_NAMES[university] ?? university.split(" ").pop() ?? "Uni";
}

export function generateGroupName(
  currentUser: UserProfile,
  members: UserProfile[],
  existingGroupNames: string[],
): string {
  const allMembers = [currentUser, ...members];

  const uniCounts = new Map<string, number>();
  for (const m of allMembers) {
    uniCounts.set(m.university, (uniCounts.get(m.university) ?? 0) + 1);
  }
  const [topUni, topUniCount] = [...uniCounts.entries()].sort((a, b) => b[1] - a[1])[0];

  const familyCounts = new Map<string, number>();
  for (const m of allMembers) {
    for (const family of getDegreeFamilies(m.degree)) {
      familyCounts.set(family, (familyCounts.get(family) ?? 0) + 1);
    }
  }
  const topFamily = [...familyCounts.entries()].sort((a, b) => b[1] - a[1])[0];

  let baseName = "Study Group";

  if (topUniCount >= allMembers.length * 0.5) {
    const uniShort = getShortUniversityName(topUni);
    if (topFamily && topFamily[1] >= allMembers.length * 0.5) {
      baseName = `${uniShort} ${topFamily[0]} Group`;
    } else {
      baseName = `${uniShort} Study Group`;
    }
  } else if (topFamily && topFamily[1] >= allMembers.length * 0.5) {
    baseName = `${topFamily[0]} Study Group`;
  }

  const nameSet = new Set(existingGroupNames);
  if (!nameSet.has(baseName)) return baseName;

  let counter = 2;
  while (nameSet.has(`${baseName} ${counter}`)) counter++;
  return `${baseName} ${counter}`;
}
