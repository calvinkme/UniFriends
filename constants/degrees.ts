// Fallback flat list for non-searchable contexts
export const DEGREES = [
  "Accounting",
  "Actuarial Science",
  "Aerospace Engineering",
  "Artificial Intelligence",
  "Biochemistry",
  "Biology",
  "Biomedical Engineering",
  "Business Administration",
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Computer Science",
  "Cybersecurity",
  "Data Science",
  "Economics",
  "Electrical Engineering",
  "English Literature",
  "Environmental Science",
  "Finance",
  "History",
  "Information Technology",
  "International Relations",
  "Marketing",
  "Mathematics",
  "Mechanical Engineering",
  "Neuroscience",
  "Philosophy",
  "Physics",
  "Political Science",
  "Psychology",
  "Sociology",
  "Software Engineering",
] as const;

export type Degree = (typeof DEGREES)[number];

// University-specific degree and major data
export type DegreeMajor = {
  degree: string;
  majors?: string[];
};

export const UNIVERSITIES_DATA: Record<string, DegreeMajor[]> = {
  "University of Sydney": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Computer Science",
        "Data Science",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Neuroscience",
        "Biochemistry",
        "Genetics",
        "Microbiology",
        "Physiology",
        "Pharmacology",
        "Molecular Biology",
        "Ecology",
        "Botany",
        "Zoology",
        "Geophysics",
        "Geology",
        "Statistics",
        "Applied Mathematics",
      ],
    },
    {
      degree: "Bachelor of Science (Honours)",
      majors: [
        "Computer Science",
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics",
        "Neuroscience",
      ],
    },
    {
      degree: "Bachelor of Science (Extended)",
      majors: [
        "Computer Science",
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics",
      ],
    },
    {
      degree: "Bachelor of Mathematical Sciences",
      majors: [
        "Pure Mathematics",
        "Applied Mathematics",
        "Computational Mathematics",
        "Statistics",
        "Financial Mathematics",
      ],
    },
    {
      degree: "Bachelor of Mathematical Sciences (Honours)",
      majors: [
        "Pure Mathematics",
        "Applied Mathematics",
        "Statistics",
      ],
    },
    {
      degree: "Bachelor of Psychology",
      majors: [
        "Cognitive Psychology",
        "Clinical Psychology",
        "Developmental Psychology",
        "Health Psychology",
        "Educational Psychology",
        "Social Psychology",
      ],
    },
    {
      degree: "Bachelor of Psychology (Honours)",
      majors: [
        "Cognitive Psychology",
        "Clinical Psychology",
        "Developmental Psychology",
      ],
    },
    {
      degree: "Bachelor of Agricultural Science",
      majors: [
        "Crop Science",
        "Animal Science",
        "Soil Science",
        "Plant Breeding",
        "Sustainable Agriculture",
      ],
    },
    {
      degree: "Bachelor of Agricultural Science (Honours)",
      majors: [
        "Crop Science",
        "Animal Science",
        "Sustainable Agriculture",
      ],
    },
    {
      degree: "Bachelor of Animal and Veterinary Bioscience",
      majors: [
        "Veterinary Science",
        "Animal Nutrition",
        "Equine Science",
        "Exotic Animal Science",
      ],
    },
    {
      degree: "Bachelor of Animal and Veterinary Bioscience (Honours)",
      majors: [
        "Veterinary Science",
        "Animal Nutrition",
      ],
    },
    {
      degree: "Bachelor of Wildlife Conservation (Taronga)",
      majors: [
        "Conservation Biology",
        "Wildlife Management",
        "Ecology",
        "Animal Behaviour",
      ],
    },
    {
      degree: "Bachelor of Wildlife Conservation (Taronga) (Honours)",
      majors: [
        "Conservation Biology",
        "Wildlife Management",
      ],
    },
    {
      degree: "Bachelor of Liberal Arts and Science",
      majors: [
        "Interdisciplinary Studies",
        "Science and Humanities",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "English",
        "History",
        "Philosophy",
        "Sociology",
        "Political Science",
        "Linguistics",
        "Classics",
        "Music",
        "Indigenous Studies",
        "Asian Studies",
        "American Studies",
        "Gender Studies",
        "Cultural Studies",
        "Religion",
        "Art History",
        "Archaeology",
      ],
    },
    {
      degree: "Bachelor of Arts (Honours)",
      majors: [
        "English",
        "History",
        "Philosophy",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Economics",
      majors: [
        "Econometrics",
        "Microeconomics",
        "Macroeconomics",
        "Labour Economics",
        "Environmental Economics",
        "Financial Economics",
      ],
    },
    {
      degree: "Bachelor of Economics (Honours)",
      majors: [
        "Econometrics",
        "Microeconomics",
        "Macroeconomics",
      ],
    },
    {
      degree: "Bachelor of International Studies",
      majors: [
        "International Relations",
        "Global Politics",
        "International Law",
        "Development Studies",
        "International Business",
      ],
    },
    {
      degree: "Bachelor of International Studies (Honours)",
      majors: [
        "International Relations",
        "Global Politics",
      ],
    },
    {
      degree: "Bachelor of Languages",
      majors: [
        "French",
        "German",
        "Spanish",
        "Chinese",
        "Japanese",
        "Italian",
        "Russian",
      ],
    },
    {
      degree: "Bachelor of Languages (Honours)",
      majors: [
        "French",
        "Spanish",
        "Chinese",
        "Japanese",
      ],
    },
    {
      degree: "Bachelor of Media and Communications",
      majors: [
        "Journalism",
        "Public Relations",
        "Advertising",
        "Digital Media",
        "Media Production",
        "Broadcasting",
      ],
    },
    {
      degree: "Bachelor of Media and Communications (Honours)",
      majors: [
        "Journalism",
        "Public Relations",
        "Digital Media",
      ],
    },
    {
      degree: "Bachelor of Politics, Philosophy, and Economics",
      majors: [
        "Political Theory",
        "Political Philosophy",
        "Economic Philosophy",
        "Public Policy",
      ],
    },
    {
      degree: "Bachelor of Politics, Philosophy, and Economics (Honours)",
      majors: [
        "Political Theory",
        "Economic Philosophy",
      ],
    },
    {
      degree: "Bachelor of Social Work",
      majors: [
        "Community Services",
        "Child and Family Services",
        "Mental Health",
        "Social Policy",
      ],
    },
    {
      degree: "Bachelor of Visual Arts",
      majors: [
        "Painting",
        "Sculpture",
        "Printmaking",
        "Digital Art",
        "Contemporary Art",
        "Photography",
      ],
    },
    {
      degree: "Bachelor of Visual Arts (Honours)",
      majors: [
        "Contemporary Art",
        "Digital Art",
      ],
    },
    {
      degree: "Bachelor of Education (Early Childhood)",
      majors: [
        "Early Childhood Studies",
        "Child Development",
      ],
    },
    {
      degree: "Bachelor of Education (Primary)",
      majors: [
        "English Education",
        "Mathematics Education",
        "Science Education",
        "Humanities Education",
      ],
    },
    {
      degree: "Bachelor of Education (Secondary)",
      majors: [
        "English Education",
        "Mathematics Education",
        "Science Education",
        "History Education",
        "Modern Languages Education",
      ],
    },
    {
      degree: "Bachelor of Education (Health and Physical Education)",
      majors: [
        "Sports Science",
        "Health Promotion",
        "Physical Education",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Finance",
        "Business Management",
        "Marketing",
        "Economics",
        "Human Resources",
        "Information Systems",
        "Business Law",
        "International Business",
        "Taxation",
      ],
    },
    {
      degree: "Bachelor of Engineering Honours",
      majors: [
        "Aeronautical Engineering",
        "Chemical and Biomolecular Engineering",
        "Civil Engineering",
        "Electrical Engineering",
        "Environmental Engineering",
        "Mechanical Engineering",
        "Mechatronic Engineering",
        "Software Engineering",
        "Space Engineering",
        "Biomedical Engineering",
      ],
    },
    {
      degree: "Bachelor of Engineering Honours (Flexible First Year)",
      majors: [
        "Aeronautical Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Mechatronic Engineering",
      ],
    },
    {
      degree: "Bachelor of Advanced Computing",
      majors: [
        "Artificial Intelligence",
        "Software Systems",
        "Data Science",
        "Cyber Security",
      ],
    },
    {
      degree: "Bachelor of Project Management",
      majors: [
        "Engineering Project Management",
        "Construction Management",
        "IT Project Management",
      ],
    },
    {
      degree: "Bachelor of Laws (Honours)",
      majors: [
        "Commercial Law",
        "Constitutional Law",
        "Criminal Law",
        "International Law",
        "Corporate Law",
        "Property Law",
        "Administrative Law",
        "Family Law",
        "Employment Law",
      ],
    },
    // Double/Combined Degrees
    {
      degree: "Bachelor of Science and Bachelor of Arts",
      majors: [
        "STEM with Arts",
        "Physics and Philosophy",
        "Chemistry and History",
        "Biology and Psychology",
      ],
    },
    {
      degree: "Bachelor of Science and Bachelor of Laws",
      majors: [
        "Science with Law",
      ],
    },
    {
      degree: "Bachelor of Commerce and Bachelor of Arts",
      majors: [
        "Commerce with Arts",
      ],
    },
    {
      degree: "Bachelor of Engineering Honours and Bachelor of Arts",
      majors: [
        "Engineering with Arts",
      ],
    },
    {
      degree: "Bachelor of Engineering Honours and Bachelor of Science",
      majors: [
        "Engineering with Science",
      ],
    },
    {
      degree: "Bachelor of Economics and Bachelor of Arts",
      majors: [
        "Economics with Arts",
      ],
    },
    {
      degree: "Bachelor of Arts and Bachelor of Laws",
      majors: [
        "Arts with Law",
      ],
    },
    {
      degree: "Bachelor of Health Science",
      majors: [
        "Public Health",
        "Health Promotion",
        "Allied Health",
        "Health Services",
      ],
    },
    {
      degree: "Bachelor of Nursing",
      majors: [
        "Registered Nursing",
        "Clinical Practice",
        "Health Assessment",
      ],
    },
    {
      degree: "Bachelor of Physiotherapy (Honours)",
      majors: [
        "Clinical Physiotherapy",
        "Sports Physiotherapy",
        "Musculoskeletal Physiotherapy",
      ],
    },
    {
      degree: "Bachelor of Occupational Therapy (Honours)",
      majors: [
        "Occupational Science",
        "Clinical Practice",
        "Rehabilitation",
      ],
    },
    {
      degree: "Bachelor of Paramedicine",
      majors: [
        "Paramedic Practice",
        "Emergency Medicine",
        "Advanced Life Support",
      ],
    },
    {
      degree: "Bachelor of Radiography and Medical Imaging (Honours)",
      majors: [
        "Medical Imaging",
        "Diagnostic Radiography",
        "Ultrasound",
      ],
    },
    {
      degree: "Bachelor of Medical Science (Honours)",
      majors: [
        "Medical Research",
        "Biomedical Science",
        "Clinical Science",
      ],
    },
  ],

  "UNSW Sydney": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Anatomy",
        "Bioinformatics",
        "Biology",
        "Biotechnology",
        "Chemistry",
        "Computer Science",
        "Data Science",
        "Earth Science",
        "Ecology",
        "Food Science",
        "Genetics",
        "Geography",
        "Materials Science",
        "Marine and Coastal Science",
        "Mathematics",
        "Microbiology",
        "Molecular and Cell Biology",
        "Neuroscience",
        "Pathology",
        "Pharmacology",
        "Physical Oceanography",
        "Physics",
        "Physiology",
        "Psychology",
        "Statistics",
        "Vision Science",
      ],
    },
    {
      degree: "Bachelor of Computer Science",
      majors: [
        "Software Engineering",
        "Artificial Intelligence",
        "Cybersecurity",
        "Game Development",
        "Data Analytics",
        "Machine Learning",
      ],
    },
    {
      degree: "Bachelor of Data Science and Decisions",
      majors: [
        "Business Data Science",
        "Computational Data Science",
        "Quantitative Data Science",
        "Data Analytics",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Aerospace Engineering",
        "Biomedical Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Electrical Engineering",
        "Environmental Engineering",
        "Mechanical Engineering",
        "Mechatronic Engineering",
        "Mining Engineering",
        "Petroleum Engineering",
        "Photovoltaics and Solar Energy",
        "Renewable Energy Engineering",
        "Software Engineering",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Finance",
        "Business Economics",
        "Marketing",
        "Management",
        "International Business",
        "Human Resources",
        "Information Systems",
        "Business Analytics",
        "Taxation",
        "Strategy and Entrepreneurship",
        "Innovation",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Psychology",
        "Economics",
        "English",
        "History",
        "Philosophy",
        "Sociology",
        "Linguistics",
        "Media Studies",
        "International Relations",
      ],
    },
    {
      degree: "Bachelor of Laws (Honours)",
      majors: [
        "Commercial Law",
        "Constitutional Law",
        "International Law",
        "Criminal Law",
        "Corporate Law",
        "Environmental Law",
        "Intellectual Property Law",
        "Employment Law",
        "Technology and Innovation Law",
      ],
    },
    {
      degree: "Bachelor of Actuarial Studies",
      majors: [
        "Actuarial Science",
        "Finance",
        "Risk Management",
      ],
    },
    {
      degree: "Bachelor of Medical Studies / Doctor of Medicine",
      majors: [
        "Medicine",
        "Clinical Practice",
      ],
    },
    {
      degree: "Bachelor of Exercise Science / Master of Physiotherapy",
      majors: [
        "Physiotherapy",
        "Exercise Physiology",
        "Clinical Practice",
      ],
    },
    {
      degree: "Bachelor of Applied Exercise Science / Master of Clinical Exercise Physiology",
      majors: [
        "Clinical Exercise Physiology",
        "Accredited Exercise Science",
      ],
    },
    {
      degree: "Bachelor of Dietetics and Food Innovation",
      majors: [
        "Nutrition",
        "Food Science",
        "Dietetic Practice",
      ],
    },
    {
      degree: "Bachelor of Pharmaceutical Medicine / Master of Pharmacy",
      majors: [
        "Pharmacy Practice",
        "Pharmaceutical Sciences",
      ],
    },
    {
      degree: "Bachelor of Education (Primary) (Honours)",
      majors: [
        "Primary Teaching",
        "Education Studies",
        "Pedagogy",
      ],
    },
    {
      degree: "Bachelor of Education (Secondary) (Honours)",
      majors: [
        "Secondary Teaching",
        "Education Studies",
        "Subject Specialisation",
      ],
    },
    {
      degree: "Bachelor of Arts / Education (Secondary)",
      majors: [
        "Arts Education",
        "Teaching",
      ],
    },
    {
      degree: "Bachelor of Science / Education (Secondary)",
      majors: [
        "Science Education",
        "Mathematics Education",
      ],
    },
    {
      degree: "Bachelor of Design / Education (Secondary)",
      majors: [
        "Design Education",
        "Visual Arts Teaching",
      ],
    },
    {
      degree: "Bachelor of Commerce / Education (Secondary)",
      majors: [
        "Business Education",
        "Economics Education",
      ],
    },
  ],

  "University of Technology Sydney": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Computer Science",
        "Information Technology",
        "Physics",
        "Chemistry",
        "Applied Mathematics",
        "Forensic Science",
        "Biomedical Science",
        "Environmental Science",
        "Biology",
        "Microbiology",
        "Pharmacology",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Software Engineering",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Civil Engineering",
        "Civil and Environmental Engineering",
        "Civil (Structures)",
        "Electrical and Electronic Engineering",
        "Electronic Engineering",
        "Data Science Engineering",
        "Chemical Process Engineering",
        "Biomedical Engineering",
        "Renewable Energy Engineering",
        "Flexible Engineering",
        "Mechanical and Mechatronic Engineering",
        "Mechatronic Engineering",
      ],
    },
    {
      degree: "Bachelor of Business",
      majors: [
        "Accounting",
        "Finance",
        "Marketing",
        "Business Management",
        "Human Resources",
        "International Business",
        "Economics",
        "Taxation",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Cybersecurity",
        "Artificial Intelligence",
        "Data Analytics",
        "Web Technology",
        "Mobile App Development",
        "Cloud Computing",
        "Software Development",
        "Database Systems",
      ],
    },
    {
      degree: "Bachelor of Information Systems",
      majors: [
        "Enterprise Systems",
        "Business Intelligence",
        "Systems Analysis",
      ],
    },
    {
      degree: "Bachelor of Communications",
      majors: [
        "Digital Media",
        "Public Relations",
        "Journalism",
        "Advertising",
        "Social Media",
        "Content Creation",
      ],
    },
    {
      degree: "Bachelor of Design",
      majors: [
        "Graphic Design",
        "Interaction Design",
        "Product Design",
        "Digital Design",
        "Architecture",
        "Industrial Design",
      ],
    },
    {
      degree: "Bachelor of Laws (Honours)",
      majors: [
        "Commercial Law",
        "Criminal Law",
        "International Law",
        "Corporate Law",
        "Intellectual Property Law",
        "Technology Law",
      ],
    },
    {
      degree: "Bachelor of Nursing",
      majors: [
        "Registered Nursing",
        "Clinical Practice",
        "Health Assessment",
      ],
    },
    {
      degree: "Bachelor of Midwifery",
      majors: [
        "Midwifery Practice",
        "Maternal Health",
        "Clinical Midwifery",
      ],
    },
    {
      degree: "Bachelor of Health Science",
      majors: [
        "Public Health",
        "Health Promotion",
        "Health Services",
      ],
    },
  ],

  "University of Melbourne": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Agricultural Science",
        "Animal Health and Disease",
        "Animal Science and Management",
        "Biochemistry and Molecular Biology",
        "Biomedical Engineering Systems",
        "Biotechnology",
        "Cell and Developmental Biology",
        "Chemical Engineering Systems",
        "Chemistry",
        "Civil Engineering Systems",
        "Climate and Weather",
        "Computing and Software Systems",
        "Data Science",
        "Digital Infrastructure Engineering Systems",
        "Ecology and Evolutionary Biology",
        "Ecosystem Science",
        "Electrical Engineering Systems",
        "Environmental Engineering Systems",
        "Environmental Science",
        "Food Science",
        "Genetics",
        "Geography",
        "Geology",
        "Geoscience",
        "Human Nutrition",
        "Human Structure and Function",
        "Immunology",
        "Infection and Immunity",
        "Marine Biology",
        "Mathematical Physics",
        "Mathematics and Statistics",
        "Mechanical Engineering Systems",
        "Mechatronics Engineering Systems",
        "Microbiology",
        "Neuroscience",
        "Pathology",
        "Pharmacology",
        "Physics",
        "Physiology",
        "Plant Science",
        "Psychology",
        "Spatial Systems",
        "Veterinary Bioscience",
        "Zoology",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Ancient World Studies",
        "Anthropology",
        "Arabic Studies",
        "Art History",
        "Asian Studies",
        "Chinese Studies",
        "Classics (Ancient Greek and Latin)",
        "Creative Writing",
        "Criminology",
        "Economics",
        "English and Theatre Studies",
        "French Studies",
        "Gender Studies",
        "Geography",
        "German Studies",
        "Hebrew and Jewish Studies",
        "History",
        "History and Philosophy of Science",
        "Indigenous Studies",
        "Indonesian Studies",
        "Islamic Studies",
        "Italian Studies",
        "Japanese Studies",
        "Korean Studies",
        "Linguistics and Applied Linguistics",
        "Media and Communications",
        "Philosophy",
        "Politics and International Studies",
        "Psychology",
        "Russian Studies",
        "Screen and Cultural Studies",
        "Sociology",
        "Spanish and Latin American Studies",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Finance",
        "Marketing",
        "Business Management",
        "Economics",
        "Actuarial Science",
        "Management",
        "Information Systems",
        "Business Analytics",
        "International Business",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Software Engineering",
        "Electrical Engineering",
        "Civil Engineering",
        "Mechanical Engineering",
        "Chemical Engineering",
        "Biomedical Engineering",
        "Environmental Engineering",
        "Infrastructure Engineering",
        "Structural Engineering",
        "Water Resources Engineering",
      ],
    },
    {
      degree: "Bachelor of Design",
      majors: [
        "Graphic Design",
        "Product Design",
        "Architecture",
        "Fashion Design",
        "Landscape Architecture",
        "Interaction Design",
      ],
    },
    {
      degree: "Bachelor of Laws (Honours)",
      majors: [
        "Commercial Law",
        "Constitutional Law",
        "Criminal Law",
        "International Law",
        "Corporate Law",
        "Environmental Law",
        "Intellectual Property Law",
        "Employment Law",
        "Technology Law",
      ],
    },
    {
      degree: "Bachelor of Biomedicine",
      majors: [
        "Immunology",
        "Pathology",
        "Pharmacology",
        "Genetics",
        "Neuroscience",
        "Cell Biology",
        "Microbiology",
      ],
    },
    {
      degree: "Bachelor of Music",
      majors: [
        "Performance",
        "Composition",
        "Music Technology",
        "Music Theory",
      ],
    },
    {
      degree: "Bachelor of Agriculture",
      majors: [
        "Crop Science",
        "Animal Science",
        "Agricultural Business",
        "Sustainable Agriculture",
      ],
    },
    {
      degree: "Bachelor of Health Sciences",
      majors: [
        "Nursing",
        "Physiotherapy",
        "Speech Pathology",
        "Audiology",
        "Social Work",
        "Optometry and Vision Sciences",
      ],
    },
    {
      degree: "Bachelor of Biomedicine",
      majors: [
        "Immunology",
        "Pathology",
        "Pharmacology",
        "Genetics",
        "Neuroscience",
        "Microbiology",
        "Cell Biology",
      ],
    },
    {
      degree: "Bachelor of Medical Science (Honours)",
      majors: [
        "Medical Research",
        "Biomedical Science",
        "Clinical Science",
      ],
    },
  ],

  "Australian National University": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Astronomy and Astrophysics",
        "Biological Anthropology",
        "Biology",
        "Chemistry",
        "Climate Science",
        "Computer Science",
        "Earth Science",
        "Environmental Policy",
        "Evolution and Ecology",
        "Genetics",
        "Geography",
        "Immunology",
        "Marine Science",
        "Mathematics and Statistics",
        "Natural Resource Management",
        "Sustainability",
        "Physics",
        "Plant Science",
        "Psychology",
        "Neuroscience",
        "Science Communication",
      ],
    },
    {
      degree: "Bachelor of Science (Advanced) (Honours)",
      majors: [
        "Astronomy and Astrophysics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
        "Mathematics",
        "Marine Science",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Ancient World Studies",
        "Anthropology",
        "Arabic Studies",
        "Art History",
        "Asian Studies",
        "Chinese Studies",
        "Classics",
        "Creative Writing",
        "Economics",
        "English",
        "French Studies",
        "Gender Studies",
        "Geography",
        "German Studies",
        "History",
        "Indigenous Studies",
        "International Relations",
        "Japanese Studies",
        "Linguistics",
        "Media and Communications",
        "Philosophy",
        "Politics",
        "Psychology",
        "Religion",
        "Russian Studies",
        "Sociology",
        "Spanish Studies",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Finance",
        "Economics",
        "Business Management",
        "Marketing",
        "Actuarial Studies",
        "International Business",
        "Business Analytics",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Software Engineering",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Civil Engineering",
        "Aerospace Engineering",
        "Biomedical Engineering",
        "Infrastructure Engineering",
        "Robotics Engineering",
      ],
    },
    {
      degree: "Bachelor of Engineering (Research and Development) (Honours)",
      majors: [
        "Software Engineering",
        "Aerospace Engineering",
        "Electrical Engineering",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Software Development",
        "Cybersecurity",
        "Artificial Intelligence",
        "Data Analytics",
        "Cloud Computing",
        "Systems Administration",
      ],
    },
    {
      degree: "Bachelor of Laws (Honours)",
      majors: [
        "International Law",
        "Commercial Law",
        "Constitutional Law",
        "Criminal Law",
        "Environmental Law",
        "Intellectual Property Law",
      ],
    },
    {
      degree: "Bachelor of Health Science",
      majors: [
        "Health Promotion",
        "Public Health",
        "Allied Health",
        "Pre-Medicine Pathway",
      ],
    },
    {
      degree: "Bachelor of Medical Science",
      majors: [
        "Biomedical Science",
        "Clinical Science",
        "Pharmacology",
        "Neuroscience",
        "Microbiology",
      ],
    },
  ],

  "Monash University": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Anatomy and Developmental Biology",
        "Applied Mathematics",
        "Applied Microbiology",
        "Astrophysics",
        "Biochemistry",
        "Biotechnology",
        "Chemistry",
        "Climate and Atmospheric Science",
        "Computational Science",
        "Computer Science",
        "Earth Science",
        "Ecology and Conservation Biology",
        "Genetics and Genomics",
        "Genomics and Bioinformatics",
        "Geographical Science",
        "Human Pathology",
        "Immunology",
        "Mathematical Statistics",
        "Mathematics",
        "Medicinal Chemistry",
        "Microbiology",
        "Molecular Biology",
        "Neuroscience",
        "Pharmacology",
        "Physics",
        "Physiology",
        "Plant Sciences",
        "Psychology",
        "Pure Mathematics",
        "Statistics",
        "Tropical Environmental Biology",
        "Zoology",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Anthropology",
        "Arabic Studies",
        "Art History",
        "Asian Studies",
        "Chinese Studies",
        "Communication",
        "Criminology",
        "Creative Writing",
        "Economics",
        "English",
        "Film Studies",
        "French Studies",
        "Gender and Sexuality Studies",
        "German Studies",
        "Global Studies",
        "History",
        "Indigenous Studies",
        "Interactive Media",
        "International Relations",
        "Italian Studies",
        "Japanese Studies",
        "Linguistics",
        "Media Studies",
        "Music",
        "Philosophy",
        "Politics and Public Policy",
        "Psychology",
        "Spanish Studies",
        "Strategic Public Relations",
        "Sociology",
        "Spanish and Latin American Studies",
        "Theatre and Performance Studies",
        "Writing and Literature",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Finance",
        "Business Management",
        "Marketing",
        "Economics",
        "Taxation",
        "Human Resources",
        "International Business",
        "Business Analytics",
        "Management",
        "Sustainability",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Software Development",
        "Cybersecurity",
        "Data Analytics",
        "Web Development",
        "Artificial Intelligence",
        "Cloud Computing",
        "Database Management",
        "Mobile App Development",
      ],
    },
    {
      degree: "Bachelor of Computer Science",
      majors: [
        "Software Engineering",
        "Artificial Intelligence",
        "Cybersecurity",
        "Data Science",
        "Machine Learning",
        "Game Development",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Software Engineering",
        "Electrical Engineering",
        "Electrical and Computer Systems Engineering",
        "Civil Engineering",
        "Mechanical Engineering",
        "Mechatronic Engineering",
        "Robotics and Mechatronics Engineering",
        "Chemical Engineering",
        "Biomedical Engineering",
        "Materials Engineering",
        "Flexible Engineering",
      ],
    },
    {
      degree: "Bachelor of Design",
      majors: [
        "Graphic Design",
        "Industrial Design",
        "Fashion Design",
        "Digital Design",
        "Interior Design",
        "Architecture",
      ],
    },
    {
      degree: "Bachelor of Laws (Honours)",
      majors: [
        "Commercial Law",
        "Criminal Law",
        "International Law",
        "Corporate Law",
        "Environmental Law",
        "Intellectual Property Law",
        "Employment Law",
      ],
    },
    {
      degree: "Bachelor of Nursing",
      majors: [
        "Registered Nursing",
        "Clinical Practice",
        "Health Assessment",
      ],
    },
    {
      degree: "Bachelor of Physiotherapy (Honours)",
      majors: [
        "Physical Rehabilitation",
        "Clinical Physiotherapy",
        "Sports Physiotherapy",
      ],
    },
    {
      degree: "Bachelor of Occupational Therapy (Honours)",
      majors: [
        "Occupational Science",
        "Clinical Practice",
        "Rehabilitation",
      ],
    },
    {
      degree: "Bachelor of Paramedicine",
      majors: [
        "Paramedic Practice",
        "Emergency Medicine",
        "Advanced Life Support",
      ],
    },
    {
      degree: "Bachelor of Radiography and Medical Imaging (Honours)",
      majors: [
        "Medical Imaging",
        "Diagnostic Radiography",
        "Ultrasound",
      ],
    },
    {
      degree: "Bachelor of Medical Science",
      majors: [
        "Biomedical Science",
        "Clinical Science",
        "Pharmacology",
      ],
    },
    {
      degree: "Bachelor of Health Science",
      majors: [
        "Public Health",
        "Health Promotion",
        "Allied Health",
      ],
    },
  ],

  // ─── UK Universities ───────────────────────────────────────────────

  "University of Oxford": [
    {
      degree: "BA in Jurisprudence",
    },
    {
      degree: "BA in Philosophy, Politics and Economics",
    },
    {
      degree: "BA in History",
      majors: [
        "Ancient and Modern History",
        "History and Economics",
        "History and English",
        "History and Modern Languages",
        "History and Politics",
      ],
    },
    {
      degree: "BA in English Language and Literature",
    },
    {
      degree: "BA in Mathematics",
      majors: [
        "Mathematics",
        "Mathematics and Statistics",
        "Mathematics and Computer Science",
        "Mathematics and Philosophy",
      ],
    },
    {
      degree: "BA in Computer Science",
      majors: [
        "Computer Science",
        "Computer Science and Philosophy",
      ],
    },
    {
      degree: "BA in Physics",
      majors: [
        "Physics",
        "Physics and Philosophy",
      ],
    },
    {
      degree: "BA in Chemistry",
    },
    {
      degree: "BA in Biochemistry",
      majors: [
        "Biochemistry",
        "Molecular and Cellular Biochemistry",
      ],
    },
    {
      degree: "BA in Economics and Management",
    },
    {
      degree: "BA in Engineering Science",
      majors: [
        "Biomedical Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Electrical Engineering",
        "Information Engineering",
        "Mechanical Engineering",
      ],
    },
    {
      degree: "BA in Medicine (Preclinical)",
    },
    {
      degree: "BA in Biological Sciences",
    },
    {
      degree: "BA in Psychology, Philosophy and Linguistics",
    },
    {
      degree: "BA in Fine Art",
    },
    {
      degree: "BA in Geography",
    },
    {
      degree: "BA in Modern Languages",
      majors: [
        "French",
        "German",
        "Spanish",
        "Italian",
        "Portuguese",
        "Russian",
        "Arabic",
        "Chinese",
        "Japanese",
      ],
    },
    {
      degree: "BA in Classics",
      majors: [
        "Classics",
        "Classics and English",
        "Classics and Modern Languages",
      ],
    },
    {
      degree: "BA in Music",
    },
    {
      degree: "BA in Theology and Religion",
    },
    {
      degree: "BA in Earth Sciences",
    },
    {
      degree: "BA in Materials Science",
    },
    {
      degree: "BA in Human Sciences",
    },
    {
      degree: "BA in Oriental Studies",
      majors: [
        "Arabic",
        "Chinese",
        "Japanese",
        "Hebrew",
        "Persian",
        "Turkish",
        "Sanskrit",
      ],
    },
    {
      degree: "BA in Archaeology and Anthropology",
    },
  ],

  "University of Cambridge": [
    {
      degree: "BA in Natural Sciences",
      majors: [
        "Physics",
        "Chemistry",
        "Biochemistry",
        "Biology",
        "Earth Sciences",
        "Materials Science",
        "Neuroscience",
        "Pathology",
        "Pharmacology",
        "Physiology",
        "Plant Sciences",
        "Zoology",
        "Astrophysics",
      ],
    },
    {
      degree: "BA in Engineering",
      majors: [
        "Aerospace Engineering",
        "Bioengineering",
        "Civil and Structural Engineering",
        "Electrical and Electronic Engineering",
        "Energy and Sustainability Engineering",
        "Information and Computer Engineering",
        "Mechanical Engineering",
        "Manufacturing Engineering",
      ],
    },
    {
      degree: "BA in Computer Science",
    },
    {
      degree: "BA in Mathematics",
      majors: [
        "Pure Mathematics",
        "Applied Mathematics",
        "Statistics",
        "Theoretical Physics",
      ],
    },
    {
      degree: "BA in Economics",
    },
    {
      degree: "BA in Law",
    },
    {
      degree: "BA in History",
    },
    {
      degree: "BA in English",
    },
    {
      degree: "BA in Medicine",
    },
    {
      degree: "BA in Architecture",
    },
    {
      degree: "BA in Modern and Medieval Languages",
      majors: [
        "French",
        "German",
        "Spanish",
        "Italian",
        "Portuguese",
        "Russian",
      ],
    },
    {
      degree: "BA in Psychological and Behavioural Sciences",
      majors: [
        "Psychology",
        "Cognitive Neuroscience",
        "Social Psychology",
        "Developmental Psychology",
      ],
    },
    {
      degree: "BA in Human, Social, and Political Sciences",
      majors: [
        "Politics",
        "International Relations",
        "Sociology",
        "Social Anthropology",
      ],
    },
    {
      degree: "BA in Philosophy",
    },
    {
      degree: "BA in Geography",
      majors: [
        "Physical Geography",
        "Human Geography",
      ],
    },
    {
      degree: "BA in Classics",
    },
    {
      degree: "BA in Music",
    },
    {
      degree: "BA in Theology, Religion, and Philosophy of Religion",
    },
    {
      degree: "BA in Land Economy",
      majors: [
        "Real Estate Finance",
        "Environmental Policy",
        "Planning and Development",
        "Law and Economics",
      ],
    },
    {
      degree: "BA in Education",
    },
    {
      degree: "BA in Linguistics",
    },
    {
      degree: "BA in Asian and Middle Eastern Studies",
      majors: [
        "Chinese",
        "Japanese",
        "Arabic",
        "Hebrew",
        "Persian",
      ],
    },
    {
      degree: "BA in Veterinary Medicine",
    },
    {
      degree: "BA in Chemical Engineering",
    },
  ],

  "Imperial College London": [
    {
      degree: "BEng/MEng Aeronautical Engineering",
    },
    {
      degree: "BEng/MEng Biomedical Engineering",
    },
    {
      degree: "BEng/MEng Chemical Engineering",
    },
    {
      degree: "BEng/MEng Civil Engineering",
    },
    {
      degree: "BEng/MEng Computing",
      majors: [
        "Software Engineering",
        "Artificial Intelligence",
        "Machine Learning",
        "Visual Computing",
        "Security and Reliability",
      ],
    },
    {
      degree: "BEng/MEng Design Engineering",
    },
    {
      degree: "BEng/MEng Electrical and Electronic Engineering",
    },
    {
      degree: "BEng/MEng Mechanical Engineering",
    },
    {
      degree: "BEng/MEng Materials Science and Engineering",
    },
    {
      degree: "BSc Mathematics",
      majors: [
        "Pure Mathematics",
        "Applied Mathematics",
        "Statistics",
        "Mathematical Physics",
      ],
    },
    {
      degree: "BSc Physics",
      majors: [
        "Physics",
        "Theoretical Physics",
      ],
    },
    {
      degree: "BSc Chemistry",
      majors: [
        "Chemistry",
        "Medicinal Chemistry",
      ],
    },
    {
      degree: "BSc Life Sciences",
    },
    {
      degree: "BSc Biochemistry",
    },
    {
      degree: "BSc Biotechnology",
    },
    {
      degree: "MBBS Medicine",
    },
    {
      degree: "BSc Earth and Planetary Science",
    },
    {
      degree: "BSc Mathematics and Computer Science",
    },
  ],

  "University College London": [
    {
      degree: "BSc Computer Science",
    },
    {
      degree: "BEng/MEng Engineering",
      majors: [
        "Biomedical Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Electronic and Electrical Engineering",
        "Mechanical Engineering",
      ],
    },
    {
      degree: "BA Architecture",
    },
    {
      degree: "BSc Economics",
    },
    {
      degree: "BA English",
    },
    {
      degree: "BA History",
    },
    {
      degree: "BA Fine Art",
    },
    {
      degree: "BA Geography",
      majors: [
        "Human Geography",
        "Physical Geography",
      ],
    },
    {
      degree: "LLB Laws",
    },
    {
      degree: "BSc Mathematics",
      majors: [
        "Mathematics",
        "Mathematics and Statistical Science",
        "Mathematics with Economics",
      ],
    },
    {
      degree: "MBBS Medicine",
    },
    {
      degree: "BSc Natural Sciences",
    },
    {
      degree: "BA Philosophy",
    },
    {
      degree: "BSc Physics",
      majors: [
        "Physics",
        "Astrophysics",
        "Theoretical Physics",
      ],
    },
    {
      degree: "BSc Psychology",
    },
    {
      degree: "BSc Neuroscience",
    },
    {
      degree: "BSc Biochemistry",
    },
    {
      degree: "BSc Statistical Science",
    },
    {
      degree: "BA Linguistics",
    },
    {
      degree: "BA Modern Languages",
      majors: [
        "French",
        "German",
        "Spanish",
        "Italian",
      ],
    },
    {
      degree: "BSc Anthropology",
    },
    {
      degree: "BSc Pharmacology",
    },
  ],

  "London School of Economics and Political Science": [
    {
      degree: "BSc Economics",
    },
    {
      degree: "BSc Finance",
    },
    {
      degree: "BSc Management",
    },
    {
      degree: "BSc Accounting and Finance",
    },
    {
      degree: "BSc Actuarial Science",
    },
    {
      degree: "BSc Mathematics and Economics",
    },
    {
      degree: "BSc Mathematics, Statistics and Business",
    },
    {
      degree: "BSc Politics",
    },
    {
      degree: "BSc International Relations",
    },
    {
      degree: "BSc Government",
    },
    {
      degree: "BSc Philosophy, Logic and Scientific Method",
    },
    {
      degree: "BSc Sociology",
    },
    {
      degree: "BSc Social Policy",
    },
    {
      degree: "BSc Geography",
    },
    {
      degree: "BSc History",
    },
    {
      degree: "BSc Anthropology",
    },
    {
      degree: "LLB Laws",
    },
    {
      degree: "BSc Statistics",
    },
    {
      degree: "BSc Data Science",
    },
    {
      degree: "BSc Psychological and Behavioural Science",
    },
    {
      degree: "BSc Environmental Policy with Economics",
    },
  ],
};

// ─── Utility Functions ─────────────────────────────────────────────

/** Normalise user-typed text to Title Case for consistent storage */
export function toTitleCase(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
}

/** Case-insensitive lookup into UNIVERSITIES_DATA */
export function getUniversityData(name: string): DegreeMajor[] | undefined {
  const lower = name.toLowerCase();
  const key = Object.keys(UNIVERSITIES_DATA).find((k) => k.toLowerCase() === lower);
  return key ? UNIVERSITIES_DATA[key] : undefined;
}
