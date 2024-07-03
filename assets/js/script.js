const ingresarTarea = document.querySelector('#input');
const agregarTarea = document.querySelector('#btn1');
const tableBody = document.querySelector('#tableBody');
const totalTareas = document.querySelector('#totalTareas');
const completedTareas = document.querySelector('#completedTareas');
let id = 0;  

const miTarea = [];


//Funcion para agregar tarea
agregarTarea.addEventListener("click", () => {
    const nombreTarea = ingresarTarea.value.trim();
    if (nombreTarea) {
        miTarea.push({ id: id, descripcion: nombreTarea, estado: "Pendiente" });
        ingresarTarea.value = '';
        renderizarTabla();
        id++;  
        updateSummary(); 
    }
});


//Funcion para renderizar tabla
function renderizarTabla() {
    tableBody.innerHTML = '';  

    for (const tarea of miTarea) {
        const nuevaFila = document.createElement('tr');

        nuevaFila.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.descripcion}</td>
            <td><input type="checkbox" onchange="estadoTarea(${tarea.id})" ${tarea.estado === "Terminada" ? "checked" : ""}></td>
            <td><button onclick="borrarTarea(${tarea.id})">Eliminar</button></td>
        `;

        tableBody.appendChild(nuevaFila);
    }
}

//Funcion para borrar
function borrarTarea(idTarea) {
    miTarea.forEach((tarea, index) => tarea.id === idTarea && miTarea.splice(index, 1));
    renderizarTabla()
    resumenTareas()
}

//Funcion estado
function estadoTarea(idTarea) {
    miTarea.forEach((tarea) => {
        tarea.id === idTarea && (tarea.estado = tarea.estado === "Pendiente" ? "Terminada" : "Pendiente")
    });
    renderizarTabla()
    resumenTareas()
}


//Funcion resumen
function resumenTareas() {
    const total = miTarea.length;
    const completed = miTarea.filter(tarea => tarea.estado === "Terminada").length;
    totalTareas.textContent = total;
    completedTareas.textContent = completed;
}