status = "";
objects = [];

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start(){
    objectDetection = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML = "Status : Detection Objects";
    name = document.getElementById("TEXT").value;
}

function ModelLoaded(){
    console.log("Model has been loaded!");
    status = true;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetection.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_objects").innerHTML = "Number of objects detected are : "+objects.length;

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == name){
                video.stop();
                objectDetection.detect(gotResult);
                document.getElementById('number_objects').innerHTML = name + "found";
                synth = window.speechSynthesis;
                a = new SpeechSynthesisUtterance(name+"font");
                synth.speak(a);
            }
            else{
                document.getElementById("number_objects").innerHTML = name + "not found";
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);  
    objects = results;
}