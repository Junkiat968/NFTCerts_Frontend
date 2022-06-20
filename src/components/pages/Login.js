import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  return (
<div class="overlay">
<form>
   <div class="con">
   <header class="head-form">
      <h2>Log In</h2>
   </header>
   <br/>
   <div class="field-set">
     
         <span class="input-item">
           <i class="fa fa-user-circle"></i>
         </span>
         <input class="form-input" id="txt-input" type="text" placeholder="Employee/Student ID" required />
     
      <br/>
     
     
      <span class="input-item">
        <i class="fa fa-key"></i>
       </span>
      <input class="form-input" type="password" placeholder="Password" id="pwd"  name="password" required />     
     
      <br/>
      <button class="log-in">Sign In</button>
   </div>
  
   <div class="other">
      <button class="btn submits forget-pass">Forgot Password</button>
   </div>
     
  </div>
  
</form>
</div>

  )
}
