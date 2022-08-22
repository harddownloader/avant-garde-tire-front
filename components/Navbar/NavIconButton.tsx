import { ButtonHTMLAttributes } from "react";

import styles from "./Navbar.module.css"; // in the final version it should be imported from ui-kit package

interface NavIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: "user" | "bag" | "spyglass" | "menu" | "close" | "sun" | "moon";
  counter?: number;
}

const getIcon = (iconName: NavIconButtonProps["icon"]) => {
  switch (iconName) {
    case "user":
      return <span className="material-icons-outlined">person_outline</span>;
    case "bag":
      return <span className="material-icons-outlined">shopping_bag</span>;
    case "spyglass":
      return <span className="material-icons-outlined">search</span>;
    case "menu":
      return <span className="material-icons-outlined">menu</span>;
    case "close":
      return <span className="material-icons-outlined">close</span>;
    case "sun":
      return <span className="material-icons-outlined">light_mode</span>;
    case "moon":
      return <span className="material-icons-outlined">dark_mode</span>;
    default:
      return iconName;
  }
};

function NavIconButton({ icon, counter, ...rest }: NavIconButtonProps) {
  return (
    <button type="button" className={styles["nav-icon-button"]} {...rest}>
      {getIcon(icon)}
      {!!counter && <span className={styles["nav-icon-counter"]}>{counter}</span>}
    </button>
  );
}

export default NavIconButton;
