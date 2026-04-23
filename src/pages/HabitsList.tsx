import { useHabits } from "../context/HabitContext";
import HabitCard from "../components/HabitCard";
import FilterBar from "../components/FilterBar";
import styles from "./HabitsList.module.css";

function HabitsList() {
  const { habits, getFilteredHabits } = useHabits();

  // Getting the filtered list — this already applies filter + search from context
  const filteredHabits = getFilteredHabits();

  return (
    <div className={styles.page}>
      {/* Heading with total habit count badge */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          All Habits <span className={styles.countBadge}>{habits.length}</span>
        </h2>
      </div>

      {/* Filter buttons and search box */}
      <FilterBar />

      {/* Habit cards or empty state message */}
      <div className={styles.habitList}>
        {filteredHabits.length === 0 ? (
          <div className={styles.empty}>
            <h3>Nothing found</h3>
            <p>Try adjusting your search or filter.</p>
          </div>
        ) : (
          filteredHabits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} showActions={true} />
          ))
        )}
      </div>
    </div>
  );
}

export default HabitsList;
