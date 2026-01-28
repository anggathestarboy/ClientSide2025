let map = document.getElementById("map");
let inputan = document.getElementById("inputan");
let area = document.getElementById("area");
let inputLokasi = document.getElementById("inputLokasi");
let scale = 1;
let startX = 0;
let startY = 0;
let posisi = {x:0, y:0};
let isDrag = false;
let pin = {x: 0, y:0}
let URL_SVG = "http://www.w3.org/2000/svg"
let tampilanPin = document.getElementById("pin");
      let allPin = JSON.parse(localStorage.getItem("allPin")) || [];

function zoom() {
    map.style.transform = `translate(${posisi.x}px, ${posisi.y}px) scale(${scale})`
}



map.addEventListener("mousedown", (e) => {
    isDrag = true;
    startX = e.clientX;
    startY = e.clientY;
})



map.addEventListener("mousemove", (e) => {
    if (!isDrag) {
        return
    }
    
    
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    
    posisi.x += dx;
    posisi.y += dy
    
    
    
    startX = e.clientX;
    startY = e.clientY;
    
    
    zoom()
})

map.addEventListener("mouseup", (e) => {
    isDrag = false;
})


map.addEventListener("wheel", (e) => {
    e.preventDefault();
    
    if (e.deltaY < 0) {
        scale *= 1.1
    }
    else {
        scale *= 0.9
    }
    
    
    if (scale >= 5) {
        scale = 5
    }
    else if(scale <= 1) {
        scale = 1
    }
    
    
    
    zoom();
})



area.addEventListener("dblclick", (e) => {
    inputan.style.display = "block"
})


function closeModal () {
    inputan.style.display = "none"
}



  
    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
   
          closeModal();
           let dataBaru = {
            id: Date.now(),
            name: inputLokasi.value,
            x: pin.x,
            y: pin.y,
         }
         allPin.push(dataBaru);
         localStorage.setItem("allPin", JSON.stringify(allPin));
      
        drawPin()
        }
    })



area.addEventListener("dblclick", (e) => {
  
    let pt = map.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    
  const svgPoint = pt.matrixTransform(map.getScreenCTM().inverse());
 

  
 
    pin.x = svgPoint.x,
    pin.y = svgPoint.y
  
  

  
  
  
  
    
    
})


function drawPin() {
    
    allPin.map((p) => {
        
        let g = document.createElementNS(URL_SVG, 'g');
        g.setAttribute("transform", `translate(${p.x},${p.y} )`)
        
        let teks = document.createElementNS(URL_SVG, "text")
        teks.textContent = p.name
        teks.setAttribute("font-size", 7)
        teks.setAttribute("class", "teksAtas")
        teks.setAttribute("transform", "translate(-7,-25)")
        teks.setAttribute("fill", "black")
     
        let circle = document.createElementNS(URL_SVG, "circle");
        circle.setAttribute("cx", 12)
        circle.setAttribute("fill", "white")
        circle.setAttribute("cy", 10)
        circle.setAttribute("r", 3)
        circle.setAttribute("transform", "translate(-12,-23)")
        
       let pins = document.createElementNS(URL_SVG, "path")
       pins.setAttribute("d", "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0")
   pins.setAttribute(
      "transform",
      `translate(${-12}, ${-22})`
    );
    g.appendChild(pins);
    g.appendChild(teks);
    g.appendChild(circle);
    tampilanPin.appendChild(g)
    })
    
   
}


drawPin();



