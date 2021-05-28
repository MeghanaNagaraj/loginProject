window.onload = function() {
  //registration code
  var nameFlag = 0,
    emailFlag = 0,
    pwdFlag = 0;
  var sameEmail = 0,
    sameName = 0,
    i;
  document.getElementById("registerSubmit").addEventListener("click", function() {
    event.preventDefault();
    var regName = document.getElementById("registerName").value.trim();
    var regEmail = document.getElementById("registerEmail").value.trim();
    var regPwd = document.getElementById("registerPwd").value.trim();
    if (localStorage.getItem('users') != null) {
      var old_users = JSON.parse(localStorage.getItem('users'));
      for (i = 0; i < old_users.length; i++) {
        if (old_users[i].name == regName) {
          sameName = 1;
          break;
        }
      }
      for (i = 0; i < old_users.length; i++) {
        if (old_users[i].email == regEmail) {
          sameEmail = 1;
          break;
        }
      }
    }

    checkInputs();

    function checkInputs() {
      if (regName == "") {
        setErrorFor(registerName, 'Username cannot be empty');
      } else if (sameName == 1) {
        sameName = 0;
        setErrorFor(registerName, 'Username already exists');
      } else {
        nameFlag = 1;
        setSuccessFor(registerName);
      }
      if (regEmail == "") {
        setErrorFor(registerEmail, 'Email cannot be empty');
      } else if (sameEmail == 1) {
        sameEmail = 0;
        setErrorFor(registerEmail, 'Email already exists');
      } else if (!isEmail(regEmail)) {
        setErrorFor(registerEmail, 'Email is not valid');
      } else {
        emailFlag = 1;
        setSuccessFor(registerEmail);
      }
      if (regPwd == "") {
        setErrorFor(registerPwd, 'Password cannot be empty');
      } else {
        pwdFlag = 1;
        setSuccessFor(registerPwd);
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

    function isEmail(email) {
      return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);
    }

    //code
    if (nameFlag == 1 && emailFlag == 1 && pwdFlag == 1) {
      if (localStorage.getItem('users') == null) {
        var user = [{
          name: regName,
          email: regEmail,
          pwd: regPwd
        }];
        localStorage.setItem('users', JSON.stringify(user));
        window.location.href = "login.html";
      } else {
        var user = {
          name: regName,
          email: regEmail,
          pwd: regPwd
        };
        var old_users = JSON.parse(localStorage.getItem('users'));
        old_users.push(user);
        localStorage.setItem('users', JSON.stringify(old_users));
        window.location.href = "login.html";
      }
    }
  });
}
