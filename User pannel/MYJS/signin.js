let maincontainer=document.getElementById("main");
let inputname=document.getElementById('inputname');
let formname = document.getElementById('name');
let phonenumber = document.getElementById('mobilenumber');
let btn = document.getElementById('btn');
let alert = document.getElementById('alert');
let main = document.getElementById('main');
let logintext = document.getElementById('logintext');
let heading=document.getElementById('htext');
let regexName = /^[a-zA-Z ]{4,30}$/;
let regexnumber = /^[0-9]{10}$/;
let baseUrl = 'http://localhost:2500/';
let messsage = "";
let dt = "";

btn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (formname.value == "" && phonenumber.value == "" && btn.innerText=="SUBMIT") {
        messsage = " Name and PhoneNumber Required";
        FormValidation(messsage);
    }
    else if ((formname.value == "" || phonenumber.value == "") && btn.innerText=="SUBMIT") {
        if (formname.value == "") {
            messsage = " Name Required";
            FormValidation(messsage);
        }
        else {
            messsage = " PhoneNumber Required";
            FormValidation(messsage);
        }
    }
    else if ((regexName.test(formname.value) != true) && btn.innerText=="SUBMIT") {
        messsage = "Name is 4-20 character";
        FormValidation(messsage);
    }
    else if(phonenumber.value == "")
    {
        messsage = "PhoneNumber is Required";
        FormValidation(messsage);
    }
    else if (regexnumber.test(phonenumber.value) != true) {
        messsage = "PhoneNumber 10 character Required";
        FormValidation(messsage);
    }
    else {
        let mob = parseInt(phonenumber.value);
        if (isNaN(mob)) {
            alert("cheack your number");
        }
        else {
            dt = await searching();
            if (btn.innerText == 'SUBMIT') {
                if ((dt.length!=0) && (phonenumber.value == dt[0].mobileNumber)) {
                    messsage = "Phone Number is already used";
                    FormValidation(messsage);
                    phonenumber.value = "";
                }
                else {
                    btn.classList.add('disabled');
                    document.getElementById('spiner').classList.remove('d-none');
                    localStorage.setItem("mobileNumber",mob);
                    const response=await sendVerificationCode(mob);
                    //this is for twilio
                    /*if(response.status==='pending')
                    {
                        localStorage.setItem("name", formname.value);
                        localStorage.setItem("mobileNumber", phonenumber.value);
                        localStorage.setItem("signin", "approved");
                        formname.value = "";
                        phonenumber.value = "";
                        window.document.location = `/otp`;
                    }*/

                    //this is for 2 factor authentication

                    if(response.Status=='Success')
                    {
                        storingData();
                        formname.value = "";
                        phonenumber.value = "";
                        localStorage.setItem("Details",response.Details);
                        window.document.location = '/otp';
                    }
                }
            }
            else {

                if ((dt.length!=0) && (dt[0].mobileNumber == phonenumber.value)) {
                    document.getElementById('spiner').classList.remove('d-none');
                    localStorage.setItem("mobileNumber",dt[0].mobileNumber);
                    const response=await sendVerificationCode(dt[0].mobileNumber);
                    //this will be for twilio
                    /*if(response.status==='pending')
                    {
                        window.document.location = '/otp';
                    }*/
                    //this is for 2factor
                    if(response.Status=='Success')
                    {
                        window.document.location = '/otp';
                        localStorage.setItem("Details",response.Details);
                    }
                }
                else
                {
                    messsage="we can't find your account";
                    FormValidation(messsage);
                }
                
            }
            
        }

    }

});

logintext.addEventListener('click', () => {
    if (logintext.innerText == 'Login here') {
        heading.innerText='Login To My Account';
        btn.innerText = 'Login';
        logintext.innerText = 'Signup hear';
        inputname.style.display="none";
        maincontainer.style.height="19rem";
    }
    else {
        btn.innerText = 'SUBMIT';
        heading.innerText='Sign Up';
        logintext.innerText = 'Login here';
        inputname.style.display="block";
        maincontainer.style.height="25rem";
    }

})

function FormValidation(messsage) {

    if(btn.innerText=="SUBMIT")
    {
        alert.innerHTML = `<img src="alert.png" alt="" srcset="" style="height:15px">${" " + messsage}`;
        alert.style.display = "block";
        main.style.height = "27rem";
        setTimeout(() => {
            alert.style.display = "none";
            main.style.height = "25rem";
        }, 2000);
    }
    else
    {
        alert.innerHTML = `<img src="alert.png" alt="" srcset="" style="height:15px">${" " + messsage}`;
        alert.style.display = "block";
        main.style.height = "20rem";
        setTimeout(() => {
            alert.style.display = "none";
            main.style.height = "19rem";
        }, 2000);
    }
}

//send verification code to phone number
/*async function sendVerificationCode(mob) {

    const res = await axios.post(baseUrl + `send-verifaction-otp`, { mob });

    if (res.status === 200) {
        return res.data.verification;
    }
    else {
        return res.data;
    }
}*/

//2 factor authentication
async function sendVerificationCode(mob) {

    let api_key='3fb42b07-fc66-11ec-9c12-0200cd936042';
    let url=`https://2factor.in/API/V1/${api_key}/SMS/${mob}/AUTOGEN`;

    let response = await fetch(url)
    const myJson = await response.json();
    return myJson;
}

async function searching() {
    let url = '/api/searching';
    let data = {
        "mobileNumber": phonenumber.value
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

//storing data
function storingData()
{
    const url=`/api/User`;
    const data={
    "name":formname.value,
    "mobileNumber":phonenumber.value,
    "signin":"approved"
    }
    const params={
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }
    fetch(url,params).then((response)=>{
        response.json()
    }).then((data)=>{
        console.log(data)
    })
}