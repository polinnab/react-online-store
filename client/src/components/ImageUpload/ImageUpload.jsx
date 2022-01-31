import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IMAGE_URL } from '../../shared/utils/_constans';
import { uploadImage } from '../../shared/utils/_apiRequests';
import './imageUpload.scss';

const ImageUpload = ({ images, editImages }) => {
  const [previewList, setPreviewList] = useState([]);
  const inputVal = (e) => {
    const files = e.target.files;
    const formData = new FormData();

    for (const item in files) {
      if (files[item].size) {
        formData.append('images', files[item]);
      }
    }

    uploadImage(formData).then(data => {
      if (data.length) {
        setPreviewList([...previewList, ...data])
      }
    })
  };

  const removeImage = (idx) => {
    setPreviewList(previewList.filter((elem, index) => (index !== idx ? elem : null)));
  };


  useEffect(() => {
    if (editImages.length) {
      setPreviewList(editImages)
    }
  }, [editImages])

	useEffect(() => {
    images(previewList);
	}, [previewList, images])

  return (
    <div className='image-upload'>
      {previewList.map((elem, idx) => {
        const file = IMAGE_URL + elem.thumbnail;
        return (
          <div key={idx} className='image-upload__preview'>
            <div className='image-upload__remove' onClick={() => removeImage(idx)}>
              <CloseIcon />
            </div>
            <img className='' src={file} alt={elem.name} />
          </div>
        );
      })}
      <div className='image-upload__input'>
				<AddCircleIcon/>
        <input type='file' multiple onChange={inputVal} />
      </div>
    </div>
  );
};

export default ImageUpload;
