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
select.addEventListener('click',selectMe);
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
    trashEditButton.innerHTML=`<i class="fas fa-edit edit-btn btn"></i>`;
    
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
//console.log(typeof(todo_input.value));
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
  //console.log('hello');
  todo_input.value="";
}

 function manageTodo(e)
 {

    
  
   if(e.target.children[0].classList.contains("fa-trash")){
     data=e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    removeFromLocalStorage(data);
   const item=e.target.parentElement;
   item.classList.add("fall");
    
  //console.log(item);
   setTimeout(function(){
     //console.log("ch");
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
  //console.log(e.target.previousElementSibling.innerHTML);
  let t=e.target.previousElementSibling;
   d1=t.innerText;
  //console.log(d1);
  t.setAttribute('contenteditable','true');
  t.focus();
  e.target.innerHTML='<i class="fa fa-plus added btn" aria-hidden="true"></i>';

  const added=document.querySelector(".added");
  
  console.log(added);
  added.addEventListener('click',addnewcontant);
  
  
  //e.target.previousElementSibling.
  //removeFromLocalStorage(data,);
}


 }

 function addnewcontant(e)
 {
   console.log(e.target.parentElement.innerHTML);
   console.log("check");
   d2=e.target.parentElement.previousElementSibling.innerText;
   e.target.parentElement.previousElementSibling.setAttribute('contenteditable','false');
   e.target.parentElement.innerHTML='<i class="fas fa-edit edit-btn btn"></i>';
   removeFromLocalStorage(d1,d2);
 }
 
 function removeFromLocalStorage(data,check="")
 {

   if(JSON.parse(localStorage.getItem("todos")!==null))
   {
     //console.log(e.target.previousElementSibling.previousElementSibling.innerText);

     let array=[];
     array=JSON.parse(localStorage.getItem("todos"));
     //console.log(e.target.parentElement.previousElementSibling.previousElementSibling.innerText);
       //console.log(data);
         if(data!==null){
       //console.log(array);
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
   //console.log(e.target.value);
  // const todo=document.querySelector(".todo")
    var todos=todoList.childNodes;
   //console.log(todos);
   if(todos.length!=0){
   todos.forEach(function(single){
      switch(e.target.value)
      {
        case "all":
        console.log(single);
        //console.log("all");
        single.style.display="flex";
        break;
        case "completed":
        //console.log(todo);
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
