import React from 'react';
import classNames from 'classnames';

export default function Button({ outline, children, className, dobavPizza }) {
  return (
    <button
      onClick={dobavPizza}
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  );
}
