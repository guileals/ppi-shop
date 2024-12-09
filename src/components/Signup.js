import { CartContext } from "../store/shopping-cart-context";
import { useContext, useState } from "react";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { session, sessionLoading, sessionError, handleSignUp, handleLogout } =
    useContext(CartContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function signUpClicked() {
    handleSignUp(firstName, lastName, email, password);
    if(!sessionError) {
        navigate("/");
    }
  }

  function logoutClicked() {
    handleLogout();
    navigate("/auth");
  }

  return (
    <div className={styles.form}>
      <h2>Credentials to Sign Up</h2>

      {/* If there is a session error... */}
      {sessionError && <p style={{ color: "red" }}>{sessionError}</p>}

      {/* Testing if user already logged in... */}
      {session ? (
        <div className={styles.actions}>
          <h3>
            Welcome, {session.user.user_metadata.first_name}{" "}
            {session.user.user_metadata.last_name}
          </h3>
          <button onClick={logoutClicked} disabled={sessionLoading}>
            {sessionLoading ? "Logging out..." : "LOGOUT"}
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.actions}>
            <button
              onClick={signUpClicked}
              disabled={sessionLoading}
            >
              {sessionLoading ? "Signing up..." : "SIGN UP"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
