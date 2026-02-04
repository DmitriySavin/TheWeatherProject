import s from "../Modal/Modal.module.css";
import { IoMdClose } from "react-icons/io";

export default function Modal({
  name,
  nameChange,
  email,
  emailChange,
  password,
  passwordChange,
  close,
  onSubmit,
}) {
  return (
    <div className={s.backdrop} onClick={(e) => {
    if (e.target === e.currentTarget) close();
  }}>
      <div className={s.modal}>
        <h2 className={s.title}>Sign up</h2>
        <form onSubmit={onSubmit}>
          <div className={s.fields}>
            <ul className={s.list}>
              <li className={s.item}>
                <label className={s.label}>
                  Username:
                  <input
                    type="name"
                    className={s.input}
                    value={name}
                    onChange={nameChange}
                    placeholder="Username"
                  />
                </label>
              </li>
              <li className={s.item}>
                <label className={s.label}>
                  E-Mail:
                  <input
                    type="email"
                    className={s.input}
                    value={email}
                    onChange={emailChange}
                    placeholder="E-Mail"
                  />
                </label>
              </li>
              <li className={s.item}>
                <label className={s.label}>
                  Password:
                  <input
                    type="password"
                    className={s.input}
                    value={password}
                    onChange={passwordChange}
                    placeholder="Password"
                  />
                </label>
              </li>
            </ul>
          </div>
          <div className={s.wrapper}>
            <button className={s.signUpBtn}>Sign Up</button>
            <p className={s.question}>
              Already have an account? <a href="#">Login</a>
            </p>
          </div>
        </form>
        <button className={s.closeBtn} onClick={close}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}
