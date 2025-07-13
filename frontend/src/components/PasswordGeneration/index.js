import "./index.css"

const  PasswordGeneration= () =>(
<div className="login-container">
<form className="login-form">
  <h2>Password Generation</h2>

  <label htmlFor="username">Email:</label>
  <input
    type="text"
    id="username"
    name="username"
    // value={loginData.username}
    // onChange={handleChange}
    required
  />

  <label htmlFor="password">Enter OTP:</label>
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

export default PasswordGeneration