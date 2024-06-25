import {Heading} from "@navikt/ds-react";
import styles from "./Footer.module.css";

function Footer(){
    return(
        <div className={styles.footerContainer}>
            <Heading level="1" size="large">Kontakt oss</Heading>
            <p>Har du spørsmål eller behov for støtte? Ta gjerne kontakt i <a>#nav-uu</a> kanalen på slack eller sende en mail til <a>universell.utforming@nav.no</a></p>
            <strong>Takk for at du bidrar til et mer tilgjengelig NAV!</strong>
        </div>
    )
}

export default Footer;