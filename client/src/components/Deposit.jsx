import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context';
import Accountindex from './Accountindex';
import axios from 'axios';

const Deposit = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [deposit, setDeposit] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const [invalidTransaction, setInvalidTransaction] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const status = `Your Account Balance $ ${userData.balance}`;

  useEffect(() => {
    if (userData) {
      axios
        .put('http://localhost:3001/update', userData) // Adjust the API endpoint as needed
        .then(response => {
          console.log(response);
          // Handle the success response from the server if necessary
        })
        .catch(error => {
          console.error('Error updating user data:', error);
          // Handle the error response from the server if necessary
        });
    }
  }, [userData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (deposit < 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (!isDeposit && deposit > userData.balance) {
      setInvalidTransaction(true);
      return;
    }

    const updatedTotal = isDeposit ? userData.balance + deposit : userData.balance - deposit;

    setIsSubmitted(true); // Set isSubmitted to true after successful deposit
    setShowMessage(true); // Show the deposited amount message
    setMessage(`Deposited amount: $${deposit}`);

    // Update the user data in the context with the new balance
    const updatedUserData = {
            ...userData,
            balance: updatedTotal,
            transactions: [...(userData.transactions || []), `Deposited: $${deposit}`],
          };
          setUserData(updatedUserData);
      
          setTimeout(() => {
            setShowMessage(false);
          }, 5000);

    const colorClass = isDeposit ? 'green' : 'red';
    const totalElement = document.getElementById('deposit-total');
    totalElement.classList.add(colorClass);

    // Send the updated user data to the server to save
    axios
      .put('http://localhost:3001/update', updatedUserData) // Adjust the API endpoint as needed
      .then(response => {
        console.log(response);
        // Handle the success response from the server if necessary
      })
      .catch(error => {
        console.error('Error updating user data:', error);
        // Handle the error response from the server if necessary
      });
  };

  const handleChange = (event) => {
    setDeposit(Number(event.target.value));
  };

  return (
    <>
      <div className="balance-info">
        {userData && (
          <h1>{userData.name} Your balance is: ${userData.balance}</h1>
        )}
      </div>
      <div className='total-container'>
        <form className="total" onSubmit={handleSubmit}>
          {/* <h1 id="deposit-total">{status}</h1> */}
          {isSubmitted && showMessage && <h1>{message}</h1>}
          {invalidTransaction && <p style={{ color: 'red' }}>Transaction not valid. Insufficient funds.</p>}
          <Accountindex onChange={handleChange} isDeposit={true} />
        </form>
      </div>
    </>
  );
};

export default Deposit;

