import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
//import { Test } from "./Test";
//import {useState1} from './useMyState'

const com = { com: App };
export const Context = React.createContext({ value: 0 });
function App(props) {
  // const [state, setState] = useState1(com, 0)
  const [state, setState] = useState({ value: 1 });
  const [state1, setState1] = useState(1);
  // const [a, setA] = useState1(com, 'a')
  // const [b, setB] = useState1(com, 'b')
  // setMyState(1)
  // 定义视图内容, 类似 path 和 component
  const routes = {
    home: "<h1>Home Page</h1><p>Welcome to the homepage!</p>",
    about: "<h1>About Page</h1><p>Learn more about us.</p>",
    contact: "<h1>Contact Page</h1><p>Contact us here.</p>",
  };

  // 渲染视图的函数
  function renderView(view) {
    const contentDiv = document.getElementById("content");

    if (!routes[view]) {
      window.history.replaceState({ view: "home" }, "", "/");
      contentDiv.innerHTML = routes["home"];
      return;
    }
    contentDiv.innerHTML = routes[view] || "<h1>404 - Page Not Found</h1>";
  }

  // 路由处理函数
  function navigateTo(view) {
    // 手动更新 URL
    window.history && window.history.pushState({ view }, "", view);
    renderView(view);
  }

  useEffect(() => {
    //事件监听
    document.getElementById("home").addEventListener("click", (e) => {
      e.preventDefault(); // 阻止默认行为
      navigateTo("home"); // 跳转到首页
    });

    document.getElementById("about").addEventListener("click", (e) => {
      e.preventDefault();
      // 改变 url
      navigateTo("about"); // 跳转到关于页
    });

    document.getElementById("contact").addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("contact"); // 跳转到联系页
    });

    // url hash 部分改变会触发 window.onpopstate, 监听 popstate 事件以处理浏览器的后退和前进
    window.onpopstate = (event) => {
      if (event.state) {
        renderView(event.state.view);
      } else {
        renderView("home");
      }
    };
    renderView(window.location.pathname.substring(1));
    // 初始渲染触发一次
    // renderView(window.location.pathname.substring("1")); // 根据 path 渲染对应内容
    // window.addEventListener("hashchange", () => {
    //   console.log(window.location.hash);
    //   renderView(window.location.hash.substring(2));
    // });
    // renderView(window.location.hash.substring(2));
  }, []);

  return (
    <div
      className="App"
      onClick={() => {
        setState({});
      }}
    >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Context.Provider value={state}>
        <nav>
          <a id="home">Home</a>
          <a id="about">About</a>
          <a id="contact">Contact</a>
        </nav>

        <div id="content"></div>
      </Context.Provider>
    </div>
  );
}

export default App;
