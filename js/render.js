/* ==========================================================
   RENDER SERVICES
========================================================== */

(function () {

    var g = el("svcGrid");

    if (!g) {

        return;

    }

    services.forEach(function (s, i) {

        g.appendChild(

            h(

                '<article class="svc reveal" data-d="' + ((i % 3) + 1) + '">' +

                    '<span class="no">0' + (i + 1) + "</span>" +

                    '<div class="ic">' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">' +
                            ICON[s.ic] +
                        "</svg>" +
                    "</div>" +

                    "<h3>" + s.t + "</h3>" +

                    "<p>" + s.d + "</p>" +

                "</article>"

            )

        );

    });

})();



/* ==========================================================
   RENDER TIMELINE
========================================================== */

(function () {

    var t = el("timeline");

    if (!t) {

        return;

    }

    timeline.forEach(function (x) {

        t.appendChild(

            h(

                '<div class="tl-item">' +

                    '<div class="yr">' +
                        x.yr +
                    "</div>" +

                    "<h4>" +
                        x.t +
                    "</h4>" +

                    "<p>" +
                        x.d +
                    "</p>" +

                "</div>"

            )

        );

    });

})();



/* ==========================================================
   RENDER WHY BARS
========================================================== */

(function () {

    var b = el("whyBars");

    if (!b) {

        return;

    }

    whyBars.forEach(function (x) {

        b.appendChild(

            h(

                '<div class="bar">' +

                    '<div class="top">' +

                        "<b>" +
                            x.t +
                        "</b>" +

                        "<span>" +
                            x.v +
                            "%" +
                        "</span>" +

                    "</div>" +

                    '<div class="track">' +

                        '<div class="fill" data-v="' +
                            x.v +
                        '"></div>' +

                    "</div>" +

                "</div>"

            )

        );

    });

})();

/* ==========================================================
   RENDER TRANSFORMATIONS
========================================================== */

(function () {

    var g = el("baGrid");

    if (!g) {

        return;

    }

    transformations.forEach(function (x, i) {

        var beforeBg = x.before
            ? "background-image:url(" +
              x.before +
              ");background-size:cover;background-position:center"
            : "";

        var afterBg = x.after
            ? "background-image:url(" +
              x.after +
              ");background-size:cover;background-position:center;clip-path:inset(0 0 0 50%)"
            : "";

        var card = h(

            '<div class="ba reveal" data-d="' + ((i % 3) + 1) + '">' +

                '<div class="meta">' +
                    x.meta +
                "</div>" +

                '<div class="pane before" ' +
                    (beforeBg ? 'style="' + beforeBg + '"' : "") +
                ">" +
                    (x.before ? "" : "BEFORE") +
                "</div>" +

                '<div class="pane after" ' +
                    (afterBg ? 'style="' + afterBg + '"' : "") +
                ">" +
                    (x.after ? "" : "AFTER") +
                "</div>" +

                '<span class="tag b">BEFORE</span>' +
                '<span class="tag a">AFTER</span>' +

                '<div class="handle"></div>' +
                '<div class="knob">⇄</div>' +

            "</div>"

        );

        g.appendChild(card);



        /* ------------------------------------------
           Before / After Slider
        ------------------------------------------ */

        var after = card.querySelector(".after");
        var handle = card.querySelector(".handle");
        var knob = card.querySelector(".knob");

        var dragging = false;

        function setPct(p) {

            p = Math.max(2, Math.min(98, p));

            after.style.clipPath =
                "inset(0 0 0 " + p + "%)";

            handle.style.left = p + "%";

            knob.style.left = p + "%";

        }

        function move(clientX) {

            var r = card.getBoundingClientRect();

            setPct(

                ((clientX - r.left) / r.width) * 100

            );

        }

        card.addEventListener("pointerdown", function (e) {

            dragging = true;

            card.setPointerCapture(e.pointerId);

            move(e.clientX);

        });

        card.addEventListener("pointermove", function (e) {

            if (dragging) {

                move(e.clientX);

            }

        });

        card.addEventListener("pointerup", function () {

            dragging = false;

        });

        card.addEventListener("pointercancel", function () {

            dragging = false;

        });

    });

})();

