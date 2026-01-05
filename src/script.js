let map = document.getElementById("map");
let indonesia = document.getElementById("indonesia");

let pinForm = document.getElementById("pinForm");
let pinNameInput = document.getElementById("pinName");
let savePinBtn = document.getElementById("savePin");

let pins = JSON.parse(localStorage.getItem("pins")) || [];
let tempPosition = null;


let startX = 0;
let startY = 0;


map.addEventListener("dblclick", (e) => {
  const rect = map.getBoundingClientRect();

  const x = (e.clientX - rect.left - posisi.x) / scale;
  const y = (e.clientY - rect.top - posisi.y) / scale;

  tempPosition = { x, y };

  pinForm.style.left = e.clientX + "px";
  pinForm.style.top = e.clientY + "px";
  pinForm.classList.remove("hidden");
});




savePinBtn.addEventListener("click", () => {
  if (!pinNameInput.value.trim()) return;

  const pin = {
    id: Date.now(),
    name: pinNameInput.value,
    x: tempPosition.x,
    y: tempPosition.y
  };

  pins.push(pin);
  localStorage.setItem("pins", JSON.stringify(pins));

  renderPin(pin);

  pinForm.classList.add("hidden");
});

function renderPin(pin) {
  const el = document.createElement("div");
  el.className = "pin";
  el.style.left = pin.x + "px";
  el.style.top = pin.y + "px";

  el.innerHTML = `
    <img src="../map-pin.svg">
    <span>${pin.name}</span>
  `;

 viewport.appendChild(el);

}


let posisi = {
  x: 0,
  y: 0,
};

let isDrag = false;

let scale = 1;

let viewport = document.getElementById("viewport");

function zoom() {
  viewport.style.transform =
    `translate(${posisi.x}px, ${posisi.y}px) scale(${scale})`;
}

map.addEventListener("mousedown", (e) => {
  isDrag = true;
  startX = e.clientX;
  startY = e.clientY;
});

map.addEventListener("mousemove", (e) => {

    if (!isDrag) {
        return
    }
  
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  
  
  
  posisi.x += dx;
  posisi.y += dy;
  

  
  
  startX = e.clientX;
  startY = e.clientY;
  
  map.style.cursor = "grabbing"
  
  zoom();
  
});

document.addEventListener('mouseup', (e) => {
    isDrag = false
  map.style.cursor = "default   "
    
})

map.addEventListener("wheel", (e) => {
  e.preventDefault();

  if (e.deltaY < 0) {
    scale *= 1.1;
  } else {
    scale *= 0.9;
  }

  if (scale >= 10) {
    scale = 10;
  }
  if (scale <= 1) {
    scale = 1;
  }

  zoom();
});


pins.forEach(pin => renderPin(pin));
