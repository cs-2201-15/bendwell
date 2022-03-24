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

  //ensure store key value is === stretch

  //guest
  //state.singleStretch

  //auth.session check
  // fetchSingle

  //const stretch = useSelector((state) => state.stretch);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setSingleStretch()) //this is gonna set the state to our array of either one stretch or all of them from a routine. ex : stretch
  }, []);

  const sun = "Sun";
  const tree = "Tree";
  const mountain = "Mountain";
<<<<<<< HEAD
=======
  let currentStretchScore;
>>>>>>> 41715225f36a49748c4a3a758428920d84a5783e

  const stretch = [sun, tree, mountain];

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

  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    for (let i = 0; i < stretch.length; i++) {
      //looping over stretches/routine on state
      for (let j = 0; j < maxPredictions; j++) {
        //looping over classes in model

        if (
          prediction[j].className === stretch[i] &&
          prediction[j].probability > 0.8
        ) {
          setTimeout(() => {
            currentStretchScore = prediction[j].probability;
            // console.log(
            //   "current Target :",
            //   stretch[i],
            //   "current prediction :",
            //   prediction[j]
            // );
            console.log("Hold for 5 seconds!");
          }, 5000);
          continue;
        }
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
        <p>{currentStretchScore}</p>
      </div>
    </div>
  );
};

export default Teachable;
