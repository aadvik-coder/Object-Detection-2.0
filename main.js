img = "";
status1 = "";
object = [];
objectDetector = "";
function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    document.getElementById("status").style.background = "linear-gradient(#6e63ff 0%, #7930ff)";
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status1 != ""){
        color = "";
        objectDetector.detect(video, gotRessult);
        document.getElementById("objects_detected").innerHTML = "Number of objects detected are: " + object.length;
        if(object.length <= 0){
            document.getElementById("objects_detected").style.background = "linear-gradient(#6e63ff 0%, #7930ff)";
        } else {
            document.getElementById("objects_detected").style.background = "linear-gradient(#ff5454 0%, #ff8754 50%, #fcff54 100%)";
        }
        for(i = 0; i < object.length; i++){
            
            percent = floor(object[i].confidence * 100);
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("status").style.background = "linear-gradient(#ff5454 0%, #ff8754 50%, #fcff54 100%)";
            document.getElementById("objects_detected").innerHTML = "Number of objects detected are: " + object.length;
            
            if(percent < 50){
                color = "#ff3030";
            } else if(percent > 50 && percent <= 70){
                color = "#ff8730";
            } else if(percent > 70 && percent <= 90){
                color = "#fff830";
            } else if(percent > 90 && percent <= 100){
                color = "#30ff34";
            }

            fill(color);
            
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y + 10);
            noFill();
            stroke(color);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
    

    
}
function modelLoaded(){
    console.log("Model Loaded!1111!!1");
    status1 = true;
}

function gotRessult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    object = results;
}