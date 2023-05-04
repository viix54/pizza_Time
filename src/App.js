import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {connect} from 'react-redux'

import {Header}from "./Components";
import {Home,Cart} from './pages';
import store from './redux/store';
import { setPizzas as setPizzasAction } from './redux/actions/pizzas';

import axios from 'axios';



// function App() {

// useEffect(()=>{
//   axios.get(`http://localhost:3000/db.json`).then(({data})=> setPizza(data.pizzas));
//   // fetch(`http://localhost:3000/db.json`).then(res => res.json()).then(data => setPizza(data.pizzas)) 
// },[])

//   return (
    
//   );
// }

class App extends React.Component{

  componentDidMount(){
    axios.get(`http://localhost:3000/db.json`).then(({data})=> {
      this.props.savePiz(data.pizzas);
    });
  }

  render(){
    return <div className="App">
    <div className="wrapper">
    <Header />      
    <div className="content">
      <Routes>
        <Route path="/" element={<Home pizzas={this.props.items}/>}/>
        <Route path="/bucket" element={<Cart/>}/>
      </Routes>
    </div>
  </div>
  </div>
  }
}

const mapStateToProps = state =>{
  return {
    items: state.pizzas.items,
    filters: state.filters
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    savePiz: (items)=> dispatch(setPizzasAction(items))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
