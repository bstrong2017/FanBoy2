import React from 'react';
import './CreatePost.css'
import Background from '../Background';
import { supabase } from '../client'

const CreateCom = () => {

    const [post, setPost] = useState({ Username: "", Comment: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div >
            <Background />
            <form>
                {/* <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/> */}

                <label for="Username">Username</label><br />
                <input type="text" id="Username" name="Username" onChange={handleChange} /><br />
                <br/>

                <label for="Comment">Comment</label><br />
                <textarea rows="5" cols="50" id="Comment" onChange={handleChange}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreateCom;


