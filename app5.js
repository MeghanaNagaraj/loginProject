window.onload = function() {
  //my profile code
  var userLogin = JSON.parse(localStorage.getItem('loginInfo'));
  var name = userLogin[0].name;
  var contactFlag = 0,
    dobFlag = 0,
    genderFlag = 0,
    colFlag = 0,
    skillsFlag = 0,
    lanFlag = 0;
  document.getElementById("profileSubmit").addEventListener("click", function() {
    event.preventDefault();
    console.log("my profile clicked");
    var contactNumber = document.getElementById("contactNum").value.trim();
    var dob = document.getElementById("db").value.trim();
    var gender = document.getElementById("gen").value.trim();
    var college = document.getElementById("col").value.trim();
    var skills = document.getElementById("skill").value.trim();
    var langSpoken = document.getElementById("lang").value.trim();

    checkInputs();

    function checkInputs() {
      if (contactNumber == "") {
        console.log("first");
        setErrorFor(contactNum, 'Contact number cannot be empty');
      } else {
        console.log("second");
        contactFlag = 1;
        setSuccessFor(contactNum);
      }
      if (dob == "") {
        setErrorFor(db, 'Date of birth cannot be empty');
      } else {
        dobFlag = 1;
        setSuccessFor(db);
      }
      if (gender == "") {
        setErrorFor(gen, 'Gender cannot be empty');
      } else {
        genderFlag = 1;
        setSuccessFor(gen);
      }
      if (college == "") {
        setErrorFor(col, 'College cannot be empty');
      } else {
        colFlag = 1;
        setSuccessFor(col);
      }
      if (skills == "") {
        setErrorFor(skill, 'Skills cannot be empty');
      } else {
        skillsFlag = 1;
        setSuccessFor(skill);
      }
      if (langSpoken == "") {
        setErrorFor(lang, 'Languages spoken cannot be empty');
      } else {
        lanFlag = 1;
        setSuccessFor(lang);
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
    if (contactFlag == 1 && dobFlag == 1 && genderFlag == 1 && colFlag == 1 && skillsFlag == 1 && lanFlag == 1) {
      if (localStorage.getItem('userAllInfo') == null) {
        var user = [{
          name: name,
          contactNumber: contactNumber,
          dob: dob,
          gender: gender,
          college: college,
          skills: skills,
          langSpoken: langSpoken
        }];
        localStorage.setItem('userAllInfo', JSON.stringify(user));
        window.location.href = "index.html";
      } else {
        var user = {
          name: name,
          contactNumber: contactNumber,
          dob: dob,
          gender: gender,
          college: college,
          skills: skills,
          langSpoken: langSpoken
        };
        var old_users = JSON.parse(localStorage.getItem('userAllInfo'));
        for (var i = 0; i < old_users.length; i++) {
          if (old_users[i].name == name) {
            old_users.splice(i, 1);
            break;
          }
        }
        old_users.push(user);
        localStorage.userAllInfo = JSON.stringify(old_users);
        window.location.href = "index.html";
      }
    }
  });
}
