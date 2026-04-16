import React from 'react';

const PizzaPreview = ({ pizza }) => {
  if (!pizza) return null;

  const {
    base,
    sauce,
    cheese,
    veggies = [],
    meats = []
  } = pizza;

  return (
    <div className="pizza-preview">
      <h4>Your Pizza Preview</h4>
      <div className="pizza-visual">
        {/* Base layer */}
        <div className="pizza-layer base">
          {base && <span className="layer-label">{base.name}</span>}
        </div>
        
        {/* Sauce layer */}
        <div className="pizza-layer sauce">
          {sauce && <span className="layer-label">{sauce.name}</span>}
        </div>
        
        {/* Cheese layer */}
        <div className="pizza-layer cheese">
          {cheese && <span className="layer-label">{cheese.name}</span>}
        </div>
        
        {/* Veggies layer */}
        <div className="pizza-layer veggies">
          {veggies.length > 0 && (
            <div className="ingredients">
              {veggies.map((veggie, index) => (
                <span key={index} className="ingredient">{veggie.name}</span>
              ))}
            </div>
          )}
        </div>
        
        {/* Meats layer */}
        <div className="pizza-layer meats">
          {meats.length > 0 && (
            <div className="ingredients">
              {meats.map((meat, index) => (
                <span key={index} className="ingredient">{meat.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="pizza-details">
        <h5>Ingredients:</h5>
        <ul>
          {base && <li>{base.name} (Base)</li>}
          {sauce && <li>{sauce.name} (Sauce)</li>}
          {cheese && <li>{cheese.name} (Cheese)</li>}
          {veggies.map((veggie, index) => (
            <li key={index}>{veggie.name} (Veggie)</li>
          ))}
          {meats.map((meat, index) => (
            <li key={index}>{meat.name} (Meat)</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PizzaPreview;