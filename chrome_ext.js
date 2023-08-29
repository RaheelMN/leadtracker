// varible declaration and assignment
debugger;
let leads=[];
//input text field
const nameEl=document.getElementById('name-el');

//display urls
const leadsUl=document.getElementById('leads-ul');

//save input urls
const saveBtn = document.getElementById('save-btn');

//save current tab url
const tabBtn = document.getElementById('tab-btn');

//Delete all urls
const deleteBtn = document.getElementById('delete-btn');


let json = localStorage.getItem('myleads');
if(json){
    leads = JSON.parse(json);
    renderLeads();
}

//-----Start of Event Handlers---------------

saveBtn.addEventListener('click',function(){

    //save url in array
    leads.push(nameEl.value);

    //reset input feild
    nameEl.value = "";

    //saveLeads in localstorage
    saveLeads();

    //display leads
    renderLeads();
    
});

tabBtn.addEventListener('click',function(){

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
 
        //save url in array
        leads.push(tabs[0].url);

        //saveLeads in localstorage
        saveLeads();
    
        //display leads
        renderLeads(leads);

      });   
    
});

deleteBtn.addEventListener('dblclick',function(){
    
      debugger;
      //Empty leads array
      leads=[];
      
      //clear leads in localstorage
      localStorage.clear();
    
      //Clear display
      renderLeads();

});

//---------End of Event Handlers----------


//----------Start of Function Declaration

function renderLeads(){
    let stringUl = '';
    
    //store all urls from array to string
    for(i=0;i<leads.length;i++){ 
        stringUl += `<li>
                        <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
                    </li>`;  
    }
    
    //display urls
    leadsUl.innerHTML = stringUl;
}

function saveLeads(){

    //clear localstorage?
    localStorage.setItem('myleads',JSON.stringify(leads));
}

//----------End of Function Declaration
