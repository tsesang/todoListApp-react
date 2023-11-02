import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoComponent from "./component/Todo";

function App() {
  return (
    <div style={{ width: "30%", marginLeft: "40%" ,marginTop:"5%"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
