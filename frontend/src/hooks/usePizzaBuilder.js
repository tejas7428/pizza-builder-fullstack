import { useState } from 'react';

const usePizzaBuilder = () => {
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedMeats, setSelectedMeats] = useState([]);

  const selectBase = (base) => {
    setSelectedBase(base);
  };

  const selectSauce = (sauce) => {
    setSelectedSauce(sauce);
  };

  const selectCheese = (cheese) => {
    setSelectedCheese(cheese);
  };

  const toggleVeggie = (veggie) => {
    if (selectedVeggies.includes(veggie)) {
      setSelectedVeggies(selectedVeggies.filter(v => v !== veggie));
    } else {
      setSelectedVeggies([...selectedVeggies, veggie]);
    }
  };

  const toggleMeat = (meat) => {
    if (selectedMeats.includes(meat)) {
      setSelectedMeats(selectedMeats.filter(m => m !== meat));
    } else {
      setSelectedMeats([...selectedMeats, meat]);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    
    if (selectedBase) total += selectedBase.price;
    if (selectedSauce) total += selectedSauce.price;
    if (selectedCheese) total += selectedCheese.price;
    
    selectedVeggies.forEach(veggie => {
      total += veggie.price;
    });
    
    selectedMeats.forEach(meat => {
      total += meat.price;
    });
    
    return total;
  };

  const resetBuilder = () => {
    setSelectedBase(null);
    setSelectedSauce(null);
    setSelectedCheese(null);
    setSelectedVeggies([]);
    setSelectedMeats([]);
  };

  const getPizzaData = () => {
    return {
      base: selectedBase,
      sauce: selectedSauce,
      cheese: selectedCheese,
      veggies: selectedVeggies,
      meats: selectedMeats,
      total: calculateTotal()
    };
  };

  return {
    selectedBase,
    selectedSauce,
    selectedCheese,
    selectedVeggies,
    selectedMeats,
    selectBase,
    selectSauce,
    selectCheese,
    toggleVeggie,
    toggleMeat,
    calculateTotal,
    resetBuilder,
    getPizzaData
  };
};

export default usePizzaBuilder;