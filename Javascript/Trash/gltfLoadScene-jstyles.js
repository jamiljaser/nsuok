// Keeps the model list and model canvas divs equal in height
function equalHeight(){
    var modelListDivHeight = document.getElementById("modelListNavDiv").style.height;
    // console.log(modelListDivHeight);
    var modelCanvasDivHeight = document.getElementById("modelViewerDiv").style.height;
    // console.log(modelListDivHeight);
    if (modelListDivHeight>modelCanvasDivHeight) {
        modelListDivHeight = window.innerHeight*0.8;
    } else {
        modelListDivHeight = window.innerHeight*0.8;
    }}

equalHeight();

