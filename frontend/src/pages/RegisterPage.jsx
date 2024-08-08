import React, { useEffect, useState } from 'react';
import '../Style/RegisterPages.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileImage: null,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? (files.length > 0 ? files[0] : null) : value
    });
  };
  

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmpassword || formData.confirmpassword === "");
  }, [formData.password, formData.confirmpassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerForm = new FormData();
      for (let key in formData) {
        registerForm.append(key, formData[key]);
      }
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: registerForm
      });
      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  return (
    <div className='register'>
      <div className='register_container'>
        <form className='register_content_form' onSubmit={handleSubmit}>
          <input type="text" placeholder='First Name' name='firstname' value={formData.firstname} onChange={handleChange} required />
          <input type="text" placeholder='Last Name' name='lastname' value={formData.lastname} onChange={handleChange} required />
          <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleChange} required />
          <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />
          <input type="password" placeholder='Confirm Password' name='confirmpassword' value={formData.confirmpassword} onChange={handleChange} required />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}

          <input id='image' type="file" accept='image/*' name='profileImage' style={{ display: 'none' }} onChange={handleChange} required />
          <label htmlFor='image'>
            <img src="/src/assets/uploadPhoto.png" alt="Upload" />
            <p>Upload your photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
          )}

          <button type='submit' disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
}

export default RegisterPage;
