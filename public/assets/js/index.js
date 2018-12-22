let article;
let notes = [];
let modal;
//let span;
//span = document.getElementsByClassName("closeNote")[0];

// When the user clicks on the button, open the modal
// eslint-disable-next-line no-unused-vars
function takeNote(articleNum) {
    // Get the modal
    modal = document.getElementById("noteModal");
    if (notes[articleNum] === undefined || notes[articleNum] === "") {
        notes[articleNum] = document.getElementById(`note${articleNum}`).textContent;
        console.log ("Attaching node: ", notes[articleNum]);
    }
    else {
        console.log ("Note already attached: ", notes[articleNum]);
    }
    console.log("take note article: ", articleNum);
    document.getElementById("theNote").value = (notes[articleNum] !== undefined ? notes[articleNum] : "");
    article = articleNum;
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
//span.onclick = function () {
// eslint-disable-next-line no-unused-vars
function closeModal() {
    document.getElementById("theNote").value = ""; // empty out any crap
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// eslint-disable-next-line no-unused-vars
function submitNote() {
    const text = document.getElementById("theNote").value;
    console.log("note submit");
    console.log(text);
    const buttonInput = {};
    buttonInput.value = article;
    buttonInput.text = text;
    notes[article] = text;
    closeModal();
    const opts = {
        method: "POST",
        body: JSON.stringify(buttonInput),
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch("/note", opts).then(function (response) {
        //            console.log (response.body);
        return (response.text());
    }).then(function (string) {
        document.body.innerHTML = string;
        //            location.reload ();
    });

}

// eslint-disable-next-line no-unused-vars
function saveArticleButton(value) {
    //console.log ("Save: ", value);
    const buttonInput = {};
    buttonInput.value = value;
    const opts = {
        method: "POST",
        body: JSON.stringify(buttonInput),
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch("/save", opts).then(function (response) {
        //            console.log (response.body);
        return (response.text());
    }).then(function (string) {
        document.body.innerHTML = string;
        //            location.reload ();
    });
}

// eslint-disable-next-line no-unused-vars
function scrapeArticles() {
    let opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch("/scrape", opts).then(function (response) {
        return (response.text());
    }).then(function (string) {
        document.body.innerHTML = string;
    });
}

// eslint-disable-next-line no-unused-vars
function clearArticles() {
    let opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch("/clear", opts).then(function (response) {
        return (response.text());
    }).then(function (string) {
        document.body.innerHTML = string;
    });
}
// eslint-disable-next-line no-unused-vars
function savedArticles() {
    let opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch("/getSaved", opts).then(function (response) {
        return (response.text());
    }).then(function (string) {
        document.body.innerHTML = string;
    });
}