/* ==========================================================
   HERO ATMOSPHERE PARTICLES
========================================================== */

(function () {

    var cv = el("atmos");
    if (!cv) {
        return;

    }

    var ctx = cv.getContext("2d");
    var DPR = Math.min(
        2,
        window.devicePixelRatio || 1

    );

    var W;
    var H;
    var parts = [];
    var mouse = {

        x: 0.5,
        y: 0.5

    };



    /* ======================================================
       CANVAS RESIZE
    ====================================================== */

    function size() {

        W = cv.clientWidth;
        H = cv.clientHeight;
        cv.width = W * DPR;
        cv.height = H * DPR;
        ctx.setTransform(

            DPR,
            0,
            0,
            DPR,
            0,
            0

        );

    }

    /* ======================================================
       CREATE PARTICLES
    ====================================================== */

    function seed() {

        parts = [];
        var n = Math.min(
            90,
            Math.floor(W / 16)
        );

        for (var i = 0; i < n; i++) {

            parts.push({

                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.8 + 0.4,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                a: Math.random() * 0.5 + 0.15

            });

        }

    }

    /* ======================================================
       EVENTS
    ====================================================== */

    window.addEventListener("resize", function () {

        size();

        seed();

    });

    window.addEventListener("mousemove", function (e) {

        mouse.x =
            e.clientX /
            window.innerWidth;

        mouse.y =
            e.clientY /
            window.innerHeight;

    });



    size();

    seed();



    var t = 0;



    /* ======================================================
       ANIMATION LOOP
    ====================================================== */

    function frame() {

        t += 0.005;
        ctx.clearRect(

            0,
            0,
            W,
            H

        );



        /* ==============================================
           Animated Glow
        ============================================== */

        var gx =
            W *
            (
                0.55 +
                Math.sin(t) * 0.08 +
                (mouse.x - 0.5) * 0.06
            );

        var gy =
            H *
            (
                0.35 +
                Math.cos(t * 0.8) * 0.06 +
                (mouse.y - 0.5) * 0.06
            );

        var g = ctx.createRadialGradient(

            gx,
            gy,
            0,
            gx,
            gy,
            Math.max(W, H) * 0.55

        );

        g.addColorStop(0, "rgba(30,134,214,.14)");
        g.addColorStop(0.5, "rgba(30,134,214,.04)");
        g.addColorStop(1, "rgba(5,5,7,0)");

        ctx.fillStyle = g;

        ctx.fillRect(

            0,
            0,
            W,
            H

        );



        /* ==============================================
           Particles & Connections
        ============================================== */

        for (var i = 0; i < parts.length; i++) {

            var p = parts[i];

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > W) {

                p.vx *= -1;

            }

            if (p.y < 0 || p.y > H) {

                p.vy *= -1;

            }

            ctx.beginPath();

            ctx.arc(

                p.x,
                p.y,
                p.r,
                0,
                Math.PI * 2

            );

            ctx.fillStyle =
                "rgba(155,180,210," +
                p.a +
                ")";

            ctx.fill();



            for (var j = i + 1; j < parts.length; j++) {

                var q = parts[j];
                var dx = p.x - q.x;
                var dy = p.y - q.y;
                var d = dx * dx + dy * dy;

                if (d < 11000) {

                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle =
                        "rgba(30,134,214," +
                        (0.10 * (1 - d / 11000)) +
                        ")";

                    ctx.lineWidth = 0.6;
                    ctx.stroke();

                }

            }

        }

        requestAnimationFrame(frame);

    }



    /* ======================================================
       START ANIMATION
    ====================================================== */

    if (!RM) {

        frame();

    } else {

        ctx.fillStyle = "rgba(30,134,214,.06)";

        ctx.fillRect(
            0,
            0,
            W,
            H

        );

    }

})();