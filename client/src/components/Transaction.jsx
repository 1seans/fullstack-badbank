import React, { useContext, useEffect } from 'react';
import UserContext from '../context';
import axios from 'axios';

const Transaction = () => {
  const { userData, setUserData } = useContext(UserContext);

  if (!userData || !userData.transactions) {
    return <p>Loading transactions...</p>;
  }

  useEffect(() => {
    const updateTransaction = async () => {
      try {
        const response = await axios.put('http://localhost:3001/update', {
          email: userData.email,
          balance: userData.balance,
          transactions: userData.transactions,
        });

        if (response.data.status === 'Success') {
          // Update the user data in context with the updated data from the server
          setUserData((prevUserData) => ({
            ...prevUserData,
            ...userData,
            transactions: userData.transactions,
          }));
        } else {
          console.log('Transaction update failed.');
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Update transaction data on the server whenever userData.transactions changes
    if (userData.transactions.length > 0) {
      updateTransaction();
    }
  }, [userData.transactions, userData.email, userData.balance, setUserData]);

  return (
    <div className="transaction-container">
      <div className="header">
        <h1>{userData.name} Your Balance: ${userData.balance}</h1>
        <h2></h2>
      </div>
      <div className="transaction-log">
        <h3>Transaction Log:</h3>
        <table className="table table-primary table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{userData.name}</td>
                <td>{transaction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
