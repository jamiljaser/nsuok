function redBlueSwitch() {
    var myColor = document.getElementById("pageHeader").style.color;
   
    if (myColor == "red") {
        document.getElementById("pageHeader").style.color = "blue";
        console.log(myColor);
        return myColor;
    }
    else if (myColor !== "red") {
        document.getElementById("pageHeader").style.color = "red";
        console.log(myColor);
        return myColor;
    }
}

//Click header to call redBlueSwitch function
document.getElementById("pageHeader").onclick = redBlueSwitch;

//Click nav buttons to call redBlueSwitch function
document.getElementById("navigationButtons").onclick = redBlueSwitch;

document.getElementsByClassName("footer").onclick = redBlueSwitch;