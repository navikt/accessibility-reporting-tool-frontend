import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead, d as addAttribute } from '../astro_GZDYimvH.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'cssesc';
import { $ as $$Layout } from './dineerklaeringer_JBWrkn_4.mjs';
import { Heading } from '@navikt/ds-react';
import { s as styles } from '../rapportlisteSide.ea5ade85_Bu2DbYqL.mjs';
import { A as AddOrgBtn } from './index_Dea_Xkmy.mjs';

const $$RapportlisteSide = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header${addAttribute(styles.header, "class")}> <div${addAttribute(styles.headings, "class")}> ${renderComponent($$result2, "Heading", Heading, { "size": "xlarge" }, { "default": ($$result3) => renderTemplate`a11y` })} ${renderComponent($$result2, "Heading", Heading, { "size": "large" }, { "default": ($$result3) => renderTemplate`Rapporteringsverktøy for NAV` })} ${renderComponent($$result2, "AddErklaeringBtn", AddOrgBtn, {})} </div> <div${addAttribute(styles.rightAligned, "class")}> ${renderComponent($$result2, "Searchbar", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/components/Searchbar/searchbar", "client:component-export": "default" })} </div> </header> <section${addAttribute(styles.content, "class")}> <h3>Rapporter for enkeltsider</h3> ${renderComponent($$result2, "RapportListe", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/components/rapportliste/rapportListe", "client:component-export": "default" })} <h3>Samlerapporter</h3> ${renderComponent($$result2, "SamletListe", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/components/Samlerapporter/samlerapporter", "client:component-export": "default" })} </section> ` })}`;
}, "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/pages/rapportlisteSide.astro", void 0);

const $$file = "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/pages/rapportlisteSide.astro";
const $$url = "/rapportlisteSide";

export { $$RapportlisteSide as default, $$file as file, $$url as url };
