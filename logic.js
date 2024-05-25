let tasklist=JSON.parse(localStorage.getItem("tasklist")) || [];
let totallength=localStorage.getItem("tasklist") != null ? JSON.parse(localStorage.getItem("tasklist")).length : 0;
let selectedsection="all";
let visiblesection=JSON.parse(localStorage.getItem("tasklist")) || [];
document.getElementsByClassName("close")[0].addEventListener("click",()=>{
    document.getElementById("errorModal").classList.toggle("displayyes");
})
document.getElementsByClassName("closebutton")[0].addEventListener("click",()=>{
    document.getElementById("errorModal").classList.toggle("displayyes");
})

function notavailabletext(){
    document.getElementsByClassName("tasksection")[0].innerHTML="<p class='heading text-center large-text tasknotfoundtext'>No task available in this section</p>";
}

Array.from(document.getElementsByClassName("sectionbutton")).forEach((items)=>{
    items.addEventListener("click",(event)=>{
        items.classList.toggle("active");
        document.getElementById(selectedsection).classList.toggle("active");
        selectedsection=event.target.id;

        if(selectedsection == "all"){
            taskelement(tasklist)
            deleteeventlistener(tasklist)
            checkeventlistener(tasklist)
        }
        else if(selectedsection=="completed"){
            visiblesection=tasklist.filter((items)=>{
                return items.checked === true;
            })
            taskelement(visiblesection);
            deleteeventlistener(visiblesection)
            checkeventlistener(visiblesection)
        }
        else if(selectedsection=="incompleted"){
            visiblesection=tasklist.filter((items)=>{
                return items.checked === false;
            })
            taskelement(visiblesection);
            deleteeventlistener(visiblesection)
            checkeventlistener(visiblesection)
        }
        
        })
    })

function taskelement(visibletask_section){
    document.getElementsByClassName("tasksection")[0].innerHTML=""
    if(visibletask_section.length != 0){
        visibletask_section.forEach(items => {
            document.getElementsByClassName("tasksection")[0].innerHTML=document.getElementsByClassName("tasksection")[0].innerHTML + `<div class="container pt-4" style="width:96%;padding-bottom: 0.9rem;" id=${items.id}>
        <div class="row align-items-center d-flex flex-row align-items-center">
          <div class="col-auto">
            <div class="form-check d-flex align-items-center">
            <input class="form-check-input checkstatus" type="checkbox" ${items.checked?"checked disabled":""} id="check${items.id}" style='transform:scale(1.5);border: 1px solid #b9b9b9;'/>
            </div>
          </div>
          <div class="col">
            <div class="input-group">
              <p
                class="incompletedtask task"
                id="text${items.id}"
                value=${items.data}
                style='margin-top: 0px;
                margin-bottom: 0px;
                ${items.checked? "text-decoration: line-through;color:grey":""}
                '
              >
                  ${items.data}
              </p>
            </div>
          </div>
          <div class="col-auto deletebuttonclick"  uniquekey="delete${items.id}">
            <button class="btn bg-danger deletebutton" uniquekey="delete${items.id}"> 
            <img src="./icons8-trash-can.svg" alt="SVG Example" width="20" height="20" uniquekey="delete${items.id}"/>
            </button>
          </div>
        </div>
      </div>`
        });
}
else if(visibletask_section.length==0){
    notavailabletext();
}
}
function deleteeventlistener(tasklists){
    tasklists.forEach((items,index) => {
        document.getElementsByClassName(`deletebuttonclick`)[index]?.addEventListener("click", (event) => {
            let deletedtaskid1;
            tasklist = tasklist.filter((task) => {

                if(`delete${task.id}` === event.target.getAttribute("uniquekey")){
                    deletedtaskid1=task.id;
                }
                return `delete${task.id}` !== event.target.getAttribute("uniquekey");
            })
    
            localStorage.setItem("tasklist", JSON.stringify(tasklist));
            document.getElementById(deletedtaskid1).remove();

            if(tasklist.length==0 || tasklists.length==0){
                notavailabletext();
            }
        });
    });
}

function checkeventlistener(tasklists){
    tasklists.forEach((itemstask,index) => {
        document.getElementsByClassName(`checkstatus`)[index].addEventListener("click",(event)=>{
           
           tasklist = tasklist.map((items)=>{
                if(event.target.id === `check${items.id}`){
                    document.getElementById(`check${items.id}`).setAttribute("checked","")
                    document.getElementById(`check${items.id}`).setAttribute("disabled","")
                    document.getElementById(`text${items.id}`).style.color="grey";
                    document.getElementById(`text${items.id}`).style.textDecoration="line-through";
                    return {...items,checked:true}
                }
                return {...items}
            })

localStorage.setItem("tasklist",JSON.stringify(tasklist));
        })
    });
}
if(localStorage.getItem("tasklist")!= null && localStorage.getItem("tasklist").length != 0){
    taskelement(tasklist)
    deleteeventlistener(tasklist);
    checkeventlistener(tasklist);
}

document.getElementsByClassName("addbutton")[0].addEventListener("click",()=>{
    if(document.getElementsByTagName("input")[0].value === ""){
        document.getElementById("errorModal").classList.toggle("displayyes");
        return;
    }
    tasklist.push({
        data:document.getElementsByTagName("input")[0].value,
        checked:false,
        id:tasklist[tasklist.length-1]?.id+1 || 0
    })
    localStorage.setItem("tasklist",JSON.stringify(tasklist));
    if(document.getElementsByClassName("tasksection")[0].firstElementChild?.classList.contains("tasknotfoundtext")){
        document.getElementsByClassName("tasksection")[0].innerHTML=""
    }

    document.getElementsByClassName("tasksection")[0].innerHTML=document.getElementsByClassName("tasksection")[0].innerHTML + `<div class="container pt-4" style="width:96%;padding-bottom: 0.9rem;" id=${tasklist[tasklist.length-1].id}>
    <div class="row align-items-center d-flex flex-row align-items-center">
      <div class="col-auto">
        <div class="form-check d-flex align-items-center">
        <input class="form-check-input checkstatus" type="checkbox" id="check${tasklist[tasklist.length-1].id}" style='transform:scale(1.5);border: 1px solid #b9b9b9;'/>
        </div>
      </div>
      <div class="col">
        <div class="input-group">
          <p
            class="incompletedtask task"
            id="text${tasklist[tasklist.length-1].id}"
            value=${tasklist[tasklist.length-1].data}
            style='margin-top: 0px;
            margin-bottom: 0px
            '
          >
              ${tasklist[tasklist.length-1].data}
          </p>
        </div>
      </div>
      <div class="col-auto deletebuttonclick" uniquekey="delete${tasklist[tasklist.length-1].id}">
        <button class="btn bg-danger deletebutton" uniquekey="delete${tasklist[tasklist.length-1].id}"> 
        <img src="./icons8-trash-can.svg" alt="SVG Example" width="20" height="20" uniquekey="delete${tasklist[tasklist.length-1].id}"/>
        </button>
      </div>
    </div>
  </div>`
  deleteeventlistener(tasklist);
  checkeventlistener(tasklist);
  document.getElementsByTagName("input")[0].value="";

})

