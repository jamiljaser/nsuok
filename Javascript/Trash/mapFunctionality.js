// Begin Mission Spawning Section

// End Mission Spawning Section


// Begin Map Zoom Section
const zoomElement = document.querySelector(".mapDiv");
let zoom = 1;
const zoomSpeed = 0.1;
let minWidth = 0.1;
let maxWidth = 1.9;
const zoomTransform = zoomElement.style.transform;
mapDivider = document.getElementsByClassName('.mapDiv');




document.addEventListener("wheel", function(e){
   
    if(e.deltaY > 0  && zoom <= 2 && zoom > 0){
        console.log (zoom);
        console.log("zoomed in");
    
        // these are not quotes, they're tildes; " ` ", not " ' ".
        zoomElement.style.transform = `scale(${zoom += zoomSpeed})`;
    
        console.log (zoom);
        
    }

    else if(e.deltaY < 0 && zoom > 0.5 && zoom < 2.1){
        
        console.log("zoomed out");
        zoomElement.style.transform = `scale(${zoom -= zoomSpeed})`;
    }
});





// End Map Zoom Section



