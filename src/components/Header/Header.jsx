import { useState, useReducer, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import useLocalStorage from "../hooks/modalLocaleStorage"; // твой хук
import Modal from "../Modal/Modal"; // твой компонент модалки
import s from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user.png";

// пример reducer для состояния
function reducer(state, action) {
  switch (action.type) {
    case "SUBMIT":
      return { ...state, isSubmitted: true };
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true };
    case "CLOSE":
      return { ...state, isModalOpen: false };
    case "ESC":
      return { ...state, isModalOpen: false };
    case "EDIT_MODAL":
      return { ...state, isModalOpen: true };
    case "MOBILE_OPEN":
      return { ...state, isModalOpen: true };
    default:
      return state;
  }
}

export default function Header() {
  const initialState = {
    isSubmitted: false,
    isModalOpen: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [username, setUsername] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim() !== "") {
      dispatch({ type: "SUBMIT" });
    }
  }

  function openMenu() {
    setIsBurgerOpen(true);
    setTimeout(() => setMenuVisible(true), 10);
  }

  function closeMenu() {
    setMenuVisible(false);
    setTimeout(() => setIsBurgerOpen(false), 400);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        dispatch({ type: "ESC" });
        closeMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className={s.header}>
      <div className="container">
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
            {state.isSubmitted ? (
              <div className={s.userSub}>
                <h5 className={s.name}>Welcome, {username}</h5>
                <button
                  onClick={() => {
                    dispatch({ type: "EDIT_MODAL" });
                    setIsEditing(true);
                  }}
                  className={s.edit}
                >
                  <MdModeEdit /> <span className="editSpan">Edit</span>
                </button>
              </div>
            ) : (
              <button
                className={s.signUpBtn}
                onClick={() => dispatch({ type: "OPEN_MODAL" })}
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
                  strokeLinecap="round"
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
                  strokeLinecap="round"
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
            {state.isSubmitted ? (
              <h5 className={s.menuName}>Welcome, {username}</h5>
            ) : (
              <button
                className={s.menuSignUpBtn}
                onClick={() => {
                  dispatch({ type: "MOBILE_OPEN" });
                  closeMenu();
                }}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      )}

      {state.isModalOpen && (
        <Modal
          name={username}
          nameChange={(e) => setUsername(e.target.value)}
          email={email}
          emailChange={(e) => setEmail(e.target.value)}
          password={password}
          passwordChange={(e) => setPassword(e.target.value)}
          close={() => dispatch({ type: "CLOSE" })}
          onSubmit={handleSubmit}
          closeOnBackdrop={true}
          edit={isEditing}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      )}
    </header>
  );
}