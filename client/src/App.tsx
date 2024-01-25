import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Layout from "./components/Layout";
import Nav from "./components/nav/Nav";
import Trailer from "./components/trailer/Trailer";

import { Movie } from "./Types";
import "./App.css";
import Review from "./components/reviews/Reviews";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

export type User = {
  email: string;
  password: string;
};

const user: User = {
  email: "",
  password: "",
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [userInfo, setUserInfo] = useState<User>(user);

  const getMovies = async () => {
    try {
      const movieList = await axios("http://localhost:8080/movies");
      setMovies(movieList.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route
            path="/login"
            element={
              <Login
                movies={movies}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                user={user}
              />
            }
          />
          <Route path="/register" element={<Register movies={movies} />} />
          <Route path="/trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/reviews/:movieId" element={<Review />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
