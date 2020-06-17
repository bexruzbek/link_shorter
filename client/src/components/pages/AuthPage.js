import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const AuthPage = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { isAuthenticated, login, error, clearError } = authContext;

  useEffect(()=>{
    if(isAuthenticated === true){
      props.history.push('/links');
    }

    if(error) {
      setAlert(error, 'danger');
      clearError();
    }
    //eslint-disable-next-line
  },[isAuthenticated, error, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({...user, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    if(email === '' || password === ''){
      setAlert('Все поля должны быть заполнены', 'danger');    
    } else {
      login({
        email,
        password
      });
    }
  }


  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <form onSubmit={onSubmit} className="needs-validation mt-3" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email адрес:</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter email" 
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required  
            />
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">Введите корректный email адрес</div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter password" 
              id="password" 
              name="password"
              value={password} 
              onChange={onChange}
              required
            />
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">Этот поля обязателен</div>
          </div>
          <center><input type="submit" value="Войти" className="btn btn-primary" /></center>
        </form>
      </div>
    </div>
  )
}

export default AuthPage;