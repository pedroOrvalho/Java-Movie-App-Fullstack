import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { Button } from "react-bootstrap";

import { Movie } from "../../Types";

import "./Register.css";
import e from "cors";
import axios from "axios";
import { Link } from "react-router-dom";

type Props = {
  movies: Movie[];
};

type UserRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const userRegister: UserRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function Register({ movies }: Props) {
  const [registerInfo, setRegisterInfo] = useState<UserRegister>(userRegister);

  const onSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/users", registerInfo)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="register-container">
      <Carousel indicators={false}>
        {movies.map((movie) => {
          return (
            <Paper>
              <div className="movie-card-container">
                <div
                  className="movie-card"
                  style={
                    {
                      "--img": `url(${movie.backdrops[1]})`,
                    } as React.CSSProperties
                  }
                >
                  <div className="register-form-container">
                    <h1>Don't have an account?</h1>
                    <div className="register-form-info-container ">
                      <form
                        className="row g-2 m-3"
                        onSubmit={(e) => onSubmit(e)}
                      >
                        <div className="form-floating col mb-4 ">
                          <input
                            type="firstName"
                            className="form-control"
                            id="firstName"
                            placeholder=""
                            required
                            onChange={(e) =>
                              setRegisterInfo({
                                ...registerInfo,
                                firstName: e.target.value,
                              })
                            }
                          />
                          <label htmlFor="email">First name</label>
                        </div>
                        <div className="col form-floating mb-4">
                          <input
                            type="lastName"
                            className="form-control"
                            required
                            id="email"
                            placeholder="Enter email"
                            onChange={(e) =>
                              setRegisterInfo({
                                ...registerInfo,
                                lastName: e.target.value,
                              })
                            }
                          />
                          <label htmlFor="email">Last name</label>
                        </div>
                        <div className="form-floating mb-4">
                          <input
                            type="email"
                            className="form-control"
                            required
                            placeholder=""
                            onChange={(e) =>
                              setRegisterInfo({
                                ...registerInfo,
                                email: e.target.value,
                              })
                            }
                          />
                          <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-4">
                          <input
                            type="password"
                            className="form-control"
                            required
                            placeholder=""
                            onChange={(e) =>
                              setRegisterInfo({
                                ...registerInfo,
                                password: e.target.value,
                              })
                            }
                          />
                          <label htmlFor="email">Password</label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-outline-info btn-lg"
                        >
                          Sign up
                        </button>
                        <div className="go-to-login-container pt-4">
                          <h4>
                            If you already have an account,{" "}
                            <span>
                              <Link id="link" to="/login">
                                Sign In
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
  );
}
