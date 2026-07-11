/* ==========================================================
   CONTACT FORM
   WhatsApp Trial Booking
========================================================== */

(function () {

    var btn = el("sendBtn");

    if (!btn) {

        return;

    }

    btn.addEventListener("click", function () {

        var name = (el("f-name").value || "").trim();
        var mob = (el("f-mobile").value || "").trim();
        var email = (el("f-email").value || "").trim();
        var goal = el("f-goal").value;
        var branch = el("f-branch").value;
        var msg = (el("f-msg").value || "").trim();

        /* ==================================================
           FORM VALIDATION
        ================================================== */

        if (!name || !mob) {

            alert("Please add your name and mobile number.");

            return;

        }



        /* ==================================================
           SELECT WHATSAPP NUMBER
        ================================================== */

        var to =

            branch.indexOf("Madhavaram") === 0
                ? WA_MADH
                : WA_KODU;



        /* ==================================================
           BUILD WHATSAPP MESSAGE
        ================================================== */

        var text =

            "New trial enquiry%0A%0A" +
            "Name: " + encodeURIComponent(name) +
            "%0AMobile: " + encodeURIComponent(mob) +

            (email

                ? "%0AEmail: " + encodeURIComponent(email)
                : "") +

            (goal

                ? "%0AGoal: " + encodeURIComponent(goal)
                : "") +

            (branch

                ? "%0ABranch: " + encodeURIComponent(branch)
                : "") +

            (msg

                ? "%0AMessage: " + encodeURIComponent(msg)
                : "");



        /* ==================================================
           OPEN WHATSAPP
        ================================================== */

        window.open(

            "https://wa.me/" +
            to +
            "?text=" +
            text,
            "_blank"

        );

    });

})();

/* ==========================================================
   DYNAMIC COPYRIGHT YEAR
========================================================== */

(function () {

    var y = el("yr");

    if (y) {

        y.textContent = new Date().getFullYear();

    }

})();



/* ==========================================================
   NAVIGATION SCROLL STATE
   Scroll Progress Indicator
========================================================== */

(function () {

    var nav = el("nav");
    var prog = el("progress");

    function onScroll() {

        var s =
            window.pageYOffset ||
            document.documentElement.scrollTop;

        if (nav) {

            nav.classList.toggle(

                "scrolled",

                s > 30

            );

        }

        var hgt =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (prog) {

            prog.style.width =

                (hgt > 0
                    ? (s / hgt) * 100
                    : 0) + "%";

        }

    }

    window.addEventListener(
        "scroll",
        onScroll,

        {
            passive: true
        }
    );

    onScroll();

})();



/* ==========================================================
   MOBILE DRAWER
========================================================== */

(function () {

    var b = el("burger");
    var d = el("drawer");

    if (!b || !d) {

        return;

    }

    function toggle(open) {

        b.classList.toggle("open", open);
        d.classList.toggle("open", open);

        document.body.style.overflow =

            open

                ? "hidden"

                : "";

    }

    b.addEventListener("click", function () {

        toggle(

            !d.classList.contains("open")

        );

    });

    d.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {

            toggle(false);

        });

    });

})();



/* ==========================================================
   SCROLL REVEAL ANIMATIONS
========================================================== */

(function () {

    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || RM) {

        items.forEach(function (item) {
            item.classList.add("in");

        });

        return;

    }

    var io = new IntersectionObserver(

        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;

                }

                entry.target.classList.add("in");



                /* ==========================================
                   Animate Progress Bars
                ========================================== */

                if (entry.target.querySelectorAll) {

                    entry.target
                        .querySelectorAll(".fill")
                        .forEach(function (bar) {

                            bar.style.width =
                                bar.dataset.v + "%";
                        });
                }
                io.unobserve(entry.target);
            });
        },

        {

            threshold: 0,
            rootMargin: "0px 0px -8% 0px"

        }

    );



    items.forEach(function (item) {
        io.observe(item);

    });



    /* ==============================================
       Progress Bars Observer
    ============================================== */

    var bars = document.querySelectorAll(".fill");
    var io2 = new IntersectionObserver(

        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.width =
                    entry.target.dataset.v + "%";
                io2.unobserve(entry.target);

            });

        },

        {

            threshold: 0,
            rootMargin: "0px 0px -5% 0px"

        }

    );



    bars.forEach(function (bar) {
        io2.observe(bar);

    });

})();

