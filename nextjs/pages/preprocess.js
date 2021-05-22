import Head from "next/head";
import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";

import Record from "../components/Record";

function preprocess() {
  const [recordVideo, setRecordVideo] = useState(false);
  const [file, setFile] = useState(null);
  const [webmUpload, setWebmUpload] = useState(null);

  return (
    <div className="contain  h-[90vh] overflow-y-auto scrollbar-hide">
      <Head>
        <title>{recordVideo ? "Recording" : "Preprocess"}</title>
      </Head>
      {recordVideo ? (
        <Record
          setRecordVideo={setRecordVideo}
          file={file}
          setFile={setFile}
          setWebmUpload={setWebmUpload}
        />
      ) : (
        <FileUpload
          setRecordVideo={setRecordVideo}
          file={file}
          setFile={setFile}
          webmUpload={webmUpload}
        />
      )}
    </div>
  );
}

export default preprocess;
