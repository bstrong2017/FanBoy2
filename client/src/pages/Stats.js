import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card'; // Import Card component
import { supabase } from '../client';
import teams from './teams';

const Stats = () => {
  const location = useLocation();
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    // Extract card ID from query parameters
    const searchParams = new URLSearchParams(location.search);
    const cardId = searchParams.get('id');

    // Fetch card details using the cardId
    // Replace this with your actual API call to fetch card details
    const fetchCardDetails = async () => {
      try {
        // Fetch card details from Supabase
        const { data, error } = await supabase
          .from('Posts')
          .select()
          .eq('id', cardId)
          .single();

        if (error) {
          throw new Error('Failed to fetch card details');
        }

        setCardDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCardDetails();
  }, [location.search]);

  return (
    <div>
      <div className="header-div">
      </div>

      <div className='sports-stats'>
        <div className='stats-card'>
          <h1 className='about-font'>Sports</h1>
          <ul>
            {teams.map((team, index) => (
              <li key={index}>
                <p>{team.team}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="aboutReadstats">  
        {cardDetails ? (
          // Render Card component with card details
          <Card
            id={cardDetails.id}
            created_at={new Date(cardDetails.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            Username={cardDetails.Username}
            Post={cardDetails.Post}
            insertURL={cardDetails.insertURL}
          />
        ) : (
          <p>Loading card details...</p>
        )}
      </div>
    </div>
  );
};

export default Stats;




