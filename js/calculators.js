/* ==========================================================
   PERFORMANCE LAB
   Interactive Health & Fitness Calculators
========================================================== */



/* ==========================================================
   GLOBAL VARIABLES
========================================================== */

var SEX = "male";
var ACT = "1.55";



/* ==========================================================
   CALCULATOR HELPERS
========================================================== */

/**
 * Get numeric value from an input element.
 *
 * @param {string} id
 * @returns {number}
 */
function num(id) {

    var v = parseFloat(
        el(id) && el(id).value
    );

    return isNaN(v) ? 0 : v;

}



/**
 * Update calculator output.
 *
 * @param {string} id
 * @param {string} html
 */
function out(id, html) {

    var o = el(id);

    if (o) {

        o.innerHTML =
            '<div class="read">' +
            html +
            "</div>";

    }

}

/* ==========================================================
   CALCULATOR CONFIGURATION
========================================================== */

var calcs = [

    /* ======================================================
       BMI CALCULATOR
    ====================================================== */

    {

        id: "bmi",
        name: "BMI",
        title: "Body Mass Index",
        sub: "Weight-to-height ratio screening.",

        form:

            '<div class="form-row">' +

                '<div class="field">' +
                    "<label>Height (cm)</label>" +
                    '<input type="number" id="bmi-h" value="170">' +
                "</div>" +

                '<div class="field">' +
                    "<label>Weight (kg)</label>" +
                    '<input type="number" id="bmi-w" value="70">' +
                "</div>" +

            "</div>",

        run: function () {

            var hh = num("bmi-h") / 100;
            var w = num("bmi-w");

            if (hh <= 0) {

                out(
                    "bmi-out",
                    '<div class="placeholder">Enter your height.</div>'
                );

                return;

            }

            var v = w / (hh * hh);

            var cat =
                v < 18.5
                    ? [
                        "Underweight",
                        "Consider a structured gain plan."
                    ]
                    : v < 25
                    ? [
                        "Healthy",
                        "Maintain with strength training."
                    ]
                    : v < 30
                    ? [
                        "Overweight",
                        "A coached fat-loss block helps."
                    ]
                    : [
                        "Obese",
                        "Talk to a V4 coach for a safe plan."
                    ];

            out(

                "bmi-out",

                '<div class="big">' +
                    v.toFixed(1) +
                "</div>" +

                '<div class="cat">' +
                    cat[0] +
                "</div>" +

                '<div class="desc">' +
                    cat[1] +
                "</div>"

            );

        }

    },
    /* ======================================================
       BMR CALCULATOR
    ====================================================== */

    {

        id: "bmr",
        name: "BMR",
        title: "Basal Metabolic Rate",
        sub: "Calories burned at complete rest.",

        form:

            '<div class="field">' +

                "<label>Sex</label>" +

                '<div class="seg" data-seg="sex">' +

                    '<button data-v="male" class="on">Male</button>' +

                    '<button data-v="female">Female</button>' +

                "</div>" +

            "</div>" +

            '<div class="form-row">' +

                '<div class="field">' +

                    "<label>Age</label>" +

                    '<input type="number" id="bmr-a" value="28">' +

                "</div>" +

                '<div class="field">' +

                    "<label>Height (cm)</label>" +

                    '<input type="number" id="bmr-h" value="170">' +

                "</div>" +

            "</div>" +

            '<div class="field">' +

                "<label>Weight (kg)</label>" +

                '<input type="number" id="bmr-w" value="70">' +

            "</div>",

        run: function () {

            var a = num("bmr-a");
            var hh = num("bmr-h");
            var w = num("bmr-w");

            if (!a || !hh || !w) {

                out(

                    "bmr-out",

                    '<div class="placeholder">Fill all fields.</div>'

                );

                return;

            }

            var v =
                (10 * w) +
                (6.25 * hh) -
                (5 * a) +
                (SEX === "male" ? 5 : -161);

            out(

                "bmr-out",

                '<div class="big">' +
                    Math.round(v) +
                    ' <small>kcal/day</small>' +
                "</div>" +

                '<div class="cat">' +
                    "Mifflin-St Jeor" +
                "</div>" +

                '<div class="desc">' +
                    "Energy your body needs at rest. Add activity for your daily total (see TDEE)." +
                "</div>"

            );

        }

    },
    
        /* ======================================================
       TDEE CALCULATOR
    ====================================================== */

    {

        id: "tdee",
        name: "TDEE",
        title: "Total Daily Energy",
        sub: "Maintenance calories with activity.",

        form:

            '<div class="field">' +

                "<label>Sex</label>" +

                '<div class="seg" data-seg="sex">' +

                    '<button data-v="male" class="on">Male</button>' +

                    '<button data-v="female">Female</button>' +

                "</div>" +

            "</div>" +

            '<div class="form-row">' +

                '<div class="field">' +

                    "<label>Age</label>" +

                    '<input type="number" id="td-a" value="28">' +

                "</div>" +

                '<div class="field">' +

                    "<label>Weight (kg)</label>" +

                    '<input type="number" id="td-w" value="70">' +

                "</div>" +

            "</div>" +

            '<div class="field">' +

                "<label>Height (cm)</label>" +

                '<input type="number" id="td-h" value="170">' +

            "</div>" +

            '<div class="field">' +

                "<label>Activity level</label>" +

                '<select id="td-act">' +

                    '<option value="1.2">Sedentary (desk job)</option>' +

                    '<option value="1.375">Light (1-3 days/wk)</option>' +

                    '<option value="1.55" selected>Moderate (3-5 days/wk)</option>' +

                    '<option value="1.725">Active (6-7 days/wk)</option>' +

                    '<option value="1.9">Athlete (2x/day)</option>' +

                "</select>" +

            "</div>",

        run: function () {

            var a = num("td-a");
            var w = num("td-w");
            var hh = num("td-h");
            var f = parseFloat(el("td-act").value);

            if (!a || !w || !hh) {

                out(

                    "tdee-out",

                    '<div class="placeholder">Fill all fields.</div>'

                );

                return;

            }

            var bmr =
                (10 * w) +
                (6.25 * hh) -
                (5 * a) +
                (SEX === "male" ? 5 : -161);

            var v = bmr * f;

            out(

                "tdee-out",

                '<div class="big">' +
                    Math.round(v) +
                    ' <small>kcal/day</small>' +
                "</div>" +

                '<div class="cat">' +
                    "Maintenance" +
                "</div>" +

                '<div class="lab-bars">' +

                    '<div class="lb">' +
                        "<span>Cut (fat loss)</span>" +
                        "<b>" + Math.round(v - 500) + " kcal</b>" +
                    "</div>" +

                    '<div class="lb">' +
                        "<span>Maintain</span>" +
                        "<b>" + Math.round(v) + " kcal</b>" +
                    "</div>" +

                    '<div class="lb">' +
                        "<span>Bulk (muscle)</span>" +
                        "<b>" + Math.round(v + 350) + " kcal</b>" +
                    "</div>" +

                "</div>"

            );

        }

    },

        /* ======================================================
       CALORIE CALCULATOR
    ====================================================== */

    {

        id: "cal",
        name: "Calorie",
        title: "Calorie Goal",
        sub: "Target calories for your objective.",

        form:

            '<div class="field">' +

                "<label>Maintenance calories (TDEE)</label>" +

                '<input type="number" id="cal-t" value="2400">' +

            "</div>" +

            '<div class="field">' +

                "<label>Goal</label>" +

                '<select id="cal-g">' +

                    '<option value="-0.2">Lose fat (-20%)</option>' +

                    '<option value="0">Maintain</option>' +

                    '<option value="0.12">Build muscle (+12%)</option>' +

                "</select>" +

            "</div>",

        run: function () {

            var t = num("cal-t");
            var g = parseFloat(el("cal-g").value);

            if (!t) {

                out(

                    "cal-out",

                    '<div class="placeholder">Enter your TDEE.</div>'

                );

                return;

            }

            var v = t * (1 + g);
            var p = Math.round(

                num("cal-t") * 0.0 +
                (v * 0.0)

            );

            var prot = Math.round((v * 0.3) / 4);
            var carb = Math.round((v * 0.4) / 4);
            var fat = Math.round((v * 0.3) / 9);

            out(

                "cal-out",

                '<div class="big">' +
                    Math.round(v) +
                    ' <small>kcal/day</small>' +
                "</div>" +

                '<div class="cat">' +
                    "Daily target" +
                "</div>" +

                '<div class="lab-bars">' +

                    '<div class="lb">' +
                        "<span>Protein 30%</span>" +
                        "<b>" + prot + " g</b>" +
                    "</div>" +

                    '<div class="lb">' +
                        "<span>Carbs 40%</span>" +
                        "<b>" + carb + " g</b>" +
                    "</div>" +

                    '<div class="lb">' +
                        "<span>Fat 30%</span>" +
                        "<b>" + fat + " g</b>" +
                    "</div>" +

                "</div>"

            );

        }

    },

        /* ======================================================
       BODY FAT CALCULATOR
    ====================================================== */

    {

        id: "bf",
        name: "Body Fat",
        title: "Body Fat %",
        sub: "U.S. Navy circumference method.",

        form:

            '<div class="field">' +

                "<label>Sex</label>" +

                '<div class="seg" data-seg="sex">' +

                    '<button data-v="male" class="on">Male</button>' +

                    '<button data-v="female">Female</button>' +

                "</div>" +

            "</div>" +

            '<div class="form-row">' +

                '<div class="field">' +

                    "<label>Height (cm)</label>" +

                    '<input type="number" id="bf-h" value="170">' +

                "</div>" +

                '<div class="field">' +

                    "<label>Neck (cm)</label>" +

                    '<input type="number" id="bf-n" value="38">' +

                "</div>" +

            "</div>" +

            '<div class="form-row">' +

                '<div class="field">' +

                    "<label>Waist (cm)</label>" +

                    '<input type="number" id="bf-wa" value="84">' +

                "</div>" +

                '<div class="field">' +

                    "<label>Hip (cm) — female</label>" +

                    '<input type="number" id="bf-hip" value="95">' +

                "</div>" +

            "</div>",

        run: function () {

            var hh = num("bf-h");
            var n = num("bf-n");
            var wa = num("bf-wa");
            var hip = num("bf-hip");

            if (!hh || !n || !wa) {

                out(

                    "bf-out",

                    '<div class="placeholder">Fill the measurements.</div>'

                );

                return;

            }

            var v;

            try {

                if (SEX === "male") {

                    v =
                        495 /
                            (
                                1.0324 -
                                (0.19077 * Math.log10(wa - n)) +
                                (0.15456 * Math.log10(hh))
                            ) -
                        450;

                } else {

                    v =
                        495 /
                            (
                                1.29579 -
                                (0.35004 * Math.log10(wa + hip - n)) +
                                (0.22100 * Math.log10(hh))
                            ) -
                        450;

                }

            } catch (e) {

                v = NaN;

            }

            if (isNaN(v) || v <= 0) {

                out(

                    "bf-out",

                    '<div class="placeholder">Check your measurements.</div>'

                );

                return;

            }

            var cat;

            if (SEX === "male") {

                cat =
                    v < 6
                        ? "Essential"
                        : v < 14
                        ? "Athletic"
                        : v < 18
                        ? "Fit"
                        : v < 25
                        ? "Average"
                        : "High";

            } else {

                cat =
                    v < 14
                        ? "Essential"
                        : v < 21
                        ? "Athletic"
                        : v < 25
                        ? "Fit"
                        : v < 32
                        ? "Average"
                        : "High";

            }

            out(

                "bf-out",

                '<div class="big">' +
                    v.toFixed(1) +
                    "<small>%</small>" +
                "</div>" +

                '<div class="cat">' +
                    cat +
                "</div>" +

                '<div class="desc">' +
                    "Estimate via tape measurements — DEXA at the floor gives a precise reading." +
                "</div>"

            );

        }

    },

        /* ======================================================
       FITNESS ASSESSMENT
    ====================================================== */

    {

        id: "fa",
        name: "Assessment",
        title: "Fitness Assessment",
        sub: "Quick readiness score.",

        form:

            '<div class="form-row">' +

                '<div class="field">' +

                    "<label>Push-ups (max)</label>" +

                    '<input type="number" id="fa-p" value="20">' +

                "</div>" +

                '<div class="field">' +

                    "<label>Plank (seconds)</label>" +

                    '<input type="number" id="fa-pl" value="60">' +

                "</div>" +

            "</div>" +

            '<div class="form-row">' +

                '<div class="field">' +

                    "<label>Resting HR (bpm)</label>" +

                    '<input type="number" id="fa-hr" value="68">' +

                "</div>" +

                '<div class="field">' +

                    "<label>Weekly workouts</label>" +

                    '<input type="number" id="fa-w" value="3">' +

                "</div>" +

            "</div>",

        run: function () {

            var p = num("fa-p");
            var pl = num("fa-pl");
            var hr = num("fa-hr");
            var w = num("fa-w");

            var s =
                Math.min(30, p) +
                Math.min(30, pl / 4) +
                Math.max(0, 30 - (hr - 50) / 2) +
                Math.min(10, w * 2);

            s = Math.max(

                0,

                Math.min(

                    100,

                    Math.round(s)

                )

            );

            var cat =
                s < 40
                    ? [
                        "Foundation",
                        "Start with coached basics 3x/week."
                    ]
                    : s < 65
                    ? [
                        "Developing",
                        "Solid base — add structured progression."
                    ]
                    : s < 85
                    ? [
                        "Strong",
                        "Great shape — push for performance goals."
                    ]
                    : [
                        "Elite",
                        "Athlete tier — fine-tune with a coach."
                    ];

            out(

                "fa-out",

                '<div class="big">' +
                    s +
                    "<small>/100</small>" +
                "</div>" +

                '<div class="cat">' +
                    cat[0] +
                "</div>" +

                '<div class="desc">' +
                    cat[1] +
                "</div>"

            );

        }

    },

        /* ======================================================
       WORKOUT GENERATOR
    ====================================================== */

    {

        id: "wo",
        name: "Workout",
        title: "Workout Generator",
        sub: "A split tailored to your goal.",

        form:

            '<div class="field">' +

                "<label>Primary goal</label>" +

                '<select id="wo-g">' +

                    "<option>Fat loss</option>" +

                    "<option>Muscle building</option>" +

                    "<option>Strength</option>" +

                    "<option>General fitness</option>" +

                "</select>" +

            "</div>" +

            '<div class="field">' +

                "<label>Days per week</label>" +

                '<select id="wo-d">' +

                    "<option>3</option>" +

                    '<option selected>4</option>' +

                    "<option>5</option>" +

                    "<option>6</option>" +

                "</select>" +

            "</div>",

        run: function () {

            var g = el("wo-g").value;
            var d = parseInt(

                el("wo-d").value,

                10

            );

            var plansMap = {

                "Fat loss": [

                    "Full-body strength + 15m HIIT",
                    "Upper push + steady cardio",
                    "Lower strength + core",
                    "Conditioning circuit",
                    "Full-body + intervals",
                    "Active recovery / mobility"

                ],

                "Muscle building": [

                    "Push (chest/shoulders/triceps)",
                    "Pull (back/biceps)",
                    "Legs (quads/glutes)",
                    "Upper hypertrophy",
                    "Lower hypertrophy",
                    "Arms + weak points"

                ],

                "Strength": [

                    "Squat focus",
                    "Bench focus",
                    "Deadlift focus",
                    "Overhead + accessories",
                    "Heavy singles + back-off",
                    "Mobility / technique"

                ],

                "General fitness": [

                    "Full-body strength",
                    "Cardio + core",
                    "Functional circuit",
                    "Full-body strength",
                    "Mobility flow",
                    "Outdoor / sport"

                ]

            };

            var list =

                plansMap[g] ||
                plansMap["General fitness"];

            var rows = "";

            for (var i = 0; i < d; i++) {

                rows +=

                    '<div class="lb">' +

                        "<span>Day " +

                            (i + 1) +

                        "</span>" +

                        "<b>" +

                            list[i % list.length] +

                        "</b>" +

                    "</div>";

            }

            out(

                "wo-out",

                '<div class="cat" style="margin-top:0">' +

                    g.toUpperCase() +

                    " · " +

                    d +

                    " DAYS" +

                "</div>" +

                '<div class="lab-bars">' +

                    rows +

                "</div>" +

                '<div class="desc" style="margin-top:14px">' +

                    "A V4 coach refines load, reps and progression for you." +

                "</div>"

            );

        }

    }

];

