import { useState } from "react";
import { useHabits } from "../context/HabitContext";
import HabitCard from "../components/HabitCard";
import Toast from "../components/Toast";
import styles from "./Dashboard.module.css";

// Typing the toast state so message and type are always consistent
interface ToastState {
  message: string;
  type: "success" | "error";
}

function Dashboard() {
  const {
    habits,
    getTodaysHabits,
    getCompletedCount,
    getBestStreak,
    getCategoryCount,
    toggleHabit,
  } = useHabits();

  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
  });

  const today = new Date();

  // Formatting today's date as "Monday, 18 April 2026"
  const dateLabel = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Picking a greeting emoji based on the time of day
  const getGreetingEmoji = (): string => {
    const hour = today.getHours();
    if (hour < 12) return "👋";
    if (hour < 18) return "☀️";
    return "🌙";
  };

  const todaysHabits = getTodaysHabits();
  const completedCount = getCompletedCount();

  // Calculating what percentage of today's habits are done
  const progressPercent: number =
    todaysHabits.length > 0
      ? Math.round((completedCount / todaysHabits.length) * 100)
      : 0;

  // Toggling a habit and showing a toast message for feedback
  const handleToggle = (id: number, currentlyDone: boolean): void => {
    toggleHabit(id);
    setToast({
      message: currentlyDone ? "Marked as pending" : "Habit completed!",
      type: currentlyDone ? "error" : "success",
    });
  };

  return (
    <div className={styles.page}>
      {/* Date and greeting */}
      <div className={styles.header}>
        <p className={styles.dateLabel}>{dateLabel}</p>
        <h1 className={styles.greeting}>Good morning {getGreetingEmoji()}</h1>
      </div>

      {/* Four summary stat cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.green}`}>
          <p className={styles.statLabel}>Total Habits</p>
          <p className={styles.statValue}>{habits.length}</p>
          <p className={styles.statSub}>being tracked</p>
        </div>
        <div className={`${styles.statCard} ${styles.purple}`}>
          <p className={styles.statLabel}>Completed Today</p>
          <p className={styles.statValue}>{completedCount}</p>
          <p className={styles.statSub}>of {todaysHabits.length} today</p>
        </div>
        <div className={`${styles.statCard} ${styles.orange}`}>
          <p className={styles.statLabel}>Best Streak</p>
          <p className={styles.statValue}>{getBestStreak()}</p>
          <p className={styles.statSub}>days 🔥</p>
        </div>
        <div className={`${styles.statCard} ${styles.blue}`}>
          <p className={styles.statLabel}>Categories</p>
          <p className={styles.statValue}>{getCategoryCount()}</p>
          <p className={styles.statSub}>active areas</p>
        </div>
      </div>

      {/* Progress bar — width is set as an inline style based on the percentage */}
      <div className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <span className={styles.progressTitle}>Today's Progress</span>
          <span className={styles.progressPct}>{progressPercent}%</span>
        </div>
        <div className={styles.progressBg}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className={styles.progressSub}>
          {todaysHabits.length === 0
            ? "No habits scheduled for today"
            : completedCount === todaysHabits.length
              ? "All done for today! Great work 🎉"
              : `${todaysHabits.length - completedCount} habit${
                  todaysHabits.length - completedCount > 1 ? "s" : ""
                } remaining`}
        </p>
      </div>

      {/* Today's habits list */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Today's Habits</h2>
      </div>

      <div className={styles.habitList}>
        {todaysHabits.length === 0 ? (
          <div className={styles.empty}>
            <h3>Rest day!</h3>
            <p>No habits are scheduled for today.</p>
          </div>
        ) : (
          todaysHabits.map((habit) => (
            // Wrapping each card in a div so clicking anywhere on the row toggles it
            <div
              key={habit.id}
              onClick={() => handleToggle(habit.id, habit.completedToday)}
              style={{ cursor: "pointer" }}
            >
              {/* showActions is false then dashboard is just for quick toggling */}
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

export default Dashboard;
