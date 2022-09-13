let pan = document.getElementById("pan");
let aadhar = document.getElementById("aadhar");
let dob= document.getElementById('dob');
let alert=document.getElementById('alert');
let submit=document.getElementById("btn");
let textwelcome=document.getElementById("welcome");
let main=document.getElementById("main");
let pregex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
let adregex = /([0-9]){12}/;
let messsage="";

getName();
async function getName()
{
    const response=await datasearching();
    textwelcome.innerText+=`Welcome, ${response[0].name}`;
}




submit.addEventListener('click',async(e)=>{
    e.preventDefault();

    if(pan.value=="" && aadhar.value=="" && dob.value=="")
    {
        messsage='all field must be filld'
        FormValidation(messsage);
    }
    else if(pan.value=="" || aadhar.value=="" || dob.value=="")
    {
        if(pan.value=="")
        {
            messsage="Pan must be required";
            FormValidation(messsage);
        }
        else if(aadhar.value=="")
        {
            messsage="Aadhar must be required";
            FormValidation(messsage);
        }
        else
        {
            messsage="DOB must be required";
            FormValidation(messsage);
        }
    }
    else if(pregex.test(pan.value.toUpperCase())!=true)
    {
        messsage="Pan is invalid";
        FormValidation(messsage);
    }
    else if(adregex.test(aadhar.value)!=true)
    {
        messsage="Aadhar is invalid";
        FormValidation(messsage);
    }
    else
    {
        let verifyPan=await searching("panNumber");
        console.log(verifyPan);
        
        let verifyAadhar= await searching("aadharNumber");
        console.log(verifyAadhar);
        
        if(verifyAadhar.length!=0 && verifyPan.length!=0)
        {
            messsage="Aadhar and Pan is already used";
            FormValidation(messsage);
        }
        else if(verifyAadhar.length!=0)
        {
            messsage="Aadhar is already used";
            FormValidation(messsage);
        }
        else if(verifyPan.length!=0)
        {
            messsage="Pan is already used";
            FormValidation(messsage);
        }
        else
        {
            updating();
            window.document.location=`/personalDetails`;
        }
    }
    console.log(pan.value);
})

function FormValidation(messsage) {

    alert.style.display = "block";
    main.style.height="32rem";
    alert.innerHTML = `<img src="alert.png" alt="" srcset="" style="height:20px">${" " + messsage}`;
    setTimeout(() => {
        alert.style.display = "none";
        main.style.height="30rem";
    }, 4000);
}

async function searching(sample)
{
    let data={};
    if(sample=="aadharNumber")
    {
        data = {
            "aadharNumber": aadhar.value
        }
    }
    else if(sample=="panNumber")
    {
        data = {
            "panNumber": pan.value
        }
    }
    let url = '/api/searching';
    const params = 
    {
        method: 'post',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
        let response = await fetch(url, params)
        return await response.json();
}

//storing the data in a database

function updating()
{
    const url=`/api/Updateuserdata`;
    const data={
        "panNumber":pan.value.toUpperCase(),
        "mobileNumber":`${localStorage.getItem("mobileNumber")}`,
        "aadharNumber":aadhar.value,
        "dob":dob.value,
        "pinfo":"approved"
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

//searching the data in a database

async function datasearching() {
    let url = '/api/searching';
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

    let response = await fetch(url, params)
    const myJson = await response.json();
    return myJson;
}