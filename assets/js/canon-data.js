/* SCRIPTORIUM — Canon Data Bridge */
/* This file provides CANON_DATA and SCRIPTORIUM_CANON as globals.
   Individual pages may override CANON_DATA with their own full arrays. */

if (typeof window.CANON_DATA === 'undefined') {
    window.CANON_DATA = [];
}

if (typeof window.SCRIPTORIUM_CANON === 'undefined') {
    window.SCRIPTORIUM_CANON = { books: [], pdfPageMap: {}, version: '1.0' };
}
