import React from 'react';
import { Category, SortPopUp, PizzaBlock } from '../Components';
import { useSelector, useDispatch } from 'react-redux';

import { setCategory, setSortBy } from '../redux/actions/filters';

import { fetchPizzas } from '../redux/actions/pizzas';
import LoadingBlock from '../Components/PizzaBlock/LoadingBlock';
import { addPizzaToCart } from '../redux/actions/cart';
import cart from '../redux/reducers/cart';

const categoryNames = ['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'popular', type: 'popular', order: 'desc' },
  { name: 'price', type: 'price', order: 'desc' },
  { name: 'alphabet', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  console.log(cartItems[0]);
  console.log(cartItems);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);
  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddPizza = (pizza) => {
    dispatch(addPizzaToCart(pizza));
  };

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [category, sortBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Category
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopUp
          activeSortType={sortBy.type}
          categories={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((pizza) => (
              <PizzaBlock
                onAddPizza={handleAddPizza}
                key={pizza.id}
                addedCount={console.log(cartItems[pizza.id] && cartItems[pizza.id].length)}
                {...pizza}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <LoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
