let address1=document.getElementById('address1');
let address2=document.getElementById('address2');
let houseNo=document.getElementById('house');
let pincode=document.getElementById('pincode');
let city=document.getElementById('city');
let state=document.getElementById('state');
let btn=document.getElementById('btn');
let alert=document.getElementById('alert');
let main=document.getElementById('main');
let cheackbox=document.getElementById('cheackbox');
let messsage="";

let regex=/^[1-9]{1}[0-9]{5}$/;

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(address1.value==""&&houseNo.value==""&&pincode.value=="")
    {
        messsage="Please Fill the Form";
        FormValidation(messsage);
    }
    else if(address1.value==""||houseNo.value==""||pincode.value=="")
    {
        if(address1.value=="")
        {
            messsage="Adress is Required";
            FormValidation(messsage);
        }
        else if(houseNo.value=="")
        {
            messsage="House No is Required";
            FormValidation(messsage);
        }
        else if(pincode.value=="")
        {
            messsage="PIN is Required";
            FormValidation(messsage);
        }
    }
    else if(regex.test(pincode.value)!=true)
    {
        messsage="PIN is Invalid";
        FormValidation(messsage);
    }
    else
    {
        window.document.location = '/profilescore';
    }
})

pincode.addEventListener('input',async()=>{
    
    if(pincode.value.length==6)
    {
        const response=await fetch(`https://api.postalpincode.in/pincode/${parseInt(pincode.value)}`);
        const data=await response.json();
        if(data[0].Status=='Success')
        {
            state.value=data[0].PostOffice[0].State;
            city.value=data[0].PostOffice[0].Block;
            updating();
        }
        else if(data[0].Status=='Error')
        {
            messsage="Pincode is Invalid";
            FormValidation(messsage);
            pincode.value="";
            city.value="";
            state.value="";
        }
    }
})

cheackbox.addEventListener('change',(e)=>{
    if(e.target.checked)
    {
        btn.classList.remove('disabled');
    }
    else
    {
        btn.classList.add('disabled');
    }
})

function FormValidation(messsage) {

    alert.innerHTML = `<img src="alert.png" alt="" srcset="" style="height:15px">${" " + messsage}`;
    main.style.height="36rem";
    setTimeout(() => {
        alert.innerHTML="";
        main.style.height="34rem";
    }, 4000);
}

//updating the data in database

function updating()
{
    const url=`/api/Updateuserdata`;
    const data={
        "address1":address1.value,
        "housenumber":houseNo.value,
        "pin":pincode.value,
        "city":city.value,
        "state":state.value,
        "Address":"approved",
        "mobileNumber":`${localStorage.getItem("mobileNumber")}`,
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