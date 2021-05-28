window.onload = function() {
  var userLogin = JSON.parse(localStorage.getItem('loginInfo'));
  var nm = userLogin[0].name;
  var em = userLogin[0].email;
  document.getElementById("Pname").innerText = nm;
  document.getElementById("Pemail").innerText = em;
  var i;
  if (localStorage.getItem('userAllInfo') != null) {
    var userAll = JSON.parse(localStorage.getItem('userAllInfo'));
    for (i = 0; i < userAll.length; i++) {
      if (userAll[i].name == nm) {
        document.getElementById("contact").innerText = userAll[i].contactNumber;
        document.getElementById("dob").innerText = userAll[i].dob;
        document.getElementById("gender").innerText = userAll[i].gender;
        document.getElementById("college").innerText = userAll[i].college;
        document.getElementById("skills").innerText = userAll[i].skills;
        document.getElementById("lang").innerText = userAll[i].langSpoken;
      }
    }
  }
  document.getElementById("submit").onclick = function() {
    location.href = "myprofile.html";
  };
  document.getElementById("b1").onclick = function() {
    location.href = "index.html";
  };
}
