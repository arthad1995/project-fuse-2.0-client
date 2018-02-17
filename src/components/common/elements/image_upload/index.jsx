import React from 'react'
import Dropzone from 'react-dropzone'
import {ImageUploadField,UploadField} from 'react-image-file';
import {connect} from 'react-redux'
import v from 'voca'

@connect((state) => {
  return {
    thumbnail: state.fileUpload.get('thumbnail'),
    background: state.fileUpload.get('background')
  }
})
export default class ImageUpload extends React.Component {
    constructor() {
      super()
    }

    render() {
      const key = this.props.type || 'thumbnail'
      const imgToShow = this.props[key]
      return (
        <div className="image-upload-section">
          <div className={`image-upload ${this.props.className || ''}`}>
            {!imgToShow ?
              <img
                src={this.props.curImg || this.props.defaultImg}
                width={this.props.width || 150}
                height={this.props.height || 150}
                className="image-upload__profile-img"
              /> :
              ''
            }
            <ImageUploadField
              label={this.props.label}
              imageWidth={this.props.width || 150}
              imageHeight={this.props.height || 150}
              onChange={(file)=>this.props.dispatch({
                type: `SET_${v.upperCase(key)}_UPLOAD`,
                img: file
              })}
              files={imgToShow}
            />
          </div>
        </div>
      );
    }
  }
