import { c as createComponent, r as renderTemplate, d as addAttribute, e as renderHead, f as renderComponent, g as renderSlot, h as createAstro, m as maybeRenderHead } from '../astro_GZDYimvH.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Link, Heading } from '@navikt/ds-react';
import { s as styles, a as styles$1, b as styles$2 } from '../dineerklaeringer.1f63256d_CcMGtJjM.mjs';
import { LeaveIcon } from '@navikt/aksel-icons';

function Navbar({ userMail }) {
  return /* @__PURE__ */ jsxs("header", { className: styles.navBarContainer, children: [
    /* @__PURE__ */ jsxs("ul", { className: styles.navBarP1, children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { underline: false, variant: "neutral", href: "/", children: "Forside" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { underline: false, variant: "neutral", href: "/organisasjonsenhet", children: "Organisasjonsenhet" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { underline: false, variant: "neutral", href: "/dineerklaeringer", children: "Dine erklæringer" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { underline: false, variant: "neutral", href: "/rapportlisteSide", children: "Alle rapporter" }) })
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: styles.navBarP2, children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("p", { children: [
        "Innlogget som ",
        /* @__PURE__ */ jsx("strong", { children: userMail })
      ] }) }),
      /* @__PURE__ */ jsx("li", { className: styles.utlogging, children: /* @__PURE__ */ jsxs(Link, { underline: false, href: "#", children: [
        /* @__PURE__ */ jsx(LeaveIcon, {}),
        "Logg Ut"
      ] }) })
    ] })
  ] });
}

function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: styles$1.footerContainer, children: [
    /* @__PURE__ */ jsx(Heading, { level: "1", size: "large", children: "Kontakt oss" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Har du spørsmål eller behov for støtte? Ta gjerne kontakt i",
      " ",
      /* @__PURE__ */ jsx("a", { className: styles$1.footer_a, children: "#nav-uu" }),
      " kanalen på Slack eller sende en mail til",
      " ",
      /* @__PURE__ */ jsx("a", { className: styles$1.footer_a, children: "universell.utforming@nav.no" })
    ] }),
    /* @__PURE__ */ jsx("strong", { children: "Takk for at du bidrar til et mer tilgjengelig NAV!" })
  ] });
}

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="no"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>a11y rapportering</title><link rel="preload" href="https://cdn.nav.no/aksel/@navikt/ds-css/6.10.0/index.min.css" as="style"><link rel="stylesheet" href="https://cdn.nav.no/aksel/@navikt/ds-css/6.10.0/index.min.css">${renderHead()}</head> <body class="main"> ${renderComponent($$result, "Navbar", Navbar, { "userMail": "eksempel.profil@nav.no" })} <div${addAttribute(styles$2.page, "class")}> ${renderSlot($$result, $$slots["default"])} </div> ${renderComponent($$result, "Footer", Footer, {})} </body></html>`;
}, "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/layouts/Layout.astro", void 0);

const $$Dineerklaeringer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Dine erklæringer kommer her</h1> ` })}`;
}, "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/pages/dineerklaeringer.astro", void 0);

const $$file = "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/pages/dineerklaeringer.astro";
const $$url = "/dineerklaeringer";

const dineerklaeringer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dineerklaeringer,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, dineerklaeringer as d };
