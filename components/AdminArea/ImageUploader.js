import { useState, useRef } from 'react';
import { auth } from '@/lib/authUtils';
import { storage } from '@/lib/storage';
import { FaCopy, FaPlusSquare } from 'react-icons/fa';
import ButtonEllipsis from '../Loading/ButtonEllipsis';
import toast from 'react-hot-toast';
import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytesResumable
} from 'firebase/storage';

// Uploads images to Firebase Storage
export default function ImageUploader() {
  const linkRef = useRef(null);
  const [dimensions, setDimensions] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const createReader = (file, whenReady) => {
    const reader = new FileReader();
    reader.onload = function (evt) {
      var image = new Image();
      image.onload = function (evt) {
        var width = this.width;
        var height = this.height;
        if (whenReady) whenReady(width, height);
      };
      image.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    const storageRef = ref(
      storage,
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen to updates to upload task
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        toast.error('Sorry - something went wrong - please try again');
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setUploading(false);
          toast.success('Upload complete');
        });
        createReader(file, (width, height) => {
          updateMetadata(storageRef, { customMetadata: { height, width } });
          setDimensions(`${width}x${height}`);
        });
      }
    );
  };

  const doCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(linkRef.current.textContent);
    toast.success('Image url copied');
  };

  return (
    <div className="my-8">
      {!uploading ? (
        <label
          tabIndex="0"
          className="btn btn-black-inverted dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black flex items-center justify-between"
        >
          <span>Upload image</span>
          <FaPlusSquare />
          <input
            className="hidden"
            type="file"
            onChange={uploadFile}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </label>
      ) : (
        <div className="flex-1 font-bold py-3 px-6 rounded transition-colors shadow-md text-gray-900 dark:text-white bg-transparent border border-solid border-gray-900 dark:border-white flex items-center justify-between">
          <ButtonEllipsis color="bg-gray-900 dark:bg-white" className="ml-0" />
          <span>{progress}%</span>
        </div>
      )}

      {downloadURL && (
        <>
          <h2 className="mt-4 mb-2 text-xl">Image url:</h2>
          <pre className="override-pre-styles">
            <code
              onDoubleClick={doCopy}
              ref={linkRef}
            >{`![alt](${downloadURL} "${dimensions}")`}</code>
            <button
              aria-label="Copy link"
              onClick={doCopy}
              className="absolute inset-y-0 right-0 p-3 bg-gray-800"
            >
              <FaCopy className="h-5 w-5" />
            </button>
          </pre>
        </>
      )}
    </div>
  );
}
