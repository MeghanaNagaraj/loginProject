window.onload = function() {
  //change password code
  document.getElementById("b1").onclick = function() {
    location.href = "index.html";
  };
  var pwdFlag = 0,
    newPwdFlag = 0;
  document.getElementById("cPassSubmit").addEventListener("click", function() {
    event.preventDefault();
    console.log("change password entered");
    var existPwd = document.getElementById("existingPwd").value.trim();
    var newPwd = document.getElementById("newPd").value.trim();
    checkInputs();

    function checkInputs() {
      if (existPwd == "") {
        setErrorFor(existingPwd, 'Existing password cannot be empty');
      } else {
        pwdFlag = 1;
        setSuccessFor(existingPwd);
      }
      if (newPwd == "") {
        setErrorFor(newPd, 'New password cannot be empty');
      } else {
        newPwdFlag = 1;
        setSuccessFor(newPd);
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

    if (pwdFlag == 1 && newPwdFlag == 1) {
      if (localStorage.getItem('users') == null) {
        console.log("no users yet so register");
      } else {
        var old_users = JSON.parse(localStorage.getItem('users'));
        var count = 0;
        for (var i = 0; i < old_users.length; i++) {
          if (old_users[i].pwd == existPwd) {
            count = 1;
            old_users[i].pwd = newPwd;
            localStorage.setItem('users', JSON.stringify(old_users));
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
