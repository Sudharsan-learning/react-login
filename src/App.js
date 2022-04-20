import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [register, setRegister] = useState(false);
  const [token, setToken] = useState(null);
  const [loginToken, setLoginToken] = useState(null);
  const [userData, setUserData] = useState([]);
  const [sorting, setSorting] = useState([]);

  const user = async () => {
    const res = await axios.get("https://reqres.in/api/users");

    console.log(res);
    if (res.status === 200) {
      setUserData(res.data.data);
    }
  };

  useEffect(() => {
    user();
  }, []);

  const sortAscending = () => {
    const sortAscPrices = [...userData];
    sortAscPrices.sort((a, b) => a.id - b.id);
    setUserData(sortAscPrices);
  };

  const sortDescending = () => {
    const sortDescPrices = [...userData];
    sortDescPrices.sort((a, b) => a.id - b.id).reverse();
    setUserData(sortDescPrices);
  };
  
  if (localStorage.rememberme && localStorage.token == "QpwL5tke4Pnpja7X4") {
    return (
      <>
      <div className="App">
          <button onClick={sortAscending}>asc</button>
          <button onClick={sortDescending} style={{ marginLeft: "10px" }}>
            desc
          </button>
          <div className="flex flex-wrap justify-center">
            {userData &&
              userData.map((data) => {
                return (
                  <div key={data.id}>
                    <div className="wrapper">
                      <div className="img-area">
                        <div className="inner-area">
                          <img src={data.avatar} alt="" />
                        </div>
                      </div>
                      <div className="name">
                        {data.first_name} {data.last_name}
                      </div>
                      <div className="about">{data.email}</div>
                    </div>
                  </div>
                );
              })}
          </div>
</div>
        </>
    );
  }

  return (
    <div className="App">
      {token && token === loginToken ? (
        <>
          <button onClick={sortAscending}>asc</button>
          <button onClick={sortDescending} style={{ marginLeft: "10px" }}>
            desc
          </button>
          <div className="flex flex-wrap justify-center">
            {userData &&
              userData.map((data) => {
                return (
                  <div key={data.id}>
                    <div className="wrapper">
                      <div className="img-area">
                        <div className="inner-area">
                          <img src={data.avatar} alt="" />
                        </div>
                      </div>
                      <div className="name">
                        {data.first_name} {data.last_name}
                      </div>
                      <div className="about">{data.email}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      ) : register ? (
        <Login setLoginToken={setLoginToken} />
      ) : (
        <Register setRegister={setRegister} setToken={setToken} />
      )}
    </div>
  );
}

export default App;
