window.onload = function() {
  //forgot password code
  document.getElementById("b1").onclick = function() {
    location.href = "login.html";
  };
  var nameFlag = 0,
    emailFlag = 0,
    pwdFlag = 0;
  document.getElementById("fpSubmit").addEventListener("click", function() {
    event.preventDefault();
    console.log("entered");
    var fpName = document.getElementById("existingName").value.trim();
    var fpEmail = document.getElementById("existingEmail").value.trim();
    var fpnewPwd = document.getElementById("newPwd").value.trim();
    checkInputs();

    function checkInputs() {
      if (fpName == "") {
        console.log("first");
        setErrorFor(existingName, 'Username cannot be empty');
      } else {
        console.log("second");
        nameFlag = 1;
        setSuccessFor(existingName);
      }
      if (fpEmail == "") {
        setErrorFor(existingEmail, 'Email cannot be empty');
      } else {
        emailFlag = 1;
        setSuccessFor(existingEmail);
      }
      if (fpnewPwd == "") {
        setErrorFor(newPwd, 'New password cannot be empty');
      } else {
        pwdFlag = 1;
        setSuccessFor(newPwd);
      }
    }

    function setErrorFor(input, message) {
      const formControl = input.parentElement;
      const small = formControl.querySelector("small");
      small.innerText = message;
      formControl.className = 'form-control error';
    }

    function setSuccessFor(input) {
      const formControl = input.parentElement;
      formControl.className = 'form-control success';
    }

    if (nameFlag == 1 && emailFlag == 1 && pwdFlag == 1) {

      if (localStorage.getItem('users') == null) {
        console.log("no users yet so register");
      } else {
        var old_users = JSON.parse(localStorage.getItem('users'));
        var count = 0;
        for (var i = 0; i < old_users.length; i++) {
          if (old_users[i].email == fpEmail && old_users[i].name == fpName) {
            count = 1;
            old_users[i].pwd = fpnewPwd;
            localStorage.setItem('users', JSON.stringify(old_users));
            break;
          }
        }
        if (count == 0) {
          document.getElementById("here").innerText = "Invalid credentials";
        } else {
          window.location.href = "login.html";
        }
      }
    }
  });
}
