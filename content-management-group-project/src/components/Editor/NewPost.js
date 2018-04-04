import React from "react";
import { Editor, textarea } from "@tinymce/tinymce-react";
import axios from "axios";

class TextEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      title: "",
      tinyID: ""
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
    let temp = this.state.content.replace("<!DOCTYPE html>", "");
    temp = temp.replace("<html>", "");
    temp = temp.replace("<head>", "");
    temp = temp.replace("</head>", "");
    temp = temp.replace("</html>", "");
    temp = temp.replace(/\r?\n/g, "");
    console.log(temp);
    // let body = {
    //   title: this.state.title,
    //   content: temp
    // };
    // axios
    //   .post(`/api/post/${this.props.match.params.id}`, body)
    //   .then(results => {
    //     alert("New post added");
    //   });
  }
  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
        <div>
          <input type="text" placeholder="Add Title Here" />
        </div>
        <input
          id="my-file"
          type="file"
          name="my-file"
          style={{ display: "none" }}
          onChange=""
        />
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
        <button onClick={this.saveContent}>Save</button>
      </div>
    );
  }
}

export default TextEditor;
