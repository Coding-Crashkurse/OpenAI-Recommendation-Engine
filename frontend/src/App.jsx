import { useState } from "react";
import Register from "./components/Register";
import SignIn from "./components/Signin";
import Chat from "./components/Chat";

function App() {
  const [register, setRegister] = useState(true);
  const [loggedIn, setLogin] = useState(false);

  const [formValues, setFormValues] = useState({
    username: "",
    level: "Beginner",
    interests: "",
    email: "",
    password: "",
    is_active: true,
    is_superuser: false,
    is_verified: false,
  });
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const toggleRegister = (value) => {
    setRegister(value);
  };

  const toggleLogin = (value) => {
    setLogin(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLoginValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  if (!loggedIn) {
    return (
      <div className="md:py-60">
        <h1 className="text-center p-4 text-4xl text-white font-bold">
          TrainAI - Dein smarter Fitnesstrainer
        </h1>
        {register ? (
          <Register
            handleChange={handleChange}
            toggleRegister={toggleRegister}
            formValues={formValues}
          ></Register>
        ) : (
          <SignIn
            handleLogin={handleLogin}
            toggleRegister={toggleRegister}
            loginValues={loginValues}
            toggleLogin={toggleLogin}
          ></SignIn>
        )}
      </div>
    );
  }

  return (
    <div className="md:py-20">
      <h1 className="text-center p-4 md:text-4xl text-2xl text-white font-bold">
        TrainAI - Dein smarter Fitnesstrainer
      </h1>
      <Chat></Chat>
    </div>
  );
}

export default App;
