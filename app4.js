window.onload = function() {
  window.history.forward();

  function noBack() {
    window.history.forward();
  }
  //index page code
  var userLogin = JSON.parse(localStorage.getItem('loginInfo'));
  var name = userLogin[0].name;
  document.getElementById("myname").innerText = "Hello " + name;

  //logout code
  document.getElementById("logout").addEventListener("click", function() {
    event.preventDefault();
    localStorage.removeItem('loginInfo');
    window.location.href = "login.html";
  });

  //user listing code
  document.getElementById("uList").addEventListener("click", function() {
    event.preventDefault();
    console.log("user list clicked");
    var titles = ['<a style="color: #B8390E;text-decoration: underline;">Name</a>', 'Contact no', 'Date of Birth', 'Gender', 'College', 'Skills', 'Languages spoken'];
    var dcol = ['name', 'contactNumber', 'dob', 'gender', 'college', 'skills', 'langSpoken'];
    var old_users = JSON.parse(localStorage.getItem('userAllInfo'));
    console.log(old_users);
    var tbl = document.createElement("table");
    var rw = tbl.insertRow();
    for (var k = 0; k < titles.length; k++) {
      var thead = document.createElement('th');
      thead.innerHTML = titles[k];
      thead.setAttribute("id", k);
      thead.setAttribute("data-order", "asc");
      thead.setAttribute("data-column", dcol[k]);
      rw.appendChild(thead);
    }
    document.getElementById("regUsers").innerText = "Registered users";
    document.getElementById("tls").innerHTML = "";
    document.getElementById("tls").appendChild(tbl);
    buildTable(old_users);

    function buildTable(old_users) {
      var table = document.createElement("table");
      for (var i = 0; i < old_users.length; i++) {
        var j = 0;
        var row = table.insertRow(i);
        for (let prop in old_users[i]) {
          var cell = row.insertCell(j);
          cell.innerHTML = old_users[i][prop];
          j++;
        }
      }
      document.getElementById("content").innerHTML = "";
      document.getElementById("content").appendChild(table);
    }

    $('th').on('click', function() {
      var order = $(this).data('order');
      var column = $(this).data('column');
      console.log('clicked', order, column);
      var items = old_users;
      if (order == "asc") {
        $(this).data('order', "desc");
        items.sort(function(a, b) {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        });
        buildTable(items);
      } else {
        $(this).data('order', "asc");
        items.sort(function(a, b) {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });

        buildTable(items);
      }
    });

  });
  //delete listing
  document.getElementById("dList").addEventListener("click", function() {
    event.preventDefault();
    console.log("user list clicked");
    var til = ['Name', 'Reason', 'Feedback', 'Rating'];
    if (localStorage.getItem('accountsDeleted') != null) {
      var users_deleted = JSON.parse(localStorage.getItem('accountsDeleted'));
      console.log(users_deleted);
      var tbl1 = document.createElement("table");
      var rw1 = tbl1.insertRow();
      for (var k = 0; k < til.length; k++) {
        var thead = document.createElement('th');
        thead.innerHTML = til[k];
        thead.setAttribute("id", k);
        thead.setAttribute("data-order", "asc");
        rw1.appendChild(thead);
      }

      var table1 = document.createElement("table");
      for (var i = 0; i < users_deleted.length; i++) {
        var j = 0;
        var row1 = table1.insertRow(i);
        for (let prop in users_deleted[i]) {
          var cell1 = row1.insertCell(j);
          cell1.innerHTML = users_deleted[i][prop];
          j++;
        }
      }
      document.getElementById("regUsers").innerText = "Accounts deleted";
      document.getElementById("tls").innerHTML = "";
      document.getElementById("tls").appendChild(tbl1); //1
      document.getElementById("content").innerHTML = "";
      document.getElementById("content").appendChild(table1); //2
    } else {
      document.getElementById("regUsers").innerText = "Accounts deleted";
      document.getElementById("tls").innerText = "";
      document.getElementById("content").innerText = "No deleted accounts";
    }
    $('th').on('click', function() {
      console.log('clicked');
    });
  });
}
