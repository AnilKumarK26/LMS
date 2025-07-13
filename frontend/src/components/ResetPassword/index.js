import "./index.css"

const  ResetPassword= () =>(
<div className="login-container">
<form className="login-form">
  <h2>Reset Password</h2>

  <label htmlFor="username">New Password:</label>
  <input
    type="text"
    id="username"
    name="username"
    // value={loginData.username}
    // onChange={handleChange}
    required
  />

  <label htmlFor="password">Confirm Password:</label>
  <input
    type="password"
    id="password"
    name="password"
    // value={loginData.password}
    // onChange={handleChange}
    required
  />

  <button type="submit" className="login-form-button">
    Submit
  </button>
</form>
</div>
);

export default ResetPassword