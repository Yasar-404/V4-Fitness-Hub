/* ==========================================================
   DOM HELPERS
========================================================== */

/**
 * Get element by ID.
 *
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function el(id) {

    return document.getElementById(id);

}


/**
 * Create an HTML element from a string.
 *
 * @param {string} html
 * @returns {HTMLElement}
 */
function h(html) {

    var d = document.createElement("div");

    d.innerHTML = html.trim();

    return d.firstChild;

}


/**
 * Generate an SVG icon.
 *
 * @param {string} p
 * @returns {string}
 */
function svg(p) {

    return (
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        p +
        "</svg>"
    );

}