import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./searchForm.module.css";

export default function SearchForm() {
  return (
    <div className={styles.searchForm}>
      <form action="/search/result" method="get">
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <input
          type="text"
          id="search"
          name="q"
          required
          placeholder="Search..."
        />
      </form>
    </div>
  );
}
