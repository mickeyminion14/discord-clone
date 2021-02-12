import { Button } from "@material-ui/core";
import React from "react";
import "./Login.scss";
import logo from "../../../../assets/search.svg";
import { auth, provider } from "../../../Firebase/Firebase";
import { loaderService } from "../../../Common/Loader/Loader.service";

function Login() {
  const signIn = () => {
    loaderService.showLoader(true);
    auth.signInWithRedirect(provider);
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://download.logo.wine/logo/Discord_(software)/Discord_(software)-Logo.wine.png"
          alt=""
        />
      </div>
      <Button onClick={signIn}>
        <img src={logo} className="googleLogo" alt="" /> Continue with Google
      </Button>
    </div>
  );
}

export default Login;
