import { useHabits } from "../context/HabitContext";
import styles from "./FilterBar.module.css";

const FILTERS = ["all", "done", "pending"] as const;
type Filter = (typeof FILTERS)[number]; // "all" | "done" | "pending"

function FilterBar() {
  const { filter, setFilter, searchQuery, setSearchQuery } = useHabits();

  return (
    <div className={styles.wrapper}>
      {/* Filter toggle buttons */}
      <div className={styles.filterRow}>
        {FILTERS.map((f: Filter) => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.active : ""}`}
            onClick={() => setFilter(f)}
          >
            {/* Capital for the first letter */}
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Search input - updates context on every key word */}
      <div className={styles.searchBox}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search habits..."
          className={styles.searchInput}
          aria-label="Search habits"
        />
        {/* Clear button only appears when there is text to clear */}
        {searchQuery && (
          <button
            className={styles.clearBtn}
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
