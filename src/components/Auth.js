import { CartContext } from "../store/shopping-cart-context";
import { useContext, useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { session, sessionLoading, sessionError, handleSignIn, handleLogout } =
    useContext(CartContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function signinClicked() {
    handleSignIn(email, password);
    if (!sessionError) {
      navigate("/");
    }
  }

  return (
    <div className={styles.form}>
      <h2>Credentials to Login</h2>
      {sessionError && <p style={{ color: "red" }}>{sessionError}</p>}
      {session ? (
        <div className={styles.actions}>
          <h3>
            Welcome, {session.user.user_metadata.first_name}{" "}
            {session.user.user_metadata.last_name}
          </h3>
          <button onClick={() => handleLogout()} disabled={sessionLoading}>
            {sessionLoading ? "Logging out..." : "LOGOUT"}
          </button>
        </div>
      ) : (
        <>
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
            <button onClick={signinClicked} disabled={sessionLoading}>
              {sessionLoading ? "Logging in..." : "LOGIN"}
            </button>
          </div>
        </>
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
