import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import defaultHabits from "../data/habits";
import type { Habit, Category, DayName } from "../data/habits";

// Defining the shape of everything the context exposes to components.
interface HabitContextType {
  habits: Habit[];
  filter: string;
  setFilter: (f: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  getTodaysHabits: () => Habit[];
  getCompletedCount: () => number;
  getBestStreak: () => number;
  getCategoryCount: () => number;
  getFilteredHabits: () => Habit[];
  toggleHabit: (id: number) => void;
  addHabit: (data: NewHabitData) => void;
  updateHabit: (id: number, data: Partial<NewHabitData>) => void;
  deleteHabit: (id: number) => void;
}

// Defining what fields are needed when creating or updating a habit.
export interface NewHabitData {
  name: string;
  category: Category;
  description: string;
  targetDays: DayName[];
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

// Custom hook so components can write useHabits() instead of useContext(HabitContext).
export function useHabits(): HabitContextType {
  const ctx = useContext(HabitContext);
  if (!ctx) throw new Error("useHabits must be used inside HabitProvider");
  return ctx;
}

// The provider wraps the whole app so every component can access habit data.

export function HabitProvider({ children }: { children: ReactNode }) {
  // Loading habits from localStorage if they exist, otherwise using default data.
  // The type annotation tells TypeScript this state holds an array of Habit objects.
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem("habitly-habits");
    return saved ? (JSON.parse(saved) as Habit[]) : defaultHabits;
  });

  // Tracking which filter button is active: "all", "done", or "pending"
  const [filter, setFilter] = useState<string>("all");

  // Tracking whatever the user has typed into the search box
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Saving to localStorage every time habits changes so data persists on refresh
  useEffect(() => {
    localStorage.setItem("habitly-habits", JSON.stringify(habits));
  }, [habits]);

  // Working out today's short day name e.g. "Mon", "Tue" to match targetDays
  const getDayName = (): DayName => {
    const days: DayName[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date().getDay()];
  };

  // Returning only the habits that are scheduled for today
  const getTodaysHabits = (): Habit[] => {
    const today = getDayName();
    return habits.filter((h) => h.targetDays.includes(today));
  };

  // Counting how many of today's habits are marked as done
  const getCompletedCount = (): number =>
    getTodaysHabits().filter((h) => h.completedToday).length;

  // Finding the highest streak value across all habits
  const getBestStreak = (): number =>
    habits.length === 0 ? 0 : Math.max(...habits.map((h) => h.streak));

  // Counting unique categories currently in use
  const getCategoryCount = (): number =>
    new Set(habits.map((h) => h.category)).size;

  // Toggling a habit done/not done and adjusting its streak accordingly
  const toggleHabit = (id: number): void => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;
        const nowDone = !habit.completedToday;
        return {
          ...habit,
          completedToday: nowDone,
          streak: nowDone ? habit.streak + 1 : Math.max(0, habit.streak - 1),
        };
      }),
    );
  };

  // Adding a new habit: auto-generating the id, streak, completedToday, and createdAt
  const addHabit = (data: NewHabitData): void => {
    const newHabit: Habit = {
      ...data,
      id: Date.now(),
      streak: 0,
      completedToday: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  // Updating only the fields passed in — spreading the old habit first
  // so unchanged fields are preserved. Partial<NewHabitData> means any subset of fields.
  const updateHabit = (id: number, data: Partial<NewHabitData>): void => {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, ...data } : habit)),
    );
  };

  // Removing a habit by filtering out the one with the matching id
  const deleteHabit = (id: number): void => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // Applying filter and search to produce the list shown on the habits page
  const getFilteredHabits = (): Habit[] => {
    let list = [...habits];
    if (filter === "done") list = list.filter((h) => h.completedToday);
    if (filter === "pending") list = list.filter((h) => !h.completedToday);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.category.toLowerCase().includes(q),
      );
    }
    return list;
  };

  // Bundling everything into the value object that the context shares
  const value: HabitContextType = {
    habits,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    getTodaysHabits,
    getCompletedCount,
    getBestStreak,
    getCategoryCount,
    getFilteredHabits,
    toggleHabit,
    addHabit,
    updateHabit,
    deleteHabit,
  };

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
}
