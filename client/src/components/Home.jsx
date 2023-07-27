import React, { useContext } from 'react';
import Card from './Cards';
import UserContext from '../context';

function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className='home-container'>
      {userData && (
        <Card
          bgcolor='primary'
          textcolor='black'
          header='Welcome to BadBank'
          text={
            <>
              <h1 className='home' id='deposit-total'>
                Welcome back, {userData.name}! Your balance is ${userData.balance}
              </h1>
            </>
          }
        />
      )}
    </div>
  );
}

export default Home;
