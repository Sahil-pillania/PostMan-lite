console.log("Connected");

// variables 
let addedParamsCount = 0;

// Utility function
// function to get DOM element from string 
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


//   hiding the parameters box intially 
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})


// if the user clicks on json box, hide the params box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// if the user clicks on + button add more parameters 
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=> {
    let params = document.getElementById('params');
    let string = `<div id="parametersBox">
                <div style="display:flex;" class="form-row mb-3">
                    <div class="form-group col-md-4">
                        <input type="email" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter parameter${addedParamsCount + 2} key">
                    </div>
                    <div class="form-group col-md-4">
                        <!-- <label for="exampleFormControlInput1" class="form-label">Email address</label> -->
                        <input type="email" class="form-control" id="parameterValue${addedParamsCount + 2}"
                            placeholder="Enter parameter${addedParamsCount + 2} value">
                    </div>
                    <button  class="btn btn-primary deleteParam mx-2"> - </button>                  
                </div>
            </div>`;
    // convert the element string to DOM node 
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // add an event listener to remove params 
    let deleteParam = document.getElementsByClassName('deleteParam');
    for( item of deleteParam){
        item.addEventListener('click', (e)=>{
            // if(confirm("do you want to delete this param")){
            //     e.target.parentElement.remove();
            // }
            e.target.parentElement.remove();
        })
    }
    addedParamsCount ++;

    
    
    
})
// action on submit button 
let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    // document.getElementById('responseJsonText').value = "Please wait...Fetching response.";
    document.getElementById('response-prism').innerHTML = "Please wait...Fetching response.";

    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='request']:checked").value;
    let contentType = document.querySelector("input[name='content']:checked").value;
    // console.log(url, requestType, contentType);

    if(contentType == "parameters"){
        data = {};
        // console.log(document.getElementById('parameterKey1').value);
        for (let i = 0; i < addedParamsCount+1; i++) {
            if(document.getElementById('parameterKey'+(i+1)) != undefined){
            let key = document.getElementById('parameterKey'+ (i + 1)).value;
            let value = document.getElementById('parameterValue'+ (i + 1)).value;
            // console.log(key, value);
            data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }
    // console.log(url, requestType, contentType); 
    // console.log(data);
    

    if(requestType == 'GET'){
        fetch(url, {
            method: 'GET',
        })
        .then(response=> response.text())
        .then((text) => {
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('response-prism').innerHTML = text;
            Prism.highlightAll();
        });

    }
    if (requestType == 'POST'){
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responeJsonText').value = text;
                document.getElementById('response-prism').innerHTML = text;
                Prism.highlightAll();
            });
    }

 })


//  Text shadow 

var text = document.getElementById('text');
console.log(text.value);
var shadow = '';
for (let i = 0; i < 6; i++) {
    shadow += (shadow ? ',' : '') + i * 1 + 'px ' + i * 1 + 'px 0 rgb(255, 255, 255)';
}
text.style.textShadow = shadow;