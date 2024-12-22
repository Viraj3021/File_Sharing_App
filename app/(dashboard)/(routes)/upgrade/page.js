"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
 // Adjust the path to your firebase.js file

function Upgrade() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                // Querying the 'UploadedFiles' collection. You can add filters if necessary.
                const querySnapshot = await getDocs(collection(db, "uploadedFiles"));
                
                const fileList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFiles(fileList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching files:", error);
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    if (loading) {
        return <div>Loading files...</div>;
    }

    return (
        <div>
            <h1 className="text-lg font-bold mb-4">Uploaded Files are Here </h1>
            <ul className="list-disc pl-5">
          {files.map((file) => (
            <li key={file.id} className="mb-2">
              <p><strong>File Name:</strong> {file.fileName || 'No name'}</p>
              <p><strong>Uploaded By:</strong> {file.userEmail || 'Unknown user'}</p>
              <p><strong>File Size:</strong> {file.fileSize ? `${file.fileSize} KB` : 'No size available'}</p>
              <p><strong>File Password:</strong> {file.filePassword ? "Protected" : "Not protected"}</p>
              <p><strong>URL:</strong>
                {file.fileUrl ? (
                  <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {file.fileUrl}
                  </a>
                ) : 'No URL available'}
              </p>
            </li>
          ))}

            </ul>
        </div>
    );
}

export default Upgrade;
