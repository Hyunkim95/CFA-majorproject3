import Dropzone from 'react-dropzone';
import React, { Component } from 'react';
var request = require('superagent')
var apiBaseUrl = "http://localhost:3000/api/"

class UploadScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      filesToBeSent:[],
      filesPreview:[],
      printcount: 2
    }
  }

  onDrop(acceptedFiles, rejectedFiles){
    var filesToBeSent = this.state.filesToBeSent;
    if(filesToBeSent.length < this.state.printcount){
      filesToBeSent.push(acceptedFiles);
      var filesPreview = [];
      for(var i in filesToBeSent){
        filesPreview.push(<div>
          {filesToBeSent[i][0].name}
        </div>
        )
      }
      this.setState({filesToBeSent, filesPreview});
    }
    else{
      alert("You can only upload one file at a time")
    }
  }

  handleClick(event){
    // console.log("handleClick", event);

    var self = this;
    if(this.state.filesToBeSent.length > 0){
      var filesArray = this.state.filesToBeSent;
      console.log(filesArray)
      var req = request.post(apiBaseUrl + 'beat');
        req.field('title', this.nameInput.value)
        req.field('price', this.priceInput.value)
      req.attach(filesArray[0][0].name, filesArray[0][0])
      req.end(function(err,res){
        if(err){
          console.log("error occured")
        }
        console.log("res", res);
        alert("File uploading completed")
      })
    }
    else{
      alert("Please upload some files first")
    }
  }

  render(){
    return(
      <div>
        <input type="text" ref={input => {this.nameInput = input; }} />
        <input type="text" ref={input => {this.priceInput = input; }} />
        <Dropzone onDrop={(files) => this.onDrop(files)}>
          <div>Drop File Here</div>
        </Dropzone>
        <div>
          Files to be uploaded are: {this.state.filesPreview}
        </div>
        <button onClick={(event) => this.handleClick(event)}>Upload</button>
      </div>
    )
  }
}

export default UploadScreen;
