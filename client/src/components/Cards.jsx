import React from 'react';



function Card(props){
  function classes(){
    const bg = props.bgcolor ? 'bg-' + props.bgcolor: '';
    const text = props.textcolor ? 'text-' + props.textcolor: 'text-white';
      return 'card md-3' + bg + text;
  }
  return(
    <div className='card-container'>
      <div className={classes()} style={{maxWidth: '18rem'}}>
        <div className='card-header'>{props.header}</div>
        {props.tittle && (<h5 className='card-tittle'>{props.tittle}</h5>)}
        {props.text && (<p className='card-text'>{props.text}</p>)}
        {props.body}
        {props.status && (<p className='createStatus'>{props.status}</p>)}
      </div>
    </div>
  );
};

export default Card;