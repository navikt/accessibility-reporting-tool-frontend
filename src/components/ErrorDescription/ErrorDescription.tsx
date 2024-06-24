import type { Language } from "@language/language";
import { text } from "@language/text";
import { BodyLong, Heading } from "@navikt/ds-react";
import KattIBoks from "../../img/KattIBoks";
import { baseUrl } from "../../urls.client";
import styles from "./ErrorDescription.module.css";

interface Props {
  language: Language
}

const ErrorDescription = ({language}: Props) => {

  return (
    <div className={styles.errorDiv} data-testid="errordiv">
      <Heading size={"xlarge"}>{text.errorHeading[language]}</Heading>
      <KattIBoks alt={text.errorKitten[language]} />
      <BodyLong>
        <strong>{text.errorText[language]}</strong>
      </BodyLong>
      <BodyLong>
        {text.errorHelp[language]} <a href={baseUrl}>{text.minSide[language]}</a>
      </BodyLong>
    </div>
  );
};

export default ErrorDescription;
