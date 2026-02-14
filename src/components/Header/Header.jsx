import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user.png";
import s from "./Header.module.css";
import Modal from "../Modal/Modal";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  function handleSubmit() {
    setIsSubmitted(true);
    setIsModalOpen(false);
  }

  function closeMenu() {
    setMenuVisible(false); // запускає анімацію зникнення
    setTimeout(() => setIsBurgerOpen(false), 400); // видаляємо меню після анімації
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        closeMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function openMenu() {
    setIsBurgerOpen(true);
    setTimeout(() => setMenuVisible(true), 10); // щоб запустити анімацію
  }

  return (
    <header className={s.header}>
      <div>
        <div className={s.headerContainer}>
          <a href="#">
            <img src={logo} alt="Forecast" className={s.logo} />
          </a>

          <nav>
            <ul className={s.headerList}>
              <li>
                <a href="#" className={s.link}>
                  Who we are
                </a>
              </li>
              <li>
                <a href="#" className={s.link}>
                  Contacts
                </a>
              </li>
              <li>
                <a href="#" className={s.link}>
                  Menu
                </a>
              </li>
            </ul>
          </nav>

          <div className={s.headerWrapper}>
            {isSubmitted ? (
              <h5 className={s.name}>Welcome, {username}</h5>
            ) : (
              <button
                className={s.signUpBtn}
                onClick={() => setIsModalOpen(true)}
              >
                Sign Up
              </button>
            )}
            <img src={user} alt="User" className={s.userImg} />
          </div>

          <button
            className={s.burgerBtn}
            onClick={isBurgerOpen ? closeMenu : openMenu}
          >
            {isBurgerOpen ? (
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 8.98529L4.74264 4.74265L0.5 0.500009"
                  stroke="black"
                  stroke-linecap="round"
                />
              </svg>
            ) : (
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 0.5L4.74264 4.74264L8.98528 0.5"
                  stroke="black"
                  stroke-linecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isBurgerOpen && (
        <div className={`${s.menu} ${menuVisible ? s.menuVisible : ""}`}>
          <div className={s.menuHead}>
            <button className={s.closeBtn} onClick={closeMenu}>
              <IoMdClose style={{ color: "black" }} />
            </button>

            <ul className={s.menuList}>
              <li>
                <a href="#" className={s.link}>
                  Who we are
                </a>
              </li>
              <li>
                <a href="#" className={s.link}>
                  Contacts
                </a>
              </li>
              <li>
                <a href="#" className={s.link}>
                  Menu
                </a>
              </li>
            </ul>
          </div>

          <div className={s.menuFooter}>
            {isSubmitted ? (
              <h5 className={s.menuName}>Welcome, {username}</h5>
            ) : (
              <button
                className={s.menuSignUpBtn}
                onClick={() => {
                  setIsModalOpen(true);
                  closeMenu();
                }}
              >
                Sign Up
              </button>
            )}
            <img src={user} alt="User" className={s.menuUserImg} />
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal
          name={username}
          nameChange={(e) => setUsername(e.target.value)}
          email={email}
          emailChange={(e) => setEmail(e.target.value)}
          password={password}
          passwordChange={(e) => setPassword(e.target.value)}
          close={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          closeOnBackdrop={true}
        />
      )}
    </header>
  );
}
