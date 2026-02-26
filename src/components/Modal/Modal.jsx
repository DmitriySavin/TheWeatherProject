import { useState } from "react";
import s from "../Modal/Modal.module.css";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

export default function Modal({
  name,
  email,
  password,
  close,
  onSubmit,
  edit,
  setUsername,
  setEmail,
  setPassword,
}) {

  const initialName = name;
  const initialEmail = email;
  const initialPassword = password;



  const [namee, setName] = useState(name);
  const [mail, setMail] = useState(email);
  const [pass, setPass] = useState(password);
  const [isLoading, setIsLoading] = useState(false);



  const isDirty =
    namee !== initialName ||
    mail !== initialEmail ||
    pass !== initialPassword;



  const isFormValid =
    namee.trim() !== "" &&
    mail.trim() !== "" &&
    pass.trim() !== "";

    

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all fields");
      return;
    }

    if (edit && !isDirty) {
      toast.info("No changes detected");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast.success(
        edit
          ? "Account updated successfully!"
          : "Account created successfully!"
      );

      setUsername(namee);
      setEmail(mail);
      setPassword(pass);

      onSubmit({ preventDefault: () => {} });
      setIsLoading(false);
      close();
    }, 500);
  };









  return (
    <div
      className={s.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <div className={s.modal}>
        <h2 className={s.title}>{edit ? "Edit Profile" : "Sign up"}</h2>

        <form onSubmit={handleSubmit}>
          <div className={s.fields}>
            <ul className={s.list}>
              <li className={s.item}>
                <label className={s.label}>
                  Username:
                  <input
                    type="text"
                    className={s.input}
                    value={namee}
                    onChange={(e) => setName(e.target.value)}
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
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
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
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Password"
                  />
                </label>
              </li>
            </ul>
          </div>

          <div className={s.wrapper}>
            <button
              type="submit"
              className={s.signUpBtn}
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : edit
                ? "Edit"
                : "Sign Up"}
            </button>

            {!edit && (
              <p className={s.question}>
                Already have an account? <a href="#">Login</a>
              </p>
            )}
          </div>
        </form>

        <button className={s.closeBtn} onClick={close}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}