import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {useState,useEffect} from 'react'

import {Header}from "./Components";
import {Home,Cart} from './pages';

import axios from 'axios';



function App() {

  const [pizza,setPizza] = useState([]);

useEffect(()=>{
  axios.get(`http://localhost:3000/db.json`).then(({data})=> setPizza(data.pizzas));
  // fetch(`http://localhost:3000/db.json`).then(res => res.json()).then(data => setPizza(data.pizzas)) 
},[])

  return (
    <div className="App">
      <div className="wrapper">
      <Header />      
      <div className="content">
        <Routes>
          <Route path="/" element={<Home pizzas={pizza}/>}/>
          <Route path="/bucket" element={<Cart/>}/>
        </Routes>
      </div>
    </div>
    </div>
  );
}

export default App;
