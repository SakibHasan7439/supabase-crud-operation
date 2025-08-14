import { useEffect, useState } from 'react'
import './App.css'
import supabase from './supabase.client';

function App() {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState('');
  const [designation, setDesignation] = useState('');

  // store item in supabase table
  const handleAddUser = async(e) => {
    e.preventDefault();

    const users_obj = {
      name: user,
      designation: designation
    };

    const {data, error} = await supabase.from('usersCollection').insert(users_obj).select();
    if(error){
      alert("Error occure");
      console.log('error', error);

    }else {
      alert("Data added successfully");
    }
  }

  // fetch items from supabase table
  useEffect(() => {
    const fetch_data = async() => {
      const {data, error} = await supabase.from('usersCollection').select();
      if(error){
        alert("Error occured while fetching data");

      }else {
        setUserList(data);
        console.log('data', data)
      }
    };

    fetch_data();
  }, []);

  return (
    <div>
      <h1>supabase crud operation</h1>
      <h3>Total users subcribed: {userList.length}</h3>
      <div>
        <form onSubmit={handleAddUser}>
          <input 
            type="text" 
            name="name"
            placeholder='Enter user name...'
            onChange={(e) => setUser(e.target.value)}  
          />
          <input 
            type="text" 
            name="designation"
            placeholder='Enter designation...'
            onChange={(e) => setDesignation(e.target.value)}  
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
