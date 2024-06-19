import React from "react";
import "@/style.css";
import "@/style.scss";
import usersImage from "@/assets/users.jpg";

const App = () => {
  return (
    <div>
      <div>Hello world</div>
      <img src={usersImage} />
    </div>
  );
};

export default App;
