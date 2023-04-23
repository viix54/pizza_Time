import React from 'react';
import classNames from 'classnames';

export default function Button({ outline, children }) {
  return (
    <button
      className={classNames('button', {
        'button--outline': outline,
      })}>
      {children}
    </button>
  );
}
