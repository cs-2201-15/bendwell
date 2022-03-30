import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./signup.scss";

export default function SignUp() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;
      alert("You have successfully created an Account!");
      navigate(`/createaccount`);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center" id="login-container">
      <div className="col-6 form-widget" aria-live="polite" id="content-container">
        <h2 className="description">Create an Account!</h2>
        <h3 className="login">Already have an account? <Link to="/login">Login</Link></h3>
        {loading ? (
          "Loading..."
        ) : (
          <form onSubmit={handleLogin}>
            <div className="content-block">
              <label htmlFor="email" id="email-label">Email</label>
              <input
                id="email"
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="content-block">
              <label htmlFor="password" id="pass-label">Password</label>
              <input
                id="password"
                className="inputField"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="button block" aria-live="polite" id="create-btn">
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