/* ==========================================================
   RENDER EQUIPMENT
========================================================== */

(function () {

    var g = el("eqGrid");

    if (!g) {

        return;

    }

    equipment.forEach(function (x, i) {

        var li = x.specs
            .map(function (s) {

                return "<li>· " + s + "</li>";

            })
            .join("");

        g.appendChild(

            h(

                '<article class="eq reveal" data-d="' + ((i % 4) + 1) + '">' +

                    '<div class="eq-img" style="background-image:url(' +
                        x.img +
                    ')"></div>' +

                    '<div class="glow"></div>' +

                    '<span class="num">0' +
                        (i + 1) +
                    "</span>" +

                    "<h4>" +
                        x.t +
                    "</h4>" +

                    '<ul class="spec">' +
                        li +
                    "</ul>" +

                "</article>"

            )

        );

    });



    /* ======================================================
       EQUIPMENT CARD TILT EFFECT
    ====================================================== */

    if (!RM) {

        g.querySelectorAll(".eq").forEach(function (c) {

            c.addEventListener("pointermove", function (e) {

                var r = c.getBoundingClientRect();

                var rx =
                    ((e.clientY - r.top) / r.height - 0.5) * -6;

                var ry =
                    ((e.clientX - r.left) / r.width - 0.5) * 6;

                c.style.transform =
                    "perspective(800px) " +
                    "rotateX(" + rx + "deg) " +
                    "rotateY(" + ry + "deg) " +
                    "translateY(-4px)";

            });

            c.addEventListener("pointerleave", function () {

                c.style.transform = "";

            });

        });

    }

})();

/* ==========================================================
   RENDER MEMBERSHIP PLANS
========================================================== */

(function () {

    var g = el("plans");

    if (!g) {

        return;

    }

    plans.forEach(function (x, i) {

        var li = x.f

            .map(function (f) {

                return (
                    "<li>" +
                    svg('<path d="M20 6 9 17l-5-5"/>') +
                    f +
                    "</li>"
                );

            })

            .join("");

        g.appendChild(

            h(

                '<div class="plan' +
                    (x.pop ? " pop" : "") +
                    ' reveal" data-d="' +
                    ((i % 4) + 1) +
                    '">' +

                    '<div class="name">' +
                        x.name +
                    "</div>" +

                    '<div class="price">' +
                        x.price +
                        "<small>" +
                        x.per +
                        "</small>" +
                    "</div>" +

                    '<div class="save">' +
                        (x.save || "&nbsp;") +
                    "</div>" +

                    "<ul>" +
                        li +
                    "</ul>" +

                    '<a href="#contact" class="btn ' +
                        (x.pop ? "btn-primary" : "btn-ghost") +
                        '" data-mag>' +

                        "Choose " +
                        x.name +

                    "</a>" +

                "</div>"

            )

        );

    });

})();

/* ==========================================================
   RENDER TRAINERS
========================================================== */

(function () {

    var g = el("trGrid");

    if (!g) {

        return;

    }

    trainers.forEach(function (x, i) {

        g.appendChild(

            h(

                '<article class="tr reveal" data-d="' + ((i % 4) + 1) + '">' +

                    '<div class="ph">' +
                        '<img src="' + x.img + '" alt="' + x.n + '">' +
                    "</div>" +

                    '<div class="body">' +

                        "<h4>" +
                            x.n +
                        "</h4>" +

                        '<div class="role">' +
                            x.role +
                        "</div>" +

                        '<div class="cert">' +
                            x.cert +
                        "</div>" +

                        '<div class="soc">' +

                            '<a href="' + x.ig + 
                            '" target="_blank" rel="noopener noreferrer" aria-label="Instagram">' +

                                svg(
                                    '<rect x="2" y="2" width="20" height="20" rx="5"/>' +
                                    '<circle cx="12" cy="12" r="4"/>' +
                                    '<circle cx="17.5" cy="6.5" r="1"/>'
                                ) +

                            "</a>" +

                            '<a href="#contact" aria-label="Book">' +

                                svg(
                                    '<path d="M12 5v14M5 12h14"/>'
                                ) +

                            "</a>" +

                        "</div>" +

                    "</div>" +

                "</article>"

            )

        );

    });

})();

