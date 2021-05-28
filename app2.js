window.onload = function() {
  window.history.forward();

  function noBack() {
    window.history.forward();
  }
  //login code
  var emailFlag = 0,
    pwdFlag = 0;
  document.getElementById("loginSubmit").addEventListener("click", function() {
    event.preventDefault();
    var logEmail = document.getElementById("loginEmail").value.trim();
    var logPwd = document.getElementById("loginPwd").value.trim();

    checkInputs();

    function checkInputs() {
      if (logEmail == "") {
        console.log("first");
        setErrorFor(loginEmail, 'Email cannot be empty');
      } else {
        console.log("second");
        emailFlag = 1;
        setSuccessFor(loginEmail);
      }
      if (logPwd == "") {
        setErrorFor(loginPwd, 'Password cannot be empty');
      } else {
        pwdFlag = 1;
        setSuccessFor(loginPwd);
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

    if (emailFlag == 1 && pwdFlag == 1) {
      if (localStorage.getItem('users') == null) {
        console.log("no users yet so register");
      } else {
        var old_users = JSON.parse(localStorage.getItem('users'));
        var count = 0;
        for (var i = 0; i < old_users.length; i++) {
          if (old_users[i].email == logEmail && old_users[i].pwd == logPwd) {
            count = 1;
            var user = [{
              name: old_users[i].name,
              email: logEmail,
              pwd: logPwd
            }];
            localStorage.setItem('loginInfo', JSON.stringify(user));
            break;
          }
        }
        if (count == 0) {
          document.getElementById("here").innerText = "Invalid credentials";
        } else {

          window.location.href = "index.html";
        }
      }
    }
  });
}
