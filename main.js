var items = document.querySelector('#app #todo ul')
var input = document.querySelector('#app #todo input')
var button = document.querySelector('#app #todo button')

var perfil = document.querySelector('#app #perfil')


var todos = JSON.parse(localStorage.getItem('list_items')) || [];

function renderTodos() {
    button.style.backgroundColor = '#00bb00';
    items.innerHTML = '';

    todos.forEach(todo => {
        var item = document.createElement('li');
        var todoText = document.createTextNode(todo)

        var link = document.createElement('a')
        link.setAttribute('href', '#')

        var pos = todos.indexOf(todo);
        link.setAttribute('onclick', 'removeTodo(' + pos +')')
        var linkTexto = document.createTextNode('Excluir')
        link.appendChild(linkTexto)

        item.appendChild(todoText)
        item.appendChild(link)
        items.appendChild(item)
        
    });
}

renderTodos();

function addTodo() {
    var todoText = input.value;
    todos.push(todoText);
    input.value = '';

    renderTodos();
    saveToStorage();
}

button.onclick = addTodo;

function removeTodo(pos) {
    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}

axios.get('https://api.github.com/users/edvaldo-valente')
  .then(function (response) {
    console.log(response);
    var data = response.data;
    var avatar = data.avatar_url || ''
    var img = document.createElement('img');
    img.setAttribute('src', avatar)
    img.setAttribute('width', 100)

    perfil.appendChild(img)
  })
  .catch(function (error) {
    console.log(error);
    console.log('Não foi possivel carregar a imagem!');
  });

var myself = document.createTextNode('Edvaldo Valente');

perfil.appendChild(myself);
