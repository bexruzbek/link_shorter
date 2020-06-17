import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const RegisterPage = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { register, msg, error, clearMessage, clearError } = authContext;
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
    password2: ''
  });

  useEffect(()=> {
    if(msg){
      setAlert(msg, 'success');
      clearMessage();
      props.history.push('/login'); 
      
    }
    if(error){
      setAlert(error, 'danger');
      clearError();
    }
    //eslint-disable-next-line
  },[error, msg, props.history]);

  const { email, name, password, password2 } = user;

  const onChange = e => setUser({...user, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    if(email === '' || name === '' || password === ''){
      setAlert('Вы должны заполнить все формы', 'danger');
    } else if (password !== password2) {
      setAlert('Паролы должны совпадать', 'danger');
    } else {
      register({
        name,
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
              placeholder="Введите email" 
              name="email"
              value={email}
              id="email"
              onChange={onChange}
              required  
            />
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">Введите корректный email адрес</div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Ваше имя:</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Введите имя" 
              name="name"
              value={name}
              id="name"
              onChange={onChange}
              required  
            />
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">Введите ваше имя</div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Введите пароль" 
              name="password" 
              value={password}
              id="password" 
              onChange={onChange}
              required
            />
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">Этот поля обязателен</div>
          </div>
          <div className="form-group">
            <label htmlFor="password2">Пароль еще раз:</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Введите пароль еще раз" 
              name="password2" 
              value={password2}
              id="password2" 
              onChange={onChange}
              required
            />
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">Этот поля обязателен</div>
          </div>
          <center><input type="submit" value="Регистрация" className="btn btn-primary"/></center>
        </form>
      </div>
    </div>
  )
}

export default withRouter(RegisterPage);