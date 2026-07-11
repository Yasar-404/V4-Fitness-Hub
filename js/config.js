
    var RM =
        window.matchMedia &&
        matchMedia("(prefers-reduced-motion:reduce)").matches;

    var WA_KODU = "919080231838";
    var WA_MADH = "917845100604";



    /* ==========================================================
       SVG ICONS
    ========================================================== */

    var ICON = {

        strength:
            '<path d="M6 6h2v12H6zM16 6h2v12h-2zM3 9h3v6H3zM18 9h3v6h-3zM8 11h8v2H8z"/>',

        fat:
            '<path d="M12 3a9 9 0 1 0 9 9M12 7v5l3 2"/>',

        muscle:
            '<path d="M4 14s2-2 5-2 4 3 7 3 4-2 4-2M4 9s2 2 5 2 4-3 7-3 4 2 4 2"/>',

        pt:
            '<circle cx="12" cy="7" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/>',

        func:
            '<path d="M12 2v20M5 7l7-5 7 5M5 17l7 5 7-5"/>',

        sport:
            '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',

        injury:
            '<path d="M12 2v6M9 5h6M5 11l4-2 6 6 4-2M4 20l4-5 4 4 4-3 4 4"/>',

        physio:
            '<path d="M19 14c1.5-1.5 3-3.5 3-5.5A4.5 4.5 0 0 0 12 6 4.5 4.5 0 0 0 2 8.5c0 2 1.5 4 3 5.5l7 7Z"/>',

        nutri:
            '<path d="M12 22c5-4 8-8 8-13a4 4 0 0 0-8 0 4 4 0 0 0-8 0c0 5 3 9 8 13ZM12 9v13"/>'

    };

    /* ==========================================================
   SERVICES DATA
========================================================== */

var services = [

    {
        ic: "strength",
        t: "Strength Training",
        d: "Progressive overload programming to build raw, usable strength."
    },

    {
        ic: "fat",
        t: "Fat Loss Programs",
        d: "Metabolic conditioning and structured nutrition to shed fat sustainably."
    },

    {
        ic: "muscle",
        t: "Muscle Building",
        d: "Hypertrophy blocks engineered for lean, visible muscle gain."
    },

    {
        ic: "pt",
        t: "Personal Training",
        d: "One-on-one coaching with a plan tailored to your body and schedule."
    },

    {
        ic: "func",
        t: "Functional Training",
        d: "Move better in real life — mobility, balance and athletic capacity."
    },

    {
        ic: "sport",
        t: "Sports Conditioning",
        d: "Speed, power and endurance work for competitive athletes."
    },

    {
        ic: "injury",
        t: "Injury Rehabilitation",
        d: "Return to training safely with supervised, staged recovery."
    },

    {
        ic: "physio",
        t: "Physiotherapy Support",
        d: "Clinical assessment and hands-on therapy at our Madhavaram facility."
    },

    {
        ic: "nutri",
        t: "Nutrition Guidance",
        d: "Practical, India-friendly meal planning that fits your goal."
    }

];
/* ==========================================================
   TIMELINE DATA
========================================================== */

var timeline = [

    {
        yr: "THE START",
        t: "A floor with a standard",
        d: "V4 Fitness Hub opens in Kodungaiyur with coached, measured training."
    },

    {
        yr: "THE GROWTH",
        t: "Community over crowd",
        d: "A members-first culture builds a thousand-plus transformation stories."
    },

    {
        yr: "THE LEAP",
        t: "Rehab joins the mission",
        d: "V4 Fitness & Rehab opens in Madhavaram — recovery meets performance."
    },

    {
        yr: "TODAY",
        t: "Two branches, one system",
        d: "A premium training and rehabilitation brand across North Chennai."
    }

];



/* ==========================================================
   WHY CHOOSE US DATA
========================================================== */

var whyBars = [

    {
        t: "Certified trainers",
        v: 96
    },

    {
        t: "Latest equipment",
        v: 92
    },

    {
        t: "Customised programs",
        v: 98
    },

    {
        t: "Rehab expertise",
        v: 90
    },

    {
        t: "Transformation tracking",
        v: 94
    },

    {
        t: "Nutrition planning",
        v: 88
    }

];

/* ==========================================================
   TRANSFORMATION DATA
========================================================== */

var transformations = [

    {
        meta: "16 WEEKS",
        before: "images/before1.png",
        after: "images/after1.png"
    },

    {
        meta: "24 WEEKS",
        before: "images/before2.png",
        after: "images/after2.png"
    },

    {
        meta: "POST-INJURY",
        before: "images/before3.png",
        after: "images/after3.png"
    }

];



/* ==========================================================
   EQUIPMENT DATA
========================================================== */

var EQ_IMG = "https://images.unsplash.com/photo-";

