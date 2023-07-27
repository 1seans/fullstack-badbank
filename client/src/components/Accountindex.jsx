function Accountindex({onChange, isDeposit}){
  const choice = ["Deposit", "Withdrawal"];
  const action = isDeposit ? choice[0] : choice[1];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
    <h2> {choice[Number(!isDeposit)]}</h2>
    <input type="number"  onChange={onChange}></input>
    <input type="submit" value={action}></input>
  </label>
  )

}
export default Accountindex;

// import React, { useRef } from 'react';

// function Accountindex({ onChange, isDeposit }) {
//   const choice = ['Deposit', 'Withdrawal'];
//   const action = isDeposit ? choice[0] : choice[1];
//   const inputRef = useRef(null);

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       onChange(event);
//       inputRef.current.value = ''; // Clear the input value after hitting Enter
//     }
//   };

//   return (
//     <label className="label huge">
//       <h2>{choice[Number(!isDeposit)]}</h2>
//       <input type="number" ref={inputRef} onKeyDown={handleKeyDown} />
//       <input type="submit" value={action} onClick={onChange} />
//     </label>
//   );
// }

// export default Accountindex;
