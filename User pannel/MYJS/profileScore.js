let progressBar=document.querySelector('.circular-progress');
let valueContainer=document.querySelector('.value-container');
let progressValue=0;
let progressEnd=100;
let speed=50;
let progress=setInterval(()=>{
progressValue++;
valueContainer.textContent=`${progressValue}%`;
progressBar.style.background=`conic-gradient(
    #4d5bf9 ${progressValue * 3.6}deg,
    #cadcff ${progressValue * 3.6}deg
)`;
if(progressValue==progressEnd)
{
    clearInterval(progress);
}
     
},speed)
let mark=document.querySelector('.mark');
let line=document.querySelector('.line');
setTimeout(()=>
{
  mark.innerHTML=`Excellent!`;
  setTimeout(()=>
  {
    line.innerHTML=`<b class="text-success">Congrats</b>,${localStorage.getItem("name")} You have an excellent score with American Express.`;
    document.getElementById('load').classList.remove('d-none');
  },1500)
},2500)

let hname=document.getElementById('hname');
getuserdata();
async function getuserdata()
{
    const response=await datasearching();
    hname.innerText= response[0].name;
}

setTimeout(() => {
  
  updating();
  window.document.location='/profileData';
}, 8000);

//update the data in databsae
function updating()
{
    const url=`/api/Updateuserdata`;
    const data={
        "profileScore":"approved",
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

//get the user data from database
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