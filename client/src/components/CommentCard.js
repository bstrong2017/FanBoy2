import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import addButton from './addButton.png'
import { Link } from 'react-router-dom'


const CommentCard = (props) =>  {

  const [count, setCount] = useState(0)
  const updateCount = () => {
    setCount((count) => count + 1);
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="add button" src={addButton} /></Link>
          {/* <h2 className="title">{props.title}</h2> */}
          <h2 className="author">{"username: " + props.author}</h2>
          <p className="description">{props.description}</p>
          <button className="betButton" onClick={updateCount} >⬆ Upvote: {count}</button>
      </div>
  );
};

export default CommentCard;