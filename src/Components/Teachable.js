import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";

//if we get "t is not a func" error, make sure dependencies are as follows:    "@teachablemachine/pose": "^0.8.6",
// "@tensorflow/tfjs": "^3.14.0",

const Teachable = () => {
  const cameraArr = useSelector((state) => state.camera);
  console.log(cameraArr);
  // More API functions here:
  // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

  // the link to your model provided by Teachable Machine export panel
  //const URL = "../public/model/";
  let model, webcam, ctx, labelContainer, maxPredictions;
  const canvasRef = useRef(null); //in use effect/didmount

  async function init() {
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load("model/model.json", "model/metadata.json");
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    ctx = canvasRef.current.getContext("2d"); //in use effect/didmount
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function verify(currPose, prediction){
    for(let i = 0; i<maxPredictions; i++){
      if(currPose.name === prediction[i].className && prediction[i].probability>0.8){
        setTimeout(() => {
          let currScore = prediction[i].probability
          console.log("Hold for 5 seconds: ", currScore)
        }, 5000)
        return true
      }
      continue
    }
    return false
  }

  async function predict() {
    let { pose, posenetOutput } = await model.estimatePose(webcam.canvas);

    let currPose = cameraArr[0] || {}
    while(currPose !== null){

      // Prediction #1: run input through posenet
      // estimatePose can take in an image, video or canvas html element
      let prediction = await model.predict(posenetOutput);

      // Prediction 2: run input through teachable machine classification model
      let verified = verify(currPose, prediction)

      if(verified){
      cameraArr.shift()
      }

    }

    // finally draw the poses
    drawPose(pose);
  }

  //delays, pause?, timer
  //victory messages
  //

  function drawPose(pose) {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }
  return (
    <div>
      <div>Teachable Machine Pose Model</div>
      <button
        type="button"
        onClick={() => {
          init();
        }}
      >
        Start
      </button>
      <div>
        <canvas ref={canvasRef} width={200} height={200}></canvas>
      </div>
      <div id="label-container">
        <p>{}</p>
      </div>
    </div>
  );
};

export default Teachable;
