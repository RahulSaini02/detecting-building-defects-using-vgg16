import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  VideoCameraIcon,
  XCircleIcon,
  DownloadIcon,
  UploadIcon,
  ReplyIcon,
} from "@heroicons/react/outline";

function Record({ setRecordVideo, file, setFile, setWebmUpload }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [capturing, setCapturing] = useState(false);

  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setOpen(false);
    setStatus(false);
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  const handleUploadData = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      setWebmUpload(blob);
      const url = URL.createObjectURL(blob);
      setFile(url);
      setRecordVideo(false);
    }
  };

  const handleEvents = () => {
    setOpen(!open);
    setStatus(!status);
  };

  const backEvent = () => {
    setRecordedChunks([]);
    setRecordVideo(false);
  };

  return (
    <div className="grid place-items-center">
      <header className="sub-header text-center">
        <h2>Record Vedio</h2>
      </header>
      <div className="mt-5 sm:mt-8">
        {open && (
          <Webcam height="500" width="500" audio={false} ref={webcamRef} />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
        <button
          className={`px-7 py-3 flex items-center rounded-lg  text-center  focus-within:outline-none m-2 ${
            status ? "off" : "bg-blue-900 hover:bg-blue-800 text-white "
          } `}
          onClick={handleEvents}
          disabled={status}
        >
          Open Camera
          <span>
            <VideoCameraIcon className="h-6 ml-2" />
          </span>
        </button>
        <button
          className={`px-7 py-3 flex items-center rounded-lg  text-center   focus-within:outline-none m-2 ${
            status ? "bg-red-500 hover:bg-red-600 text-white" : "off"
          } `}
          onClick={handleEvents}
          disabled={!status}
        >
          Close Camera
          <span>
            <XCircleIcon className="h-6 ml-2" />
          </span>
        </button>
        {capturing ? (
          <button
            className="px-5 py-3 flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-600  text-white focus-within:outline-none m-2"
            onClick={handleStopCaptureClick}
          >
            Stop Capture
          </button>
        ) : (
          <button
            className={`px-5 py-3 flex items-center justify-center rounded-lg  focus-within:outline-none m-2 ${
              status ? "bg-green-500 hover:bg-green-600 text-white" : "off"
            }`}
            onClick={handleStartCaptureClick}
            disabled={!status}
          >
            Start Capture
          </button>
        )}
      </div>
      <div>
        {recordedChunks.length > 0 && (
          <div className="flex mt-5">
            <button
              className="px-5 py-3 flex items-center justify-center rounded-lg bg-gray-500 hover:bg-gray-600  text-white focus-within:outline-none m-2"
              onClick={handleDownload}
            >
              Download
              <span>
                <DownloadIcon className="h-6 ml-2" />
              </span>
            </button>
            <button
              onClick={handleUploadData}
              className="px-5 py-3 flex items-center justify-center rounded-lg bg-green-500 hover:bg-green-600 text-white focus-within:outline-none m-2"
            >
              Upload Recording
              <span>
                <UploadIcon className="h-6 ml-2" />
              </span>
            </button>
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={backEvent}
            className=" flex items-center cta-outlined mt-10"
          >
            Back
            <span>
              <ReplyIcon className="h-5 ml-2" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Record;
