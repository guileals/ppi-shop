import { CartContext } from "../store/shopping-cart-context";
import { useContext, useState } from "react";
import styles from "./Auth.module.css";

export default function Auth() {
  const {
    session,
    sessionLoading,
    sessionError,
    handleSignUp,
    handleSignIn,
    handleLogout,
  } = useContext(CartContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.form}>
      <h2>Credentials</h2>
      {sessionError && <p style={{ color: "red" }}>{sessionError}</p>}
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
      {session ? (
        <div className={styles.actions}>
          <button onClick={handleLogout} disabled={sessionLoading}>
            {sessionLoading ? "Logging out..." : "LOGOUT"}
          </button>
        </div>
      ) : (
        <div className={styles.actions}>
          <button
            onClick={() => handleSignIn(email, password)}
            disabled={sessionLoading}
          >
            {sessionLoading ? "Logging in..." : "LOGIN"}
          </button>
          <button
            onClick={() => handleSignUp(firstName, lastName, email, password)}
            disabled={sessionLoading}
          >
            {sessionLoading ? "Signing up..." : "SIGN UP"}
          </button>
        </div>
      )}
    </div>
  );

  //   const {} = useContext(CartContext);

  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  // return (
  //   <>
  //     <form method="post" className={classes.form}>
  //       <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
  //       <p>
  //         <label htmlFor="email">Email</label>
  //         <input id="email" type="email" name="email" required />
  //       </p>
  //       <p>
  //         <label htmlFor="password">Password</label>
  //         <input id="password" type="password" name="password" required />
  //       </p>
  //       <div className={classes.actions}>
  //         <button onClick={switchAuthHandler} type="button">
  //           {isLogin ? "Create new user" : "Login"}
  //         </button>
  //         <button>Save</button>
  //       </div>
  //     </form>
  //   </>
  // );
}
