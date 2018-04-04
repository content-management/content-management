import React from "react";
import { Editor, textarea } from "@tinymce/tinymce-react";
import axios from "axios";

class TextEditor extends React.Component {
  constructor() {
    super();
    this.state = {
    post: "",
    title: "",
    content: "",
    };
    this.saveContent = this.saveContent.bind(this);
  }
  componentDidMount() {
    
      axios
        .get(`/api/post/${this.props.match.params.id}`)
        .then(response => {
          console.log("response", response.data);
          this.setState({ post: response.data[0] });
        //   this.setState({title: this.state.post.title, content: this.state.post.content})
        })
        .catch(console.log())
    
  }
  handleEditorChange = e => {
    // console.log(e.target.contentDocument);
    this.setState({
      content: e.target.getContent()
    });
  };
  saveContent() {
    console.log(this.state.content);
    let body = {
      title: this.state.title,
      content: this.state.content
    };
    axios
      .put(`/api/put/${this.props.match.params.id}`, body)
      .then(results => {
        alert("updated post")
      });
  }
  render() {
    console.log(this.props.match.params.id);
    console.log(this.state.post);
    console.log(this.state.post.content);
    console.log(this.state.post.title);
    
    
    let title = this.state.post.title;
    let content = this.state.post.content;
    return (
      <div>
        <div>
          <input type="text" value={title} />
        </div>
        <input
          id="my-file"
          type="file"
          name="my-file"
          style={{ display: "none" }}
          onChange=""
        />
        <Editor
          initialValue={content}
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
