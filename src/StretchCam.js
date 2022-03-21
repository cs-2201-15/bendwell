import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { drawKeypoints, drawSkeleton } from "./Utilities";
import ml5 from "ml5";

// eslint-disable-next-line import/no-anonymous-default-export
const StretchCam = () => {
  const [tracking, setTracking] = useState(true);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.3,
    });

    if (!tracking) {
      setInterval(() => {
        detect(net);
      }, 1000);
    }
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      //get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //make detections
      const pose = await net.estimateSinglePose(video);
      console.log(pose);

      //next step
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.5, ctx);
    drawSkeleton(pose["keypoints"], 0.5, ctx);
  };

  //run the function
  runPosenet();

  return (
    <div>
      <button type="button" onClick={() => setTracking(!tracking)}>
        Track
      </button>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          top: 100,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          top: 100,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default StretchCam;
