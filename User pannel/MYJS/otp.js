let timerOn = true;
function timer(remaining) {
  var m = Math.floor(remaining / 60);
  var s = remaining % 60;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  document.getElementById("countdown").innerHTML = `Time left: ${m} : ${s}`;
  remaining -= 1;
  if (remaining >= 0 && timerOn) {
    setTimeout(function () {
      timer(remaining);
    }, 1000);
    document.getElementById("resend").innerHTML = `
    `;
    return;
  }
  if (!timerOn) {
    return;
  }
  document.getElementById("resend").innerHTML = `Don't receive the code? 
  <span class="font-weight-bold text-color cursor" onclick="timer(60)">Resend
  </span>`;
}

let number = document.getElementById('number');
let mob = localStorage.getItem('mobileNumber');
number.innerText = mob;
timer(60);

let inputOTP = document.getElementById('inputOTP');
let btnVerify = document.getElementById('btnVerify');
let alert = document.getElementById('alert');

inputOTP.addEventListener('input', OTPlength);
function OTPlength(e) {
  let x = e.target.value;
  if (x.length == 6) {
    btnVerify.classList.remove('disabled');
  }
  else {
    btnVerify.classList.add('disabled');
  }
}

const baseUrl = 'http://localhost:2500/';
//resend otp
document.getElementById('resend').addEventListener('click', async () => {

  alert.style.display = "none";
  inputOTP.value = "";
  document.getElementById('spiner').classList.add('d-none');
  const response = await sendVerificationCode(localStorage.getItem("mobileNumber"));
  localStorage.setItem("Details", response.Details);

})
//verify the otp
btnVerify.addEventListener('click', async (e) => {
  e.preventDefault();

  btnVerify.classList.add('disabled');
  document.getElementById('spiner').classList.remove('d-none');
  let code = inputOTP.value;
  const response = await verifyOTP(mob, code);

  //this is for twilio
  /*if (response.status == 'approved')*/
  //this is for 2factor

  if (response.Status == 'Success') {

    let data = await datasearching();
    if (data[0].database == "none") {

      if (data[0].pinfo == "none") {
        window.document.location = '/pinfo';
      }
      else if (data[0].personalDetails == "none") {
        window.document.location = '/personalDetails';
      }
      else if (data[0].Address == "none") {
        window.document.location = '/Address';
      }
      else if (data[0].profileScore == "none") {
        window.document.location = '/profileScore';
      }
      else if (data[0].profileData == "none") {
        window.document.location = '/profileData';
      }
      else if (data[0].cardBenifits =="none") {
        window.document.location = '/cardbenifits';
      }
      else if (data[0].reward == "none") {
        window.document.location = '/reward';
      }
      else if (data[0].payment == null) {
        window.document.location = '/payment';
      }
    }
    else {
      //localStorage.removeItem("database");
      let status = await searching();
      if ((status.length != 0) && (status[(status.length) - 1].status == 'disapproved')) {
        window.document.location = '/payment';
      }
      else if (status.length == 0) {
        window.document.location = '/payment';
      }
      else {
        window.document.location = '/applicationstatus';
      }
    }
  }

  else if(response.status == 400){
    document.getElementById('spiner').classList.add('d-none');
    alert.style.display = "block";
    alert.innerHTML = `<img src="alert.png" alt="" srcset="" style="height:20px"> Enter the valid OTP`;
    setTimeout(() => {
      alert.style.display = "none";
    }, 4000);
  }

});

//send the verification code to the provided mobile number
//this will for twilio
/*async function sendVerificationCode(mob) {

  const res = await axios.post(baseUrl + `send-verifaction-otp`, { mob });

  if (res.status === 200) {
    return res.data.verification;
  }
  else {
    return res.data;
  }
}*/

//this will be for 2factor

async function sendVerificationCode(mob) {

  let api_key = '3fb42b07-fc66-11ec-9c12-0200cd936042';
  let url = `https://2factor.in/API/V1/${api_key}/SMS/${mob}/AUTOGEN`;

  let response = await fetch(url)
  const myJson = await response.json();
  return myJson;
}

//this function will verify the otp
//this will for twilio
/*async function verifyOTP(mob, code) {

  const res = await axios.post(baseUrl + `verify-otp`, {
    mob,
    code,
  });

  if (res.status === 200) {
    return res.data.verification_check;
  }
  else {
    return res.data.error;
  }
}*/

//this is for otp verification for 2factor

async function verifyOTP(mob, code) {

  const api_key = '3fb42b07-fc66-11ec-9c12-0200cd936042';

  const url = `https://2factor.in/API/V1/${api_key}/SMS/VERIFY/${localStorage.getItem('Details')}/${code}`;

  localStorage.removeItem("Details");

  let response = await fetch(url);
  if (response.status == 200) {
    const myJson = await response.json();
    return myJson;
  }
  else {
    return { "status": 400 };
  }

}

//serching the card status is approved or not in database

async function searching() {
  let url = '/api/status';
  let data = {
    "mobileNumber": `${localStorage.getItem("mobileNumber")}`
  }
  const params = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  let response = await fetch(url, params);
  return await response.json();
}


async function datasearching() {
  let url = '/api/searching';
  let data = {
    "mobileNumber": localStorage.getItem("mobileNumber")
  }
  const params = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  let response = await fetch(url, params)
  const myJson = await response.json();
  return myJson;
}
