import React from 'react';
import { Category, SortPopUp, PizzaBlock } from '../Components';
import { useSelector, useDispatch } from 'react-redux';

import { setCategory, setSortBy } from '../redux/actions/filters';

import { fetchPizzas } from '../redux/actions/pizzas';
import LoadingBlock from '../Components/PizzaBlock/LoadingBlock';

const categoryNames = ['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'popular', type: 'popular', order: 'desc' },
  { name: 'price', type: 'price', order: 'desc' },
  { name: 'alphabet', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);
  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

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
          ? items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
          : Array(12)
              .fill(0)
              .map((_, index) => <LoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
