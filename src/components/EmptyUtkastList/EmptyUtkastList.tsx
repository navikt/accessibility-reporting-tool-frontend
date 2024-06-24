import type { Language } from "@language/language";
import { text } from "@language/text";
import { BodyLong, Heading } from "@navikt/ds-react";
import TomtKatt from "../../img/TomtKatt";
import styles from "./EmptyUtkastList.module.css";

interface Props {
  language: Language
}

const EmptyUtkastList = ({language}: Props) => {
  return (
    <div className={styles.ingenUtkast}>
      <div className={styles.ingenUtkastTekst}>
        <Heading size="small" level="2">
          {text.ingenUtkastTittel[language]}
        </Heading>
        <BodyLong size="medium">{text.ingenUtkastIngress[language]}</BodyLong>
        <a href={"https://www.nav.no/tjenester"} className={styles.lenke}>
          {" "}
          {text.ingenUtkastLenketekst[language]}
        </a>
      </div>
      <TomtKatt alt={text.emptyKitten[language]} />
    </div>
  );
};

export default EmptyUtkastList;
