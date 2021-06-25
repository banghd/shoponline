import React, {useEffect, useState} from 'react';
import axios from 'axios'
function Login(props) {

    const [user, setUser] = useState({
        email : '',
        password  : ""
    })
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    const handleClick = async (e)=>{
        e.preventDefault()
        try {
           await axios.post('http://localhost:5000/user/login', {...user})
           .then((response)=>{
               alert(response.data.accessToken)
           })
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    return (
        <div>
            <form>
                <label>
                    Email :
                    <input type="email" name="email" value={user.email} onChange={handleChange}></input>
                </label>
                <br></br>
                <label>
                    Password :
                    <input type="password" name="password" value={user.password} onChange={handleChange}></input>
                </label>
                <br/>
                <button onClick={handleClick}>Submit</button>
            </form>
        </div>
    );
}

export default Login;