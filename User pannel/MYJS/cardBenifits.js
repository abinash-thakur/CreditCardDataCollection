let accbtn=document.getElementById('accbtn');

accbtn.addEventListener('click',()=>{
    updating();
    window.document.location='/reward';
})

function updating() {
    const url = `/api/Updateuserdata`;
    const data = {
        "mobileNumber":`${localStorage.getItem('mobileNumber')}`,
        "cardBenifits":"approved"
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