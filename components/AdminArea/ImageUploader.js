import { useState, useRef } from 'react';
import { auth } from '@/lib/authUtils';
import { storage, STATE_CHANGED } from '@/lib/storage';
import { FaCopy, FaPlusSquare } from 'react-icons/fa';
import ButtonEllipsis from '../Loading/ButtonEllipsis';
import toast from 'react-hot-toast';

// Uploads images to Firebase Storage
export default function ImageUploader() {
  const linkRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);
    });

    // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
    task
      .then((d) => ref.getDownloadURL())
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
      });
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
          <ButtonEllipsis className="ml-0" />
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
            >{`![alt](${downloadURL})`}</code>
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
