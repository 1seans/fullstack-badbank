import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context';
import Accountindex from './Accountindex';
import axios from 'axios';

const Withdraw = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [withdrawal, setWithdrawal] = useState(0);
  const [isWithdrawal, setIsWithdrawal] = useState(true);
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

    if (withdrawal < 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (withdrawal > userData.balance) {
      setInvalidTransaction(true);
      return;
    }

    const updatedTotal = userData.balance - withdrawal;

    setIsSubmitted(true); // Set isSubmitted to true after successful withdrawal
    setShowMessage(true); // Show the withdrawn amount message
    setMessage(`Withdrawn amount: $${withdrawal}`);

    // Update the user data in the context with the new balance
    const updatedUserData = {
      ...userData,
      balance: updatedTotal,
      transactions: [...(userData.transactions || []), `Withdrawed: $${withdrawal}`],
    };
    setUserData(updatedUserData);

    setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    const colorClass = 'red';
    const totalElement = document.getElementById('withdraw-total');
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
    setWithdrawal(Number(event.target.value));
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
          {/* <h1 id="withdraw-total">{status}</h1> */}
          {isSubmitted && showMessage && <h1>{message}</h1>}
          {invalidTransaction && <p style={{ color: 'red' }}>Transaction not valid. Insufficient funds.</p>}
          <Accountindex onChange={handleChange} isDeposit={false} />
        </form>
      </div>
    </>
  );
};

export default Withdraw;

