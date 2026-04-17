// Grab the form and message area
const form = document.getElementById("registerForm");
const message = document.getElementById("message");

// When the form is submitted
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Take the values from the inputs
  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Send the data to backend
    const res = await fetch("http://localhost:8000/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      message.style.color = "green";
      message.textContent = data.msg || "Registration successful!";
      console.log("access token:", data.accessToken); // changed from undefined variable
    } else {
      message.style.color = "red";
      message.textContent = data.msg || "Registration failed";
    }
  } catch (err) {
    message.style.color = "red";
    message.textContent = "Something went wrong";
    console.error(err);
  }
});
