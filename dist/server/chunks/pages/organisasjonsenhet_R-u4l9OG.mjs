import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead, d as addAttribute } from '../astro_GZDYimvH.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'cssesc';
import { $ as $$Layout } from './dineerklaeringer_JBWrkn_4.mjs';
import { s as styles } from '../organisasjonsenhet.09f974bd_CppMw1l0.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

function AddOrgBtn() {
  return /* @__PURE__ */ jsxs(Button, { variant: "secondary", icon: /* @__PURE__ */ jsx(PersonPlusIcon, {}), children: [
    "Legg til organisasjonsenhet",
    " "
  ] });
}

const $$Organisasjonsenhet = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header${addAttribute(styles.orgHeader, "class")}> <h1${addAttribute(styles.h, "class")}>Organisasjonsenhet</h1> ${renderComponent($$result2, "AddOrgBtn", AddOrgBtn, {})} </header> ${renderComponent($$result2, "TeamListe", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/components/teamliste/TeamListe", "client:component-export": "default" })} ` })}`;
}, "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/pages/organisasjonsenhet.astro", void 0);

const $$file = "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/pages/organisasjonsenhet.astro";
const $$url = "/organisasjonsenhet";

export { $$Organisasjonsenhet as default, $$file as file, $$url as url };
