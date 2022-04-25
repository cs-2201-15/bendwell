import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";
import { useNavigate } from "react-router-dom";
import "./teachable.scss";

//if we get "t is not a func" error, make sure dependencies are as follows:    "@teachablemachine/pose": "^0.8.6",
// "@tensorflow/tfjs": "^3.14.0",

const Teachable = () => {
  const cameraArr = useSelector((state) => state.camera);
  const [completed, setCompleted] = useState(false);
  const [match, setMatch] = useState(false);
  const [status, setStatus] = useState(
    "Ready To Stretch? Press Start to Begin!"
  );
  let matched = false;
  console.log(cameraArr);
  // More API functions here:
  // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

  // the link to your model provided by Teachable Machine export panel
  //const URL = "../public/model/";
  let model, webcam, ctx, labelContainer, maxPredictions;
  const canvasRef = useRef(null); //in use effect/didmount

  const navigate = useNavigate();

  useEffect(() => {
    setCompleted(false);
  }, []);

  useEffect(() => {
    let abortController = new AbortController();
    return () => {
      window.location.reload(true);
      abortController.abort();
      matched = false;
      setMatch(matched);
    };
  }, []);

  async function init() {
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load("model/model.json", "model/metadata.json");
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 500;
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
    let { pose, prediction } = await predict();
    if (!match) {
      if (cameraArr.length > 0) {
        // console.log("CURRENT: ", cameraArr[0].name, "Prediction: ", prediction)
        let score = verify(cameraArr[0], prediction);
        // console.log("CURRENT SCORE:", score, "for stretch:", cameraArr[0].name);
        if (score) {
          // console.log(
          //   `Pose Matched: ${score} Hit the next stretch button to start`
          // );
          matched = true;
          setMatch(matched);
        }
      } else {
        setCompleted(true);
        // console.log("Routine Completed");
        setStatus(
          "Routine Complete! Click to go back to check out some more stretches."
        );
      }
    }
    window.requestAnimationFrame(loop);
  }

  const verify = (currPose, prediction) => {
    // console.log("Current:", currPose.name, prediction);
    for (let i = 0; i < prediction.length - 1; i++) {
      if (
        currPose.name === prediction[i].className &&
        prediction[i].probability > 0.8
      ) {
        // console.log(
        //   "Matched: ",
        //   prediction[i].className,
        //   prediction[i].probability
        // );
        setStatus(
          `Awesome job doing the ${currPose.name} stretch! Try to hold this stretch and click next to continue`
        );
        return prediction[i].probability;
      } else if (
        currPose.name === prediction[i].className &&
        0.8 > prediction[i].probability > 0.4
      ) {
        setStatus(`Try the ${currPose.name}`);
      } else if (
        currPose.name === prediction[i].className &&
        0.4 > prediction[i].probability
      ) {
        setStatus(
          `Try correcting your pose for ${currPose.name}, and make sure your whole body is in frame!`
        );
      } else {
        continue;
      }
    }
    return 0;
  };

  async function predict() {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);
    drawPose(pose);
    return { pose, prediction };
  }

  function drawPose(pose) {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        // tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }

  const handleClick = () => {
    navigate(`/stretches`);
    window.location.reload(true);
  };

  const handleNext = () => {
    cameraArr.shift();
    matched = false;
    setMatch(matched);
  };

  return (
    <div className="teachable-container">
      <h2>Stretch Cam</h2>
      <p>Make sure your full body is in view!</p>
      <button
        id="init"
        className="button"
        type="button"
        onClick={() => {
          init();
        }}
      >
        Start
      </button>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="canvas"
      ></canvas>
      <div className="label-container">
        {/* <div>{`Stretch: ${stretchName}`}</div> */}
        <h3
          style={{ fontSize: "32px", fontWeight: "500", margintop: "30px" }}
          className="status"
        >
          {status}
        </h3>
        {completed ? (
          <button className="button-status" onClick={() => handleClick()}>
            Go Back to Stretches
          </button>
        ) : match ? (
          <button className="button-status" onClick={() => handleNext()}>
            Next Stretch
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Teachable;
