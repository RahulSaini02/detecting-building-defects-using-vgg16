import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { RefreshIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

function result() {
  const [data, setData] = useState(null);

  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const results = [
        "Fetching data...",
        "Your data is processing",
        "This may take some time..!",
      ];

      setText(results[index]);
      index++;
      if (index == 3) index = 0;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(async () => {
    const res = await fetch("http://localhost:5000/result", {
      crossDomain: true,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data);
    setData(res);
  }, []);

  const handleBack = () => {
    setData(null);
  };

  return (
    <div className="contain">
      <Head>
        <title>Result</title>
      </Head>
      <header className="text-center sub-header">
        <h2>Result</h2>
      </header>
      <main className="flex flex-col  items-center mt-5">
        {data ? (
          <div>
            <div className="flex flex-col items-center sm:text-left">
              <h3 className="sub-header-1">Defects Detected:</h3>
            </div>
            <div className="h-[40%] w-[100%] my-5">
              <div className="flex justify-evenly flex-wrap">
                {data.result == null ? (
                  <h3 className="sub-header-1">None</h3>
                ) : (
                  data.result.map((res) => (
                    <div className="m-1" key="1">
                      <Image
                        className="rounded-xl cursor-pointer m-1"
                        src={`data:image/jpeg;base64, ${res.img.substring(
                          2,
                          res.img.length - 1
                        )}`}
                        alt="result"
                        height={300}
                        width={500}
                      />
                      <p className="para my-5 text-center uppercase">
                        {res.defect}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex mx-auto justify-center">
              <Link href="/preprocess">
                <button
                  onClick={handleBack}
                  className="cta-result flex items-center mt-5"
                >
                  Try Another Data
                  <span>
                    <RefreshIcon className="h-5 w-5 ml-2" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid place-items-center transform rotate-180 animate-spin ">
              <RefreshIcon className="h-10 text-gray-500" />
            </div>
            <p className="para text-center">{text}</p>
          </>
        )}
      </main>

      {/* <main className="grid grid-cols-1  sm:grid-cols-3">
        {data.result.map((res) => (
          <div className="m-1" key={res.id}>
            <Image
              className="rounded-xl cursor-pointer m-1"
              src={`${res.img.substring(1, res.img.length - 1)}`}
              alt="result"
              height={300}
              width={500}
            />
            <p className="para my-5 text-center uppercase">{res.defect}</p>
          </div>
        ))}
        </main> */}
    </div>
  );
}

export default result;
