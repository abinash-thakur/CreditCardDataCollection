console.log("this will be included sucessfully");
let email = document.getElementById('email');
let password = document.getElementById('password');
let btn = document.getElementById('btn');
let alert=document.getElementById("alert");
let messsage = "";
let dt = "";

btn.addEventListener('click', async (e) => {
    e.preventDefault();
    if(email.value=="" && password.value=="")
    {
        messsage="Email and Password is required";
        FormValidation(messsage);
    }
    else if(email.value=="")
    {
        messsage="Email is required";
        FormValidation(messsage);
    }
    else
    {
        dt=await searching();
        if(dt.length==0)
        {
            messsage="Email is invalid";
            FormValidation(messsage);
        }
        else if(dt[0].password!=password.value)
        {
            messsage="Password is invalid";
            FormValidation(messsage);
        }
        else
        {
            window.document.location='/adminpannel';
        }
    }
});

//to verfy user enetr the valid card details or not

function FormValidation(messsage) {
        alert.innerHTML = `<img src="alert.png" alt="" srcset="" style="height:15px">${" " + messsage}`;
        alert.style.display = "block";
        main.style.height = "26rem";
        setTimeout(() => {
            alert.style.display = "none";
            main.style.height = "24rem";
        }, 2000);

}

//searching the eamil and password is found in the database or not

async function searching()
{
    const url=`/api/adminlogin`;
    const data={
    "email":email.value
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
