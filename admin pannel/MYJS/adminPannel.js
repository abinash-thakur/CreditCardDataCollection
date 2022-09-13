const table = document.getElementById('table');
const alert=document.getElementById('alert');
const logoutbutton=document.getElementById('logbtn');
const url = '/api/featching';
let slno = 1;
let response="";
manipulate();

async function manipulate()
{
    response=await searching();
    for(let data of response)
    {
        table.innerHTML+=` <tr>
        <td>${slno++}</td>
        <td>${data.name}</td>
        <td>${data.mobileNumber}</td>
        <td>${data.panNumber}</td>
        <td>${data.aadharNumber}</td>
        <td>${data.dob}</td>
        <td>${data.employment}</td>
        <td>${data.annualincome}</td>
        <td>${data.company}</td>
        <td>${data.creditlimit}</td>
        <td>${data.address1}</td>
        <td>${data.address2}</td>
        <td>${data.housenumber}</td>
        <td>${data.pin}</td>
        <td>${data.city}</td>
        <td>${data.state}</td>
        <td>${data.cardissuebank}</td>
        <td>${data.bank}</td>
        <td><button type="button" class="btn btn-danger btn-sm" onClick="clicking(${data.mobileNumber})">Click Here</button></td>
        
        ${(data.KYCapprovation=="disapproved")?`<td><button type="button" class="btn btn-primary btn-sm" value="${data._id}" onClick="KYCverification(this)" >Approved</button></td>`:`<td><button type="button" class="btn btn-primary btn-sm disabled">Approved</button></td>`}
        <tr>`
    }
}
function clicking(mob)
{
    localStorage.setItem('mobileNumber',mob);
    window.document.location = `/cardDetails`;
}

//any one click the log out button

logoutbutton.addEventListener("click",()=>{
    window.document.location='/';
})

//hera we get the button

async function KYCverification(btn)
{
    let res=await KYCApprovation(btn.value);
    if(res.acknowledged==true)
    {
        btn.classList.add("disabled");
        alert.innerText="Sucessfully Approved the KYC Verification";
        alert.classList.remove("d-none");
        setTimeout(() => {
            alert.classList.add("d-none");
        }, 3000);
    }
    else
    {

    }
}

//to get the all the collection from database
async function searching() {

    const response = await fetch(url);
    const myJson = await response.json();
    return myJson;
}

//to approved the for kyc verification

async function KYCApprovation(id)
{
    const url=`/api/KYCApprovation`;
    const data={
             "id":id,
      }
    const params={
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }
    const response=await fetch(url,params);
    const myjson=await response.json();
    return myjson;
}