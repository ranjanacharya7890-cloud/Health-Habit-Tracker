export type Category = "health" | "fitness" | "mindset" | "learning" | "other";

export type DayName = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type Habit = {
  id: number;
  name: string;
  category: Category;
  description: string;
  targetDays: DayName[];
  streak: number;
  completedToday: boolean;
  createdAt: string; // stored as "YYYY-MM-DD"
};

const defaultHabits: Habit[] = [
  {
    id: 1,
    name: "Morning meditation",
    category: "mindset",
    description: "10 minutes of quiet mindfulness to start the day",
    targetDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    streak: 12,
    completedToday: false,
    createdAt: "2025-01-01",
  },
  {
    id: 2,
    name: "Read 20 pages",
    category: "learning",
    description: "Read any non-fiction book for at least 20 pages",
    targetDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    streak: 5,
    completedToday: false,
    createdAt: "2025-01-05",
  },
  {
    id: 3,
    name: "30 min walk",
    category: "fitness",
    description: "Outdoor walk after lunch",
    targetDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    streak: 8,
    completedToday: true,
    createdAt: "2025-01-03",
  },
  {
    id: 4,
    name: "Drink 2L of water",
    category: "health",
    description: "Track hydration throughout the day",
    targetDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    streak: 21,
    completedToday: true,
    createdAt: "2024-12-20",
  },
  {
    id: 5,
    name: "Journal entry",
    category: "mindset",
    description: "Write about gratitude and daily goals",
    targetDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    streak: 3,
    completedToday: false,
    createdAt: "2025-01-10",
  },
  {
    id: 6,
    name: "Code for 1 hour",
    category: "learning",
    description: "Work on personal side projects",
    targetDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    streak: 7,
    completedToday: false,
    createdAt: "2025-01-08",
  },
];

export default defaultHabits;
