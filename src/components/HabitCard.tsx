import { useNavigate } from "react-router-dom";
import { useHabits } from "../context/HabitContext";
import type { Habit, Category } from "../data/habits";
import styles from "./HabitCard.module.css";

interface HabitCardProps {
  habit: Habit;
  showActions?: boolean; // defaults to true
}

// Mapping each category string to its CSS class
const categoryClass: Record<Category, string> = {
  health: styles.tagHealth,
  fitness: styles.tagFitness,
  mindset: styles.tagMindset,
  learning: styles.tagLearning,
  other: styles.tagOther,
};

function HabitCard({ habit, showActions = true }: HabitCardProps) {
  const { toggleHabit, deleteHabit } = useHabits();
  const navigate = useNavigate();

  // Navigating to the edit page with the habit's ID in the URL
  const handleEdit = (): void => {
    navigate(`/edit/${habit.id}`);
  };

  // Asking for confirmation before deleting: window.confirm returns a boolean
  const handleDelete = (): void => {
    if (window.confirm(`Delete "${habit.name}"?`)) {
      deleteHabit(habit.id);
    }
  };

  return (
    <div
      className={`${styles.card} ${habit.completedToday ? styles.done : ""}`}
    >
      {/* Circle checkbox */}
      <button
        className={`${styles.check} ${habit.completedToday ? styles.checked : ""}`}
        onClick={() => toggleHabit(habit.id)}
        aria-label={habit.completedToday ? "Mark as pending" : "Mark as done"}
      >
        {habit.completedToday && "✓"}
      </button>

      {/* Habit name, category tag, description, and streak */}
      <div className={styles.info}>
        <p className={styles.name}>{habit.name}</p>
        <div className={styles.meta}>
          <span className={`${styles.tag} ${categoryClass[habit.category]}`}>
            {habit.category}
          </span>
          {habit.description && (
            <span className={styles.desc}>{habit.description}</span>
          )}
          <span className={styles.streak}>🔥 {habit.streak}d streak</span>
        </div>

        {/* Small dots: one per scheduled day, showing the habit's weekly pattern */}
        <div className={styles.weekDots}>
          {habit.targetDays.map((day) => (
            <div key={day} className={styles.dot} title={day} />
          ))}
        </div>
      </div>

      {/* Edit and delete buttons: hidden until hover, not shown on today's view */}
      {showActions && (
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${styles.editBtn}`}
            onClick={handleEdit}
            aria-label="Edit habit"
          >
            ✎
          </button>
          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={handleDelete}
            aria-label="Delete habit"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default HabitCard;
