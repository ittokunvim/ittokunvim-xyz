import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import SearchForm from "./searchForm";
import styles from "./header.module.css";

export default function Header() {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const handleToggle = () => setIsToggleOn(!isToggleOn);

  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <Image
          priority
          src="/blog.svg"
          width={64}
          height={64}
          alt="Site Logo"
        />
      </Link>
      <SearchForm />
      <div className={styles.toggleMenu}>
        <button onClick={handleToggle} >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
        {isToggleOn && (
          <nav>
            <ul>
              <li>
                <Link href={"/posts/list"}>
                  Post List
                </Link>
              </li>
              <li>
                <Link href={"/posts/create"}>
                  Post Create
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
