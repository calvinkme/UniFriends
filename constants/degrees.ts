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

  // ─── Additional Australian Universities ─────────────────────────────

  "University of Queensland": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Applied Mathematics",
        "Archaeological Science",
        "Biochemistry and Molecular Biology",
        "Bioinformatics",
        "Biomedical Science",
        "Cell Biology",
        "Chemistry",
        "Coastal and Ocean Science",
        "Computer Science",
        "Earth Science",
        "Ecology and Conservation Biology",
        "Environmental Science",
        "Food Science and Nutrition",
        "Food Technology",
        "Genetics",
        "Geographical Science",
        "Marine Biology",
        "Mathematics",
        "Microbiology",
        "Physics",
        "Plant Science",
        "Psychology",
        "Public Health",
        "Statistics",
        "Sustainable Agriculture",
        "Zoology",
      ],
    },
    {
      degree: "Bachelor of Advanced Science (Honours)",
      majors: [
        "Anatomy",
        "Applied Mathematics",
        "Biochemistry and Molecular Biology",
        "Bioinformatics",
        "Biomedical Science",
        "Cell Biology",
        "Chemistry",
        "Computer Science",
        "Earth Science",
        "Ecology and Conservation Biology",
        "Environmental Science",
        "Genetics",
        "Marine Biology",
        "Mathematics",
        "Microbiology",
        "Physics",
        "Plant Science",
        "Statistics",
        "Zoology",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Aboriginal and Torres Strait Islander Studies",
        "Ancient History",
        "Anthropology",
        "Archaeology",
        "Art History",
        "Chinese",
        "Criminology",
        "Drama",
        "Economics",
        "English",
        "English Literature",
        "Film and Television Studies",
        "French",
        "Gender Studies",
        "Geography",
        "German",
        "History",
        "Indonesian",
        "International Relations",
        "Italian",
        "Japanese",
        "Journalism and Mass Communication",
        "Korean",
        "Linguistics",
        "Mathematics",
        "Media and Digital Cultures",
        "Music",
        "Peace and Conflict Studies",
        "Philosophy",
        "Political Science",
        "Psychology",
        "Russian",
        "Sociology",
        "Spanish",
        "Sports Studies",
        "Writing",
      ],
    },
    {
      degree: "Bachelor of Advanced Humanities (Honours)",
      majors: [
        "Ancient History",
        "Art History",
        "Drama",
        "English Literature",
        "History",
        "Music",
        "Philosophy",
        "Religious Studies",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Business Analytics",
        "Business Information Systems",
        "Finance",
      ],
    },
    {
      degree: "Bachelor of Business Management",
      majors: [
        "Business Economics",
        "Business Information Systems",
        "Human Resources",
        "Innovation and Entrepreneurship",
        "International Business",
        "Leadership and Management Science",
        "Marketing",
      ],
    },
    {
      degree: "Bachelor of Advanced Business (Honours)",
      majors: [
        "Accounting",
        "Business Analytics",
        "Business Information Systems",
        "Finance",
        "Human Resources",
        "Innovation and Entrepreneurship",
        "International Business",
        "Marketing",
      ],
    },
    {
      degree: "Bachelor of Economics",
      majors: [
        "Economics and Public Policy",
        "Economics of Strategy and Behaviour",
        "International and Financial Economics",
        "Quantitative Analysis",
      ],
    },
    {
      degree: "Bachelor of Advanced Finance and Economics (Honours)",
      majors: [
        "Economics",
        "Finance",
      ],
    },
    {
      degree: "Bachelor of Tourism, Hospitality and Event Management",
      majors: [
        "Hotel and Hospitality Management",
        "Tourism and Event Management",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Chemical Engineering",
        "Civil Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Mechatronic Engineering",
        "Software Engineering",
      ],
    },
    {
      degree: "Bachelor of Computer Science",
      majors: [
        "Artificial Intelligence",
        "Cyber Security",
        "Data Science",
        "Programming Theory",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Software Information Systems",
        "Solution Architecture",
        "User Experience Design",
      ],
    },
    {
      degree: "Bachelor of Mathematics",
      majors: [
        "Applied Mathematics",
        "Mathematical Artificial Intelligence",
        "Mathematical Physics",
        "Optimisation and Operations Research",
        "Pure Mathematics",
        "Statistics",
      ],
    },
    {
      degree: "Bachelor of Biotechnology",
      majors: [
        "Agricultural Biotechnology",
        "Chemical and Nano Biotechnology",
        "Medical Biotechnology",
        "Molecular and Microbial Biotechnology",
        "Synthetic Biology and Industrial Biotechnology",
      ],
    },
    {
      degree: "Bachelor of Agricultural Science",
      majors: [
        "Agronomy",
        "Animal Science",
        "Horticulture",
      ],
    },
    {
      degree: "Bachelor of Communication",
      majors: [
        "Digital Media",
        "Strategic Communication",
      ],
    },
    {
      degree: "Bachelor of International Studies",
      majors: [
        "Chinese",
        "Economics",
        "French",
        "German",
        "Indonesian",
        "International History",
        "International Inequality and Development",
        "International Relations",
        "Italian",
        "Japanese",
        "Korean",
        "Peace and Conflict Studies",
        "Russian",
        "Spanish",
      ],
    },
    {
      degree: "Bachelor of Social Science",
      majors: [
        "Development",
        "Environment and Society",
        "Health and Social Policy",
      ],
    },
    {
      degree: "Bachelor of Health Sciences",
      majors: [
        "Clinical Health",
        "Nutrition",
        "Public Health",
      ],
    },
    {
      degree: "Bachelor of Human Movement and Nutrition Sciences",
      majors: [
        "Nutrition Sciences",
        "Sports Coaching",
        "Sporting Cultures",
      ],
    },
    {
      degree: "Bachelor of Architectural Design",
      majors: [
        "Design Thinking",
        "Sustainable Buildings",
        "Urban Systems",
      ],
    },
    {
      degree: "Bachelor of Design",
      majors: [
        "Anthropology",
        "Architectural Studies",
        "Environment and Society",
        "Information Environments",
        "Innovation and Entrepreneurship",
        "Media and Digital Cultures",
        "Urban Systems",
      ],
    },
    {
      degree: "Bachelor of Laws (Honours)",
      majors: [
        "Commercial Law",
        "Constitutional Law",
        "Criminal Law",
        "Environmental Law",
        "International Law",
        "Corporate Law",
      ],
    },
    {
      degree: "Bachelor of Music",
      majors: [
        "Performance",
        "Composition",
        "Musicology",
        "Popular Music and Technology",
      ],
    },
    {
      degree: "Bachelor of Biomedical Science",
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Midwifery",
    },
    {
      degree: "Bachelor of Psychological Science (Honours)",
    },
    {
      degree: "Bachelor of Physiotherapy (Honours)",
    },
    {
      degree: "Bachelor of Occupational Therapy (Honours)",
    },
    {
      degree: "Bachelor of Pharmacy (Honours)",
    },
    {
      degree: "Bachelor of Dental Science (Honours)",
    },
    {
      degree: "Bachelor of Veterinary Science (Honours)",
    },
    {
      degree: "Bachelor of Education (Primary)",
      majors: [
        "English and Literacy",
        "Humanities and Social Sciences",
        "Mathematics and Numeracy",
        "Science",
      ],
    },
    {
      degree: "Bachelor of Politics, Philosophy and Economics (Honours)",
    },
    {
      degree: "Bachelor of Criminology and Criminal Justice",
    },
    {
      degree: "Bachelor of Environmental Management (Honours)",
    },
    // Combined Degrees
    {
      degree: "Bachelor of Engineering (Honours) / Bachelor of Science",
    },
    {
      degree: "Bachelor of Engineering (Honours) / Bachelor of Commerce",
    },
    {
      degree: "Bachelor of Engineering (Honours) / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Commerce / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Arts / Bachelor of Laws (Honours)",
    },
    {
      degree: "Bachelor of Commerce / Bachelor of Laws (Honours)",
    },
    {
      degree: "Bachelor of Science / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Science / Bachelor of Laws (Honours)",
    },
    {
      degree: "Bachelor of Computer Science / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Computer Science / Bachelor of Commerce",
    },
    {
      degree: "Bachelor of Mathematics / Bachelor of Science",
    },
    {
      degree: "Bachelor of Business Management / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Economics / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Business Management / Bachelor of Laws (Honours)",
    },
    {
      degree: "Bachelor of Economics / Bachelor of Laws (Honours)",
    },
  ],

  "University of Western Australia": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Agribusiness",
        "Agricultural Science",
        "Agricultural Technology",
        "Anatomy and Human Biology",
        "Biochemistry and Molecular Biology",
        "Botany",
        "Chemistry",
        "Computer Science",
        "Conservation Biology",
        "Cybersecurity",
        "Data Science",
        "Environmental Management",
        "Environmental Science",
        "Exercise and Health",
        "Genetics",
        "Geographical Sciences",
        "Geology",
        "Marine and Coastal Processes",
        "Marine Biology",
        "Mathematics",
        "Microbiology and Immunology",
        "Neuroscience",
        "Physics",
        "Physiology",
        "Psychological and Behavioural Sciences",
        "Sport Science",
        "Statistics",
        "Zoology",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Anthropology",
        "Applied Human Geography",
        "Archaeology",
        "Asian Studies",
        "Chinese Studies",
        "Classics and Ancient History",
        "Communication and Media Studies",
        "Contemporary Popular Music",
        "Criminology",
        "English and Literary Studies",
        "Fine Arts",
        "French Studies",
        "Gender Studies",
        "German Studies",
        "History",
        "History of Art",
        "Indigenous Knowledge History and Heritage",
        "Indonesian Studies",
        "Italian Studies",
        "Japanese Studies",
        "Korean Studies",
        "Law and Society",
        "Linguistics",
        "Music and Society",
        "Music Studies",
        "Philosophy",
        "Political Science and International Relations",
        "Psychological and Behavioural Sciences",
        "Science and Technology in Society",
        "Spanish Studies",
        "Work and Employment Relations",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Business Analytics",
        "Business Economics",
        "Business Law",
        "Finance",
        "Human Resource Management",
        "Management",
        "Marketing",
      ],
    },
    {
      degree: "Bachelor of Advanced Computer Science (Honours)",
      majors: [
        "Artificial Intelligence",
        "Computing and Data Science",
        "International Cybersecurity",
        "Quantum Computing",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Automation and Robotics Engineering",
        "Biomedical Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Electrical and Electronic Engineering",
        "Environmental Engineering",
        "Mechanical Engineering",
        "Mining Engineering",
        "Software Engineering",
      ],
    },
    {
      degree: "Bachelor of Biomedical Science",
      majors: [
        "Aboriginal Health and Wellbeing",
        "Anatomy and Human Biology",
        "Biochemistry and Molecular Biology",
        "Exercise and Health",
        "Human Genomics",
        "Humanities in Health and Medicine",
        "Microbiology and Immunology",
        "Neuroscience",
        "Pathology and Laboratory Medicine",
        "Pharmacology and Toxicology",
        "Physiology",
        "Public Health",
      ],
    },
    {
      degree: "Bachelor of Biomedicine (Specialised)",
      majors: [
        "Integrated Dental Sciences",
        "Integrated Medical Sciences and Clinical Practice",
        "Medical Science",
        "Podiatric Health and Medical Sciences",
      ],
    },
    {
      degree: "Bachelor of Business",
      majors: [
        "Business Management",
        "Enterprise and Innovation",
        "Global Business",
      ],
    },
    {
      degree: "Bachelor of Economics",
      majors: [
        "Economics",
        "Financial Economics",
      ],
    },
    {
      degree: "Bachelor of Environmental Design",
      majors: [
        "Architecture A",
        "Architecture B",
        "Environmental Geography and Planning",
        "Landscape Architecture",
      ],
    },
    {
      degree: "Bachelor of Environmental Science",
      majors: [
        "Environmental Science and Ecology",
        "Environmental Science and Management",
      ],
    },
    {
      degree: "Bachelor of Biological Science",
      majors: [
        "Biodiversity and Evolutionary Development",
        "Plant Biology",
        "Wildlife Conservation",
      ],
    },
    {
      degree: "Bachelor of Human Sciences",
      majors: [
        "Human Science and Neuroscience",
        "Human Sciences (Anatomy and Physiology)",
        "Human Sciences and Data Analytics",
      ],
    },
    {
      degree: "Bachelor of Molecular Sciences",
      majors: [
        "Biochemistry of Nutrition",
        "Molecular Life Sciences",
      ],
    },
    {
      degree: "Bachelor of Earth Sciences",
      majors: [
        "Geochemistry",
        "Integrated Earth and Marine Sciences",
      ],
    },
    {
      degree: "Bachelor of Modern Languages",
      majors: [
        "Chinese Studies",
        "French Studies",
        "German Studies",
        "Indonesian Studies",
        "Italian Studies",
        "Japanese Studies",
        "Korean Studies",
        "Spanish Studies",
      ],
    },
    {
      degree: "Bachelor of Sport and Exercise Sciences",
      majors: [
        "Sport Science",
        "Exercise and Health",
      ],
    },
    {
      degree: "Bachelor of Philosophy, Politics and Economics",
    },
    {
      degree: "Bachelor of Psychology",
    },
    {
      degree: "Bachelor of Music",
    },
    {
      degree: "Bachelor of Education (Primary) (Honours)",
    },
    {
      degree: "Bachelor of Nursing (Honours)",
    },
    {
      degree: "Bachelor of Social Work (Honours)",
    },
    {
      degree: "Bachelor of Criminology and Criminal Justice",
    },
    {
      degree: "Bachelor of International Relations",
    },
    {
      degree: "Bachelor of Human Rights",
    },
    {
      degree: "Bachelor of Media and Communication",
    },
    {
      degree: "Bachelor of Landscape Architecture (Honours)",
    },
    // Combined Degrees
    {
      degree: "Bachelor of Engineering (Honours) / Bachelor of Science",
    },
    {
      degree: "Bachelor of Engineering (Honours) / Bachelor of Commerce",
    },
    {
      degree: "Bachelor of Engineering (Honours) / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Psychology / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Psychology / Bachelor of Commerce",
    },
    {
      degree: "Bachelor of Psychology / Bachelor of Science",
    },
    {
      degree: "Bachelor of Philosophy, Politics and Economics / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Philosophy, Politics and Economics / Bachelor of Commerce",
    },
    {
      degree: "Bachelor of Modern Languages / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Modern Languages / Bachelor of Commerce",
    },
    {
      degree: "Bachelor of Modern Languages / Bachelor of Science",
    },
    {
      degree: "Bachelor of Music / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Music / Bachelor of Science",
    },
    {
      degree: "Bachelor of Economics / Bachelor of Commerce",
    },
  ],

  "University of Adelaide": [
    {
      degree: "Bachelor of Arts",
      majors: [
        "Aboriginal Studies",
        "Anthropology",
        "Archaeology and Classical Studies",
        "Art History and Visual Culture",
        "Chinese Studies",
        "Creative Writing",
        "Cultural Studies",
        "English Literature",
        "Environmental Management",
        "French Studies",
        "Gender and Sexuality Studies",
        "Geography",
        "German Studies",
        "History",
        "International Development",
        "International Security",
        "Italian Studies",
        "Japanese Studies",
        "Linguistics and Applied Linguistics",
        "Philosophy",
        "Politics",
        "Screen Studies",
        "Social Research and Policy Analysis",
        "Sociology",
        "Spanish Studies",
      ],
    },
    {
      degree: "Bachelor of Science",
      majors: [
        "Analytical Chemistry",
        "Animal Behaviour",
        "Animal Science",
        "Biochemistry",
        "Biotechnology",
        "Chemistry",
        "Computational Physics",
        "Ecology",
        "Environmental and Geospatial Science",
        "Environmental Science",
        "Evolutionary Biology",
        "Experimental Physics",
        "Food Science and Technology",
        "Genetics",
        "Geology",
        "Geophysics",
        "Marine and Wildlife Conservation",
        "Medicinal and Biological Chemistry",
        "Microbiology and Immunology",
        "Plant Biology",
        "Pure and Applied Chemistry",
        "Soil Science",
        "Space Science and Astrophysics",
        "Theoretical Physics",
      ],
    },
    {
      degree: "Bachelor of Business",
      majors: [
        "Digital Business",
        "Human Resource Management",
        "Innovation, Entrepreneurship and Strategy",
        "International Business",
        "Management",
        "Marketing",
        "Marketing and Communication",
        "Marketing and Design",
        "Procurement and Supply Chain Management",
        "Project Management",
        "Real Estate",
        "Sport Management",
        "Tourism, Events and Hospitality Management",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Banking and Finance",
        "Business Analytics",
        "Financial Planning",
        "Property",
      ],
    },
    {
      degree: "Bachelor of Economics",
      majors: [
        "Advanced Analysis",
      ],
    },
    {
      degree: "Bachelor of Computer Science",
      majors: [
        "Artificial Intelligence and Machine Learning",
        "Human-Centred Computing",
        "Programming Languages",
      ],
    },
    {
      degree: "Bachelor of Cyber Security",
      majors: [
        "Governance, Risk and Compliance",
        "Technology",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Data Analytics",
        "Games Development",
        "Networking and Cyber Security",
        "Software Development",
      ],
    },
    {
      degree: "Bachelor of Mathematics",
      majors: [
        "Applied Mathematics",
        "Data Science",
        "Pure Mathematics",
        "Statistics",
      ],
    },
    {
      degree: "Bachelor of Engineering (Chemical) (Honours)",
    },
    {
      degree: "Bachelor of Engineering (Civil) (Honours)",
    },
    {
      degree: "Bachelor of Engineering (Electrical) (Honours)",
    },
    {
      degree: "Bachelor of Engineering (Environmental) (Honours)",
    },
    {
      degree: "Bachelor of Engineering (Mechanical) (Honours)",
    },
    {
      degree: "Bachelor of Software Engineering (Honours)",
    },
    {
      degree: "Bachelor of International Relations",
      majors: [
        "Chinese Studies",
        "Environmental Management",
        "French Studies",
        "German Studies",
        "History",
        "International Development",
        "International Security",
        "Italian Studies",
        "Japanese Studies",
        "Politics",
        "Spanish Studies",
      ],
    },
    {
      degree: "Bachelor of Criminology and Criminal Justice",
      majors: [
        "Aboriginal Studies",
        "Anthropology",
        "Gender and Sexuality Studies",
        "History",
        "International Security",
        "Politics",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Sustainability and Climate Change",
      majors: [
        "Aboriginal Studies",
        "Anthropology",
        "Environmental Management",
        "Geography",
        "International Development",
        "International Security",
        "Politics",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Biomedical and Health Sciences",
      majors: [
        "Biochemistry",
        "Clinical Trials",
        "Genetics",
        "Medical Science",
        "Microbiology and Immunology",
        "Neuroscience",
        "Public Health",
        "Reproductive and Childhood Health",
      ],
    },
    {
      degree: "Bachelor of Psychology",
      majors: [
        "Cognitive Neuroscience",
        "Counselling and Interpersonal Skills",
      ],
    },
    {
      degree: "Bachelor of Human Movement",
      majors: [
        "Human Nutrition",
        "Secondary Health and Physical Education",
        "Sport Coaching",
      ],
    },
    {
      degree: "Bachelor of Medical Radiation Science (Honours)",
      majors: [
        "Medical Imaging",
        "Nuclear Medicine",
        "Radiation Therapy",
      ],
    },
    {
      degree: "Bachelor of Creative Arts",
      majors: [
        "Creative Industries",
        "Creative Writing",
        "Digital Media and Web Design",
        "Festivals",
        "Games Design and Production",
        "Immersive Media",
        "Performing Arts",
        "Screen Production",
      ],
    },
    {
      degree: "Bachelor of Journalism",
      majors: [
        "Creative Writing",
        "Digital and Social Media Storytelling",
        "Immersive Media",
        "Politics",
        "Strategic Communication",
      ],
    },
    {
      degree: "Bachelor of Media and Communication",
      majors: [
        "Digital and Social Media Storytelling",
        "Digital Media and Web Design",
        "Games Design and Production",
        "Immersive Media",
        "Media Cultures",
        "Screen Production",
        "Screen Studies",
        "Strategic Communication",
      ],
    },
    {
      degree: "Bachelor of Music",
      majors: [
        "Classical Performance",
        "Creative Practice",
        "Jazz Performance",
        "Music Education",
      ],
    },
    {
      degree: "Bachelor of Architectural Design",
      majors: [
        "Urban Planning",
      ],
    },
    {
      degree: "Bachelor of Aviation",
      majors: [
        "Management",
        "Pilot",
      ],
    },
    {
      degree: "Bachelor of Social Science",
      majors: [
        "Ageing and Disability",
        "Human Services",
      ],
    },
    {
      degree: "Bachelor of Laws (Honours)",
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Midwifery",
    },
    {
      degree: "Bachelor of Pharmacy (Honours)",
    },
    {
      degree: "Bachelor of Physiotherapy (Honours)",
    },
    {
      degree: "Bachelor of Occupational Therapy (Honours)",
    },
    {
      degree: "Bachelor of Speech Pathology (Honours)",
    },
    {
      degree: "Bachelor of Social Work",
    },
    {
      degree: "Bachelor of Dental Surgery",
    },
    {
      degree: "Bachelor of Philosophy, Politics and Economics",
    },
    {
      degree: "Bachelor of Viticulture and Oenology",
    },
    {
      degree: "Bachelor of Agricultural Sciences",
    },
    // Combined Degrees
    {
      degree: "Bachelor of Laws (Honours) / Bachelor of Arts",
    },
    {
      degree: "Bachelor of Laws (Honours) / Bachelor of Business",
    },
    {
      degree: "Bachelor of Laws (Honours) / Bachelor of Commerce",
    },
    {
      degree: "Bachelor of Laws (Honours) / Bachelor of Economics",
    },
    {
      degree: "Bachelor of Laws (Honours) / Bachelor of Criminology and Criminal Justice",
    },
    {
      degree: "Bachelor of Laws (Honours) / Bachelor of International Relations",
    },
    {
      degree: "Bachelor of Laws (Honours) / Bachelor of Journalism",
    },
    {
      degree: "Bachelor of Laws (Honours) / Bachelor of Psychology",
    },
    {
      degree: "Bachelor of Laws (Honours) / Bachelor of Sustainability and Climate Change",
    },
  ],

  "RMIT University": [
    {
      degree: "Bachelor of Business",
      majors: [
        "Business Information Systems",
        "Business and Technology",
        "Digital Economy",
        "Economics",
        "Entrepreneurship",
        "Finance",
        "Financial Planning",
        "Global Business",
        "Human Resource Management",
        "Logistics and Supply Chain",
        "Management and Change",
        "Marketing",
        "Social Impact",
        "Strategy and Innovation",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Cyber Security Law and Governance",
        "Enterprise AI and Business Analytics",
        "International Business",
        "Marketing Technology",
        "Quantitative Economics and Finance",
      ],
    },
    {
      degree: "Bachelor of Science",
      majors: [
        "Biological Sciences",
        "Biotechnology",
        "Chemistry",
        "Food Science and Technology",
        "Geospatial Sciences",
        "Mathematics",
        "Nutrition Science",
        "Physics",
        "Statistics",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Cyber Security",
        "Digital Innovation",
        "Enterprise System Development",
      ],
    },
    {
      degree: "Bachelor of Computer Science",
      majors: [
        "Advanced Computer Science",
        "Cyber Security",
        "Enterprise Systems Development",
      ],
    },
    {
      degree: "Bachelor of Data Science",
      majors: [
        "Advanced Data Science",
        "Cyber Security",
        "Enterprise System Development",
      ],
    },
    {
      degree: "Bachelor of Cyber Security",
    },
    {
      degree: "Bachelor of Software Engineering (Professional)",
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Aerospace Engineering",
        "Advanced Manufacturing and Mechatronics",
        "Biomedical Engineering",
        "Chemical Engineering",
        "Civil and Infrastructure",
        "Electrical Engineering",
        "Electronic and Computer Systems Engineering",
        "Environmental Engineering",
        "Mechanical Engineering",
        "Mechatronics Engineering",
        "Sustainable Systems Engineering",
      ],
    },
    {
      degree: "Bachelor of Laws",
    },
    {
      degree: "Bachelor of Professional Communication",
      majors: [
        "Advertising",
        "Digital Communication",
        "Public Relations",
      ],
    },
    {
      degree: "Bachelor of Education",
      majors: [
        "Primary",
        "Primary and Early Childhood Education",
        "Primary and Secondary",
      ],
    },
    {
      degree: "Bachelor of Graphic Design",
      majors: [
        "Experience Design",
        "Branding",
        "Illustration",
        "Typography",
      ],
    },
    {
      degree: "Bachelor of Design (Digital Media)",
      majors: [
        "Interactive",
        "Digital Video",
        "Sound",
        "Digital Environments",
      ],
    },
    {
      degree: "Bachelor of Fine Arts",
      majors: [
        "Drawing",
        "Painting",
        "Printmaking",
        "Ceramics",
        "Jewellery",
        "Sculpture",
        "Expanded Media Arts",
        "Photography",
      ],
    },
    {
      degree: "Bachelor of Industrial Design (Honours)",
      majors: [
        "Design for Sustainability",
        "Design for Advanced Manufacture",
        "Interaction Design",
        "Design for Sound Interfaces and Environments",
      ],
    },
    {
      degree: "Bachelor of Fashion Sustainability",
      majors: [
        "Textile and Material Design",
        "Fashion Innovation and Technology",
      ],
    },
    {
      degree: "Bachelor of Biomedical Science",
      majors: [
        "Medical Biotechnology",
        "Clinical Health and Disease",
      ],
    },
    {
      degree: "Bachelor of Psychology",
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Social Work (Honours)",
    },
    {
      degree: "Bachelor of Criminology and Criminal Justice",
    },
    {
      degree: "Bachelor of International Studies",
    },
    {
      degree: "Bachelor of Architectural Design",
    },
    {
      degree: "Bachelor of Construction Management (Honours)",
    },
    {
      degree: "Bachelor of Interior Design (Honours)",
    },
    {
      degree: "Bachelor of Communication (Journalism)",
    },
    {
      degree: "Bachelor of Communication (Media)",
    },
    {
      degree: "Bachelor of Design (Animation and Interactive Media)",
    },
    {
      degree: "Bachelor of Design (Games)",
    },
    {
      degree: "Bachelor of Fashion (Design)",
    },
    {
      degree: "Bachelor of Fashion (Enterprise)",
    },
    {
      degree: "Bachelor of Space Science",
    },
    {
      degree: "Bachelor of Environmental Science",
    },
    {
      degree: "Bachelor of Pharmaceutical Sciences",
    },
    {
      degree: "Bachelor of Applied Science (Aviation)",
    },
    // Combined Degrees
    {
      degree: "Bachelor of Accounting / Bachelor of Business",
    },
    {
      degree: "Bachelor of Accounting / Bachelor of Commerce",
    },
    {
      degree: "Bachelor of Accounting / Bachelor of Laws",
    },
    {
      degree: "Bachelor of Laws / Bachelor of Business",
    },
    {
      degree: "Bachelor of Laws / Bachelor of Commerce",
    },
    {
      degree: "Bachelor of Laws / Bachelor of Professional Communication",
    },
    {
      degree: "Bachelor of Engineering (Honours) / Bachelor of Business",
    },
    {
      degree: "Bachelor of Engineering (Honours) / Bachelor of Computer Science",
    },
    {
      degree: "Bachelor of Engineering (Honours) / Bachelor of Industrial Design (Honours)",
    },
    {
      degree: "Bachelor of Criminology and Psychology",
    },
  ],

  "Macquarie University": [
    {
      degree: "Bachelor of Arts",
      majors: [
        "Ancient History",
        "Anthropology",
        "Archaeology",
        "Chinese Studies",
        "Creative Writing",
        "Critical Indigenous Studies",
        "English",
        "French and Francophone Studies",
        "German Studies",
        "International Relations",
        "Italian Studies",
        "Japanese Studies",
        "Media Culture and Communications",
        "Modern History",
        "Philosophy",
        "Politics",
        "Social Justice",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Science",
      majors: [
        "Applied Physics",
        "Astronomy and Astrophysics",
        "Biology",
        "Biotechnology",
        "Chemistry",
        "Data Science",
        "Earth and Environmental Sciences",
        "Environmental Sciences",
        "Human Biology",
        "Marine Science",
        "Mathematics",
        "Medicinal Chemistry",
        "Statistical Data Science",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting and Auditing",
        "Business Analytics",
        "Business Information Systems",
        "Cyber Security Management",
        "Economics",
        "Finance",
        "Human Resource Management",
        "International Business",
        "Marketing",
        "Marketing Insights and Analytics",
      ],
    },
    {
      degree: "Bachelor of Business",
      majors: [
        "Artificial Intelligence in Business and Innovation",
        "Business Administration",
        "Human Resource Management",
        "Marketing",
        "Strategy Innovation and Entrepreneurship",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Artificial Intelligence",
        "Cyber Security",
        "Data Science",
        "Game Design and Development",
        "Information Systems and Business Analysis",
        "Software Technology",
        "Web and Mobile App Development",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Civil Engineering",
        "Electrical and Electronic Engineering",
        "Mechanical Engineering",
        "Mechatronic Engineering",
        "Software Engineering",
      ],
    },
    {
      degree: "Bachelor of Media and Communications",
      majors: [
        "Screen Practice and Production",
        "Media Culture and Communications",
      ],
    },
    {
      degree: "Bachelor of Marketing and Media",
      majors: [
        "Marketing",
        "Media Culture and Communications",
        "Public Relations and Social Media",
      ],
    },
    {
      degree: "Bachelor of Security Studies",
      majors: [
        "Intelligence",
        "Counter Terrorism",
        "Criminology",
        "Policing",
        "Cyber Security Analysis",
      ],
    },
    {
      degree: "Bachelor of Social Sciences",
      majors: [
        "Criminology",
        "Sociology",
        "Social Justice",
        "Anthropology",
        "Politics",
        "International Relations",
      ],
    },
    {
      degree: "Bachelor of Medical Sciences",
      majors: [
        "Genomics and Precision Medicine",
        "Genomics and Medical Informatics",
        "Medicinal Chemistry",
        "Human Biology",
      ],
    },
    {
      degree: "Bachelor of Health Sciences",
      majors: [
        "Digital Health",
        "Health Administration",
        "Health Coaching",
        "Mental Health and Counselling",
      ],
    },
    {
      degree: "Bachelor of Linguistics and Language Sciences",
      majors: [
        "Applied Linguistics",
        "Theoretical and Descriptive Linguistics",
      ],
    },
    {
      degree: "Bachelor of Laws",
    },
    {
      degree: "Bachelor of Psychology",
    },
    {
      degree: "Bachelor of Cognitive and Brain Sciences",
    },
    {
      degree: "Bachelor of Economics",
    },
    {
      degree: "Bachelor of Actuarial Studies",
    },
    {
      degree: "Bachelor of Applied Finance",
    },
    {
      degree: "Bachelor of Professional Accounting",
    },
    {
      degree: "Bachelor of Business Analytics",
    },
    {
      degree: "Bachelor of Cyber Security",
    },
    {
      degree: "Bachelor of Clinical Science",
    },
    {
      degree: "Bachelor of Education (Primary)",
    },
    {
      degree: "Bachelor of Education (Secondary)",
    },
    {
      degree: "Bachelor of International Studies",
    },
    {
      degree: "Bachelor of Criminology",
    },
    {
      degree: "Bachelor of Environment",
      majors: [
        "Environmental Management",
        "Environmental Sciences",
        "Earth and Environmental Sciences",
      ],
    },
    {
      degree: "Bachelor of Exercise and Sports Science",
    },
    {
      degree: "Bachelor of Speech and Hearing Sciences",
    },
    {
      degree: "Bachelor of Planning",
    },
    // Combined Degrees
    {
      degree: "Bachelor of Arts / Bachelor of Laws",
    },
    {
      degree: "Bachelor of Arts / Bachelor of Science",
    },
    {
      degree: "Bachelor of Arts / Bachelor of Commerce",
    },
    {
      degree: "Bachelor of Arts / Bachelor of Business",
    },
    {
      degree: "Bachelor of Arts / Bachelor of Information Technology",
    },
    {
      degree: "Bachelor of Commerce / Bachelor of Laws",
    },
    {
      degree: "Bachelor of Commerce / Bachelor of Science",
    },
    {
      degree: "Bachelor of Commerce / Bachelor of Economics",
    },
    {
      degree: "Bachelor of Commerce / Bachelor of Actuarial Studies",
    },
    {
      degree: "Bachelor of Commerce / Bachelor of Engineering (Honours)",
    },
    {
      degree: "Bachelor of Commerce / Bachelor of Information Technology",
    },
    {
      degree: "Bachelor of Commerce / Bachelor of Psychology",
    },
    {
      degree: "Bachelor of Business / Bachelor of Laws",
    },
    {
      degree: "Bachelor of Business / Bachelor of Science",
    },
    {
      degree: "Bachelor of Business / Bachelor of Information Technology",
    },
    {
      degree: "Bachelor of Business / Bachelor of Psychology",
    },
    {
      degree: "Bachelor of Business / Bachelor of Media and Communications",
    },
    {
      degree: "Bachelor of Science / Bachelor of Engineering (Honours)",
    },
    {
      degree: "Bachelor of Science / Bachelor of Information Technology",
    },
    {
      degree: "Bachelor of Economics / Bachelor of Laws",
    },
    {
      degree: "Bachelor of Applied Finance / Bachelor of Actuarial Studies",
    },
    {
      degree: "Bachelor of Applied Finance / Bachelor of Laws",
    },
    {
      degree: "Bachelor of Applied Finance / Bachelor of Economics",
    },
    {
      degree: "Bachelor of Criminology / Bachelor of Laws",
    },
    {
      degree: "Bachelor of Security Studies / Bachelor of Laws",
    },
    {
      degree: "Bachelor of Medical Sciences / Bachelor of Laws",
    },
    {
      degree: "Bachelor of Information Technology / Bachelor of Engineering (Honours)",
    },
  ],

  // ─── UK Universities ───────────────────────────────────────────────

  // ─── Additional Australian Universities ─────────────────────────────

  "University of Wollongong": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Biological Sciences",
        "Cell and Molecular Biology",
        "Chemistry",
        "Ecology and Conservation Biology",
        "Environmental Science",
        "Geology",
        "Marine Science",
        "Medical and Health Sciences",
        "Nutrition Science",
        "Physics",
        "Psychology",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Civil Engineering",
        "Computer Engineering",
        "Electrical Engineering",
        "Environmental Engineering",
        "Materials Engineering",
        "Mechanical Engineering",
        "Mechatronic Engineering",
        "Mining Engineering",
        "Telecommunications Engineering",
      ],
    },
    {
      degree: "Bachelor of Computer Science",
      majors: [
        "Artificial Intelligence and Big Data",
        "Cyber Security",
        "Digital Systems Security",
        "Game and Mobile Development",
        "Software Engineering",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Business Analytics",
        "Business Information Systems",
        "Cyber Security",
        "Network Design and Management",
      ],
    },
    {
      degree: "Bachelor of Business",
      majors: [
        "Accountancy",
        "Business Analytics",
        "Economics",
        "Finance",
        "Human Resource Management",
        "International Business",
        "Management",
        "Marketing",
        "Supply Chain Management",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accountancy",
        "Economics",
        "Finance",
        "Financial Planning",
        "Marketing",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Community, Culture and Environment",
        "Creative Writing",
        "English Literatures",
        "Geography",
        "Global Communications",
        "History",
        "Indigenous Studies",
        "International Relations",
        "Philosophy",
        "Politics",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Communication and Media",
      majors: [
        "Digital and Social Media",
        "Global Screen Media",
        "Journalism",
        "Marketing Communication and Advertising",
        "Public Relations",
      ],
    },
    {
      degree: "Bachelor of Psychology (Honours)",
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Exercise Science and Rehabilitation",
    },
    {
      degree: "Bachelor of Medical and Health Sciences",
    },
    {
      degree: "Bachelor of Mathematics",
      majors: [
        "Applied Statistics",
        "Financial Mathematics",
        "Mathematics",
        "Operations Research",
      ],
    },
    {
      degree: "Bachelor of Laws (Honours)",
    },
    {
      degree: "Bachelor of Education (The Early Years)",
    },
    {
      degree: "Bachelor of Primary Education",
    },
    {
      degree: "Bachelor of Social Work (Honours)",
    },
  ],

  "Queensland University of Technology": [
    {
      degree: "Bachelor of Business",
      majors: [
        "Accountancy",
        "Advertising",
        "Business Analytics",
        "Economics",
        "Finance",
        "Human Resource Management",
        "International Business",
        "Management",
        "Marketing",
        "Public Relations",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Business Process Management",
        "Computer Science",
        "Cyber Security",
        "Data Science",
        "Information Systems",
        "Software Development",
      ],
    },
    {
      degree: "Bachelor of Games and Interactive Environments",
      majors: [
        "Animation",
        "Game Design",
        "Software Technologies",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Civil Engineering",
        "Computer and Software Systems Engineering",
        "Electrical and Aerospace Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Mechatronics Engineering",
        "Medical Engineering",
      ],
    },
    {
      degree: "Bachelor of Science",
      majors: [
        "Biological Sciences",
        "Chemistry",
        "Earth Science",
        "Environmental Science",
        "Mathematics",
        "Physics",
      ],
    },
    {
      degree: "Bachelor of Mathematics",
      majors: [
        "Applied and Computational Mathematics",
        "Data Science",
        "Statistics",
      ],
    },
    {
      degree: "Bachelor of Design",
      majors: [
        "Architecture",
        "Fashion",
        "Industrial Design",
        "Interaction Design",
        "Interior Design",
        "Landscape Architecture",
      ],
    },
    {
      degree: "Bachelor of Fine Arts",
      majors: [
        "Acting",
        "Animation",
        "Creative Writing",
        "Dance",
        "Drama",
        "Film, Screen and New Media",
        "Music",
        "Visual Arts",
      ],
    },
    {
      degree: "Bachelor of Communication",
      majors: [
        "Advertising",
        "Digital Media",
        "Entertainment",
        "Journalism",
        "Media and Communication",
        "Public Relations",
      ],
    },
    {
      degree: "Bachelor of Health Science",
      majors: [
        "Health and Wellbeing",
        "Human Services",
        "Public Health",
      ],
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Sport and Exercise Science",
    },
    {
      degree: "Bachelor of Biomedical Science",
    },
    {
      degree: "Bachelor of Laws (Honours)",
    },
    {
      degree: "Bachelor of Justice",
      majors: [
        "Criminology",
        "Policy and Politics",
        "Social Justice",
      ],
    },
    {
      degree: "Bachelor of Education",
      majors: [
        "Early Childhood",
        "Primary",
        "Secondary",
      ],
    },
    {
      degree: "Bachelor of Psychology (Honours)",
    },
  ],

  "Deakin University": [
    {
      degree: "Bachelor of Arts",
      majors: [
        "Anthropology",
        "Australian Studies",
        "Criminology",
        "Digital Media",
        "History",
        "International Relations",
        "Journalism",
        "Literary Studies",
        "Philosophy",
        "Politics and Policy Studies",
        "Psychology",
        "Public Relations",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Business Analytics",
        "Economics",
        "Finance",
        "Financial Planning",
        "Human Resource Management",
        "International Trade",
        "Management",
        "Marketing",
        "Sport Management",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Application Development",
        "Cyber Security",
        "Data Science",
        "Game Design",
        "Information Systems",
        "Robotics",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Civil Engineering",
        "Electrical and Electronics Engineering",
        "Mechanical Engineering",
        "Mechatronics Engineering",
        "Software Engineering",
      ],
    },
    {
      degree: "Bachelor of Science",
      majors: [
        "Biological Sciences",
        "Cell Biology and Genetics",
        "Chemistry",
        "Environmental Science",
        "Mathematical Modelling",
        "Physics",
        "Zoology and Animal Science",
      ],
    },
    {
      degree: "Bachelor of Health Sciences",
      majors: [
        "Disability and Inclusion",
        "Family, Society and Health",
        "Food Studies",
        "Health Promotion",
        "Medical Biotechnology",
        "Physical Activity and Health",
      ],
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Exercise and Sport Science",
    },
    {
      degree: "Bachelor of Nutrition Science",
    },
    {
      degree: "Bachelor of Psychological Science",
    },
    {
      degree: "Bachelor of Criminology",
    },
    {
      degree: "Bachelor of Design",
      majors: [
        "Digital Design",
        "Graphic Design",
        "Photography",
        "Product Design",
      ],
    },
    {
      degree: "Bachelor of Communication",
      majors: [
        "Advertising",
        "Digital Media",
        "Journalism",
        "Public Relations",
      ],
    },
    {
      degree: "Bachelor of Laws (Honours)",
    },
    {
      degree: "Bachelor of Education",
      majors: [
        "Early Childhood",
        "Primary",
        "Secondary",
      ],
    },
    {
      degree: "Bachelor of Construction Management (Honours)",
    },
  ],

  "University of Newcastle": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Biology",
        "Chemistry",
        "Earth Sciences",
        "Environmental Science and Management",
        "Genetics",
        "Marine Science",
        "Mathematics",
        "Physics",
        "Psychology",
        "Statistics",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Aerospace Systems Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Computer Systems Engineering",
        "Electrical and Electronic Engineering",
        "Environmental Engineering",
        "Mechanical Engineering",
        "Mechatronics Engineering",
        "Software Engineering",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Cyber Security",
        "Data Analytics",
        "Software Development",
        "Systems and Networks",
      ],
    },
    {
      degree: "Bachelor of Computer Science",
      majors: [
        "Artificial Intelligence",
        "Cyber Security",
        "Software Development",
      ],
    },
    {
      degree: "Bachelor of Business",
      majors: [
        "Accounting",
        "Business Analytics",
        "Finance",
        "Human Resource Management",
        "International Business",
        "Management",
        "Marketing",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Economics",
        "Finance",
        "Financial Planning",
        "Marketing",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Ancient History",
        "Aboriginal Studies",
        "Creative and Professional Writing",
        "English",
        "Film, Media and Cultural Studies",
        "Geography and Environmental Studies",
        "History",
        "Linguistics",
        "Philosophy",
        "Sociology and Anthropology",
      ],
    },
    {
      degree: "Bachelor of Psychological Science",
    },
    {
      degree: "Bachelor of Psychology (Honours)",
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Midwifery",
    },
    {
      degree: "Bachelor of Medical Science",
    },
    {
      degree: "Bachelor of Biotechnology",
    },
    {
      degree: "Bachelor of Food Science and Human Nutrition (Honours)",
    },
    {
      degree: "Bachelor of Oral Health Therapy",
    },
    {
      degree: "Bachelor of Laws (Honours)",
    },
    {
      degree: "Bachelor of Social Work (Honours)",
    },
    {
      degree: "Bachelor of Development Studies (Honours)",
    },
    {
      degree: "Bachelor of Education (Primary)",
    },
    {
      degree: "Bachelor of Teaching (Secondary)",
    },
    {
      degree: "Bachelor of Construction Management (Building) (Honours)",
    },
    {
      degree: "Bachelor of Design (Architecture)",
    },
  ],

  "Griffith University": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Biomolecular Science",
        "Chemistry",
        "Ecology and Wildlife Conservation",
        "Environmental Science",
        "Marine Biology",
        "Mathematics",
        "Physics",
        "Physiology and Pharmacology",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Civil Engineering",
        "Electrical and Electronic Engineering",
        "Electronic and Computer Engineering",
        "Mechanical Engineering",
        "Mechatronic Engineering",
        "Software Engineering",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Cyber Security",
        "Data Analytics",
        "Mobile Application Development",
        "Networks and Security",
        "Software Development",
      ],
    },
    {
      degree: "Bachelor of Business",
      majors: [
        "Contemporary Marketing",
        "Human Resource Management",
        "Innovation and Entrepreneurship",
        "International Business",
        "Logistics and Supply Chain Management",
        "Management",
        "Marketing",
        "Sport Management",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Economics",
        "Finance",
        "Financial Planning",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Criminal Justice",
        "Drama",
        "History",
        "Languages",
        "Literary Studies",
        "Politics",
        "Screen Studies",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Criminology and Criminal Justice",
    },
    {
      degree: "Bachelor of Cyber Security",
    },
    {
      degree: "Bachelor of Psychological Science",
    },
    {
      degree: "Bachelor of Psychology (Honours)",
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Exercise Science",
    },
    {
      degree: "Bachelor of Public Health",
    },
    {
      degree: "Bachelor of Medical Science",
    },
    {
      degree: "Bachelor of Environmental Science",
    },
    {
      degree: "Bachelor of Laws (Honours)",
    },
    {
      degree: "Bachelor of Government and International Relations",
    },
    {
      degree: "Bachelor of Design",
      majors: [
        "Product Design",
        "User Experience Design",
        "Visual Communication Design",
      ],
    },
    {
      degree: "Bachelor of Film and Screen Media Production",
    },
    {
      degree: "Bachelor of Music",
      majors: [
        "Composition",
        "Music Technology",
        "Performance",
      ],
    },
    {
      degree: "Bachelor of Aviation",
    },
    {
      degree: "Bachelor of Education (Primary)",
    },
  ],

  "Western Sydney University": [
    {
      degree: "Bachelor of Arts",
      majors: [
        "Criminology",
        "Cultural and Social Analysis",
        "English",
        "Geography and Urban Studies",
        "History and Political Thought",
        "Human Geography",
        "International Relations",
        "Philosophy",
        "Psychological Studies",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Science",
      majors: [
        "Astrophysics",
        "Conservation Biology",
        "Environmental Health",
        "Food Science and Nutrition",
        "Forensic Science",
        "Mathematics",
        "Plant Science and Horticulture",
        "Wildlife Management",
        "Zoology",
      ],
    },
    {
      degree: "Bachelor of Business",
      majors: [
        "Accounting",
        "Applied Finance",
        "Economics",
        "Human Resource Management",
        "International Business",
        "Management",
        "Marketing",
        "Sport Management",
      ],
    },
    {
      degree: "Bachelor of Information and Communications Technology",
      majors: [
        "Cyber Security and Networking",
        "Mobile Applications Development",
        "Web and Software Development",
      ],
    },
    {
      degree: "Bachelor of Data Science",
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Civil Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Mechatronic Engineering",
        "Robotics and Mechatronics",
      ],
    },
    {
      degree: "Bachelor of Construction Management",
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Midwifery",
    },
    {
      degree: "Bachelor of Psychology (Honours)",
    },
    {
      degree: "Bachelor of Health Science",
      majors: [
        "Health Promotion",
        "Health Services Management",
        "Public Health",
      ],
    },
    {
      degree: "Bachelor of Medical Science",
    },
    {
      degree: "Bachelor of Communication",
      majors: [
        "Digital and Social Media",
        "Journalism",
        "Public Relations and Advertising",
      ],
    },
    {
      degree: "Bachelor of Design",
      majors: [
        "Visual Communication",
        "Interior Design",
      ],
    },
    {
      degree: "Bachelor of Laws",
    },
    {
      degree: "Bachelor of Social Work",
    },
    {
      degree: "Bachelor of Policing",
    },
    {
      degree: "Bachelor of Education (Primary)",
    },
    {
      degree: "Bachelor of Education (Secondary)",
    },
  ],

  "University of South Australia": [
    {
      degree: "Bachelor of Business",
      majors: [
        "Accounting",
        "Economics, Finance and Trade",
        "Human Resource Management",
        "Management",
        "Marketing",
        "Property",
        "Sport and Recreation Management",
        "Tourism and Event Management",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Finance",
        "Financial Planning",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Cyber Security",
        "Networking",
        "Software Development",
      ],
    },
    {
      degree: "Bachelor of Software Engineering (Honours)",
    },
    {
      degree: "Bachelor of Data Analytics",
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Civil Engineering",
        "Civil and Structural Engineering",
        "Electrical and Mechatronic Engineering",
        "Mechanical Engineering",
        "Mechanical and Advanced Manufacturing",
      ],
    },
    {
      degree: "Bachelor of Aviation",
    },
    {
      degree: "Bachelor of Science",
      majors: [
        "Biology",
        "Chemistry",
        "Environmental Science",
        "Geospatial Science",
        "Mathematics",
        "Physics",
      ],
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Midwifery",
    },
    {
      degree: "Bachelor of Pharmacy (Honours)",
    },
    {
      degree: "Bachelor of Psychology (Honours)",
    },
    {
      degree: "Bachelor of Physiotherapy (Honours)",
    },
    {
      degree: "Bachelor of Occupational Therapy (Honours)",
    },
    {
      degree: "Bachelor of Laws (Honours)",
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Criminology and Criminal Justice",
        "Cultural Studies",
        "Human Geography and Sociology",
        "Languages",
        "Politics and International Relations",
      ],
    },
    {
      degree: "Bachelor of Design",
      majors: [
        "Communication Design",
        "Interior Architecture",
        "Product Design",
      ],
    },
    {
      degree: "Bachelor of Architectural Studies",
    },
    {
      degree: "Bachelor of Contemporary Art",
    },
    {
      degree: "Bachelor of Media Arts",
    },
    {
      degree: "Bachelor of Education (Primary and Middle)",
    },
    {
      degree: "Bachelor of Social Work",
    },
  ],

  "Curtin University": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Applied Geology",
        "Biology",
        "Chemistry",
        "Data Science",
        "Environmental Biology",
        "Mathematics and Statistics",
        "Molecular Genetics and Biotechnology",
        "Physics",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Chemical Engineering",
        "Civil and Construction Engineering",
        "Electrical and Electronic Engineering",
        "Mechanical Engineering",
        "Mechatronic Engineering",
        "Mining Engineering",
        "Petroleum Engineering",
        "Software Engineering",
      ],
    },
    {
      degree: "Bachelor of Commerce",
      majors: [
        "Accounting",
        "Banking",
        "Business Law",
        "Economics",
        "Finance",
        "Management",
        "Marketing",
        "Supply Chain Management",
      ],
    },
    {
      degree: "Bachelor of Computing",
      majors: [
        "Computer Science",
        "Cyber Security",
        "Data Management",
        "Software Engineering",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Creative Writing",
        "Digital and Social Media",
        "Professional Writing and Publishing",
        "Screen Arts",
      ],
    },
    {
      degree: "Bachelor of Psychology",
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Pharmacy (Honours)",
    },
    {
      degree: "Bachelor of Physiotherapy",
    },
    {
      degree: "Bachelor of Health Sciences",
      majors: [
        "Health Promotion",
        "Public Health",
      ],
    },
    {
      degree: "Bachelor of Laws",
    },
    {
      degree: "Bachelor of Design",
      majors: [
        "Communication Design",
        "Fashion",
        "Graphic Design",
        "Interior Architecture",
      ],
    },
    {
      degree: "Bachelor of Applied Science (Architectural Science)",
    },
    {
      degree: "Bachelor of Education (Primary)",
    },
    {
      degree: "Bachelor of Social Work",
    },
    {
      degree: "Bachelor of Agribusiness",
    },
  ],

  "La Trobe University": [
    {
      degree: "Bachelor of Arts",
      majors: [
        "Archaeology",
        "Creative and Professional Writing",
        "English",
        "History",
        "International Relations",
        "Legal Studies",
        "Linguistics",
        "Philosophy",
        "Politics",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Science",
      majors: [
        "Biological Sciences",
        "Chemistry",
        "Ecology",
        "Genetics",
        "Mathematics",
        "Microbiology",
        "Physics",
        "Zoology",
      ],
    },
    {
      degree: "Bachelor of Business",
      majors: [
        "Accounting",
        "Economics",
        "Event Management",
        "Finance",
        "Human Resource Management",
        "Management",
        "Marketing",
        "Sport Management",
      ],
    },
    {
      degree: "Bachelor of Information Technology",
      majors: [
        "Cloud Computing",
        "Cybersecurity",
        "Software Development",
      ],
    },
    {
      degree: "Bachelor of Cybersecurity",
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Civil Engineering",
        "Electronic Engineering",
        "Industrial Engineering",
      ],
    },
    {
      degree: "Bachelor of Biomedicine",
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Midwifery",
    },
    {
      degree: "Bachelor of Psychological Science",
    },
    {
      degree: "Bachelor of Health Sciences",
      majors: [
        "Health Promotion",
        "Public Health",
      ],
    },
    {
      degree: "Bachelor of Physiotherapy (Honours)",
    },
    {
      degree: "Bachelor of Oral Health Science",
    },
    {
      degree: "Bachelor of Laws",
    },
    {
      degree: "Bachelor of Criminology",
    },
    {
      degree: "Bachelor of Media and Communication",
      majors: [
        "Journalism",
        "Media Industries",
        "Public Relations",
      ],
    },
    {
      degree: "Bachelor of Education (Primary)",
    },
    {
      degree: "Bachelor of Social Work",
    },
    {
      degree: "Bachelor of Agricultural Sciences",
    },
  ],

  "University of Tasmania": [
    {
      degree: "Bachelor of Arts",
      majors: [
        "Aboriginal Studies",
        "Criminology and Corrections",
        "English",
        "Geography and Environment",
        "History",
        "Philosophy",
        "Politics and International Relations",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Science",
      majors: [
        "Biological Sciences",
        "Chemistry",
        "Geology",
        "Mathematics and Physics",
        "Microbiology",
        "Plant Science",
        "Zoology and Animal Science",
      ],
    },
    {
      degree: "Bachelor of Marine and Antarctic Science",
      majors: [
        "Fisheries and Aquaculture",
        "Marine Biology",
        "Ocean and Antarctic Science",
      ],
    },
    {
      degree: "Bachelor of Business",
      majors: [
        "Accounting",
        "Economics",
        "Finance",
        "Human Resource Management",
        "Management",
        "Marketing",
      ],
    },
    {
      degree: "Bachelor of Information and Communication Technology",
      majors: [
        "Cybersecurity",
        "Games and Creative Technology",
        "Software Development",
      ],
    },
    {
      degree: "Bachelor of Engineering (Honours)",
      majors: [
        "Civil Engineering",
        "Electrical and Electronic Engineering",
        "Maritime Engineering",
        "Mechanical Engineering",
      ],
    },
    {
      degree: "Bachelor of Nursing",
    },
    {
      degree: "Bachelor of Psychological Science",
    },
    {
      degree: "Bachelor of Health Science",
    },
    {
      degree: "Bachelor of Medical Research",
    },
    {
      degree: "Bachelor of Pharmacy (Honours)",
    },
    {
      degree: "Bachelor of Laws",
    },
    {
      degree: "Bachelor of Education (Primary)",
    },
    {
      degree: "Bachelor of Social Work",
    },
    {
      degree: "Bachelor of Fine Arts",
    },
    {
      degree: "Bachelor of Music",
    },
    {
      degree: "Bachelor of Economics",
    },
    {
      degree: "Bachelor of Surveying and Spatial Sciences",
    },
    {
      degree: "Bachelor of Agricultural Science",
    },
  ],

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

  // ─── Additional UK Universities ─────────────────────────────────────

  "University of Edinburgh": [
    {
      degree: "BSc Computer Science",
    },
    {
      degree: "BSc Artificial Intelligence",
    },
    {
      degree: "BEng Engineering",
      majors: [
        "Chemical Engineering",
        "Civil Engineering",
        "Electrical and Electronic Engineering",
        "Mechanical Engineering",
        "Structural Engineering",
      ],
    },
    {
      degree: "BSc Mathematics",
      majors: [
        "Mathematics",
        "Mathematics and Statistics",
        "Applied Mathematics",
      ],
    },
    {
      degree: "BSc Physics and Astronomy",
      majors: [
        "Astrophysics",
        "Computational Physics",
        "Mathematical Physics",
        "Theoretical Physics",
      ],
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BSc Biological Sciences",
      majors: [
        "Biochemistry",
        "Ecology",
        "Genetics",
        "Immunology",
        "Molecular Biology",
        "Zoology",
      ],
    },
    {
      degree: "BSc Biomedical Sciences",
    },
    {
      degree: "MA Economics",
    },
    {
      degree: "MA Business",
    },
    {
      degree: "MA English Literature",
    },
    {
      degree: "MA History",
    },
    {
      degree: "MA Philosophy",
    },
    {
      degree: "MA Politics and International Relations",
    },
    {
      degree: "MA Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "BArch Architecture",
    },
    {
      degree: "BA Design",
    },
    {
      degree: "MA Geography",
    },
    {
      degree: "MBChB Medicine",
    },
    {
      degree: "BVM&S Veterinary Medicine",
    },
    {
      degree: "MA Linguistics",
    },
  ],

  "University of Manchester": [
    {
      degree: "BSc Computer Science",
      majors: [
        "Artificial Intelligence",
        "Human-Computer Interaction",
        "Software Engineering",
      ],
    },
    {
      degree: "BEng Engineering",
      majors: [
        "Aerospace Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Electrical and Electronic Engineering",
        "Mechanical Engineering",
      ],
    },
    {
      degree: "BSc Mathematics",
      majors: [
        "Mathematics",
        "Mathematics and Statistics",
        "Mathematics with Finance",
      ],
    },
    {
      degree: "BSc Physics",
      majors: [
        "Physics",
        "Physics with Astrophysics",
        "Theoretical Physics",
      ],
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BSc Biological Sciences",
      majors: [
        "Biochemistry",
        "Biotechnology",
        "Genetics",
        "Microbiology",
        "Molecular Biology",
        "Neuroscience",
        "Zoology",
      ],
    },
    {
      degree: "BSc Economics",
    },
    {
      degree: "BSc Accounting and Finance",
    },
    {
      degree: "BSc Management",
      majors: [
        "Human Resources",
        "Innovation, Strategy and Entrepreneurship",
        "International Business Economics",
        "Marketing",
      ],
    },
    {
      degree: "BA English Literature",
    },
    {
      degree: "BA History",
    },
    {
      degree: "BA Philosophy",
    },
    {
      degree: "BA Politics",
    },
    {
      degree: "BSc Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "BA Modern Languages",
      majors: [
        "French",
        "German",
        "Italian",
        "Japanese",
        "Chinese",
        "Spanish",
        "Russian",
      ],
    },
    {
      degree: "BA Architecture",
    },
    {
      degree: "MBChB Medicine",
    },
    {
      degree: "BDS Dentistry",
    },
    {
      degree: "MPharm Pharmacy",
    },
    {
      degree: "BNurs Nursing",
    },
    {
      degree: "BSc Earth and Environmental Sciences",
    },
  ],

  "King's College London": [
    {
      degree: "BSc Computer Science",
    },
    {
      degree: "BEng Engineering",
      majors: [
        "Biomedical Engineering",
        "Electronic Engineering",
        "General Engineering",
        "Mechanical Engineering",
      ],
    },
    {
      degree: "BSc Mathematics",
      majors: [
        "Mathematics",
        "Mathematics with Management and Finance",
        "Mathematics and Philosophy",
      ],
    },
    {
      degree: "BSc Physics",
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BSc Neuroscience",
    },
    {
      degree: "BSc Biomedical Science",
    },
    {
      degree: "BSc Nutrition",
    },
    {
      degree: "BSc Economics",
    },
    {
      degree: "BSc Business Management",
    },
    {
      degree: "BA English",
    },
    {
      degree: "BA History",
    },
    {
      degree: "BA Philosophy",
    },
    {
      degree: "BA War Studies",
    },
    {
      degree: "BA International Relations",
    },
    {
      degree: "BSc Political Economy",
    },
    {
      degree: "BSc Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "BA Liberal Arts",
    },
    {
      degree: "BA Modern Languages",
      majors: [
        "French",
        "German",
        "Spanish",
        "Portuguese",
      ],
    },
    {
      degree: "MBBS Medicine",
    },
    {
      degree: "BDS Dentistry",
    },
    {
      degree: "MPharm Pharmacy",
    },
    {
      degree: "BSc Nursing",
    },
    {
      degree: "BSc Midwifery",
    },
    {
      degree: "BSc Physiotherapy",
    },
  ],

  "University of Warwick": [
    {
      degree: "BSc Computer Science",
    },
    {
      degree: "BSc Data Science",
    },
    {
      degree: "BSc Cyber Security",
    },
    {
      degree: "BEng Engineering",
      majors: [
        "Automotive Engineering",
        "Civil Engineering",
        "Electrical and Electronic Engineering",
        "Mechanical Engineering",
        "Systems Engineering",
      ],
    },
    {
      degree: "BSc Mathematics",
    },
    {
      degree: "BSc MORSE (Mathematics, Operational Research, Statistics and Economics)",
    },
    {
      degree: "BSc Physics",
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BSc Biological Sciences",
    },
    {
      degree: "BSc Economics",
    },
    {
      degree: "BSc Accounting and Finance",
    },
    {
      degree: "BSc Management",
    },
    {
      degree: "BA English Literature",
    },
    {
      degree: "BA History",
    },
    {
      degree: "BA Philosophy",
    },
    {
      degree: "BA Philosophy, Politics and Economics",
    },
    {
      degree: "BA Politics and International Studies",
    },
    {
      degree: "BSc Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "BA Liberal Arts",
    },
    {
      degree: "BA Modern Languages and Cultures",
      majors: [
        "French",
        "German",
        "Italian",
        "Spanish",
      ],
    },
    {
      degree: "BA Film and Television Studies",
    },
    {
      degree: "BA Sociology",
    },
    {
      degree: "BASc Global Sustainable Development",
    },
  ],

  "University of Bristol": [
    {
      degree: "BSc Computer Science",
    },
    {
      degree: "BSc Artificial Intelligence",
    },
    {
      degree: "MEng Engineering",
      majors: [
        "Aerospace Engineering",
        "Civil Engineering",
        "Design Engineering",
        "Electrical and Electronic Engineering",
        "Engineering Mathematics",
        "Mechanical Engineering",
      ],
    },
    {
      degree: "BSc Mathematics",
    },
    {
      degree: "BSc Physics",
      majors: [
        "Physics",
        "Physics with Astrophysics",
        "Theoretical Physics",
      ],
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BSc Biological Sciences",
    },
    {
      degree: "BSc Biomedical Sciences",
    },
    {
      degree: "BSc Neuroscience",
    },
    {
      degree: "BSc Economics",
    },
    {
      degree: "BSc Accounting and Finance",
    },
    {
      degree: "BSc Business and Management",
    },
    {
      degree: "BA English",
    },
    {
      degree: "BA History",
    },
    {
      degree: "BA Philosophy",
    },
    {
      degree: "BSc Politics and International Relations",
    },
    {
      degree: "BSc Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "BA Liberal Arts",
    },
    {
      degree: "BA Modern Languages",
      majors: [
        "French",
        "German",
        "Italian",
        "Spanish",
        "Russian",
        "Portuguese",
      ],
    },
    {
      degree: "BSc Geography",
    },
    {
      degree: "MBChB Medicine",
    },
    {
      degree: "BDS Dentistry",
    },
    {
      degree: "BVSc Veterinary Science",
    },
    {
      degree: "BSc Economics and Accounting",
    },
  ],

  "University of Leeds": [
    {
      degree: "BSc Computer Science",
      majors: [
        "Artificial Intelligence",
        "Cyber Security",
        "Data Science",
      ],
    },
    {
      degree: "BEng Engineering",
      majors: [
        "Aeronautical and Aerospace Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Electronic and Electrical Engineering",
        "Mechanical Engineering",
        "Mechatronics and Robotics",
      ],
    },
    {
      degree: "BSc Mathematics",
    },
    {
      degree: "BSc Physics",
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BSc Biological Sciences",
    },
    {
      degree: "BSc Biomedical Sciences",
    },
    {
      degree: "BSc Economics",
    },
    {
      degree: "BSc Accounting and Finance",
    },
    {
      degree: "BSc Business Management",
    },
    {
      degree: "BA English",
    },
    {
      degree: "BA History",
    },
    {
      degree: "BA Philosophy",
    },
    {
      degree: "BA International Relations",
    },
    {
      degree: "BSc Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "BA Modern Languages",
      majors: [
        "French",
        "German",
        "Spanish",
        "Chinese",
      ],
    },
    {
      degree: "BSc Geography",
    },
    {
      degree: "BA Fine Art",
    },
    {
      degree: "BA Music",
    },
    {
      degree: "MBChB Medicine",
    },
    {
      degree: "BChD Dentistry",
    },
    {
      degree: "BA Design",
    },
  ],

  "Coventry University": [
    {
      degree: "BSc Computer Science",
      majors: [
        "Artificial Intelligence",
        "Cyber Security",
        "Data Science",
      ],
    },
    {
      degree: "BSc Ethical Hacking and Cybersecurity",
    },
    {
      degree: "BEng Mechanical Engineering",
    },
    {
      degree: "BEng Aerospace Engineering",
    },
    {
      degree: "BEng Automotive Engineering",
    },
    {
      degree: "BEng Motorsport Engineering",
    },
    {
      degree: "BSc Mathematics",
    },
    {
      degree: "BSc Biological Sciences",
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BA Accounting and Finance",
    },
    {
      degree: "BA Business Management",
    },
    {
      degree: "BA Economics",
    },
    {
      degree: "BSc Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "BSc Nursing (Adult)",
    },
    {
      degree: "BSc Midwifery",
    },
    {
      degree: "BSc Sport and Exercise Science",
    },
    {
      degree: "BA Media Production",
    },
    {
      degree: "BA Journalism",
    },
    {
      degree: "BA Graphic Design",
    },
    {
      degree: "BSc Games Technology",
    },
    {
      degree: "BA Architecture",
    },
    {
      degree: "BA Sociology and Criminology",
    },
    {
      degree: "BA International Relations",
    },
  ],

  "University of Birmingham": [
    {
      degree: "BSc Computer Science",
      majors: [
        "Artificial Intelligence and Machine Learning",
        "Software Engineering",
      ],
    },
    {
      degree: "BEng Engineering",
      majors: [
        "Chemical Engineering",
        "Civil Engineering",
        "Electronic and Electrical Engineering",
        "Mechanical Engineering",
      ],
    },
    {
      degree: "BSc Mathematics",
    },
    {
      degree: "BSc Physics",
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BSc Biological Sciences",
    },
    {
      degree: "BSc Biomedical Science",
    },
    {
      degree: "BSc Economics",
    },
    {
      degree: "BSc Accounting and Finance",
    },
    {
      degree: "BSc Business Management",
    },
    {
      degree: "BA English Literature",
    },
    {
      degree: "BA History",
    },
    {
      degree: "BA Philosophy",
    },
    {
      degree: "BA Political Science",
    },
    {
      degree: "BA International Relations",
    },
    {
      degree: "BSc Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "BSc Geography",
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
      degree: "BMus Music",
    },
    {
      degree: "BSc Sport and Exercise Sciences",
    },
    {
      degree: "MBChB Medicine",
    },
    {
      degree: "BDS Dentistry",
    },
    {
      degree: "BNurs Nursing",
    },
  ],

  "University of Nottingham": [
    {
      degree: "BSc Computer Science",
      majors: [
        "Artificial Intelligence",
        "Data Science",
      ],
    },
    {
      degree: "BEng Engineering",
      majors: [
        "Aerospace Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Electrical and Electronic Engineering",
        "Mechanical Engineering",
      ],
    },
    {
      degree: "BSc Mathematics",
    },
    {
      degree: "BSc Physics",
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BSc Biology",
    },
    {
      degree: "BSc Biomedical Sciences",
    },
    {
      degree: "BSc Economics",
    },
    {
      degree: "BSc Finance, Accounting and Management",
    },
    {
      degree: "BSc Management",
    },
    {
      degree: "BA English",
    },
    {
      degree: "BA History",
    },
    {
      degree: "BA Philosophy",
    },
    {
      degree: "BA Politics and International Relations",
    },
    {
      degree: "BSc Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "BA Geography",
    },
    {
      degree: "BA Modern Languages",
      majors: [
        "French",
        "German",
        "Spanish",
        "Russian",
      ],
    },
    {
      degree: "BMus Music",
    },
    {
      degree: "BArch Architecture",
    },
    {
      degree: "MBBS Medicine",
    },
    {
      degree: "BVMedSci Veterinary Medicine and Science",
    },
    {
      degree: "MPharm Pharmacy",
    },
    {
      degree: "BSc Nursing",
    },
  ],

  "University of Glasgow": [
    {
      degree: "BSc Computing Science",
    },
    {
      degree: "BEng Engineering",
      majors: [
        "Aerospace Engineering",
        "Civil Engineering",
        "Electronics and Electrical Engineering",
        "Mechanical Engineering",
        "Software Engineering",
      ],
    },
    {
      degree: "BSc Mathematics",
    },
    {
      degree: "BSc Physics and Astronomy",
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BSc Life Sciences",
      majors: [
        "Biochemistry",
        "Genetics",
        "Immunology",
        "Microbiology",
        "Molecular Biology",
        "Neuroscience",
      ],
    },
    {
      degree: "MA Economics",
    },
    {
      degree: "BAcc Accountancy",
    },
    {
      degree: "MA Business and Management",
    },
    {
      degree: "MA English Literature",
    },
    {
      degree: "MA History",
    },
    {
      degree: "MA Philosophy",
    },
    {
      degree: "MA Politics",
    },
    {
      degree: "MA International Relations",
    },
    {
      degree: "MA Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "MA Geography",
    },
    {
      degree: "MA Modern Languages",
      majors: [
        "French",
        "German",
        "Spanish",
        "Russian",
      ],
    },
    {
      degree: "BMus Music",
    },
    {
      degree: "MBChB Medicine",
    },
    {
      degree: "BDS Dentistry",
    },
    {
      degree: "BVMS Veterinary Medicine and Surgery",
    },
    {
      degree: "BN Nursing",
    },
  ],

  "Queen Mary University of London": [
    {
      degree: "BSc Computer Science",
      majors: [
        "Artificial Intelligence",
        "Games Development",
      ],
    },
    {
      degree: "BEng Engineering",
      majors: [
        "Biomedical Engineering",
        "Electronic Engineering",
        "Materials Science and Engineering",
        "Mechanical Engineering",
      ],
    },
    {
      degree: "BSc Mathematics",
    },
    {
      degree: "BSc Physics",
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BSc Biological Sciences",
    },
    {
      degree: "BSc Biomedical Sciences",
    },
    {
      degree: "BSc Economics",
    },
    {
      degree: "BSc Accounting and Management",
    },
    {
      degree: "BSc Business Management",
    },
    {
      degree: "BA English",
    },
    {
      degree: "BA History",
    },
    {
      degree: "BA Film Studies",
    },
    {
      degree: "BA Politics",
    },
    {
      degree: "BA International Relations",
    },
    {
      degree: "BSc Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "BA Geography",
    },
    {
      degree: "BA Drama",
    },
    {
      degree: "BA Comparative Literature",
    },
    {
      degree: "MBBS Medicine",
    },
    {
      degree: "BDS Dentistry",
    },
    {
      degree: "BSc Global Health",
    },
  ],

  "Cardiff University": [
    {
      degree: "BSc Computer Science",
      majors: [
        "Artificial Intelligence",
        "Cyber Security",
        "Software Engineering",
      ],
    },
    {
      degree: "BEng Engineering",
      majors: [
        "Civil Engineering",
        "Electrical and Electronic Engineering",
        "Integrated Engineering",
        "Mechanical Engineering",
      ],
    },
    {
      degree: "BSc Mathematics",
    },
    {
      degree: "BSc Physics and Astronomy",
    },
    {
      degree: "BSc Chemistry",
    },
    {
      degree: "BSc Biological Sciences",
    },
    {
      degree: "BSc Biomedical Science",
    },
    {
      degree: "BSc Economics",
    },
    {
      degree: "BSc Accounting and Finance",
    },
    {
      degree: "BSc Business Management",
    },
    {
      degree: "BA English Literature",
    },
    {
      degree: "BA History",
    },
    {
      degree: "BA Philosophy",
    },
    {
      degree: "BSc Politics and International Relations",
    },
    {
      degree: "BSc Psychology",
    },
    {
      degree: "LLB Law",
    },
    {
      degree: "BSc Geography",
    },
    {
      degree: "BA Journalism, Media and Culture",
    },
    {
      degree: "BSc Architecture",
    },
    {
      degree: "BMus Music",
    },
    {
      degree: "MBBCh Medicine",
    },
    {
      degree: "BDS Dentistry",
    },
    {
      degree: "MPharm Pharmacy",
    },
    {
      degree: "BSc Nursing",
    },
  ],

  // ─── United States Universities ─────────────────────────────────────

  "Massachusetts Institute of Technology": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Aerospace Engineering",
        "Anthropology",
        "Architecture",
        "Artificial Intelligence and Decision Making",
        "Biological Engineering",
        "Biology",
        "Brain and Cognitive Sciences",
        "Business Analytics",
        "Chemical Engineering",
        "Chemistry",
        "Civil and Environmental Engineering",
        "Comparative Media Studies",
        "Computer Science and Engineering",
        "Computer Science and Molecular Biology",
        "Computer Science, Economics, and Data Science",
        "Earth, Atmospheric, and Planetary Sciences",
        "Economics",
        "Electrical Engineering and Computer Science",
        "Finance",
        "Linguistics and Philosophy",
        "Management",
        "Materials Science and Engineering",
        "Mathematics",
        "Mathematics with Computer Science",
        "Mechanical Engineering",
        "Music",
        "Nuclear Science and Engineering",
        "Physics",
        "Political Science",
        "Urban Studies and Planning",
        "Writing",
      ],
    },
  ],

  "Stanford University": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Aeronautics and Astronautics",
        "Bioengineering",
        "Biology",
        "Chemical Engineering",
        "Chemistry",
        "Civil Engineering",
        "Computer Science",
        "Data Science",
        "Earth Systems",
        "Electrical Engineering",
        "Environmental Systems Engineering",
        "Geophysics",
        "Human Biology",
        "Materials Science and Engineering",
        "Mathematics",
        "Mechanical Engineering",
        "Physics",
        "Statistics",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Anthropology",
        "Art History",
        "Classics",
        "Communication",
        "Comparative Literature",
        "East Asian Studies",
        "Economics",
        "English",
        "History",
        "International Relations",
        "Linguistics",
        "Music",
        "Philosophy",
        "Political Science",
        "Psychology",
        "Public Policy",
        "Religious Studies",
        "Sociology",
        "Theater and Performance Studies",
        "Urban Studies",
      ],
    },
  ],

  "Harvard University": [
    {
      degree: "Bachelor of Arts",
      majors: [
        "African and African American Studies",
        "Anthropology",
        "Applied Mathematics",
        "Art, Film, and Visual Studies",
        "Astrophysics",
        "Bioengineering",
        "Biomedical Engineering",
        "Chemistry",
        "Classics",
        "Comparative Literature",
        "Computer Science",
        "Earth and Planetary Sciences",
        "Economics",
        "Electrical Engineering",
        "English",
        "Environmental Science and Engineering",
        "Government",
        "History",
        "History of Art and Architecture",
        "Human Developmental and Regenerative Biology",
        "Linguistics",
        "Mathematics",
        "Mechanical Engineering",
        "Molecular and Cellular Biology",
        "Music",
        "Neuroscience",
        "Philosophy",
        "Physics",
        "Psychology",
        "Religion",
        "Sociology",
        "Statistics",
        "Theater, Dance, and Media",
      ],
    },
  ],

  "University of California, Berkeley": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Bioengineering",
        "Chemical Engineering",
        "Chemistry",
        "Civil Engineering",
        "Computer Science",
        "Data Science",
        "Electrical Engineering and Computer Sciences",
        "Environmental Engineering Science",
        "Industrial Engineering and Operations Research",
        "Materials Science and Engineering",
        "Mechanical Engineering",
        "Nuclear Engineering",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Anthropology",
        "Architecture",
        "Art History",
        "Astrophysics",
        "Biology",
        "Cognitive Science",
        "Comparative Literature",
        "Economics",
        "English",
        "Environmental Science",
        "Ethnic Studies",
        "Film",
        "Geography",
        "History",
        "Legal Studies",
        "Linguistics",
        "Mathematics",
        "Molecular and Cell Biology",
        "Philosophy",
        "Physics",
        "Political Science",
        "Psychology",
        "Public Health",
        "Sociology",
        "Statistics",
      ],
    },
    {
      degree: "Bachelor of Science in Business Administration",
    },
  ],

  "University of California, Los Angeles": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Aerospace Engineering",
        "Bioengineering",
        "Biology",
        "Chemical Engineering",
        "Chemistry",
        "Civil Engineering",
        "Computer Science",
        "Electrical Engineering",
        "Environmental Science",
        "Mathematics",
        "Mechanical Engineering",
        "Microbiology, Immunology and Molecular Genetics",
        "Neuroscience",
        "Physics",
        "Physiological Science",
        "Statistics and Data Science",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "African American Studies",
        "Anthropology",
        "Art History",
        "Asian Studies",
        "Communication",
        "Comparative Literature",
        "Economics",
        "English",
        "Film and Television",
        "Geography",
        "History",
        "International Development Studies",
        "Linguistics",
        "Musicology",
        "Philosophy",
        "Political Science",
        "Psychology",
        "Sociology",
        "Spanish",
        "World Arts and Cultures",
      ],
    },
    {
      degree: "Bachelor of Arts in Business Economics",
    },
  ],

  "Arizona State University": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Aerospace Engineering",
        "Biological Sciences",
        "Biomedical Sciences",
        "Civil Engineering",
        "Computer Science",
        "Data Science",
        "Electrical Engineering",
        "Environmental Science",
        "Mathematics",
        "Mechanical Engineering",
        "Physics",
        "Psychology",
        "Software Engineering",
      ],
    },
    {
      degree: "Bachelor of Science in Business",
      majors: [
        "Accountancy",
        "Business Analytics",
        "Finance",
        "Management",
        "Marketing",
        "Supply Chain Management",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Communication",
        "Economics",
        "English",
        "Film and Media Studies",
        "Global Studies",
        "History",
        "Philosophy",
        "Political Science",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Fine Arts",
      majors: [
        "Art",
        "Dance",
        "Music",
        "Theatre",
      ],
    },
    {
      degree: "Bachelor of Science in Nursing",
    },
  ],

  "New York University": [
    {
      degree: "Bachelor of Arts",
      majors: [
        "Computer Science",
        "Economics",
        "English",
        "History",
        "Journalism",
        "Mathematics",
        "Media, Culture, and Communication",
        "Neural Science",
        "Philosophy",
        "Politics",
        "Psychology",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Science in Business",
      majors: [
        "Accounting",
        "Finance",
        "Management",
        "Marketing",
        "Business Analytics",
      ],
    },
    {
      degree: "Bachelor of Science",
      majors: [
        "Biology",
        "Chemistry",
        "Data Science",
        "Nursing",
        "Physics",
      ],
    },
    {
      degree: "Bachelor of Fine Arts",
      majors: [
        "Dance",
        "Drama",
        "Film and Television",
        "Game Design",
        "Photography and Imaging",
      ],
    },
    {
      degree: "Bachelor of Music",
    },
  ],

  "University of Southern California": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Aerospace Engineering",
        "Biomedical Engineering",
        "Business Administration",
        "Civil Engineering",
        "Computer Science",
        "Electrical Engineering",
        "Mechanical Engineering",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Communication",
        "Economics",
        "English",
        "History",
        "International Relations",
        "Political Science",
        "Psychology",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Fine Arts",
      majors: [
        "Acting",
        "Animation and Digital Arts",
        "Film and Television Production",
        "Fine Arts",
      ],
    },
    {
      degree: "Bachelor of Architecture",
    },
    {
      degree: "Bachelor of Music",
      majors: [
        "Composition",
        "Jazz Studies",
        "Performance",
      ],
    },
    {
      degree: "Bachelor of Journalism",
    },
  ],

  "University of Texas at Austin": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Aerospace Engineering",
        "Biology",
        "Biomedical Engineering",
        "Chemical Engineering",
        "Chemistry",
        "Civil Engineering",
        "Computer Science",
        "Electrical and Computer Engineering",
        "Mathematics",
        "Mechanical Engineering",
        "Neuroscience",
        "Physics",
      ],
    },
    {
      degree: "Bachelor of Business Administration",
      majors: [
        "Accounting",
        "Finance",
        "Management",
        "Management Information Systems",
        "Marketing",
        "Supply Chain Management",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Economics",
        "English",
        "Government",
        "History",
        "International Relations and Global Studies",
        "Philosophy",
        "Psychology",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Science in Radio-Television-Film",
    },
    {
      degree: "Bachelor of Journalism",
    },
    {
      degree: "Bachelor of Architecture",
    },
  ],

  "Pennsylvania State University": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Aerospace Engineering",
        "Biology",
        "Chemical Engineering",
        "Civil Engineering",
        "Computer Science",
        "Data Sciences",
        "Electrical Engineering",
        "Industrial Engineering",
        "Kinesiology",
        "Mathematics",
        "Mechanical Engineering",
        "Meteorology and Atmospheric Science",
        "Physics",
      ],
    },
    {
      degree: "Bachelor of Science in Business",
      majors: [
        "Accounting",
        "Finance",
        "Management",
        "Management Information Systems",
        "Marketing",
        "Supply Chain and Information Systems",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Communications",
        "Economics",
        "English",
        "History",
        "Political Science",
        "Psychology",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Science in Nursing",
    },
    {
      degree: "Bachelor of Architecture",
    },
  ],

  "University of Central Florida": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Aerospace Engineering",
        "Biology",
        "Biomedical Sciences",
        "Civil Engineering",
        "Computer Science",
        "Electrical Engineering",
        "Health Sciences",
        "Information Technology",
        "Mechanical Engineering",
        "Nursing",
        "Physics",
        "Psychology",
      ],
    },
    {
      degree: "Bachelor of Science in Business Administration",
      majors: [
        "Accounting",
        "Economics",
        "Finance",
        "Integrated Business",
        "Management",
        "Marketing",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Communication and Conflict",
        "Digital Media",
        "English",
        "History",
        "Political Science",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Science in Hospitality Management",
    },
    {
      degree: "Bachelor of Fine Arts",
      majors: [
        "Film",
        "Theatre",
        "Visual Arts and Emerging Media",
      ],
    },
  ],

  "Northeastern University": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Behavioral Neuroscience",
        "Bioengineering",
        "Biology",
        "Chemical Engineering",
        "Civil Engineering",
        "Computer Science",
        "Data Science",
        "Electrical Engineering",
        "Health Science",
        "Industrial Engineering",
        "Mathematics",
        "Mechanical Engineering",
        "Physics",
      ],
    },
    {
      degree: "Bachelor of Science in Business Administration",
      majors: [
        "Accounting",
        "Entrepreneurship",
        "Finance",
        "Management",
        "Marketing",
        "Supply Chain Management",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Communication Studies",
        "Economics",
        "English",
        "History",
        "International Affairs",
        "Media and Screen Studies",
        "Political Science",
        "Psychology",
      ],
    },
    {
      degree: "Bachelor of Science in Nursing",
    },
    {
      degree: "Bachelor of Science in Architecture",
    },
  ],

  "University of Illinois Urbana-Champaign": [
    {
      degree: "Bachelor of Science",
      majors: [
        "Aerospace Engineering",
        "Bioengineering",
        "Biology",
        "Chemistry",
        "Civil Engineering",
        "Computer Science",
        "Data Science",
        "Electrical Engineering",
        "Industrial Engineering",
        "Materials Science and Engineering",
        "Mathematics",
        "Mechanical Engineering",
        "Physics",
        "Statistics",
      ],
    },
    {
      degree: "Bachelor of Science in Business",
      majors: [
        "Accountancy",
        "Finance",
        "Information Systems",
        "Management",
        "Marketing",
        "Supply Chain Management",
      ],
    },
    {
      degree: "Bachelor of Arts",
      majors: [
        "Communication",
        "Economics",
        "English",
        "History",
        "Political Science",
        "Psychology",
        "Sociology",
      ],
    },
    {
      degree: "Bachelor of Science in Agricultural Sciences",
    },
    {
      degree: "Bachelor of Fine Arts",
      majors: [
        "Art and Design",
        "Music",
        "Theatre",
      ],
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
