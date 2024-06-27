import {Heading} from "@navikt/ds-react";
import styles from "./Footer.module.css";

function Footer(){
    return(
        <footer className={styles.footerContainer}>
            <Heading level="1" size="large">Kontakt oss</Heading>
            <p>Har du spørsmål eller behov for støtte? Ta gjerne kontakt i <a>#nav-uu</a> kanalen på Slack eller sende en mail til <a>universell.utforming@nav.no</a></p>
            <strong>Takk for at du bidrar til et mer tilgjengelig NAV!</strong>
        </footer>
    )
}

export default Footer;