import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleDemoLogin = () => {
    const user = {
      email:'demo@aa.io',
      password:'password'
    };
    return dispatch(thunkLogin(user));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-page-container">
      <div className='login-page'>
      </div>
        <div className="login-section-container">
          <div className='login-section'>
        
            <h1 className='login-title'>Log in to RobinhoodClone</h1>
              {errors.length > 0 &&
                errors.map((message) => <p className='error' key={message}>{message}</p>)}
                <form className = 'login-form' onSubmit={handleSubmit}>
                <label>
                  Email
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                {errors.email && <p className='error'>{errors.email}</p>}
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                {errors.password && <p className='error'>{errors.password}</p>}
                <button className= 'login-button' type="submit">Log In</button>
                <button 
                  onClick ={handleDemoLogin} 
                  className='login-button'
                  type="button">
                  Log In As Demo User
                </button>
              
              </form>
              <a className='SignUpLink' href='/signup'>Dont have an account yet? Sign up one here.</a>
              
          </div>
        </div>
    </div>
  );
}

export default LoginFormPage;