/* ==========================================================
   RENDER TESTIMONIALS
========================================================== */

var tIndex = 0;
var tTrack = el("testiTrack");

(function () {

    if (!tTrack) {

        return;

    }

    testimonials.forEach(function (x) {

        var av = x.n.charAt(0);

        tTrack.appendChild(

            h(

                '<div class="t-card">' +

                    '<div class="stars">' +
                        x.m +
                    "</div>" +

                    "<blockquote>" +
                        '"' + x.q + '"' +
                    "</blockquote>" +

                    '<div class="who">' +

                        '<div class="av">' +
                            av +
                        "</div>" +

                        "<div>" +

                            "<b>" +
                                x.n +
                            "</b>" +

                            "<span>Verified member</span>" +

                        "</div>" +

                    "</div>" +

                "</div>"

            )

        );

    });



    /* ======================================================
       TESTIMONIAL SLIDER
    ====================================================== */

    function step(dir) {

        var cards = tTrack.children;

        if (!cards.length) {

            return;

        }

        var cw =
            cards[0].getBoundingClientRect().width + 18;

        var per = Math.max(

            1,

            Math.floor(
                tTrack.parentElement.offsetWidth / cw
            )

        );

        var max = Math.max(

            0,

            cards.length - per

        );

        tIndex = Math.max(

            0,

            Math.min(
                max,
                tIndex + dir
            )

        );

        tTrack.style.transform =
            "translateX(" + (-tIndex * cw) + "px)";

    }

    var n = el("tNext");
    var p = el("tPrev");

    if (n) {

        n.onclick = function () {

            step(1);

        };

    }

    if (p) {

        p.onclick = function () {

            step(-1);

        };

    }

})();

/* ==========================================================
   RENDER BRANCHES
========================================================== */

(function () {

    var g = el("brGrid");

    if (!g) {

        return;

    }

    branches.forEach(function (b, i) {

        var embed =
            "https://maps.google.com/maps?q=" +
            encodeURIComponent(b.q) +
            "&z=15&output=embed";

        g.appendChild(

            h(

                '<article class="br reveal" data-d="' + ((i % 2) + 1) + '">' +

                    '<div class="map">' +

                        '<iframe ' +
                            'loading="lazy" ' +
                            'src="' + embed + '" ' +
                            'title="' + b.n + ' map">' +
                        "</iframe>" +

                    "</div>" +

                    '<div class="info">' +

                        '<div class="k">' +
                            b.k +
                        "</div>" +

                        "<h3>" +
                            b.n +
                        "</h3>" +

                        '<div class="row">' +

                            svg(
                                '<path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z"/>' +
                                '<circle cx="12" cy="10" r="3"/>'
                            ) +

                            b.n.split("—")[1] +
                            ", Chennai" +

                        "</div>" +

                        '<div class="row">' +

                            svg(
                                '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/>'
                            ) +

                            b.ph +

                        "</div>" +

                        '<div class="acts">' +

                            '<a href="' +
                                b.map +
                                '" target="_blank" rel="noopener">' +

                                svg(
                                    '<path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z"/>'
                                ) +

                                "Directions" +

                            "</a>" +

                            '<a href="tel:' +
                                b.tel +
                                '">' +

                                svg(
                                    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/>'
                                ) +

                                "Call" +

                            "</a>" +

                            '<a href="' +
                                b.ig +
                                '" target="_blank" rel="noopener">' +

                                svg(
                                    '<rect x="2" y="2" width="20" height="20" rx="5"/>' +
                                    '<circle cx="12" cy="12" r="4"/>' +
                                    '<circle cx="17.5" cy="6.5" r="1"/>'
                                ) +

                                "Instagram" +

                            "</a>" +

                        "</div>" +

                    "</div>" +

                "</article>"

            )

        );

    });

})();