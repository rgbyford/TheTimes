//$(document).on("click", ".saveButton", handleArticleSave);

// eslint-disable-next-line no-unused-vars
function saveButton() {

    //var articleToSave = $(this).id;
    const buttonInput = {};
    buttonInput.string = $(this).id;
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

// function devourButton(value) {
//     const buttonInput = {};
//     buttonInput.string = value.id;
//     let opts = {
//         method: "POST",
//         body: JSON.stringify(buttonInput),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };
//     fetch("/burgers/devour", opts).then(function (response) {
//         location.reload(); // essential to refresh the page
//     });
// }

// eslint-disable-next-line no-unused-vars
function scrapeButton() {
    let opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch("/scrape", opts).then(function (response) {
        //            console.log (response.body);
        return (response.text());
    }).then(function (string) {
        document.body.innerHTML = string;
        //            location.reload ();
    });
}

//    <button style="float: left" style="display: inline" id={{this}} , onclick="devourButton(this)">Devour!</button>
//    <li style="list-style-type:none; float: left" class="lined-up">{{@index}}: {{this}}</li>