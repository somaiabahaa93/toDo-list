const form = document.getElementById("form");
let taskTitle = document.getElementById("textInput");
let taskDate = document.getElementById("dateInput");
let taskDescription=document.getElementById("textarea")
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");
const edit = document.getElementById("edit");


var flag=true;


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    formValidate();
})

// function to validate inputs
function formValidate()
{
    console.log(taskTitle)
    if(!taskTitle.value)
    {
        msg.innerHTML="Please enter all data of task "
    }
    else 
    {
        var selected=JSON.parse(localStorage.getItem("selectedTask"))
acceptDate(selected)
// (() => {
//     add.setAttribute("data-bs-dismiss", "");
//   })();

    }

}

// accept data function
var tasksData=[]



// display task 
function displayTasks()
{
    console.log("tasks",tasksData)
    let data=''
    
    tasksData.map((task,index)=>{
        return (data+= `
        <div id=${index}>
              <span class="fw-bold">${task.title}</span>
              <span class="small text-secondary">${task.date}</span>
              <p>${task.description}</p>
      
              <span class="options">
                <i onClick= "editTask(${index})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick ="deleteTask(${index})" class="fas fa-trash-alt"></i>
              </span>
            </div>
        `);
    })
    tasks.innerHTML=data

    // empty the form 
    // taskDate.value=""
    // taskTitle.value=""
    // taskDescription.value=""

}

// delete task 
function deleteTask (index)
{
tasksData.splice(index,1)
localStorage.setItem("tasks",JSON.stringify(tasksData))
displayTasks()
}

// edit task 
function editTask (index)
{
    
    
flag=false
 
    var selectedTask={title:tasksData[index].title,date:tasksData[index].date,description:tasksData[index].description}
    addNew.setAttribute("data-bs-toggle", "modal");
    // addNew.click();
        taskDate.value=selectedTask.date
        taskTitle.value=selectedTask.title
        taskDescription.value=selectedTask.description
    console.log("taaaaaaaaaask",index)
    console.log("selectedTask",selectedTask)
    // formValidate(selectedTask)
    localStorage.setItem("selectedTask",JSON.stringify(selectedTask))
    
      

}


function acceptDate(selected){
     console.log("selectedTask",selected)
     let searchIndex = tasksData.findIndex((task) => task.title==selected.title && task.date==selected.date &&task.description==selected.description );




    
    
    if (flag==true ||searchIndex<0)
    {
        tasksData.push ({
            title:taskTitle.value,
            date:taskDate.value,
            description:taskDescription.value
            })
    
            localStorage.setItem("tasks",JSON.stringify(tasksData))
    
            add.setAttribute("data-bs-dismiss", "modal");
            add.click();
    }
else 
{
    // acceptDate(selectedTask)
    

    console.log("we are editing")

    // console.log("index",index)
    // tasksData.findIndex()
    console.log("is herrrrrrre",searchIndex)
    tasksData[searchIndex].title=taskTitle.value
    tasksData[searchIndex].date=taskDate.value
    tasksData[searchIndex].description=taskDescription.value

    localStorage.setItem("tasks",JSON.stringify(tasksData))

    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    // console.log(tasksData[index])
}
   

   
        
    // (() => {
    //     add.setAttribute("data-bs-dismiss", "");
    //   })();

    displayTasks()

    
}

(() => {
    tasksData = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(tasksData);
    displayTasks();
  })();