import React from "react";
import { Editor, textarea } from "@tinymce/tinymce-react";
import axios from "axios";
import Header from "../Header/Header";
import { connect } from "react-redux"; //connect to redux
import {  currBlog } from "../../ducks/reducer"; //get user from redux
import { Link, withRouter } from "react-router-dom";
import "../../styles/css/NewPost.css";
import swal from "sweetalert";
import { Redirect } from "react-router";


class TextEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      title: "",
      tinyID: "",
      dateTime: ""
    };
    this.saveContent = this.saveContent.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange = e => {
    // console.log(e.target.contentDocument);
    this.setState({
      content: e.target.getContent()
    });
  };
  saveContent() {
    console.log(this.state.content.length);
    if (this.state.content.length > 3000000) {
      swal(
        "The post data size is too large, this is usually due to large or high resolution images. Please use an image compression service to limit your image file size. Your post has NOT been created."
      );
    } else {
      let temp = this.state.content.replace("<!DOCTYPE html>", "");
      temp = temp.replace("<html>", "");
      temp = temp.replace("<head>", "");
      temp = temp.replace("</head>", "");
      temp = temp.replace("</html>", "");
      temp = temp.replace(/\r?\n/g, "");
      // console.log(temp);

      let dateTime = new Date();
  
      let body = {
        title: this.state.title,
        content: temp,
        date: dateTime.toLocaleDateString(),
        time: dateTime.toLocaleTimeString()
        
      };
      axios
        .post(`/api/post/${this.props.match.params.id}`, body)
        .then(results => {
          swal("New post added");
        })
        // .then(window.history.back());
    }
  }
  render() {

    // if (this.state.redirect) {
    //   return <Redirect push to="/" />;
    // }
    console.log(this.props.match.params.id);

    return (
      <div className="new-post-container">
        <Header />

        <div className="title-button">
          <input
            type="text"
            placeholder="Add Title Here"
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>

        <input
          id="my-file"
          type="file"
          name="my-file"
          style={{ display: "none" }}
          onChange=""
        />

        <div className="new-post-editor">
          <Editor
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
              selector: "textarea",
              height: 500,
              plugins: [
                "advlist autolink lists link image code charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste imagetools wordcount",
                "fullpage",
                "save"
              ],
              toolbar:
                "formatselect | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | imageupload | fullpage ",
              content_css: "//www.tinymce.com/css/codepen.min.css",
              file_browser_callback_types: "image",
              file_picker_callback: function(callback, value, meta) {
                if (meta.filetype == "image") {
                  var input = document.getElementById("my-file");
                  input.click();
                  input.onchange = function() {
                    var file = input.files[0];
                    var reader = new FileReader();
                    reader.onload = function(e) {
                      console.log("name", e.target.result);
                      callback(e.target.result, { alt: file.name });
                    };
                    reader.readAsDataURL(file);
                  };
                }
              },
              paste_data_images: true
            }}
            onChange={this.handleEditorChange}
          />
        </div>
         <Link
              to={`/Posts/${this.props.myBlog.blog_name}/${
                this.props.myBlog.blog_id
              }`}
            >
        <button onClick={this.saveContent}>Save</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { currBlog })(
  TextEditor
);
