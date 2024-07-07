import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token_foodScan")) {
      history.push("/admin/dashboard");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const injectData = () => {
    setEmail("eng.ahmedkamal357@gmail.com");
    setPassword("010660569699");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both email and password are required");
      return;
    }

    localStorage.setItem("token_foodScan", "true");
    setError("Success login, please wait!");

    let Loader = document.getElementById("Loader");
    if (Loader) {
      Loader.classList.add("show");
      setTimeout(() => {
        Loader.classList.remove("show");
        history.push("/admin/dashboard");
      }, 2000);
    }
  };

  return (
    <div className="formUser">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form
                className="card-body p-lg-5"
                method="POST"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                {error && (
                  <div
                    style={{
                      color:
                        error === "Success login, please wait!"
                          ? "green"
                          : "red",
                    }}
                  >
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="pb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="pb-2">
                    Password (123)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-2 w-100"
                  >
                    Login
                  </button>
                </div>
                <div className="changeRoute form-class-ext-center text-dark">
                  <a href="#" className="text-dark fw-bold">
                    Forget password?
                  </a>
                </div>
              </form>
            </div>

            <div className="card my-5 roles">
              <button
                style={{ "--bg": "#F97316", "--bgh": "#e16811" }}
                onClick={injectData}
              >
                Admin
              </button>
              <button
                style={{ "--bg": "#0284C7", "--bgh": "#028cd1" }}
                onClick={injectData}
              >
                Branch Manager
              </button>
              <button
                style={{ "--bg": "#A855F7", "--bgh": "#974ddd" }}
                onClick={injectData}
              >
                POS Operator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
