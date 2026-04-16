import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMenu } from '../services/api';

const PizzaBuilder = () => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedMeats, setSelectedMeats] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await getMenu();
        setMenu(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch menu');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenu();
  }, []);

  const handleVeggieSelect = (veggie) => {
    if (selectedVeggies.includes(veggie)) {
      setSelectedVeggies(selectedVeggies.filter(v => v !== veggie));
    } else {
      setSelectedVeggies([...selectedVeggies, veggie]);
    }
  };

  const handleMeatSelect = (meat) => {
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

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCheckout = () => {
    // In a real app, this would proceed to payment
    // For now, we'll just show a summary
    navigate('/checkout');
  };

  if (loading) {
    return <div className="pizza-builder">Loading menu...</div>;
  }

  if (error) {
    return <div className="pizza-builder error">{error}</div>;
  }

  const total = calculateTotal();

  return (
    <div className="pizza-builder">
      <h2>Build Your Pizza</h2>
      
      <div className="progress-bar">
        {[1, 2, 3, 4, 5].map(step => (
          <div 
            key={step} 
            className={`step ${step <= currentStep ? 'active' : ''} ${step === currentStep ? 'current' : ''}`}
          >
            Step {step}
          </div>
        ))}
      </div>
      
      {currentStep === 1 && (
        <div className="builder-step">
          <h3>Step 1: Choose Your Base</h3>
          <div className="options-grid">
            {menu?.bases.map(base => (
              <div 
                key={base._id} 
                className={`option-card ${selectedBase?._id === base._id ? 'selected' : ''}`}
                onClick={() => setSelectedBase(base)}
              >
                <h4>{base.name}</h4>
                <p>₹{base.price}</p>
                <p>Stock: {base.stock}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={handleNext} 
            disabled={!selectedBase}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      )}
      
      {currentStep === 2 && (
        <div className="builder-step">
          <h3>Step 2: Choose Your Sauce</h3>
          <div className="options-grid">
            {menu?.sauces.map(sauce => (
              <div 
                key={sauce._id} 
                className={`option-card ${selectedSauce?._id === sauce._id ? 'selected' : ''}`}
                onClick={() => setSelectedSauce(sauce)}
              >
                <h4>{sauce.name}</h4>
                <p>₹{sauce.price}</p>
                <p>Stock: {sauce.stock}</p>
              </div>
            ))}
          </div>
          <div className="step-buttons">
            <button onClick={handlePrevious} className="btn btn-secondary">Previous</button>
            <button 
              onClick={handleNext} 
              disabled={!selectedSauce}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {currentStep === 3 && (
        <div className="builder-step">
          <h3>Step 3: Choose Your Cheese</h3>
          <div className="options-grid">
            {menu?.cheeses.map(cheese => (
              <div 
                key={cheese._id} 
                className={`option-card ${selectedCheese?._id === cheese._id ? 'selected' : ''}`}
                onClick={() => setSelectedCheese(cheese)}
              >
                <h4>{cheese.name}</h4>
                <p>₹{cheese.price}</p>
                <p>Stock: {cheese.stock}</p>
              </div>
            ))}
          </div>
          <div className="step-buttons">
            <button onClick={handlePrevious} className="btn btn-secondary">Previous</button>
            <button 
              onClick={handleNext} 
              disabled={!selectedCheese}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {currentStep === 4 && (
        <div className="builder-step">
          <h3>Step 4: Choose Your Veggies</h3>
          <div className="options-grid">
            {menu?.veggies.map(veggie => (
              <div 
                key={veggie._id} 
                className={`option-card ${selectedVeggies.includes(veggie) ? 'selected' : ''}`}
                onClick={() => handleVeggieSelect(veggie)}
              >
                <h4>{veggie.name}</h4>
                <p>₹{veggie.price}</p>
                <p>Stock: {veggie.stock}</p>
              </div>
            ))}
          </div>
          <div className="step-buttons">
            <button onClick={handlePrevious} className="btn btn-secondary">Previous</button>
            <button onClick={handleNext} className="btn btn-primary">Next</button>
          </div>
        </div>
      )}
      
      {currentStep === 5 && (
        <div className="builder-step">
          <h3>Step 5: Choose Your Meats (Optional)</h3>
          <div className="options-grid">
            {menu?.meats.map(meat => (
              <div 
                key={meat._id} 
                className={`option-card ${selectedMeats.includes(meat) ? 'selected' : ''}`}
                onClick={() => handleMeatSelect(meat)}
              >
                <h4>{meat.name}</h4>
                <p>₹{meat.price}</p>
                <p>Stock: {meat.stock}</p>
              </div>
            ))}
          </div>
          <div className="step-buttons">
            <button onClick={handlePrevious} className="btn btn-secondary">Previous</button>
            <button onClick={handleNext} className="btn btn-primary">Review Order</button>
          </div>
        </div>
      )}
      
      {currentStep === 6 && (
        <div className="builder-step">
          <h3>Review Your Order</h3>
          <div className="order-summary">
            <h4>Pizza Summary</h4>
            {selectedBase && (
              <div className="summary-item">
                <span>Base: {selectedBase.name}</span>
                <span>₹{selectedBase.price}</span>
              </div>
            )}
            {selectedSauce && (
              <div className="summary-item">
                <span>Sauce: {selectedSauce.name}</span>
                <span>₹{selectedSauce.price}</span>
              </div>
            )}
            {selectedCheese && (
              <div className="summary-item">
                <span>Cheese: {selectedCheese.name}</span>
                <span>₹{selectedCheese.price}</span>
              </div>
            )}
            {selectedVeggies.length > 0 && (
              <div className="summary-item">
                <span>Veggies:</span>
                <div>
                  {selectedVeggies.map(veggie => (
                    <div key={veggie._id} className="sub-item">
                      <span>{veggie.name}</span>
                      <span>₹{veggie.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedMeats.length > 0 && (
              <div className="summary-item">
                <span>Meats:</span>
                <div>
                  {selectedMeats.map(meat => (
                    <div key={meat._id} className="sub-item">
                      <span>{meat.name}</span>
                      <span>₹{meat.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="summary-total">
              <strong>Total: ₹{total}</strong>
            </div>
          </div>
          
          <div className="step-buttons">
            <button onClick={handlePrevious} className="btn btn-secondary">Previous</button>
            <button onClick={handleCheckout} className="btn btn-primary">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PizzaBuilder;