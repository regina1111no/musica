	
noseX=0;
noseY=0;
difference = 0;
rightWristX = 0;
leftWristX = 0;
 function setup() 
{
    canvas=createCanvas(550,500);
    canvas.position(560,160);
  video = createCapture(VIDEO);
  video.size(550, 500);
  poseNet=ml5.poseNet(video,modelLoaded);
  poseNet.on("pose",gotPoses);
}
function draw(){
    background("lightblue");
    document.getElementById("square_side").innerHTML = "Tamaño del texto = " + difference +"px";
  fill('#F90093');
  textSize(difference);
  text("Feliz Halloween 👻",noseX,noseY)
}
function modelLoaded(){
    console.log("No se preocupe le aseguramos que su modelo ya cargo :D")
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    console.log("noseX = " + noseX +" noseY = " + noseY);
 
    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    difference = floor(leftWristX - rightWristX);
 
    console.log("leftWristX  = " + leftWristX  + 
    " rightWristX = "+ rightWristX + " difference = " + difference);

    }
}