import React from 'react';
import DrinkCard from './DrinkCard';

function StoreListSection({ stores, onSelectStore }) {
  if (!stores || stores.length === 0) {
    return (
      <p className="results-count-banner">😕 找不到符合條件的店家</p>
    );
  }

  return (
    <section>
      <p className="results-count-banner">📋 找到 {stores.length} 筆商家</p>
      <div className="drinks-grid-fullwidth">
        {stores.map((store) => (
          <DrinkCard
            key={store.id ?? store.name}
            drink={store}
            onClick={() => onSelectStore && onSelectStore(store)}
          />
        ))}
      </div>
    </section>
  );
}

export default StoreListSection;