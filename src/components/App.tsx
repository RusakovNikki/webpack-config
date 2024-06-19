import React from "react";
import "@/style.css";
import "@/style.scss";
import usersImage from "@/assets/users.jpg";
import AccountCircle from "@/assets/AccountCircle.svg";

const App = () => {
  return (
    <div>
      <div>Hello world</div>
      <img src={usersImage} />
      <AccountCircle fill={"red"} width={50} height={50} />
    </div>
  );
};

export default App;
