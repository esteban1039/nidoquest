var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn2, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  } catch (e4) {
    throw err = [e4], e4;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// ../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// .wrangler/tmp/pages-snvQxE/chunks/_/shared.esm-bundler.mjs
function escapeHtml(t4) {
  const a3 = "" + t4, c3 = e.exec(a3);
  if (!c3) return a3;
  let s4, n2, o4 = "", r3 = 0;
  for (n2 = c3.index; n2 < a3.length; n2++) {
    switch (a3.charCodeAt(n2)) {
      case 34:
        s4 = "&quot;";
        break;
      case 38:
        s4 = "&amp;";
        break;
      case 39:
        s4 = "&#39;";
        break;
      case 60:
        s4 = "&lt;";
        break;
      case 62:
        s4 = "&gt;";
        break;
      default:
        continue;
    }
    r3 !== n2 && (o4 += a3.slice(r3, n2)), r3 = n2 + 1, o4 += s4;
  }
  return r3 !== n2 ? o4 + a3.slice(r3, n2) : o4;
}
var isFunction, isSymbol, e;
var init_shared_esm_bundler = __esm({
  ".wrangler/tmp/pages-snvQxE/chunks/_/shared.esm-bundler.mjs"() {
    "use strict";
    init_modules_watch_stub();
    isFunction = /* @__PURE__ */ __name((e4) => "function" == typeof e4, "isFunction");
    isSymbol = /* @__PURE__ */ __name((e4) => "symbol" == typeof e4, "isSymbol");
    e = /["'&<>]/;
    __name(escapeHtml, "escapeHtml");
  }
});

// .wrangler/tmp/pages-snvQxE/chunks/_/error-500.mjs
var error_500_exports = {};
__export(error_500_exports, {
  template: () => template
});
var t, template;
var init_error_500 = __esm({
  ".wrangler/tmp/pages-snvQxE/chunks/_/error-500.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_shared_esm_bundler();
    t = { appName: "Nuxt", status: 500, statusText: "Internal server error", description: "This page is temporarily unavailable.", refresh: "Refresh this page" };
    template = /* @__PURE__ */ __name((n2) => (n2 = { ...t, ...n2 }, '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(n2.status) + " - " + escapeHtml(n2.statusText) + " | " + escapeHtml(n2.appName) + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class="antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide"><div class="max-w-520px text-center"><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]">` + escapeHtml(n2.status) + '</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl">' + escapeHtml(n2.statusText) + '</h2><p class="mb-4 px-2 text-[#64748B] text-md">' + escapeHtml(n2.description) + "</p></div></body></html>"), "template");
  }
});

// .wrangler/tmp/pages-snvQxE/chunks/build/client.precomputed.mjs
var client_precomputed_exports = {};
__export(client_precomputed_exports, {
  default: () => e2
});
var e2, s, r, p, t2, d, o, n, c, i, u, y, l, a, m, j, f;
var init_client_precomputed = __esm({
  ".wrangler/tmp/pages-snvQxE/chunks/build/client.precomputed.mjs"() {
    "use strict";
    init_modules_watch_stub();
    e2 = { dependencies: { "../node_modules/nuxt/dist/app/entry.js": { scripts: { "../node_modules/nuxt/dist/app/entry.js": s = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DOwbGuaq.js", name: "entry", src: "../node_modules/nuxt/dist/app/entry.js", isEntry: true, dynamicImports: ["middleware/auth.ts", "layouts/default.vue", "../node_modules/nuxt/dist/app/components/error-404.vue", "../node_modules/nuxt/dist/app/components/error-500.vue"], css: ["entry.DUOYdzpO.css"] } }, styles: { "entry.DUOYdzpO.css": r = { file: "entry.DUOYdzpO.css", resourceType: "style", prefetch: true, preload: true } }, preload: { "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r }, prefetch: { "entry.DUOYdzpO.css": r } }, "_CyC5g9kG.js": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "_CyC5g9kG.js": p = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CyC5g9kG.js", name: "nuxt-link", imports: ["../node_modules/nuxt/dist/app/entry.js"] }, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r }, prefetch: { "entry.DUOYdzpO.css": r } }, "_CmXdUdh2.js": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "_CmXdUdh2.js": t2 = { resourceType: "script", module: true, prefetch: true, preload: true, file: "CmXdUdh2.js", name: "composables", imports: ["../node_modules/nuxt/dist/app/entry.js"] }, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r }, prefetch: { "entry.DUOYdzpO.css": r } }, "../node_modules/nuxt/dist/app/components/error-404.vue": { scripts: {}, styles: { "error-404.C3kT2QX-.css": d = { file: "error-404.C3kT2QX-.css", resourceType: "style", prefetch: true, preload: true }, "entry.DUOYdzpO.css": r }, preload: { "../node_modules/nuxt/dist/app/components/error-404.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "DJepYSob.js", name: "error-404", src: "../node_modules/nuxt/dist/app/components/error-404.vue", isDynamicEntry: true, imports: ["_CyC5g9kG.js", "../node_modules/nuxt/dist/app/entry.js", "_CmXdUdh2.js"], css: ["error-404.C3kT2QX-.css"] }, "error-404.C3kT2QX-.css": d, "_CyC5g9kG.js": p, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_CmXdUdh2.js": t2 }, prefetch: { "error-404.C3kT2QX-.css": d, "entry.DUOYdzpO.css": r } }, "error-404.C3kT2QX-.css": { scripts: {}, styles: {}, preload: { "error-404.C3kT2QX-.css": d }, prefetch: {} }, "../node_modules/nuxt/dist/app/components/error-500.vue": { scripts: {}, styles: { "error-500.BW0Y54Of.css": o = { file: "error-500.BW0Y54Of.css", resourceType: "style", prefetch: true, preload: true }, "entry.DUOYdzpO.css": r }, preload: { "../node_modules/nuxt/dist/app/components/error-500.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "un2Y273M.js", name: "error-500", src: "../node_modules/nuxt/dist/app/components/error-500.vue", isDynamicEntry: true, imports: ["../node_modules/nuxt/dist/app/entry.js", "_CmXdUdh2.js"], css: ["error-500.BW0Y54Of.css"] }, "error-500.BW0Y54Of.css": o, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_CmXdUdh2.js": t2 }, prefetch: { "error-500.BW0Y54Of.css": o, "entry.DUOYdzpO.css": r } }, "error-500.BW0Y54Of.css": { scripts: {}, styles: {}, preload: { "error-500.BW0Y54Of.css": o }, prefetch: {} }, "entry.DUOYdzpO.css": { scripts: {}, styles: {}, preload: { "entry.DUOYdzpO.css": r }, prefetch: {} }, "_B8t9_dXJ.js": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "_B8t9_dXJ.js": n = { resourceType: "script", module: true, prefetch: true, preload: true, file: "B8t9_dXJ.js", name: "useBilling", imports: ["../node_modules/nuxt/dist/app/entry.js"] }, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r }, prefetch: { "entry.DUOYdzpO.css": r } }, "_BSA5ygQW.js": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "_BSA5ygQW.js": c = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BSA5ygQW.js", name: "OfflineBanner", imports: ["../node_modules/nuxt/dist/app/entry.js"] }, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r }, prefetch: { "entry.DUOYdzpO.css": r } }, "_Be-RNCFB.js": { scripts: {}, styles: { "PwaBanner.Bcdf1BrK.css": i = { file: "PwaBanner.Bcdf1BrK.css", resourceType: "style", prefetch: true, preload: true }, "entry.DUOYdzpO.css": r }, preload: { "_Be-RNCFB.js": u = { resourceType: "script", module: true, prefetch: true, preload: true, file: "Be-RNCFB.js", name: "PwaBanner", imports: ["../node_modules/nuxt/dist/app/entry.js"], css: ["PwaBanner.Bcdf1BrK.css"] }, "PwaBanner.Bcdf1BrK.css": i, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r }, prefetch: { "PwaBanner.Bcdf1BrK.css": i, "entry.DUOYdzpO.css": r } }, "PwaBanner.Bcdf1BrK.css": { scripts: {}, styles: {}, preload: { "PwaBanner.Bcdf1BrK.css": i }, prefetch: {} }, "_DszVQQbE.js": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "_DszVQQbE.js": y = { resourceType: "script", module: true, prefetch: true, preload: true, file: "DszVQQbE.js", name: "useSession", imports: ["../node_modules/nuxt/dist/app/entry.js"] }, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r }, prefetch: { "entry.DUOYdzpO.css": r } }, "_Dnt2bUKc.js": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "_Dnt2bUKc.js": l = { resourceType: "script", module: true, prefetch: true, preload: true, file: "Dnt2bUKc.js", name: "AppShell", imports: ["_CyC5g9kG.js", "_BSA5ygQW.js", "../node_modules/nuxt/dist/app/entry.js", "_DszVQQbE.js"] }, "_CyC5g9kG.js": p, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_BSA5ygQW.js": c, "_DszVQQbE.js": y }, prefetch: { "entry.DUOYdzpO.css": r } }, "_PwaBanner.Bcdf1BrK.css": { scripts: {}, styles: {}, preload: { "_PwaBanner.Bcdf1BrK.css": { resourceType: "style", prefetch: true, preload: true, file: "PwaBanner.Bcdf1BrK.css", src: "_PwaBanner.Bcdf1BrK.css" } }, prefetch: {} }, "_RTOF6Wf7.js": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "_RTOF6Wf7.js": a = { resourceType: "script", module: true, prefetch: true, preload: true, file: "RTOF6Wf7.js", name: "MetricCard", imports: ["../node_modules/nuxt/dist/app/entry.js"] }, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r }, prefetch: { "entry.DUOYdzpO.css": r } }, "_buWbq5fs.js": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "_buWbq5fs.js": m = { resourceType: "script", module: true, prefetch: true, preload: true, file: "buWbq5fs.js", name: "AuthPanel", imports: ["../node_modules/nuxt/dist/app/entry.js"] }, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r }, prefetch: { "entry.DUOYdzpO.css": r } }, "layouts/default.vue": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "layouts/default.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CfZv1CZE.js", name: "default", src: "layouts/default.vue", isDynamicEntry: true, imports: ["_CyC5g9kG.js", "_BSA5ygQW.js", "../node_modules/nuxt/dist/app/entry.js", "_DszVQQbE.js"] }, "_CyC5g9kG.js": p, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_BSA5ygQW.js": c, "_DszVQQbE.js": y }, prefetch: { "entry.DUOYdzpO.css": r } }, "middleware/auth.ts": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "middleware/auth.ts": { resourceType: "script", module: true, prefetch: true, preload: true, file: "BAlXFmja.js", name: "auth", src: "middleware/auth.ts", isDynamicEntry: true, imports: ["../node_modules/nuxt/dist/app/entry.js", "_DszVQQbE.js"] }, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_DszVQQbE.js": y }, prefetch: { "entry.DUOYdzpO.css": r } }, "pages/auth/forgot-password.vue": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "pages/auth/forgot-password.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CY539XKb.js", name: "forgot-password", src: "pages/auth/forgot-password.vue", isDynamicEntry: true, imports: ["_CyC5g9kG.js", "_buWbq5fs.js", "../node_modules/nuxt/dist/app/entry.js"] }, "_CyC5g9kG.js": p, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_buWbq5fs.js": m }, prefetch: { "entry.DUOYdzpO.css": r } }, "pages/auth/login.vue": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "pages/auth/login.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "Dg8BqBg3.js", name: "login", src: "pages/auth/login.vue", isDynamicEntry: true, imports: ["_CyC5g9kG.js", "_buWbq5fs.js", "../node_modules/nuxt/dist/app/entry.js", "_DszVQQbE.js"] }, "_CyC5g9kG.js": p, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_buWbq5fs.js": m, "_DszVQQbE.js": y }, prefetch: { "entry.DUOYdzpO.css": r } }, "pages/auth/register.vue": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "pages/auth/register.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "pn511E7P.js", name: "register", src: "pages/auth/register.vue", isDynamicEntry: true, imports: ["_CyC5g9kG.js", "_buWbq5fs.js", "../node_modules/nuxt/dist/app/entry.js", "_DszVQQbE.js"] }, "_CyC5g9kG.js": p, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_buWbq5fs.js": m, "_DszVQQbE.js": y }, prefetch: { "entry.DUOYdzpO.css": r } }, "pages/auth/reset-password.vue": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "pages/auth/reset-password.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "297xFsXe.js", name: "reset-password", src: "pages/auth/reset-password.vue", isDynamicEntry: true, imports: ["_CyC5g9kG.js", "_buWbq5fs.js", "../node_modules/nuxt/dist/app/entry.js"] }, "_CyC5g9kG.js": p, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_buWbq5fs.js": m }, prefetch: { "entry.DUOYdzpO.css": r } }, "pages/billing/index.vue": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "pages/billing/index.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CnW9OGWT.js", name: "index", src: "pages/billing/index.vue", isDynamicEntry: true, imports: ["../node_modules/nuxt/dist/app/entry.js"] }, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r }, prefetch: { "entry.DUOYdzpO.css": r } }, "pages/billing/return.vue": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "pages/billing/return.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "Cb_cRF6R.js", name: "return", src: "pages/billing/return.vue", isDynamicEntry: true, imports: ["_CyC5g9kG.js", "_Dnt2bUKc.js", "../node_modules/nuxt/dist/app/entry.js", "_DszVQQbE.js", "_B8t9_dXJ.js", "_BSA5ygQW.js"] }, "_CyC5g9kG.js": p, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_Dnt2bUKc.js": l, "_BSA5ygQW.js": c, "_DszVQQbE.js": y, "_B8t9_dXJ.js": n }, prefetch: { "entry.DUOYdzpO.css": r } }, "pages/dashboard/admin.vue": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "pages/dashboard/admin.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "DY_ArH2k.js", name: "admin", src: "pages/dashboard/admin.vue", isDynamicEntry: true, imports: ["_RTOF6Wf7.js", "_Dnt2bUKc.js", "../node_modules/nuxt/dist/app/entry.js", "_CyC5g9kG.js", "_BSA5ygQW.js", "_DszVQQbE.js"] }, "_RTOF6Wf7.js": a, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_Dnt2bUKc.js": l, "_CyC5g9kG.js": p, "_BSA5ygQW.js": c, "_DszVQQbE.js": y }, prefetch: { "entry.DUOYdzpO.css": r } }, "pages/dashboard/explorer.vue": { scripts: {}, styles: { "explorer.Dcpu5NKO.css": j = { file: "explorer.Dcpu5NKO.css", resourceType: "style", prefetch: true, preload: true }, "PwaBanner.Bcdf1BrK.css": i, "entry.DUOYdzpO.css": r }, preload: { "pages/dashboard/explorer.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CxxHF9yi.js", name: "explorer", src: "pages/dashboard/explorer.vue", isDynamicEntry: true, imports: ["_Be-RNCFB.js", "../node_modules/nuxt/dist/app/entry.js", "_Dnt2bUKc.js", "_CyC5g9kG.js", "_BSA5ygQW.js", "_DszVQQbE.js"], css: ["explorer.Dcpu5NKO.css"] }, "explorer.Dcpu5NKO.css": j, "_Be-RNCFB.js": u, "PwaBanner.Bcdf1BrK.css": i, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_Dnt2bUKc.js": l, "_CyC5g9kG.js": p, "_BSA5ygQW.js": c, "_DszVQQbE.js": y }, prefetch: { "explorer.Dcpu5NKO.css": j, "PwaBanner.Bcdf1BrK.css": i, "entry.DUOYdzpO.css": r } }, "explorer.Dcpu5NKO.css": { scripts: {}, styles: {}, preload: { "explorer.Dcpu5NKO.css": j }, prefetch: {} }, "pages/dashboard/guide.vue": { scripts: {}, styles: { "PwaBanner.Bcdf1BrK.css": i, "entry.DUOYdzpO.css": r }, preload: { "pages/dashboard/guide.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CJ_ZZItP.js", name: "guide", src: "pages/dashboard/guide.vue", isDynamicEntry: true, imports: ["_Be-RNCFB.js", "_RTOF6Wf7.js", "../node_modules/nuxt/dist/app/entry.js", "_CyC5g9kG.js", "_Dnt2bUKc.js", "_DszVQQbE.js", "_BSA5ygQW.js"] }, "_Be-RNCFB.js": u, "PwaBanner.Bcdf1BrK.css": i, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_RTOF6Wf7.js": a, "_CyC5g9kG.js": p, "_Dnt2bUKc.js": l, "_BSA5ygQW.js": c, "_DszVQQbE.js": y }, prefetch: { "PwaBanner.Bcdf1BrK.css": i, "entry.DUOYdzpO.css": r } }, "pages/index.vue": { scripts: {}, styles: { "index.DUpfBm5N.css": f = { file: "index.DUpfBm5N.css", resourceType: "style", prefetch: true, preload: true }, "entry.DUOYdzpO.css": r }, preload: { "pages/index.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CJE5nD17.js", name: "index", src: "pages/index.vue", isDynamicEntry: true, imports: ["_CyC5g9kG.js", "../node_modules/nuxt/dist/app/entry.js"], css: ["index.DUpfBm5N.css"] }, "index.DUpfBm5N.css": f, "_CyC5g9kG.js": p, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r }, prefetch: { "index.DUpfBm5N.css": f, "entry.DUOYdzpO.css": r } }, "index.DUpfBm5N.css": { scripts: {}, styles: {}, preload: { "index.DUpfBm5N.css": f }, prefetch: {} }, "pages/onboarding/index.vue": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "pages/onboarding/index.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "D_Na49v8.js", name: "index", src: "pages/onboarding/index.vue", isDynamicEntry: true, imports: ["../node_modules/nuxt/dist/app/entry.js", "_DszVQQbE.js"] }, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_DszVQQbE.js": y }, prefetch: { "entry.DUOYdzpO.css": r } }, "pages/profile.vue": { scripts: {}, styles: { "entry.DUOYdzpO.css": r }, preload: { "pages/profile.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "Y5E2qSvi.js", name: "profile", src: "pages/profile.vue", isDynamicEntry: true, imports: ["_Dnt2bUKc.js", "../node_modules/nuxt/dist/app/entry.js", "_DszVQQbE.js", "_B8t9_dXJ.js", "_CyC5g9kG.js", "_BSA5ygQW.js"] }, "_Dnt2bUKc.js": l, "_CyC5g9kG.js": p, "../node_modules/nuxt/dist/app/entry.js": s, "entry.DUOYdzpO.css": r, "_BSA5ygQW.js": c, "_DszVQQbE.js": y, "_B8t9_dXJ.js": n }, prefetch: { "entry.DUOYdzpO.css": r } } }, entrypoints: ["../node_modules/nuxt/dist/app/entry.js"], modules: { "../node_modules/nuxt/dist/app/components/error-404.vue": { file: "DJepYSob.js", resourceType: "script", mimeType: void 0, module: true }, "error-404.C3kT2QX-.css": { file: "error-404.C3kT2QX-.css", resourceType: "style", mimeType: void 0, module: void 0 }, "../node_modules/nuxt/dist/app/components/error-500.vue": { file: "un2Y273M.js", resourceType: "script", mimeType: void 0, module: true }, "error-500.BW0Y54Of.css": { file: "error-500.BW0Y54Of.css", resourceType: "style", mimeType: void 0, module: void 0 }, "../node_modules/nuxt/dist/app/entry.js": { file: "DOwbGuaq.js", resourceType: "script", mimeType: void 0, module: true }, "entry.DUOYdzpO.css": { file: "entry.DUOYdzpO.css", resourceType: "style", mimeType: void 0, module: void 0 }, "_B8t9_dXJ.js": { file: "B8t9_dXJ.js", resourceType: "script", mimeType: void 0, module: true }, "_BSA5ygQW.js": { file: "BSA5ygQW.js", resourceType: "script", mimeType: void 0, module: true }, "_Be-RNCFB.js": { file: "Be-RNCFB.js", resourceType: "script", mimeType: void 0, module: true }, "PwaBanner.Bcdf1BrK.css": { file: "PwaBanner.Bcdf1BrK.css", resourceType: "style", mimeType: void 0, module: void 0 }, "_CmXdUdh2.js": { file: "CmXdUdh2.js", resourceType: "script", mimeType: void 0, module: true }, "_CyC5g9kG.js": { file: "CyC5g9kG.js", resourceType: "script", mimeType: void 0, module: true }, "_Dnt2bUKc.js": { file: "Dnt2bUKc.js", resourceType: "script", mimeType: void 0, module: true }, "_DszVQQbE.js": { file: "DszVQQbE.js", resourceType: "script", mimeType: void 0, module: true }, "_PwaBanner.Bcdf1BrK.css": { file: "PwaBanner.Bcdf1BrK.css", resourceType: "style", mimeType: void 0, module: void 0 }, "_RTOF6Wf7.js": { file: "RTOF6Wf7.js", resourceType: "script", mimeType: void 0, module: true }, "_buWbq5fs.js": { file: "buWbq5fs.js", resourceType: "script", mimeType: void 0, module: true }, "layouts/default.vue": { file: "CfZv1CZE.js", resourceType: "script", mimeType: void 0, module: true }, "middleware/auth.ts": { file: "BAlXFmja.js", resourceType: "script", mimeType: void 0, module: true }, "pages/auth/forgot-password.vue": { file: "CY539XKb.js", resourceType: "script", mimeType: void 0, module: true }, "pages/auth/login.vue": { file: "Dg8BqBg3.js", resourceType: "script", mimeType: void 0, module: true }, "pages/auth/register.vue": { file: "pn511E7P.js", resourceType: "script", mimeType: void 0, module: true }, "pages/auth/reset-password.vue": { file: "297xFsXe.js", resourceType: "script", mimeType: void 0, module: true }, "pages/billing/index.vue": { file: "CnW9OGWT.js", resourceType: "script", mimeType: void 0, module: true }, "pages/billing/return.vue": { file: "Cb_cRF6R.js", resourceType: "script", mimeType: void 0, module: true }, "pages/dashboard/admin.vue": { file: "DY_ArH2k.js", resourceType: "script", mimeType: void 0, module: true }, "pages/dashboard/explorer.vue": { file: "CxxHF9yi.js", resourceType: "script", mimeType: void 0, module: true }, "explorer.Dcpu5NKO.css": { file: "explorer.Dcpu5NKO.css", resourceType: "style", mimeType: void 0, module: void 0 }, "pages/dashboard/guide.vue": { file: "CJ_ZZItP.js", resourceType: "script", mimeType: void 0, module: true }, "pages/index.vue": { file: "CJE5nD17.js", resourceType: "script", mimeType: void 0, module: true }, "index.DUpfBm5N.css": { file: "index.DUpfBm5N.css", resourceType: "style", mimeType: void 0, module: void 0 }, "pages/onboarding/index.vue": { file: "D_Na49v8.js", resourceType: "script", mimeType: void 0, module: true }, "pages/profile.vue": { file: "Y5E2qSvi.js", resourceType: "script", mimeType: void 0, module: true } } };
  }
});

// .wrangler/tmp/pages-snvQxE/chunks/virtual/_virtual_spa-template.mjs
var virtual_spa_template_exports = {};
__export(virtual_spa_template_exports, {
  template: () => o2
});
var o2;
var init_virtual_spa_template = __esm({
  ".wrangler/tmp/pages-snvQxE/chunks/virtual/_virtual_spa-template.mjs"() {
    "use strict";
    init_modules_watch_stub();
    o2 = "";
  }
});

// .wrangler/tmp/pages-snvQxE/chunks/routes/renderer.mjs
var renderer_exports = {};
__export(renderer_exports, {
  default: () => ne
});
function getModuleDependencies(e4, t4) {
  if (t4._dependencies[e4]) return t4._dependencies[e4];
  const r3 = t4._dependencies[e4] = { scripts: {}, styles: {}, preload: {}, prefetch: {} };
  if (!t4.manifest) return r3;
  const n2 = t4.manifest[e4];
  if (!n2) return r3;
  n2.file && (r3.preload[e4] = n2, (n2.isEntry || n2.sideEffects) && (r3.scripts[e4] = n2));
  for (const e5 of n2.css || []) r3.styles[e5] = r3.preload[e5] = r3.prefetch[e5] = t4.manifest[e5];
  for (const e5 of n2.assets || []) r3.preload[e5] = r3.prefetch[e5] = t4.manifest[e5];
  for (const e5 of n2.imports || []) {
    const n3 = getModuleDependencies(e5, t4);
    for (const e6 in n3.styles) r3.styles[e6] = n3.styles[e6];
    for (const e6 in n3.preload) r3.preload[e6] = n3.preload[e6];
    for (const e6 in n3.prefetch) r3.prefetch[e6] = n3.prefetch[e6];
  }
  const s4 = {};
  for (const e5 in r3.preload) {
    const t5 = r3.preload[e5];
    t5.preload && (s4[e5] = t5);
  }
  return r3.preload = s4, r3;
}
function getRequestDependencies(e4, t4) {
  if (e4._requestDependencies) return e4._requestDependencies;
  const r3 = (function(e5, t5) {
    let r4 = "";
    const n2 = [...e5].sort();
    for (let e6 = 0; e6 < n2.length; e6++) e6 > 0 && (r4 += ","), r4 += n2[e6];
    if (t5._dependencySets[r4]) return t5._dependencySets[r4];
    const s4 = { scripts: {}, styles: {}, preload: {}, prefetch: {} };
    for (const r5 of e5) {
      const e6 = getModuleDependencies(r5, t5);
      for (const t6 in e6.scripts) s4.scripts[t6] = e6.scripts[t6];
      for (const t6 in e6.styles) s4.styles[t6] = e6.styles[t6];
      for (const t6 in e6.preload) s4.preload[t6] = e6.preload[t6];
      for (const t6 in e6.prefetch) s4.prefetch[t6] = e6.prefetch[t6];
      for (const e7 of t5.manifest?.[r5]?.dynamicImports || []) {
        const r6 = getModuleDependencies(e7, t5);
        for (const e8 in r6.scripts) s4.prefetch[e8] = r6.scripts[e8];
        for (const e8 in r6.styles) s4.prefetch[e8] = r6.styles[e8];
        for (const e8 in r6.preload) s4.prefetch[e8] = r6.preload[e8];
      }
    }
    const o4 = {};
    for (const e6 in s4.prefetch) {
      const t6 = s4.prefetch[e6];
      t6.prefetch && (o4[e6] = t6);
    }
    s4.prefetch = o4;
    for (const e6 in s4.preload) delete s4.prefetch[e6];
    for (const e6 in s4.styles) delete s4.preload[e6], delete s4.prefetch[e6];
    return t5._dependencySets[r4] = s4, s4;
  })(new Set(Array.from([...t4._entrypoints, ...e4.modules || e4._registeredComponents || []])), t4);
  return e4._requestDependencies = r3, r3;
}
function renderStyles(e4, t4) {
  const { styles: r3 } = getRequestDependencies(e4, t4);
  let n2 = "";
  for (const e5 in r3) {
    const s4 = r3[e5];
    n2 += `<link rel="stylesheet" href="${t4.buildAssetsURL(s4.file)}" crossorigin>`;
  }
  return n2;
}
function renderResourceHints(e4, t4) {
  const { preload: r3, prefetch: n2 } = getRequestDependencies(e4, t4);
  let s4 = "";
  for (const e5 in r3) {
    const n3 = r3[e5], o4 = t4.buildAssetsURL(n3.file), a3 = n3.module ? "modulepreload" : "preload", i3 = "style" === n3.resourceType || "font" === n3.resourceType || "script" === n3.resourceType || n3.module ? " crossorigin" : "";
    n3.resourceType && n3.mimeType ? s4 += `<link rel="${a3}" as="${n3.resourceType}" type="${n3.mimeType}"${i3} href="${o4}">` : n3.resourceType ? s4 += `<link rel="${a3}" as="${n3.resourceType}"${i3} href="${o4}">` : s4 += `<link rel="${a3}"${i3} href="${o4}">`;
  }
  for (const e5 in n2) {
    const r4 = n2[e5], o4 = t4.buildAssetsURL(r4.file), a3 = "style" === r4.resourceType || "font" === r4.resourceType || "script" === r4.resourceType || r4.module ? " crossorigin" : "";
    r4.resourceType && r4.mimeType ? s4 += `<link rel="prefetch" as="${r4.resourceType}" type="${r4.mimeType}"${a3} href="${o4}">` : r4.resourceType ? s4 += `<link rel="prefetch" as="${r4.resourceType}"${a3} href="${o4}">` : s4 += `<link rel="prefetch"${a3} href="${o4}">`;
  }
  return s4;
}
function renderResourceHeaders(e4, t4) {
  const { preload: r3, prefetch: n2 } = getRequestDependencies(e4, t4), s4 = [];
  for (const e5 in r3) {
    const n3 = r3[e5];
    let o4 = `<${t4.buildAssetsURL(n3.file)}>; rel="${n3.module ? "modulepreload" : "preload"}"`;
    n3.resourceType && (o4 += `; as="${n3.resourceType}"`), n3.mimeType && (o4 += `; type="${n3.mimeType}"`), ("style" === n3.resourceType || "font" === n3.resourceType || "script" === n3.resourceType || n3.module) && (o4 += "; crossorigin"), s4.push(o4);
  }
  for (const e5 in n2) {
    const r4 = n2[e5];
    let o4 = `<${t4.buildAssetsURL(r4.file)}>; rel="prefetch"`;
    r4.resourceType && (o4 += `; as="${r4.resourceType}"`), r4.mimeType && (o4 += `; type="${r4.mimeType}"`), ("style" === r4.resourceType || "font" === r4.resourceType || "script" === r4.resourceType || r4.module) && (o4 += "; crossorigin"), s4.push(o4);
  }
  return { link: s4.join(", ") };
}
function getPreloadLinks(e4, t4) {
  const { preload: r3 } = getRequestDependencies(e4, t4), n2 = [];
  for (const e5 in r3) {
    const s4 = r3[e5];
    n2.push({ rel: s4.module ? "modulepreload" : "preload", as: s4.resourceType, type: s4.mimeType ?? null, crossorigin: "style" === s4.resourceType || "font" === s4.resourceType || "script" === s4.resourceType || s4.module ? "" : null, href: t4.buildAssetsURL(s4.file) });
  }
  return n2;
}
function getPrefetchLinks(e4, t4) {
  const { prefetch: r3 } = getRequestDependencies(e4, t4), n2 = [];
  for (const e5 in r3) {
    const s4 = r3[e5];
    n2.push({ rel: "prefetch", as: s4.resourceType, type: s4.mimeType ?? null, crossorigin: "style" === s4.resourceType || "font" === s4.resourceType || "script" === s4.resourceType || s4.module ? "" : null, href: t4.buildAssetsURL(s4.file) });
  }
  return n2;
}
function renderScripts(e4, t4) {
  const { scripts: r3 } = getRequestDependencies(e4, t4);
  let n2 = "";
  for (const e5 in r3) {
    const s4 = r3[e5];
    s4.module ? n2 += `<script type="module" src="${t4.buildAssetsURL(s4.file)}" crossorigin><\/script>` : n2 += `<script src="${t4.buildAssetsURL(s4.file)}" defer crossorigin><\/script>`;
  }
  return n2;
}
function createRenderer(t4, r3) {
  const n2 = (function({ manifest: t5, precomputed: r4, buildAssetsURL: n3 }) {
    if (!t5 && !r4) throw new Error("Either manifest or precomputed data must be provided");
    const s4 = { buildAssetsURL: n3 || withLeadingSlash, manifest: t5, precomputed: r4, updateManifest, _dependencies: {}, _dependencySets: {}, _entrypoints: [] };
    function updateManifest(e4) {
      const t6 = Object.entries(e4);
      s4.manifest = e4, s4._dependencies = {}, s4._dependencySets = {}, s4._entrypoints = t6.filter((e5) => e5[1].isEntry).map(([e5]) => e5);
    }
    __name(updateManifest, "updateManifest");
    return r4 ? (s4._dependencies = r4.dependencies, s4._entrypoints = r4.entrypoints) : t5 && updateManifest(t5), s4;
  })(r3);
  return { rendererContext: n2, async renderToString(e4) {
    e4._registeredComponents = e4._registeredComponents || /* @__PURE__ */ new Set();
    const s4 = await Promise.resolve(t4).then((e5) => "default" in e5 ? e5.default : e5), o4 = await s4(e4), wrap = /* @__PURE__ */ __name((t5) => () => t5(e4, n2), "wrap");
    return { html: await r3.renderToString(o4, e4), renderResourceHeaders: wrap(renderResourceHeaders), renderResourceHints: wrap(renderResourceHints), renderStyles: wrap(renderStyles), renderScripts: wrap(renderScripts) };
  } };
}
function flatHooks(e4, t4 = {}, r3) {
  for (const n2 in e4) {
    const s4 = e4[n2], o4 = r3 ? `${r3}:${n2}` : n2;
    "object" == typeof s4 && null !== s4 ? flatHooks(s4, t4, o4) : "function" == typeof s4 && (t4[o4] = s4);
  }
  return t4;
}
function callHooks(e4, t4, r3, n2) {
  for (let s4 = r3; s4 < e4.length; s4 += 1) try {
    const r4 = n2 ? n2.run(() => e4[s4](...t4)) : e4[s4](...t4);
    if (r4 && "function" == typeof r4.then) return Promise.resolve(r4).then(() => callHooks(e4, t4, s4 + 1, n2));
  } catch (e5) {
    return Promise.reject(e5);
  }
}
function serialTaskCaller(e4, t4, r3) {
  if (e4.length > 0) return callHooks(e4, t4, 0, m2(r3));
}
function parallelTaskCaller(e4, t4, r3) {
  if (e4.length > 0) {
    const n2 = m2(r3);
    return Promise.all(e4.map((e5) => n2.run(() => e5(...t4))));
  }
}
function callEachWith(e4, t4) {
  for (const r3 of [...e4]) r3(t4);
}
function dedupeKey(e4) {
  const { props: t4, tag: r3 } = e4;
  if (A.has(r3)) return r3;
  if ("link" === r3 && "canonical" === t4.rel) return "canonical";
  if ("link" === r3 && "alternate" === t4.rel) {
    if (t4.hreflang) return `alternate:${t4.hreflang}`;
    if (t4.type) return `alternate:${t4.type}:${t4.href || ""}`;
  }
  if (t4.charset) return "charset";
  if ("meta" === e4.tag) {
    for (const n2 of j2) if (void 0 !== t4[n2]) {
      const s4 = t4[n2], o4 = s4 && "string" == typeof s4 && s4.includes(":"), a3 = s4 && O.has(s4);
      return `${r3}:${s4}${!(o4 || a3) && e4.key ? `:key:${e4.key}` : ""}`;
    }
  }
  if (e4.key) return `${r3}:key:${e4.key}`;
  if (t4.id) return `${r3}:id:${t4.id}`;
  if ("link" === r3 && "alternate" === t4.rel) return `alternate:${t4.href || ""}`;
  if (k.has(r3)) {
    const t5 = e4.textContent || e4.innerHTML;
    if (t5) return `${r3}:content:${t5}`;
  }
}
function hashTag(e4) {
  const t4 = e4._h || e4._d;
  if (t4) return t4;
  const r3 = e4.textContent || e4.innerHTML;
  return r3 || `${e4.tag}:${Object.entries(e4.props).map(([e5, t5]) => `${e5}:${String(t5)}`).join(",")}`;
}
function walkResolver(e4, t4, r3) {
  "function" === typeof e4 && (r3 && ("titleTemplate" === r3 || "o" === r3[0] && "n" === r3[1]) || (e4 = e4()));
  const n2 = t4 ? t4(r3, e4) : e4;
  if (Array.isArray(n2)) return n2.map((e5) => walkResolver(e5, t4));
  if (n2?.constructor === Object) {
    const e5 = {};
    for (const r4 of Object.keys(n2)) e5[r4] = walkResolver(n2[r4], t4, r4);
    return e5;
  }
  return n2;
}
function normalizeProps(e4, t4) {
  if (e4.props = e4.props || {}, !t4) return e4;
  if ("templateParams" === e4.tag) return e4.props = t4, e4;
  const r3 = w.has(e4.tag) || "htmlAttrs" === e4.tag || "bodyAttrs" === e4.tag;
  return Object.entries(t4).forEach(([n2, s4]) => {
    if ("__proto__" === n2 || "constructor" === n2 || "prototype" === n2) return;
    if (null === s4) return void (e4.props[n2] = null);
    if ("class" === n2 || "style" === n2) return void (e4.props[n2] = (function(e5, t5) {
      const r4 = "style" === e5 ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set();
      function processValue(t6) {
        if (null == t6 || void 0 === t6) return;
        const n3 = String(t6).trim();
        if (n3) if ("style" === e5) {
          const [e6, ...t7] = n3.split(":").map((e7) => e7 ? e7.trim() : "");
          e6 && t7.length && r4.set(e6, t7.join(":"));
        } else n3.split(" ").filter(Boolean).forEach((e6) => r4.add(e6));
      }
      __name(processValue, "processValue");
      return "string" == typeof t5 ? "style" === e5 ? t5.split(";").forEach(processValue) : processValue(t5) : Array.isArray(t5) ? t5.forEach((e6) => processValue(e6)) : t5 && "object" == typeof t5 && Object.entries(t5).forEach(([t6, n3]) => {
        n3 && "false" !== n3 && ("style" === e5 ? r4.set(String(t6).trim(), String(n3)) : processValue(t6));
      }), r4;
    })(n2, s4));
    if (v.has(n2)) {
      if ("textContent" !== n2 && "innerHTML" !== n2 || "object" != typeof s4) e4[n2] = s4;
      else {
        let r4 = t4.type;
        if (t4.type || (r4 = "application/json"), !r4?.endsWith("json") && "speculationrules" !== r4) return;
        t4.type = r4, e4.props.type = r4, e4[n2] = JSON.stringify(s4);
      }
      return;
    }
    const o4 = n2.startsWith("data-"), a3 = r3 && !o4 ? n2.toLowerCase() : n2, i3 = String(s4), c3 = "meta" === e4.tag && "content" === a3;
    "true" === i3 || "" === i3 ? e4.props[a3] = !o4 && !c3 || i3 : !s4 && o4 && "false" === i3 ? e4.props[a3] = "false" : void 0 !== s4 && (e4.props[a3] = s4);
  }), e4;
}
function normalizeTag(e4, t4) {
  const r3 = normalizeProps({ tag: e4, props: {} }, "object" == typeof t4 && "function" != typeof t4 ? t4 : { ["script" === e4 || "noscript" === e4 || "style" === e4 ? "innerHTML" : "textContent"]: t4 });
  return r3.key && $.has(r3.tag) && (r3.props["data-hid"] = r3._h = r3.key), "script" === r3.tag && "object" == typeof r3.innerHTML && (r3.innerHTML = JSON.stringify(r3.innerHTML), r3.props.type = r3.props.type || "application/json"), Array.isArray(r3.props.content) ? r3.props.content.map((e5) => ({ ...r3, props: { ...r3.props, content: e5 } })) : r3;
}
function normalizeEntryToTags(e4, t4) {
  if (!e4) return [];
  "function" == typeof e4 && (e4 = e4());
  const resolvers = /* @__PURE__ */ __name((e5, r4) => {
    for (let n2 = 0; n2 < t4.length; n2++) r4 = t4[n2](e5, r4);
    return r4;
  }, "resolvers");
  e4 = resolvers(void 0, e4);
  const r3 = [];
  return e4 = walkResolver(e4, resolvers), Object.entries(e4 || {}).forEach(([e5, t5]) => {
    if (void 0 !== t5) for (const n2 of Array.isArray(t5) ? t5 : [t5]) r3.push(normalizeTag(e5, n2));
  }), r3.flat();
}
function tagWeight(e4, t4) {
  if ("number" == typeof t4.tagPriority) return t4.tagPriority;
  let r3 = 100;
  const n2 = L[t4.tagPriority] || 0, s4 = e4.resolvedOptions.disableCapoSorting ? { link: {}, script: {}, style: {} } : H;
  if (t4.tag in P) r3 = P[t4.tag];
  else if ("meta" === t4.tag) {
    const e5 = "content-security-policy" === t4.props["http-equiv"] ? "content-security-policy" : t4.props.charset ? "charset" : "viewport" === t4.props.name ? "viewport" : null;
    e5 && (r3 = H.meta[e5]);
  } else if ("link" === t4.tag && t4.props.rel) r3 = s4.link[t4.props.rel];
  else if ("script" === t4.tag) {
    const e5 = String(t4.props.type);
    isTruthy(t4.props.async) ? r3 = s4.script.async : t4.props.src && !isTruthy(t4.props.defer) && !isTruthy(t4.props.async) && "module" !== e5 && !e5.endsWith("json") || t4.innerHTML && !e5.endsWith("json") ? r3 = s4.script.sync : (isTruthy(t4.props.defer) && t4.props.src && !isTruthy(t4.props.async) || "module" === e5) && (r3 = s4.script.defer);
  } else "style" === t4.tag && (r3 = t4.innerHTML && U.test(t4.innerHTML) ? s4.style.imported : s4.style.sync);
  return (r3 || 100) + n2;
}
function registerPlugin(e4, t4) {
  const r3 = "function" == typeof t4 ? t4(e4) : t4, n2 = r3.key || String(e4.plugins.size + 1);
  e4.plugins.get(n2) || (e4.plugins.set(n2, r3), e4.hooks.addHooks(r3.hooks || {}));
}
function createUnhead(e4 = {}) {
  const t4 = new _();
  t4.addHooks(e4.hooks || {});
  const r3 = !e4.document, n2 = /* @__PURE__ */ new Map(), s4 = /* @__PURE__ */ new Map(), o4 = /* @__PURE__ */ new Set(), a3 = { _entryCount: 1, plugins: s4, dirty: false, resolvedOptions: e4, hooks: t4, ssr: r3, entries: n2, headEntries: /* @__PURE__ */ __name(() => [...n2.values()], "headEntries"), use: /* @__PURE__ */ __name((e5) => registerPlugin(a3, e5), "use"), push(e5, s5) {
    const i3 = { ...s5 || {} };
    delete i3.head;
    const c3 = i3._index ?? a3._entryCount++, l3 = { _i: c3, input: e5, options: i3 }, p3 = { _poll(e6 = false) {
      a3.dirty = true, !e6 && o4.add(c3), t4.callHook("entries:updated", a3);
    }, dispose() {
      n2.delete(c3) && a3.invalidate();
    }, patch(e6) {
      (!i3.mode || "server" === i3.mode && r3 || "client" === i3.mode && !r3) && (l3.input = e6, n2.set(c3, l3), p3._poll());
    } };
    return p3.patch(e5), p3;
  }, async resolveTags() {
    const r4 = { tagMap: /* @__PURE__ */ new Map(), tags: [], entries: [...a3.entries.values()] };
    for (await t4.callHook("entries:resolve", r4); o4.size; ) {
      const r5 = o4.values().next().value;
      o4.delete(r5);
      const s6 = n2.get(r5);
      if (s6) {
        const r6 = { tags: normalizeEntryToTags(s6.input, e4.propResolvers || []).map((e5) => Object.assign(e5, s6.options)), entry: s6 };
        await t4.callHook("entries:normalize", r6), s6._tags = r6.tags.map((e5, t5) => (e5._w = tagWeight(a3, e5), e5._p = (s6._i << 10) + t5, e5._d = dedupeKey(e5), e5._d || (e5._h = hashTag(e5)), e5));
      }
    }
    let s5 = false;
    r4.entries.flatMap((e5) => (e5._tags || []).map((e6) => ({ ...e6, props: { ...e6.props } }))).sort(sortTags).reduce((e5, t5) => {
      const r5 = t5._d || t5._h;
      if (!e5.has(r5)) return e5.set(r5, t5);
      const n3 = e5.get(r5);
      if ("merge" === (t5?.tagDuplicateStrategy || (S.has(t5.tag) ? "merge" : null) || (t5.key && t5.key === n3.key ? "merge" : null))) {
        const s6 = { ...n3.props };
        Object.entries(t5.props).forEach(([e6, t6]) => s6[e6] = "style" === e6 ? new Map([...n3.props.style || /* @__PURE__ */ new Map(), ...t6]) : "class" === e6 ? /* @__PURE__ */ new Set([...n3.props.class || /* @__PURE__ */ new Set(), ...t6]) : t6), e5.set(r5, { ...t5, props: s6 });
      } else t5._p >> 10 == n3._p >> 10 && "meta" === t5.tag && (function(e6) {
        const t6 = e6.split(":");
        return !!t6.length && R.has(t6[1]);
      })(r5) ? (e5.set(r5, Object.assign([...Array.isArray(n3) ? n3 : [n3], t5], t5)), s5 = true) : (t5._w === n3._w ? t5._p > n3._p : t5?._w < n3?._w) && e5.set(r5, t5);
      return e5;
    }, r4.tagMap);
    const i3 = r4.tagMap.get("title"), c3 = r4.tagMap.get("titleTemplate");
    if (a3._title = i3?.textContent, c3) {
      const e5 = c3?.textContent;
      if (a3._titleTemplate = e5, e5) {
        let t5 = "function" == typeof e5 ? e5(i3?.textContent) : e5;
        "string" != typeof t5 || a3.plugins.has("template-params") || (t5 = t5.replace("%s", i3?.textContent || "")), i3 ? null === t5 ? r4.tagMap.delete("title") : r4.tagMap.set("title", { ...i3, textContent: t5 }) : (c3.tag = "title", c3.textContent = t5);
      }
    }
    r4.tags = Array.from(r4.tagMap.values()), s5 && (r4.tags = r4.tags.flat().sort(sortTags)), await t4.callHook("tags:beforeResolve", r4), await t4.callHook("tags:resolve", r4), await t4.callHook("tags:afterResolve", r4);
    const l3 = [];
    for (const e5 of r4.tags) {
      const { innerHTML: t5, tag: r5, props: n3 } = e5;
      if (T.has(r5) && ((0 !== Object.keys(n3).length || e5.innerHTML || e5.textContent) && ("meta" !== r5 || n3.content || n3["http-equiv"] || n3.charset))) {
        if ("script" === r5 && t5) {
          if (String(n3.type).endsWith("json")) {
            const r6 = "string" == typeof t5 ? t5 : JSON.stringify(t5);
            e5.innerHTML = r6.replace(/</g, "\\u003C");
          } else "string" == typeof t5 && (e5.innerHTML = t5.replace(new RegExp(`</${r5}`, "g"), `<\\/${r5}`));
          e5._d = dedupeKey(e5);
        }
        l3.push(e5);
      }
    }
    return l3;
  }, invalidate() {
    for (const e5 of n2.values()) o4.add(e5._i);
    a3.dirty = true, t4.callHook("entries:updated", a3);
  } };
  return (e4?.plugins || []).forEach((e5) => registerPlugin(a3, e5)), a3.hooks.callHook("init", a3), e4.init?.forEach((e5) => e5 && a3.push(e5)), a3;
}
function encodeAttribute(e4) {
  return String(e4).replace(/"/g, "&quot;");
}
function propsToString(e4) {
  let t4 = "";
  for (const r3 in e4) {
    if (!Object.hasOwn(e4, r3)) continue;
    let n2 = e4[r3];
    "class" !== r3 && "style" !== r3 || "string" == typeof n2 || (n2 = "class" === r3 ? Array.from(n2).join(" ") : Array.from(n2).map(([e5, t5]) => `${e5}:${t5}`).join(";")), false !== n2 && null !== n2 && (t4 += true === n2 ? ` ${r3}` : ` ${r3}="${encodeAttribute(n2)}"`);
  }
  return t4;
}
function tagToString(e4) {
  const t4 = propsToString(e4.props), r3 = `<${e4.tag}${t4}>`;
  if (!k.has(e4.tag)) return b.has(e4.tag) ? r3 : `${r3}</${e4.tag}>`;
  let n2 = String(e4.textContent || e4.innerHTML || "");
  return n2 = "title" === e4.tag ? n2.replace(/[&<>"'/]/g, (e5) => {
    switch (e5) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#x27;";
      case "/":
        return "&#x2F;";
      default:
        return e5;
    }
  }) : n2.replace(new RegExp(`</${e4.tag}`, "gi"), `<\\/${e4.tag}`), b.has(e4.tag) ? r3 : `${r3}${n2}</${e4.tag}>`;
}
async function renderSSRHead(e4, t4) {
  const r3 = { shouldRender: true };
  if (await e4.hooks.callHook("ssr:beforeRender", r3), !r3.shouldRender) return { headTags: "", bodyTags: "", bodyTagsOpen: "", htmlAttrs: "", bodyAttrs: "" };
  const n2 = { tags: t4?.resolvedTags || await e4.resolveTags() };
  await e4.hooks.callHook("ssr:render", n2);
  const s4 = (function(e5) {
    const t5 = { htmlAttrs: {}, bodyAttrs: {}, tags: { head: "", bodyClose: "", bodyOpen: "" } };
    for (const r4 of e5) {
      if ("htmlAttrs" === r4.tag || "bodyAttrs" === r4.tag) {
        Object.assign(t5[r4.tag], r4.props);
        continue;
      }
      const e6 = tagToString(r4), n3 = r4.tagPosition || "head";
      t5.tags[n3] += t5.tags[n3] ? `${e6}` : e6;
    }
    return { headTags: t5.tags.head, bodyTags: t5.tags.bodyClose, bodyTagsOpen: t5.tags.bodyOpen, htmlAttrs: propsToString(t5.htmlAttrs), bodyAttrs: propsToString(t5.bodyAttrs) };
  })(n2.tags), o4 = { tags: n2.tags, html: s4 };
  return await e4.hooks.callHook("ssr:rendered", o4), o4.html;
}
function isRef(e4) {
  return !!e4 && true === e4.__v_isRef;
}
function toValue(e4) {
  return isFunction(e4) ? e4() : isRef(t4 = e4) ? t4.value : t4;
  var t4;
}
function createHead(e4 = {}) {
  const t4 = (function(e5 = {}) {
    const t5 = createUnhead({ ...e5, document: false, propResolvers: [...e5.propResolvers || [], (e6, t6) => e6 && e6.startsWith("on") && "function" == typeof t6 ? `this.dataset.${e6}fired = true` : t6], init: [e5.disableDefaults ? void 0 : { htmlAttrs: { lang: "en" }, meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }] }, ...e5.init || []] });
    return t5._ssrPayload = {}, t5.use({ key: "server", hooks: { "tags:resolve": /* @__PURE__ */ __name(function(e6) {
      const r3 = e6.tagMap.get("title"), n2 = e6.tagMap.get("titleTemplate");
      let s4 = { title: "server" === r3?.mode ? t5._title : void 0, titleTemplate: "server" === n2?.mode ? t5._titleTemplate : void 0 };
      Object.keys(t5._ssrPayload || {}).length > 0 && (s4 = { ...t5._ssrPayload, ...s4 }), Object.values(s4).some(Boolean) && e6.tags.push({ tag: "script", innerHTML: JSON.stringify(s4), props: { id: "unhead:payload", type: "application/json" } });
    }, "tags:resolve") } }), t5;
  })({ ...e4, propResolvers: [VueResolver] });
  return t4.install = (function(e5) {
    return { install(t5) {
      t5.config.globalProperties.$unhead = e5, t5.config.globalProperties.$head = e5, t5.provide("usehead", e5);
    } }.install;
  })(t4), t4;
}
function buildAssetsURL(...e4) {
  return joinRelativeURL(publicAssetsURL(), useRuntimeConfig().app.buildAssetsDir, ...e4);
}
function publicAssetsURL(...e4) {
  const n2 = useRuntimeConfig().app, s4 = n2.cdnURL || n2.baseURL;
  return e4.length ? joinRelativeURL(s4, ...e4) : s4;
}
function is_primitive(e4) {
  return null === e4 || "object" != typeof e4 && "function" != typeof e4;
}
function is_plain_object(e4) {
  const t4 = Object.getPrototypeOf(e4);
  return t4 === Object.prototype || null === t4 || null === Object.getPrototypeOf(t4) || Object.getOwnPropertyNames(t4).sort().join("\0") === z;
}
function get_type(e4) {
  return Object.prototype.toString.call(e4).slice(8, -1);
}
function get_escaped_char(e4) {
  switch (e4) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return e4 < " " ? `\\u${e4.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(e4) {
  let t4 = "", r3 = 0;
  const n2 = e4.length;
  for (let s4 = 0; s4 < n2; s4 += 1) {
    const n3 = get_escaped_char(e4[s4]);
    n3 && (t4 += e4.slice(r3, s4) + n3, r3 = s4 + 1);
  }
  return `"${0 === r3 ? e4 : t4 + e4.slice(r3)}"`;
}
function enumerable_symbols(e4) {
  return Object.getOwnPropertySymbols(e4).filter((t4) => Object.getOwnPropertyDescriptor(e4, t4).enumerable);
}
function stringify_key(e4) {
  return F.test(e4) ? "." + e4 : "[" + JSON.stringify(e4) + "]";
}
function is_valid_array_index_string(e4) {
  if (0 === e4.length) return false;
  if (e4.length > 1 && 48 === e4.charCodeAt(0)) return false;
  for (let t5 = 0; t5 < e4.length; t5++) {
    const r3 = e4.charCodeAt(t5);
    if (r3 < 48 || r3 > 57) return false;
  }
  return t4 = +e4, !(!Number.isInteger(t4) || t4 < 0 || t4 > 4294967294);
  var t4;
}
function valid_array_indices(e4) {
  const t4 = Object.keys(e4);
  for (var r3 = t4.length - 1; r3 >= 0 && !is_valid_array_index_string(t4[r3]); r3--) ;
  return t4.length = r3 + 1, t4;
}
function uneval(e4, t4) {
  const r3 = /* @__PURE__ */ new Map(), n2 = [], s4 = /* @__PURE__ */ new Map();
  !(/* @__PURE__ */ __name(function walk(t5) {
    if (is_primitive(t5)) {
      if ("symbol" == typeof t5) throw new DevalueError("Cannot stringify a Symbol primitive", n2, t5, e4);
    } else {
      if (r3.has(t5)) return void r3.set(t5, r3.get(t5) + 1);
      if (r3.set(t5, 1), "function" == typeof t5) throw new DevalueError("Cannot stringify a function", n2, t5, e4);
      switch (get_type(t5)) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
        case "URL":
        case "URLSearchParams":
        case "ArrayBuffer":
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          return;
        case "Array":
          t5.forEach((e5, t6) => {
            n2.push(`[${t6}]`), walk(e5), n2.pop();
          });
          break;
        case "Set":
          Array.from(t5).forEach(walk);
          break;
        case "Map":
          for (const [e5, r4] of t5) n2.push(`.get(${is_primitive(e5) ? stringify_primitive$1(e5) : "..."})`), walk(r4), n2.pop();
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
        case "DataView":
          return void walk(t5.buffer);
        default:
          if (!is_plain_object(t5)) throw new DevalueError("Cannot stringify arbitrary non-POJOs", n2, t5, e4);
          if (enumerable_symbols(t5).length > 0) throw new DevalueError("Cannot stringify POJOs with symbolic keys", n2, t5, e4);
          for (const r4 of Object.keys(t5)) {
            if ("__proto__" === r4) throw new DevalueError("Cannot stringify objects with __proto__ keys", n2, t5, e4);
            n2.push(stringify_key(r4)), walk(t5[r4]), n2.pop();
          }
      }
    }
  }, "walk"))(e4);
  const o4 = /* @__PURE__ */ new Map();
  function stringify3(e5) {
    if (o4.has(e5)) return o4.get(e5);
    if (is_primitive(e5)) return stringify_primitive$1(e5);
    if (s4.has(e5)) return s4.get(e5);
    const t5 = get_type(e5);
    switch (t5) {
      case "Number":
      case "String":
      case "Boolean":
      case "BigInt":
        return `Object(${stringify3(e5.valueOf())})`;
      case "RegExp":
        const { source: r4, flags: n3 } = e5;
        return n3 ? `new RegExp(${stringify_string(r4)},"${n3}")` : `new RegExp(${stringify_string(r4)})`;
      case "Date":
        return `new Date(${e5.getTime()})`;
      case "URL":
        return `new URL(${stringify_string(e5.toString())})`;
      case "URLSearchParams":
        return `new URLSearchParams(${stringify_string(e5.toString())})`;
      case "Array": {
        let t6 = false, r5 = "[";
        for (let n4 = 0; n4 < e5.length; n4 += 1) if (n4 > 0 && (r5 += ","), Object.hasOwn(e5, n4)) r5 += stringify3(e5[n4]);
        else if (!t6) {
          const r6 = valid_array_indices(e5), s6 = r6.length, o5 = String(e5.length).length;
          if (e5.length + 2 > 25 + o5 + s6 * (o5 + 2)) {
            const t7 = r6.map((t8) => `${t8}:${stringify3(e5[t8])}`).join(",");
            return `Object.assign(Array(${e5.length}),{${t7}})`;
          }
          t6 = true, n4 -= 1;
        }
        return r5 + (0 === e5.length || e5.length - 1 in e5 ? "" : ",") + "]";
      }
      case "Set":
      case "Map":
        return `new ${t5}([${Array.from(e5).map(stringify3).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Float16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        let r5 = `new ${t5}`;
        if (o4.has(e5.buffer)) r5 += `(${stringify3(e5.buffer)})`;
        else {
          r5 += `([${new e5.constructor(e5.buffer)}])`;
        }
        if (e5.byteLength !== e5.buffer.byteLength) {
          const t6 = e5.byteOffset / e5.BYTES_PER_ELEMENT;
          r5 += `.subarray(${t6},${t6 + e5.length})`;
        }
        return r5;
      }
      case "DataView": {
        let t6 = "new DataView";
        return o4.has(e5.buffer) ? t6 += `(${stringify3(e5.buffer)}` : t6 += `(new Uint8Array([${new Uint8Array(e5.buffer)}]).buffer`, e5.byteLength !== e5.buffer.byteLength && (t6 += `,${e5.startOffset},${e5.byteLength}`), t6 + ")";
      }
      case "ArrayBuffer":
        return `new Uint8Array([${new Uint8Array(e5).toString()}]).buffer`;
      case "Temporal.Duration":
      case "Temporal.Instant":
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.PlainMonthDay":
      case "Temporal.PlainYearMonth":
      case "Temporal.ZonedDateTime":
        return `${t5}.from(${stringify_string(e5.toString())})`;
      default:
        const s5 = Object.keys(e5), a4 = s5.map((t6) => `${(function(e6) {
          return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e6) ? e6 : escape_unsafe_chars(JSON.stringify(e6));
        })(t6)}:${stringify3(e5[t6])}`).join(",");
        return null === Object.getPrototypeOf(e5) ? s5.length > 0 ? `{${a4},__proto__:null}` : "{__proto__:null}" : `{${a4}}`;
    }
  }
  __name(stringify3, "stringify");
  Array.from(r3).filter((e5) => e5[1] > 1).sort((e5, t5) => t5[1] - e5[1]).forEach((e5, t5) => {
    o4.set(e5[0], (function(e6) {
      let t6 = "";
      do {
        t6 = W[e6 % 54] + t6, e6 = ~~(e6 / 54) - 1;
      } while (e6 >= 0);
      return J.test(t6) ? `${t6}0` : t6;
    })(t5));
  });
  const a3 = stringify3(e4);
  if (o4.size) {
    const e5 = [], t5 = [], r4 = [];
    return o4.forEach((n3, a4) => {
      if (e5.push(n3), s4.has(a4)) return void r4.push(s4.get(a4));
      if (is_primitive(a4)) return void r4.push(stringify_primitive$1(a4));
      const i3 = get_type(a4);
      switch (i3) {
        case "Number":
        case "String":
        case "Boolean":
        case "BigInt":
          r4.push(`Object(${stringify3(a4.valueOf())})`);
          break;
        case "RegExp":
          const { source: e6, flags: s5 } = a4, c3 = s5 ? `new RegExp(${stringify_string(e6)},"${s5}")` : `new RegExp(${stringify_string(e6)})`;
          r4.push(c3);
          break;
        case "Date":
          r4.push(`new Date(${a4.getTime()})`);
          break;
        case "URL":
          r4.push(`new URL(${stringify_string(a4.toString())})`);
          break;
        case "URLSearchParams":
          r4.push(`new URLSearchParams(${stringify_string(a4.toString())})`);
          break;
        case "Array":
          r4.push(`Array(${a4.length})`), a4.forEach((e7, r5) => {
            t5.push(`${n3}[${r5}]=${stringify3(e7)}`);
          });
          break;
        case "Set":
          r4.push("new Set"), t5.push(`${n3}.${Array.from(a4).map((e7) => `add(${stringify3(e7)})`).join(".")}`);
          break;
        case "Map":
          r4.push("new Map"), t5.push(`${n3}.${Array.from(a4).map(([e7, t6]) => `set(${stringify3(e7)}, ${stringify3(t6)})`).join(".")}`);
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          let e7 = `new ${i3}`;
          if (o4.has(a4.buffer)) e7 += `(${stringify3(a4.buffer)})`;
          else {
            e7 += `([${new a4.constructor(a4.buffer)}])`;
          }
          if (a4.byteLength !== a4.buffer.byteLength) {
            const t6 = a4.byteOffset / a4.BYTES_PER_ELEMENT;
            e7 += `.subarray(${t6},${t6 + a4.length})`;
          }
          r4.push("{}"), t5.push(`${n3}=${e7}`);
          break;
        }
        case "DataView": {
          let e7 = "new DataView";
          o4.has(a4.buffer) ? e7 += `(${stringify3(a4.buffer)}` : e7 += `(new Uint8Array([${new Uint8Array(a4.buffer)}]).buffer`, a4.byteLength !== a4.buffer.byteLength && (e7 += `,${a4.byteOffset},${a4.byteLength}`), e7 += ")", r4.push("{}"), t5.push(`${n3}=${e7}`);
          break;
        }
        case "ArrayBuffer":
          r4.push(`new Uint8Array([${new Uint8Array(a4)}]).buffer`);
          break;
        default:
          r4.push(null === Object.getPrototypeOf(a4) ? "Object.create(null)" : "{}"), Object.keys(a4).forEach((e7) => {
            t5.push(`${n3}${(function(e8) {
              return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e8) ? `.${e8}` : `[${escape_unsafe_chars(JSON.stringify(e8))}]`;
            })(e7)}=${stringify3(a4[e7])}`);
          });
      }
    }), t5.push(`return ${a3}`), `(function(${e5.join(",")}){${t5.join(";")}}(${r4.join(",")}))`;
  }
  return a3;
}
function escape_unsafe_char(e4) {
  return B[e4] || e4;
}
function escape_unsafe_chars(e4) {
  return e4.replace(q, escape_unsafe_char);
}
function stringify_primitive$1(e4) {
  const t4 = typeof e4;
  if ("string" === t4) return stringify_string(e4);
  if (void 0 === e4) return "void 0";
  if (0 === e4 && 1 / e4 < 0) return "-0";
  const r3 = String(e4);
  return "number" === t4 ? r3.replace(/^(-)?0\./, "$1.") : "bigint" === t4 ? e4 + "n" : r3;
}
function stringify(e4, t4) {
  const r3 = (function(e5, t5, r4) {
    const n2 = [], s4 = /* @__PURE__ */ new Map(), o4 = [];
    if (r4) for (const e6 of Object.getOwnPropertyNames(r4)) o4.push({ key: e6, fn: r4[e6] });
    const a3 = [];
    let i3 = 0;
    function flatten(e6, r5) {
      if (void 0 === e6) return -1;
      if (Number.isNaN(e6)) return -3;
      if (e6 === 1 / 0) return -4;
      if (e6 === -1 / 0) return -5;
      if (0 === e6 && 1 / e6 < 0) return -6;
      if (s4.has(e6)) return s4.get(e6);
      r5 ??= i3++, s4.set(e6, r5);
      for (const { key: t6, fn: s5 } of o4) {
        const o5 = s5(e6);
        if (o5) return n2[r5] = `["${t6}",${flatten(o5)}]`, r5;
      }
      if ("function" == typeof e6) throw new DevalueError("Cannot stringify a function", a3, e6, t5);
      if ("symbol" == typeof e6) throw new DevalueError("Cannot stringify a Symbol primitive", a3, e6, t5);
      let c4 = "";
      if (is_primitive(e6)) c4 = stringify_primitive(e6);
      else {
        if ("function" == typeof e6.then) throw new DevalueError("Cannot stringify a Promise or thenable \u2014 use stringifyAsync instead", a3, e6, t5);
        {
          const r6 = get_type(e6);
          switch (r6) {
            case "Number":
            case "String":
            case "Boolean":
            case "BigInt":
              c4 = `["Object",${flatten(e6.valueOf())}]`;
              break;
            case "Date":
              c4 = `["Date","${!isNaN(e6.getDate()) ? e6.toISOString() : ""}"]`;
              break;
            case "URL":
              c4 = `["URL",${stringify_string(e6.toString())}]`;
              break;
            case "URLSearchParams":
              c4 = `["URLSearchParams",${stringify_string(e6.toString())}]`;
              break;
            case "RegExp":
              const { source: n3, flags: s5 } = e6;
              c4 = s5 ? `["RegExp",${stringify_string(n3)},"${s5}"]` : `["RegExp",${stringify_string(n3)}]`;
              break;
            case "Array": {
              let t6 = false;
              c4 = "[";
              for (let r7 = 0; r7 < e6.length; r7 += 1) if (r7 > 0 && (c4 += ","), Object.hasOwn(e6, r7)) a3.push(`[${r7}]`), c4 += flatten(e6[r7]), a3.pop();
              else if (t6) c4 += -2;
              else {
                const r8 = valid_array_indices(e6), n4 = r8.length, s6 = String(e6.length).length;
                if (3 * (e6.length - n4) > 4 + s6 + n4 * (s6 + 1)) {
                  c4 = "[-7," + e6.length;
                  for (let t7 = 0; t7 < r8.length; t7++) {
                    const n5 = r8[t7];
                    a3.push(`[${n5}]`), c4 += "," + n5 + "," + flatten(e6[n5]), a3.pop();
                  }
                  break;
                }
                t6 = true, c4 += -2;
              }
              c4 += "]";
              break;
            }
            case "Set":
              c4 = '["Set"';
              for (const t6 of e6) c4 += `,${flatten(t6)}`;
              c4 += "]";
              break;
            case "Map":
              c4 = '["Map"';
              for (const [t6, r7] of e6) a3.push(`.get(${is_primitive(t6) ? stringify_primitive(t6) : "..."})`), c4 += `,${flatten(t6)},${flatten(r7)}`, a3.pop();
              c4 += "]";
              break;
            case "Int8Array":
            case "Uint8Array":
            case "Uint8ClampedArray":
            case "Int16Array":
            case "Uint16Array":
            case "Float16Array":
            case "Int32Array":
            case "Uint32Array":
            case "Float32Array":
            case "Float64Array":
            case "BigInt64Array":
            case "BigUint64Array":
            case "DataView": {
              const t6 = e6;
              c4 = '["' + r6 + '",' + flatten(t6.buffer), t6.byteLength !== t6.buffer.byteLength && (c4 += `,${t6.byteOffset},${t6.length}`), c4 += "]";
              break;
            }
            case "ArrayBuffer":
              c4 = `["ArrayBuffer","${Y(e6)}"]`;
              break;
            case "Temporal.Duration":
            case "Temporal.Instant":
            case "Temporal.PlainDate":
            case "Temporal.PlainTime":
            case "Temporal.PlainDateTime":
            case "Temporal.PlainMonthDay":
            case "Temporal.PlainYearMonth":
            case "Temporal.ZonedDateTime":
              c4 = `["${r6}",${stringify_string(e6.toString())}]`;
              break;
            default:
              if (!is_plain_object(e6)) throw new DevalueError("Cannot stringify arbitrary non-POJOs", a3, e6, t5);
              if (enumerable_symbols(e6).length > 0) throw new DevalueError("Cannot stringify POJOs with symbolic keys", a3, e6, t5);
              if (null === Object.getPrototypeOf(e6)) {
                c4 = '["null"';
                for (const r7 of Object.keys(e6)) {
                  if ("__proto__" === r7) throw new DevalueError("Cannot stringify objects with __proto__ keys", a3, e6, t5);
                  a3.push(stringify_key(r7)), c4 += `,${stringify_string(r7)},${flatten(e6[r7])}`, a3.pop();
                }
                c4 += "]";
              } else {
                c4 = "{";
                let r7 = false;
                for (const n4 of Object.keys(e6)) {
                  if ("__proto__" === n4) throw new DevalueError("Cannot stringify objects with __proto__ keys", a3, e6, t5);
                  r7 && (c4 += ","), r7 = true, a3.push(stringify_key(n4)), c4 += `${stringify_string(n4)}:${flatten(e6[n4])}`, a3.pop();
                }
                c4 += "}";
              }
          }
        }
      }
      return n2[r5] = c4, r5;
    }
    __name(flatten, "flatten");
    const c3 = flatten(t5);
    return c3 < 0 ? `${c3}` : n2;
  })(0, e4, t4);
  return "string" == typeof r3 ? r3 : `[${r3.join(",")}]`;
}
function stringify_primitive(e4) {
  const t4 = typeof e4;
  return "string" === t4 ? stringify_string(e4) : void 0 === e4 ? (-1).toString() : 0 === e4 && 1 / e4 < 0 ? (-6).toString() : "bigint" === t4 ? `["BigInt","${e4}"]` : String(e4);
}
function renderPayloadJsonScript(e4) {
  const t4 = { type: "application/json", innerHTML: e4.data ? encodeForwardSlashes(stringify(e4.data, e4.ssrContext["~payloadReducers"])) : "", "data-nuxt-data": "nuxt-app", "data-ssr": false, id: "__NUXT_DATA__" };
  e4.src && (t4["data-src"] = e4.src);
  return [t4, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${uneval(e4.ssrContext.config)}` }];
}
function encodeForwardSlashes(e4) {
  return e4.replaceAll("/", "\\u002F");
}
function splitPayload(e4) {
  const { data: t4, prerenderedAt: r3, ...n2 } = e4.payload;
  return { initial: { ...n2, prerenderedAt: r3 }, payload: { data: t4, prerenderedAt: r3 } };
}
function createSSRContext(e4) {
  return { url: (function(e5) {
    const t4 = e5.indexOf("?");
    return -1 === t4 ? encodePath(e5) : encodePath(e5.slice(0, t4)) + e5.slice(t4);
  })(e4.path), event: e4, runtimeConfig: useRuntimeConfig(e4), noSSR: true, head: createHead(K), error: false, nuxt: void 0, payload: {}, "~payloadReducers": /* @__PURE__ */ Object.create(null), modules: /* @__PURE__ */ new Set() };
}
function normalizeChunks(e4) {
  const t4 = [];
  for (const r3 of e4) {
    const e5 = r3?.trim();
    e5 && t4.push(e5);
  }
  return t4;
}
function joinTags(e4) {
  return e4.join("");
}
function joinAttrs(e4) {
  return 0 === e4.length ? "" : " " + e4.join(" ");
}
function renderHTMLDocument(e4) {
  return `<!DOCTYPE html><html${joinAttrs(e4.htmlAttrs)}><head>${joinTags(e4.head)}</head><body${joinAttrs(e4.bodyAttrs)}>${joinTags(e4.bodyPrepend)}${joinTags(e4.body)}${joinTags(e4.bodyAppend)}</body></html>`;
}
var m2, _, b, $, k, w, T, A, v, S, R, j2, O, sortTags, P, L, H, U, isTruthy, VueResolver, C, M, x, D, E, N, I, B, DevalueError, z, F, W, q, J, V, Z, Y, K, X, Q, G2, ee, te, re, ne;
var init_renderer = __esm({
  ".wrangler/tmp/pages-snvQxE/chunks/routes/renderer.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    init_shared_esm_bundler();
    __name(getModuleDependencies, "getModuleDependencies");
    __name(getRequestDependencies, "getRequestDependencies");
    __name(renderStyles, "renderStyles");
    __name(renderResourceHints, "renderResourceHints");
    __name(renderResourceHeaders, "renderResourceHeaders");
    __name(getPreloadLinks, "getPreloadLinks");
    __name(getPrefetchLinks, "getPrefetchLinks");
    __name(renderScripts, "renderScripts");
    __name(createRenderer, "createRenderer");
    __name(flatHooks, "flatHooks");
    m2 = (() => {
      if (console.createTask) return console.createTask;
      const e4 = { run: /* @__PURE__ */ __name((e5) => e5(), "run") };
      return () => e4;
    })();
    __name(callHooks, "callHooks");
    __name(serialTaskCaller, "serialTaskCaller");
    __name(parallelTaskCaller, "parallelTaskCaller");
    __name(callEachWith, "callEachWith");
    _ = class {
      static {
        __name(this, "_");
      }
      _hooks;
      _before;
      _after;
      _deprecatedHooks;
      _deprecatedMessages;
      constructor() {
        this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
      }
      hook(e4, t4, r3 = {}) {
        if (!e4 || "function" != typeof t4) return () => {
        };
        const n2 = e4;
        let s4;
        for (; this._deprecatedHooks[e4]; ) s4 = this._deprecatedHooks[e4], e4 = s4.to;
        if (s4 && !r3.allowDeprecated) {
          let e5 = s4.message;
          e5 || (e5 = `${n2} hook has been deprecated` + (s4.to ? `, please use ${s4.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(e5) || (console.warn(e5), this._deprecatedMessages.add(e5));
        }
        if (!t4.name) try {
          Object.defineProperty(t4, "name", { get: /* @__PURE__ */ __name(() => "_" + e4.replace(/\W+/g, "_") + "_hook_cb", "get"), configurable: true });
        } catch {
        }
        return this._hooks[e4] = this._hooks[e4] || [], this._hooks[e4].push(t4), () => {
          t4 && (this.removeHook(e4, t4), t4 = void 0);
        };
      }
      hookOnce(e4, t4) {
        let r3, _function = /* @__PURE__ */ __name((...e5) => ("function" == typeof r3 && r3(), r3 = void 0, _function = void 0, t4(...e5)), "_function");
        return r3 = this.hook(e4, _function), r3;
      }
      removeHook(e4, t4) {
        const r3 = this._hooks[e4];
        if (r3) {
          const n2 = r3.indexOf(t4);
          -1 !== n2 && r3.splice(n2, 1), 0 === r3.length && (this._hooks[e4] = void 0);
        }
      }
      clearHook(e4) {
        this._hooks[e4] = void 0;
      }
      deprecateHook(e4, t4) {
        this._deprecatedHooks[e4] = "string" == typeof t4 ? { to: t4 } : t4;
        const r3 = this._hooks[e4] || [];
        this._hooks[e4] = void 0;
        for (const t5 of r3) this.hook(e4, t5);
      }
      deprecateHooks(e4) {
        for (const t4 in e4) this.deprecateHook(t4, e4[t4]);
      }
      addHooks(e4) {
        const t4 = flatHooks(e4), r3 = Object.keys(t4).map((e5) => this.hook(e5, t4[e5]));
        return () => {
          for (const e5 of r3) e5();
          r3.length = 0;
        };
      }
      removeHooks(e4) {
        const t4 = flatHooks(e4);
        for (const e5 in t4) this.removeHook(e5, t4[e5]);
      }
      removeAllHooks() {
        this._hooks = {};
      }
      callHook(e4, ...t4) {
        return this.callHookWith(serialTaskCaller, e4, t4);
      }
      callHookParallel(e4, ...t4) {
        return this.callHookWith(parallelTaskCaller, e4, t4);
      }
      callHookWith(e4, t4, r3) {
        const n2 = this._before || this._after ? { name: t4, args: r3, context: {} } : void 0;
        this._before && callEachWith(this._before, n2);
        const s4 = e4(this._hooks[t4] ? [...this._hooks[t4]] : [], r3, t4);
        return s4 instanceof Promise ? s4.finally(() => {
          this._after && n2 && callEachWith(this._after, n2);
        }) : (this._after && n2 && callEachWith(this._after, n2), s4);
      }
      beforeEach(e4) {
        return this._before = this._before || [], this._before.push(e4), () => {
          if (void 0 !== this._before) {
            const t4 = this._before.indexOf(e4);
            -1 !== t4 && this._before.splice(t4, 1);
          }
        };
      }
      afterEach(e4) {
        return this._after = this._after || [], this._after.push(e4), () => {
          if (void 0 !== this._after) {
            const t4 = this._after.indexOf(e4);
            -1 !== t4 && this._after.splice(t4, 1);
          }
        };
      }
    };
    b = /* @__PURE__ */ new Set(["meta", "link", "base"]);
    $ = /* @__PURE__ */ new Set(["link", "style", "script", "noscript"]);
    k = /* @__PURE__ */ new Set(["title", "titleTemplate", "script", "style", "noscript"]);
    w = /* @__PURE__ */ new Set(["base", "meta", "link", "style", "script", "noscript"]);
    T = /* @__PURE__ */ new Set(["title", "base", "htmlAttrs", "bodyAttrs", "meta", "link", "style", "script", "noscript"]);
    A = /* @__PURE__ */ new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]);
    v = /* @__PURE__ */ new Set(["key", "tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"]);
    S = /* @__PURE__ */ new Set(["templateParams", "htmlAttrs", "bodyAttrs"]);
    R = /* @__PURE__ */ new Set(["theme-color", "google-site-verification", "og", "article", "book", "profile", "twitter", "author"]);
    j2 = ["name", "property", "http-equiv"];
    O = /* @__PURE__ */ new Set(["viewport", "description", "keywords", "robots"]);
    __name(dedupeKey, "dedupeKey");
    __name(hashTag, "hashTag");
    __name(walkResolver, "walkResolver");
    __name(normalizeProps, "normalizeProps");
    __name(normalizeTag, "normalizeTag");
    __name(normalizeEntryToTags, "normalizeEntryToTags");
    sortTags = /* @__PURE__ */ __name((e4, t4) => e4._w === t4._w ? e4._p - t4._p : e4._w - t4._w, "sortTags");
    P = { base: -10, title: 10 };
    L = { critical: -8, high: -1, low: 2 };
    H = { meta: { "content-security-policy": -30, charset: -20, viewport: -15 }, link: { preconnect: 20, stylesheet: 60, preload: 70, modulepreload: 70, prefetch: 90, "dns-prefetch": 90, prerender: 90 }, script: { async: 30, defer: 80, sync: 50 }, style: { imported: 40, sync: 60 } };
    U = /@import/;
    isTruthy = /* @__PURE__ */ __name((e4) => "" === e4 || true === e4, "isTruthy");
    __name(tagWeight, "tagWeight");
    __name(registerPlugin, "registerPlugin");
    __name(createUnhead, "createUnhead");
    __name(encodeAttribute, "encodeAttribute");
    __name(propsToString, "propsToString");
    __name(tagToString, "tagToString");
    __name(renderSSRHead, "renderSSRHead");
    __name(isRef, "isRef");
    __name(toValue, "toValue");
    new Set(Object.getOwnPropertyNames(Symbol).filter((e4) => "arguments" !== e4 && "caller" !== e4).map((e4) => Symbol[e4]).filter(isSymbol));
    VueResolver = /* @__PURE__ */ __name((e4, t4) => isRef(t4) ? toValue(t4) : t4, "VueResolver");
    __name(createHead, "createHead");
    C = true;
    M = false;
    x = { meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { name: "theme-color", content: "#79c7c5" }, { name: "description", content: "Misiones, estrellas y recompensas sanas para formar h\xE1bitos positivos en familia." }], link: [{ rel: "manifest", href: "/manifest.webmanifest" }, { rel: "icon", href: "/icons/icon.svg", type: "image/svg+xml" }], style: [], script: [{ src: "/pwa/register-sw.js", defer: true }], noscript: [], title: "NidoQuest - H\xE1bitos y Misiones en Familia" };
    D = { id: "teleports" };
    E = { id: "__nuxt-loader" };
    __name(buildAssetsURL, "buildAssetsURL");
    __name(publicAssetsURL, "publicAssetsURL");
    globalThis.__buildAssetsURL = buildAssetsURL, globalThis.__publicAssetsURL = publicAssetsURL;
    N = `<div${propsToString({ id: "__nuxt" })}>`;
    I = /* @__PURE__ */ (function(e4) {
      let t4 = null;
      return () => (null === t4 && (t4 = e4().catch((e5) => {
        throw t4 = null, e5;
      })), t4);
    })(async () => {
      const e4 = await Promise.resolve().then(() => (init_client_precomputed(), client_precomputed_exports)).then((e5) => e5.default || e5).then((e5) => "function" == typeof e5 ? e5() : e5), t4 = await Promise.resolve().then(() => (init_virtual_spa_template(), virtual_spa_template_exports)).then((e5) => e5.template).catch(() => "").then((e5) => {
        {
          const t5 = `<div${propsToString(E)}>`;
          return N + "</div>" + (e5 ? t5 + e5 + "</div>" : "");
        }
      }), n2 = createRenderer(() => () => {
      }, { precomputed: e4, manifest: void 0, renderToString: /* @__PURE__ */ __name(() => t4, "renderToString"), buildAssetsURL }), s4 = await n2.renderToString({});
      return { rendererContext: n2.rendererContext, renderToString: /* @__PURE__ */ __name((e5) => {
        const t5 = useRuntimeConfig(e5.event);
        return e5.modules ||= /* @__PURE__ */ new Set(), e5.payload.serverRendered = false, e5.config = { public: t5.public, app: t5.app }, Promise.resolve(s4);
      }, "renderToString") };
    });
    B = { "<": "\\u003C", "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t", "\u2028": "\\u2028", "\u2029": "\\u2029" };
    DevalueError = class extends Error {
      static {
        __name(this, "DevalueError");
      }
      constructor(e4, t4, r3, n2) {
        super(e4), this.name = "DevalueError", this.path = t4.join(""), this.value = r3, this.root = n2;
      }
    };
    __name(is_primitive, "is_primitive");
    z = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
    __name(is_plain_object, "is_plain_object");
    __name(get_type, "get_type");
    __name(get_escaped_char, "get_escaped_char");
    __name(stringify_string, "stringify_string");
    __name(enumerable_symbols, "enumerable_symbols");
    F = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
    __name(stringify_key, "stringify_key");
    __name(is_valid_array_index_string, "is_valid_array_index_string");
    __name(valid_array_indices, "valid_array_indices");
    W = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    q = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    J = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
    __name(uneval, "uneval");
    __name(escape_unsafe_char, "escape_unsafe_char");
    __name(escape_unsafe_chars, "escape_unsafe_chars");
    __name(stringify_primitive$1, "stringify_primitive$1");
    V = "function" == typeof Uint8Array.fromBase64;
    Z = "object" == typeof G && void 0 !== G.versions?.node;
    Y = V ? function(e4) {
      return new Uint8Array(e4).toBase64();
    } : Z ? function(e4) {
      return g.from(e4).toString("base64");
    } : function(e4) {
      const t4 = new Uint8Array(e4);
      let r3 = "";
      for (let e5 = 0; e5 < t4.length; e5 += 32768) {
        const n2 = t4.subarray(e5, e5 + 32768);
        r3 += String.fromCharCode.apply(null, n2);
      }
      return btoa(r3);
    };
    __name(stringify, "stringify");
    __name(stringify_primitive, "stringify_primitive");
    __name(renderPayloadJsonScript, "renderPayloadJsonScript");
    __name(encodeForwardSlashes, "encodeForwardSlashes");
    __name(splitPayload, "splitPayload");
    K = { disableDefaults: true };
    __name(createSSRContext, "createSSRContext");
    X = {};
    globalThis.__buildAssetsURL = buildAssetsURL, globalThis.__publicAssetsURL = publicAssetsURL;
    Q = !!D.id;
    G2 = Q ? `<div${propsToString(D)}>` : "";
    ee = Q ? "</div>" : "";
    te = /^[^?]*\/_payload.json(?:\?.*)?$/;
    re = "_payload.json";
    ne = defineRenderHandler((e4) => {
      const t4 = e4.path.startsWith("/__nuxt_error") ? getQuery(e4) : null;
      if (t4 && !("__unenv__" in e4.node.req)) throw createError({ status: 404, statusText: "Page Not Found: /__nuxt_error", message: "Page Not Found: /__nuxt_error" });
      return (async function(e5, t5) {
        const r3 = useNitroApp(), n2 = createSSRContext(e5), s4 = { mode: "server" };
        if (n2.head.push(x, s4), t5) {
          const e6 = t5.status || t5.statusCode;
          if (e6 && (t5.status = t5.statusCode = Number.parseInt(e6)), "string" == typeof t5.data) try {
            t5.data = destr(t5.data);
          } catch {
          }
          !(function(e7, t6) {
            e7.error = true, e7.payload = { error: t6 }, e7.url = t6.url;
          })(n2, t5);
        }
        const i3 = getRouteRules(e5), c3 = !n2.noSSR && M, l3 = !c3 || C, p3 = !!c3 && te.test(n2.url);
        if (p3) {
          const t6 = n2.url.substring(0, n2.url.lastIndexOf("/")) || "/";
          n2.url = t6, e5._path = e5.node.req.url = t6;
        }
        false === i3.ssr && (n2.noSSR = true);
        const h2 = c3 ? joinURL(n2.runtimeConfig.app.cdnURL || n2.runtimeConfig.app.baseURL, n2.url.replace(/\?.*$/, ""), re) + "?" + n2.runtimeConfig.app.buildId : void 0, g2 = await I(), m4 = await g2.renderToString(n2).catch(async (e6) => {
          if ((n2["~renderResponse"] || n2._renderResponse) && "skipping render" === e6.message) return {};
          const r4 = !t5 && n2.payload?.error || e6;
          throw await n2.nuxt?.hooks.callHook("app:error", r4), r4;
        }), _3 = [];
        if (await n2.nuxt?.hooks.callHook("app:rendered", { ssrContext: n2, renderResult: m4 }), n2["~renderResponse"] || n2._renderResponse) return n2["~renderResponse"] || n2._renderResponse;
        if (n2.payload?.error && !t5) throw n2.payload.error;
        if (p3) {
          const e6 = (function(e7) {
            return { body: encodeForwardSlashes(stringify(splitPayload(e7).payload, e7["~payloadReducers"])), statusCode: getResponseStatus(e7.event), statusMessage: getResponseStatusText(e7.event), headers: { "content-type": "application/json;charset=utf-8", "x-powered-by": "Nuxt" } };
          })(n2);
          return e6;
        }
        const b3 = i3.noScripts, { styles: $3, scripts: k3 } = getRequestDependencies(n2, g2.rendererContext);
        !c3 || l3 || b3 || n2.head.push({ link: [{ rel: "preload", as: "fetch", crossorigin: "anonymous", href: h2 }] }, s4);
        _3.length && n2.head.push({ style: _3 });
        const w3 = [];
        for (const e6 of Object.values($3)) w3.push({ rel: "stylesheet", href: g2.rendererContext.buildAssetsURL(e6.file), crossorigin: "" });
        w3.length && n2.head.push({ link: w3 }, s4);
        if (!b3) {
          if (n2["~lazyHydratedModules"]) for (const e6 of n2["~lazyHydratedModules"]) n2.modules?.delete(e6);
          n2.head.push({ link: getPreloadLinks(n2, g2.rendererContext) }, s4), n2.head.push({ link: getPrefetchLinks(n2, g2.rendererContext) }, s4), n2.head.push({ script: renderPayloadJsonScript(l3 ? { ssrContext: n2, data: n2.payload } : { ssrContext: n2, data: splitPayload(n2).initial, src: h2 }) }, { ...s4, tagPosition: "bodyClose", tagPriority: "high" });
        }
        if (!i3.noScripts) {
          const e6 = "head";
          n2.head.push({ script: Object.values(k3).map((t6) => ({ type: t6.module ? "module" : null, src: g2.rendererContext.buildAssetsURL(t6.file), defer: !t6.module || null, tagPosition: e6, crossorigin: "" })) }, s4);
        }
        const { headTags: T3, bodyTags: A3, bodyTagsOpen: v3, htmlAttrs: S3, bodyAttrs: R3 } = await renderSSRHead(n2.head, X), j4 = { htmlAttrs: S3 ? [S3] : [], head: normalizeChunks([T3]), bodyAttrs: R3 ? [R3] : [], bodyPrepend: normalizeChunks([v3, n2.teleports?.body]), body: [m4.html, G2 + (Q ? joinTags([n2.teleports?.[`#${D.id}`]]) : "") + ee], bodyAppend: [A3] };
        return await r3.hooks.callHook("render:html", j4, { event: e5 }), { body: renderHTMLDocument(j4), statusCode: getResponseStatus(e5), statusMessage: getResponseStatusText(e5), headers: { "content-type": "text/html;charset=utf-8", "x-powered-by": "Nuxt" } };
      })(e4, t4);
    });
    __name(normalizeChunks, "normalizeChunks");
    __name(joinTags, "joinTags");
    __name(joinAttrs, "joinAttrs");
    __name(renderHTMLDocument, "renderHTMLDocument");
  }
});

// .wrangler/tmp/pages-snvQxE/chunks/routes/api/_...path_.mjs
var path_exports = {};
__export(path_exports, {
  default: () => s2
});
var s2;
var init_path = __esm({
  ".wrangler/tmp/pages-snvQxE/chunks/routes/api/_...path_.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_nitro();
    s2 = defineEventHandler((a3) => {
      var s4;
      const n2 = useRuntimeConfig(a3), o4 = getRequestURL(a3), p3 = String((null == (s4 = a3.context.params) ? void 0 : s4.path) || "").replace(/^\/+/, ""), i3 = String(n2.backendApiBase || "http://127.0.0.1:8000/api").replace(/\/$/, "");
      return proxyRequest(a3, `${i3}/${p3}${o4.search}`);
    });
  }
});

// .wrangler/tmp/pages-snvQxE/chunks/nitro/nitro.mjs
function createNotImplementedError(e4) {
  return new Error(`[unenv] ${e4} is not implemented yet!`);
}
function notImplemented(e4) {
  return Object.assign(() => {
    throw createNotImplementedError(e4);
  }, { __unenv__: true });
}
function toByteArray(e4) {
  let s4;
  const a3 = (function(e5) {
    const t4 = e5.length;
    if (t4 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    let r3 = e5.indexOf("=");
    return -1 === r3 && (r3 = t4), [r3, r3 === t4 ? 0 : 4 - r3 % 4];
  })(e4), c3 = a3[0], u3 = a3[1], f3 = new r2((function(e5, t4, r3) {
    return 3 * (t4 + r3) / 4 - r3;
  })(0, c3, u3));
  let h2 = 0;
  const d3 = u3 > 0 ? c3 - 4 : c3;
  let g2;
  for (g2 = 0; g2 < d3; g2 += 4) s4 = t3[e4.charCodeAt(g2)] << 18 | t3[e4.charCodeAt(g2 + 1)] << 12 | t3[e4.charCodeAt(g2 + 2)] << 6 | t3[e4.charCodeAt(g2 + 3)], f3[h2++] = s4 >> 16 & 255, f3[h2++] = s4 >> 8 & 255, f3[h2++] = 255 & s4;
  return 2 === u3 && (s4 = t3[e4.charCodeAt(g2)] << 2 | t3[e4.charCodeAt(g2 + 1)] >> 4, f3[h2++] = 255 & s4), 1 === u3 && (s4 = t3[e4.charCodeAt(g2)] << 10 | t3[e4.charCodeAt(g2 + 1)] << 4 | t3[e4.charCodeAt(g2 + 2)] >> 2, f3[h2++] = s4 >> 8 & 255, f3[h2++] = 255 & s4), f3;
}
function tripletToBase64(t4) {
  return e3[t4 >> 18 & 63] + e3[t4 >> 12 & 63] + e3[t4 >> 6 & 63] + e3[63 & t4];
}
function encodeChunk(e4, t4, r3) {
  let s4;
  const a3 = [];
  for (let c3 = t4; c3 < r3; c3 += 3) s4 = (e4[c3] << 16 & 16711680) + (e4[c3 + 1] << 8 & 65280) + (255 & e4[c3 + 2]), a3.push(tripletToBase64(s4));
  return a3.join("");
}
function fromByteArray(t4) {
  let r3;
  const s4 = t4.length, a3 = s4 % 3, c3 = [], u3 = 16383;
  for (let e4 = 0, r4 = s4 - a3; e4 < r4; e4 += u3) c3.push(encodeChunk(t4, e4, e4 + u3 > r4 ? r4 : e4 + u3));
  return 1 === a3 ? (r3 = t4[s4 - 1], c3.push(e3[r3 >> 2] + e3[r3 << 4 & 63] + "==")) : 2 === a3 && (r3 = (t4[s4 - 2] << 8) + t4[s4 - 1], c3.push(e3[r3 >> 10] + e3[r3 >> 4 & 63] + e3[r3 << 2 & 63] + "=")), c3.join("");
}
function read(e4, t4, r3, s4, a3) {
  let c3, u3;
  const f3 = 8 * a3 - s4 - 1, h2 = (1 << f3) - 1, d3 = h2 >> 1;
  let g2 = -7, m4 = r3 ? a3 - 1 : 0;
  const _3 = r3 ? -1 : 1;
  let E3 = e4[t4 + m4];
  for (m4 += _3, c3 = E3 & (1 << -g2) - 1, E3 >>= -g2, g2 += f3; g2 > 0; ) c3 = 256 * c3 + e4[t4 + m4], m4 += _3, g2 -= 8;
  for (u3 = c3 & (1 << -g2) - 1, c3 >>= -g2, g2 += s4; g2 > 0; ) u3 = 256 * u3 + e4[t4 + m4], m4 += _3, g2 -= 8;
  if (0 === c3) c3 = 1 - d3;
  else {
    if (c3 === h2) return u3 ? Number.NaN : (E3 ? -1 : 1) * Number.POSITIVE_INFINITY;
    u3 += Math.pow(2, s4), c3 -= d3;
  }
  return (E3 ? -1 : 1) * u3 * Math.pow(2, c3 - s4);
}
function write(e4, t4, r3, s4, a3, c3) {
  let u3, f3, h2, d3 = 8 * c3 - a3 - 1;
  const g2 = (1 << d3) - 1, m4 = g2 >> 1, _3 = 23 === a3 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  let E3 = s4 ? 0 : c3 - 1;
  const R3 = s4 ? 1 : -1, x3 = t4 < 0 || 0 === t4 && 1 / t4 < 0 ? 1 : 0;
  for (t4 = Math.abs(t4), Number.isNaN(t4) || t4 === Number.POSITIVE_INFINITY ? (f3 = Number.isNaN(t4) ? 1 : 0, u3 = g2) : (u3 = Math.floor(Math.log2(t4)), t4 * (h2 = Math.pow(2, -u3)) < 1 && (u3--, h2 *= 2), (t4 += u3 + m4 >= 1 ? _3 / h2 : _3 * Math.pow(2, 1 - m4)) * h2 >= 2 && (u3++, h2 /= 2), u3 + m4 >= g2 ? (f3 = 0, u3 = g2) : u3 + m4 >= 1 ? (f3 = (t4 * h2 - 1) * Math.pow(2, a3), u3 += m4) : (f3 = t4 * Math.pow(2, m4 - 1) * Math.pow(2, a3), u3 = 0)); a3 >= 8; ) e4[r3 + E3] = 255 & f3, E3 += R3, f3 /= 256, a3 -= 8;
  for (u3 = u3 << a3 | f3, d3 += a3; d3 > 0; ) e4[r3 + E3] = 255 & u3, E3 += R3, u3 /= 256, d3 -= 8;
  e4[r3 + E3 - R3] |= 128 * x3;
}
function createBuffer(e4) {
  if (e4 > c2) throw new RangeError('The value "' + e4 + '" is invalid for option "size"');
  const t4 = new Uint8Array(e4);
  return Object.setPrototypeOf(t4, Buffer$1.prototype), t4;
}
function Buffer$1(e4, t4, r3) {
  if ("number" == typeof e4) {
    if ("string" == typeof t4) throw new TypeError('The "string" argument must be of type string. Received type number');
    return allocUnsafe(e4);
  }
  return from(e4, t4, r3);
}
function from(e4, t4, r3) {
  if ("string" == typeof e4) return (function(e5, t5) {
    "string" == typeof t5 && "" !== t5 || (t5 = "utf8");
    if (!Buffer$1.isEncoding(t5)) throw new TypeError("Unknown encoding: " + t5);
    const r4 = 0 | byteLength(e5, t5);
    let s5 = createBuffer(r4);
    const a4 = s5.write(e5, t5);
    a4 !== r4 && (s5 = s5.slice(0, a4));
    return s5;
  })(e4, t4);
  if (ArrayBuffer.isView(e4)) return (function(e5) {
    if (isInstance(e5, Uint8Array)) {
      const t5 = new Uint8Array(e5);
      return fromArrayBuffer(t5.buffer, t5.byteOffset, t5.byteLength);
    }
    return fromArrayLike(e5);
  })(e4);
  if (null == e4) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e4);
  if (isInstance(e4, ArrayBuffer) || e4 && isInstance(e4.buffer, ArrayBuffer)) return fromArrayBuffer(e4, t4, r3);
  if ("undefined" != typeof SharedArrayBuffer && (isInstance(e4, SharedArrayBuffer) || e4 && isInstance(e4.buffer, SharedArrayBuffer))) return fromArrayBuffer(e4, t4, r3);
  if ("number" == typeof e4) throw new TypeError('The "value" argument must not be of type number. Received type number');
  const s4 = e4.valueOf && e4.valueOf();
  if (null != s4 && s4 !== e4) return Buffer$1.from(s4, t4, r3);
  const a3 = (function(e5) {
    if (Buffer$1.isBuffer(e5)) {
      const t5 = 0 | checked(e5.length), r4 = createBuffer(t5);
      return 0 === r4.length || e5.copy(r4, 0, 0, t5), r4;
    }
    if (void 0 !== e5.length) return "number" != typeof e5.length || numberIsNaN(e5.length) ? createBuffer(0) : fromArrayLike(e5);
    if ("Buffer" === e5.type && Array.isArray(e5.data)) return fromArrayLike(e5.data);
  })(e4);
  if (a3) return a3;
  if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e4[Symbol.toPrimitive]) return Buffer$1.from(e4[Symbol.toPrimitive]("string"), t4, r3);
  throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e4);
}
function assertSize(e4) {
  if ("number" != typeof e4) throw new TypeError('"size" argument must be of type number');
  if (e4 < 0) throw new RangeError('The value "' + e4 + '" is invalid for option "size"');
}
function allocUnsafe(e4) {
  return assertSize(e4), createBuffer(e4 < 0 ? 0 : 0 | checked(e4));
}
function fromArrayLike(e4) {
  const t4 = e4.length < 0 ? 0 : 0 | checked(e4.length), r3 = createBuffer(t4);
  for (let s4 = 0; s4 < t4; s4 += 1) r3[s4] = 255 & e4[s4];
  return r3;
}
function fromArrayBuffer(e4, t4, r3) {
  if (t4 < 0 || e4.byteLength < t4) throw new RangeError('"offset" is outside of buffer bounds');
  if (e4.byteLength < t4 + (r3 || 0)) throw new RangeError('"length" is outside of buffer bounds');
  let s4;
  return s4 = void 0 === t4 && void 0 === r3 ? new Uint8Array(e4) : void 0 === r3 ? new Uint8Array(e4, t4) : new Uint8Array(e4, t4, r3), Object.setPrototypeOf(s4, Buffer$1.prototype), s4;
}
function checked(e4) {
  if (e4 >= c2) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + c2.toString(16) + " bytes");
  return 0 | e4;
}
function byteLength(e4, t4) {
  if (Buffer$1.isBuffer(e4)) return e4.length;
  if (ArrayBuffer.isView(e4) || isInstance(e4, ArrayBuffer)) return e4.byteLength;
  if ("string" != typeof e4) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e4);
  const r3 = e4.length, s4 = arguments.length > 2 && true === arguments[2];
  if (!s4 && 0 === r3) return 0;
  let a3 = false;
  for (; ; ) switch (t4) {
    case "ascii":
    case "latin1":
    case "binary":
      return r3;
    case "utf8":
    case "utf-8":
      return utf8ToBytes(e4).length;
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return 2 * r3;
    case "hex":
      return r3 >>> 1;
    case "base64":
      return base64ToBytes(e4).length;
    default:
      if (a3) return s4 ? -1 : utf8ToBytes(e4).length;
      t4 = ("" + t4).toLowerCase(), a3 = true;
  }
}
function slowToString(e4, t4, r3) {
  let s4 = false;
  if ((void 0 === t4 || t4 < 0) && (t4 = 0), t4 > this.length) return "";
  if ((void 0 === r3 || r3 > this.length) && (r3 = this.length), r3 <= 0) return "";
  if ((r3 >>>= 0) <= (t4 >>>= 0)) return "";
  for (e4 || (e4 = "utf8"); ; ) switch (e4) {
    case "hex":
      return hexSlice(this, t4, r3);
    case "utf8":
    case "utf-8":
      return utf8Slice(this, t4, r3);
    case "ascii":
      return asciiSlice(this, t4, r3);
    case "latin1":
    case "binary":
      return latin1Slice(this, t4, r3);
    case "base64":
      return base64Slice(this, t4, r3);
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return utf16leSlice(this, t4, r3);
    default:
      if (s4) throw new TypeError("Unknown encoding: " + e4);
      e4 = (e4 + "").toLowerCase(), s4 = true;
  }
}
function swap(e4, t4, r3) {
  const s4 = e4[t4];
  e4[t4] = e4[r3], e4[r3] = s4;
}
function bidirectionalIndexOf(e4, t4, r3, s4, a3) {
  if (0 === e4.length) return -1;
  if ("string" == typeof r3 ? (s4 = r3, r3 = 0) : r3 > 2147483647 ? r3 = 2147483647 : r3 < -2147483648 && (r3 = -2147483648), numberIsNaN(r3 = +r3) && (r3 = a3 ? 0 : e4.length - 1), r3 < 0 && (r3 = e4.length + r3), r3 >= e4.length) {
    if (a3) return -1;
    r3 = e4.length - 1;
  } else if (r3 < 0) {
    if (!a3) return -1;
    r3 = 0;
  }
  if ("string" == typeof t4 && (t4 = Buffer$1.from(t4, s4)), Buffer$1.isBuffer(t4)) return 0 === t4.length ? -1 : arrayIndexOf(e4, t4, r3, s4, a3);
  if ("number" == typeof t4) return t4 &= 255, "function" == typeof Uint8Array.prototype.indexOf ? a3 ? Uint8Array.prototype.indexOf.call(e4, t4, r3) : Uint8Array.prototype.lastIndexOf.call(e4, t4, r3) : arrayIndexOf(e4, [t4], r3, s4, a3);
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(e4, t4, r3, s4, a3) {
  let c3, u3 = 1, f3 = e4.length, h2 = t4.length;
  if (void 0 !== s4 && ("ucs2" === (s4 = String(s4).toLowerCase()) || "ucs-2" === s4 || "utf16le" === s4 || "utf-16le" === s4)) {
    if (e4.length < 2 || t4.length < 2) return -1;
    u3 = 2, f3 /= 2, h2 /= 2, r3 /= 2;
  }
  function read2(e5, t5) {
    return 1 === u3 ? e5[t5] : e5.readUInt16BE(t5 * u3);
  }
  __name(read2, "read");
  if (a3) {
    let s5 = -1;
    for (c3 = r3; c3 < f3; c3++) if (read2(e4, c3) === read2(t4, -1 === s5 ? 0 : c3 - s5)) {
      if (-1 === s5 && (s5 = c3), c3 - s5 + 1 === h2) return s5 * u3;
    } else -1 !== s5 && (c3 -= c3 - s5), s5 = -1;
  } else for (r3 + h2 > f3 && (r3 = f3 - h2), c3 = r3; c3 >= 0; c3--) {
    let r4 = true;
    for (let s5 = 0; s5 < h2; s5++) if (read2(e4, c3 + s5) !== read2(t4, s5)) {
      r4 = false;
      break;
    }
    if (r4) return c3;
  }
  return -1;
}
function hexWrite(e4, t4, r3, s4) {
  r3 = Number(r3) || 0;
  const a3 = e4.length - r3;
  s4 ? (s4 = Number(s4)) > a3 && (s4 = a3) : s4 = a3;
  const c3 = t4.length;
  let u3;
  for (s4 > c3 / 2 && (s4 = c3 / 2), u3 = 0; u3 < s4; ++u3) {
    const s5 = Number.parseInt(t4.slice(2 * u3, 2 * u3 + 2), 16);
    if (numberIsNaN(s5)) return u3;
    e4[r3 + u3] = s5;
  }
  return u3;
}
function utf8Write(e4, t4, r3, s4) {
  return blitBuffer(utf8ToBytes(t4, e4.length - r3), e4, r3, s4);
}
function asciiWrite(e4, t4, r3, s4) {
  return blitBuffer((function(e5) {
    const t5 = [];
    for (let r4 = 0; r4 < e5.length; ++r4) t5.push(255 & e5.charCodeAt(r4));
    return t5;
  })(t4), e4, r3, s4);
}
function base64Write(e4, t4, r3, s4) {
  return blitBuffer(base64ToBytes(t4), e4, r3, s4);
}
function ucs2Write(e4, t4, r3, s4) {
  return blitBuffer((function(e5, t5) {
    let r4, s5, a3;
    const c3 = [];
    for (let u3 = 0; u3 < e5.length && !((t5 -= 2) < 0); ++u3) r4 = e5.charCodeAt(u3), s5 = r4 >> 8, a3 = r4 % 256, c3.push(a3, s5);
    return c3;
  })(t4, e4.length - r3), e4, r3, s4);
}
function base64Slice(e4, t4, r3) {
  return 0 === t4 && r3 === e4.length ? fromByteArray(e4) : fromByteArray(e4.slice(t4, r3));
}
function utf8Slice(e4, t4, r3) {
  r3 = Math.min(e4.length, r3);
  const s4 = [];
  let a3 = t4;
  for (; a3 < r3; ) {
    const t5 = e4[a3];
    let c3 = null, u3 = t5 > 239 ? 4 : t5 > 223 ? 3 : t5 > 191 ? 2 : 1;
    if (a3 + u3 <= r3) {
      let r4, s5, f3, h2;
      switch (u3) {
        case 1:
          t5 < 128 && (c3 = t5);
          break;
        case 2:
          r4 = e4[a3 + 1], 128 == (192 & r4) && (h2 = (31 & t5) << 6 | 63 & r4, h2 > 127 && (c3 = h2));
          break;
        case 3:
          r4 = e4[a3 + 1], s5 = e4[a3 + 2], 128 == (192 & r4) && 128 == (192 & s5) && (h2 = (15 & t5) << 12 | (63 & r4) << 6 | 63 & s5, h2 > 2047 && (h2 < 55296 || h2 > 57343) && (c3 = h2));
          break;
        case 4:
          r4 = e4[a3 + 1], s5 = e4[a3 + 2], f3 = e4[a3 + 3], 128 == (192 & r4) && 128 == (192 & s5) && 128 == (192 & f3) && (h2 = (15 & t5) << 18 | (63 & r4) << 12 | (63 & s5) << 6 | 63 & f3, h2 > 65535 && h2 < 1114112 && (c3 = h2));
      }
    }
    null === c3 ? (c3 = 65533, u3 = 1) : c3 > 65535 && (c3 -= 65536, s4.push(c3 >>> 10 & 1023 | 55296), c3 = 56320 | 1023 & c3), s4.push(c3), a3 += u3;
  }
  return (function(e5) {
    const t5 = e5.length;
    if (t5 <= u2) return String.fromCharCode.apply(String, e5);
    let r4 = "", s5 = 0;
    for (; s5 < t5; ) r4 += String.fromCharCode.apply(String, e5.slice(s5, s5 += u2));
    return r4;
  })(s4);
}
function asciiSlice(e4, t4, r3) {
  let s4 = "";
  r3 = Math.min(e4.length, r3);
  for (let a3 = t4; a3 < r3; ++a3) s4 += String.fromCharCode(127 & e4[a3]);
  return s4;
}
function latin1Slice(e4, t4, r3) {
  let s4 = "";
  r3 = Math.min(e4.length, r3);
  for (let a3 = t4; a3 < r3; ++a3) s4 += String.fromCharCode(e4[a3]);
  return s4;
}
function hexSlice(e4, t4, r3) {
  const s4 = e4.length;
  (!t4 || t4 < 0) && (t4 = 0), (!r3 || r3 < 0 || r3 > s4) && (r3 = s4);
  let a3 = "";
  for (let s5 = t4; s5 < r3; ++s5) a3 += d2[e4[s5]];
  return a3;
}
function utf16leSlice(e4, t4, r3) {
  const s4 = e4.slice(t4, r3);
  let a3 = "";
  for (let e5 = 0; e5 < s4.length - 1; e5 += 2) a3 += String.fromCharCode(s4[e5] + 256 * s4[e5 + 1]);
  return a3;
}
function checkOffset(e4, t4, r3) {
  if (e4 % 1 != 0 || e4 < 0) throw new RangeError("offset is not uint");
  if (e4 + t4 > r3) throw new RangeError("Trying to access beyond buffer length");
}
function checkInt(e4, t4, r3, s4, a3, c3) {
  if (!Buffer$1.isBuffer(e4)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (t4 > a3 || t4 < c3) throw new RangeError('"value" argument is out of bounds');
  if (r3 + s4 > e4.length) throw new RangeError("Index out of range");
}
function wrtBigUInt64LE(e4, t4, r3, s4, a3) {
  checkIntBI(t4, s4, a3, e4, r3, 7);
  let c3 = Number(t4 & BigInt(4294967295));
  e4[r3++] = c3, c3 >>= 8, e4[r3++] = c3, c3 >>= 8, e4[r3++] = c3, c3 >>= 8, e4[r3++] = c3;
  let u3 = Number(t4 >> BigInt(32) & BigInt(4294967295));
  return e4[r3++] = u3, u3 >>= 8, e4[r3++] = u3, u3 >>= 8, e4[r3++] = u3, u3 >>= 8, e4[r3++] = u3, r3;
}
function wrtBigUInt64BE(e4, t4, r3, s4, a3) {
  checkIntBI(t4, s4, a3, e4, r3, 7);
  let c3 = Number(t4 & BigInt(4294967295));
  e4[r3 + 7] = c3, c3 >>= 8, e4[r3 + 6] = c3, c3 >>= 8, e4[r3 + 5] = c3, c3 >>= 8, e4[r3 + 4] = c3;
  let u3 = Number(t4 >> BigInt(32) & BigInt(4294967295));
  return e4[r3 + 3] = u3, u3 >>= 8, e4[r3 + 2] = u3, u3 >>= 8, e4[r3 + 1] = u3, u3 >>= 8, e4[r3] = u3, r3 + 8;
}
function checkIEEE754(e4, t4, r3, s4, a3, c3) {
  if (r3 + s4 > e4.length) throw new RangeError("Index out of range");
  if (r3 < 0) throw new RangeError("Index out of range");
}
function writeFloat(e4, t4, r3, s4, a3) {
  return t4 = +t4, r3 >>>= 0, a3 || checkIEEE754(e4, 0, r3, 4), write(e4, t4, r3, s4, 23, 4), r3 + 4;
}
function writeDouble(e4, t4, r3, s4, a3) {
  return t4 = +t4, r3 >>>= 0, a3 || checkIEEE754(e4, 0, r3, 8), write(e4, t4, r3, s4, 52, 8), r3 + 8;
}
function E$1(e4, t4, r3) {
  f2[e4] = class extends r3 {
    constructor() {
      super(), Object.defineProperty(this, "message", { value: Reflect.apply(t4, this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${e4}]`, this.stack, delete this.name;
    }
    get code() {
      return e4;
    }
    set code(e5) {
      Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: e5, writable: true });
    }
    toString() {
      return `${this.name} [${e4}]: ${this.message}`;
    }
  };
}
function addNumericalSeparator(e4) {
  let t4 = "", r3 = e4.length;
  const s4 = "-" === e4[0] ? 1 : 0;
  for (; r3 >= s4 + 4; r3 -= 3) t4 = `_${e4.slice(r3 - 3, r3)}${t4}`;
  return `${e4.slice(0, r3)}${t4}`;
}
function checkIntBI(e4, t4, r3, s4, a3, c3) {
  if (e4 > r3 || e4 < t4) {
    const r4 = "bigint" == typeof t4 ? "n" : "";
    let s5;
    throw s5 = 0 === t4 || t4 === BigInt(0) ? `>= 0${r4} and < 2${r4} ** ${8 * (c3 + 1)}${r4}` : `>= -(2${r4} ** ${8 * (c3 + 1) - 1}${r4}) and < 2 ** ${8 * (c3 + 1) - 1}${r4}`, new f2.ERR_OUT_OF_RANGE("value", s5, e4);
  }
  !(function(e5, t5, r4) {
    validateNumber(t5, "offset"), void 0 !== e5[t5] && void 0 !== e5[t5 + r4] || boundsError(t5, e5.length - (r4 + 1));
  })(s4, a3, c3);
}
function validateNumber(e4, t4) {
  if ("number" != typeof e4) throw new f2.ERR_INVALID_ARG_TYPE(t4, "number", e4);
}
function boundsError(e4, t4, r3) {
  if (Math.floor(e4) !== e4) throw validateNumber(e4, r3), new f2.ERR_OUT_OF_RANGE("offset", "an integer", e4);
  if (t4 < 0) throw new f2.ERR_BUFFER_OUT_OF_BOUNDS();
  throw new f2.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${t4}`, e4);
}
function utf8ToBytes(e4, t4) {
  let r3;
  t4 = t4 || Number.POSITIVE_INFINITY;
  const s4 = e4.length;
  let a3 = null;
  const c3 = [];
  for (let u3 = 0; u3 < s4; ++u3) {
    if (r3 = e4.charCodeAt(u3), r3 > 55295 && r3 < 57344) {
      if (!a3) {
        if (r3 > 56319) {
          (t4 -= 3) > -1 && c3.push(239, 191, 189);
          continue;
        }
        if (u3 + 1 === s4) {
          (t4 -= 3) > -1 && c3.push(239, 191, 189);
          continue;
        }
        a3 = r3;
        continue;
      }
      if (r3 < 56320) {
        (t4 -= 3) > -1 && c3.push(239, 191, 189), a3 = r3;
        continue;
      }
      r3 = 65536 + (a3 - 55296 << 10 | r3 - 56320);
    } else a3 && (t4 -= 3) > -1 && c3.push(239, 191, 189);
    if (a3 = null, r3 < 128) {
      if ((t4 -= 1) < 0) break;
      c3.push(r3);
    } else if (r3 < 2048) {
      if ((t4 -= 2) < 0) break;
      c3.push(r3 >> 6 | 192, 63 & r3 | 128);
    } else if (r3 < 65536) {
      if ((t4 -= 3) < 0) break;
      c3.push(r3 >> 12 | 224, r3 >> 6 & 63 | 128, 63 & r3 | 128);
    } else {
      if (!(r3 < 1114112)) throw new Error("Invalid code point");
      if ((t4 -= 4) < 0) break;
      c3.push(r3 >> 18 | 240, r3 >> 12 & 63 | 128, r3 >> 6 & 63 | 128, 63 & r3 | 128);
    }
  }
  return c3;
}
function base64ToBytes(e4) {
  return toByteArray((function(e5) {
    if ((e5 = (e5 = e5.split("=")[0]).trim().replace(h, "")).length < 2) return "";
    for (; e5.length % 4 != 0; ) e5 += "=";
    return e5;
  })(e4));
}
function blitBuffer(e4, t4, r3, s4) {
  let a3;
  for (a3 = 0; a3 < s4 && !(a3 + r3 >= t4.length || a3 >= e4.length); ++a3) t4[a3 + r3] = e4[a3];
  return a3;
}
function isInstance(e4, t4) {
  return e4 instanceof t4 || null != e4 && null != e4.constructor && null != e4.constructor.name && e4.constructor.name === t4.name;
}
function numberIsNaN(e4) {
  return e4 != e4;
}
function defineBigIntMethod(e4) {
  return "undefined" == typeof BigInt ? BufferBigIntNotDefined : e4;
}
function BufferBigIntNotDefined() {
  throw new Error("BigInt not supported");
}
function isEventTarget(e4) {
  return "function" == typeof e4?.addEventListener;
}
function addCatch(e4, t4, r3, s4) {
  if (e4[j3]) try {
    const a3 = t4.then;
    "function" == typeof a3 && a3.call(t4, void 0, function(t5) {
      setTimeout(emitUnhandledRejectionOrErr, 0, e4, t5, r3, s4);
    });
  } catch (t5) {
    e4.emit("error", t5);
  }
}
function emitUnhandledRejectionOrErr(e4, t4, r3, s4) {
  if ("function" == typeof e4[C2]) e4[C2](t4, r3, ...s4);
  else {
    const r4 = e4[j3];
    try {
      e4[j3] = false, e4.emit("error", t4);
    } finally {
      e4[j3] = r4;
    }
  }
}
function _getMaxListeners(e4) {
  return void 0 === e4._maxListeners ? E2 : e4._maxListeners;
}
function enhanceStackTrace(e4, t4) {
  let r3 = "";
  try {
    const { name: e5 } = this.constructor;
    "EventEmitter" !== e5 && (r3 = ` on ${e5} instance`);
  } catch {
  }
  const s4 = `
Emitted 'error' event${r3} at:
`, a3 = (t4.stack || "").split("\n").slice(1);
  return e4.stack + s4 + a3.join("\n");
}
function _addListener(e4, t4, r3, s4) {
  let a3, c3, u3;
  if (c3 = e4._events, void 0 === c3 ? (c3 = e4._events = { __proto__: null }, e4._eventsCount = 0) : (void 0 !== c3.newListener && (e4.emit("newListener", t4, r3.listener ?? r3), c3 = e4._events), u3 = c3[t4]), void 0 === u3) c3[t4] = r3, ++e4._eventsCount;
  else if ("function" == typeof u3 ? u3 = c3[t4] = s4 ? [r3, u3] : [u3, r3] : s4 ? u3.unshift(r3) : u3.push(r3), a3 = _getMaxListeners(e4), a3 > 0 && u3.length > a3 && !u3.warned) {
    u3.warned = true;
    const r4 = new S2(`Possible EventEmitter memory leak detected. ${u3.length} ${String(t4)} listeners added to ${inspect(e4)}. MaxListeners is ${a3}. Use emitter.setMaxListeners() to increase limit`, { name: "MaxListenersExceededWarning", emitter: e4, type: t4, count: u3.length });
    console.warn(r4);
  }
  return e4;
}
function onceWrapper() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function _onceWrap(e4, t4, r3) {
  const s4 = { fired: false, wrapFn: void 0, target: e4, type: t4, listener: r3 }, a3 = onceWrapper.bind(s4);
  return a3.listener = r3, s4.wrapFn = a3, a3;
}
function _listeners(e4, t4, r3) {
  const s4 = e4._events;
  if (void 0 === s4) return [];
  const a3 = s4[t4];
  return void 0 === a3 ? [] : "function" == typeof a3 ? r3 ? [a3.listener || a3] : [a3] : r3 ? (function(e5) {
    const t5 = arrayClone(e5);
    for (let e6 = 0; e6 < t5.length; ++e6) {
      const r4 = t5[e6].listener;
      "function" == typeof r4 && (t5[e6] = r4);
    }
    return t5;
  })(a3) : arrayClone(a3);
}
function arrayClone(e4) {
  switch (e4.length) {
    case 2:
      return [e4[0], e4[1]];
    case 3:
      return [e4[0], e4[1], e4[2]];
    case 4:
      return [e4[0], e4[1], e4[2], e4[3]];
    case 5:
      return [e4[0], e4[1], e4[2], e4[3], e4[4]];
    case 6:
      return [e4[0], e4[1], e4[2], e4[3], e4[4], e4[5]];
  }
  return Array.prototype.slice.call(e4);
}
function createIterResult(e4, t4) {
  return { value: e4, done: t4 };
}
function eventTargetAgnosticRemoveListener(e4, t4, r3, s4) {
  if ("function" == typeof e4.removeListener) e4.removeListener(t4, r3);
  else {
    if ("function" != typeof e4.removeEventListener) throw new T2("emitter", "EventEmitter", e4);
    e4.removeEventListener(t4, r3, s4);
  }
}
function eventTargetAgnosticAddListener(e4, t4, r3, s4) {
  if ("function" == typeof e4.on) s4?.once ? e4.once(t4, r3) : e4.on(t4, r3);
  else {
    if ("function" != typeof e4.addEventListener) throw new T2("emitter", "EventEmitter", e4);
    e4.addEventListener(t4, r3, s4);
  }
}
function createNextTickWithTimeout() {
  let e4, t4 = [], r3 = false, s4 = -1;
  function cleanUpNextTick() {
    r3 && e4 && (r3 = false, e4.length > 0 ? t4 = [...e4, ...t4] : s4 = -1, t4.length > 0 && drainQueue());
  }
  __name(cleanUpNextTick, "cleanUpNextTick");
  function drainQueue() {
    if (r3) return;
    const a3 = setTimeout(cleanUpNextTick);
    r3 = true;
    let c3 = t4.length;
    for (; c3; ) {
      for (e4 = t4, t4 = []; ++s4 < c3; ) e4 && e4[s4]();
      s4 = -1, c3 = t4.length;
    }
    e4 = void 0, r3 = false, clearTimeout(a3);
  }
  __name(drainQueue, "drainQueue");
  return (e5, ...s5) => {
    t4.push(e5.bind(void 0, ...s5)), 1 !== t4.length || r3 || setTimeout(drainQueue);
  };
}
function setTimeoutFallback(e4, t4, ...r3) {
  return new Timeout(e4, r3);
}
function setImmediateFallback(e4, ...t4) {
  return new Immediate(e4, t4);
}
function setIntervalFallback(e4, t4, ...r3) {
  return new Timeout(e4, r3);
}
function jsonParseTransform(e4, t4) {
  if (!("__proto__" === e4 || "constructor" === e4 && t4 && "object" == typeof t4 && "prototype" in t4)) return t4;
  !(function(e5) {
    console.warn(`[destr] Dropping "${e5}" key to prevent prototype pollution.`);
  })(e4);
}
function destr(e4, t4 = {}) {
  if ("string" != typeof e4) return e4;
  if ('"' === e4[0] && '"' === e4[e4.length - 1] && -1 === e4.indexOf("\\")) return e4.slice(1, -1);
  const r3 = e4.trim();
  if (r3.length <= 9) switch (r3.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
    case "undefined":
      return;
    case "null":
      return null;
    case "nan":
      return Number.NaN;
    case "infinity":
      return Number.POSITIVE_INFINITY;
    case "-infinity":
      return Number.NEGATIVE_INFINITY;
  }
  if (!tr.test(e4)) {
    if (t4.strict) throw new SyntaxError("[destr] Invalid JSON");
    return e4;
  }
  try {
    if (Xt.test(e4) || er.test(e4)) {
      if (t4.strict) throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e4, jsonParseTransform);
    }
    return JSON.parse(e4);
  } catch (r4) {
    if (t4.strict) throw r4;
    return e4;
  }
}
function encode(e4) {
  return encodeURI("" + e4).replace(fr, "|");
}
function encodeQueryValue(e4) {
  return encode("string" == typeof e4 ? e4 : JSON.stringify(e4)).replace(ar, "%2B").replace(lr, "+").replace(rr, "%23").replace(nr, "%26").replace(ur, "`").replace(cr, "^").replace(or, "%2F");
}
function encodeQueryKey(e4) {
  return encodeQueryValue(e4).replace(sr, "%3D");
}
function encodePath(e4) {
  return encode(e4).replace(rr, "%23").replace(ir, "%3F").replace(dr, "%2F").replace(nr, "%26").replace(ar, "%2B");
}
function decode(e4 = "") {
  try {
    return decodeURIComponent("" + e4);
  } catch {
    return "" + e4;
  }
}
function decodePath(e4) {
  return decode(e4.replace(hr, "%252F"));
}
function decodeQueryKey(e4) {
  return decode(e4.replace(ar, " "));
}
function decodeQueryValue(e4) {
  return decode(e4.replace(ar, " "));
}
function parseQuery(e4 = "") {
  const t4 = /* @__PURE__ */ Object.create(null);
  "?" === e4[0] && (e4 = e4.slice(1));
  for (const r3 of e4.split("&")) {
    const e5 = r3.match(/([^=]+)=?(.*)/) || [];
    if (e5.length < 2) continue;
    const s4 = decodeQueryKey(e5[1]);
    if ("__proto__" === s4 || "constructor" === s4) continue;
    const a3 = decodeQueryValue(e5[2] || "");
    void 0 === t4[s4] ? t4[s4] = a3 : Array.isArray(t4[s4]) ? t4[s4].push(a3) : t4[s4] = [t4[s4], a3];
  }
  return t4;
}
function stringifyQuery(e4) {
  return Object.keys(e4).filter((t4) => void 0 !== e4[t4]).map((t4) => {
    return r3 = t4, "number" != typeof (s4 = e4[t4]) && "boolean" != typeof s4 || (s4 = String(s4)), s4 ? Array.isArray(s4) ? s4.map((e5) => `${encodeQueryKey(r3)}=${encodeQueryValue(e5)}`).join("&") : `${encodeQueryKey(r3)}=${encodeQueryValue(s4)}` : encodeQueryKey(r3);
    var r3, s4;
  }).filter(Boolean).join("&");
}
function hasProtocol(e4, t4 = {}) {
  return "boolean" == typeof t4 && (t4 = { acceptRelative: t4 }), t4.strict ? pr.test(e4) : gr.test(e4) || !!t4.acceptRelative && yr.test(e4);
}
function withoutTrailingSlash(e4 = "", t4) {
  return ((function(e5 = "") {
    return e5.endsWith("/");
  })(e4) ? e4.slice(0, -1) : e4) || "/";
}
function withTrailingSlash(e4 = "", t4) {
  return e4.endsWith("/") ? e4 : e4 + "/";
}
function withLeadingSlash(e4 = "") {
  return (function(e5 = "") {
    return e5.startsWith("/");
  })(e4) ? e4 : "/" + e4;
}
function withoutBase(e4, t4) {
  if (isEmptyURL(t4)) return e4;
  const r3 = withoutTrailingSlash(t4);
  if (!e4.startsWith(r3)) return e4;
  const s4 = e4[r3.length];
  if (s4 && "/" !== s4 && "?" !== s4) return e4;
  return "/" + e4.slice(r3.length).replace(/^\/+/, "");
}
function withQuery(e4, t4) {
  const r3 = parseURL(e4), s4 = { ...parseQuery(r3.search), ...t4 };
  return r3.search = stringifyQuery(s4), (function(e5) {
    const t5 = e5.pathname || "", r4 = e5.search ? (e5.search.startsWith("?") ? "" : "?") + e5.search : "", s5 = e5.hash || "", a3 = e5.auth ? e5.auth + "@" : "", c3 = e5.host || "", u3 = e5.protocol || e5[wr] ? (e5.protocol || "") + "//" : "";
    return u3 + a3 + c3 + t5 + r4 + s5;
  })(r3);
}
function getQuery$1(e4) {
  return parseQuery(parseURL(e4).search);
}
function isEmptyURL(e4) {
  return !e4 || "/" === e4;
}
function joinURL(e4, ...t4) {
  let r3 = e4 || "";
  for (const e5 of t4.filter((e6) => /* @__PURE__ */ (function(e7) {
    return e7 && "/" !== e7;
  })(e6))) if (r3) {
    const t5 = e5.replace(mr, "");
    r3 = withTrailingSlash(r3) + t5;
  } else r3 = e5;
  return r3;
}
function joinRelativeURL(...e4) {
  const t4 = /\/(?!\/)/, r3 = e4.filter(Boolean), s4 = [];
  let a3 = 0;
  for (const e5 of r3) if (e5 && "/" !== e5) {
    for (const [r4, c4] of e5.split(t4).entries()) if (c4 && "." !== c4) if (".." !== c4) 1 === r4 && s4[s4.length - 1]?.endsWith(":/") ? s4[s4.length - 1] += "/" + c4 : (s4.push(c4), a3++);
    else {
      if (1 === s4.length && hasProtocol(s4[0])) continue;
      s4.pop(), a3--;
    }
  }
  let c3 = s4.join("/");
  return a3 >= 0 ? r3[0]?.startsWith("/") && !c3.startsWith("/") ? c3 = "/" + c3 : r3[0]?.startsWith("./") && !c3.startsWith("./") && (c3 = "./" + c3) : c3 = "../".repeat(-1 * a3) + c3, r3[r3.length - 1]?.endsWith("/") && !c3.endsWith("/") && (c3 += "/"), c3;
}
function parseURL(e4 = "", t4) {
  const r3 = e4.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
  if (r3) {
    const [, e5, t5 = ""] = r3;
    return { protocol: e5.toLowerCase(), pathname: t5, href: e5 + t5, auth: "", host: "", search: "", hash: "" };
  }
  if (!hasProtocol(e4, { acceptRelative: true })) return parsePath(e4);
  const [, s4 = "", a3, c3 = ""] = e4.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, u3 = "", f3 = ""] = c3.match(/([^#/?]*)(.*)?/) || [];
  "file:" === s4 && (f3 = f3.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: h2, search: d3, hash: g2 } = parsePath(f3);
  return { protocol: s4.toLowerCase(), auth: a3 ? a3.slice(0, Math.max(0, a3.length - 1)) : "", host: u3, pathname: h2, search: d3, hash: g2, [wr]: !s4 };
}
function parsePath(e4 = "") {
  const [t4 = "", r3 = "", s4 = ""] = (e4.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return { pathname: t4, search: r3, hash: s4 };
}
function createRouter$1(e4 = {}) {
  const t4 = { options: e4, rootNode: createRadixNode(), staticRoutesMap: {} }, normalizeTrailingSlash = /* @__PURE__ */ __name((t5) => e4.strictTrailingSlash ? t5 : t5.replace(/\/$/, "") || "/", "normalizeTrailingSlash");
  if (e4.routes) for (const r3 in e4.routes) insert(t4, normalizeTrailingSlash(r3), e4.routes[r3]);
  return { ctx: t4, lookup: /* @__PURE__ */ __name((e5) => (function(e6, t5) {
    const r3 = e6.staticRoutesMap[t5];
    if (r3) return r3.data;
    const s4 = t5.split("/"), a3 = {};
    let c3 = false, u3 = null, f3 = e6.rootNode, h2 = null;
    for (let e7 = 0; e7 < s4.length; e7++) {
      const t6 = s4[e7];
      null !== f3.wildcardChildNode && (u3 = f3.wildcardChildNode, h2 = s4.slice(e7).join("/"));
      const r4 = f3.children.get(t6);
      if (void 0 === r4) {
        if (f3 && f3.placeholderChildren.length > 1) {
          const t7 = s4.length - e7;
          f3 = f3.placeholderChildren.find((e8) => e8.maxDepth === t7) || null;
        } else f3 = f3.placeholderChildren[0] || null;
        if (!f3) break;
        f3.paramName && (a3[f3.paramName] = t6), c3 = true;
      } else f3 = r4;
    }
    null !== f3 && null !== f3.data || null === u3 || (f3 = u3, a3[f3.paramName || "_"] = h2, c3 = true);
    if (!f3) return null;
    if (c3) return { ...f3.data, params: c3 ? a3 : void 0 };
    return f3.data;
  })(t4, normalizeTrailingSlash(e5)), "lookup"), insert: /* @__PURE__ */ __name((e5, r3) => insert(t4, normalizeTrailingSlash(e5), r3), "insert"), remove: /* @__PURE__ */ __name((e5) => (function(e6, t5) {
    let r3 = false;
    const s4 = t5.split("/");
    let a3 = e6.rootNode;
    for (const e7 of s4) if (a3 = a3.children.get(e7), !a3) return r3;
    if (a3.data) {
      const e7 = s4.at(-1) || "";
      a3.data = null, 0 === Object.keys(a3.children).length && a3.parent && (a3.parent.children.delete(e7), a3.parent.wildcardChildNode = null, a3.parent.placeholderChildren = []), r3 = true;
    }
    return r3;
  })(t4, normalizeTrailingSlash(e5)), "remove") };
}
function insert(e4, t4, r3) {
  let s4 = true;
  const a3 = t4.split("/");
  let c3 = e4.rootNode, u3 = 0;
  const f3 = [c3];
  for (const e5 of a3) {
    let t5;
    if (t5 = c3.children.get(e5)) c3 = t5;
    else {
      const r4 = getNodeType(e5);
      t5 = createRadixNode({ type: r4, parent: c3 }), c3.children.set(e5, t5), r4 === _r ? (t5.paramName = "*" === e5 ? "_" + u3++ : e5.slice(1), c3.placeholderChildren.push(t5), s4 = false) : r4 === vr && (c3.wildcardChildNode = t5, t5.paramName = e5.slice(3) || "_", s4 = false), f3.push(t5), c3 = t5;
    }
  }
  for (const [e5, t5] of f3.entries()) t5.maxDepth = Math.max(f3.length - e5, t5.maxDepth || 0);
  return c3.data = r3, true === s4 && (e4.staticRoutesMap[t4] = c3), c3;
}
function createRadixNode(e4 = {}) {
  return { type: e4.type || br, maxDepth: 0, parent: e4.parent || null, children: /* @__PURE__ */ new Map(), data: e4.data || null, paramName: e4.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function getNodeType(e4) {
  return e4.startsWith("**") ? vr : ":" === e4[0] || "*" === e4 ? _r : br;
}
function toRouteMatcher(e4) {
  return /* @__PURE__ */ (function(e5, t4) {
    return { ctx: { table: e5 }, matchAll: /* @__PURE__ */ __name((r3) => _matchRoutes(r3, e5, t4), "matchAll") };
  })(_routerNodeToTable("", e4.ctx.rootNode), e4.ctx.options.strictTrailingSlash);
}
function _matchRoutes(e4, t4, r3) {
  true !== r3 && e4.endsWith("/") && (e4 = e4.slice(0, -1) || "/");
  const s4 = [];
  for (const [r4, a4] of _sortRoutesMap(t4.wildcard)) (e4 === r4 || e4.startsWith(r4 + "/")) && s4.push(a4);
  for (const [r4, a4] of _sortRoutesMap(t4.dynamic)) if (e4.startsWith(r4 + "/")) {
    const t5 = "/" + e4.slice(r4.length).split("/").splice(2).join("/");
    s4.push(..._matchRoutes(t5, a4));
  }
  const a3 = t4.static.get(e4);
  return a3 && s4.push(a3), s4.filter(Boolean);
}
function _sortRoutesMap(e4) {
  return [...e4.entries()].sort((e5, t4) => e5[0].length - t4[0].length);
}
function _routerNodeToTable(e4, t4) {
  const r3 = { static: /* @__PURE__ */ new Map(), wildcard: /* @__PURE__ */ new Map(), dynamic: /* @__PURE__ */ new Map() };
  return (/* @__PURE__ */ __name(function _addNode(e5, t5) {
    if (e5) if (t5.type !== br || e5.includes("*") || e5.includes(":")) {
      if (t5.type === vr) r3.wildcard.set(e5.replace("/**", ""), t5.data);
      else if (t5.type === _r) {
        const s4 = _routerNodeToTable("", t5);
        return t5.data && s4.static.set("/", t5.data), void r3.dynamic.set(e5.replace(/\/\*|\/:\w+/, ""), s4);
      }
    } else t5.data && r3.static.set(e5, t5.data);
    for (const [r4, s4] of t5.children.entries()) _addNode(`${e5}/${r4}`.replace("//", "/"), s4);
  }, "_addNode"))(e4, t4), r3;
}
function isPlainObject(e4) {
  if (null === e4 || "object" != typeof e4) return false;
  const t4 = Object.getPrototypeOf(e4);
  return (null === t4 || t4 === Object.prototype || null === Object.getPrototypeOf(t4)) && (!(Symbol.iterator in e4) && (!(Symbol.toStringTag in e4) || "[object Module]" === Object.prototype.toString.call(e4)));
}
function _defu(e4, t4, r3 = ".", s4) {
  if (!isPlainObject(t4)) return _defu(e4, {}, r3, s4);
  const a3 = { ...t4 };
  for (const t5 of Object.keys(e4)) {
    if ("__proto__" === t5 || "constructor" === t5) continue;
    const c3 = e4[t5];
    null != c3 && (s4 && s4(a3, t5, c3, r3) || (Array.isArray(c3) && Array.isArray(a3[t5]) ? a3[t5] = [...c3, ...a3[t5]] : isPlainObject(c3) && isPlainObject(a3[t5]) ? a3[t5] = _defu(c3, a3[t5], (r3 ? `${r3}.` : "") + t5.toString(), s4) : a3[t5] = c3));
  }
  return a3;
}
function createDefu(e4) {
  return (...t4) => t4.reduce((t5, r3) => _defu(t5, r3, "", e4), {});
}
function o3(e4) {
  throw new Error(`${e4} is not implemented yet!`);
}
function p2(e4) {
  const t4 = {};
  for (const [r3, s4] of Object.entries(e4)) r3 && (t4[r3] = (Array.isArray(s4) ? s4 : [s4]).filter(Boolean));
  return t4;
}
function v2(e4 = {}) {
  if (e4 instanceof Headers) return e4;
  const t4 = new Headers();
  for (const [r3, s4] of Object.entries(e4)) if (void 0 !== s4) {
    if (Array.isArray(s4)) {
      for (const e5 of s4) t4.append(r3, String(e5));
      continue;
    }
    t4.set(r3, String(s4));
  }
  return t4;
}
async function b2(e4, t4) {
  const r3 = new y2(), s4 = new w2(r3);
  let a3;
  if (r3.url = t4.url?.toString() || "/", !r3.url.startsWith("/")) {
    const e5 = new URL(r3.url);
    a3 = e5.host, r3.url = e5.pathname + e5.search + e5.hash;
  }
  r3.method = t4.method || "GET", r3.headers = (function(e5 = {}) {
    const t5 = new Tr(), r4 = Array.isArray(e5) || (function(e6) {
      return "function" == typeof e6?.entries;
    })(e5) ? e5 : Object.entries(e5);
    for (const [e6, s5] of r4) if (s5) {
      if (void 0 === t5[e6]) {
        t5[e6] = s5;
        continue;
      }
      t5[e6] = [...Array.isArray(t5[e6]) ? t5[e6] : [t5[e6]], ...Array.isArray(s5) ? s5 : [s5]];
    }
    return t5;
  })(t4.headers || {}), r3.headers.host || (r3.headers.host = t4.host || a3 || "localhost"), r3.connection.encrypted = r3.connection.encrypted || "https" === t4.protocol, r3.body = t4.body || null, r3.__unenv__ = t4.context, await e4(r3, s4);
  let c3 = s4._data;
  (Ir.has(s4.statusCode) || "HEAD" === r3.method.toUpperCase()) && (c3 = null, delete s4._headers["content-length"]);
  const u3 = { status: s4.statusCode, statusText: s4.statusMessage, headers: s4._headers, body: c3 };
  return r3.destroy(), s4.destroy(), u3;
}
function hasProp(e4, t4) {
  try {
    return t4 in e4;
  } catch {
    return false;
  }
}
function createError(e4) {
  if ("string" == typeof e4) return new H3Error(e4);
  if (isError(e4)) return e4;
  const t4 = new H3Error(e4.message ?? e4.statusMessage ?? "", { cause: e4.cause || e4 });
  if (hasProp(e4, "stack")) try {
    Object.defineProperty(t4, "stack", { get: /* @__PURE__ */ __name(() => e4.stack, "get") });
  } catch {
    try {
      t4.stack = e4.stack;
    } catch {
    }
  }
  if (e4.data && (t4.data = e4.data), e4.statusCode ? t4.statusCode = sanitizeStatusCode(e4.statusCode, t4.statusCode) : e4.status && (t4.statusCode = sanitizeStatusCode(e4.status, t4.statusCode)), e4.statusMessage ? t4.statusMessage = e4.statusMessage : e4.statusText && (t4.statusMessage = e4.statusText), t4.statusMessage) {
    const e5 = t4.statusMessage;
    sanitizeStatusMessage(t4.statusMessage) !== e5 && console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.");
  }
  return void 0 !== e4.fatal && (t4.fatal = e4.fatal), void 0 !== e4.unhandled && (t4.unhandled = e4.unhandled), t4;
}
function isError(e4) {
  return true === e4?.constructor?.__h3_error__;
}
function getQuery(e4) {
  return getQuery$1(e4.path || "");
}
function getRequestHeaders(e4) {
  const t4 = {};
  for (const r3 in e4.node.req.headers) {
    const s4 = e4.node.req.headers[r3];
    t4[r3] = Array.isArray(s4) ? s4.filter(Boolean).join(", ") : s4;
  }
  return t4;
}
function getRequestURL(e4, t4 = {}) {
  const r3 = (function(e5, t5 = {}) {
    if (t5.xForwardedHost) {
      const t6 = e5.node.req.headers["x-forwarded-host"], r4 = (t6 || "").split(",").shift()?.trim();
      if (r4) return r4;
    }
    return e5.node.req.headers.host || "localhost";
  })(e4, t4), s4 = (function(e5, t5 = {}) {
    return false !== t5.xForwardedProto && "https" === e5.node.req.headers["x-forwarded-proto"] || e5.node.req.connection?.encrypted ? "https" : "http";
  })(e4, t4), a3 = (e4.node.req.originalUrl || e4.path).replace(/^[/\\]+/g, "/");
  return new URL(a3, `${s4}://${r3}`);
}
function readRawBody(e4, t4 = "utf8") {
  !(function(e5, t5) {
    if (!(function(e6, t6) {
      if ("string" == typeof t6) {
        if (e6.method === t6) return true;
      } else if (t6.includes(e6.method)) return true;
      return false;
    })(e5, t5)) throw createError({ statusCode: 405, statusMessage: "HTTP method is not allowed." });
  })(e4, kr);
  const r3 = e4._requestBody || e4.web?.request?.body || e4.node.req[Sr] || e4.node.req.rawBody || e4.node.req.body;
  if (r3) {
    const e5 = Promise.resolve(r3).then((e6) => g.isBuffer(e6) ? e6 : "function" == typeof e6.pipeTo ? new Promise((t5, r4) => {
      const s5 = [];
      e6.pipeTo(new WritableStream({ write(e7) {
        s5.push(e7);
      }, close() {
        t5(g.concat(s5));
      }, abort(e7) {
        r4(e7);
      } })).catch(r4);
    }) : "function" == typeof e6.pipe ? new Promise((t5, r4) => {
      const s5 = [];
      e6.on("data", (e7) => {
        s5.push(e7);
      }).on("end", () => {
        t5(g.concat(s5));
      }).on("error", r4);
    }) : e6.constructor === Object ? g.from(JSON.stringify(e6)) : e6 instanceof URLSearchParams ? g.from(e6.toString()) : e6 instanceof FormData ? new Response(e6).bytes().then((e7) => g.from(e7)) : g.from(e6));
    return t4 ? e5.then((e6) => e6.toString(t4)) : e5;
  }
  if (!Number.parseInt(e4.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(String(e4.node.req.headers["transfer-encoding"] ?? ""))) return Promise.resolve(void 0);
  const s4 = e4.node.req[Sr] = new Promise((t5, r4) => {
    const s5 = [];
    e4.node.req.on("error", (e5) => {
      r4(e5);
    }).on("data", (e5) => {
      s5.push(e5);
    }).on("end", () => {
      t5(g.concat(s5));
    });
  });
  return t4 ? s4.then((e5) => e5.toString(t4)) : s4;
}
function handleCacheHeaders(e4, t4) {
  const r3 = ["public", ...t4.cacheControls || []];
  let s4 = false;
  if (void 0 !== t4.maxAge && r3.push("max-age=" + +t4.maxAge, "s-maxage=" + +t4.maxAge), t4.modifiedTime) {
    const r4 = new Date(t4.modifiedTime), a3 = e4.node.req.headers["if-modified-since"];
    e4.node.res.setHeader("last-modified", r4.toUTCString()), a3 && new Date(a3) >= r4 && (s4 = true);
  }
  if (t4.etag) {
    e4.node.res.setHeader("etag", t4.etag);
    e4.node.req.headers["if-none-match"] === t4.etag && (s4 = true);
  }
  return e4.node.res.setHeader("cache-control", r3.join(", ")), !!s4 && (e4.node.res.statusCode = 304, e4.handled || e4.node.res.end(), true);
}
function sanitizeStatusMessage(e4 = "") {
  return e4.replace(jr, "");
}
function sanitizeStatusCode(e4, t4 = 200) {
  return e4 ? ("string" == typeof e4 && (e4 = Number.parseInt(e4, 10)), e4 < 100 || e4 > 999 ? t4 : e4) : t4;
}
function splitCookiesString(e4) {
  if (Array.isArray(e4)) return e4.flatMap((e5) => splitCookiesString(e5));
  if ("string" != typeof e4) return [];
  const t4 = [];
  let r3, s4, a3, c3, u3, f3 = 0;
  const skipWhitespace = /* @__PURE__ */ __name(() => {
    for (; f3 < e4.length && /\s/.test(e4.charAt(f3)); ) f3 += 1;
    return f3 < e4.length;
  }, "skipWhitespace"), notSpecialChar = /* @__PURE__ */ __name(() => (s4 = e4.charAt(f3), "=" !== s4 && ";" !== s4 && "," !== s4), "notSpecialChar");
  for (; f3 < e4.length; ) {
    for (r3 = f3, u3 = false; skipWhitespace(); ) if (s4 = e4.charAt(f3), "," === s4) {
      for (a3 = f3, f3 += 1, skipWhitespace(), c3 = f3; f3 < e4.length && notSpecialChar(); ) f3 += 1;
      f3 < e4.length && "=" === e4.charAt(f3) ? (u3 = true, f3 = c3, t4.push(e4.slice(r3, a3)), r3 = f3) : f3 = a3 + 1;
    } else f3 += 1;
    (!u3 || f3 >= e4.length) && t4.push(e4.slice(r3));
  }
  return t4;
}
function send(e4, t4, r3) {
  return r3 && (function(e5, t5) {
    t5 && 304 !== e5.node.res.statusCode && !e5.node.res.getHeader("content-type") && e5.node.res.setHeader("content-type", t5);
  })(e4, r3), new Promise((r4) => {
    Pr(() => {
      e4.handled || e4.node.res.end(t4), r4();
    });
  });
}
function setResponseStatus(e4, t4, r3) {
  t4 && (e4.node.res.statusCode = sanitizeStatusCode(t4, e4.node.res.statusCode)), r3 && (e4.node.res.statusMessage = sanitizeStatusMessage(r3));
}
function getResponseStatus(e4) {
  return e4.node.res.statusCode;
}
function getResponseStatusText(e4) {
  return e4.node.res.statusMessage;
}
function setResponseHeaders(e4, t4) {
  for (const [r3, s4] of Object.entries(t4)) e4.node.res.setHeader(r3, s4);
}
function setResponseHeader(e4, t4, r3) {
  e4.node.res.setHeader(t4, r3);
}
function appendResponseHeader(e4, t4, r3) {
  let s4 = e4.node.res.getHeader(t4);
  s4 ? (Array.isArray(s4) || (s4 = [s4.toString()]), e4.node.res.setHeader(t4, [...s4, r3])) : e4.node.res.setHeader(t4, r3);
}
function sendStream(e4, t4) {
  if (!t4 || "object" != typeof t4) throw new Error("[h3] Invalid stream provided.");
  if (e4.node.res._data = t4, !e4.node.res.socket) return e4._handled = true, Promise.resolve();
  if (hasProp(t4, "pipeTo") && "function" == typeof t4.pipeTo) return t4.pipeTo(new WritableStream({ write(t5) {
    e4.node.res.write(t5);
  } })).then(() => {
    e4.node.res.end();
  });
  if (hasProp(t4, "pipe") && "function" == typeof t4.pipe) return new Promise((r3, s4) => {
    t4.pipe(e4.node.res), t4.on && (t4.on("end", () => {
      e4.node.res.end(), r3();
    }), t4.on("error", (e5) => {
      s4(e5);
    })), e4.node.res.on("close", () => {
      t4.abort && t4.abort();
    });
  });
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(e4, t4) {
  for (const [r3, s4] of t4.headers) "set-cookie" === r3 ? e4.node.res.appendHeader(r3, splitCookiesString(s4)) : e4.node.res.setHeader(r3, s4);
  if (t4.status && (e4.node.res.statusCode = sanitizeStatusCode(t4.status, e4.node.res.statusCode)), t4.statusText && (e4.node.res.statusMessage = sanitizeStatusMessage(t4.statusText)), t4.redirected && e4.node.res.setHeader("location", t4.url), t4.body) return sendStream(e4, t4.body);
  e4.node.res.end();
}
async function proxyRequest(e4, t4, r3 = {}) {
  let s4, a3;
  Or.has(e4.method) && (r3.streamRequest ? (s4 = (function(e5) {
    if (!kr.includes(e5.method)) return;
    const t5 = e5.web?.request?.body || e5._requestBody;
    return t5 || (Sr in e5.node.req || "rawBody" in e5.node.req || "body" in e5.node.req || "__unenv__" in e5.node.req ? new ReadableStream({ async start(t6) {
      const r4 = await readRawBody(e5, false);
      r4 && t6.enqueue(r4), t6.close();
    } }) : new ReadableStream({ start: /* @__PURE__ */ __name((t6) => {
      e5.node.req.on("data", (e6) => {
        t6.enqueue(e6);
      }), e5.node.req.on("end", () => {
        t6.close();
      }), e5.node.req.on("error", (e6) => {
        t6.error(e6);
      });
    }, "start") }));
  })(e4), a3 = "half") : s4 = await readRawBody(e4, false).catch(() => {
  }));
  const c3 = r3.fetchOptions?.method || e4.method, u3 = (function(e5, ...t5) {
    const r4 = t5.filter(Boolean);
    if (0 === r4.length) return e5;
    const s5 = new Headers(e5);
    for (const e6 of r4) {
      const t6 = Array.isArray(e6) ? e6 : "function" == typeof e6.entries ? e6.entries() : Object.entries(e6);
      for (const [e7, r5] of t6) void 0 !== r5 && s5.set(e7, r5);
    }
    return s5;
  })(getProxyRequestHeaders(e4, { host: t4.startsWith("/") }), r3.fetchOptions?.headers, r3.headers);
  return (async function(e5, t5, r4 = {}) {
    let s5;
    try {
      s5 = await _getFetch(r4.fetch)(t5, { headers: r4.headers, ignoreResponseError: true, ...r4.fetchOptions });
    } catch (e6) {
      throw createError({ status: 502, statusMessage: "Bad Gateway", cause: e6 });
    }
    e5.node.res.statusCode = sanitizeStatusCode(s5.status, e5.node.res.statusCode), e5.node.res.statusMessage = sanitizeStatusMessage(s5.statusText);
    const a4 = [];
    for (const [t6, r5] of s5.headers.entries()) "content-encoding" !== t6 && "content-length" !== t6 && ("set-cookie" !== t6 ? e5.node.res.setHeader(t6, r5) : a4.push(...splitCookiesString(r5)));
    a4.length > 0 && e5.node.res.setHeader("set-cookie", a4.map((e6) => (r4.cookieDomainRewrite && (e6 = rewriteCookieProperty(e6, r4.cookieDomainRewrite, "domain")), r4.cookiePathRewrite && (e6 = rewriteCookieProperty(e6, r4.cookiePathRewrite, "path")), e6)));
    r4.onResponse && await r4.onResponse(e5, s5);
    if (void 0 !== s5._data) return s5._data;
    if (e5.handled) return;
    if (false === r4.sendStream) {
      const t6 = new Uint8Array(await s5.arrayBuffer());
      return e5.node.res.end(t6);
    }
    if (s5.body) for await (const t6 of s5.body) e5.node.res.write(t6);
    return e5.node.res.end();
  })(e4, t4, { ...r3, fetchOptions: { method: c3, body: s4, duplex: a3, ...r3.fetchOptions, headers: u3 } });
}
function getProxyRequestHeaders(e4, t4) {
  const r3 = /* @__PURE__ */ Object.create(null), s4 = getRequestHeaders(e4);
  for (const e5 in s4) (!Nr.has(e5) || "host" === e5 && t4?.host) && (r3[e5] = s4[e5]);
  return r3;
}
function fetchWithEvent(e4, t4, r3, s4) {
  return _getFetch(s4?.fetch)(t4, { ...r3, context: r3?.context || e4.context, headers: { ...getProxyRequestHeaders(e4, { host: "string" == typeof t4 && t4.startsWith("/") }), ...r3?.headers } });
}
function _getFetch(e4) {
  if (e4) return e4;
  if (globalThis.fetch) return globalThis.fetch;
  throw new Error("fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js.");
}
function rewriteCookieProperty(e4, t4, r3) {
  const s4 = "string" == typeof t4 ? { "*": t4 } : t4;
  return e4.replace(new RegExp(`(;\\s*${r3}=)([^;]+)`, "gi"), (e5, t5, r4) => {
    let a3;
    if (r4 in s4) a3 = s4[r4];
    else {
      if (!("*" in s4)) return e5;
      a3 = s4["*"];
    }
    return a3 ? t5 + a3 : "";
  });
}
function isEvent(e4) {
  return hasProp(e4, "__is_event__");
}
function createEvent(e4, t4) {
  return new H3Event(e4, t4);
}
function defineEventHandler(e4) {
  if ("function" == typeof e4) return e4.__is_handler__ = true, e4;
  const t4 = { onRequest: _normalizeArray(e4.onRequest), onBeforeResponse: _normalizeArray(e4.onBeforeResponse) }, _handler = /* @__PURE__ */ __name((r3) => (async function(e5, t5, r4) {
    if (r4.onRequest) {
      for (const t6 of r4.onRequest) if (await t6(e5), e5.handled) return;
    }
    const s4 = await t5(e5), a3 = { body: s4 };
    if (r4.onBeforeResponse) for (const t6 of r4.onBeforeResponse) await t6(e5, a3);
    return a3.body;
  })(r3, e4.handler, t4), "_handler");
  return _handler.__is_handler__ = true, _handler.__resolve__ = e4.handler.__resolve__, _handler.__websocket__ = e4.websocket, _handler;
}
function _normalizeArray(e4) {
  return e4 ? Array.isArray(e4) ? e4 : [e4] : void 0;
}
function toEventHandler(e4, t4, r3) {
  return e4;
}
function createApp(e4 = {}) {
  const t4 = [], r3 = (function(e5, t5) {
    const r4 = t5.debug ? 2 : void 0;
    return $r(async (s5) => {
      s5.node.req.originalUrl = s5.node.req.originalUrl || s5.node.req.url || "/";
      const a4 = s5.node.req.url || "/", c4 = (function(e6) {
        const t6 = e6.indexOf("?"), r5 = -1 === t6 ? e6 : e6.slice(0, t6), s6 = -1 === t6 ? "" : e6.slice(t6);
        return (r5.includes("%25") ? decodePath(r5.replace(/%25/g, "%2525")) : decodePath(r5)) + s6;
      })(s5._path || a4);
      s5._path = c4;
      const u3 = c4 !== a4;
      let f3;
      t5.onRequest && await t5.onRequest(s5);
      for (const h2 of e5) {
        if (h2.route.length > 1) {
          if (!c4.startsWith(h2.route)) continue;
          f3 = c4.slice(h2.route.length) || "/";
        } else f3 = c4;
        if (h2.match && !h2.match(f3, s5)) continue;
        s5._path = f3, s5.node.req.url = u3 ? h2.route.length > 1 ? a4.slice(h2.route.length) || "/" : a4 : f3;
        const e6 = await h2.handler(s5), d3 = void 0 === e6 ? void 0 : await e6;
        if (void 0 !== d3) {
          const e7 = { body: d3 };
          return t5.onBeforeResponse && (s5._onBeforeResponseCalled = true, await t5.onBeforeResponse(s5, e7)), await handleHandlerResponse(s5, e7.body, r4), void (t5.onAfterResponse && (s5._onAfterResponseCalled = true, await t5.onAfterResponse(s5, e7)));
        }
        if (s5.handled) return void (t5.onAfterResponse && (s5._onAfterResponseCalled = true, await t5.onAfterResponse(s5, void 0)));
      }
      if (!s5.handled) throw createError({ statusCode: 404, statusMessage: `Cannot find any path matching ${s5.path || "/"}.` });
      t5.onAfterResponse && (s5._onAfterResponseCalled = true, await t5.onAfterResponse(s5, void 0));
    });
  })(t4, e4), s4 = /* @__PURE__ */ (function(e5) {
    return async (t5) => {
      let r4;
      for (const s5 of e5) {
        if ("/" === s5.route && !s5.handler.__resolve__) continue;
        if (!t5.startsWith(s5.route)) continue;
        if (r4 = t5.slice(s5.route.length) || "/", s5.match && !s5.match(r4, void 0)) continue;
        let e6 = { route: s5.route, handler: s5.handler };
        if (e6.handler.__resolve__) {
          const t6 = await e6.handler.__resolve__(r4);
          if (!t6) continue;
          e6 = { ...e6, ...t6, route: joinURL(e6.route || "/", t6.route || "/") };
        }
        return e6;
      }
    };
  })(t4);
  r3.__resolve__ = s4;
  const a3 = /* @__PURE__ */ (function(e5) {
    let t5;
    return () => (t5 || (t5 = e5()), t5);
  })(() => {
    return t5 = s4, { ...e4.websocket, async resolve(e5) {
      const r4 = e5.request?.url || e5.url || "/", { pathname: s5 } = "string" == typeof r4 ? parseURL(r4) : r4, a4 = await t5(s5);
      return a4?.handler?.__websocket__ || {};
    } };
    var t5;
  }), c3 = { use: /* @__PURE__ */ __name((e5, t5, r4) => use(c3, e5, t5, r4), "use"), resolve: s4, handler: r3, stack: t4, options: e4, get websocket() {
    return a3();
  } };
  return c3;
}
function use(e4, t4, r3, s4) {
  if (Array.isArray(t4)) for (const a3 of t4) use(e4, a3, r3, s4);
  else if (Array.isArray(r3)) for (const a3 of r3) use(e4, t4, a3, s4);
  else "string" == typeof t4 ? e4.stack.push(normalizeLayer({ ...s4, route: t4, handler: r3 })) : "function" == typeof t4 ? e4.stack.push(normalizeLayer({ ...r3, handler: t4 })) : e4.stack.push(normalizeLayer({ ...t4 }));
  return e4;
}
function normalizeLayer(e4) {
  let t4 = e4.handler;
  return t4.handler && (t4 = t4.handler), e4.lazy ? t4 = lazyEventHandler(t4) : (function(e5) {
    return hasProp(e5, "__is_handler__");
  })(t4) || (t4 = toEventHandler(t4, 0, e4.route)), { route: withoutTrailingSlash(e4.route), match: e4.match, handler: t4 };
}
function handleHandlerResponse(e4, t4, r3) {
  if (null === t4) return (function(e5, t5) {
    if (e5.handled) return;
    t5 || 200 === e5.node.res.statusCode || (t5 = e5.node.res.statusCode);
    const r4 = sanitizeStatusCode(t5, 204);
    204 === r4 && e5.node.res.removeHeader("content-length"), e5.node.res.writeHead(r4), e5.node.res.end();
  })(e4);
  if (t4) {
    if (s4 = t4, "undefined" != typeof Response && s4 instanceof Response) return sendWebResponse(e4, t4);
    if ((function(e5) {
      if (!e5 || "object" != typeof e5) return false;
      if ("function" == typeof e5.pipe) {
        if ("function" == typeof e5._read) return true;
        if ("function" == typeof e5.abort) return true;
      }
      return "function" == typeof e5.pipeTo;
    })(t4)) return sendStream(e4, t4);
    if (t4.buffer) return send(e4, t4);
    if (t4.arrayBuffer && "function" == typeof t4.arrayBuffer) return t4.arrayBuffer().then((r4) => send(e4, g.from(r4), t4.type));
    if (t4 instanceof Error) throw createError(t4);
    if ("function" == typeof t4.end) return true;
  }
  var s4;
  const a3 = typeof t4;
  if ("string" === a3) return send(e4, t4, Cr.html);
  if ("object" === a3 || "boolean" === a3 || "number" === a3) return send(e4, JSON.stringify(t4, void 0, r3), Cr.json);
  if ("bigint" === a3) return send(e4, t4.toString(), Cr.json);
  throw createError({ statusCode: 500, statusMessage: `[h3] Cannot send ${a3} as response.` });
}
function toNodeListener(e4) {
  return async function(t4, r3) {
    const s4 = createEvent(t4, r3);
    try {
      await e4.handler(s4);
    } catch (t5) {
      const r4 = createError(t5);
      if (isError(t5) || (r4.unhandled = true), setResponseStatus(s4, r4.statusCode, r4.statusMessage), e4.options.onError && await e4.options.onError(r4, s4), s4.handled) return;
      (r4.unhandled || r4.fatal) && console.error("[h3]", r4.fatal ? "[fatal]" : "[unhandled]", r4), e4.options.onBeforeResponse && !s4._onBeforeResponseCalled && await e4.options.onBeforeResponse(s4, { body: r4 }), await (function(e5, t6, r5) {
        if (e5.handled) return;
        const s5 = isError(t6) ? t6 : createError(t6), a3 = { statusCode: s5.statusCode, statusMessage: s5.statusMessage, stack: [], data: s5.data };
        if (r5 && (a3.stack = (s5.stack || "").split("\n").map((e6) => e6.trim())), e5.handled) return;
        setResponseStatus(e5, Number.parseInt(s5.statusCode), s5.statusMessage), e5.node.res.setHeader("content-type", Cr.json), e5.node.res.end(JSON.stringify(a3, void 0, 2));
      })(s4, r4, !!e4.options.debug), e4.options.onAfterResponse && !s4._onAfterResponseCalled && await e4.options.onAfterResponse(s4, { body: r4 });
    }
  };
}
function flatHooks2(e4, t4 = {}, r3) {
  for (const s4 in e4) {
    const a3 = e4[s4], c3 = r3 ? `${r3}:${s4}` : s4;
    "object" == typeof a3 && null !== a3 ? flatHooks2(a3, t4, c3) : "function" == typeof a3 && (t4[c3] = a3);
  }
  return t4;
}
function serialTaskCaller2(e4, t4) {
  const r3 = t4.shift(), s4 = Hr(r3);
  return e4.reduce((e5, r4) => e5.then(() => s4.run(() => r4(...t4))), Promise.resolve());
}
function parallelTaskCaller2(e4, t4) {
  const r3 = t4.shift(), s4 = Hr(r3);
  return Promise.all(e4.map((e5) => s4.run(() => e5(...t4))));
}
function callEachWith2(e4, t4) {
  for (const r3 of [...e4]) r3(t4);
}
function isPayloadMethod(e4 = "GET") {
  return qr.has(e4.toUpperCase());
}
function resolveFetchOptions(e4, t4, r3, s4) {
  const a3 = (function(e5, t5, r4) {
    if (!t5) return new r4(e5);
    const s5 = new r4(t5);
    if (e5) for (const [t6, a4] of Symbol.iterator in e5 || Array.isArray(e5) ? e5 : new r4(e5)) s5.set(t6, a4);
    return s5;
  })(t4?.headers ?? e4?.headers, r3?.headers, s4);
  let c3;
  return (r3?.query || r3?.params || t4?.params || t4?.query) && (c3 = { ...r3?.params, ...r3?.query, ...t4?.params, ...t4?.query }), { ...r3, ...t4, query: c3, params: c3, headers: a3 };
}
async function callHooks2(e4, t4) {
  if (t4) if (Array.isArray(t4)) for (const r3 of t4) await r3(e4);
  else await t4(e4);
}
function createFetch(e4 = {}) {
  const { fetch: t4 = globalThis.fetch, Headers: r3 = globalThis.Headers, AbortController: s4 = globalThis.AbortController } = e4;
  async function onError(e5) {
    const t5 = e5.error && "AbortError" === e5.error.name && !e5.options.timeout || false;
    if (false !== e5.options.retry && !t5) {
      let t6;
      t6 = "number" == typeof e5.options.retry ? e5.options.retry : isPayloadMethod(e5.options.method) ? 0 : 1;
      const r5 = e5.response && e5.response.status || 500;
      if (t6 > 0 && (Array.isArray(e5.options.retryStatusCodes) ? e5.options.retryStatusCodes.includes(r5) : Fr.has(r5))) {
        const r6 = "function" == typeof e5.options.retryDelay ? e5.options.retryDelay(e5) : e5.options.retryDelay || 0;
        return r6 > 0 && await new Promise((e6) => setTimeout(e6, r6)), $fetchRaw(e5.request, { ...e5.options, retry: t6 - 1 });
      }
    }
    const r4 = (function(e6) {
      const t6 = e6.error?.message || e6.error?.toString() || "", r5 = e6.request?.method || e6.options?.method || "GET", s5 = e6.request?.url || String(e6.request) || "/", a3 = `[${r5}] ${JSON.stringify(s5)}`, c3 = e6.response ? `${e6.response.status} ${e6.response.statusText}` : "<no response>", u3 = new FetchError(`${a3}: ${c3}${t6 ? ` ${t6}` : ""}`, e6.error ? { cause: e6.error } : void 0);
      for (const t7 of ["request", "options", "response"]) Object.defineProperty(u3, t7, { get: /* @__PURE__ */ __name(() => e6[t7], "get") });
      for (const [t7, r6] of [["data", "_data"], ["status", "status"], ["statusCode", "status"], ["statusText", "statusText"], ["statusMessage", "statusText"]]) Object.defineProperty(u3, t7, { get: /* @__PURE__ */ __name(() => e6.response && e6.response[r6], "get") });
      return u3;
    })(e5);
    throw Error.captureStackTrace && Error.captureStackTrace(r4, $fetchRaw), r4;
  }
  __name(onError, "onError");
  const $fetchRaw = /* @__PURE__ */ __name(async function(a3, c3 = {}) {
    const u3 = { request: a3, options: resolveFetchOptions(a3, c3, e4.defaults, r3), response: void 0, error: void 0 };
    if (u3.options.method && (u3.options.method = u3.options.method.toUpperCase()), u3.options.onRequest && (await callHooks2(u3, u3.options.onRequest), u3.options.headers instanceof r3 || (u3.options.headers = new r3(u3.options.headers || {}))), "string" == typeof u3.request && (u3.options.baseURL && (u3.request = (function(e5, t5) {
      if (isEmptyURL(t5) || hasProtocol(e5)) return e5;
      const r4 = withoutTrailingSlash(t5);
      if (e5.startsWith(r4)) {
        const t6 = e5[r4.length];
        if (!t6 || "/" === t6 || "?" === t6) return e5;
      }
      return joinURL(r4, e5);
    })(u3.request, u3.options.baseURL)), u3.options.query && (u3.request = withQuery(u3.request, u3.options.query), delete u3.options.query), "query" in u3.options && delete u3.options.query, "params" in u3.options && delete u3.options.params), u3.options.body && isPayloadMethod(u3.options.method)) if ((function(e5) {
      if (void 0 === e5) return false;
      const t5 = typeof e5;
      return "string" === t5 || "number" === t5 || "boolean" === t5 || null === t5 || "object" === t5 && (!!Array.isArray(e5) || !e5.buffer && !(e5 instanceof FormData || e5 instanceof URLSearchParams) && (e5.constructor && "Object" === e5.constructor.name || "function" == typeof e5.toJSON));
    })(u3.options.body)) {
      const e5 = u3.options.headers.get("content-type");
      "string" != typeof u3.options.body && (u3.options.body = "application/x-www-form-urlencoded" === e5 ? new URLSearchParams(u3.options.body).toString() : JSON.stringify(u3.options.body)), e5 || u3.options.headers.set("content-type", "application/json"), u3.options.headers.has("accept") || u3.options.headers.set("accept", "application/json");
    } else ("pipeTo" in u3.options.body && "function" == typeof u3.options.body.pipeTo || "function" == typeof u3.options.body.pipe) && ("duplex" in u3.options || (u3.options.duplex = "half"));
    let f3;
    if (!u3.options.signal && u3.options.timeout) {
      const e5 = new s4();
      f3 = setTimeout(() => {
        const t5 = new Error("[TimeoutError]: The operation was aborted due to timeout");
        t5.name = "TimeoutError", t5.code = 23, e5.abort(t5);
      }, u3.options.timeout), u3.options.signal = e5.signal;
    }
    try {
      u3.response = await t4(u3.request, u3.options);
    } catch (e5) {
      return u3.error = e5, u3.options.onRequestError && await callHooks2(u3, u3.options.onRequestError), await onError(u3);
    } finally {
      f3 && clearTimeout(f3);
    }
    if ((u3.response.body || u3.response._bodyInit) && !Kr.has(u3.response.status) && "HEAD" !== u3.options.method) {
      const e5 = (u3.options.parseResponse ? "json" : u3.options.responseType) || (function(e6 = "") {
        if (!e6) return "json";
        const t5 = e6.split(";").shift() || "";
        return zr.test(t5) ? "json" : "text/event-stream" === t5 ? "stream" : Dr.has(t5) || t5.startsWith("text/") ? "text" : "blob";
      })(u3.response.headers.get("content-type") || "");
      switch (e5) {
        case "json": {
          const e6 = await u3.response.text(), t5 = u3.options.parseResponse || destr;
          u3.response._data = t5(e6);
          break;
        }
        case "stream":
          u3.response._data = u3.response.body || u3.response._bodyInit;
          break;
        default:
          u3.response._data = await u3.response[e5]();
      }
    }
    return u3.options.onResponse && await callHooks2(u3, u3.options.onResponse), !u3.options.ignoreResponseError && u3.response.status >= 400 && u3.response.status < 600 ? (u3.options.onResponseError && await callHooks2(u3, u3.options.onResponseError), await onError(u3)) : u3.response;
  }, "$fetchRaw"), $fetch = /* @__PURE__ */ __name(async function(e5, t5) {
    return (await $fetchRaw(e5, t5))._data;
  }, "$fetch");
  return $fetch.raw = $fetchRaw, $fetch.native = (...e5) => t4(...e5), $fetch.create = (t5 = {}, r4 = {}) => createFetch({ ...e4, ...r4, defaults: { ...e4.defaults, ...r4.defaults, ...t5 } }), $fetch;
}
function asyncCall(e4, ...t4) {
  try {
    return (r3 = e4(...t4)) && "function" == typeof r3.then ? r3 : Promise.resolve(r3);
  } catch (e5) {
    return Promise.reject(e5);
  }
  var r3;
}
function stringify2(e4) {
  if (/* @__PURE__ */ (function(e5) {
    const t4 = typeof e5;
    return null === e5 || "object" !== t4 && "function" !== t4;
  })(e4)) return String(e4);
  if ((function(e5) {
    const t4 = Object.getPrototypeOf(e5);
    return !t4 || t4.isPrototypeOf(Object);
  })(e4) || Array.isArray(e4)) return JSON.stringify(e4);
  if ("function" == typeof e4.toJSON) return stringify2(e4.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
function serializeRaw(e4) {
  return "string" == typeof e4 ? e4 : Vr + (function(e5) {
    if (globalThis.Buffer) return g.from(e5).toString("base64");
    return globalThis.btoa(String.fromCodePoint(...e5));
  })(e4);
}
function deserializeRaw(e4) {
  return "string" != typeof e4 ? e4 : e4.startsWith(Vr) ? (function(e5) {
    if (globalThis.Buffer) return g.from(e5, "base64");
    return Uint8Array.from(globalThis.atob(e5), (e6) => e6.codePointAt(0));
  })(e4.slice(7)) : e4;
}
function normalizeKey$1(e4) {
  return e4 && e4.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...e4) {
  return normalizeKey$1(e4.join(":"));
}
function normalizeBaseKey(e4) {
  return (e4 = normalizeKey$1(e4)) ? e4 + ":" : "";
}
function watch(e4, t4, r3) {
  return e4.watch ? e4.watch((e5, s4) => t4(e5, r3 + s4)) : () => {
  };
}
async function dispose(e4) {
  "function" == typeof e4.dispose && await asyncCall(e4.dispose);
}
function useStorage(e4 = "") {
  return e4 ? (function(e5, t4) {
    if (!(t4 = normalizeBaseKey(t4))) return e5;
    const r3 = { ...e5 };
    for (const s4 of Jr) r3[s4] = (r4 = "", ...a3) => e5[s4](t4 + r4, ...a3);
    return r3.getKeys = (r4 = "", ...s4) => e5.getKeys(t4 + r4, ...s4).then((e6) => e6.map((e7) => e7.slice(t4.length))), r3.keys = r3.getKeys, r3.getItems = async (r4, s4) => {
      const a3 = r4.map((e6) => "string" == typeof e6 ? t4 + e6 : { ...e6, key: t4 + e6.key });
      return (await e5.getItems(a3, s4)).map((e6) => ({ key: e6.key.slice(t4.length), value: e6.value }));
    }, r3.setItems = async (r4, s4) => {
      const a3 = r4.map((e6) => ({ key: t4 + e6.key, value: e6.value, options: e6.options }));
      return e5.setItems(a3, s4);
    }, r3;
  })(tn, e4) : tn;
}
function hash(e4) {
  return (function(e5) {
    return new k2().finalize(e5).toBase64();
  })("string" == typeof e4 ? e4 : (function(e5) {
    const t4 = new sn();
    return t4.dispatch(e5), t4.buff;
  })(e4)).replace(/[-_]/g, "").slice(0, 10);
}
function defineCachedFunction(e4, t4 = {}) {
  t4 = { name: "_", base: "/cache", swr: true, maxAge: 1, ...t4 };
  const r3 = {}, s4 = t4.group || "nitro/functions", a3 = t4.name || e4.name || "_", c3 = t4.integrity || hash([e4, t4]), u3 = t4.validate || ((e5) => void 0 !== e5.value);
  return async (...f3) => {
    if (await t4.shouldBypassCache?.(...f3)) return e4(...f3);
    const h2 = await (t4.getKey || getKey)(...f3), d3 = await t4.shouldInvalidateCache?.(...f3), g2 = await (async function(e5, f4, h3, d4) {
      const g3 = [t4.base, s4, a3, e5 + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
      let m5 = await useStorage().getItem(g3).catch((e6) => {
        console.error("[cache] Cache read error.", e6), useNitroApp().captureError(e6, { event: d4, tags: ["cache"] });
      }) || {};
      if ("object" != typeof m5) {
        m5 = {};
        const e6 = new Error("Malformed data read from cache.");
        console.error("[cache]", e6), useNitroApp().captureError(e6, { event: d4, tags: ["cache"] });
      }
      const _3 = 1e3 * (t4.maxAge ?? 0);
      _3 && (m5.expires = Date.now() + _3);
      const E3 = h3 || m5.integrity !== c3 || _3 && Date.now() - (m5.mtime || 0) > _3 || false === u3(m5), R3 = E3 ? (async () => {
        const s5 = r3[e5];
        s5 || (void 0 !== m5.value && (t4.staleMaxAge || 0) >= 0 && false === t4.swr && (m5.value = void 0, m5.integrity = void 0, m5.mtime = void 0, m5.expires = void 0), r3[e5] = Promise.resolve(f4()));
        try {
          m5.value = await r3[e5];
        } catch (t5) {
          throw s5 || delete r3[e5], t5;
        }
        if (!s5 && (m5.mtime = Date.now(), m5.integrity = c3, delete r3[e5], false !== u3(m5))) {
          let e6;
          t4.maxAge && !t4.swr && (e6 = { ttl: t4.maxAge });
          const r4 = useStorage().setItem(g3, m5, e6).catch((e7) => {
            console.error("[cache] Cache write error.", e7), useNitroApp().captureError(e7, { event: d4, tags: ["cache"] });
          });
          d4?.waitUntil && d4.waitUntil(r4);
        }
      })() : Promise.resolve();
      return void 0 === m5.value ? await R3 : E3 && d4 && d4.waitUntil && d4.waitUntil(R3), t4.swr && false !== u3(m5) ? (R3.catch((e6) => {
        console.error("[cache] SWR handler error.", e6), useNitroApp().captureError(e6, { event: d4, tags: ["cache"] });
      }), m5) : R3.then(() => m5);
    })(h2, () => e4(...f3), d3, f3[0] && isEvent(f3[0]) ? f3[0] : void 0);
    let m4 = g2.value;
    return t4.transform && (m4 = await t4.transform(g2, ...f3) || m4), m4;
  };
}
function getKey(...e4) {
  return e4.length > 0 ? hash(e4) : "";
}
function escapeKey(e4) {
  return String(e4).replace(/\W/g, "");
}
function cloneWithProxy(e4, t4) {
  return new Proxy(e4, { get: /* @__PURE__ */ __name((e5, r3, s4) => r3 in t4 ? t4[r3] : Reflect.get(e5, r3, s4), "get"), set: /* @__PURE__ */ __name((e5, r3, s4, a3) => r3 in t4 ? (t4[r3] = s4, true) : Reflect.set(e5, r3, s4, a3), "set") });
}
function klona(e4) {
  if ("object" != typeof e4) return e4;
  var t4, r3, s4 = Object.prototype.toString.call(e4);
  if ("[object Object]" === s4) {
    if (e4.constructor !== Object && "function" == typeof e4.constructor) for (t4 in r3 = new e4.constructor(), e4) e4.hasOwnProperty(t4) && r3[t4] !== e4[t4] && (r3[t4] = klona(e4[t4]));
    else for (t4 in r3 = {}, e4) "__proto__" === t4 ? Object.defineProperty(r3, t4, { value: klona(e4[t4]), configurable: true, enumerable: true, writable: true }) : r3[t4] = klona(e4[t4]);
    return r3;
  }
  if ("[object Array]" === s4) {
    for (t4 = e4.length, r3 = Array(t4); t4--; ) r3[t4] = klona(e4[t4]);
    return r3;
  }
  return "[object Set]" === s4 ? (r3 = /* @__PURE__ */ new Set(), e4.forEach(function(e5) {
    r3.add(klona(e5));
  }), r3) : "[object Map]" === s4 ? (r3 = /* @__PURE__ */ new Map(), e4.forEach(function(e5, t5) {
    r3.set(klona(t5), klona(e5));
  }), r3) : "[object Date]" === s4 ? /* @__PURE__ */ new Date(+e4) : "[object RegExp]" === s4 ? ((r3 = new RegExp(e4.source, e4.flags)).lastIndex = e4.lastIndex, r3) : "[object DataView]" === s4 ? new e4.constructor(klona(e4.buffer)) : "[object ArrayBuffer]" === s4 ? e4.slice(0) : "Array]" === s4.slice(-6) ? new e4.constructor(e4) : e4;
}
function isUppercase(e4 = "") {
  if (!cn.test(e4)) return e4 !== e4.toLowerCase();
}
function kebabCase(e4, t4) {
  return e4 ? (Array.isArray(e4) ? e4 : (function(e5) {
    const t5 = un, r3 = [];
    if (!e5 || "string" != typeof e5) return r3;
    let s4, a3, c3 = "";
    for (const u3 of e5) {
      const e6 = t5.includes(u3);
      if (true === e6) {
        r3.push(c3), c3 = "", s4 = void 0;
        continue;
      }
      const f3 = isUppercase(u3);
      if (false === a3) {
        if (false === s4 && true === f3) {
          r3.push(c3), c3 = u3, s4 = f3;
          continue;
        }
        if (true === s4 && false === f3 && c3.length > 1) {
          const e7 = c3.at(-1);
          r3.push(c3.slice(0, Math.max(0, c3.length - 1))), c3 = e7 + u3, s4 = f3;
          continue;
        }
      }
      c3 += u3, s4 = f3, a3 = e6;
    }
    return r3.push(c3), r3;
  })(e4)).map((e5) => e5.toLowerCase()).join(t4) : "";
}
function getEnv(e4, t4) {
  const r3 = (s4 = e4, kebabCase(s4 || "", "_")).toUpperCase();
  var s4;
  return destr(G.env[t4.prefix + r3] ?? G.env[t4.altPrefix + r3]);
}
function _isObject(e4) {
  return "object" == typeof e4 && !Array.isArray(e4);
}
function applyEnv(e4, t4, r3 = "") {
  for (const s4 in e4) {
    const a3 = r3 ? `${r3}_${s4}` : s4, c3 = getEnv(a3, t4);
    _isObject(e4[s4]) ? _isObject(c3) ? (e4[s4] = { ...e4[s4], ...c3 }, applyEnv(e4[s4], t4, a3)) : void 0 === c3 ? applyEnv(e4[s4], t4, a3) : e4[s4] = c3 ?? e4[s4] : e4[s4] = c3 ?? e4[s4], t4.envExpansion && "string" == typeof e4[s4] && (e4[s4] = _expandFromEnv(e4[s4]));
  }
  return e4;
}
function _expandFromEnv(e4) {
  return e4.replace(fn, (e5, t4) => G.env[t4] || e5);
}
function useRuntimeConfig(e4) {
  if (!e4) return dn;
  if (e4.context.nitro.runtimeConfig) return e4.context.nitro.runtimeConfig;
  const t4 = klona(ln);
  return applyEnv(t4, hn), e4.context.nitro.runtimeConfig = t4, t4;
}
function _deepFreeze(e4) {
  const t4 = Object.getOwnPropertyNames(e4);
  for (const r3 of t4) {
    const t5 = e4[r3];
    t5 && "object" == typeof t5 && _deepFreeze(t5);
  }
  return Object.freeze(e4);
}
function isPathInScope(e4, t4) {
  let r3;
  try {
    const t5 = e4.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    r3 = new URL(t5, "http://_").pathname;
  } catch {
    return false;
  }
  return !t4 || r3 === t4 || r3.startsWith(t4 + "/");
}
function createRouteRulesHandler(e4) {
  return $r((t4) => {
    const r3 = getRouteRules(t4);
    if (r3.headers && Lr(t4, r3.headers), r3.redirect) {
      let e5 = r3.redirect.to;
      if (e5.endsWith("/**")) {
        let s4 = t4.path;
        const a3 = r3.redirect._redirectStripBase;
        if (a3) {
          if (!isPathInScope(t4.path.split("?")[0], a3)) throw createError({ statusCode: 400 });
          s4 = withoutBase(s4, a3);
        } else s4.startsWith("//") && (s4 = s4.replace(/^\/+/, "/"));
        e5 = joinURL(e5.slice(0, -3), s4);
      } else if (t4.path.includes("?")) {
        e5 = withQuery(e5, getQuery$1(t4.path));
      }
      return (function(e6, t5, r4 = 302) {
        return e6.node.res.statusCode = sanitizeStatusCode(r4, e6.node.res.statusCode), e6.node.res.setHeader("location", t5), send(e6, `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${t5.replace(/"/g, "%22")}"></head></html>`, Cr.html);
      })(t4, e5, r3.redirect.statusCode);
    }
    if (r3.proxy) {
      let s4 = r3.proxy.to;
      if (s4.endsWith("/**")) {
        let e5 = t4.path;
        const a3 = r3.proxy._proxyStripBase;
        if (a3) {
          if (!isPathInScope(t4.path.split("?")[0], a3)) throw createError({ statusCode: 400 });
          e5 = withoutBase(e5, a3);
        } else e5.startsWith("//") && (e5 = e5.replace(/^\/+/, "/"));
        s4 = joinURL(s4.slice(0, -3), e5);
      } else if (t4.path.includes("?")) {
        s4 = withQuery(s4, getQuery$1(t4.path));
      }
      return proxyRequest(t4, s4, { fetch: e4.localFetch, ...r3.proxy });
    }
  });
}
function getRouteRules(e4) {
  return e4.context._nitro = e4.context._nitro || {}, e4.context._nitro.routeRules || (e4.context._nitro.routeRules = getRouteRulesForPath(withoutBase(e4.path.split("?")[0], useRuntimeConfig().app.baseURL))), e4.context._nitro.routeRules;
}
function getRouteRulesForPath(e4) {
  return Er({}, ...bn.matchAll(e4).reverse());
}
function joinHeaders(e4) {
  return Array.isArray(e4) ? e4.join(", ") : String(e4);
}
function normalizeCookieHeader(e4 = "") {
  return splitCookiesString(joinHeaders(e4));
}
function normalizeCookieHeaders(e4) {
  const t4 = new Headers();
  for (const [r3, s4] of e4) if ("set-cookie" === r3) for (const e5 of normalizeCookieHeader(s4)) t4.append("set-cookie", e5);
  else t4.set(r3, joinHeaders(s4));
  return t4;
}
function hasReqHeader(e4, t4, r3) {
  const s4 = (function(e5, t5) {
    return getRequestHeaders(e5)[t5.toLowerCase()];
  })(e4, t4);
  return !(!s4 || "string" != typeof s4 || !s4.toLowerCase().includes(r3));
}
function defaultHandler(e4, t4, r3) {
  const s4 = e4.unhandled || e4.fatal, a3 = e4.statusCode || 500, c3 = e4.statusMessage || "Server Error", u3 = getRequestURL(t4, { xForwardedHost: true, xForwardedProto: true });
  if (404 === a3) {
    const e5 = "/";
    if (/^\/[^/]/.test(e5) && !u3.pathname.startsWith(e5)) {
      return { status: 302, statusText: "Found", headers: { location: `${e5}${u3.pathname.slice(1)}${u3.search}` }, body: "Redirecting..." };
    }
  }
  if (s4 && !r3?.silent) {
    const r4 = [e4.unhandled && "[unhandled]", e4.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${r4} [${t4.method}] ${u3}
`, e4);
  }
  const f3 = { "content-type": "application/json", "x-content-type-options": "nosniff", "x-frame-options": "DENY", "referrer-policy": "no-referrer", "content-security-policy": "script-src 'none'; frame-ancestors 'none';" };
  setResponseStatus(t4, a3, c3), 404 !== a3 && (function(e5, t5) {
    return e5.node.res.getHeader(t5);
  })(t4, "cache-control") || (f3["cache-control"] = "no-cache");
  return { status: a3, statusText: c3, headers: f3, body: { error: true, url: u3.href, statusCode: a3, statusMessage: c3, message: s4 ? "Server Error" : e4.message, data: s4 ? void 0 : e4.data } };
}
function useNitroApp() {
  return xn;
}
function defineRenderHandler(e4) {
  const t4 = useRuntimeConfig();
  return $r(async (r3) => {
    const s4 = useNitroApp(), a3 = { event: r3, render: e4, response: void 0 };
    if (await s4.hooks.callHook("render:before", a3), !a3.response) {
      if (r3.path === `${t4.app.baseURL}favicon.ico`) return setResponseHeader(r3, "Content-Type", "image/x-icon"), send(r3, "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      if (a3.response = await a3.render(r3), !a3.response) {
        const e5 = getResponseStatus(r3);
        return setResponseStatus(r3, 200 === e5 ? 500 : e5), send(r3, "No response returned from render handler: " + r3.path);
      }
    }
    return await s4.hooks.callHook("render:response", a3.response, a3), a3.response.headers && setResponseHeaders(r3, a3.response.headers), (a3.response.statusCode || a3.response.statusMessage) && setResponseStatus(r3, a3.response.statusCode, a3.response.statusMessage), a3.response.body;
  });
}
var e3, t3, r2, s3, a2, c2, u2, f2, h, d2, g, m3, _2, E2, R2, inspect, x2, B2, T2, I2, S2, C2, j3, P2, L2, O2, N2, $2, U2, M2, H2, W2, q2, _EventEmitter, EventEmitterAsyncResource, EventEmitterReferencingAsyncResource, on$1, once$1, addAbortListener, getEventListeners, getMaxListeners$1, D2, FixedCircularBuffer, FixedQueue, ReadStream, WriteStream, z2, Process, F2, K2, _getEnv, Q2, Z2, Y2, G, V2, J2, X2, ee2, te2, re2, ne2, oe, se, ie, ae, ce, ue, fe, le, he, de, pe, ge, ye, me, we, be, ve, _e, Ee, Re, xe, Be, Ae, Te, Ie, Se, ke, Ce, je, Pe, Le, Oe, Ne, $e, Ue, Me, He, We, qe, De, ze, Fe, Ke, Qe, Ze, Ye, Ge, Ve, Je, Xe, et, tt, rt, nt, ot, st, it, at, ct, ut, ft, lt, ht, dt, pt, gt, yt, mt, wt, bt, vt, _t, Et, Rt, xt, Bt, At, Tt, It, St, kt, Ct, jt, Pt, Lt, Ot, Nt, $t, Ut, Mt, Ht, Wt, qt, Dt, zt, Ft, Kt, Qt, Zt, Yt, Gt, Timeout, Immediate, Vt, Jt, Xt, er, tr, rr, nr, or, sr, ir, ar, cr, ur, fr, lr, hr, dr, pr, gr, yr, mr, wr, br, vr, _r, Er, Rr, i2, xr, Br, Ar, A2, y2, w2, Tr, Ir, H3Error, Sr, kr, Cr, jr, Pr, Lr, Or, Nr, H3Event, $r, lazyEventHandler, Ur, Mr, Hr, Hookable, Wr, FetchError, qr, Dr, zr, Fr, Kr, Qr, Zr, Yr, Gr, Vr, Jr, memory, Xr, normalizeKey, en, tn, rn, nn, on, k2, l2, sn, cachedEventHandler, an, cn, un, fn, ln, hn, dn, pn, gn, yn, mn, wn, bn, vn, _n, En, _lazy_ZcXCBa, Rn, xn, Bn, An, Tn, In;
var init_nitro = __esm({
  ".wrangler/tmp/pages-snvQxE/chunks/nitro/nitro.mjs"() {
    "use strict";
    init_modules_watch_stub();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    e3 = [];
    t3 = [];
    r2 = "undefined" == typeof Uint8Array ? Array : Uint8Array;
    s3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (let r3 = 0, a3 = 64; r3 < a3; ++r3) e3[r3] = s3[r3], t3[s3.charCodeAt(r3)] = r3;
    __name(toByteArray, "toByteArray");
    __name(tripletToBase64, "tripletToBase64");
    __name(encodeChunk, "encodeChunk");
    __name(fromByteArray, "fromByteArray");
    __name(read, "read");
    __name(write, "write");
    t3["-".charCodeAt(0)] = 62, t3["_".charCodeAt(0)] = 63;
    a2 = "function" == typeof Symbol && "function" == typeof Symbol.for ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
    c2 = 2147483647;
    __name(createBuffer, "createBuffer");
    __name(Buffer$1, "Buffer$1");
    __name(from, "from");
    __name(assertSize, "assertSize");
    __name(allocUnsafe, "allocUnsafe");
    __name(fromArrayLike, "fromArrayLike");
    __name(fromArrayBuffer, "fromArrayBuffer");
    __name(checked, "checked");
    __name(byteLength, "byteLength");
    __name(slowToString, "slowToString");
    __name(swap, "swap");
    __name(bidirectionalIndexOf, "bidirectionalIndexOf");
    __name(arrayIndexOf, "arrayIndexOf");
    __name(hexWrite, "hexWrite");
    __name(utf8Write, "utf8Write");
    __name(asciiWrite, "asciiWrite");
    __name(base64Write, "base64Write");
    __name(ucs2Write, "ucs2Write");
    __name(base64Slice, "base64Slice");
    __name(utf8Slice, "utf8Slice");
    Buffer$1.TYPED_ARRAY_SUPPORT = (function() {
      try {
        const e4 = new Uint8Array(1), t4 = { foo: /* @__PURE__ */ __name(function() {
          return 42;
        }, "foo") };
        return Object.setPrototypeOf(t4, Uint8Array.prototype), Object.setPrototypeOf(e4, t4), 42 === e4.foo();
      } catch {
        return false;
      }
    })(), Buffer$1.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This environment lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(Buffer$1.prototype, "parent", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      if (Buffer$1.isBuffer(this)) return this.buffer;
    }, "get") }), Object.defineProperty(Buffer$1.prototype, "offset", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      if (Buffer$1.isBuffer(this)) return this.byteOffset;
    }, "get") }), Buffer$1.poolSize = 8192, Buffer$1.from = function(e4, t4, r3) {
      return from(e4, t4, r3);
    }, Object.setPrototypeOf(Buffer$1.prototype, Uint8Array.prototype), Object.setPrototypeOf(Buffer$1, Uint8Array), Buffer$1.alloc = function(e4, t4, r3) {
      return (function(e5, t5, r4) {
        return assertSize(e5), e5 <= 0 ? createBuffer(e5) : void 0 !== t5 ? "string" == typeof r4 ? createBuffer(e5).fill(t5, r4) : createBuffer(e5).fill(t5) : createBuffer(e5);
      })(e4, t4, r3);
    }, Buffer$1.allocUnsafe = function(e4) {
      return allocUnsafe(e4);
    }, Buffer$1.allocUnsafeSlow = function(e4) {
      return allocUnsafe(e4);
    }, Buffer$1.isBuffer = function(e4) {
      return null != e4 && true === e4._isBuffer && e4 !== Buffer$1.prototype;
    }, Buffer$1.compare = function(e4, t4) {
      if (isInstance(e4, Uint8Array) && (e4 = Buffer$1.from(e4, e4.offset, e4.byteLength)), isInstance(t4, Uint8Array) && (t4 = Buffer$1.from(t4, t4.offset, t4.byteLength)), !Buffer$1.isBuffer(e4) || !Buffer$1.isBuffer(t4)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      if (e4 === t4) return 0;
      let r3 = e4.length, s4 = t4.length;
      for (let a3 = 0, c3 = Math.min(r3, s4); a3 < c3; ++a3) if (e4[a3] !== t4[a3]) {
        r3 = e4[a3], s4 = t4[a3];
        break;
      }
      return r3 < s4 ? -1 : s4 < r3 ? 1 : 0;
    }, Buffer$1.isEncoding = function(e4) {
      switch (String(e4).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    }, Buffer$1.concat = function(e4, t4) {
      if (!Array.isArray(e4)) throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === e4.length) return Buffer$1.alloc(0);
      let r3;
      if (void 0 === t4) for (t4 = 0, r3 = 0; r3 < e4.length; ++r3) t4 += e4[r3].length;
      const s4 = Buffer$1.allocUnsafe(t4);
      let a3 = 0;
      for (r3 = 0; r3 < e4.length; ++r3) {
        let t5 = e4[r3];
        if (isInstance(t5, Uint8Array)) a3 + t5.length > s4.length ? (Buffer$1.isBuffer(t5) || (t5 = Buffer$1.from(t5.buffer, t5.byteOffset, t5.byteLength)), t5.copy(s4, a3)) : Uint8Array.prototype.set.call(s4, t5, a3);
        else {
          if (!Buffer$1.isBuffer(t5)) throw new TypeError('"list" argument must be an Array of Buffers');
          t5.copy(s4, a3);
        }
        a3 += t5.length;
      }
      return s4;
    }, Buffer$1.byteLength = byteLength, Buffer$1.prototype._isBuffer = true, Buffer$1.prototype.swap16 = function() {
      const e4 = this.length;
      if (e4 % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let t4 = 0; t4 < e4; t4 += 2) swap(this, t4, t4 + 1);
      return this;
    }, Buffer$1.prototype.swap32 = function() {
      const e4 = this.length;
      if (e4 % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let t4 = 0; t4 < e4; t4 += 4) swap(this, t4, t4 + 3), swap(this, t4 + 1, t4 + 2);
      return this;
    }, Buffer$1.prototype.swap64 = function() {
      const e4 = this.length;
      if (e4 % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let t4 = 0; t4 < e4; t4 += 8) swap(this, t4, t4 + 7), swap(this, t4 + 1, t4 + 6), swap(this, t4 + 2, t4 + 5), swap(this, t4 + 3, t4 + 4);
      return this;
    }, Buffer$1.prototype.toString = function() {
      const e4 = this.length;
      return 0 === e4 ? "" : 0 === arguments.length ? utf8Slice(this, 0, e4) : Reflect.apply(slowToString, this, arguments);
    }, Buffer$1.prototype.toLocaleString = Buffer$1.prototype.toString, Buffer$1.prototype.equals = function(e4) {
      if (!Buffer$1.isBuffer(e4)) throw new TypeError("Argument must be a Buffer");
      return this === e4 || 0 === Buffer$1.compare(this, e4);
    }, Buffer$1.prototype.inspect = function() {
      let e4 = "";
      return e4 = this.toString("hex", 0, 50).replace(/(.{2})/g, "$1 ").trim(), this.length > 50 && (e4 += " ... "), "<Buffer " + e4 + ">";
    }, a2 && (Buffer$1.prototype[a2] = Buffer$1.prototype.inspect), Buffer$1.prototype.compare = function(e4, t4, r3, s4, a3) {
      if (isInstance(e4, Uint8Array) && (e4 = Buffer$1.from(e4, e4.offset, e4.byteLength)), !Buffer$1.isBuffer(e4)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e4);
      if (void 0 === t4 && (t4 = 0), void 0 === r3 && (r3 = e4 ? e4.length : 0), void 0 === s4 && (s4 = 0), void 0 === a3 && (a3 = this.length), t4 < 0 || r3 > e4.length || s4 < 0 || a3 > this.length) throw new RangeError("out of range index");
      if (s4 >= a3 && t4 >= r3) return 0;
      if (s4 >= a3) return -1;
      if (t4 >= r3) return 1;
      if (this === e4) return 0;
      let c3 = (a3 >>>= 0) - (s4 >>>= 0), u3 = (r3 >>>= 0) - (t4 >>>= 0);
      const f3 = Math.min(c3, u3), h2 = this.slice(s4, a3), d3 = e4.slice(t4, r3);
      for (let e5 = 0; e5 < f3; ++e5) if (h2[e5] !== d3[e5]) {
        c3 = h2[e5], u3 = d3[e5];
        break;
      }
      return c3 < u3 ? -1 : u3 < c3 ? 1 : 0;
    }, Buffer$1.prototype.includes = function(e4, t4, r3) {
      return -1 !== this.indexOf(e4, t4, r3);
    }, Buffer$1.prototype.indexOf = function(e4, t4, r3) {
      return bidirectionalIndexOf(this, e4, t4, r3, true);
    }, Buffer$1.prototype.lastIndexOf = function(e4, t4, r3) {
      return bidirectionalIndexOf(this, e4, t4, r3, false);
    }, Buffer$1.prototype.write = function(e4, t4, r3, s4) {
      if (void 0 === t4) s4 = "utf8", r3 = this.length, t4 = 0;
      else if (void 0 === r3 && "string" == typeof t4) s4 = t4, r3 = this.length, t4 = 0;
      else {
        if (!Number.isFinite(t4)) throw new TypeError("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        t4 >>>= 0, Number.isFinite(r3) ? (r3 >>>= 0, void 0 === s4 && (s4 = "utf8")) : (s4 = r3, r3 = void 0);
      }
      const a3 = this.length - t4;
      if ((void 0 === r3 || r3 > a3) && (r3 = a3), e4.length > 0 && (r3 < 0 || t4 < 0) || t4 > this.length) throw new RangeError("Attempt to write outside buffer bounds");
      s4 || (s4 = "utf8");
      let c3 = false;
      for (; ; ) switch (s4) {
        case "hex":
          return hexWrite(this, e4, t4, r3);
        case "utf8":
        case "utf-8":
          return utf8Write(this, e4, t4, r3);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, e4, t4, r3);
        case "base64":
          return base64Write(this, e4, t4, r3);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, e4, t4, r3);
        default:
          if (c3) throw new TypeError("Unknown encoding: " + s4);
          s4 = ("" + s4).toLowerCase(), c3 = true;
      }
    }, Buffer$1.prototype.toJSON = function() {
      return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
    };
    u2 = 4096;
    __name(asciiSlice, "asciiSlice");
    __name(latin1Slice, "latin1Slice");
    __name(hexSlice, "hexSlice");
    __name(utf16leSlice, "utf16leSlice");
    __name(checkOffset, "checkOffset");
    __name(checkInt, "checkInt");
    __name(wrtBigUInt64LE, "wrtBigUInt64LE");
    __name(wrtBigUInt64BE, "wrtBigUInt64BE");
    __name(checkIEEE754, "checkIEEE754");
    __name(writeFloat, "writeFloat");
    __name(writeDouble, "writeDouble");
    Buffer$1.prototype.slice = function(e4, t4) {
      const r3 = this.length;
      (e4 = Math.trunc(e4)) < 0 ? (e4 += r3) < 0 && (e4 = 0) : e4 > r3 && (e4 = r3), (t4 = void 0 === t4 ? r3 : Math.trunc(t4)) < 0 ? (t4 += r3) < 0 && (t4 = 0) : t4 > r3 && (t4 = r3), t4 < e4 && (t4 = e4);
      const s4 = this.subarray(e4, t4);
      return Object.setPrototypeOf(s4, Buffer$1.prototype), s4;
    }, Buffer$1.prototype.readUintLE = Buffer$1.prototype.readUIntLE = function(e4, t4, r3) {
      e4 >>>= 0, t4 >>>= 0, r3 || checkOffset(e4, t4, this.length);
      let s4 = this[e4], a3 = 1, c3 = 0;
      for (; ++c3 < t4 && (a3 *= 256); ) s4 += this[e4 + c3] * a3;
      return s4;
    }, Buffer$1.prototype.readUintBE = Buffer$1.prototype.readUIntBE = function(e4, t4, r3) {
      e4 >>>= 0, t4 >>>= 0, r3 || checkOffset(e4, t4, this.length);
      let s4 = this[e4 + --t4], a3 = 1;
      for (; t4 > 0 && (a3 *= 256); ) s4 += this[e4 + --t4] * a3;
      return s4;
    }, Buffer$1.prototype.readUint8 = Buffer$1.prototype.readUInt8 = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 1, this.length), this[e4];
    }, Buffer$1.prototype.readUint16LE = Buffer$1.prototype.readUInt16LE = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 2, this.length), this[e4] | this[e4 + 1] << 8;
    }, Buffer$1.prototype.readUint16BE = Buffer$1.prototype.readUInt16BE = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 2, this.length), this[e4] << 8 | this[e4 + 1];
    }, Buffer$1.prototype.readUint32LE = Buffer$1.prototype.readUInt32LE = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 4, this.length), (this[e4] | this[e4 + 1] << 8 | this[e4 + 2] << 16) + 16777216 * this[e4 + 3];
    }, Buffer$1.prototype.readUint32BE = Buffer$1.prototype.readUInt32BE = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 4, this.length), 16777216 * this[e4] + (this[e4 + 1] << 16 | this[e4 + 2] << 8 | this[e4 + 3]);
    }, Buffer$1.prototype.readBigUInt64LE = defineBigIntMethod(function(e4) {
      validateNumber(e4 >>>= 0, "offset");
      const t4 = this[e4], r3 = this[e4 + 7];
      void 0 !== t4 && void 0 !== r3 || boundsError(e4, this.length - 8);
      const s4 = t4 + 256 * this[++e4] + 65536 * this[++e4] + this[++e4] * 2 ** 24, a3 = this[++e4] + 256 * this[++e4] + 65536 * this[++e4] + r3 * 2 ** 24;
      return BigInt(s4) + (BigInt(a3) << BigInt(32));
    }), Buffer$1.prototype.readBigUInt64BE = defineBigIntMethod(function(e4) {
      validateNumber(e4 >>>= 0, "offset");
      const t4 = this[e4], r3 = this[e4 + 7];
      void 0 !== t4 && void 0 !== r3 || boundsError(e4, this.length - 8);
      const s4 = t4 * 2 ** 24 + 65536 * this[++e4] + 256 * this[++e4] + this[++e4], a3 = this[++e4] * 2 ** 24 + 65536 * this[++e4] + 256 * this[++e4] + r3;
      return (BigInt(s4) << BigInt(32)) + BigInt(a3);
    }), Buffer$1.prototype.readIntLE = function(e4, t4, r3) {
      e4 >>>= 0, t4 >>>= 0, r3 || checkOffset(e4, t4, this.length);
      let s4 = this[e4], a3 = 1, c3 = 0;
      for (; ++c3 < t4 && (a3 *= 256); ) s4 += this[e4 + c3] * a3;
      return a3 *= 128, s4 >= a3 && (s4 -= Math.pow(2, 8 * t4)), s4;
    }, Buffer$1.prototype.readIntBE = function(e4, t4, r3) {
      e4 >>>= 0, t4 >>>= 0, r3 || checkOffset(e4, t4, this.length);
      let s4 = t4, a3 = 1, c3 = this[e4 + --s4];
      for (; s4 > 0 && (a3 *= 256); ) c3 += this[e4 + --s4] * a3;
      return a3 *= 128, c3 >= a3 && (c3 -= Math.pow(2, 8 * t4)), c3;
    }, Buffer$1.prototype.readInt8 = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 1, this.length), 128 & this[e4] ? -1 * (255 - this[e4] + 1) : this[e4];
    }, Buffer$1.prototype.readInt16LE = function(e4, t4) {
      e4 >>>= 0, t4 || checkOffset(e4, 2, this.length);
      const r3 = this[e4] | this[e4 + 1] << 8;
      return 32768 & r3 ? 4294901760 | r3 : r3;
    }, Buffer$1.prototype.readInt16BE = function(e4, t4) {
      e4 >>>= 0, t4 || checkOffset(e4, 2, this.length);
      const r3 = this[e4 + 1] | this[e4] << 8;
      return 32768 & r3 ? 4294901760 | r3 : r3;
    }, Buffer$1.prototype.readInt32LE = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 4, this.length), this[e4] | this[e4 + 1] << 8 | this[e4 + 2] << 16 | this[e4 + 3] << 24;
    }, Buffer$1.prototype.readInt32BE = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 4, this.length), this[e4] << 24 | this[e4 + 1] << 16 | this[e4 + 2] << 8 | this[e4 + 3];
    }, Buffer$1.prototype.readBigInt64LE = defineBigIntMethod(function(e4) {
      validateNumber(e4 >>>= 0, "offset");
      const t4 = this[e4], r3 = this[e4 + 7];
      void 0 !== t4 && void 0 !== r3 || boundsError(e4, this.length - 8);
      const s4 = this[e4 + 4] + 256 * this[e4 + 5] + 65536 * this[e4 + 6] + (r3 << 24);
      return (BigInt(s4) << BigInt(32)) + BigInt(t4 + 256 * this[++e4] + 65536 * this[++e4] + this[++e4] * 2 ** 24);
    }), Buffer$1.prototype.readBigInt64BE = defineBigIntMethod(function(e4) {
      validateNumber(e4 >>>= 0, "offset");
      const t4 = this[e4], r3 = this[e4 + 7];
      void 0 !== t4 && void 0 !== r3 || boundsError(e4, this.length - 8);
      const s4 = (t4 << 24) + 65536 * this[++e4] + 256 * this[++e4] + this[++e4];
      return (BigInt(s4) << BigInt(32)) + BigInt(this[++e4] * 2 ** 24 + 65536 * this[++e4] + 256 * this[++e4] + r3);
    }), Buffer$1.prototype.readFloatLE = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 4, this.length), read(this, e4, true, 23, 4);
    }, Buffer$1.prototype.readFloatBE = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 4, this.length), read(this, e4, false, 23, 4);
    }, Buffer$1.prototype.readDoubleLE = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 8, this.length), read(this, e4, true, 52, 8);
    }, Buffer$1.prototype.readDoubleBE = function(e4, t4) {
      return e4 >>>= 0, t4 || checkOffset(e4, 8, this.length), read(this, e4, false, 52, 8);
    }, Buffer$1.prototype.writeUintLE = Buffer$1.prototype.writeUIntLE = function(e4, t4, r3, s4) {
      if (e4 = +e4, t4 >>>= 0, r3 >>>= 0, !s4) {
        checkInt(this, e4, t4, r3, Math.pow(2, 8 * r3) - 1, 0);
      }
      let a3 = 1, c3 = 0;
      for (this[t4] = 255 & e4; ++c3 < r3 && (a3 *= 256); ) this[t4 + c3] = e4 / a3 & 255;
      return t4 + r3;
    }, Buffer$1.prototype.writeUintBE = Buffer$1.prototype.writeUIntBE = function(e4, t4, r3, s4) {
      if (e4 = +e4, t4 >>>= 0, r3 >>>= 0, !s4) {
        checkInt(this, e4, t4, r3, Math.pow(2, 8 * r3) - 1, 0);
      }
      let a3 = r3 - 1, c3 = 1;
      for (this[t4 + a3] = 255 & e4; --a3 >= 0 && (c3 *= 256); ) this[t4 + a3] = e4 / c3 & 255;
      return t4 + r3;
    }, Buffer$1.prototype.writeUint8 = Buffer$1.prototype.writeUInt8 = function(e4, t4, r3) {
      return e4 = +e4, t4 >>>= 0, r3 || checkInt(this, e4, t4, 1, 255, 0), this[t4] = 255 & e4, t4 + 1;
    }, Buffer$1.prototype.writeUint16LE = Buffer$1.prototype.writeUInt16LE = function(e4, t4, r3) {
      return e4 = +e4, t4 >>>= 0, r3 || checkInt(this, e4, t4, 2, 65535, 0), this[t4] = 255 & e4, this[t4 + 1] = e4 >>> 8, t4 + 2;
    }, Buffer$1.prototype.writeUint16BE = Buffer$1.prototype.writeUInt16BE = function(e4, t4, r3) {
      return e4 = +e4, t4 >>>= 0, r3 || checkInt(this, e4, t4, 2, 65535, 0), this[t4] = e4 >>> 8, this[t4 + 1] = 255 & e4, t4 + 2;
    }, Buffer$1.prototype.writeUint32LE = Buffer$1.prototype.writeUInt32LE = function(e4, t4, r3) {
      return e4 = +e4, t4 >>>= 0, r3 || checkInt(this, e4, t4, 4, 4294967295, 0), this[t4 + 3] = e4 >>> 24, this[t4 + 2] = e4 >>> 16, this[t4 + 1] = e4 >>> 8, this[t4] = 255 & e4, t4 + 4;
    }, Buffer$1.prototype.writeUint32BE = Buffer$1.prototype.writeUInt32BE = function(e4, t4, r3) {
      return e4 = +e4, t4 >>>= 0, r3 || checkInt(this, e4, t4, 4, 4294967295, 0), this[t4] = e4 >>> 24, this[t4 + 1] = e4 >>> 16, this[t4 + 2] = e4 >>> 8, this[t4 + 3] = 255 & e4, t4 + 4;
    }, Buffer$1.prototype.writeBigUInt64LE = defineBigIntMethod(function(e4, t4 = 0) {
      return wrtBigUInt64LE(this, e4, t4, BigInt(0), BigInt("0xffffffffffffffff"));
    }), Buffer$1.prototype.writeBigUInt64BE = defineBigIntMethod(function(e4, t4 = 0) {
      return wrtBigUInt64BE(this, e4, t4, BigInt(0), BigInt("0xffffffffffffffff"));
    }), Buffer$1.prototype.writeIntLE = function(e4, t4, r3, s4) {
      if (e4 = +e4, t4 >>>= 0, !s4) {
        const s5 = Math.pow(2, 8 * r3 - 1);
        checkInt(this, e4, t4, r3, s5 - 1, -s5);
      }
      let a3 = 0, c3 = 1, u3 = 0;
      for (this[t4] = 255 & e4; ++a3 < r3 && (c3 *= 256); ) e4 < 0 && 0 === u3 && 0 !== this[t4 + a3 - 1] && (u3 = 1), this[t4 + a3] = Math.trunc(e4 / c3) - u3 & 255;
      return t4 + r3;
    }, Buffer$1.prototype.writeIntBE = function(e4, t4, r3, s4) {
      if (e4 = +e4, t4 >>>= 0, !s4) {
        const s5 = Math.pow(2, 8 * r3 - 1);
        checkInt(this, e4, t4, r3, s5 - 1, -s5);
      }
      let a3 = r3 - 1, c3 = 1, u3 = 0;
      for (this[t4 + a3] = 255 & e4; --a3 >= 0 && (c3 *= 256); ) e4 < 0 && 0 === u3 && 0 !== this[t4 + a3 + 1] && (u3 = 1), this[t4 + a3] = Math.trunc(e4 / c3) - u3 & 255;
      return t4 + r3;
    }, Buffer$1.prototype.writeInt8 = function(e4, t4, r3) {
      return e4 = +e4, t4 >>>= 0, r3 || checkInt(this, e4, t4, 1, 127, -128), e4 < 0 && (e4 = 255 + e4 + 1), this[t4] = 255 & e4, t4 + 1;
    }, Buffer$1.prototype.writeInt16LE = function(e4, t4, r3) {
      return e4 = +e4, t4 >>>= 0, r3 || checkInt(this, e4, t4, 2, 32767, -32768), this[t4] = 255 & e4, this[t4 + 1] = e4 >>> 8, t4 + 2;
    }, Buffer$1.prototype.writeInt16BE = function(e4, t4, r3) {
      return e4 = +e4, t4 >>>= 0, r3 || checkInt(this, e4, t4, 2, 32767, -32768), this[t4] = e4 >>> 8, this[t4 + 1] = 255 & e4, t4 + 2;
    }, Buffer$1.prototype.writeInt32LE = function(e4, t4, r3) {
      return e4 = +e4, t4 >>>= 0, r3 || checkInt(this, e4, t4, 4, 2147483647, -2147483648), this[t4] = 255 & e4, this[t4 + 1] = e4 >>> 8, this[t4 + 2] = e4 >>> 16, this[t4 + 3] = e4 >>> 24, t4 + 4;
    }, Buffer$1.prototype.writeInt32BE = function(e4, t4, r3) {
      return e4 = +e4, t4 >>>= 0, r3 || checkInt(this, e4, t4, 4, 2147483647, -2147483648), e4 < 0 && (e4 = 4294967295 + e4 + 1), this[t4] = e4 >>> 24, this[t4 + 1] = e4 >>> 16, this[t4 + 2] = e4 >>> 8, this[t4 + 3] = 255 & e4, t4 + 4;
    }, Buffer$1.prototype.writeBigInt64LE = defineBigIntMethod(function(e4, t4 = 0) {
      return wrtBigUInt64LE(this, e4, t4, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), Buffer$1.prototype.writeBigInt64BE = defineBigIntMethod(function(e4, t4 = 0) {
      return wrtBigUInt64BE(this, e4, t4, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), Buffer$1.prototype.writeFloatLE = function(e4, t4, r3) {
      return writeFloat(this, e4, t4, true, r3);
    }, Buffer$1.prototype.writeFloatBE = function(e4, t4, r3) {
      return writeFloat(this, e4, t4, false, r3);
    }, Buffer$1.prototype.writeDoubleLE = function(e4, t4, r3) {
      return writeDouble(this, e4, t4, true, r3);
    }, Buffer$1.prototype.writeDoubleBE = function(e4, t4, r3) {
      return writeDouble(this, e4, t4, false, r3);
    }, Buffer$1.prototype.copy = function(e4, t4, r3, s4) {
      if (!Buffer$1.isBuffer(e4)) throw new TypeError("argument should be a Buffer");
      if (r3 || (r3 = 0), s4 || 0 === s4 || (s4 = this.length), t4 >= e4.length && (t4 = e4.length), t4 || (t4 = 0), s4 > 0 && s4 < r3 && (s4 = r3), s4 === r3) return 0;
      if (0 === e4.length || 0 === this.length) return 0;
      if (t4 < 0) throw new RangeError("targetStart out of bounds");
      if (r3 < 0 || r3 >= this.length) throw new RangeError("Index out of range");
      if (s4 < 0) throw new RangeError("sourceEnd out of bounds");
      s4 > this.length && (s4 = this.length), e4.length - t4 < s4 - r3 && (s4 = e4.length - t4 + r3);
      const a3 = s4 - r3;
      return this === e4 && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t4, r3, s4) : Uint8Array.prototype.set.call(e4, this.subarray(r3, s4), t4), a3;
    }, Buffer$1.prototype.fill = function(e4, t4, r3, s4) {
      if ("string" == typeof e4) {
        if ("string" == typeof t4 ? (s4 = t4, t4 = 0, r3 = this.length) : "string" == typeof r3 && (s4 = r3, r3 = this.length), void 0 !== s4 && "string" != typeof s4) throw new TypeError("encoding must be a string");
        if ("string" == typeof s4 && !Buffer$1.isEncoding(s4)) throw new TypeError("Unknown encoding: " + s4);
        if (1 === e4.length) {
          const t5 = e4.charCodeAt(0);
          ("utf8" === s4 && t5 < 128 || "latin1" === s4) && (e4 = t5);
        }
      } else "number" == typeof e4 ? e4 &= 255 : "boolean" == typeof e4 && (e4 = Number(e4));
      if (t4 < 0 || this.length < t4 || this.length < r3) throw new RangeError("Out of range index");
      if (r3 <= t4) return this;
      let a3;
      if (t4 >>>= 0, r3 = void 0 === r3 ? this.length : r3 >>> 0, e4 || (e4 = 0), "number" == typeof e4) for (a3 = t4; a3 < r3; ++a3) this[a3] = e4;
      else {
        const c3 = Buffer$1.isBuffer(e4) ? e4 : Buffer$1.from(e4, s4), u3 = c3.length;
        if (0 === u3) throw new TypeError('The value "' + e4 + '" is invalid for argument "value"');
        for (a3 = 0; a3 < r3 - t4; ++a3) this[a3 + t4] = c3[a3 % u3];
      }
      return this;
    };
    f2 = {};
    __name(E$1, "E$1");
    __name(addNumericalSeparator, "addNumericalSeparator");
    __name(checkIntBI, "checkIntBI");
    __name(validateNumber, "validateNumber");
    __name(boundsError, "boundsError");
    E$1("ERR_BUFFER_OUT_OF_BOUNDS", function(e4) {
      return e4 ? `${e4} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    }, RangeError), E$1("ERR_INVALID_ARG_TYPE", function(e4, t4) {
      return `The "${e4}" argument must be of type number. Received type ${typeof t4}`;
    }, TypeError), E$1("ERR_OUT_OF_RANGE", function(e4, t4, r3) {
      let s4 = `The value of "${e4}" is out of range.`, a3 = r3;
      return Number.isInteger(r3) && Math.abs(r3) > 2 ** 32 ? a3 = addNumericalSeparator(String(r3)) : "bigint" == typeof r3 && (a3 = String(r3), (r3 > BigInt(2) ** BigInt(32) || r3 < -(BigInt(2) ** BigInt(32))) && (a3 = addNumericalSeparator(a3)), a3 += "n"), s4 += ` It must be ${t4}. Received ${a3}`, s4;
    }, RangeError);
    h = /[^\w+/-]/g;
    __name(utf8ToBytes, "utf8ToBytes");
    __name(base64ToBytes, "base64ToBytes");
    __name(blitBuffer, "blitBuffer");
    __name(isInstance, "isInstance");
    __name(numberIsNaN, "numberIsNaN");
    d2 = (function() {
      const e4 = "0123456789abcdef", t4 = Array.from({ length: 256 });
      for (let r3 = 0; r3 < 16; ++r3) {
        const s4 = 16 * r3;
        for (let a3 = 0; a3 < 16; ++a3) t4[s4 + a3] = e4[r3] + e4[a3];
      }
      return t4;
    })();
    __name(defineBigIntMethod, "defineBigIntMethod");
    __name(BufferBigIntNotDefined, "BufferBigIntNotDefined");
    g = globalThis.Buffer || Buffer$1;
    globalThis.btoa.bind(globalThis), globalThis.atob.bind(globalThis), "global" in globalThis || (globalThis.global = globalThis);
    Object.assign(/* @__PURE__ */ Object.create(null), { NONE: 0, DIRHANDLE: 1, DNSCHANNEL: 2, ELDHISTOGRAM: 3, FILEHANDLE: 4, FILEHANDLECLOSEREQ: 5, BLOBREADER: 6, FSEVENTWRAP: 7, FSREQCALLBACK: 8, FSREQPROMISE: 9, GETADDRINFOREQWRAP: 10, GETNAMEINFOREQWRAP: 11, HEAPSNAPSHOT: 12, HTTP2SESSION: 13, HTTP2STREAM: 14, HTTP2PING: 15, HTTP2SETTINGS: 16, HTTPINCOMINGMESSAGE: 17, HTTPCLIENTREQUEST: 18, JSSTREAM: 19, JSUDPWRAP: 20, MESSAGEPORT: 21, PIPECONNECTWRAP: 22, PIPESERVERWRAP: 23, PIPEWRAP: 24, PROCESSWRAP: 25, PROMISE: 26, QUERYWRAP: 27, QUIC_ENDPOINT: 28, QUIC_LOGSTREAM: 29, QUIC_PACKET: 30, QUIC_SESSION: 31, QUIC_STREAM: 32, QUIC_UDP: 33, SHUTDOWNWRAP: 34, SIGNALWRAP: 35, STATWATCHER: 36, STREAMPIPE: 37, TCPCONNECTWRAP: 38, TCPSERVERWRAP: 39, TCPWRAP: 40, TTYWRAP: 41, UDPSENDWRAP: 42, UDPWRAP: 43, SIGINTWATCHDOG: 44, WORKER: 45, WORKERHEAPSNAPSHOT: 46, WRITEWRAP: 47, ZLIB: 48, CHECKPRIMEREQUEST: 49, PBKDF2REQUEST: 50, KEYPAIRGENREQUEST: 51, KEYGENREQUEST: 52, KEYEXPORTREQUEST: 53, CIPHERREQUEST: 54, DERIVEBITSREQUEST: 55, HASHREQUEST: 56, RANDOMBYTESREQUEST: 57, RANDOMPRIMEREQUEST: 58, SCRYPTREQUEST: 59, SIGNREQUEST: 60, TLSWRAP: 61, VERIFYREQUEST: 62 });
    m3 = 100;
    _2 = globalThis.AsyncResource || class {
      __unenv__ = true;
      type;
      _asyncId;
      _triggerAsyncId;
      constructor(e4, t4 = 0) {
        this.type = e4, this._asyncId = -1 * m3++, this._triggerAsyncId = "number" == typeof t4 ? t4 : t4?.triggerAsyncId;
      }
      static bind(e4, t4, r3) {
        return new _2(t4 ?? "anonymous").bind(e4);
      }
      bind(e4, t4) {
        const binded = /* @__PURE__ */ __name((...r3) => this.runInAsyncScope(e4, t4, ...r3), "binded");
        return binded.asyncResource = this, binded;
      }
      runInAsyncScope(e4, t4, ...r3) {
        return e4.apply(t4, r3);
      }
      emitDestroy() {
        return this;
      }
      asyncId() {
        return this._asyncId;
      }
      triggerAsyncId() {
        return this._triggerAsyncId;
      }
    };
    E2 = 10;
    R2 = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
    }).prototype);
    inspect = /* @__PURE__ */ __name((e4, t4) => e4, "inspect");
    x2 = Error;
    B2 = Error;
    T2 = Error;
    I2 = Error;
    S2 = Error;
    C2 = /* @__PURE__ */ Symbol.for("nodejs.rejection");
    j3 = /* @__PURE__ */ Symbol.for("kCapture");
    P2 = /* @__PURE__ */ Symbol.for("events.errorMonitor");
    L2 = /* @__PURE__ */ Symbol.for("shapeMode");
    O2 = /* @__PURE__ */ Symbol.for("events.maxEventTargetListeners");
    N2 = /* @__PURE__ */ Symbol.for("kEnhanceStackBeforeInspector");
    $2 = /* @__PURE__ */ Symbol.for("nodejs.watermarkData");
    U2 = /* @__PURE__ */ Symbol.for("kEventEmitter");
    M2 = /* @__PURE__ */ Symbol.for("kAsyncResource");
    H2 = /* @__PURE__ */ Symbol.for("kFirstEventParam");
    W2 = /* @__PURE__ */ Symbol.for("kResistStopPropagation");
    q2 = /* @__PURE__ */ Symbol.for("events.maxEventTargetListenersWarned");
    _EventEmitter = class __EventEmitter {
      static {
        __name(this, "_EventEmitter");
      }
      _events = void 0;
      _eventsCount = 0;
      _maxListeners = E2;
      [j3] = false;
      [L2] = false;
      static captureRejectionSymbol = C2;
      static errorMonitor = P2;
      static kMaxEventTargetListeners = O2;
      static kMaxEventTargetListenersWarned = q2;
      static usingDomains = false;
      static get on() {
        return on$1;
      }
      static get once() {
        return once$1;
      }
      static get getEventListeners() {
        return getEventListeners;
      }
      static get getMaxListeners() {
        return getMaxListeners$1;
      }
      static get addAbortListener() {
        return addAbortListener;
      }
      static get EventEmitterAsyncResource() {
        return EventEmitterAsyncResource;
      }
      static get EventEmitter() {
        return __EventEmitter;
      }
      static setMaxListeners(e4 = E2, ...t4) {
        if (0 === t4.length) E2 = e4;
        else for (const r3 of t4) if (isEventTarget(r3)) r3[O2] = e4, r3[q2] = false;
        else {
          if ("function" != typeof r3.setMaxListeners) throw new T2("eventTargets", ["EventEmitter", "EventTarget"], r3);
          r3.setMaxListeners(e4);
        }
      }
      static listenerCount(e4, t4) {
        if ("function" == typeof e4.listenerCount) return e4.listenerCount(t4);
        __EventEmitter.prototype.listenerCount.call(e4, t4);
      }
      static init() {
        throw new Error("EventEmitter.init() is not implemented.");
      }
      static get captureRejections() {
        return this[j3];
      }
      static set captureRejections(e4) {
        this[j3] = e4;
      }
      static get defaultMaxListeners() {
        return E2;
      }
      static set defaultMaxListeners(e4) {
        E2 = e4;
      }
      constructor(e4) {
        void 0 === this._events || this._events === Object.getPrototypeOf(this)._events ? (this._events = { __proto__: null }, this._eventsCount = 0, this[L2] = false) : this[L2] = true, this._maxListeners = this._maxListeners || void 0, this[j3] = e4?.captureRejections ? Boolean(e4.captureRejections) : __EventEmitter.prototype[j3];
      }
      setMaxListeners(e4) {
        return this._maxListeners = e4, this;
      }
      getMaxListeners() {
        return _getMaxListeners(this);
      }
      emit(e4, ...t4) {
        let r3 = "error" === e4;
        const s4 = this._events;
        if (void 0 !== s4) r3 && void 0 !== s4[P2] && this.emit(P2, ...t4), r3 = r3 && void 0 === s4.error;
        else if (!r3) return false;
        if (r3) {
          let e5, r4;
          if (t4.length > 0 && (e5 = t4[0]), e5 instanceof Error) {
            try {
              const t5 = {};
              Error.captureStackTrace?.(t5, __EventEmitter.prototype.emit), Object.defineProperty(e5, N2, { __proto__: null, value: Function.prototype.bind(enhanceStackTrace, this, e5, t5), configurable: true });
            } catch {
            }
            throw e5;
          }
          try {
            r4 = inspect(e5);
          } catch {
            r4 = e5;
          }
          const s5 = new B2(r4);
          throw s5.context = e5, s5;
        }
        const a3 = s4[e4];
        if (void 0 === a3) return false;
        if ("function" == typeof a3) {
          const r4 = a3.apply(this, t4);
          null != r4 && addCatch(this, r4, e4, t4);
        } else {
          const r4 = a3.length, s5 = arrayClone(a3);
          for (let a4 = 0; a4 < r4; ++a4) {
            const r5 = s5[a4].apply(this, t4);
            null != r5 && addCatch(this, r5, e4, t4);
          }
        }
        return true;
      }
      addListener(e4, t4) {
        return _addListener(this, e4, t4, false), this;
      }
      on(e4, t4) {
        return this.addListener(e4, t4);
      }
      prependListener(e4, t4) {
        return _addListener(this, e4, t4, true), this;
      }
      once(e4, t4) {
        return this.on(e4, _onceWrap(this, e4, t4)), this;
      }
      prependOnceListener(e4, t4) {
        return this.prependListener(e4, _onceWrap(this, e4, t4)), this;
      }
      removeListener(e4, t4) {
        const r3 = this._events;
        if (void 0 === r3) return this;
        const s4 = r3[e4];
        if (void 0 === s4) return this;
        if (s4 === t4 || s4.listener === t4) this._eventsCount -= 1, this[L2] ? r3[e4] = void 0 : 0 === this._eventsCount ? this._events = { __proto__: null } : (delete r3[e4], r3.removeListener && this.emit("removeListener", e4, s4.listener || t4));
        else if ("function" != typeof s4) {
          let a3 = -1;
          for (let e5 = s4.length - 1; e5 >= 0; e5--) if (s4[e5] === t4 || s4[e5].listener === t4) {
            a3 = e5;
            break;
          }
          if (a3 < 0) return this;
          0 === a3 ? s4.shift() : (function(e5, t5) {
            for (; t5 + 1 < e5.length; t5++) e5[t5] = e5[t5 + 1];
            e5.pop();
          })(s4, a3), 1 === s4.length && (r3[e4] = s4[0]), void 0 !== r3.removeListener && this.emit("removeListener", e4, t4);
        }
        return this;
      }
      off(e4, t4) {
        return this.removeListener(e4, t4);
      }
      removeAllListeners(e4) {
        const t4 = this._events;
        if (void 0 === t4) return this;
        if (void 0 === t4.removeListener) return 0 === arguments.length ? (this._events = { __proto__: null }, this._eventsCount = 0) : void 0 !== t4[e4] && (0 === --this._eventsCount ? this._events = { __proto__: null } : delete t4[e4]), this[L2] = false, this;
        if (0 === arguments.length) {
          for (const e5 of Reflect.ownKeys(t4)) "removeListener" !== e5 && this.removeAllListeners(e5);
          return this.removeAllListeners("removeListener"), this._events = { __proto__: null }, this._eventsCount = 0, this[L2] = false, this;
        }
        const r3 = t4[e4];
        if ("function" == typeof r3) this.removeListener(e4, r3);
        else if (void 0 !== r3) for (let t5 = r3.length - 1; t5 >= 0; t5--) this.removeListener(e4, r3[t5]);
        return this;
      }
      listeners(e4) {
        return _listeners(this, e4, true);
      }
      rawListeners(e4) {
        return _listeners(this, e4, false);
      }
      eventNames() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
      }
      listenerCount(e4, t4) {
        const r3 = this._events;
        if (void 0 !== r3) {
          const s4 = r3[e4];
          if ("function" == typeof s4) return null != t4 ? t4 === s4 || t4 === s4.listener ? 1 : 0 : 1;
          if (void 0 !== s4) {
            if (null != t4) {
              let e5 = 0;
              for (let r4 = 0, a3 = s4.length; r4 < a3; r4++) s4[r4] !== t4 && s4[r4].listener !== t4 || e5++;
              return e5;
            }
            return s4.length;
          }
        }
        return 0;
      }
    };
    EventEmitterAsyncResource = class extends _EventEmitter {
      static {
        __name(this, "EventEmitterAsyncResource");
      }
      constructor(e4) {
        let t4;
        "string" == typeof e4 ? (t4 = e4, e4 = void 0) : t4 = e4?.name || new.target.name, super(e4), this[M2] = new EventEmitterReferencingAsyncResource(this, t4, e4);
      }
      emit(e4, ...t4) {
        if (void 0 === this[M2]) throw new x2("EventEmitterAsyncResource");
        const { asyncResource: r3 } = this;
        return Array.prototype.unshift(t4, super.emit, this, e4), Reflect.apply(r3.runInAsyncScope, r3, t4);
      }
      emitDestroy() {
        if (void 0 === this[M2]) throw new x2("EventEmitterAsyncResource");
        this.asyncResource.emitDestroy();
      }
      get asyncId() {
        if (void 0 === this[M2]) throw new x2("EventEmitterAsyncResource");
        return this.asyncResource.asyncId();
      }
      get triggerAsyncId() {
        if (void 0 === this[M2]) throw new x2("EventEmitterAsyncResource");
        return this.asyncResource.triggerAsyncId();
      }
      get asyncResource() {
        if (void 0 === this[M2]) throw new x2("EventEmitterAsyncResource");
        return this[M2];
      }
    };
    EventEmitterReferencingAsyncResource = class extends _2 {
      static {
        __name(this, "EventEmitterReferencingAsyncResource");
      }
      constructor(e4, t4, r3) {
        super(t4, r3), this[U2] = e4;
      }
      get eventEmitter() {
        if (void 0 === this[U2]) throw new x2("EventEmitterReferencingAsyncResource");
        return this[U2];
      }
    };
    on$1 = /* @__PURE__ */ __name(function(e4, t4, r3 = {}) {
      const s4 = r3.signal;
      if (s4?.aborted) throw new I2(void 0, { cause: s4?.reason });
      const a3 = r3.highWaterMark ?? r3.highWatermark ?? Number.MAX_SAFE_INTEGER, c3 = r3.lowWaterMark ?? r3.lowWatermark ?? 1, u3 = new FixedQueue(), f3 = new FixedQueue();
      let h2 = false, d3 = null, g2 = false, m4 = 0;
      const _3 = Object.setPrototypeOf({ next() {
        if (m4) {
          const t5 = u3.shift();
          return m4--, h2 && m4 < c3 && (e4.resume?.(), h2 = false), Promise.resolve(createIterResult(t5, false));
        }
        if (d3) {
          const e5 = Promise.reject(d3);
          return d3 = null, e5;
        }
        return g2 ? closeHandler() : new Promise(function(e5, t5) {
          f3.push({ resolve: e5, reject: t5 });
        });
      }, return: /* @__PURE__ */ __name(() => closeHandler(), "return"), throw(e5) {
        if (!(e5 && e5 instanceof Error)) throw new T2("EventEmitter.AsyncIterator", "Error", e5);
        errorHandler(e5);
      }, [Symbol.asyncIterator]() {
        return this;
      }, [$2]: { get size() {
        return m4;
      }, get low() {
        return c3;
      }, get high() {
        return a3;
      }, get isPaused() {
        return h2;
      } } }, R2), { addEventListener: E3, removeAll: x3 } = /* @__PURE__ */ (function() {
        const e5 = [];
        return { addEventListener(t5, r4, s5, a4) {
          eventTargetAgnosticAddListener(t5, r4, s5, a4), Array.prototype.push(e5, [t5, r4, s5, a4]);
        }, removeAll() {
          for (; e5.length > 0; ) Reflect.apply(eventTargetAgnosticRemoveListener, void 0, e5.pop());
        } };
      })();
      E3(e4, t4, r3[H2] ? eventHandler : function(...e5) {
        return eventHandler(e5);
      }), "error" !== t4 && "function" == typeof e4.on && E3(e4, "error", errorHandler);
      const B3 = r3?.close;
      if (B3?.length) for (const t5 of B3) E3(e4, t5, closeHandler);
      const S3 = s4 ? addAbortListener(s4, function() {
        errorHandler(new I2(void 0, { cause: s4?.reason }));
      }) : null;
      return _3;
      function eventHandler(t5) {
        f3.isEmpty() ? (m4++, !h2 && m4 > a3 && (h2 = true, e4.pause?.()), u3.push(t5)) : f3.shift().resolve(createIterResult(t5, false));
      }
      __name(eventHandler, "eventHandler");
      function errorHandler(e5) {
        f3.isEmpty() ? d3 = e5 : f3.shift().reject(e5), closeHandler();
      }
      __name(errorHandler, "errorHandler");
      function closeHandler() {
        S3?.[Symbol.dispose](), x3(), g2 = true;
        const e5 = createIterResult(void 0, true);
        for (; !f3.isEmpty(); ) f3.shift().resolve(e5);
        return Promise.resolve(e5);
      }
      __name(closeHandler, "closeHandler");
    }, "on$1");
    once$1 = /* @__PURE__ */ __name(async function(e4, t4, r3 = {}) {
      const s4 = r3?.signal;
      if (s4?.aborted) throw new I2(void 0, { cause: s4?.reason });
      return new Promise((r4, a3) => {
        const errorListener = /* @__PURE__ */ __name((r5) => {
          "function" == typeof e4.removeListener && e4.removeListener(t4, resolver), null != s4 && eventTargetAgnosticRemoveListener(s4, "abort", abortListener), a3(r5);
        }, "errorListener"), resolver = /* @__PURE__ */ __name((...t5) => {
          "function" == typeof e4.removeListener && e4.removeListener("error", errorListener), null != s4 && eventTargetAgnosticRemoveListener(s4, "abort", abortListener), r4(t5);
        }, "resolver");
        function abortListener() {
          eventTargetAgnosticRemoveListener(e4, t4, resolver), eventTargetAgnosticRemoveListener(e4, "error", errorListener), a3(new I2(void 0, { cause: s4?.reason }));
        }
        __name(abortListener, "abortListener");
        eventTargetAgnosticAddListener(e4, t4, resolver, { __proto__: null, once: true, [W2]: true }), "error" !== t4 && "function" == typeof e4.once && e4.once("error", errorListener), null != s4 && eventTargetAgnosticAddListener(s4, "abort", abortListener, { __proto__: null, once: true, [W2]: true });
      });
    }, "once$1");
    addAbortListener = /* @__PURE__ */ __name(function(e4, t4) {
      if (void 0 === e4) throw new T2("signal", "AbortSignal", e4);
      let r3;
      return e4.aborted ? queueMicrotask(() => t4()) : (e4.addEventListener("abort", t4, { __proto__: null, once: true, [W2]: true }), r3 = /* @__PURE__ */ __name(() => {
        e4.removeEventListener("abort", t4);
      }, "r")), { __proto__: null, [Symbol.dispose]() {
        r3?.();
      } };
    }, "addAbortListener");
    getEventListeners = /* @__PURE__ */ __name(function(e4, t4) {
      if ("function" == typeof e4.listeners) return e4.listeners(t4);
      if (isEventTarget(e4)) {
        const r3 = e4[kEvents].get(t4), s4 = [];
        let a3 = r3?.next;
        for (; void 0 !== a3?.listener; ) {
          const e5 = a3.listener?.deref ? a3.listener.deref() : a3.listener;
          s4.push(e5), a3 = a3.next;
        }
        return s4;
      }
      throw new T2("emitter", ["EventEmitter", "EventTarget"], e4);
    }, "getEventListeners");
    getMaxListeners$1 = /* @__PURE__ */ __name(function(e4) {
      if ("function" == typeof e4?.getMaxListeners) return _getMaxListeners(e4);
      if (e4?.[O2]) return e4[O2];
      throw new T2("emitter", ["EventEmitter", "EventTarget"], e4);
    }, "getMaxListeners$1");
    D2 = 2047;
    FixedCircularBuffer = class {
      static {
        __name(this, "FixedCircularBuffer");
      }
      bottom;
      top;
      list;
      next;
      constructor() {
        this.bottom = 0, this.top = 0, this.list = new Array(2048), this.next = null;
      }
      isEmpty() {
        return this.top === this.bottom;
      }
      isFull() {
        return (this.top + 1 & D2) === this.bottom;
      }
      push(e4) {
        this.list[this.top] = e4, this.top = this.top + 1 & D2;
      }
      shift() {
        const e4 = this.list[this.bottom];
        return void 0 === e4 ? null : (this.list[this.bottom] = void 0, this.bottom = this.bottom + 1 & D2, e4);
      }
    };
    FixedQueue = class {
      static {
        __name(this, "FixedQueue");
      }
      head;
      tail;
      constructor() {
        this.head = this.tail = new FixedCircularBuffer();
      }
      isEmpty() {
        return this.head.isEmpty();
      }
      push(e4) {
        this.head.isFull() && (this.head = this.head.next = new FixedCircularBuffer()), this.head.push(e4);
      }
      shift() {
        const e4 = this.tail, t4 = e4.shift();
        return e4.isEmpty() && null !== e4.next && (this.tail = e4.next, e4.next = null), t4;
      }
    };
    __name(isEventTarget, "isEventTarget");
    __name(addCatch, "addCatch");
    __name(emitUnhandledRejectionOrErr, "emitUnhandledRejectionOrErr");
    __name(_getMaxListeners, "_getMaxListeners");
    __name(enhanceStackTrace, "enhanceStackTrace");
    __name(_addListener, "_addListener");
    __name(onceWrapper, "onceWrapper");
    __name(_onceWrap, "_onceWrap");
    __name(_listeners, "_listeners");
    __name(arrayClone, "arrayClone");
    __name(createIterResult, "createIterResult");
    __name(eventTargetAgnosticRemoveListener, "eventTargetAgnosticRemoveListener");
    __name(eventTargetAgnosticAddListener, "eventTargetAgnosticAddListener");
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(e4) {
        this.fd = e4;
      }
      setRawMode(e4) {
        return this.isRaw = e4, this;
      }
    };
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(e4) {
        this.fd = e4;
      }
      clearLine(e4, t4) {
        return t4 && t4(), false;
      }
      clearScreenDown(e4) {
        return e4 && e4(), false;
      }
      cursorTo(e4, t4, r3) {
        return r3 && "function" == typeof r3 && r3(), false;
      }
      moveCursor(e4, t4, r3) {
        return r3 && r3(), false;
      }
      getColorDepth(e4) {
        return 1;
      }
      hasColors(e4, t4) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(e4, t4, r3) {
        e4 instanceof Uint8Array && (e4 = new TextDecoder().decode(e4));
        try {
          console.log(e4);
        } catch {
        }
        return r3 && "function" == typeof r3 && r3(), false;
      }
    };
    z2 = "22.14.0";
    Process = class _Process extends _EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(e4) {
        super(), this.env = e4.env, this.hrtime = e4.hrtime, this.nextTick = e4.nextTick;
        for (const e5 of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(_EventEmitter.prototype)]) {
          const t4 = this[e5];
          "function" == typeof t4 && (this[e5] = t4.bind(this));
        }
      }
      emitWarning(e4, t4, r3) {
        console.warn(`${r3 ? `[${r3}] ` : ""}${t4 ? `${t4}: ` : ""}${e4}`);
      }
      emit(...e4) {
        return super.emit(...e4);
      }
      listeners(e4) {
        return super.listeners(e4);
      }
      #e;
      #t;
      #r;
      get stdin() {
        return this.#e ??= new ReadStream(0);
      }
      get stdout() {
        return this.#t ??= new WriteStream(1);
      }
      get stderr() {
        return this.#r ??= new WriteStream(2);
      }
      #n = "/";
      chdir(e4) {
        this.#n = e4;
      }
      cwd() {
        return this.#n;
      }
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${z2}`;
      }
      get versions() {
        return { node: z2 };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      ref() {
      }
      unref() {
      }
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      permission = { has: notImplemented("process.permission.has") };
      report = { directory: "", filename: "", signal: "SIGUSR2", compact: false, reportOnFatalError: false, reportOnSignal: false, reportOnUncaughtException: false, getReport: notImplemented("process.report.getReport"), writeReport: notImplemented("process.report.writeReport") };
      finalization = { register: notImplemented("process.finalization.register"), unregister: notImplemented("process.finalization.unregister"), registerBeforeExit: notImplemented("process.finalization.registerBeforeExit") };
      memoryUsage = Object.assign(() => ({ arrayBuffers: 0, rss: 0, external: 0, heapTotal: 0, heapUsed: 0 }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      mainModule = void 0;
      domain = void 0;
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
    F2 = /* @__PURE__ */ Object.create(null);
    K2 = globalThis.process;
    _getEnv = /* @__PURE__ */ __name((e4) => globalThis.__env__ || K2?.env || (e4 ? F2 : globalThis), "_getEnv");
    Q2 = new Proxy(F2, { get: /* @__PURE__ */ __name((e4, t4) => _getEnv()[t4] ?? F2[t4], "get"), has: /* @__PURE__ */ __name((e4, t4) => t4 in _getEnv() || t4 in F2, "has"), set: /* @__PURE__ */ __name((e4, t4, r3) => (_getEnv(true)[t4] = r3, true), "set"), deleteProperty: /* @__PURE__ */ __name((e4, t4) => (delete _getEnv(true)[t4], true), "deleteProperty"), ownKeys() {
      const e4 = _getEnv();
      return Object.keys(e4);
    }, getOwnPropertyDescriptor(e4, t4) {
      const r3 = _getEnv();
      if (t4 in r3) return { value: r3[t4], writable: true, enumerable: true, configurable: true };
    } });
    Z2 = Object.assign(function(e4) {
      const t4 = Date.now(), r3 = Math.trunc(t4 / 1e3), s4 = t4 % 1e3 * 1e6;
      if (e4) {
        let t5 = r3 - e4[0], a3 = s4 - e4[0];
        return a3 < 0 && (t5 -= 1, a3 = 1e9 + a3), [t5, a3];
      }
      return [r3, s4];
    }, { bigint: /* @__PURE__ */ __name(function() {
      return BigInt(1e6 * Date.now());
    }, "bigint") });
    Y2 = globalThis.queueMicrotask ? (e4, ...t4) => {
      globalThis.queueMicrotask(e4.bind(void 0, ...t4));
    } : createNextTickWithTimeout();
    __name(createNextTickWithTimeout, "createNextTickWithTimeout");
    G = new Process({ env: Q2, hrtime: Z2, nextTick: Y2 });
    ({ abort: V2, addListener: J2, allowedNodeEnvironmentFlags: X2, hasUncaughtExceptionCaptureCallback: ee2, setUncaughtExceptionCaptureCallback: te2, loadEnvFile: re2, sourceMapsEnabled: ne2, arch: oe, argv: se, argv0: ie, chdir: ae, config: ce, connected: ue, constrainedMemory: fe, availableMemory: le, cpuUsage: he, cwd: de, debugPort: pe, dlopen: ge, disconnect: ye, emit: me, emitWarning: we, env: be, eventNames: ve, execArgv: _e, execPath: Ee, exit: Re, finalization: xe, features: Be, getBuiltinModule: Ae, getActiveResourcesInfo: Te, getMaxListeners: Ie, hrtime: Se, kill: ke, listeners: Ce, listenerCount: je, memoryUsage: Pe, nextTick: Le, on: Oe, off: Ne, once: $e, pid: Ue, platform: Me, ppid: He, prependListener: We, prependOnceListener: qe, rawListeners: De, release: ze, removeAllListeners: Fe, removeListener: Ke, report: Qe, resourceUsage: Ze, setMaxListeners: Ye, setSourceMapsEnabled: Ge, stderr: Ve, stdin: Je, stdout: Xe, title: et, umask: tt, uptime: rt, version: nt, versions: ot, domain: st, initgroups: it, moduleLoadList: at, reallyExit: ct, openStdin: ut, assert: ft, binding: lt, send: ht, exitCode: dt, channel: pt, getegid: gt, geteuid: yt, getgid: mt, getgroups: wt, getuid: bt, setegid: vt, seteuid: _t, setgid: Et, setgroups: Rt, setuid: xt, permission: Bt, mainModule: At, ref: Tt, unref: It, _events: St, _eventsCount: kt, _exiting: Ct, _maxListeners: jt, _debugEnd: Pt, _debugProcess: Lt, _fatalException: Ot, _getActiveHandles: Nt, _getActiveRequests: $t, _kill: Ut, _preload_modules: Mt, _rawDebug: Ht, _startProfilerIdleNotifier: Wt, _stopProfilerIdleNotifier: qt, _tickCallback: Dt, _disconnect: zt, _handleQueue: Ft, _pendingMessage: Kt, _channel: Qt, _send: Zt, _linkedBinding: Yt } = G);
    Gt = globalThis.process;
    globalThis.process = Gt ? new Proxy(Gt, { get: /* @__PURE__ */ __name((e4, t4, r3) => Reflect.has(e4, t4) ? Reflect.get(e4, t4, r3) : Reflect.get(G, t4, r3), "get") }) : G, globalThis.Buffer || (globalThis.Buffer = g);
    Object.assign(() => {
    }, { __unenv__: true });
    Timeout = class {
      static {
        __name(this, "Timeout");
      }
      constructor(e4, t4) {
        "function" == typeof e4 && e4(...t4);
      }
      close() {
        throw createNotImplementedError("node.timers.timeout.close");
      }
      _onTimeout(...e4) {
        throw createNotImplementedError("node.timers.timeout._onTimeout");
      }
      ref() {
        return this;
      }
      unref() {
        return this;
      }
      hasRef() {
        return false;
      }
      refresh() {
        return this;
      }
      [Symbol.dispose]() {
      }
      [Symbol.toPrimitive]() {
        return 0;
      }
    };
    __name(setTimeoutFallback, "setTimeoutFallback");
    setTimeoutFallback.__promisify__ = function(e4, t4, r3) {
      return new Promise((e5) => {
        e5(t4);
      });
    };
    Immediate = class {
      static {
        __name(this, "Immediate");
      }
      _onImmediate;
      _timeout;
      constructor(e4, t4) {
        this._onImmediate = e4, "setTimeout" in globalThis ? this._timeout = setTimeout(e4, 0, ...t4) : e4(...t4);
      }
      ref() {
        return this._timeout?.ref(), this;
      }
      unref() {
        return this._timeout?.unref(), this;
      }
      hasRef() {
        return this._timeout?.hasRef() ?? false;
      }
      [Symbol.dispose]() {
        "clearTimeout" in globalThis && clearTimeout(this._timeout);
      }
    };
    __name(setImmediateFallback, "setImmediateFallback");
    __name(setIntervalFallback, "setIntervalFallback");
    setImmediateFallback.__promisify__ = function(e4) {
      return new Promise((t4) => {
        t4(e4);
      });
    }, setIntervalFallback.__promisify__ = async function* (e4, t4) {
      yield t4;
    };
    Vt = globalThis.clearImmediate?.bind(globalThis) || function(e4) {
      e4?.[Symbol.dispose]();
    };
    globalThis.clearInterval?.bind(globalThis), globalThis.clearTimeout?.bind(globalThis);
    Jt = globalThis.setImmediate?.bind(globalThis) || setImmediateFallback;
    globalThis.setTimeout?.bind(globalThis), globalThis.setInterval?.bind(globalThis), globalThis.setImmediate || (globalThis.setImmediate = Jt), globalThis.clearImmediate || (globalThis.clearImmediate = Vt);
    Xt = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
    er = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    tr = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
    __name(jsonParseTransform, "jsonParseTransform");
    __name(destr, "destr");
    rr = /#/g;
    nr = /&/g;
    or = /\//g;
    sr = /=/g;
    ir = /\?/g;
    ar = /\+/g;
    cr = /%5e/gi;
    ur = /%60/gi;
    fr = /%7c/gi;
    lr = /%20/gi;
    hr = /%2f/gi;
    dr = /%252f/gi;
    __name(encode, "encode");
    __name(encodeQueryValue, "encodeQueryValue");
    __name(encodeQueryKey, "encodeQueryKey");
    __name(encodePath, "encodePath");
    __name(decode, "decode");
    __name(decodePath, "decodePath");
    __name(decodeQueryKey, "decodeQueryKey");
    __name(decodeQueryValue, "decodeQueryValue");
    __name(parseQuery, "parseQuery");
    __name(stringifyQuery, "stringifyQuery");
    pr = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
    gr = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
    yr = /^([/\\]\s*){2,}[^/\\]/;
    mr = /^\.?\//;
    __name(hasProtocol, "hasProtocol");
    __name(withoutTrailingSlash, "withoutTrailingSlash");
    __name(withTrailingSlash, "withTrailingSlash");
    __name(withLeadingSlash, "withLeadingSlash");
    __name(withoutBase, "withoutBase");
    __name(withQuery, "withQuery");
    __name(getQuery$1, "getQuery$1");
    __name(isEmptyURL, "isEmptyURL");
    __name(joinURL, "joinURL");
    __name(joinRelativeURL, "joinRelativeURL");
    wr = /* @__PURE__ */ Symbol.for("ufo:protocolRelative");
    __name(parseURL, "parseURL");
    __name(parsePath, "parsePath");
    br = 0;
    vr = 1;
    _r = 2;
    __name(createRouter$1, "createRouter$1");
    __name(insert, "insert");
    __name(createRadixNode, "createRadixNode");
    __name(getNodeType, "getNodeType");
    __name(toRouteMatcher, "toRouteMatcher");
    __name(_matchRoutes, "_matchRoutes");
    __name(_sortRoutesMap, "_sortRoutesMap");
    __name(_routerNodeToTable, "_routerNodeToTable");
    __name(isPlainObject, "isPlainObject");
    __name(_defu, "_defu");
    __name(createDefu, "createDefu");
    Er = createDefu();
    Rr = createDefu((e4, t4, r3) => {
      if (void 0 !== e4[t4] && "function" == typeof r3) return e4[t4] = r3(e4[t4]), true;
    });
    __name(o3, "o");
    i2 = class _i extends _EventEmitter {
      static {
        __name(this, "i");
      }
      __unenv__ = {};
      readableEncoding = null;
      readableEnded = true;
      readableFlowing = false;
      readableHighWaterMark = 0;
      readableLength = 0;
      readableObjectMode = false;
      readableAborted = false;
      readableDidRead = false;
      closed = false;
      errored = null;
      readable = false;
      destroyed = false;
      static from(e4, t4) {
        return new _i(t4);
      }
      constructor(e4) {
        super();
      }
      _read(e4) {
      }
      read(e4) {
      }
      setEncoding(e4) {
        return this;
      }
      pause() {
        return this;
      }
      resume() {
        return this;
      }
      isPaused() {
        return true;
      }
      unpipe(e4) {
        return this;
      }
      unshift(e4, t4) {
      }
      wrap(e4) {
        return this;
      }
      push(e4, t4) {
        return false;
      }
      _destroy(e4, t4) {
        this.removeAllListeners();
      }
      destroy(e4) {
        return this.destroyed = true, this._destroy(e4), this;
      }
      pipe(e4, t4) {
        return {};
      }
      compose(e4, t4) {
        throw new Error("Method not implemented.");
      }
      [Symbol.asyncDispose]() {
        return this.destroy(), Promise.resolve();
      }
      async *[Symbol.asyncIterator]() {
        throw o3("Readable.asyncIterator");
      }
      iterator(e4) {
        throw o3("Readable.iterator");
      }
      map(e4, t4) {
        throw o3("Readable.map");
      }
      filter(e4, t4) {
        throw o3("Readable.filter");
      }
      forEach(e4, t4) {
        throw o3("Readable.forEach");
      }
      reduce(e4, t4, r3) {
        throw o3("Readable.reduce");
      }
      find(e4, t4) {
        throw o3("Readable.find");
      }
      findIndex(e4, t4) {
        throw o3("Readable.findIndex");
      }
      some(e4, t4) {
        throw o3("Readable.some");
      }
      toArray(e4) {
        throw o3("Readable.toArray");
      }
      every(e4, t4) {
        throw o3("Readable.every");
      }
      flatMap(e4, t4) {
        throw o3("Readable.flatMap");
      }
      drop(e4, t4) {
        throw o3("Readable.drop");
      }
      take(e4, t4) {
        throw o3("Readable.take");
      }
      asIndexedPairs(e4) {
        throw o3("Readable.asIndexedPairs");
      }
    };
    xr = class extends _EventEmitter {
      static {
        __name(this, "xr");
      }
      __unenv__ = {};
      writable = true;
      writableEnded = false;
      writableFinished = false;
      writableHighWaterMark = 0;
      writableLength = 0;
      writableObjectMode = false;
      writableCorked = 0;
      closed = false;
      errored = null;
      writableNeedDrain = false;
      writableAborted = false;
      destroyed = false;
      _data;
      _encoding = "utf8";
      constructor(e4) {
        super();
      }
      pipe(e4, t4) {
        return {};
      }
      _write(e4, t4, r3) {
        if (this.writableEnded) r3 && r3();
        else {
          if (void 0 === this._data) this._data = e4;
          else {
            const r4 = "string" == typeof this._data ? g.from(this._data, this._encoding || t4 || "utf8") : this._data, s4 = "string" == typeof e4 ? g.from(e4, t4 || this._encoding || "utf8") : e4;
            this._data = g.concat([r4, s4]);
          }
          this._encoding = t4, r3 && r3();
        }
      }
      _writev(e4, t4) {
      }
      _destroy(e4, t4) {
      }
      _final(e4) {
      }
      write(e4, t4, r3) {
        const s4 = "string" == typeof t4 ? this._encoding : "utf8", a3 = "function" == typeof t4 ? t4 : "function" == typeof r3 ? r3 : void 0;
        return this._write(e4, s4, a3), true;
      }
      setDefaultEncoding(e4) {
        return this;
      }
      end(e4, t4, r3) {
        const s4 = "function" == typeof e4 ? e4 : "function" == typeof t4 ? t4 : "function" == typeof r3 ? r3 : void 0;
        if (this.writableEnded) return s4 && s4(), this;
        const a3 = e4 === s4 ? void 0 : e4;
        if (a3) {
          const e5 = t4 === s4 ? void 0 : t4;
          this.write(a3, e5, s4);
        }
        return this.writableEnded = true, this.writableFinished = true, this.emit("close"), this.emit("finish"), this;
      }
      cork() {
      }
      uncork() {
      }
      destroy(e4) {
        return this.destroyed = true, delete this._data, this.removeAllListeners(), this;
      }
      compose(e4, t4) {
        throw new Error("Method not implemented.");
      }
      [Symbol.asyncDispose]() {
        return Promise.resolve();
      }
    };
    Br = class {
      static {
        __name(this, "Br");
      }
      allowHalfOpen = true;
      _destroy;
      constructor(e4 = new i2(), t4 = new xr()) {
        Object.assign(this, e4), Object.assign(this, t4), this._destroy = /* @__PURE__ */ (function(...e5) {
          return function(...t5) {
            for (const r3 of e5) r3(...t5);
          };
        })(e4._destroy, t4._destroy);
      }
    };
    Ar = (Object.assign(Br.prototype, i2.prototype), Object.assign(Br.prototype, xr.prototype), Br);
    A2 = class extends Ar {
      static {
        __name(this, "A");
      }
      __unenv__ = {};
      bufferSize = 0;
      bytesRead = 0;
      bytesWritten = 0;
      connecting = false;
      destroyed = false;
      pending = false;
      localAddress = "";
      localPort = 0;
      remoteAddress = "";
      remoteFamily = "";
      remotePort = 0;
      autoSelectFamilyAttemptedAddresses = [];
      readyState = "readOnly";
      constructor(e4) {
        super();
      }
      write(e4, t4, r3) {
        return false;
      }
      connect(e4, t4, r3) {
        return this;
      }
      end(e4, t4, r3) {
        return this;
      }
      setEncoding(e4) {
        return this;
      }
      pause() {
        return this;
      }
      resume() {
        return this;
      }
      setTimeout(e4, t4) {
        return this;
      }
      setNoDelay(e4) {
        return this;
      }
      setKeepAlive(e4, t4) {
        return this;
      }
      address() {
        return {};
      }
      unref() {
        return this;
      }
      ref() {
        return this;
      }
      destroySoon() {
        this.destroy();
      }
      resetAndDestroy() {
        const e4 = new Error("ERR_SOCKET_CLOSED");
        return e4.code = "ERR_SOCKET_CLOSED", this.destroy(e4), this;
      }
    };
    y2 = class extends i2 {
      static {
        __name(this, "y");
      }
      aborted = false;
      httpVersion = "1.1";
      httpVersionMajor = 1;
      httpVersionMinor = 1;
      complete = true;
      connection;
      socket;
      headers = {};
      trailers = {};
      method = "GET";
      url = "/";
      statusCode = 200;
      statusMessage = "";
      closed = false;
      errored = null;
      readable = false;
      constructor(e4) {
        super(), this.socket = this.connection = e4 || new A2();
      }
      get rawHeaders() {
        const e4 = this.headers, t4 = [];
        for (const r3 in e4) if (Array.isArray(e4[r3])) for (const s4 of e4[r3]) t4.push(r3, s4);
        else t4.push(r3, e4[r3]);
        return t4;
      }
      get rawTrailers() {
        return [];
      }
      setTimeout(e4, t4) {
        return this;
      }
      get headersDistinct() {
        return p2(this.headers);
      }
      get trailersDistinct() {
        return p2(this.trailers);
      }
    };
    __name(p2, "p");
    w2 = class extends xr {
      static {
        __name(this, "w");
      }
      statusCode = 200;
      statusMessage = "";
      upgrading = false;
      chunkedEncoding = false;
      shouldKeepAlive = false;
      useChunkedEncodingByDefault = false;
      sendDate = false;
      finished = false;
      headersSent = false;
      strictContentLength = false;
      connection = null;
      socket = null;
      req;
      _headers = {};
      constructor(e4) {
        super(), this.req = e4;
      }
      assignSocket(e4) {
        e4._httpMessage = this, this.socket = e4, this.connection = e4, this.emit("socket", e4), this._flush();
      }
      _flush() {
        this.flushHeaders();
      }
      detachSocket(e4) {
      }
      writeContinue(e4) {
      }
      writeHead(e4, t4, r3) {
        e4 && (this.statusCode = e4), "string" == typeof t4 && (this.statusMessage = t4, t4 = void 0);
        const s4 = r3 || t4;
        if (s4 && !Array.isArray(s4)) for (const e5 in s4) this.setHeader(e5, s4[e5]);
        return this.headersSent = true, this;
      }
      writeProcessing() {
      }
      setTimeout(e4, t4) {
        return this;
      }
      appendHeader(e4, t4) {
        e4 = e4.toLowerCase();
        const r3 = this._headers[e4], s4 = [...Array.isArray(r3) ? r3 : [r3], ...Array.isArray(t4) ? t4 : [t4]].filter(Boolean);
        return this._headers[e4] = s4.length > 1 ? s4 : s4[0], this;
      }
      setHeader(e4, t4) {
        return this._headers[e4.toLowerCase()] = t4, this;
      }
      setHeaders(e4) {
        for (const [t4, r3] of Object.entries(e4)) this.setHeader(t4, r3);
        return this;
      }
      getHeader(e4) {
        return this._headers[e4.toLowerCase()];
      }
      getHeaders() {
        return this._headers;
      }
      getHeaderNames() {
        return Object.keys(this._headers);
      }
      hasHeader(e4) {
        return e4.toLowerCase() in this._headers;
      }
      removeHeader(e4) {
        delete this._headers[e4.toLowerCase()];
      }
      addTrailers(e4) {
      }
      flushHeaders() {
      }
      writeEarlyHints(e4, t4) {
        "function" == typeof t4 && t4();
      }
    };
    Tr = (() => {
      const n2 = /* @__PURE__ */ __name(function() {
      }, "n");
      return n2.prototype = /* @__PURE__ */ Object.create(null), n2;
    })();
    __name(v2, "v");
    Ir = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    __name(b2, "b");
    __name(hasProp, "hasProp");
    H3Error = class extends Error {
      static {
        __name(this, "H3Error");
      }
      static __h3_error__ = true;
      statusCode = 500;
      fatal = false;
      unhandled = false;
      statusMessage;
      data;
      cause;
      constructor(e4, t4 = {}) {
        super(e4, t4), t4.cause && !this.cause && (this.cause = t4.cause);
      }
      toJSON() {
        const e4 = { message: this.message, statusCode: sanitizeStatusCode(this.statusCode, 500) };
        return this.statusMessage && (e4.statusMessage = sanitizeStatusMessage(this.statusMessage)), void 0 !== this.data && (e4.data = this.data), e4;
      }
    };
    __name(createError, "createError");
    __name(isError, "isError");
    __name(getQuery, "getQuery");
    __name(getRequestHeaders, "getRequestHeaders");
    __name(getRequestURL, "getRequestURL");
    Sr = /* @__PURE__ */ Symbol.for("h3RawBody");
    kr = ["PATCH", "POST", "PUT", "DELETE"];
    __name(readRawBody, "readRawBody");
    __name(handleCacheHeaders, "handleCacheHeaders");
    Cr = { html: "text/html", json: "application/json" };
    jr = /[^\u0009\u0020-\u007E]/g;
    __name(sanitizeStatusMessage, "sanitizeStatusMessage");
    __name(sanitizeStatusCode, "sanitizeStatusCode");
    __name(splitCookiesString, "splitCookiesString");
    Pr = void 0 === Jt ? (e4) => e4() : Jt;
    __name(send, "send");
    __name(setResponseStatus, "setResponseStatus");
    __name(getResponseStatus, "getResponseStatus");
    __name(getResponseStatusText, "getResponseStatusText");
    __name(setResponseHeaders, "setResponseHeaders");
    Lr = setResponseHeaders;
    __name(setResponseHeader, "setResponseHeader");
    __name(appendResponseHeader, "appendResponseHeader");
    __name(sendStream, "sendStream");
    __name(sendWebResponse, "sendWebResponse");
    Or = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
    Nr = /* @__PURE__ */ new Set(["transfer-encoding", "accept-encoding", "connection", "keep-alive", "upgrade", "expect", "host", "accept"]);
    __name(proxyRequest, "proxyRequest");
    __name(getProxyRequestHeaders, "getProxyRequestHeaders");
    __name(fetchWithEvent, "fetchWithEvent");
    __name(_getFetch, "_getFetch");
    __name(rewriteCookieProperty, "rewriteCookieProperty");
    H3Event = class {
      static {
        __name(this, "H3Event");
      }
      __is_event__ = true;
      node;
      web;
      context = {};
      _method;
      _path;
      _headers;
      _requestBody;
      _handled = false;
      _onBeforeResponseCalled;
      _onAfterResponseCalled;
      constructor(e4, t4) {
        this.node = { req: e4, res: t4 };
      }
      get method() {
        return this._method || (this._method = (this.node.req.method || "GET").toUpperCase()), this._method;
      }
      get path() {
        return this._path || this.node.req.url || "/";
      }
      get headers() {
        return this._headers || (this._headers = (function(e4) {
          const t4 = new Headers();
          for (const [r3, s4] of Object.entries(e4)) if (Array.isArray(s4)) for (const e5 of s4) t4.append(r3, e5);
          else s4 && t4.set(r3, s4);
          return t4;
        })(this.node.req.headers)), this._headers;
      }
      get handled() {
        return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
      }
      respondWith(e4) {
        return Promise.resolve(e4).then((e5) => sendWebResponse(this, e5));
      }
      toString() {
        return `[${this.method}] ${this.path}`;
      }
      toJSON() {
        return this.toString();
      }
      get req() {
        return this.node.req;
      }
      get res() {
        return this.node.res;
      }
    };
    __name(isEvent, "isEvent");
    __name(createEvent, "createEvent");
    __name(defineEventHandler, "defineEventHandler");
    __name(_normalizeArray, "_normalizeArray");
    $r = defineEventHandler;
    __name(toEventHandler, "toEventHandler");
    lazyEventHandler = /* @__PURE__ */ __name(function(e4) {
      let t4, r3;
      const resolveHandler = /* @__PURE__ */ __name(() => r3 ? Promise.resolve(r3) : (t4 || (t4 = Promise.resolve(e4()).then((e5) => {
        const t5 = e5.default || e5;
        if ("function" != typeof t5) throw new TypeError("Invalid lazy handler result. It should be a function:", t5);
        return r3 = { handler: toEventHandler(e5.default || e5) }, r3;
      })), t4), "resolveHandler"), s4 = $r((e5) => r3 ? r3.handler(e5) : resolveHandler().then((t5) => t5.handler(e5)));
      return s4.__resolve__ = resolveHandler, s4;
    }, "lazyEventHandler");
    __name(createApp, "createApp");
    __name(use, "use");
    __name(normalizeLayer, "normalizeLayer");
    __name(handleHandlerResponse, "handleHandlerResponse");
    Ur = ["connect", "delete", "get", "head", "options", "post", "put", "trace", "patch"];
    __name(toNodeListener, "toNodeListener");
    __name(flatHooks2, "flatHooks");
    Mr = { run: /* @__PURE__ */ __name((e4) => e4(), "run") };
    Hr = void 0 !== console.createTask ? console.createTask : () => Mr;
    __name(serialTaskCaller2, "serialTaskCaller");
    __name(parallelTaskCaller2, "parallelTaskCaller");
    __name(callEachWith2, "callEachWith");
    Hookable = class {
      static {
        __name(this, "Hookable");
      }
      constructor() {
        this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
      }
      hook(e4, t4, r3 = {}) {
        if (!e4 || "function" != typeof t4) return () => {
        };
        const s4 = e4;
        let a3;
        for (; this._deprecatedHooks[e4]; ) a3 = this._deprecatedHooks[e4], e4 = a3.to;
        if (a3 && !r3.allowDeprecated) {
          let e5 = a3.message;
          e5 || (e5 = `${s4} hook has been deprecated` + (a3.to ? `, please use ${a3.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(e5) || (console.warn(e5), this._deprecatedMessages.add(e5));
        }
        if (!t4.name) try {
          Object.defineProperty(t4, "name", { get: /* @__PURE__ */ __name(() => "_" + e4.replace(/\W+/g, "_") + "_hook_cb", "get"), configurable: true });
        } catch {
        }
        return this._hooks[e4] = this._hooks[e4] || [], this._hooks[e4].push(t4), () => {
          t4 && (this.removeHook(e4, t4), t4 = void 0);
        };
      }
      hookOnce(e4, t4) {
        let r3, _function = /* @__PURE__ */ __name((...e5) => ("function" == typeof r3 && r3(), r3 = void 0, _function = void 0, t4(...e5)), "_function");
        return r3 = this.hook(e4, _function), r3;
      }
      removeHook(e4, t4) {
        if (this._hooks[e4]) {
          const r3 = this._hooks[e4].indexOf(t4);
          -1 !== r3 && this._hooks[e4].splice(r3, 1), 0 === this._hooks[e4].length && delete this._hooks[e4];
        }
      }
      deprecateHook(e4, t4) {
        this._deprecatedHooks[e4] = "string" == typeof t4 ? { to: t4 } : t4;
        const r3 = this._hooks[e4] || [];
        delete this._hooks[e4];
        for (const t5 of r3) this.hook(e4, t5);
      }
      deprecateHooks(e4) {
        Object.assign(this._deprecatedHooks, e4);
        for (const t4 in e4) this.deprecateHook(t4, e4[t4]);
      }
      addHooks(e4) {
        const t4 = flatHooks2(e4), r3 = Object.keys(t4).map((e5) => this.hook(e5, t4[e5]));
        return () => {
          for (const e5 of r3.splice(0, r3.length)) e5();
        };
      }
      removeHooks(e4) {
        const t4 = flatHooks2(e4);
        for (const e5 in t4) this.removeHook(e5, t4[e5]);
      }
      removeAllHooks() {
        for (const e4 in this._hooks) delete this._hooks[e4];
      }
      callHook(e4, ...t4) {
        return t4.unshift(e4), this.callHookWith(serialTaskCaller2, e4, ...t4);
      }
      callHookParallel(e4, ...t4) {
        return t4.unshift(e4), this.callHookWith(parallelTaskCaller2, e4, ...t4);
      }
      callHookWith(e4, t4, ...r3) {
        const s4 = this._before || this._after ? { name: t4, args: r3, context: {} } : void 0;
        this._before && callEachWith2(this._before, s4);
        const a3 = e4(t4 in this._hooks ? [...this._hooks[t4]] : [], r3);
        return a3 instanceof Promise ? a3.finally(() => {
          this._after && s4 && callEachWith2(this._after, s4);
        }) : (this._after && s4 && callEachWith2(this._after, s4), a3);
      }
      beforeEach(e4) {
        return this._before = this._before || [], this._before.push(e4), () => {
          if (void 0 !== this._before) {
            const t4 = this._before.indexOf(e4);
            -1 !== t4 && this._before.splice(t4, 1);
          }
        };
      }
      afterEach(e4) {
        return this._after = this._after || [], this._after.push(e4), () => {
          if (void 0 !== this._after) {
            const t4 = this._after.indexOf(e4);
            -1 !== t4 && this._after.splice(t4, 1);
          }
        };
      }
    };
    Wr = globalThis;
    FetchError = class extends Error {
      static {
        __name(this, "FetchError");
      }
      constructor(e4, t4) {
        super(e4, t4), this.name = "FetchError", t4?.cause && !this.cause && (this.cause = t4.cause);
      }
    };
    qr = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
    __name(isPayloadMethod, "isPayloadMethod");
    Dr = /* @__PURE__ */ new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]);
    zr = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
    __name(resolveFetchOptions, "resolveFetchOptions");
    __name(callHooks2, "callHooks");
    Fr = /* @__PURE__ */ new Set([408, 409, 425, 429, 500, 502, 503, 504]);
    Kr = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    __name(createFetch, "createFetch");
    Qr = (function() {
      if ("undefined" != typeof globalThis) return globalThis;
      if ("undefined" != typeof self) return self;
      if (void 0 !== Wr) return Wr;
      throw new Error("unable to locate global object");
    })();
    Zr = Qr.fetch ? (...e4) => Qr.fetch(...e4) : () => Promise.reject(new Error("[ofetch] global.fetch is not supported!"));
    Yr = Qr.Headers;
    Gr = Qr.AbortController;
    __name(asyncCall, "asyncCall");
    __name(stringify2, "stringify");
    createFetch({ fetch: Zr, Headers: Yr, AbortController: Gr });
    Vr = "base64:";
    __name(serializeRaw, "serializeRaw");
    __name(deserializeRaw, "deserializeRaw");
    Jr = ["has", "hasItem", "get", "getItem", "getItemRaw", "set", "setItem", "setItemRaw", "del", "remove", "removeItem", "getMeta", "setMeta", "removeMeta", "getKeys", "clear", "mount", "unmount"];
    __name(normalizeKey$1, "normalizeKey$1");
    __name(joinKeys, "joinKeys");
    __name(normalizeBaseKey, "normalizeBaseKey");
    memory = /* @__PURE__ */ __name(() => {
      const e4 = /* @__PURE__ */ new Map();
      return { name: "memory", getInstance: /* @__PURE__ */ __name(() => e4, "getInstance"), hasItem: /* @__PURE__ */ __name((t4) => e4.has(t4), "hasItem"), getItem: /* @__PURE__ */ __name((t4) => e4.get(t4) ?? null, "getItem"), getItemRaw: /* @__PURE__ */ __name((t4) => e4.get(t4) ?? null, "getItemRaw"), setItem(t4, r3) {
        e4.set(t4, r3);
      }, setItemRaw(t4, r3) {
        e4.set(t4, r3);
      }, removeItem(t4) {
        e4.delete(t4);
      }, getKeys: /* @__PURE__ */ __name(() => [...e4.keys()], "getKeys"), clear() {
        e4.clear();
      }, dispose() {
        e4.clear();
      } };
    }, "memory");
    __name(watch, "watch");
    __name(dispose, "dispose");
    Xr = {};
    normalizeKey = /* @__PURE__ */ __name(function(e4) {
      return e4 && e4.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
    }, "normalizeKey");
    en = { getKeys: /* @__PURE__ */ __name(() => Promise.resolve(Object.keys(Xr)), "getKeys"), hasItem: /* @__PURE__ */ __name((e4) => (e4 = normalizeKey(e4), Promise.resolve(e4 in Xr)), "hasItem"), getItem: /* @__PURE__ */ __name((e4) => (e4 = normalizeKey(e4), Promise.resolve(Xr[e4] ? Xr[e4].import() : null)), "getItem"), getMeta: /* @__PURE__ */ __name((e4) => (e4 = normalizeKey(e4), Promise.resolve(Xr[e4] ? Xr[e4].meta : {})), "getMeta") };
    tn = (function(e4 = {}) {
      const t4 = { mounts: { "": e4.driver || memory() }, mountpoints: [""], watching: false, watchListeners: [], unwatch: {} }, getMount = /* @__PURE__ */ __name((e5) => {
        for (const r4 of t4.mountpoints) if (e5.startsWith(r4)) return { base: r4, relativeKey: e5.slice(r4.length), driver: t4.mounts[r4] };
        return { base: "", relativeKey: e5, driver: t4.mounts[""] };
      }, "getMount"), getMounts = /* @__PURE__ */ __name((e5, r4) => t4.mountpoints.filter((t5) => t5.startsWith(e5) || r4 && e5.startsWith(t5)).map((r5) => ({ relativeBase: e5.length > r5.length ? e5.slice(r5.length) : void 0, mountpoint: r5, driver: t4.mounts[r5] })), "getMounts"), onChange = /* @__PURE__ */ __name((e5, r4) => {
        if (t4.watching) {
          r4 = normalizeKey$1(r4);
          for (const s4 of t4.watchListeners) s4(e5, r4);
        }
      }, "onChange"), stopWatch = /* @__PURE__ */ __name(async () => {
        if (t4.watching) {
          for (const e5 in t4.unwatch) await t4.unwatch[e5]();
          t4.unwatch = {}, t4.watching = false;
        }
      }, "stopWatch"), runBatch = /* @__PURE__ */ __name((e5, t5, r4) => {
        const s4 = /* @__PURE__ */ new Map(), getBatch = /* @__PURE__ */ __name((e6) => {
          let t6 = s4.get(e6.base);
          return t6 || (t6 = { driver: e6.driver, base: e6.base, items: [] }, s4.set(e6.base, t6)), t6;
        }, "getBatch");
        for (const r5 of e5) {
          const e6 = "string" == typeof r5, s5 = normalizeKey$1(e6 ? r5 : r5.key), a3 = e6 ? void 0 : r5.value, c3 = e6 || !r5.options ? t5 : { ...t5, ...r5.options }, u3 = getMount(s5);
          getBatch(u3).items.push({ key: s5, value: a3, relativeKey: u3.relativeKey, options: c3 });
        }
        return Promise.all([...s4.values()].map((e6) => r4(e6))).then((e6) => e6.flat());
      }, "runBatch"), r3 = { hasItem(e5, t5 = {}) {
        e5 = normalizeKey$1(e5);
        const { relativeKey: r4, driver: s4 } = getMount(e5);
        return asyncCall(s4.hasItem, r4, t5);
      }, getItem(e5, t5 = {}) {
        e5 = normalizeKey$1(e5);
        const { relativeKey: r4, driver: s4 } = getMount(e5);
        return asyncCall(s4.getItem, r4, t5).then((e6) => destr(e6));
      }, getItems: /* @__PURE__ */ __name((e5, t5 = {}) => runBatch(e5, t5, (e6) => e6.driver.getItems ? asyncCall(e6.driver.getItems, e6.items.map((e7) => ({ key: e7.relativeKey, options: e7.options })), t5).then((t6) => t6.map((t7) => ({ key: joinKeys(e6.base, t7.key), value: destr(t7.value) }))) : Promise.all(e6.items.map((t6) => asyncCall(e6.driver.getItem, t6.relativeKey, t6.options).then((e7) => ({ key: t6.key, value: destr(e7) }))))), "getItems"), getItemRaw(e5, t5 = {}) {
        e5 = normalizeKey$1(e5);
        const { relativeKey: r4, driver: s4 } = getMount(e5);
        return s4.getItemRaw ? asyncCall(s4.getItemRaw, r4, t5) : asyncCall(s4.getItem, r4, t5).then((e6) => deserializeRaw(e6));
      }, async setItem(e5, t5, s4 = {}) {
        if (void 0 === t5) return r3.removeItem(e5);
        e5 = normalizeKey$1(e5);
        const { relativeKey: a3, driver: c3 } = getMount(e5);
        c3.setItem && (await asyncCall(c3.setItem, a3, stringify2(t5), s4), c3.watch || onChange("update", e5));
      }, async setItems(e5, t5) {
        await runBatch(e5, t5, async (e6) => {
          if (e6.driver.setItems) return asyncCall(e6.driver.setItems, e6.items.map((e7) => ({ key: e7.relativeKey, value: stringify2(e7.value), options: e7.options })), t5);
          e6.driver.setItem && await Promise.all(e6.items.map((t6) => asyncCall(e6.driver.setItem, t6.relativeKey, stringify2(t6.value), t6.options)));
        });
      }, async setItemRaw(e5, t5, s4 = {}) {
        if (void 0 === t5) return r3.removeItem(e5, s4);
        e5 = normalizeKey$1(e5);
        const { relativeKey: a3, driver: c3 } = getMount(e5);
        if (c3.setItemRaw) await asyncCall(c3.setItemRaw, a3, t5, s4);
        else {
          if (!c3.setItem) return;
          await asyncCall(c3.setItem, a3, serializeRaw(t5), s4);
        }
        c3.watch || onChange("update", e5);
      }, async removeItem(e5, t5 = {}) {
        "boolean" == typeof t5 && (t5 = { removeMeta: t5 }), e5 = normalizeKey$1(e5);
        const { relativeKey: r4, driver: s4 } = getMount(e5);
        s4.removeItem && (await asyncCall(s4.removeItem, r4, t5), (t5.removeMeta || t5.removeMata) && await asyncCall(s4.removeItem, r4 + "$", t5), s4.watch || onChange("remove", e5));
      }, async getMeta(e5, t5 = {}) {
        "boolean" == typeof t5 && (t5 = { nativeOnly: t5 }), e5 = normalizeKey$1(e5);
        const { relativeKey: r4, driver: s4 } = getMount(e5), a3 = /* @__PURE__ */ Object.create(null);
        if (s4.getMeta && Object.assign(a3, await asyncCall(s4.getMeta, r4, t5)), !t5.nativeOnly) {
          const e6 = await asyncCall(s4.getItem, r4 + "$", t5).then((e7) => destr(e7));
          e6 && "object" == typeof e6 && ("string" == typeof e6.atime && (e6.atime = new Date(e6.atime)), "string" == typeof e6.mtime && (e6.mtime = new Date(e6.mtime)), Object.assign(a3, e6));
        }
        return a3;
      }, setMeta(e5, t5, r4 = {}) {
        return this.setItem(e5 + "$", t5, r4);
      }, removeMeta(e5, t5 = {}) {
        return this.removeItem(e5 + "$", t5);
      }, async getKeys(e5, t5 = {}) {
        e5 = normalizeBaseKey(e5);
        const r4 = getMounts(e5, true);
        let s4 = [];
        const a3 = [];
        let c3 = true;
        for (const e6 of r4) {
          e6.driver.flags?.maxDepth || (c3 = false);
          const r5 = await asyncCall(e6.driver.getKeys, e6.relativeBase, t5);
          for (const t6 of r5) {
            const r6 = e6.mountpoint + normalizeKey$1(t6);
            s4.some((e7) => r6.startsWith(e7)) || a3.push(r6);
          }
          s4 = [e6.mountpoint, ...s4.filter((t6) => !t6.startsWith(e6.mountpoint))];
        }
        const u3 = void 0 !== t5.maxDepth && !c3;
        return a3.filter((r5) => (!u3 || (function(e6, t6) {
          if (void 0 === t6) return true;
          let r6 = 0, s5 = e6.indexOf(":");
          for (; s5 > -1; ) r6++, s5 = e6.indexOf(":", s5 + 1);
          return r6 <= t6;
        })(r5, t5.maxDepth)) && (function(e6, t6) {
          return t6 ? e6.startsWith(t6) && "$" !== e6[e6.length - 1] : "$" !== e6[e6.length - 1];
        })(r5, e5));
      }, async clear(e5, t5 = {}) {
        e5 = normalizeBaseKey(e5), await Promise.all(getMounts(e5, false).map(async (e6) => {
          if (e6.driver.clear) return asyncCall(e6.driver.clear, e6.relativeBase, t5);
          if (e6.driver.removeItem) {
            const r4 = await e6.driver.getKeys(e6.relativeBase || "", t5);
            return Promise.all(r4.map((r5) => e6.driver.removeItem(r5, t5)));
          }
        }));
      }, async dispose() {
        await Promise.all(Object.values(t4.mounts).map((e5) => dispose(e5)));
      }, watch: /* @__PURE__ */ __name(async (e5) => (await (async () => {
        if (!t4.watching) {
          t4.watching = true;
          for (const e6 in t4.mounts) t4.unwatch[e6] = await watch(t4.mounts[e6], onChange, e6);
        }
      })(), t4.watchListeners.push(e5), async () => {
        t4.watchListeners = t4.watchListeners.filter((t5) => t5 !== e5), 0 === t4.watchListeners.length && await stopWatch();
      }), "watch"), async unwatch() {
        t4.watchListeners = [], await stopWatch();
      }, mount(e5, s4) {
        if ((e5 = normalizeBaseKey(e5)) && t4.mounts[e5]) throw new Error(`already mounted at ${e5}`);
        return e5 && (t4.mountpoints.push(e5), t4.mountpoints.sort((e6, t5) => t5.length - e6.length)), t4.mounts[e5] = s4, t4.watching && Promise.resolve(watch(s4, onChange, e5)).then((r4) => {
          t4.unwatch[e5] = r4;
        }).catch(console.error), r3;
      }, async unmount(e5, r4 = true) {
        (e5 = normalizeBaseKey(e5)) && t4.mounts[e5] && (t4.watching && e5 in t4.unwatch && (t4.unwatch[e5]?.(), delete t4.unwatch[e5]), r4 && await dispose(t4.mounts[e5]), t4.mountpoints = t4.mountpoints.filter((t5) => t5 !== e5), delete t4.mounts[e5]);
      }, getMount(e5 = "") {
        e5 = normalizeKey$1(e5) + ":";
        const t5 = getMount(e5);
        return { driver: t5.driver, base: t5.base };
      }, getMounts(e5 = "", t5 = {}) {
        e5 = normalizeKey$1(e5);
        return getMounts(e5, t5.parents).map((e6) => ({ driver: e6.driver, base: e6.mountpoint }));
      }, keys: /* @__PURE__ */ __name((e5, t5 = {}) => r3.getKeys(e5, t5), "keys"), get: /* @__PURE__ */ __name((e5, t5 = {}) => r3.getItem(e5, t5), "get"), set: /* @__PURE__ */ __name((e5, t5, s4 = {}) => r3.setItem(e5, t5, s4), "set"), has: /* @__PURE__ */ __name((e5, t5 = {}) => r3.hasItem(e5, t5), "has"), del: /* @__PURE__ */ __name((e5, t5 = {}) => r3.removeItem(e5, t5), "del"), remove: /* @__PURE__ */ __name((e5, t5 = {}) => r3.removeItem(e5, t5), "remove") };
      return r3;
    })({});
    __name(useStorage, "useStorage");
    tn.mount("/assets", en);
    rn = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225];
    nn = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998];
    on = [];
    k2 = class {
      static {
        __name(this, "k");
      }
      _data = new l2();
      _hash = new l2([...rn]);
      _nDataBytes = 0;
      _minBufferSize = 0;
      finalize(e4) {
        e4 && this._append(e4);
        const t4 = 8 * this._nDataBytes, r3 = 8 * this._data.sigBytes;
        return this._data.words[r3 >>> 5] |= 128 << 24 - r3 % 32, this._data.words[14 + (r3 + 64 >>> 9 << 4)] = Math.floor(t4 / 4294967296), this._data.words[15 + (r3 + 64 >>> 9 << 4)] = t4, this._data.sigBytes = 4 * this._data.words.length, this._process(), this._hash;
      }
      _doProcessBlock(e4, t4) {
        const r3 = this._hash.words;
        let s4 = r3[0], a3 = r3[1], c3 = r3[2], u3 = r3[3], f3 = r3[4], h2 = r3[5], d3 = r3[6], g2 = r3[7];
        for (let r4 = 0; r4 < 64; r4++) {
          if (r4 < 16) on[r4] = 0 | e4[t4 + r4];
          else {
            const e5 = on[r4 - 15], t5 = (e5 << 25 | e5 >>> 7) ^ (e5 << 14 | e5 >>> 18) ^ e5 >>> 3, s5 = on[r4 - 2], a4 = (s5 << 15 | s5 >>> 17) ^ (s5 << 13 | s5 >>> 19) ^ s5 >>> 10;
            on[r4] = t5 + on[r4 - 7] + a4 + on[r4 - 16];
          }
          const m4 = s4 & a3 ^ s4 & c3 ^ a3 & c3, _3 = (s4 << 30 | s4 >>> 2) ^ (s4 << 19 | s4 >>> 13) ^ (s4 << 10 | s4 >>> 22), E3 = g2 + ((f3 << 26 | f3 >>> 6) ^ (f3 << 21 | f3 >>> 11) ^ (f3 << 7 | f3 >>> 25)) + (f3 & h2 ^ ~f3 & d3) + nn[r4] + on[r4];
          g2 = d3, d3 = h2, h2 = f3, f3 = u3 + E3 | 0, u3 = c3, c3 = a3, a3 = s4, s4 = E3 + (_3 + m4) | 0;
        }
        r3[0] = r3[0] + s4 | 0, r3[1] = r3[1] + a3 | 0, r3[2] = r3[2] + c3 | 0, r3[3] = r3[3] + u3 | 0, r3[4] = r3[4] + f3 | 0, r3[5] = r3[5] + h2 | 0, r3[6] = r3[6] + d3 | 0, r3[7] = r3[7] + g2 | 0;
      }
      _append(e4) {
        "string" == typeof e4 && (e4 = l2.fromUtf8(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
      }
      _process(e4) {
        let t4, r3 = this._data.sigBytes / 64;
        r3 = e4 ? Math.ceil(r3) : Math.max((0 | r3) - this._minBufferSize, 0);
        const s4 = 16 * r3, a3 = Math.min(4 * s4, this._data.sigBytes);
        if (s4) {
          for (let e5 = 0; e5 < s4; e5 += 16) this._doProcessBlock(this._data.words, e5);
          t4 = this._data.words.splice(0, s4), this._data.sigBytes -= a3;
        }
        return new l2(t4, a3);
      }
    };
    l2 = class _l {
      static {
        __name(this, "l");
      }
      words;
      sigBytes;
      constructor(e4, t4) {
        e4 = this.words = e4 || [], this.sigBytes = void 0 === t4 ? 4 * e4.length : t4;
      }
      static fromUtf8(e4) {
        const t4 = unescape(encodeURIComponent(e4)), r3 = t4.length, s4 = [];
        for (let e5 = 0; e5 < r3; e5++) s4[e5 >>> 2] |= (255 & t4.charCodeAt(e5)) << 24 - e5 % 4 * 8;
        return new _l(s4, r3);
      }
      toBase64() {
        const e4 = [];
        for (let t4 = 0; t4 < this.sigBytes; t4 += 3) {
          const r3 = (this.words[t4 >>> 2] >>> 24 - t4 % 4 * 8 & 255) << 16 | (this.words[t4 + 1 >>> 2] >>> 24 - (t4 + 1) % 4 * 8 & 255) << 8 | this.words[t4 + 2 >>> 2] >>> 24 - (t4 + 2) % 4 * 8 & 255;
          for (let s4 = 0; s4 < 4 && 8 * t4 + 6 * s4 < 8 * this.sigBytes; s4++) e4.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(r3 >>> 6 * (3 - s4) & 63));
        }
        return e4.join("");
      }
      concat(e4) {
        if (this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8, this.words.length = Math.ceil(this.sigBytes / 4), this.sigBytes % 4) for (let t4 = 0; t4 < e4.sigBytes; t4++) {
          const r3 = e4.words[t4 >>> 2] >>> 24 - t4 % 4 * 8 & 255;
          this.words[this.sigBytes + t4 >>> 2] |= r3 << 24 - (this.sigBytes + t4) % 4 * 8;
        }
        else for (let t4 = 0; t4 < e4.sigBytes; t4 += 4) this.words[this.sigBytes + t4 >>> 2] = e4.words[t4 >>> 2];
        this.sigBytes += e4.sigBytes;
      }
    };
    sn = (() => {
      class Hasher2 {
        static {
          __name(this, "Hasher2");
        }
        buff = "";
        #o = /* @__PURE__ */ new Map();
        write(e4) {
          this.buff += e4;
        }
        dispatch(e4) {
          return this[null === e4 ? "null" : typeof e4](e4);
        }
        object(e4) {
          if (e4 && "function" == typeof e4.toJSON) return this.object(e4.toJSON());
          const t4 = Object.prototype.toString.call(e4);
          let r3 = "";
          const s4 = t4.length;
          r3 = s4 < 10 ? "unknown:[" + t4 + "]" : t4.slice(8, s4 - 1), r3 = r3.toLowerCase();
          let a3 = null;
          if (void 0 !== (a3 = this.#o.get(e4))) return this.dispatch("[CIRCULAR:" + a3 + "]");
          if (this.#o.set(e4, this.#o.size), void 0 !== g && g.isBuffer && g.isBuffer(e4)) return this.write("buffer:"), this.write(e4.toString("utf8"));
          if ("object" !== r3 && "function" !== r3 && "asyncfunction" !== r3) this[r3] ? this[r3](e4) : this.unknown(e4, r3);
          else {
            const t5 = Object.keys(e4).sort(), r4 = [];
            this.write("object:" + (t5.length + r4.length) + ":");
            const dispatchForKey = /* @__PURE__ */ __name((t6) => {
              this.dispatch(t6), this.write(":"), this.dispatch(e4[t6]), this.write(",");
            }, "dispatchForKey");
            for (const e5 of t5) dispatchForKey(e5);
            for (const e5 of r4) dispatchForKey(e5);
          }
        }
        array(e4, t4) {
          if (t4 = void 0 !== t4 && t4, this.write("array:" + e4.length + ":"), !t4 || e4.length <= 1) {
            for (const t5 of e4) this.dispatch(t5);
            return;
          }
          const r3 = /* @__PURE__ */ new Map(), s4 = e4.map((e5) => {
            const t5 = new Hasher2();
            t5.dispatch(e5);
            for (const [e6, s5] of t5.#o) r3.set(e6, s5);
            return t5.toString();
          });
          return this.#o = r3, s4.sort(), this.array(s4, false);
        }
        date(e4) {
          return this.write("date:" + e4.toJSON());
        }
        symbol(e4) {
          return this.write("symbol:" + e4.toString());
        }
        unknown(e4, t4) {
          if (this.write(t4), e4) return this.write(":"), e4 && "function" == typeof e4.entries ? this.array([...e4.entries()], true) : void 0;
        }
        error(e4) {
          return this.write("error:" + e4.toString());
        }
        boolean(e4) {
          return this.write("bool:" + e4);
        }
        string(e4) {
          this.write("string:" + e4.length + ":"), this.write(e4);
        }
        function(e4) {
          this.write("fn:"), !(function(e5) {
            if ("function" != typeof e5) return false;
            return "[native code] }" === Function.prototype.toString.call(e5).slice(-15);
          })(e4) ? this.dispatch(e4.toString()) : this.dispatch("[native]");
        }
        number(e4) {
          return this.write("number:" + e4);
        }
        null() {
          return this.write("Null");
        }
        undefined() {
          return this.write("Undefined");
        }
        regexp(e4) {
          return this.write("regex:" + e4.toString());
        }
        arraybuffer(e4) {
          return this.write("arraybuffer:"), this.dispatch(new Uint8Array(e4));
        }
        url(e4) {
          return this.write("url:" + e4.toString());
        }
        map(e4) {
          this.write("map:");
          const t4 = [...e4];
          return this.array(t4, false);
        }
        set(e4) {
          this.write("set:");
          const t4 = [...e4];
          return this.array(t4, false);
        }
        bigint(e4) {
          return this.write("bigint:" + e4.toString());
        }
      }
      for (const e4 of ["uint8array", "uint8clampedarray", "unt8array", "uint16array", "unt16array", "uint32array", "unt32array", "float32array", "float64array"]) Hasher2.prototype[e4] = function(t4) {
        return this.write(e4 + ":"), this.array([...t4], false);
      };
      return Hasher2;
    })();
    __name(hash, "hash");
    __name(defineCachedFunction, "defineCachedFunction");
    __name(getKey, "getKey");
    __name(escapeKey, "escapeKey");
    __name(cloneWithProxy, "cloneWithProxy");
    cachedEventHandler = /* @__PURE__ */ __name(function(e4, t4 = { name: "_", base: "/cache", swr: true, maxAge: 1 }) {
      const r3 = (t4.varies || []).filter(Boolean).map((e5) => e5.toLowerCase()).sort(), s4 = { ...t4, getKey: /* @__PURE__ */ __name(async (e5) => {
        const s5 = await t4.getKey?.(e5);
        if (s5) return escapeKey(s5);
        const a4 = e5.node.req.originalUrl || e5.node.req.url || e5.path;
        let c3;
        try {
          c3 = escapeKey(decodeURI(parseURL(a4).pathname)).slice(0, 16) || "index";
        } catch {
          c3 = "-";
        }
        return [`${c3}.${hash(a4)}`, ...r3.map((t5) => [t5, e5.node.req.headers[t5]]).map(([e6, t5]) => `${escapeKey(e6)}.${hash(t5)}`)].join(":");
      }, "getKey"), validate: /* @__PURE__ */ __name((e5) => !!e5.value && (!(e5.value.code >= 400) && (void 0 !== e5.value.body && ("undefined" !== e5.value.headers.etag && "undefined" !== e5.value.headers["last-modified"]))), "validate"), group: t4.group || "nitro/handlers", integrity: t4.integrity || hash([e4, t4]) }, a3 = (function(e5, t5 = {}) {
        return defineCachedFunction(e5, t5);
      })(async (a4) => {
        const c3 = {};
        for (const e5 of r3) {
          const t5 = a4.node.req.headers[e5];
          void 0 !== t5 && (c3[e5] = t5);
        }
        const u3 = cloneWithProxy(a4.node.req, { headers: c3 }), f3 = {};
        let h2;
        const d3 = createEvent(u3, cloneWithProxy(a4.node.res, { statusCode: 200, writableEnded: false, writableFinished: false, headersSent: false, closed: false, getHeader: /* @__PURE__ */ __name((e5) => f3[e5], "getHeader"), setHeader(e5, t5) {
          return f3[e5] = t5, this;
        }, getHeaderNames: /* @__PURE__ */ __name(() => Object.keys(f3), "getHeaderNames"), hasHeader: /* @__PURE__ */ __name((e5) => e5 in f3, "hasHeader"), removeHeader(e5) {
          delete f3[e5];
        }, getHeaders: /* @__PURE__ */ __name(() => f3, "getHeaders"), end(e5, t5, r4) {
          return "string" == typeof e5 && (h2 = e5), "function" == typeof t5 && t5(), "function" == typeof r4 && r4(), this;
        }, write: /* @__PURE__ */ __name((e5, t5, r4) => ("string" == typeof e5 && (h2 = e5), "function" == typeof t5 && t5(void 0), "function" == typeof r4 && r4(), true), "write"), writeHead(e5, t5) {
          if (this.statusCode = e5, t5) {
            if (Array.isArray(t5) || "string" == typeof t5) throw new TypeError("Raw headers  is not supported.");
            for (const e6 in t5) {
              const r4 = t5[e6];
              void 0 !== r4 && this.setHeader(e6, r4);
            }
          }
          return this;
        } }));
        d3.fetch = (e5, t5) => fetchWithEvent(d3, e5, t5, { fetch: useNitroApp().localFetch }), d3.$fetch = (e5, t5) => fetchWithEvent(d3, e5, t5, { fetch: globalThis.$fetch }), d3.waitUntil = a4.waitUntil, d3.context = a4.context, d3.context.cache = { options: s4 };
        const g2 = await e4(d3) || h2, m4 = d3.node.res.getHeaders();
        m4.etag = String(m4.Etag || m4.etag || `W/"${hash(g2)}"`), m4["last-modified"] = String(m4["Last-Modified"] || m4["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString());
        const _3 = [];
        t4.swr ? (t4.maxAge && _3.push(`s-maxage=${t4.maxAge}`), t4.staleMaxAge ? _3.push(`stale-while-revalidate=${t4.staleMaxAge}`) : _3.push("stale-while-revalidate")) : t4.maxAge && _3.push(`max-age=${t4.maxAge}`), _3.length > 0 && (m4["cache-control"] = _3.join(", "));
        return { code: d3.node.res.statusCode, headers: m4, body: g2 };
      }, s4);
      return defineEventHandler(async (r4) => {
        if (t4.headersOnly) {
          if (handleCacheHeaders(r4, { maxAge: t4.maxAge })) return;
          return e4(r4);
        }
        const s5 = await a3(r4);
        if (r4.node.res.headersSent || r4.node.res.writableEnded) return s5.body;
        if (!handleCacheHeaders(r4, { modifiedTime: new Date(s5.headers["last-modified"]), etag: s5.headers.etag, maxAge: t4.maxAge })) {
          r4.node.res.statusCode = s5.code;
          for (const e5 in s5.headers) {
            const t5 = s5.headers[e5];
            "set-cookie" === e5 ? r4.node.res.appendHeader(e5, splitCookiesString(t5)) : void 0 !== t5 && r4.node.res.setHeader(e5, t5);
          }
          return s5.body;
        }
      });
    }, "cachedEventHandler");
    __name(klona, "klona");
    an = Rr({ nuxt: {} });
    cn = /\d/;
    un = ["-", "_", "/", "."];
    __name(isUppercase, "isUppercase");
    __name(kebabCase, "kebabCase");
    __name(getEnv, "getEnv");
    __name(_isObject, "_isObject");
    __name(applyEnv, "applyEnv");
    fn = /\{\{([^{}]*)\}\}/g;
    __name(_expandFromEnv, "_expandFromEnv");
    ln = { app: { baseURL: "/", buildId: "eb3e1021-fed5-4a27-b868-e6bd9e7161d3", buildAssetsDir: "/_nuxt/", cdnURL: "" }, nitro: { envPrefix: "NUXT_", routeRules: { "/__nuxt_error": { cache: false }, "/pwa/**": { headers: { "cache-control": "public, max-age=3600" } }, "/icons/**": { headers: { "cache-control": "public, max-age=86400" } }, "/_nuxt/builds/meta/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } }, "/_nuxt/builds/**": { headers: { "cache-control": "public, max-age=1, immutable" } }, "/_nuxt/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } } } }, public: { apiBase: "https://nidoquest-qvqr9l45.on-forge.com/api", appName: "NidoQuest", vapidPublicKey: "", i18n: { baseUrl: "", defaultLocale: "es-LATAM", defaultDirection: "ltr", strategy: "prefix_except_default", lazy: false, rootRedirect: "", routesNameSeparator: "___", defaultLocaleRouteNameSuffix: "default", skipSettingLocaleOnNavigate: false, differentDomains: false, trailingSlash: false, locales: [{ code: "es-LATAM", name: "Espa\xF1ol LATAM", files: [{ path: "/Users/estebancastano/Proyectos/nidoquest/frontend/i18n/locales/es-LATAM.json", cache: "" }] }, { code: "en", name: "English", files: [{ path: "/Users/estebancastano/Proyectos/nidoquest/frontend/i18n/locales/en.json", cache: "" }] }, { code: "fr", name: "Fran\xE7ais", files: [{ path: "/Users/estebancastano/Proyectos/nidoquest/frontend/i18n/locales/fr.json", cache: "" }] }], detectBrowserLanguage: { alwaysRedirect: false, cookieCrossOrigin: false, cookieDomain: "", cookieKey: "i18n_redirected", cookieSecure: false, fallbackLocale: "", redirectOn: "root", useCookie: true }, experimental: { localeDetector: "", switchLocalePathLinkSSR: false, autoImportTranslationFunctions: false, typedPages: true, typedOptionsAndMessages: false, generatedLocaleFilePathFormat: "absolute", alternateLinkCanonicalQueries: false, hmr: true }, multiDomainLocales: false, domainLocales: { "es-LATAM": { domain: "" }, en: { domain: "" }, fr: { domain: "" } } } }, backendApiBase: "https://nidoquest-qvqr9l45.on-forge.com/api" };
    hn = { prefix: "NITRO_", altPrefix: ln.nitro.envPrefix ?? G.env.NITRO_ENV_PREFIX ?? "_", envExpansion: ln.nitro.envExpansion ?? G.env.NITRO_ENV_EXPANSION ?? false };
    dn = _deepFreeze(applyEnv(klona(ln), hn));
    __name(useRuntimeConfig, "useRuntimeConfig");
    __name(_deepFreeze, "_deepFreeze");
    _deepFreeze(klona(an)), new Proxy(/* @__PURE__ */ Object.create(null), { get: /* @__PURE__ */ __name((e4, t4) => {
      console.warn("Please use `useRuntimeConfig()` instead of accessing config directly.");
      const r3 = useRuntimeConfig();
      if (t4 in r3) return r3[t4];
    }, "get") });
    pn = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : void 0 !== Wr ? Wr : {};
    gn = "__unctx__";
    yn = pn[gn] || (pn[gn] = /* @__PURE__ */ (function(e4 = {}) {
      const t4 = {};
      return { get: /* @__PURE__ */ __name((r3, s4 = {}) => (t4[r3] || (t4[r3] = (function(e5 = {}) {
        let t5, r4 = false;
        const checkConflict = /* @__PURE__ */ __name((e6) => {
          if (t5 && t5 !== e6) throw new Error("Context conflict");
        }, "checkConflict");
        let s5;
        if (e5.asyncContext) {
          const t6 = e5.AsyncLocalStorage || globalThis.AsyncLocalStorage;
          t6 ? s5 = new t6() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
        }
        const _getCurrentInstance = /* @__PURE__ */ __name(() => {
          if (s5) {
            const e6 = s5.getStore();
            if (void 0 !== e6) return e6;
          }
          return t5;
        }, "_getCurrentInstance");
        return { use: /* @__PURE__ */ __name(() => {
          const e6 = _getCurrentInstance();
          if (void 0 === e6) throw new Error("Context is not available");
          return e6;
        }, "use"), tryUse: /* @__PURE__ */ __name(() => _getCurrentInstance(), "tryUse"), set: /* @__PURE__ */ __name((e6, s6) => {
          s6 || checkConflict(e6), t5 = e6, r4 = true;
        }, "set"), unset: /* @__PURE__ */ __name(() => {
          t5 = void 0, r4 = false;
        }, "unset"), call: /* @__PURE__ */ __name((e6, a3) => {
          checkConflict(e6), t5 = e6;
          try {
            return s5 ? s5.run(e6, a3) : a3();
          } finally {
            r4 || (t5 = void 0);
          }
        }, "call"), async callAsync(e6, a3) {
          t5 = e6;
          const onRestore = /* @__PURE__ */ __name(() => {
            t5 = e6;
          }, "onRestore"), onLeave = /* @__PURE__ */ __name(() => t5 === e6 ? onRestore : void 0, "onLeave");
          wn.add(onLeave);
          try {
            const c3 = s5 ? s5.run(e6, a3) : a3();
            return r4 || (t5 = void 0), await c3;
          } finally {
            wn.delete(onLeave);
          }
        } };
      })({ ...e4, ...s4 })), t4[r3]), "get") };
    })());
    mn = "__unctx_async_handlers__";
    wn = pn[mn] || (pn[mn] = /* @__PURE__ */ new Set());
    __name(isPathInScope, "isPathInScope");
    ((e4, t4 = {}) => {
      yn.get(e4, t4);
    })("nitro-app", { asyncContext: false, AsyncLocalStorage: void 0 });
    bn = toRouteMatcher(createRouter$1({ routes: useRuntimeConfig().nitro.routeRules }));
    __name(createRouteRulesHandler, "createRouteRulesHandler");
    __name(getRouteRules, "getRouteRules");
    __name(getRouteRulesForPath, "getRouteRulesForPath");
    vn = /post|put|patch/i;
    __name(joinHeaders, "joinHeaders");
    __name(normalizeCookieHeader, "normalizeCookieHeader");
    __name(normalizeCookieHeaders, "normalizeCookieHeaders");
    __name(hasReqHeader, "hasReqHeader");
    __name(defaultHandler, "defaultHandler");
    _n = [async function(e4, t4, { defaultHandler: r3 }) {
      if (t4.handled || (function(e5) {
        return !hasReqHeader(e5, "accept", "text/html") && (hasReqHeader(e5, "accept", "application/json") || hasReqHeader(e5, "user-agent", "curl/") || hasReqHeader(e5, "user-agent", "httpie/") || hasReqHeader(e5, "sec-fetch-mode", "cors") || e5.path.startsWith("/api/") || e5.path.endsWith(".json"));
      })(t4)) return;
      const s4 = await r3(e4, t4, { json: true });
      if (404 === (e4.status || e4.statusCode || 500) && 302 === s4.status) return setResponseHeaders(t4, s4.headers), setResponseStatus(t4, s4.status, s4.statusText), send(t4, JSON.stringify(s4.body, null, 2));
      const a3 = s4.body, c3 = new URL(a3.url);
      a3.url = withoutBase(c3.pathname, useRuntimeConfig(t4).app.baseURL) + c3.search + c3.hash, a3.message = e4.unhandled ? a3.message || "Server Error" : e4.message || a3.message || "Server Error", a3.data ||= e4.data, a3.statusText ||= e4.statusText || e4.statusMessage, delete s4.headers["content-type"], delete s4.headers["content-security-policy"], setResponseHeaders(t4, s4.headers);
      const u3 = getRequestHeaders(t4), f3 = t4.path.startsWith("/__nuxt_error") || !!u3["x-nuxt-error"] ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(t4).app.baseURL, "/__nuxt_error"), a3), { headers: { ...u3, "x-nuxt-error": "true" }, redirect: "manual" }).catch(() => null);
      if (t4.handled) return;
      if (!f3) {
        const { template: e5 } = await Promise.resolve().then(() => (init_error_500(), error_500_exports));
        return setResponseHeader(t4, "Content-Type", "text/html;charset=UTF-8"), send(t4, e5(a3));
      }
      const h2 = await f3.text();
      for (const [e5, r4] of f3.headers.entries()) "set-cookie" !== e5 ? setResponseHeader(t4, e5, r4) : appendResponseHeader(t4, e5, r4);
      return setResponseStatus(t4, f3.status && 200 !== f3.status ? f3.status : s4.status, f3.statusText || s4.statusText), send(t4, h2);
    }, function(e4, t4) {
      const r3 = defaultHandler(e4, t4);
      return setResponseHeaders(t4, r3.headers), setResponseStatus(t4, r3.status, r3.statusText), send(t4, JSON.stringify(r3.body, null, 2));
    }];
    En = [];
    _lazy_ZcXCBa = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_renderer(), renderer_exports)), "_lazy_ZcXCBa");
    Rn = [{ route: "/api/**:path", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_path(), path_exports)), "handler"), lazy: true, middleware: false, method: void 0 }, { route: "/__nuxt_error", handler: _lazy_ZcXCBa, lazy: true, middleware: false, method: void 0 }, { route: "/__nuxt_island/**", handler: defineEventHandler(() => {
    }), lazy: false, middleware: false, method: void 0 }, { route: "/**", handler: _lazy_ZcXCBa, lazy: true, middleware: false, method: void 0 }];
    xn = (function() {
      const e4 = useRuntimeConfig(), t4 = new Hookable(), captureError = /* @__PURE__ */ __name((e5, r4 = {}) => {
        const s5 = t4.callHookParallel("error", e5, r4).catch((e6) => {
          console.error("Error while capturing another error", e6);
        });
        if (r4.event && isEvent(r4.event)) {
          const t5 = r4.event.context.nitro?.errors;
          t5 && t5.push({ error: e5, context: r4 }), r4.event.waitUntil && r4.event.waitUntil(s5);
        }
      }, "captureError"), r3 = createApp({ debug: destr(false), onError: /* @__PURE__ */ __name((e5, t5) => (captureError(e5, { event: t5, tags: ["request"] }), (async function(e6, t6) {
        for (const r4 of _n) try {
          if (await r4(e6, t6, { defaultHandler }), t6.handled) return;
        } catch (e7) {
          console.error(e7);
        }
      })(e5, t5)), "onError"), onRequest: /* @__PURE__ */ __name(async (e5) => {
        e5.context.nitro = e5.context.nitro || { errors: [] };
        const t5 = e5.node.req?.__unenv__;
        t5?._platform && (e5.context = { _platform: t5?._platform, ...t5._platform, ...e5.context }), !e5.context.waitUntil && t5?.waitUntil && (e5.context.waitUntil = t5.waitUntil), e5.fetch = (t6, r4) => fetchWithEvent(e5, t6, r4, { fetch: localFetch }), e5.$fetch = (t6, r4) => fetchWithEvent(e5, t6, r4, { fetch: c3 }), e5.waitUntil = (t6) => {
          e5.context.nitro._waitUntilPromises || (e5.context.nitro._waitUntilPromises = []), e5.context.nitro._waitUntilPromises.push(t6), e5.context.waitUntil && e5.context.waitUntil(t6);
        }, e5.captureError = (t6, r4) => {
          captureError(t6, { event: e5, ...r4 });
        }, await xn.hooks.callHook("request", e5).catch((t6) => {
          captureError(t6, { event: e5, tags: ["request"] });
        });
      }, "onRequest"), onBeforeResponse: /* @__PURE__ */ __name(async (e5, t5) => {
        await xn.hooks.callHook("beforeResponse", e5, t5).catch((t6) => {
          captureError(t6, { event: e5, tags: ["request", "response"] });
        });
      }, "onBeforeResponse"), onAfterResponse: /* @__PURE__ */ __name(async (e5, t5) => {
        await xn.hooks.callHook("afterResponse", e5, t5).catch((t6) => {
          captureError(t6, { event: e5, tags: ["request", "response"] });
        });
      }, "onAfterResponse") }), s4 = (function(e5 = {}) {
        const t5 = createRouter$1({}), r4 = {};
        let s5;
        const a4 = {}, addRoute = /* @__PURE__ */ __name((e6, s6, c5) => {
          let u3 = r4[e6];
          if (u3 || (r4[e6] = u3 = { path: e6, handlers: {} }, t5.insert(e6, u3)), Array.isArray(c5)) for (const t6 of c5) addRoute(e6, s6, t6);
          else u3.handlers[c5] = toEventHandler(s6);
          return a4;
        }, "addRoute");
        a4.use = a4.add = (e6, t6, r5) => addRoute(e6, t6, r5 || "all");
        for (const e6 of Ur) a4[e6] = (t6, r5) => a4.add(t6, r5, e6);
        const matchHandler = /* @__PURE__ */ __name((e6 = "/", r5 = "get") => {
          const a5 = e6.indexOf("?");
          -1 !== a5 && (e6 = e6.slice(0, Math.max(0, a5)));
          const c5 = t5.lookup(e6);
          if (!c5 || !c5.handlers) return { error: createError({ statusCode: 404, name: "Not Found", statusMessage: `Cannot find any route matching ${e6 || "/"}.` }) };
          let u3 = c5.handlers[r5] || c5.handlers.all;
          if (!u3) {
            s5 || (s5 = toRouteMatcher(t5));
            const a6 = s5.matchAll(e6).reverse();
            for (const e7 of a6) {
              if (e7.handlers[r5]) {
                u3 = e7.handlers[r5], c5.handlers[r5] = c5.handlers[r5] || u3;
                break;
              }
              if (e7.handlers.all) {
                u3 = e7.handlers.all, c5.handlers.all = c5.handlers.all || u3;
                break;
              }
            }
          }
          return u3 ? { matched: c5, handler: u3 } : { error: createError({ statusCode: 405, name: "Method Not Allowed", statusMessage: `Method ${r5} is not allowed on this route.` }) };
        }, "matchHandler"), c4 = e5.preemptive || e5.preemtive;
        return a4.handler = $r((e6) => {
          const t6 = matchHandler(e6.path, e6.method.toLowerCase());
          if ("error" in t6) {
            if (c4) throw t6.error;
            return;
          }
          e6.context.matchedRoute = t6.matched;
          const r5 = t6.matched.params || {};
          return e6.context.params = r5, Promise.resolve(t6.handler(e6)).then((e7) => void 0 === e7 && c4 ? null : e7);
        }), a4.handler.__resolve__ = async (e6) => {
          e6 = withLeadingSlash(e6);
          const t6 = matchHandler(e6);
          if ("error" in t6) return;
          let r5 = { route: t6.matched.path, handler: t6.handler };
          if (t6.handler.__resolve__) {
            const s6 = await t6.handler.__resolve__(e6);
            if (!s6) return;
            r5 = { ...r5, ...s6 };
          }
          return r5;
        }, a4;
      })({ preemptive: true }), a3 = toNodeListener(r3), localFetch = /* @__PURE__ */ __name((e5, t5) => e5.toString().startsWith("/") ? (async function(e6, t6, r4 = {}) {
        try {
          const s5 = await b2(e6, { url: t6, ...r4 });
          return new Response(s5.body, { status: s5.status, statusText: s5.statusText, headers: v2(s5.headers) });
        } catch (e7) {
          return new Response(e7.toString(), { status: Number.parseInt(e7.statusCode || e7.code) || 500, statusText: e7.statusText });
        }
      })(a3, e5, t5).then((e6) => (function(e7) {
        return e7.headers.has("set-cookie") ? new Response(e7.body, { status: e7.status, statusText: e7.statusText, headers: normalizeCookieHeaders(e7.headers) }) : e7;
      })(e6)) : globalThis.fetch(e5, t5), "localFetch"), c3 = createFetch({ fetch: localFetch, Headers: Yr, defaults: { baseURL: e4.app.baseURL } });
      globalThis.$fetch = c3, r3.use(createRouteRulesHandler({ localFetch }));
      for (const t5 of Rn) {
        let a4 = t5.lazy ? lazyEventHandler(t5.handler) : t5.handler;
        if (t5.middleware || !t5.route) {
          const s5 = (e4.app.baseURL + (t5.route || "/")).replace(/\/+/g, "/");
          r3.use(s5, a4);
        } else {
          const e5 = getRouteRulesForPath(t5.route.replace(/:\w+|\*\*/g, "_"));
          e5.cache && (a4 = cachedEventHandler(a4, { group: "nitro/routes", ...e5.cache })), s4.use(t5.route, a4, t5.method);
        }
      }
      return r3.use(e4.app.baseURL, s4.handler), { hooks: t4, h3App: r3, router: s4, localCall: /* @__PURE__ */ __name((e5) => b2(a3, e5), "localCall"), localFetch, captureError };
    })();
    __name(useNitroApp, "useNitroApp");
    __name(defineRenderHandler, "defineRenderHandler");
    !(function(e4) {
      for (const t4 of En) try {
        t4(e4);
      } catch (t5) {
        throw e4.captureError(t5, { tags: ["plugin"] }), t5;
      }
    })(xn);
    Bn = { "/manifest.webmanifest": { type: "application/manifest+json", etag: '"1b7-SWoBB6yofgFIx1riahLZtkks/J0"', mtime: "2026-09-25T04:35:29.129Z", size: 439, path: "../manifest.webmanifest" }, "/offline.html": { type: "text/html; charset=utf-8", etag: '"39d-Eu2JcOp7XDEz5UDLjfc+gzAnrX0"', mtime: "2026-09-25T04:35:29.130Z", size: 925, path: "../offline.html" }, "/sw.js": { type: "text/javascript; charset=utf-8", etag: '"85b-BHNDX8TX8reNJ7MQEZny9WLz/VQ"', mtime: "2026-09-25T04:35:29.129Z", size: 2139, path: "../sw.js" }, "/_nuxt/297xFsXe.js": { type: "text/javascript; charset=utf-8", etag: '"7c7-cpNqNddIs4jnJ1is7HluYAVv0q4"', mtime: "2026-09-25T04:35:29.127Z", size: 1991, path: "../_nuxt/297xFsXe.js" }, "/_nuxt/BAlXFmja.js": { type: "text/javascript; charset=utf-8", etag: '"3cd-QYc8tGZO08RAjtKzTaoYzdLt79k"', mtime: "2026-09-25T04:35:29.127Z", size: 973, path: "../_nuxt/BAlXFmja.js" }, "/_nuxt/BSA5ygQW.js": { type: "text/javascript; charset=utf-8", etag: '"b92-DtzPXB/Z1rKxD8uDyJTejhBho0k"', mtime: "2026-09-25T04:35:29.127Z", size: 2962, path: "../_nuxt/BSA5ygQW.js" }, "/_nuxt/Be-RNCFB.js": { type: "text/javascript; charset=utf-8", etag: '"6a9-g/ff/g8yXZSz00UgCH1fYJX6io8"', mtime: "2026-09-25T04:35:29.127Z", size: 1705, path: "../_nuxt/Be-RNCFB.js" }, "/_nuxt/CJE5nD17.js": { type: "text/javascript; charset=utf-8", etag: '"47c7-ji3aDNyRAmolvyET1mGv/Pylaj4"', mtime: "2026-09-25T04:35:29.127Z", size: 18375, path: "../_nuxt/CJE5nD17.js" }, "/_nuxt/B8t9_dXJ.js": { type: "text/javascript; charset=utf-8", etag: '"310-vLi3nUKllCbJBHyHj6a6MO5zRew"', mtime: "2026-09-25T04:35:29.127Z", size: 784, path: "../_nuxt/B8t9_dXJ.js" }, "/_nuxt/CY539XKb.js": { type: "text/javascript; charset=utf-8", etag: '"58c-Ujna+cvpb+mdG66v+JNNNByG7lQ"', mtime: "2026-09-25T04:35:29.127Z", size: 1420, path: "../_nuxt/CY539XKb.js" }, "/_nuxt/Cb_cRF6R.js": { type: "text/javascript; charset=utf-8", etag: '"4c9-Ht5XY99v+SLZWT8IbNXFvhc/W6o"', mtime: "2026-09-25T04:35:29.127Z", size: 1225, path: "../_nuxt/Cb_cRF6R.js" }, "/_nuxt/CJ_ZZItP.js": { type: "text/javascript; charset=utf-8", etag: '"138c8-5Dw3wiWjOAuii0reVvlaDpwcINc"', mtime: "2026-09-25T04:35:29.127Z", size: 80072, path: "../_nuxt/CJ_ZZItP.js" }, "/_nuxt/CmXdUdh2.js": { type: "text/javascript; charset=utf-8", etag: '"146-PwWMYtjwd0Z69YM3nPPTV3VFXxw"', mtime: "2026-09-25T04:35:29.127Z", size: 326, path: "../_nuxt/CmXdUdh2.js" }, "/_nuxt/CnW9OGWT.js": { type: "text/javascript; charset=utf-8", etag: '"e5-wbGKSgKaktJdWPvqXy20CnQSwBE"', mtime: "2026-09-25T04:35:29.127Z", size: 229, path: "../_nuxt/CnW9OGWT.js" }, "/_nuxt/CxxHF9yi.js": { type: "text/javascript; charset=utf-8", etag: '"3649-9rj5EW0JeoTRw2p85Yg1daqWDAw"', mtime: "2026-09-25T04:35:29.127Z", size: 13897, path: "../_nuxt/CxxHF9yi.js" }, "/_nuxt/CfZv1CZE.js": { type: "text/javascript; charset=utf-8", etag: '"7b7-17+OH4klCCY8791T/p+yU/B0OqM"', mtime: "2026-09-25T04:35:29.127Z", size: 1975, path: "../_nuxt/CfZv1CZE.js" }, "/_nuxt/CyC5g9kG.js": { type: "text/javascript; charset=utf-8", etag: '"14e7-SwDNwBMwY94qhmLWvNRjBWNpHC0"', mtime: "2026-09-25T04:35:29.127Z", size: 5351, path: "../_nuxt/CyC5g9kG.js" }, "/_nuxt/DJepYSob.js": { type: "text/javascript; charset=utf-8", etag: '"ed5-E961GkiqumQZbzc72HCtDMApMsY"', mtime: "2026-09-25T04:35:29.127Z", size: 3797, path: "../_nuxt/DJepYSob.js" }, "/_nuxt/D_Na49v8.js": { type: "text/javascript; charset=utf-8", etag: '"82e-apSvCkqOlgrDdj9Eq1IS+R4eheE"', mtime: "2026-09-25T04:35:29.127Z", size: 2094, path: "../_nuxt/D_Na49v8.js" }, "/_nuxt/DOwbGuaq.js": { type: "text/javascript; charset=utf-8", etag: '"4b81b-qzOoPVbxhfBaUDGHuqczAvBFFb4"', mtime: "2026-09-25T04:35:29.128Z", size: 309275, path: "../_nuxt/DOwbGuaq.js" }, "/_nuxt/Dg8BqBg3.js": { type: "text/javascript; charset=utf-8", etag: '"784-TgCG/lKp/wfqrcaqPWEXelVlDIs"', mtime: "2026-09-25T04:35:29.127Z", size: 1924, path: "../_nuxt/Dg8BqBg3.js" }, "/_nuxt/DY_ArH2k.js": { type: "text/javascript; charset=utf-8", etag: '"8a5-gErj55dOM6ziY70Hd9Wb26eCkfM"', mtime: "2026-09-25T04:35:29.127Z", size: 2213, path: "../_nuxt/DY_ArH2k.js" }, "/_nuxt/Dnt2bUKc.js": { type: "text/javascript; charset=utf-8", etag: '"1217-eCyJ71EgNQUxONorpY5Z+dbEu1M"', mtime: "2026-09-25T04:35:29.128Z", size: 4631, path: "../_nuxt/Dnt2bUKc.js" }, "/_nuxt/DszVQQbE.js": { type: "text/javascript; charset=utf-8", etag: '"4e4-4ZUNlWBsPtu2uNWvV0+gP3k5XTY"', mtime: "2026-09-25T04:35:29.128Z", size: 1252, path: "../_nuxt/DszVQQbE.js" }, "/_nuxt/PwaBanner.Bcdf1BrK.css": { type: "text/css; charset=utf-8", etag: '"689-miGnAWwgxG1QqSjYMFFGrqhm6ys"', mtime: "2026-09-25T04:35:29.128Z", size: 1673, path: "../_nuxt/PwaBanner.Bcdf1BrK.css" }, "/_nuxt/RTOF6Wf7.js": { type: "text/javascript; charset=utf-8", etag: '"369-8cje7U2tNqArgWpq4tqGoEWolvY"', mtime: "2026-09-25T04:35:29.128Z", size: 873, path: "../_nuxt/RTOF6Wf7.js" }, "/_nuxt/Y5E2qSvi.js": { type: "text/javascript; charset=utf-8", etag: '"2ed4-n4M81ZV0AhJ8C4L7jmw1FfWMlsc"', mtime: "2026-09-25T04:35:29.128Z", size: 11988, path: "../_nuxt/Y5E2qSvi.js" }, "/_nuxt/buWbq5fs.js": { type: "text/javascript; charset=utf-8", etag: '"29b-1E6X8e0sonlTkG4C9h88ZVbQBLU"', mtime: "2026-09-25T04:35:29.128Z", size: 667, path: "../_nuxt/buWbq5fs.js" }, "/_nuxt/entry.DUOYdzpO.css": { type: "text/css; charset=utf-8", etag: '"ed44-4GjVk5CS7hz28b6TIEIxiW3n+ho"', mtime: "2026-09-25T04:35:29.128Z", size: 60740, path: "../_nuxt/entry.DUOYdzpO.css" }, "/_nuxt/error-404.C3kT2QX-.css": { type: "text/css; charset=utf-8", etag: '"97e-Xk26Nv4oQLpK3PtofolSggS9Z1M"', mtime: "2026-09-25T04:35:29.128Z", size: 2430, path: "../_nuxt/error-404.C3kT2QX-.css" }, "/_nuxt/error-500.BW0Y54Of.css": { type: "text/css; charset=utf-8", etag: '"773-NSoEX19gPmM2NozVKWotHuvxtho"', mtime: "2026-09-25T04:35:29.128Z", size: 1907, path: "../_nuxt/error-500.BW0Y54Of.css" }, "/_nuxt/explorer.Dcpu5NKO.css": { type: "text/css; charset=utf-8", etag: '"20d8-Wein35PcDEaJ76OrmhGubnnxgMQ"', mtime: "2026-09-25T04:35:29.128Z", size: 8408, path: "../_nuxt/explorer.Dcpu5NKO.css" }, "/_nuxt/index.DUpfBm5N.css": { type: "text/css; charset=utf-8", etag: '"3e3b-ArD3zPwPmwaxDxonqeP70Kk+TpM"', mtime: "2026-09-25T04:35:29.128Z", size: 15931, path: "../_nuxt/index.DUpfBm5N.css" }, "/_nuxt/pn511E7P.js": { type: "text/javascript; charset=utf-8", etag: '"8d4-UqMyVBFZbywlzbe8VpMWSold0Xc"', mtime: "2026-09-25T04:35:29.128Z", size: 2260, path: "../_nuxt/pn511E7P.js" }, "/_nuxt/un2Y273M.js": { type: "text/javascript; charset=utf-8", etag: '"d96-VNhtqPSrxdpHY1kIMBjICy1KoIA"', mtime: "2026-09-25T04:35:29.128Z", size: 3478, path: "../_nuxt/un2Y273M.js" }, "/pwa/register-sw.js": { type: "text/javascript; charset=utf-8", etag: '"1be-H2/y4EUrpxx0WPsoGG8h5V7z/SI"', mtime: "2026-09-25T04:35:29.129Z", size: 446, path: "../pwa/register-sw.js" }, "/icons/icon.svg": { type: "image/svg+xml", etag: '"2c6-//kS8eLynzhVQ4V0HB5hpg1h7Xk"', mtime: "2026-09-25T04:35:29.129Z", size: 710, path: "../icons/icon.svg" }, "/_nuxt/builds/latest.json": { type: "application/json", etag: '"47-pv9+1mqwBR3HP9IUSPdipGY2QTg"', mtime: "2026-09-25T04:35:29.124Z", size: 71, path: "../_nuxt/builds/latest.json" }, "/_nuxt/builds/meta/eb3e1021-fed5-4a27-b868-e6bd9e7161d3.json": { type: "application/json", etag: '"58-Nq/tVps0ZB3xmg1U9sL81t3YNeg"', mtime: "2026-09-25T04:35:29.123Z", size: 88, path: "../_nuxt/builds/meta/eb3e1021-fed5-4a27-b868-e6bd9e7161d3.json" } };
    An = { "/_nuxt/builds/meta/": { maxAge: 31536e3 }, "/_nuxt/builds/": { maxAge: 1 }, "/_nuxt/": { maxAge: 31536e3 } };
    Tn = useNitroApp();
    In = { async fetch(e4, t4, r3) {
      const s4 = new URL(e4.url);
      if (t4.ASSETS && (function(e5 = "") {
        if (Bn[e5]) return true;
        for (const t5 in An) if (e5.startsWith(t5)) return true;
        return false;
      })(s4.pathname)) return t4.ASSETS.fetch(e4);
      let a3;
      return (function(e5) {
        return vn.test(e5.method);
      })(e4) && (a3 = g.from(await e4.arrayBuffer())), globalThis.__env__ = t4, Tn.localFetch(s4.pathname + s4.search, { context: { waitUntil: /* @__PURE__ */ __name((e5) => r3.waitUntil(e5), "waitUntil"), _platform: { cf: e4.cf, cloudflare: { request: e4, env: t4, context: r3 } } }, host: s4.hostname, protocol: s4.protocol, method: e4.method, headers: e4.headers, body: a3 });
    }, scheduled(e4, t4, r3) {
    } };
  }
});

// .wrangler/tmp/bundle-tsInLw/middleware-loader.entry.ts
init_modules_watch_stub();

// .wrangler/tmp/bundle-tsInLw/middleware-insertion-facade.js
init_modules_watch_stub();

// .wrangler/tmp/pages-snvQxE/mfkrty2xh7.js
init_modules_watch_stub();

// .wrangler/tmp/pages-snvQxE/bundledWorker-0.7470907700817102.mjs
init_modules_watch_stub();
init_nitro();
globalThis._importMeta_ = { url: "file:///_entry.js", env: {} };

// ../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-dev-util.ts
init_modules_watch_stub();
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
__name(isRoutingRuleMatch, "isRoutingRuleMatch");
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}
__name(transformRoutingRuleToRegExp, "transformRoutingRuleToRegExp");

// .wrangler/tmp/pages-snvQxE/mfkrty2xh7.js
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_nuxt/*",
    "/manifest.webmanifest",
    "/offline",
    "/sw.js",
    "/icons/icon.svg",
    "/pwa/register-sw.js"
  ]
};
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = In;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};

// ../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e4) {
      console.error("Failed to drain the unused request body.", e4);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
function reduceError(e4) {
  return {
    name: e4?.name,
    message: e4?.message ?? String(e4),
    stack: e4?.stack,
    cause: e4?.cause === void 0 ? void 0 : reduceError(e4.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e4) {
    const error = reduceError(e4);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-tsInLw/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_dev_pipeline_default;

// ../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-tsInLw/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=mfkrty2xh7.js.map
