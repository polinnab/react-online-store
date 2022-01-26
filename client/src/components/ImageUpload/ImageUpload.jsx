import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './imageUpload.scss';

const ImageUpload = ({ images }) => {
  const [previewList, setPreviewList] = useState([]);
  const inputVal = (e) => {
    const files = e.target.files;
    const filesList = [...previewList];

    for (const item in files) {
      if (files[item].size) {
        filesList.push(files[item]);
      }
    }

    setPreviewList(filesList);
  };

  const removeImage = (idx) => {
    setPreviewList(previewList.filter((elem, index) => (index !== idx ? elem : null)));
  };

	useEffect(() => {
    images(previewList);
	}, [previewList, images])

  return (
    <div className='image-upload'>
      {previewList.map((elem, idx) => {
        const file = URL.createObjectURL(elem);
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
