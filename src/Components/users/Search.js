import React, { useState , useContext} from "react";
import GithubContext from '../../context/Github/githubContext'
import AlertContext from '../../context/Alert/alertContext'

const Search= () => {
  const gitHubContext = useContext(GithubContext)

  const alertContext = useContext(AlertContext)
  const [text, setText] = useState('');
  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if(text === ''){
      alertContext.setAlert('Please enter something' , "light")
    }
    else{
        gitHubContext.searchUsers(text);
       setText('');
    }
  }
  
    return (
      <div>
        <form className="form" onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Users...."
            onChange={onChange}
          />
        
           <input
            type="Submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
          {gitHubContext.users.length > 0 &&  <input
            onClick={gitHubContext.clearUsers}
            value="Clear"
            className="btn btn-light btn-block"
          />}
           
        </form>
      </div>
    );
  }
 
export default Search;
