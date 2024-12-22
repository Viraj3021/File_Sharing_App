"use client";
import { app } from './../../../../../firebaseConfig';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { ArrowLeftSquare } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import FileInfo from './_components/FileInfo';
import FileShareForm from './_components/FileShareForm';

function FilePreview({ params }) {
  const db = getFirestore(app);
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);

  useEffect(() => {
    // Unwrap params and set fileId
    if (params?.fileId) {
      setFileId(params.fileId);
    }
  }, [params]); // This effect will run when params change

  useEffect(() => {
    // Fetch file info once fileId is available
    if (fileId) {
      console.log("File ID:", fileId);
      getFileInfo(fileId);
    } else {
      console.error("File ID is missing");
    }
  }, [fileId]); // This effect runs when fileId is set

  const getFileInfo = async (fileId) => {
    try {
      const docRef = doc(db, "uploadedFiles", fileId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFile(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error.message);
    }
  };

  const onPasswordSave = async (password) => {
    try {
      const docRef = doc(db, "uploadedFiles", fileId);
      await updateDoc(docRef, { password });
    } catch (error) {
      console.error("Error saving password:", error.message);
    }
  };

  return (
    <div className="py-10 px-20">
      <Link href="/upload" className="flex gap-3">
        <ArrowLeftSquare /> Go to Upload
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
        <FileInfo file={file} />
        <FileShareForm file={file} onPasswordSave={onPasswordSave} />
      </div>
    </div>
  );
}

export default FilePreview;