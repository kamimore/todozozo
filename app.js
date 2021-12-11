//Declering Variables
const todo_input=document.querySelector('.todo-input');
const todo_button=document.querySelector('.todo-button');
const todoList = document.querySelector(".todo-list");
const select=document.querySelector(".select");


let check;
let data;
let d1;
let d2;
var d3;

todo_button.addEventListener('click',buttonClicked);
todoList.addEventListener('click',manageTodo);
select.addEventListener('change',selectMe);
retrivingFromLocal();


//Functions
function retrivingFromLocal()
{
  if(JSON.parse(localStorage.getItem("todos")!==null))
  {
    let array=[];
    console.log(JSON.parse(localStorage.getItem("todos")));
    array=JSON.parse(localStorage.getItem("todos"));
    array.forEach(function(values){
    const todoDiv=document.createElement("div");
    todoDiv.classList.add('todo');
    const newTodo=document.createElement("li")
    newTodo.innerText=values;
    todoDiv.appendChild(newTodo);
    const trashEditButton=document.createElement("button");
    trashEditButton.innerHTML=`<i class="fas fa-edit edit-btn  btn"></i>`;
    
    todoDiv.appendChild(trashEditButton);
    const completedButton =document.createElement("button");
    completedButton.innerHTML=`<i class="fas fa-check btn"></i>`;
    todoDiv.appendChild(completedButton);
    const trashButton=document.createElement("button");
    trashButton.innerHTML=`<i class="fas fa-trash delete-btn btn"></i>`;
    
    todoDiv.appendChild(trashButton);
    

    todoList.appendChild(todoDiv);
});

}

}

function buttonClicked(event)
{
  event.preventDefault();
if(todo_input.value!=="")
{
  const todoDiv=document.createElement("div");
  todoDiv.classList.add('todo');
  const newTodo=document.createElement("li")
  newTodo.innerText=todo_input.value;
  todoDiv.appendChild(newTodo);
  const trashEditButton=document.createElement("button");
    trashEditButton.innerHTML=`<i class="fas fa-edit edit-btn btn"></i>`;
    todoDiv.appendChild(trashEditButton);
  const completedButton =document.createElement("button");
  completedButton.innerHTML=`<i class="fas fa-check btn"></i>`;
  todoDiv.appendChild(completedButton);
  const trashButton=document.createElement("button");
  trashButton.innerHTML=`<i class="fas fa-trash delete-btn btn"></i>`;
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
   saveLocalTodos(todo_input.value);
}
  todo_input.value="";
}

 function manageTodo(e)
 {
   if(e.target.children[0].classList.contains("fa-trash")){
     data=e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    removeFromLocalStorage(data);
   const item=e.target.parentElement;
   item.classList.add("fall");
       setTimeout(function(){
      item.remove();;

   },700);

}
if(e.target.children[0].classList.contains("fa-check"))
{
  const item2=e.target.parentElement;
  item2.classList.toggle('completed');
  
}
if(e.target.children[0].classList.contains("fa-edit"))
{
  let t=e.target.previousElementSibling;
   d1=t.innerText;
  t.setAttribute('contenteditable','true');
  t.focus();
 e.target.children[0].classList.remove('fa-edit');
 e.target.children[0].classList.add('mind');
  const added=document.querySelector(".mind");
  console.log(added);
  added.addEventListener('click',addnewcontant);
  
}


 }

 function addnewcontant(e)
 {
   console.log('check');
   console.log(e.target);
   d2=e.target.parentElement.previousElementSibling.innerText;
   e.target.parentElement.previousElementSibling.setAttribute('contenteditable','false');
   e.target.parentElement.innerHTML='<i class="fas fa-edit edit-btn btn"></i>';
   e.target.classList.add('fa-edit');
   e.target.classList.remove('mind');
   removeFromLocalStorage(d1,d2);
 }
 
 function removeFromLocalStorage(data,check="")
 {

   if(JSON.parse(localStorage.getItem("todos")!==null))
   {
     let array=[];
     array=JSON.parse(localStorage.getItem("todos"));
     
         if(data!==null){
      let index=array.indexOf(data);
      if(check=="")
      {
        array.splice(index,1);
      }
      if(check!="")
      {
        array[index]=d2;
      }
localStorage.setItem("todos",JSON.stringify(array));

   }
 }


 }

 function selectMe(e)
 {
    var todos=todoList.childNodes;
   if(todos.length!=0){
   todos.forEach(function(single){
      switch(e.target.value)
      {
        case "all":
        console.log(single);
        single.style.display="flex";
        break;
        case "completed":
        if(single.classList.contains('completed'))
        {
         single.style.display="flex" ;
        }
        else{
          single.style.display="none" ;

        }
        console.log("completed");
        break;
        case "uncompleted":
        if(!single.classList.contains('completed'))
        {
         single.style.display="flex" ;
        }
        else{
          single.style.display="none" ;

        }
        console.log("uncompleted");
        break;
      }
    });
  }


 }

function saveLocalTodos(todo)
{
    let todos;
    if(localStorage.getItem("todos")===null)
    {
      todos=[];
    }
    else{
    todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
      localStorage.setItem("todos",JSON.stringify(todos));

}
