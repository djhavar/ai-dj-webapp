song = "";

function preload()
{
     song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup{
    canvas = createCanvas(600,500);
    canvas.center();

    video =  createCanvas(video);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modalloded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
    Image(video,0,0,600,500);
    Fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist>0.2)
    {
        circle(scoreRightWrist,scoreRightWrist,20);

        if(scoreRightWrist>0 && scoreRightWrist<=100)
        { 
        document.getElementById("speed").innerHTML="speed = 0.5x";
        song.rate(0.5)}
        if(scoreRightWrist>0 && scoreRightWrist<=200)
        { 
        document.getElementById("speed").innerHTML="speed = 1x";
        song.rate(1)}
        if(scoreRightWrist>0 && scoreRightWrist<=300)
        { 
        document.getElementById("speed").innerHTML="speed = 1.5x";
        song.rate(1.5)}
        if(scoreRightWrist>0 && scoreRightWrist<=400)
        { 
        document.getElementById("speed").innerHTML="speed = 2x";
        song.rate(2)}
        if(scoreRightWrist>0 && scoreRightWrist<=500)
        { 
        document.getElementById("speed").innerHTML="speed = 2.5x";
        song.rate(2.5)}
    }
}

if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY);
		new_leftWristY = floor(InNumberleftWristY *2);
		leftWristY_divide_1000 = new_leftWristY/1000;
		document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;		
		song.setVolume(leftWristY_divide_1000);	
	}

    function play()
    {
        song.play();
        song.setvolume(1);
        song.rate(1);
    }


