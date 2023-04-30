import React from 'react';
import { Category, SortPopUp, PizzaBlock } from '../Components';

function Home({ pizzas }) {
  return (
    <div className="container">
      <div className="content__top">
        <Category
          onClickItem={(item) => console.log(item)}
          items={['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']}
        />
        <SortPopUp categories={['popular', 'price', 'alphabet']} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.map((pizza) => (
          <PizzaBlock key={pizza.id} {...pizza} />
        ))}
      </div>
    </div>
  );
}

export default Home;
