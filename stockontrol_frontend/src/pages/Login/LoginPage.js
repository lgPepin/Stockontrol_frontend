import React, { useState, useEffect } from "react";
import LoginHeader from "../../components/Headers/LoginHeader";
import labels from "../../config/labels";
import Axios from "axios";
import Input from "../../common/Input/Input";
import Typography from "../../common/Typography/Typography";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  //-----------------------------------------------------------------------------------
  //REGISTRATION

  // const [usernameReg, setUsernameReg] = useState("");
  // const [passwordReg, setPasswordReg] = useState("");

  // const register = () => {
  //   Axios.post("http://localhost:8080/api/v1/users/register", {
  //     username: usernameReg,
  //     password: passwordReg,
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  //----------------------------------------------------------------------------------
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:8080/api/v1/users/login", {
      username: userName,
      password: password,
    }).then((response) => {
      console.log("Login response:", response);
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data.rows[0].username);
        onLogin();
        navigate("/");
      }
      setTimeout(() => {
        setLoginStatus("");
      }, 5000);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/api/v1/users/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user.rows[0].username);
        onLogin();
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <LoginHeader text={labels.PAGES.LOGIN.LOGIN_PAGE} />
      <div className="row align-items-start ">
        <div className="offset-1 col-10 frame mt-5">
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.LOGIN.USER_NAME()}
              className="label col-2 fw-bold ms-5"
            ></Typography>

            <Input
              type="text"
              name="userName"
              placeholder="Ingrese el nombre del usuario"
              className={`col-8 fs-2 ms-3 value `}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text={labels.LOGIN.PASSWORD()}
              className="label col-2 fw-bold ms-5"
            ></Typography>

            <Input
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              className={`col-8 fs-2 ms-3 value`}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          {loginStatus && (
            <div
              className="alert alert-danger fs-3 mt-4 text-center"
              role="alert"
            >
              {loginStatus}
            </div>
          )}

          <Button
            variant="secondary"
            size="lg"
            className="text-white border-dark mt-5 offset-5 col-2"
            onClick={login}
          >
            {labels.BUTTONS.LOGIN_BUTTON}
          </Button>
        </div>
        {/* --------------------------------------------------------------------------------------- */}
        {/*REGISTRATION*/}

        {/* <div className="offset-1 col-10 mt-5 frame">
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="UsuarioReg"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="userName"
              // value={categoryName}
              placeholder="Ingrese el nombre del usuario"
              className={`col-8 fs-2 ms-3 value ${
                errors.userName ? "error-border" : ""
              }`}
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
            />
          </div>
          <div className="value_label_container mb-4">
            <Typography
              level="p"
              text="PasswordReg"
              className="label col-2 fw-bold"
            ></Typography>

            <Input
              type="text"
              name="password"
              // value={categoryName}
              placeholder="Ingrese su contraseña"
              className={`col-8 fs-2 ms-3 value ${
                errors.password ? "error-border" : ""
              }`}
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />
          </div>

          {confirmationMessage && (
            <div className={`mt-3 fs-3 text-${messageType}`}>
              <Typography level="p" text={confirmationMessage} />
            </div>
          )}
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark mt-5 offset-5 col-2"
            onClick={register}
          >
            Register
          </Button>
        </div> */}
        {/* ------------------------------------------------------------------------------------- */}
      </div>
    </>
  );
};

export default LoginPage;
