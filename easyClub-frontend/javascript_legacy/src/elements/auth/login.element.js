import React, { Component, useRef, useState, useEffect } from 'react';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export default function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [countFails, setCountFails] = useState(0);
  const [message, setMessage] = useState(undefined);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setMessage('');
    setLoading(true);

    AuthService.login(data.username, data.password).then(
      () => {
        navigate('/profile');
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setLoading(false);
        setCountFails((prevCount) => prevCount + 1);
      }
    );
  };

  return (
    <>
      <div className="col-md-4 col-12">
        <div className="card-container">
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-group mb-2">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                className="form-control"
                {...register('username', {
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                })}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                {...register('password', {
                  required: true,
                  minLength: 8,
                  maxLength: 50,
                })}
              />
            </div>
            <div className='d-flex justify-content-between align-items-md-end flex-column flex-md-row'>
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block w-100"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
              <div className="form-group mt-3 fs-6 fw-light">
                <a href="/request-forgot-password">Forgot your password?</a>
              </div>
            </div>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
