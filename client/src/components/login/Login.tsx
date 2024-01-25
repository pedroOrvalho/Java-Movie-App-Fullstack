import axios from "axios";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { Movie } from "../../Types";
import { User } from "../../App";

import "./Login.css";

type Props = {
  movies: Movie[];
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
  userInfo: User;
  user: User;
};

export default function Login({ movies, setUserInfo, userInfo, user }: Props) {
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/users/login", userInfo)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("userId", res.data.id);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("Account not found. Please register, before login in.");
          navigate("/register");
          return;
        }
      });

    setUserInfo(user);
  };

  return (
    <div className="login-container">
      <div className="login-carousel-container">
        <Carousel indicators={false} autoPlay={false}>
          {movies.map((movie) => {
            return (
              <Paper>
                <div className="movie-card-container">
                  <div
                    className="movie-card"
                    style={
                      {
                        "--img": `url(${movie.backdrops[0]})`,
                      } as React.CSSProperties
                    }
                  >
                    <div className="login-form-container">
                      <h1>Have an account?</h1>
                      <div className="login-form-info-container">
                        {/*
                          
                          <input type="text" required />
                          <button type="submit">login</button>
                          */}
                        <form
                          className="row g-1 m-4 mt-5"
                          onSubmit={(e) => onSubmit(e)}
                        >
                          <div className="col form-floating mb-4">
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              placeholder="Enter email"
                              value={userInfo.email}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  email: e.target.value,
                                })
                              }
                              required
                            />
                            <label htmlFor="email">Email</label>
                          </div>
                          <div className="form-floating mb-4">
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Password"
                              value={userInfo.password}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  password: e.target.value,
                                })
                              }
                              required
                            />
                            <label htmlFor="password">Password</label>
                          </div>
                          <button
                            className="btn btn-outline-info btn-lg"
                            type="submit"
                          >
                            Sign In
                          </button>
                          <div className="go-to-login-container pt-4">
                            <h4>
                              Not registered?{" "}
                              <span>
                                <Link id="link" to="/login">
                                  Register
                                </Link>
                              </span>
                            </h4>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

