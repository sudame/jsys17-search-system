let request = new XMLHttpRequest();
request.open("GET", "parsed.json", true);
request.send();

let dataObj = {};

request.onreadystatechange = function () {
    if (request.readyState == 4) {
        dataObj = JSON.parse(request.responseText);
    }
};

document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("search").addEventListener('click', function () {
       eventSearch(); 
    });

    document.getElementById("event_search").addEventListener('keydown', function (e) {
        if(e.keyCode == 13){
            eventSearch();
        }
     });
});

function eventSearch(){
    document.getElementById("result").innerHTML = null;
    for (let prop in dataObj) {
        let searchText = "";
        if (document.getElementById("include_event_name").checked) searchText += dataObj[prop].event_name;
        if (document.getElementById("include_event_description").checked) searchText += dataObj[prop].description;
        if (document.getElementById("include_group_name").checked) searchText += dataObj[prop].group_name;
        if (searchText.indexOf(document.getElementById("event_search").value) >= 0) {
            let addContent = "";
            addContent += "<table><tbody><tr><td>企画名</td><td>" + dataObj[prop].event_name + "</td></tr>";
            if(dataObj[prop].group_name){
                addContent += "<tr><td>企画団体</td><td>" + dataObj[prop].group_name + "</td></tr>"                    
            } else {
                addContent += "<tr><td>企画団体</td><td>(企画団体は謎です)</td></tr>"                                        
            }
            if (dataObj[prop].description) {
                addContent += "<tr><td>企画紹介</td><td>" + dataObj[prop].description + "</td></tr></tbody></table>"
            } else {
                addContent += "<tr><td>企画紹介</td><td>(企画紹介はありません)</td></tr></tbody></table>"
            }
            document.getElementById("result").innerHTML += addContent;
        }
    }
}