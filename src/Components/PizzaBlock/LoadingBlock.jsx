import React from 'react';
import ContentLoader from 'react-content-loader';

function LoadingBlock() {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="129" cy="141" r="104" />
      <rect x="0" y="259" rx="3" ry="3" width="280" height="26" />
      <rect x="0" y="295" rx="6" ry="6" width="280" height="84" />
      <rect x="0" y="403" rx="3" ry="3" width="80" height="27" />
      <rect x="172" y="389" rx="20" ry="20" width="109" height="51" />
    </ContentLoader>
  );
}

export default LoadingBlock;