var equipment = [

    {
        t: "Strength Machines",
        img: EQ_IMG + "1722925541321-f52d45b29c17?w=900&q=80&auto=format&fit=crop",
        specs: [
            "Plate-loaded press",
            "Cable crossover",
            "Leg press 400kg"
        ]
    },

    {
        t: "Cardio Zone",
        img: EQ_IMG + "1578874691223-64558a3ca096?w=900&q=80&auto=format&fit=crop",
        specs: [
            "Treadmills",
            "Air bikes",
            "Rowing ergs"
        ]
    },

    {
        t: "Functional Area",
        img: EQ_IMG + "1676655079738-af54dfd6318e?w=900&q=80&auto=format&fit=crop",
        specs: [
            "Turf sled track",
            "Battle ropes",
            "Rig & rings"
        ]
    },

    {
        t: "Free Weight Zone",
        img: EQ_IMG + "1734630341082-0fec0e10126c?w=900&q=80&auto=format&fit=crop",
        specs: [
            "Olympic platforms",
            "Dumbbells to 50kg",
            "Calibrated plates"
        ]
    }

];

/* ==========================================================
   MEMBERSHIP PLANS
========================================================== */

var plans = [

    {
        name: "Monthly",
        price: "₹1,999",
        per: "/mo",
        save: "",
        pop: false,

        f: [
            "Full gym access",
            "Group classes",
            "Trainer Support",
            "Fitness assessment"
        ]
    },

    {
        name: "Quarterly",
        price: "₹4,999",
        per: "/3 mo",
        save: "Save ~17%",
        pop: false,

        f: [
            "Everything in Monthly",
            "1 PT session / mo",
            "Diet consultation",
            "Progress tracking"
        ]
    },

    {
        name: "Half Yearly",
        price: "₹7,999",
        per: "/6 mo",
        save: "Save ~25%",
        pop: true,

        f: [
            "Everything in Quarterly",
            "1 PT sessions / mo",
            "Body composition scans",
            "Priority class booking"
        ]
    },

    {
        name: "Annual",
        price: "₹11,999",
        per: "/yr",
        save: "Best value",
        pop: false,

        f: [
            "Everything in Half Yearly",
            "1 PT sessions / mo",
            "Free rehab assessment",
            "Guest passes ×4"
        ]
    }

];



/* ==========================================================
   TRAINERS DATA
========================================================== */

var trainers = [

    {
        n: "Lingeshwaran",
        role: "HEAD COACH · SPORTS PERFORMANCE",
        cert: "NASM-CPT · 8+ yrs",
        img: "images/coach1.jpg",
        ig: "https://www.instagram.com/coach_lingesh/"
    },

    {
        n: "Dinesh",
        role: "REHAB SPECIALIST",
        cert: "Personal Trainer · Nutrition · 5+ yrs",
        img: "images/coach2.png",
        ig: "https://www.instagram.com/dineshdina_official/"
    },

    {
        n: "Akash",
        role: "FAT LOSS · CONDITIONING",
        cert: "ACE-CPT · 3+ yrs",
        img: "images/coach3.jpg",
        ig: "https://www.instagram.com/akash.fit_/"
    },

    {
        n: "Mubarak",
        role: "FUNCTIONAL · MOBILITY",
        cert: "Kettlebell L2 · Athletic prep",
        img: "images/coach4.jpg",
        ig: "https://www.instagram.com/mubaraksaifshariff/"
    },

];

/* ==========================================================
   TESTIMONIALS
========================================================== */

var testimonials = [

    {
        q: "Lost 14kg in five months and I have never felt stronger. The coaching is genuinely personal.",
        n: "Kavya, Kodungaiyur",
        m: "★★★★★"
    },

    {
        q: "After my knee surgery, the Madhavaram rehab team got me back to lifting safely. Worth every rupee.",
        n: "Vignesh, Madhavaram",
        m: "★★★★"
    },

    {
        q: "Clean equipment, real programming, no crowd. It feels like a premium club, not a local gym.",
        n: "Arun, Kodungaiyur",
        m: "★★★★★"
    },

    {
        q: "They track everything. Seeing my numbers improve week on week kept me consistent.",
        n: "Priya, Madhavaram",
        m: "★★★★"
    },

    {
        q: "The trainers genuinely care about your progress and push you to achieve your best.",
        n: "Abdul, Madhavaram",
        m: "★★★★★"
    }
];



/* ==========================================================
   BRANCH INFORMATION
========================================================== */

var branches = [

    {
        k: "BRANCH 01",
        n: "V4 Fitness Hub — Kodungaiyur",

        ph: "+91 90802 31838",
        tel: "+919080231838",

        ig: "https://www.instagram.com/v4fitnesshub/",
        map: "https://maps.app.goo.gl/Yrdk6peVf3sooDN37",

        q: "V4 Fitness Hub Kodungaiyur Chennai"
    },

    {
        k: "BRANCH 02",
        n: "V4 Fitness & Rehab — Madhavaram",

        ph: "+91 78451 00604",
        tel: "+917845100604",

        ig: "https://www.instagram.com/v4fitness_rehab/",
        map: "https://maps.app.goo.gl/WMPCdHyin6iFC2SaA",

        q: "V4 Fitness Rehab Madhavaram Chennai"
    }

];