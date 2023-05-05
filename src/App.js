import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux'

import {Header}from "./Components";
import {Home,Cart} from './pages';

function App(){
  return(
    <div className="App">
      <div className="wrapper">
        <Header />      
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/bucket" element={<Cart/>}/>
          </Routes>
        </div>
    </div>
  </div>
)
}

export default App;