song1="";
song2="";
statusSong1="";
statusSong2="";
scoreleftWrist =0;
scorerightWrist =0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
     
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet Is Initialized');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftWrist = " + scoreleftWrist);
        console.log("scorerightWrist = " + scorerightWrist);


        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX= " + leftWristX + "leftWristY= " + leftWristY);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX= " + rightWristX + "rightWristY= " + rightWristY);
    }    
}
function draw(){
    image(video,0,0,600,500);
    
    fill("#4B0082");
    stroke("#4B0082");
    statusSong1 = song1.isPlaying();
    statusSong2 = song2.isPlaying();
    if(scorerightWrist>0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(statusSong1==false){
            song1.play();
            document.getElementById("song_name").innerHTML = "Playing Song 1";
        }
    }
    if(scoreleftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(statusSong2==false){
            song2.play();
            document.getElementById("song_name").innerHTML = "Playing Song 2";
        }
    }
}
     
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function play(){
    song.play();
}
