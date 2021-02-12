import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import Loader from "./Common/Loader/Loader";
import { loaderService } from "./Common/Loader/Loader.service";
import SimpleSnackbar from "./Common/Snackbar/Snackbar";
import Login from "./Components/Account/Login/Login";
import Chat from "./Components/Feature/Chat/Chat";
import Sidebar from "./Components/Layout/Sidebar/Sidebar";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./Firebase/Firebase";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    loaderService.getLoaderSubject().subscribe((loadingState) => {
      setLoading(loadingState);
    });

    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);

      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
        loaderService.showLoader(false);
        // user is logged in
      } else {
        dispatch(logout());
        auth.signOut();

        loaderService.showLoader(false);

        // logged out
      }
    });
  }, [dispatch]);
  const user = useSelector(selectUser);
  return (
    <div className="app">
      {loading ? <Loader /> : null}
      <SimpleSnackbar />

      {user ? (
        <Fragment>
          <Sidebar />
          <Chat />
        </Fragment>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
