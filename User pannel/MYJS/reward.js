const cardissuedbank=document.getElementById('cardissuedbank');
const bank=document.getElementById('bank');
const btn=document.getElementById('btn');
const checkbox=document.getElementById('checkbox');
const alert=document.getElementById('alert');

let cardissuebankdata="";
let bankdata="";
let messsage="";

checkbox.addEventListener('click',()=>{
    if(checkbox.checked==true)
    {
        btn.disabled=false;
    }
    else{
        btn.disabled=true;
    }
})

btn.addEventListener('click',async (e)=>{
    e.preventDefault();
    cardissuebankdata=cardissuedbank.options[cardissuedbank.selectedIndex].text;
    bankdata=bank.options[bank.selectedIndex].text;
    if(cardissuebankdata == 'Choose Credit card Issuer' && bankdata=='Choose Your Bank')
    {
        messsage="Fill the Details";
        alertbox(messsage);
    }
    else if(cardissuebankdata == 'Choose Credit card Issuer')
    {
        messsage="Fill Card Issuer Bank";
        alertbox(messsage);
    }
    else if(bankdata=='Choose Your Bank')
    {
        messsage="Fill Your Bank";
        alertbox(messsage);
    }
    else
    {
        updating();
        window.document.location='/payment';
    }
})

//alert function

function alertbox(messsage) {

    alert.style.display = "block";
    alert.innerHTML = `<img src="alert.png" alt="" srcset="" style="height:20px">${" " + messsage}`;
    setTimeout(() => {
      alert.style.display = "none";
    }, 4000);
  }

//to store the data in a database
function updating() {
    const url = `/api/Updateuserdata`;
    const data = {
        "mobileNumber":`${localStorage.getItem('mobileNumber')}`,
        "cardissuebank":cardissuebankdata,
        "bank":bankdata,
        "reward":"approved"
    }
    const params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(url, params).then((response) => {
        response.json()
    }).then((data) => {
        console.log(data)
    })
}