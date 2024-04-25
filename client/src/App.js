import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import Stats from './pages/Stats';
import AboutPage from './pages/AboutPage';
import Background from './Background';
import addbutton from './components/addbutton.png';


const App = () => {
  
  const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'


  //id,author(username), description(Post), add date 
  const posts = [
      {'id':'1', 
      'Username':'CurryLove', 
      'Post': descr,
      'Date':'',
      'insertURL':''},
      {'id':'2', 
      'Username':'JJeter', 
      'Post':descr,
      'Date':'',
      'insertURL':''},
      {'id':'3', 
      'Username':'AngelReese1Fan', 
      'Post':descr,
      'Date':'',
      'insertURL':''},
      {'id':'4', 
      'Username':'Denise Michelle', 
      'Post':descr,
      'Date':'',
      'insertURL':''},
  ]

 

  // Sets up routes
  //create anther page for reading all post, this can be about page 
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/stats",
      element: <Stats />
    },
    {
      //this is about page, I changed to post
      path:"/about",
      element: <AboutPage data={posts}/>
    }
   
  ]);

  return ( 

    <div className="App">
      <div >
      <Background />
      <div className="header">
        <h1 className='title-font'>Fanboy</h1>
        <Link to="/"><button className="headerBtn"> Home  </button></Link>
        <Link to="/about"><button className="headerBtn"> Feed </button></Link>
        <Link to="/new"><button className="headerBtn"> Create </button></Link>
        <Link to="/stats"><button className="headerBtn"> Stats </button></Link>
      </div>
      <div>
      <Link to={'/new'}><img className="addButton" alt="add button" src={addbutton} /></Link>
      </div>
        {element}
      </div>
    </div>

  );
}

export default App;
