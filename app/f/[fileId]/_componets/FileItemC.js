import { Download } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

function FileItemC({ file }) {
  const [password, setPassword] = useState('');

  if (!file) {
    return (
      <div className="text-center text-gray-500">
        Loading file details...
      </div>
    );
  }

  return (
    <div>
      <div className="p-5 rounded-md bg-white flex flex-col items-center">
        <div className="text-center flex-col gap-3 items-center flex">
          <h2 className="text-[20px] text-gray-600">
            <strong className="text-primary">{file.userName || "Someone"}</strong> 
            Shared the file with You
          </h2>
          <h2 className="text-[10px] text-gray-400">Find File details below</h2>
          <Image
            src="/download-file.gif"
            width={150}
            height={150}
            alt="download"
            className="w-[150px] h-[150px] p-5"
          />
          <h2 className="text-gray-500 text-[15px]">
            {file.fileName || "Unknown File"} ⚡ {file.fileType || "Unknown Type"} ⚡ 
            {(file.fileSize ? file.fileSize / 1024 / 1024 : 0).toFixed(2)} MB
          </h2>
        </div>

        {file.password?.length > 3 ? (
          <input
            type="password"
            className="p-2 border rounded-md text-[14px] mt-5
              text-center outline-blue-400"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to access"
          />
        ) : null}

        <button
          className="flex gap-2 p-2 bg-primary text-white rounded-full w-full
            items-center hover:bg-blue-600 text-[14px] mt-5 text-center
            justify-center disabled:bg-gray-300"
          onClick={() => {
            if (file.fileUrl) {
              window.open(file.fileUrl, "_blank");
            } else {
              alert("File URL is missing or invalid!");
            }
          }}
          disabled={file.password && file.password !== password}
        >
          <Download className="h-4 w-4" /> Download
        </button>
        <h2 className="text-gray-400 text-[12px]">*Terms and Conditions apply</h2>
      </div>
    </div>
  );
}

export default FileItemC;
