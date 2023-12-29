import { validateEmail } from './api.js';


document.addEventListener("DOMContentLoaded", function() {
  var modal = document.getElementById('myModal');
  var btn = document.getElementById("login");
  var span1 = document.getElementById("close1");
  var span2 = document.getElementById("close2");
  var success = document.getElementById("success-modal");
  var logoutBtn = document.getElementById("logout");
  var add_blog = document.getElementById("add-blog");


  if(localStorage.getItem("logedIn")) {
    btn.style.display = "none";
    add_blog.style.display = "block";
    //logoutBtn.style.display = "block"; //remove coment if you want use this buttion
  }

  add_blog.onclick = function() {
    window.location.href = "add_blog.html";
  }

  btn.onclick = function() {
    modal.style.display = "block";
  }

  span1.onclick = function() {
    clearLoginForm();
    modal.style.display = "none";
  }

  function clearLoginForm() {
    document.getElementById("email").value = "";
    document.getElementById("email").style.border = "";
    document.getElementById("email").style.backgroundColor = "";
    document.getElementById("modal-content").style.height = "";
    document.getElementById("email-error").style.display = "none";
    document.getElementById("error-text").innerHTML = "";
  }

  logoutBtn.onclick = function() {
    localStorage.removeItem("logedIn");
    btn.style.display = "block";
    add_blog.style.display = "none";
    logoutBtn.style.display = "none";
    sessionStorage.clear();
  }

  function closeSuccess() {
    clearLoginForm();
    success.style.display = "none";
    btn.style.display = "none";
    add_blog.style.display = "block";
    //logoutBtn.style.display = "block"; //remove coment if you want use this buttion
  }


  span2.onclick = closeSuccess;
  document.getElementById("okay").onclick = closeSuccess;

  function wrongEmail(msg) {
    document.getElementById("email").style.border = "1px solid red";
    document.getElementById("email").style.backgroundColor = "#FAF2F3";
    document.getElementById("modal-content").style.height = "300px";
    document.getElementById("email-error").style.display = "block";
    document.getElementById("error-text").innerHTML = msg;
  }

  function correctEmail() {
    localStorage.setItem("logedIn", true);

    btn.style.display = "none";
    add_blog.style.display = "block";
    //logoutBtn.style.display = "block"; //remove coment if you want use this buttion


    modal.style.display = "none";
    success.style.display = "block";
  }

  document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    if (email === '') {
      wrongEmail('გთხოვთ შეიყვანოთ ელ-ფოსტა');
    } else

    if (/^[^@]+@redberry\.ge$/.test(email)) {
      validateEmail(email)
        .then(result => {
          if (result.success) {
            correctEmail();
          } else {
            wrongEmail('ელ-ფოსტა არ მოიძებნა');
          }
        })
        .catch(error => {
          alert('Error during login: ' + error.message);
        });
    } else {
      wrongEmail("ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge-ზე!");
    }
  });
});
