let arr = ["a", "b"];
let email = document.getElementById("email");
let user = document.getElementById("name");
document.getElementById("check").addEventListener("click", () => {
  console.log(email.value);
  console.log(user.value);
  if (email == arr[0] && user == arr[1]) {
    console.log("WELCOME");
  } else {
    console.log("FUCK YOU");
  }
});
