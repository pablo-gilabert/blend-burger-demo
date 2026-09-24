import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/icons/logo.jpg";

import styles from "./navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedOutsideMenu =
        menuRef.current && !menuRef.current.contains(target);

      const clickedOutsideButton =
        buttonRef.current && !buttonRef.current.contains(target);

      if (clickedOutsideMenu && clickedOutsideButton) {
        closeMenu();
      }
    };

    const handleScroll = () => {
      closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <Link
        to="/"
        className={styles.logoLink}
        onClick={closeMenu}
      >
        <img
          src={logo}
          alt="Blend Burger"
          className={styles.logo}
        />
      </Link>

      <button
        ref={buttonRef}
        className={`${styles.menuButton} ${
          menuOpen ? styles.menuButtonOpen : ""
        }`}
        type="button"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        ref={menuRef}
        className={`${styles.menu} ${
          menuOpen ? styles.menuOpen : ""
        }`}
      >
        <Link to="/" onClick={closeMenu}>
          INICIO
        </Link>

        <Link to="/menu" onClick={closeMenu}>
          MENU
        </Link>

        <Link to="/about" onClick={closeMenu}>
          NOSOTROS
        </Link>

        <Link to="/contact" onClick={closeMenu}>
          CONTACTO
        </Link>

        <Link to="/ordernow" onClick={closeMenu}>
          PEDIR AHORA
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;