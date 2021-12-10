//Declering Variables
const todo_input=document.querySelector('.todo-input');
const todo_button=document.querySelector('.todo-button');
const todoList = document.querySelector(".todo-list");
const select=document.querySelector(".select");


//const todo_input=document.querySelector('.todo-input');

//console.log(todo_input);
//Event Listeners
todo_button.addEventListener('click',buttonClicked);
todoList.addEventListener('click',deleteTodo);
select.addEventListener('click',selectMe);
todoList.addEventListener('click',removeFromLocalStorage);
retrivingFromLocal();


//Functions
function retrivingFromLocal()
{


  if(JSON.parse(localStorage.getItem("todos")!==null))
  {
    let array=[];
    console.log(JSON.parse(localStorage.getItem("todos")));
    array=JSON.parse(localStorage.getItem("todos"));
    //let array=localStorage.getItem("todos");
//console.log(array.length);
//console.log(typeof(array));
    array.forEach(function(values){
    const todoDiv=document.createElement("div");
    todoDiv.classList.add('todo');
    const newTodo=document.createElement("li")
    newTodo.innerText=values;
    todoDiv.appendChild(newTodo);
    const completedButton =document.createElement("button");
    completedButton.innerHTML=`<i class="fas fa-check"></i>`;
    todoDiv.appendChild(completedButton);
    const trashButton=document.createElement("button");
    trashButton.innerHTML=`<i class="fas fa-trash delete-btn"></i>`;
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
  const completedButton =document.createElement("button");
  completedButton.innerHTML=`<i class="fas fa-check"></i>`;
  todoDiv.appendChild(completedButton);
  const trashButton=document.createElement("button");
  trashButton.innerHTML=`<i class="fas fa-trash delete-btn"></i>`;
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
   saveLocalTodos(todo_input.value);
}
  //console.log('hello');
  todo_input.value="";
}
 function deleteTodo(e)
 {
   //console.log(e.target.parentElement);

   //console.log(e.target.classList[1]);


   if(e.target.children[0].classList.contains("fa-trash")){
   //console.log(e.target.parentElement);
  const item=e.target.parentElement;
  item.classList.add("fall");
  //console.log("check");
  item.addEventListener('transitionend',e=>{
    item.remove();
  });


}
if(e.target.children[0].classList.contains("fa-check"))
{
  //e.target.parentElement.firstElementSibling
//  console.log(e.target.parentElement.previousElementSibling);
  const item2=e.target.parentElement;
  //console.log(e.target.parentElement);

  item2.classList.toggle('completed');


}


 }

 function removeFromLocalStorage(e)
 {
   if(e.target.children[0].classList.contains("fa-trash")){

   if(JSON.parse(localStorage.getItem("todos")!==null))
   {
     //console.log(e.target.previousElementSibling.previousElementSibling.innerText);

     let array=[];
     array=JSON.parse(localStorage.getItem("todos"));
     //console.log(e.target.parentElement.previousElementSibling.previousElementSibling.innerText);
       let data=e.target.previousElementSibling.previousElementSibling.innerText;
       //console.log(data);
         if(data!==null){
       //console.log(array);
      let index=array.indexOf(data);
      array.splice(index,1);
localStorage.setItem("todos",JSON.stringify(array));

   }
 }}


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
