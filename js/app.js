//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//Listener
cargarEventos();

function cargarEventos(){
     //dispara cuando se presiona "Agregar Carrito"
     cursos.addEventListener('click', comprarCurso);
     //eliminar un curso del carrito
     carrito.addEventListener('click', eliminarCurso);
     //vaciar carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

     document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//Functions
function comprarCurso(e){
     e.preventDefault();
     //delegation to agregar carrito
     if(e.target.classList.contains('agregar-carrito')){
          const curso = e.target.parentElement.parentElement;
          leerDatosCurso(curso);          
     }
}

//leer datos curso
function leerDatosCurso(curso){
     const infoCurso = {
          imagen: curso.querySelector('img').src, 
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id')
     }
     insertarCarrito(infoCurso);     
}
//Muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
     const row = document.createElement('tr');
     row.innerHTML = `
               <td><img src="${curso.imagen}" style="width:100px;"></td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
          `;
     listaCursos.appendChild(row);
     guardarCursoLocalStorage(curso);
}
//eliminar curso 
function eliminarCurso(e){
     e.preventDefault();
     let curso,
     cursoID;
     if(e.target.classList.contains('borrar-curso')){
          curso = e.target.parentElement.parentElement;
          cursoID = curso.querySelector('a').getAttribute('data-id');
          e.target.parentElement.parentElement.remove();
     }
     //eliminar de localstorage
     eliminarCursoLocalStorage(cursoID);
}
//vaciar carrito
function vaciarCarrito(){
     while(listaCursos.firstChild){
          listaCursos.removeChild(listaCursos.firstChild);
     }
     //vaciar localStorage
     vaciarLocalStorage();
     return false;
}
//almacenar curso en local storage
function guardarCursoLocalStorage(curso){
     let cursos;
     cursos = obtenerCursosLocalStorage();
     //el curso seleccionado se guarda en el arreglo
     cursos.push(curso);
     localStorage.setItem('cursos', JSON.stringify(cursos));
}
//comprueba que haya elementos en LS
function obtenerCursosLocalStorage(){
     let cursosLS;
     if(localStorage.getItem('cursos') === null){
          cursosLS = [];
     }else{
          cursosLS = JSON.parse( localStorage.getItem('cursos') );
     }
     return cursosLS;
}
//imprime los cursos de local storage
function leerLocalStorage(){
     let cursosLS;
     cursosLS = obtenerCursosLocalStorage();     
     cursosLS.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td><img src="${curso.imagen}" style="width:100px;"></td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
          `;
          listaCursos.appendChild(row);
     });
}
//Eliminar curso Local Storge por el ID
function eliminarCursoLocalStorage(cursoID){
     let cursosLS;
     //obternemos los cursos
     cursosLS = obtenerCursosLocalStorage();
     cursosLS.forEach((curso, index) => {
         if(curso.id === cursoID){
              cursosLS.splice(index, 1);
         }
     });
     localStorage.setItem('cursos', JSON.stringify(cursosLS));
}
//Borrar LocalStorage
function vaciarLocalStorage(){
     localStorage.clear();
}
