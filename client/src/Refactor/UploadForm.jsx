import Dropzone from 'react-dropzone';
import UploadForm from './UploadForm.css'
import React, { Component } from 'react';
import { Button, Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
var request = require('superagent');
var apiBaseUrl = "https://beat-profile.herokuapp.com/api/";


class UploadScreen extends Component{
  constructor(props, context){
    super(props, context);
    this.state={
      beat: {
        title: '',
        price: ''
      },
      filesToBeSent:[],
      filesPreview:[],
      printcount: 2
    }

    this.changeBeat.bind(this);
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

  changeBeat(event) {
    const field = event.target.name;
    var beat = this.state.beat;
    beat[field] = event.target.value;

    this.setState({
      beat
    });

    // console.log(this.state.beat)
  }

  onClick(event){
    const name = this.state.beat.name
    const price = this.state.beat.price

    if(this.state.filesToBeSent.length > 0){
      var filesArray = this.state.filesToBeSent;
      console.log(filesArray)
      var req = request.post(apiBaseUrl + 'beat');
        req.field('title', this.state.beat.title)
        req.field('price', this.state.beat.price)
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
        <FormGroup>
          <Label>Title</Label>
          <Input type="title" name="title" placeholder="Beat Title" onChange={(event) => this.changeBeat(event)} value={this.state.name}/>
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input type="price" name="price" placeholder="Beat Price" onChange={(event) => this.changeBeat(event)} value={this.state.price} />
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
        <Button onClick={(event) => this.onClick(event)}type="submit">Upload</Button>
      </div>
    )
  }
}

export default UploadScreen;
