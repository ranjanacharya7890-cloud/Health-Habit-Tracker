import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? `${styles.tab} ${styles.activeTab}` : styles.tab;

  return (
    <nav className={styles.navbar}>
      {/* Logo image + app name */}
      <div className={styles.brand}>
        <img src={logo} alt="Habiter logo" className={styles.logo} />
        <span className={styles.brandName}>Habiter</span>
      </div>

      <div className={styles.tabs}>
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/habits" className={linkClass}>
          All Habits
        </NavLink>
        <NavLink to="/today" className={linkClass}>
          Today
        </NavLink>
      </div>

      <button className={styles.addBtn} onClick={() => navigate("/add")}>
        + Add Habit
      </button>
    </nav>
  );
}

export default Navbar;
