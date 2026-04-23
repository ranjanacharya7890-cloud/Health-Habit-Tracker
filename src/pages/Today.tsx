import { useState } from "react";
import { useHabits } from "../context/HabitContext";
import HabitCard from "../components/HabitCard";
import Toast from "../components/Toast";
import styles from "./Today.module.css";
import type { Habit } from "../data/habits";

interface ToastState {
  message: string;
  type: "success" | "error";
}

function Today() {
  const { getTodaysHabits, getCompletedCount, toggleHabit } = useHabits();
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
  });

  const todaysHabits: Habit[] = getTodaysHabits();
  const completedCount: number = getCompletedCount();

  // Formatting today's date for the heading
  const dateLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Toggling a habit and showing a toast with feedback
  const handleToggle = (habit: Habit): void => {
    toggleHabit(habit.id);
    setToast({
      message: habit.completedToday ? "Marked as pending" : "Habit completed!",
      type: habit.completedToday ? "error" : "success",
    });
  };

  return (
    <div className={styles.page}>
      <p className={styles.dateLabel}>{dateLabel}</p>
      <h2 className={styles.title}>Today's Checklist</h2>

      {/* Showing a completion summary only when there are habits to show */}
      {todaysHabits.length > 0 && (
        <p className={styles.summary}>
          {completedCount} of {todaysHabits.length} completed
        </p>
      )}

      <div className={styles.habitList}>
        {todaysHabits.length === 0 ? (
          <div className={styles.empty}>
            <h3>Rest day!</h3>
            <p>No habits scheduled for today. Enjoy the break.</p>
          </div>
        ) : (
          todaysHabits.map((habit) => (
            <div
              key={habit.id}
              onClick={() => handleToggle(habit)}
              style={{ cursor: "pointer" }}
            >
              {/* showActions is false — this page is only for ticking habits off */}
              <HabitCard habit={habit} showActions={false} />
            </div>
          ))
        )}
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
}

export default Today;
