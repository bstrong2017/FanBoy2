import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import CommentCard from '../components/CommentCard';

const ReadComment = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(props.data);
    }, [props]);
    
    return (
       <div >
         <div className="ReadPosts">
            {
                //No Title 
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} author={post.Username} description={post.Post}/>
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
        <div className="ReadPosts">
            {
                //Adding Comment, remove title
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <CommentCard id={post.id} author={post.author} description={post.description}/>
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
       </div>
    )
}

export default ReadComment;

