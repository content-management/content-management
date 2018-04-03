import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

  class TextEditor extends React.Component {
    constructor(){
      super();
      this.state = {
        content: "",
        title: "",
      }
      this.saveContent = this.saveContent.bind(this);
      }
      handleEditorChange = e => {
        this.setState({content: e.target.getContent()});
        

      };
      saveContent(){
        console.log(this.state.content);
        console.log(this.state.title);
    //     let body = {
    //       title: this.state.title,
    //       content: this.state.content
    //     }
    //      axios.post(`/api/post/${blogid}`, body).then(results => {
    //   this.props.user.push;
    // });
      }
      render() {
        return <div>
           
              <input type="text" placeholder="Add Title Here" onChange={e => this.setState({title: e.target.value})} />
       
            <input id="my-file" type="file" name="my-file" style={{ display: "none" }} onChange="" />
            <Editor initialValue="<p>Your post content</p>" init={{ selector: "textarea", height: 500, plugins: ["advlist autolink lists link image code charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table contextmenu paste imagetools wordcount", "fullpage", "save"], toolbar: "formatselect | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | imageupload | fullpage ", content_css: "//www.tinymce.com/css/codepen.min.css", file_browser_callback_types: "image", file_picker_callback: function(callback, value, meta) {
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
                }, paste_data_images: true }} onChange={this.handleEditorChange} />
            <button onClick={this.saveContent}>Save</button>
          </div>;
      }
    }
  
  export default TextEditor;