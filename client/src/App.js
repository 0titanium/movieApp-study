import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import MovieDetail from "./components/views/MovieDetail/MovieDetail";
// import FavortiePage from "./components/views/MovieDetail/Sections/Favorite";
import Footer from "./components/views/Footer/Footer";
import Auth from "./hoc/auth";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          {/* <Route exact path="/favorite" component={Auth(FavoritePage, true)} /> */}
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
