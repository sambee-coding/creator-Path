const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit" , async (e) =>{
    e.preventDefault();
    console.log('form submitted');// this is to test whether our function is resposding when somone click the login button
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

   const data={
    email:email,
    password : password
   };
   
   console.log("your data is ",data); //this shows the data we entered in our login form in the form of object

   try{
    const response = await fetch("http://localhost:3001/auth/login",{
        
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },

        body : JSON.stringify(data),
        
        
    });

    const result = await response.json();// this reads and coverts to reply that come from the loin form
    const messageElement = document.getElementById("message");

    if(response.ok){
        messageElement.textContent =" you are loggedin sucessfully";
        messageElement.style.color ="green";
    }
    else{
        messageElement.textContent = "login has faild";
        messageElement.style.color = "red";
    }
   
}
 catch (err){
   console.log("there is error on your login",err);

  const messageElement = document.getElementById("message");
  messageElement.textContent = " something went wrong . please try agian";
  messageElement.style.color = "red";
    }
   
});
