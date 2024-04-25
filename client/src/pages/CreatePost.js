import React, { useState } from 'react';
import './CreatePost.css';
import Background from '../Background';
import { supabase } from '../client';

const CreatePost = () => {
    const [post, setPost] = useState({ Username: "", Post: "", insertURL: "" });

    const createPost = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        await supabase
            .from('Posts')
            .insert({ Username: post.Username, Post: post.Post, insertURL: post.insertURL }) // Include insertURL in the insert object
            .select();

        // Redirect to the home page after creating the post
        window.location = "/"; // Use relative path
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    return (
        <div className='create-form'>
            <Background />
            <form onSubmit={createPost}>
                <label htmlFor="Username">Username</label><br />
                <input type="text" id="Username" name="Username" onChange={handleChange} /><br /><br />

                <label htmlFor="Post">Post</label><br />
                <textarea rows="5" cols="50" id="Post" name="Post" onChange={handleChange}></textarea><br /><br />

                <label htmlFor="insertURL">URL: </label><br />
                <input type="text" id="insertURL" name="insertURL" onChange={handleChange} /><br /><br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost;


