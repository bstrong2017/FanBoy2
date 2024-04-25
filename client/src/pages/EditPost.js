import React, { useState } from 'react'; // Importing useState
import { useParams } from 'react-router-dom'; // Importing useParams
import './EditPost.css';
import { supabase } from '../client';

const EditPost = ({ data }) => {
    const { id } = useParams();
    const [post, setPost] = useState({ id: null, Username: "", Post: "", insertURL: "" }); // Added useState

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .update({ Username: post.Username, Post: post.Post, insertURL: post.insertURL }) // Corrected field name
            .eq('id', id);
    
            window.location = "/"; // Use relative path
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    // UPDATE post
    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

            window.location = "/"; // Use relative path
    }

    return (
        <div className='create-form'>
            <form onSubmit={updatePost}> {/* Added onSubmit event handler */}
                {/* <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/> */}

                <label htmlFor="Username">Username</label><br /> {/* Changed "for" to "htmlFor" */}
                <input type="text" id="Username" name="Username" value={post.Username} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="Post">Post</label><br /> {/* Changed "for" to "htmlFor" */}
                <textarea rows="5" cols="50" id="Post" name="Post" value={post.Post} onChange={handleChange}></textarea> {/* Added "name" attribute */}
                <br/>

                <label htmlFor="insertURL">URL</label><br /> {/* Changed "for" to "htmlFor" */}
                <input type="text" id="insertURL" name="insertURL" value={post.insertURL} onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" />
                <button className="deleteButton" onClick={deletePost}>Delete</button> {/* Added onClick event handler */}
            </form>
        </div>
    )
}

export default EditPost;