/* ==========================================================
   ANIMATED COUNTERS
========================================================== */

(function () {

    var stats = el("stats");
    if (!stats) {
        return;

    }

    function run() {

        stats.querySelectorAll("[data-count]").forEach(function (n) {
            var target = parseFloat(n.dataset.count);
            var suffix = n.dataset.suffix || "";
            var duration = 1400;
            var startTime = null;



            /* ==========================================
               Reduced Motion Support
            ========================================== */

            if (RM) {
                n.textContent = target + suffix;
                return;

            }



            /* ==========================================
               Counter Animation
            ========================================== */

            function tick(timestamp) {

                if (!startTime) {
                    startTime = timestamp;
                }

                var progress = Math.min(
                    1,
                    (timestamp - startTime) / duration

                );

                var ease =
                    1 -
                    Math.pow(1 - progress, 3);
                n.textContent =
                    Math.round(target * ease) +
                    suffix;
                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            }
            requestAnimationFrame(tick);
        });
    }



    /* ==============================================
       Start Animation When Visible
    ============================================== */

    if ("IntersectionObserver" in window) {

        var io = new IntersectionObserver(
            function (entries) {
                if (entries[0].isIntersecting) {
                    run();
                    io.disconnect();
                }
            },

            {
                threshold: 0.4
            }

        );

        io.observe(stats);

    } else {

        run();

    }

})();

/* ==========================================================
   CUSTOM CURSOR
========================================================== */

(function () {
    var c = el("cursor");
    var dot = el("cursorDot");

    if (

        !c ||
        !dot ||
        RM ||

        matchMedia("(hover:none)").matches

    ) {

        return;
    }

    var cx = 0;
    var cy = 0;

    var tx = 0;
    var ty = 0;


    /* ==============================================
       Mouse Tracking
    ============================================== */

    window.addEventListener("mousemove", function (e) {

        tx = e.clientX;
        ty = e.clientY;
        dot.style.transform =

            "translate(" +
            tx +
            "px," +
            ty +
            "px) translate(-50%,-50%)";

    });



    /* ==============================================
       Cursor Animation
    ============================================== */

    (function loop() {

        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        c.style.transform =

            "translate(" +
            cx +
            "px," +
            cy +
            "px) translate(-50%,-50%)";

        requestAnimationFrame(loop);

    })();



    /* ==============================================
       Cursor Hover Effect
    ============================================== */

    document

        .querySelectorAll("a, button, [data-mag]")
        .forEach(function (target) {

            target.addEventListener("mouseenter", function () {
                c.classList.add("grow");

            });

            target.addEventListener("mouseleave", function () {
                c.classList.remove("grow");

            });

        });

})();



/* ==========================================================
   MAGNETIC BUTTON EFFECT
========================================================== */

(function () {

    if (

        RM ||

        matchMedia("(hover:none)").matches

    ) {

        return;

    }

    document

        .querySelectorAll("[data-mag]")
        .forEach(function (button) {

            button.addEventListener(

                "mousemove",

                function (e) {

                    var r =
                        button.getBoundingClientRect();

                    var x =
                        e.clientX -
                        r.left -
                        r.width / 2;

                    var y =
                        e.clientY -
                        r.top -
                        r.height / 2;
                    button.style.transform =

                        "translate(" +
                        (x * 0.25) +
                        "px," +
                        (y * 0.35) +
                        "px)";
                }

            );

            button.addEventListener(
                "mouseleave",
                function () {
                    button.style.transform = "";

                }

            );

        });

})();

