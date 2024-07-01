import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../astro_GZDYimvH.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';
import { $ as $$Layout } from './dineerklaeringer_JBWrkn_4.mjs';

const $$Team = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Her kommer team-side</h1> ` })}`;
}, "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/pages/team.astro", void 0);

const $$file = "/Users/nimahakimi/projects/accessibility-reporting-tool-frontend/src/pages/team.astro";
const $$url = "/team";

export { $$Team as default, $$file as file, $$url as url };
