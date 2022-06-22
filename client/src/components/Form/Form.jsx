import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import './form.scss';
import FormSubmitButton from './Button';
import facebook from './images/facebook.png';
import facebookActive from './images/facebook-active.png';
import viber from './images/viber.png';
import viberActive from './images/viber-active.png';
import telegram from './images/telegram.png';
import linkedin from './images/likedin.png';
import phone from './images/phone.png';

const icons = [
    {
        title: 'facebook', 
        file: facebook,
        fileActive: facebookActive,
        inputValue: 'profile_id or phone'
    },
    {
        title: 'viber',
        file: viber,
        fileActive: viberActive, //TODO: ???? not revert and not svg
        inputValue: 'Phone'
    }, 
    {
        title: 'telegram',
        file: telegram,
        inputValue: 'Phone'
    }, 
    {
        title: 'linkedin',
        file: linkedin,
        inputValue: 'profile_id'
    }, 
    {
        title: 'phone',
        file: phone,
        inputValue: 'Phone'
    }
];



const Form = ({ options }) => {
  const { formText, formTheme, formColor, formUrl, token, buttonName, minMessageLength } = options
  const [validationFlag, setValidationFlag] = useState(false)
  const [attachFile, setAttachFile] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)
  const [fileMessage, setFileMessage] = useState(false)
  const [contactIcon, setContactIcon] = useState(icons[0])

  useEffect(() => {}, [validationFlag, attachFile])

  const validate = values => {
    const errors = {}
    if (!values.full_name) {
      errors.full_name = true
    } else if (values.full_name.length > 30) {
      errors.full_name = true
    }
  
    if (!values.email) {
      errors.email = true
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(values.email)) {
      errors.email = true
    }
  
    if (!values.message) {
      errors.message = true
    } else if (values.message.length < minMessageLength) { 
      errors.message = true
    }
  
    return errors
  }

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      message: '',
      attachments: [],
      extra_contact_type: contactIcon.title,
      extra_contact_value: ''
    },
    validate,
    onSubmit: values => {
      sendForm(values)
    },
  })

  const handleAddingFile = event => {
    const files = event.target.files
    let myFiles = Array.from(files)
    if (myFiles.length && myFiles[0]) {
      const allowedExtensions = ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx']
      const size = myFiles[0].size / 1024 / 1024 < 5
      const format = myFiles[0].name.split('.').pop()
      if (size && allowedExtensions.includes(format)) {
        setAttachFile(myFiles[0].name)
        formik.setFieldValue('attach_file', myFiles[0])
        setFileMessage(false)
      } else {
        setFileMessage(true)
      }
    }
  }
  
  const jsonToFormData = (data) => {
    const formData = new FormData();

    const buildFormData = (formData, data, parentKey) => {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
          Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
          });
        } else {
          const value = data == null ? '' : data;
      
          formData.append(parentKey, value);
        }
    }

    buildFormData(formData, data);
    return formData;
  }

  const convertDataKeys = (data) => {
    return {
        contact_type: 'contact_form',
        token: token,
        contact_form: {
            name: data.full_name,
            email: data.email,
            message: data.message,
            attachments: data.attachments,
            extra_contact_type: data.extra_contact_type,
            extra_contact_value: data.extra_contact_value
        }
    }
  }

  const sendForm = data => {
    console.log('data: ', data)
    const convertedData = convertDataKeys(data);
    const formData = jsonToFormData(convertedData);

    //TEMPORARY
    for (var value of formData.values()) {
        console.log(value);
    } 
    setSuccessMessage(true)  //

    axios
      .post(`${formUrl}`, formData)
      .then(res => {
        if (res && res.status === 200) {
          formik.resetForm()
          setAttachFile('')
          setSuccessMessage(true)
          setTimeout(() => {
            setSuccessMessage(false)
          }, 3000)
        }
      })
      .catch(err => {
        console.log('error', err)
      })
  }

  const onSubmit = () => {
    setValidationFlag(Object.values(formik.errors).find(key => key === true))
  }

  const onIconClick = (icon) => {
    setContactIcon(icon)
    formik.setFieldValue('extra_contact_type', icon.title)
    formik.setFieldValue('extra_contact_value', '')
  }

  return (
    <div className="Form--container" style={{backgroundColor: formTheme, color: formColor}}>
        <div className='Form--text-block'>
            <h3 className='Form--title'>{formText.title}</h3>
            <p className='Form--description'>{formText.description}</p>
        </div>

        <div className='Form--form-block'>
            <form
            name="form"
            method="POST"
            netlify-honeypot="bot-field"
            data-netlify="true"
            onSubmit={formik.handleSubmit}>
                <div className={`Form--input-group`} style={{borderColor: validationFlag && formik.errors.full_name ? '#E91F3D' : formColor}}>
                  <div className="Form--input-input">
                    <input
                      className="Input"
                      id="full_name"
                      type="text"
                      name="full_name"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.full_name}
                    />
                  </div>
                  <div className="Form--input-label">
                    <label
                      className="Label"
                      htmlFor="name">
                        Your Name
                    </label> 
                  </div>
                </div>

                <div className="Form--input-group" style={{borderColor: validationFlag && formik.errors.email ? '#E91F3D' : formColor}}>
                  <div className="Form--input-input">
                    <input
                      className="Input"
                      id="emeil"
                      type="email"
                      name="email"
                      required
                      placeholder='test@mail.com'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>
                  <div className="Form--input-label">
                    <label
                      className="Label"
                      htmlFor="email">
                        E-mail
                    </label>
                  </div>
                </div>

                <div className="Form--input-group" style={{borderColor: validationFlag && formik.errors.message ? '#E91F3D' : formColor}}>
                  <div className="Form--input-input">
                    <input
                      className="Input"
                      id="message"
                      type="textarea"
                      name="message"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.message}
                    /> 
                  </div>
                  <div className="Form--input-label">
                    <label
                      className="Label"
                      htmlFor="message">
                        Message
                    </label>
                  </div>
                </div>

                <div className="Form--input-group Form--input-attach">
                  <label
                    className="Attach"
                    htmlFor="attachField"
                  >
                    <span className="">
                      {attachFile ? attachFile : 'Attach file'}
                    </span>
                  </label>
                  <div className="d-none">
                    <input
                      data-size="5000"
                      accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                      className="jsFileInput"
                      type="file"
                      name="attachField"
                      id="attachField"
                      onChange={e => handleAddingFile(e)}
                    />
                  </div>
                </div>

                <div
                  className={`Form--invalidAttach${
                    fileMessage ? 'Form--invalidAttach-show' : ''
                  }`}
                >
                  <p>
                    Please upload files having extensions: .jpg, .png, .pdf, .doc
                  </p>
                  <p>File size must under 5mb.</p>
                </div>

                <div className='Form--alternative-block'>
                    <p>Choose alternative contact method <span>*</span></p>
                    <ul className='Form--icons'>
                        {icons.map(icon => (
                            <li key={icon.title} 
                                className={`Form--icon-shell${icon.title === contactIcon.title ? ' Form--icon-active' : ''}`}
                                style={{borderColor: formColor, backgroundColor: icon.title === contactIcon.title ? formColor : 'transparent'}}
                                onClick={() => onIconClick(icon)}>
                                    <img src={icon.title === contactIcon.title ? icon.fileActive : icon.file} alt={icon.title} />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="Form--input-group" style={{borderColor: formColor}}>
                  <div className="Form--input-input">
                    <input
                      className="Input Input--alternative" 
                      id="alternativeValue"
                      type="text"
                      name="alternativeValue"
                      placeholder={contactIcon.inputValue}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.extra_contact_value}
                    /> 
                  </div>
                </div>

                <div className='Form--button'><FormSubmitButton name={buttonName} backgroundColor={formColor} color={formTheme} onSubmit={onSubmit}/></div>
                <div
                  className={`Form--successMessage${
                    successMessage ? ' Form--successMessage-show' : ''
                  }`}
                >
                  Request has been sent
                </div> 
            </form>
        </div>
    </div>
  )
}

export default Form
