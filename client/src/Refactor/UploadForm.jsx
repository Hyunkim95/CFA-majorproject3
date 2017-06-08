import Dropzone from 'react-dropzone';
import UploadForm from './UploadForm.css'
import React, { Component } from 'react';
import { Button, Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
var request = require('superagent');
var apiBaseUrl = "http://localhost:3000/api/";


class UploadScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      name: '',
      price: '',
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

  progress(){
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function(evt){
      if (evt.lengthComputable) {
        var percentComplete = evt.loaded / evt.total;
        console.log(percentComplete);
      }
    }, false);
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
      this.progress()
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
      <Form>
        <FormGroup>
          <Label>Title</Label>
          <Input type="title" placeholder="Beat Title" value={this.state.name}/>
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input type="price" placeholder="Beat Price" value={this.state.price} />
        </FormGroup>
        <Row>
          <Col auto>
            <Dropzone className="dropzone" multiple={false} onDrop={(files) => this.onDrop(files)}>
              <a>Click to select a beat</a>
              <p>Or drop a file here to upload</p>
            </Dropzone>
          </Col>
          <Col auto>
            <div>
              File to be uploaded is: {this.state.filesPreview}
            </div>
          </Col>
        </Row>
        <br/>
        <Button onClick={(event) => this.handleClick(event)}>Upload</Button>
      </Form>
    )
  }
}

export default UploadScreen;
