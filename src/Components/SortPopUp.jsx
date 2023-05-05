import React from 'react';
import { useState, useEffect, useRef } from 'react';
import PropTypes, { string } from 'prop-types';

const SortPopUp = React.memo(function SortPopUp({ activeSortType, categories, onClickSortType }) {
  const [visiblePopUp, setVisiblePopUp] = useState(false);

  const sortRef = useRef();
  const activeLabel = categories.find((obj) => obj.type === activeSortType).name;

  const onSelectItem = (index) => {
    if (onClickSortType) {
      onClickSortType(index);
    }
    setVisiblePopUp(false);
  };

  const toggleVisiblePopUp = () => {
    setVisiblePopUp(!visiblePopUp);
  };

  const handleOutsideClick = (e) => {
    let startSort = e.srcElement;
    let neededPath = [];
    while (startSort !== null) {
      neededPath.push(startSort.parentElement);
      startSort = startSort.parentElement;
    }
    !neededPath.includes(sortRef.current) ? setVisiblePopUp(false) : setVisiblePopUp(true);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={visiblePopUp ? 'rotated' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={toggleVisiblePopUp}>{activeLabel}</span>
      </div>
      {visiblePopUp && (
        <div className="sort__popup">
          <ul>
            {categories &&
              categories.map((obj, index) => (
                <li
                  className={activeSortType === obj.type ? 'active' : ''}
                  onClick={() => onSelectItem(obj)}
                  key={`${obj.type}_${index}`}>
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
});

SortPopUp.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  onClickSortType: PropTypes.func.isRequired,
};

SortPopUp.defaultProps = {
  items: [],
};

export default SortPopUp;
