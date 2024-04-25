import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';

const ReadPosts = (props) => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () =>{
            const { data } = await supabase
                .from('Posts')
                .select('*, voteCount') // Include voteCount in the select query
                .order('created_at', { ascending: false }); // Optionally, you can order the posts by created_at
            // Extract year, month, and day from created_at and set state of posts
            const formattedPosts = data.map(post => ({
                ...post,
                created_at: new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }));
            setPosts(formattedPosts);
        };
        fetchPosts();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter posts based on search query
    const filteredPosts = posts.filter(post =>
        post.Post.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.created_at.toLowerCase().includes(searchQuery.toLowerCase()) 
       
    );

    return (
        <div>
            <div>
                {/* Search bar */}
               <div  className='search-bar'>
               <input
                    type="text"
                    placeholder="Search posts by keyword or date..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {/* <input type="submit" value="Submit" /> */}
               </div>
            </div>
            <div className="ReadPosts">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <Card
                            key={post.id} // Don't forget to add key prop
                            id={post.id}
                            created_at={post.created_at}
                            Username={post.Username}
                            Post={post.Post}
                            insertURL={post.insertURL}
                            voteCount={post.voteCount} // Pass voteCount to Card component
                        />
                    ))
                ) : (
                    <h2>{'No Challenges Found 😞'}</h2>
                )}
            </div>
        </div>
    );
};

export default ReadPosts;


