// --- Utilidades de almacenamiento ---
function saveData() {
  localStorage.setItem('mister_numbers', JSON.stringify(numbers));
  localStorage.setItem('mister_images', JSON.stringify(images));
  localStorage.setItem('mister_message', document.getElementById('message').value || "");
  localStorage.setItem('mister_walink', document.getElementById('wa-link').value || "");
}
function loadData() {
  numbers = JSON.parse(localStorage.getItem('mister_numbers') || '[]');
  images = JSON.parse(localStorage.getItem('mister_images') || '[]');
  document.getElementById('message').value = localStorage.getItem('mister_message') || "";
  document.getElementById('wa-link').value = localStorage.getItem('mister_walink') || "";
}

function renderLists() {
  // Números
  const list = document.getElementById('number-list');
  list.innerHTML = '';
  numbers.forEach((num, idx) => {
    const li = document.createElement('li');
    li.textContent = num;
    const del = document.createElement('button');
    del.textContent = "✕";
    del.className = "delete-btn";
    del.title = "Eliminar número";
    del.onclick = () => { numbers.splice(idx,1); renderLists(); saveData(); };
    li.appendChild(del);
    list.appendChild(li);
  });
  // Imágenes
  const imgList = document.getElementById('image-list');
  imgList.innerHTML = '';
  images.forEach((url, idx) => {
    const cont = document.createElement('div');
    cont.className = "img-container";
    const img = document.createElement('img');
    img.src = url;
    img.alt = "Imagen";
    const del = document.createElement('button');
    del.textContent = "✕";
    del.className = "delete-img-btn";
    del.title = "Eliminar imagen";
    del.onclick = () => { images.splice(idx,1); renderLists(); saveData(); };
    cont.appendChild(img);
    cont.appendChild(del);
    imgList.appendChild(cont);
  });
  saveData();
}

// Agregar número desde el input
function addNumber() {
  const input = document.getElementById('number-input');
  const num = input.value.trim();
  if (num && /^\d+$/.test(num)) {
    numbers.push(num);
    input.value = '';
    renderLists();
  } else if (num) {
    input.value = '';
    input.placeholder = 'Número inválido';
    setTimeout(() => { input.placeholder = 'Ej: 5491123456789'; }, 1500);
  }
}

// Subir imagen desde PC
function triggerImageInput() {
  document.getElementById('image-upload').click();
}
function handleImageUpload(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    images.push(e.target.result);
    renderLists();
  }
  reader.readAsDataURL(file);
}

// Enviar mensaje masivo (WhatsApp)
function sendWhatsApp() {
  if (numbers.length === 0) {
    alert('Agrega al menos un número.');
    return;
  }
  const msg = document.getElementById("message").value.trim() || "Hola desde Mister";
  const text = encodeURIComponent(msg);
  numbers.forEach(num => {
    window.open(`https://wa.me/${num}?text=${text}`, '_blank');
  });
}

// Abrir WhatsApp propio (vinculación)
function openMyWhatsApp() {
  const link = document.getElementById('wa-link').value.trim();
  if (!/^https?:\/\/wa\.me\/\d+$/i.test(link)) {
    alert('Pon un link válido de WhatsApp, por ejemplo: https://wa.me/5491123456789');
    return;
  }
  window.open(link, '_blank');
}

// Borrar todo
function borrarTodo() {
  if(confirm("¿Seguro que quieres borrar todos los números, imágenes y mensajes?")) {
    numbers = [];
    images = [];
    document.getElementById('message').value = "";
    document.getElementById('wa-link').value = "";
    renderLists();
    saveData();
  }
}

window.onload = function() {
  loadData();
  renderLists();
  document.getElementById('message').oninput = saveData;
  document.getElementById('wa-link').oninput = saveData;
};

// Función recursiva para calcular el factorial de un número
function calcularFactorial(numero) {
  // Caso base: factorial de 0 y 1 es 1
  if (numero <= 1) {
    return 1;
  }
  // Caso recursivo: n! = n * (n-1)!
  return numero * calcularFactorial(numero - 1);
}

// Función recursiva para calcular la suma de números del 1 al n
function sumaRecursiva(n) {
  // Caso base
  if (n <= 0) {
    return 0;
  }
  // Caso recursivo: n + suma(n-1)
  return n + sumaRecursiva(n - 1);
}

// Función recursiva para contar elementos en un array
function contarElementos(array, indice = 0) {
  // Caso base: si llegamos al final del array
  if (indice >= array.length) {
    return 0;
  }
  // Caso recursivo: 1 + contar el resto
  return 1 + contarElementos(array, indice + 1);
}


