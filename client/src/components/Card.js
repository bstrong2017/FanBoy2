import React, { useState, useEffect } from 'react';
import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

const Card = (props) => {
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    // Fetch the current voteCount from Supabase when the component mounts
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select('voteCount')
        .eq('id', props.id)
        .single();
      
      if (error) {
        console.error('Error fetching voteCount:', error.message);
      } else {
        setVoteCount(data ? data.voteCount : 0);
      }
    };

    fetchData(); // Call the fetchData function
  }, [props.id]); // Fetch data when props.id changes (component mounts or props.id changes)

  const updateCount = async (event) => {
    event.preventDefault();

    // Increment voteCount locally
    setVoteCount((prevVoteCount) => prevVoteCount + 1);

    // Update voteCount in the database
    await supabase
      .from('Posts')
      .update({ voteCount: voteCount + 1 })
      .eq('id', props.id);
  };

  const handleMoreClick = () => {
    // Navigate to Stats.js page with card ID as query parameter
    // Pass post details along with the card ID
    window.location.href = `/stats?id=${props.id}&postDetails=${JSON.stringify(props.postDetails)}`;
  };

  return (
    <div className="Card">
      <Link to={'edit/' + props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
      <p className='date'>{"Date: " + props.created_at}</p>
      <h3 className="Username">{"username: " + props.Username}</h3>
      {/* Display image if URL is provided */}
      {props.insertURL && (
        <img src={props.insertURL} alt="User added" style={{ maxWidth: '100%', maxHeight: '200px' }} />
      )}
      <p className="description">{props.Post}</p>
      <button className="betButton" onClick={updateCount}>⬆ Upvote: {voteCount}</button>
      <button className="betButton" onClick={handleMoreClick}>More</button>
    </div>
  );
};

export default Card;


