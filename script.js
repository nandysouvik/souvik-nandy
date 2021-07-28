window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle('sticky', window.scrollY > 0);
});
const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector(".navigation");
const navigationItems = document.querySelectorAll(".navigation a");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navigation.classList.toggle("active");
});

navigationItems.forEach((navigationItem) => {
  navigationItem.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navigation.classList.remove("active");
  });
});

const scrollBtn = document.querySelector(".scrollToTop-btn");

window.addEventListener("scroll", function () {
  scrollBtn.classList.toggle("active", window.scrollY > 500);
});

scrollBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

const form = document.getElementById('form');
// const message = document.getElementById('message');
const username = document.getElementById('username');
const email = document.getElementById('email');
const detail = document.getElementById('detail');
const inputs = document.querySelectorAll('input');
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();

  if (!username.value == '' && !email.value == '' && !detail.value == '') {

    function storeDatabase() {
      db.collection('contactInfo').add({
        name: username.value,
        email: email.value,
        detail: detail.value,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      setSuccessForMessage(message, "Succesfully saved");

      username.innerHTML = "";
      email.innerHTML = "";
      detail.innerHTML = "";
    }

    storeDatabase();
  }

  inputs.forEach(input => input.value = '');

});








function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const detailValue = detail.value.trim();
  // const password2Value = password2.value.trim()

  if (usernameValue == '') {
    setErrorFor(username, 'Username can not be blank');
  }
  else {
    setSuccessFor(username);
  }

  if (emailValue == '' || !re.test(emailValue)) {
    setErrorFor(email, 'Email can not be blank');
  } else {
    setSuccessFor(email);
  }

  if (detailValue == '') {
    setErrorFor(detail, 'Detail can not be blank');
  }
  else {
    setSuccessFor(detail);
  }
}

function setErrorFor(input, message) {
  // console.log('inside this')
  const formControl = input.parentElement //form controldiv
  // console.log(formControl)
  const small = formControl.querySelector('small')
  small.innerText = message

  //add error class
  formControl.classList.add("error");

}

function setSuccessFor(input) {
  // console.log('inside this')
  const formControl = input.parentElement //form controldiv
  formControl.classList.add("success");
  formControl.className = 'form-control success'
}

function setSuccessForMessage(input, message) {

  const small = input;
  small.innerText = message;
  small.classList.add("successMessage");
  small.className = 'successMessage';
}
