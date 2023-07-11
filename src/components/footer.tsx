import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter, faReact, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.accounts}>
        <p><strong>Account</strong></p>
        <ul>
          <li>
            <FooterTechnologyIcon url="https://github.com/ittokunvim/" icon={faGithub} />
          </li>
          <li>
            <FooterTechnologyIcon url="https://twitter.com/ittokunvim/" icon={faTwitter} />
          </li>
        </ul>
      </div>
      <div className={styles.technorogys}>
        <p><strong>Technorogy</strong></p>
        <ul>
          <li>
            <FooterTechnologyIcon url="https://beta.reactjs.org/" icon={faReact} />
          </li>
        </ul>
      </div>
      <p className={styles.copyright}>
        <FontAwesomeIcon icon={faCopyright} />
        2023 ittoku-tech.com
      </p>
    </footer>
  );
}

function FooterTechnologyIcon({ url, icon }: { url: string, icon: IconDefinition }): JSX.Element {
  return (
    <Link
      className={styles.link}
      passHref
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={icon} size="2x" />
    </Link>
  );
}
