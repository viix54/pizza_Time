import React from 'react';
import classNames from 'classnames';

export default function Button({ outline, children, className }) {
  return (
    <button
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  );
}
