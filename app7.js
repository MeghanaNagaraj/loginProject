window.onload = function() {
  //delete account
  document.getElementById("b1").onclick = function() {
    location.href = "index.html";
  };
  var userLogin = JSON.parse(localStorage.getItem('loginInfo'));
  var name = userLogin[0].name;
  var users = JSON.parse(localStorage.getItem('users'));
  var userAllInfo = JSON.parse(localStorage.getItem('userAllInfo'));
  var reasonFlag = 0,
    feedFlag = 0,
    ratingFlag = 0;
  document.getElementById("delAccSubmit").addEventListener("click", function() {
    event.preventDefault();
    var reason = document.getElementById("deleteAcc").value.trim();
    var feedback = document.getElementById("deleteAccFeed").value.trim();
    var rating = document.getElementById("deleteAccRate").value.trim();
    checkInputs();

    function checkInputs() {
      if (reason == "") {
        console.log("first");
        setErrorFor(deleteAcc, 'Reason cannot be empty');
      } else {
        console.log("second");
        reasonFlag = 1;
        setSuccessFor(deleteAcc);
      }
      if (feedback == "") {
        setErrorFor(deleteAccFeed, 'Feedback cannot be empty');
      } else {
        feedFlag = 1;
        setSuccessFor(deleteAccFeed);
      }
      if (rating == "") {
        setErrorFor(deleteAccRate, 'Rating cannot be empty');
      } else {
        ratingFlag = 1;
        setSuccessFor(deleteAccRate);
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

    if (reasonFlag == 1 && feedFlag == 1 && ratingFlag == 1) {
      if (localStorage.getItem('accountsDeleted') == null) {
        var user = [{
          name: name,
          reason: reason,
          feedback: feedback,
          rating: rating
        }];
        localStorage.setItem('accountsDeleted', JSON.stringify(user));
        for (var i = 0; i < users.length; i++) {
          if (users[i].name == name) {
            users.splice(i, 1);
            localStorage.users = JSON.stringify(users);
            break;
          }
        }
        for (var i = 0; i < userAllInfo.length; i++) {
          if (userAllInfo[i].name == name) {
            userAllInfo.splice(i, 1);
            localStorage.userAllInfo = JSON.stringify(userAllInfo);
            break;
          }
        }
        alert("Account deleted");
        window.location.href = "login.html";
      } else {
        var user = {
          name: name,
          reason: reason,
          feedback: feedback,
          rating: rating
        };
        var old_users = JSON.parse(localStorage.getItem('accountsDeleted'));
        old_users.push(user);
        localStorage.setItem('accountsDeleted', JSON.stringify(old_users));
        for (var i = 0; i < users.length; i++) {
          if (users[i].name == name) {
            users.splice(i, 1);
            localStorage.users = JSON.stringify(users);
            break;
          }
        }
        for (var i = 0; i < userAllInfo.length; i++) {
          if (userAllInfo[i].name == name) {
            userAllInfo.splice(i, 1);
            localStorage.userAllInfo = JSON.stringify(userAllInfo);
            break;
          }
        }
        alert("Account deleted");
        window.location.href = "login.html";
      }
    }

  });
}
