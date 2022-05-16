var create_account = document.getElementById('linkCreateAccount');
var login_form = document.getElementById('login');
var sign_up_form = document.getElementById('createAccount');

sign_up_form.style.display = "none";
document.getElementById('linkLogin').style.display = "none";

document.getElementById('linkCreateAccount').addEventListener("click", hideLoginForm);
document.getElementById('linkLogin').addEventListener("click", hideCreateAccountForm);

function hideLoginForm() {
   login_form.style.display = "none";
   create_account.style.display = "none"
   sign_up_form.style.display = "block";
   document.getElementById('linkLogin').style.display = "block";
  }

function hideCreateAccountForm() {
    login_form.style.display = "block";
    create_account.style.display = "block"
    sign_up_form.style.display = "none";
    document.getElementById('linkLogin').style.display = "none";
   }