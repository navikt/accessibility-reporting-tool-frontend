import {Link} from "@navikt/ds-react";
import styles from "./Navbar.module.css"
import {LeaveIcon} from "@navikt/aksel-icons";

function Navbar(props: { userMail: String; }){
    let userMail = props.userMail;


    return(
        <div className={styles.navBarContainer}>
            <ul className={styles.navBarP1}>
                <li><Link underline = {false} variant = "neutral" href="">Forside</Link></li>
                <li><Link underline = {false} variant = "neutral" href="">Organisasjonsenhet</Link></li>
                <li><Link underline = {false} variant = "neutral" href="">Dine erklæringer</Link></li>
                <li><Link underline = {false} variant = "neutral" href="">FAQ</Link></li>
            </ul>
            <ul className={styles.navBarP2}>
                <li><p>Innlogget som <strong>{userMail}</strong></p></li>
                <li className={styles.utlogging}><Link underline = {false} href="#"><LeaveIcon></LeaveIcon>Logg Ut</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;