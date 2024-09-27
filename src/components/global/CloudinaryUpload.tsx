import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoonLoader } from 'react-spinners';

interface CloudinaryUploadProps {
  fixedSize?: { width: number; height: number };
  onUploadSuccess?: (url: string) => void;
  uploadMessage?: string;
}

const CloudinaryUpload = forwardRef((props: CloudinaryUploadProps, ref) => {
  const { fixedSize, onUploadSuccess, uploadMessage = "Upload Image" } = props;
  const cropperRef = useRef<HTMLImageElement>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    getCroppedImage: () => uploadedUrl,
  }));

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setErrorMessage(null);
        console.log('Image selected, opening modal...');
        document.getElementById('my_modal_1')?.showModal();
      };
      reader.readAsDataURL(files[0]);

      if (isUpdating) {
        setUploadedUrl(null);
      }
    }
  };

  const getCroppedImage = () => {
    if (cropperRef.current) {
      const croppedDataUrl = (cropperRef.current as any).cropper.getCroppedCanvas().toDataURL();
      uploadToCloudinary(croppedDataUrl);
    }
  };

  const uploadToCloudinary = (imageDataUrl: string) => {
    setLoading(true);
    const blob = dataURLtoBlob(imageDataUrl);
    const formData = new FormData();
    formData.append('file', blob, 'image.png');
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Upload failed: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.secure_url) {
          setUploadedUrl(data.secure_url);
          setErrorMessage(null);
          toast.success('Image uploaded successfully!');
          if (onUploadSuccess) onUploadSuccess(data.secure_url);
          closeModal();

          setIsUpdating(false);
        }
      })
      .catch(err => {
        console.error(err);
        setErrorMessage('Image upload failed. Please try again: ' + err.message);
        toast.error('Image upload failed. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const dataURLtoBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const closeModal = () => {
    setImage(null);
    setIsUpdating(false); 
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal.close();
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageLoadingStart = () => {
    setImageLoading(true);
  };

  const handleImageClick = () => {
    console.log('working')
    setIsUpdating(true);
    document.querySelector<HTMLInputElement>('input[type="file"]')?.click();
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      {uploadedUrl ? (
  <div className="w-full h-full flex justify-center items-center">
    <label className="cursor-pointer w-full h-full">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg w-full h-full">
        <img
          src={uploadedUrl}
          alt="Uploaded"
          className="max-w-full max-h-full rounded-sm shadow-md object-contain cursor-pointer"
          onLoad={handleImageLoad}
          onError={handleImageLoadingStart}
          onClick={handleImageClick}
        />
        <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
      </div>
    </label>
  </div>
) : (
  <div className="w-full h-full flex justify-center items-center">
    <label className="cursor-pointer w-full h-full">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg w-full h-full py-5">
        <span className="text-4xl">+</span>
        <span className='text-md'>{uploadMessage}</span>
        <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
      </div>
    </label>
  </div>
)}


   
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Crop Your Image</h3>
          {loading ? (
            <div className="flex justify-center items-center w-full h-96">
              <MoonLoader size={50} color={"#123abc"} loading={loading} />
            </div>
          ) : (
            <>
              {image && (
                <Cropper
                  src={image as string}
                  style={{ height: '100%', width: '100%' }}
                  initialAspectRatio={fixedSize ? fixedSize.width / fixedSize.height : undefined}
                  guides={false}
                  ref={cropperRef}
                  aspectRatio={fixedSize ? fixedSize.width / fixedSize.height : NaN}
                />
              )}
              {errorMessage && (
                <div className="text-red-500 mt-2">{errorMessage}</div>
              )}
              <div className="modal-action">
                <button onClick={getCroppedImage} className="btn">Save Cropped Image</button>
                <button onClick={closeModal} className="btn">Close</button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
});

export default CloudinaryUpload;