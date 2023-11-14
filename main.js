music="";
ScoreRight=0;
ScoreLeft=0;
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
function preload(){
    music=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(500,400);
    canvas.position(500,300);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function draw(){
    image(video,0,0,500,400);
    fill("red");
    stroke("black");
    if(ScoreLeft>0.2){
    circle(leftWristX,leftWristY,20);
    puntoIzquierdo=Number(leftWristY);
    nuevoPuntaje=flour(puntoIzquierdo*2);
    volumen=nuevoPuntaje/1000;
    document.getElementById("volumen").innerHTML="Volumen:"+volumen;
    music.setVolume(volumen);
    }
    if(ScoreRight>0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY >0 && rightWristY <= 100)
{
	document.getElementById("speed").innerHTML = "velocidad = 3x";		
	music.rate(3);
} 
else if(rightWristY >100 && rightWristY <= 200)
{
	document.getElementById("speed").innerHTML = "velocidad = 2x";		
	music.rate(2);
} 
else if(rightWristY >200 && rightWristY <= 300)
{
	document.getElementById("speed").innerHTML = "velocidad = 1x";		
	music.rate(1);
} 
else if (rightWristY>300){
    document.getElementById("speed").innerHTML = "velocidad = 0.5x";
    music.rate(0.5)
}
    }
   
}
function play()
{
	music.play();
	music.setVolume(1);
	music.rate(1);
}
function modelLoaded(){
    consele.log("su modelo cargo exitosamente");
}
function gotPoses(results){
    if(results.length>0){
        ScoreRight=results[0].pose.keypoints[10].score;
        ScoreLeft=results[0].pose.keypoints[9].score;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
    }
}
