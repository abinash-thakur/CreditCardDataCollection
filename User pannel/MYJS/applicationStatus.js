let elem1 = document.getElementById("myBar1");
let btn=document.getElementById("btn");
let data=[];

async function move1() {
    var height = 1;
    var id = setInterval(frame, 30);
    function frame() {
        if (height >= 100) {
            let check2 = document.getElementById("check2");
            check2.checked = true;
            clearInterval(id);
            let elem2 = document.getElementById("myBar2");
            function move2() {
                var height = 1;
                var id = setInterval(frame, 30);
                function frame() {
                    if (height >= 50) {
                        let check2 = document.getElementById("check2");
                        check2.checked = true;
                        clearInterval(id);
                    } else {
                        height++;
                        elem2.style.height = height + '%';
                    }
                }
                
            }
            move2()
            setTimeout(()=>{
                setTimeout(()=>
                {
                    let msge2=document.querySelector(".message2");
                msge2.innerHTML=`<p>
                
                <ul>
                <li>Kindly check your application status again in next few hours.</li>
                <li>Application status: Accepted</li>
                <li>Approved limit: ${data[0].creditlimit}</li>
                <li>Video KYC: Pending</li>
              </p>`;
              btn.classList.remove("d-none");

                },1000);
                let msge1=document.querySelector(".message1");
                    msge1.innerHTML=`<p>Dear,<b> ${data[0].name}</b> your application has been submitted successfully.</p>`;
              
            },2000);
            
        } else {
            height++;
            elem1.style.height = height + '%';
        }
    }
}

move1();

//any one click the button this function will be fire
btn.addEventListener("click",()=>{
    window.document.location='/timer';
})

//to get the data from searching function

if(localStorage.getItem("mobileNumber")!=null)
{
    getData();
}



async function getData(){
     data=await searching();
    if(data[0].KYCapprovation=="approved")
    {
        btn.classList.remove("disabled");
    }
    else
    {
        localStorage.clear();
    }

    //to clear the localstorage
    if(data.length!=0)
    {
        if(localStorage.getItem("applicationcount")==1)
        {
            await KYCDisapproving();
            btn.classList.add("disabled");
            localStorage.clear();
        }
    }
}


//for searching wheather the KYC is approved by the admin or not
async function searching() {
    let url = '/api/searching';
    let data={"mobileNumber":`${localStorage.getItem("mobileNumber")}`};
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

//for kyc disapproving

async function KYCDisapproving() {
    let url = '/api/KYCDisapproved';
    let data={"mobileNumber":`${localStorage.getItem("mobileNumber")}`};
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