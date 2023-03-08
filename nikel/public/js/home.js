const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function () {
    window.location.href = "transactions.html"
})

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getCashIn();
    getCashOut();
    getTotal();

    alert("lançamento adicinado com sucesso");


})


checklogged();

function checklogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotal();

}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashIn() {
    const transactions = data.transactions;

    const getCashIn = transactions.filter((item) => item.type === "1");

    if (getCashIn.length) {
        let getCashInHtml = ``;
        let limit = 0;
        if (getCashIn.length > 5) {
            limit = 5;
        } else {
            limit = getCashIn.length;
        }
        for (let index = 0; index < getCashIn.length; index++) {
            getCashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                <h3 class="fs-2">R$ ${getCashIn[index].value.toFixed(2)} </h3>  
                <div class="countainer p-0">
                <div class="row">
                <div class="col-12 col-md-8">
                    <p>${getCashIn[index].description}</p>
                </div>
                <div class="col-12 col-md-3 d-flex justify-content-end">
                    ${getCashIn[index].date}
                </div>
                </div>
                </div>
                </div>
                </div>
            
            `
        }
        document.getElementById("cash-in-list").innerHTML = getCashInHtml
    }

}
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashOut() {
    const transactions = data.transactions;

    const getCashOut = transactions.filter((item) => item.type === "2");

    if (getCashOut.length) {
        let getCashInHtml = ``;
        let limit = 0;
        if (getCashOut.length > 5) {
            limit = 5;
        } else {
            limit = getCashOut.length;
        }
        for (let index = 0; index < getCashOut.length; index++) {
            getCashInHtml += `
                <div class="row mb-4">
                <div class="col-12">
                <h3 class="fs-2">R$ ${getCashOut[index].value.toFixed(2)} </h3>  
                <div class="countainer p-0">
                <div class="row">
                <div class="col-12 col-md-8">
                    <p>${getCashOut[index].description}</p>
                </div>
                <div class="col-12 col-md-3 d-flex justify-content-end">
                    ${getCashOut[index].date}
                </div>
                </div>
                </div>
                </div>
                </div>
            `

        }
        document.getElementById("cash-out-list").innerHTML = getCashInHtml
    }

}

function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`
}
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
