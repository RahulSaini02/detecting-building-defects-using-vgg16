import { useRef, useState } from "react";
import axios from "axios";

import {
  VideoCameraIcon,
  UploadIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

function FileUpload({ setRecordVideo, setFile, file, webmUpload }) {
  const fileRef = useRef(null);

  const [upload, setUpload] = useState(null);

  const addFile = (e) => {
    const reader = new FileReader();

    setUpload(e.target.files[0]);

    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      setFile(readerEvent.target.result);
    };
  };

  const fileUpload = () => {
    const formData = new FormData();
    upload
      ? formData.append("file", upload)
      : formData.append("file", webmUpload);

    axios.post("http://localhost:5000/upload", formData);
  };

  return (
    <div>
      <header className="text-center sub-header">
        <h2>DETECT DEFECTS</h2>
      </header>
      <main className="h-[30vh] grid place-items-center">
        <div className="flex flex-col items-center h-[50%] justify-between  sm:flex-row sm:w-[50%] sm:justify-around">
          <button
            onClick={() => fileRef.current.click()}
            className="cta-outlined inline-flex items-center mx-2"
          >
            Upload Vedio
            <span>
              <UploadIcon className="h-5 w-5 ml-2" />
            </span>
            <form>
              <input type="file" hidden onChange={addFile} ref={fileRef} />
            </form>
          </button>
          <button
            onClick={() => setRecordVideo(true)}
            className="cta-solid inline-flex items-center mx-2"
          >
            Record Vedio
            <span>
              <VideoCameraIcon className="h-5 w-5 ml-2" />
            </span>
          </button>
        </div>
      </main>
      {file && (
        <>
          <p className="text-lg text-gray-500 text-center">File selected</p>
          <div className="flex justify-center mb-4">
            <div className="rounded-lg border-2 border-gray-600 border-dashed p-3">
              <video width="320" height="240" controls>
                <source src={file} type="video/mp4" />
                <source src={file} type="video/webm" />
              </video>
            </div>
          </div>
          <p
            onClick={() => setFile(null)}
            className="text-red-500 text-center text-base mb-5 cursor-pointer"
          >
            remove
          </p>
          <Link href="/result">
            <div className="flex justify-center">
              <button
                onClick={fileUpload}
                className="cta-result inline-flex items-center"
              >
                Get results
                <span>
                  <RefreshIcon className="h-5 w-5 ml-2" />
                </span>
              </button>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}

export default FileUpload;
