import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import LinkContext from '../../context/link/linkContext';

const CreatePage = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const linkContext = useContext(LinkContext);

  const { createLink } = linkContext;

  useEffect(()=>{
    authContext.loadUser();
  //eslint-disable-next-line
  },[]);

  const [link, setLink] = useState({
    oldLink: ''
  });

  const { oldLink } = link;

  const onChange = e => setLink({...link, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    if(oldLink === ''){
      alertContext.setAlert('Вы должны ввести ссылку', 'danger');
    } else {
      createLink(link);
      props.history.push('/links');
    }
  }

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <form onSubmit={onSubmit} className="needs-validation mt-3" noValidate>
          <div className="form-group">
            <label htmlFor="oldLink">Введите ссылку:</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="http://examle.com" 
              id="oldLink"
              name="oldLink"
              value={oldLink}
              onChange={onChange}
              required  
            />
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">Введите какую нибудь ссылку</div>
          </div>
          <center><input type="submit" value="Создать ссылку" className="btn btn-primary" /></center>
        </form>
      </div>
    </div>
  )
}

export default CreatePage;