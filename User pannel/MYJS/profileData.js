const datacontainer = document.getElementById('datacontainer');
const profiledatabtn = document.getElementById('profiledatabtn');

let creditlimit = 0;

datasearch();

async function datasearch() {
    const response = await searching();
    let annualdata = response[0].annualincome;

    if (annualdata == 'More Than 2LACS') {
        creditlimit = generateCreditcardlimit(200000);
    }
    else if (annualdata == 'More Than 3LACS') {
        creditlimit = generateCreditcardlimit(300000);
    }
    else if (annualdata == 'More Than 4LACS') {
        creditlimit = generateCreditcardlimit(400000);
    }
    else if (annualdata == 'More Than 5LACS') {
        creditlimit = generateCreditcardlimit(500000);
    }
    else if (annualdata == 'More Than 6LACS') {
        creditlimit = generateCreditcardlimit(600000);
    }
    else if (annualdata == 'More Than 7LACS') {
        creditlimit = generateCreditcardlimit(700000);
    }
    else if (annualdata == 'More Than 8LACS') {
        creditlimit = generateCreditcardlimit(800000);
    }
    else if (annualdata == 'More Than 9LACS') {
        creditlimit = generateCreditcardlimit(900000);
    }
    else if (annualdata == 'More Than 10LACS') {
        creditlimit = generateCreditcardlimit(1000000);
    }

    creditlimit = creditlimit.toString();

    datacontainer.innerHTML = `
<ul>
    <li>Card Varient : <span class="text-primary fw-bold">Platinum credit card<span></li>
    <li>You can have a total credit limit of Rs. <span class="text-primary fw-bold" id="creditLimit">${creditlimit[0]}${creditlimit[1]}0000.00<span></li>
    <li>Anual charges: Rs. <span class="text-primary fw-bold">0.00<span></li>
    <li>Joining charges: Rs. <span class="text-primary fw-bold">0.00<span></li>
    <li>Anual spending: <span class="text-primary fw-bold">Nil (use without a condition at your ease)<span></li>
</ul>`;

    profiledatabtn.addEventListener('click', () => {
        updating();
        window.document.location = '/cardbenifits';
    })
}



//to generate the credit limit
function generateCreditcardlimit(sample) {
    let rand = Math.floor((Math.random() * 20000) + 1);
    return (sample - rand);
}

//storing the data

function updating() {
    const url = `/api/Updateuserdata`;
    const data = {
        "creditlimit": `${creditlimit[0]}${creditlimit[1]}0000.00`,
        "mobileNumber": `${localStorage.getItem('mobileNumber')}`,
        "profileData": "approved"
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

//seraching the data in database

async function searching() {
    let url = '/api/searching';
    let data = {
        "mobileNumber": `${localStorage.getItem('mobileNumber')}`
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