/* ==========================================================
   PERFORMANCE LAB INITIALIZATION
========================================================== */

(function () {

    var tabs = el("labTabs");
    var panels = el("labPanels");

    if (!tabs || !panels) {

        return;

    }



    /* ======================================================
       RENDER CALCULATOR TABS & PANELS
    ====================================================== */

    calcs.forEach(function (c, i) {

        var b = h(

            '<button data-c="' +
                c.id +
                '"' +
                (i === 0 ? ' class="on"' : "") +
                ">" +
                c.name +
                "</button>"

        );

        tabs.appendChild(b);

        var p = h(

            '<div class="lab-panel' +
                (i === 0 ? " on" : "") +
                '" id="panel-' +
                c.id +
                '">' +

                "<div>" +

                    "<h3>" +
                        c.title +
                    "</h3>" +

                    "<p>" +
                        c.sub +
                    "</p>" +

                    c.form +

                "</div>" +

                '<div class="lab-out" id="' +
                    c.id +
                    '-out">' +

                    '<div class="read">' +

                        '<div class="placeholder">' +
                            "Enter values to see results." +
                        "</div>" +

                    "</div>" +

                "</div>" +

            "</div>"

        );

        panels.appendChild(p);

    });



    /* ======================================================
       TAB SWITCHING
    ====================================================== */

    tabs.addEventListener("click", function (e) {

        var b = e.target.closest("button");

        if (!b) {

            return;

        }

        tabs.querySelectorAll("button").forEach(function (x) {

            x.classList.remove("on");

        });

        panels.querySelectorAll(".lab-panel").forEach(function (x) {

            x.classList.remove("on");

        });

        b.classList.add("on");

        var pan = el("panel-" + b.dataset.c);

        if (pan) {

            pan.classList.add("on");

        }

        var c = calcs.filter(function (x) {

            return x.id === b.dataset.c;

        })[0];

        if (c) {

            c.run();

        }

    });



    /* ======================================================
       LIVE RECALCULATION
    ====================================================== */

    panels.addEventListener("input", recompute);
    panels.addEventListener("change", recompute);



    /* ======================================================
       SEX TOGGLE
    ====================================================== */

    panels.addEventListener("click", function (e) {

        var s = e.target.closest('[data-seg="sex"] button');

        if (!s) {

            return;

        }

        document
            .querySelectorAll('[data-seg="sex"] button')
            .forEach(function (x) {

                x.classList.remove("on");

            });

        SEX = s.dataset.v;

        document
            .querySelectorAll('[data-seg="sex"]')
            .forEach(function (seg) {

                seg.querySelectorAll("button").forEach(function (btn) {

                    btn.classList.toggle(

                        "on",

                        btn.dataset.v === SEX

                    );

                });

            });

        recompute();

    });



    /* ======================================================
       RECALCULATE ACTIVE PANEL
    ====================================================== */

    function recompute() {

        var on = panels.querySelector(".lab-panel.on");

        if (!on) {

            return;

        }

        var id = on.id.replace("panel-", "");

        var c = calcs.filter(function (x) {

            return x.id === id;

        })[0];

        if (c) {

            try {

                c.run();

            } catch (e) {

            }

        }

    }



    /* ======================================================
       INITIAL LOAD
    ====================================================== */

    calcs[0].run();

})();

