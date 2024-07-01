import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead, d as addAttribute } from '../astro_GZDYimvH.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'cssesc';
import { s as styles } from '../index.0cf53b20_CKeE-hNo.mjs';
import { Button, Heading, Link } from '@navikt/ds-react';
import { $ as $$Layout } from './dineerklaeringer_JBWrkn_4.mjs';
import { jsx } from 'react/jsx-runtime';
import { WrenchIcon, ComponentIcon, FigureIcon } from '@navikt/aksel-icons';

function AddOrgBtn() {
  return /* @__PURE__ */ jsx(Button, { children: "Lag ny erklæring " });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section${addAttribute(styles.section1, "class")}> <section${addAttribute(styles.innerSection1, "class")}> ${renderComponent($$result2, "Heading", Heading, { "size": "xlarge" }, { "default": ($$result3) => renderTemplate`a11y rapporteringsverktøy for NAV` })} <p${addAttribute(styles.text, "class")}>
Dette rapporteringsverktøyet er designet for å styrke NAVs innsats for å sikre universell
                tilgjengelighet på sine digitale plattformer.
</p> ${renderComponent($$result2, "AddErklaeringBtn", AddOrgBtn, {})} </section> </section> <section${addAttribute(styles.section2, "class")}> <article${addAttribute(styles.article, "class")}> ${renderComponent($$result2, "WrenchIcon", WrenchIcon, { "title": "wrench icon", "fontSize": "3rem" })} ${renderComponent($$result2, "Heading", Heading, { "size": "medium" }, { "default": ($$result3) => renderTemplate`Verktøy` })} <p${addAttribute(styles.verktoyTekst, "class")}>Dette er noen av verktøyene vi anbefaler for rapportering</p> </article> <!-- Lage ny side her? --> <article${addAttribute(styles.article, "class")}> ${renderComponent($$result2, "ComponentIcon", ComponentIcon, { "title": "code icon", "fontSize": "3rem" })} ${renderComponent($$result2, "Heading", Heading, { "size": "medium" }, { "default": ($$result3) => renderTemplate`Les mer på ${renderComponent($$result3, "Link", Link, { "href": "https://aksel.nav.no/" }, { "default": ($$result4) => renderTemplate`Aksel.no` })}` })} </article> <article${addAttribute(styles.article, "class")}> ${renderComponent($$result2, "FigureIcon", FigureIcon, { "title": "accessibility figure icon", "fontSize": "3rem" })} ${renderComponent($$result2, "Heading", Heading, { "size": "medium" }, { "default": ($$result3) => renderTemplate`Les mer på ${renderComponent($$result3, "Link", Link, { "href": "https://www.uutilsynet.no/" }, { "default": ($$result4) => renderTemplate`uutilsynet.no` })}` })} </article> </section> ` })}`;
}, "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/pages/index.astro", void 0);

const $$file = "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { AddOrgBtn as A, index as i };
