import Background from "../Background";
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';

const AboutPage = (props) =>{
    const [posts, setPosts] = useState([]);
    const [commentText, setCommentText] = useState(""); // State to manage comment textarea value

    const fetchPosts = async () =>{
        const { data } = await supabase
            .from('Posts')
            .select();
        // Extract year and month from created_at and set state of posts
        const formattedPosts = data.map(post => ({
            ...post,
            created_at: new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            Comments: post.Comments ? JSON.parse(post.Comments) : [] // Parse comments if they exist
        }));
        setPosts(formattedPosts);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleComment = async (postId, commentText) => {
        // Get the current post
        const post = posts.find(post => post.id === postId);
        if (!post) return; // Post not found

        // Update the comments array of the post
        const updatedPost = {
            ...post,
            Comments: [...post.Comments, { text: commentText }] // Add new comment
        };

        // Update the post in the database
        const { data, error } = await supabase
            .from('Posts')
            .update({ Comments: JSON.stringify(updatedPost.Comments) }) // Convert comments array back to JSON string
            .eq('id', postId);

        if (error) {
            console.error('Error adding comment:', error.message);
        } else {
            console.log('Comment added successfully:', data);
            // Update state with the updated post
            setPosts(prevPosts => (
                prevPosts.map(prevPost => {
                    if (prevPost.id === postId) {
                        return updatedPost;
                    }
                    return prevPost;
                })
            ));
        }
        // Clear comment textarea after adding comment
        setCommentText("");
    };
    
    return(
        <div>
            <Background />
            <div className="header-div">
                <h2 className="about-font">Home Feed</h2>
                <h3 className='about-font'>Share post on your favorite teams and players</h3>
            </div>
            <div className="aboutReadPosts">
                {posts && posts.length > 0 ? posts.map((post,index) => (
                    <div key={post.id}>
                        <Card id={post.id}  created_at={post.created_at} Username={post.Username} Post={post.Post} insertURL={post.insertURL}/>
                        {/* Display comments */}
                        <div>
                            {post.Comments && post.Comments.map((comment, index) => (
                                <p key={index}>{comment.text}</p>
                            ))}
                            {/* Comment section */}
                            <div>
                                <textarea 
                                    rows="3" 
                                    placeholder="Add a comment..."
                                    value={commentText} // Bind textarea value to state
                                    onChange={(e) => setCommentText(e.target.value)} // Update state on change
                                />
                                <button onClick={() => handleComment(post.id, commentText)}> {/* Pass commentText to handleComment */}
                                    Add Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )) : <h2>{'No Challenges Yet 😞'}</h2>}
            </div>  
        </div>
    );
};

export default AboutPage;






