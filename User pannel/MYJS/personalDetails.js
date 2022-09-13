let employment=document.getElementById('employment');
let income=document.getElementById('income');
let company=document.getElementById('company');
let btn=document.getElementById('btn');
let alert=document.getElementById('alert');
let messsage="";

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    let empdata=employment.options[employment.selectedIndex].text;
    let incdata=income.options[income.selectedIndex].text;

    if(empdata=='Choose Your Employment Status')
    {
        messsage="Choose the Employment";
        FormValidation(messsage);
    }
    else if(incdata=='Choose Your Anual-Income')
    {
        messsage="Choose the Anual-Income";
        FormValidation(messsage);
    }
    else if(company.value=="")
    {
        messsage="Company name Required";
        FormValidation(messsage);
    }
    else
    {
        updating(empdata,incdata);
        window.document.location=`/Address`;
    }
})

function FormValidation(messsage) {

    alert.style.display = "block";
    main.style.height="33rem";
    alert.innerHTML = `<img src="alert.png" alt="" srcset="" style="height:20px">${" " + messsage}`;
    setTimeout(() => {
        alert.style.display = "none";
        main.style.height="30rem";
    }, 4000);
}

//update the data in database

function updating(empdata,annualincome)
{
    const url=`/api/Updateuserdata`;
    const data={
        "employment":empdata,
        "mobileNumber":`${localStorage.getItem("mobileNumber")}`,
        "annualincome":annualincome,
        "company":company.value,
        "personalDetails":"approved"
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