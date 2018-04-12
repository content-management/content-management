import React from "react";
import { Editor, textarea } from "@tinymce/tinymce-react";
import { connect } from "react-redux"; //connect to redux
import { getUser, getBlogs, currBlog} from "../../ducks/reducer"; //get user from redux
import { withRouter } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import swal from "sweetalert";
import "../../styles/css/EditPost.css";

class EditPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pages: "",
      pageNaem: "",
      content: "",
      title: ""
    };
    this.saveContent = this.saveContent.bind(this);
  }
  componentDidMount() {
    axios
         axios.get(`/api/page/${this.props.match.params.id}`)
        .then(response => {
          this.setState({pages: response.data[0]})
        this.setState({
          pageName: this.state.pages.page_name,
          content: this.state.pages.content
        });
      })
      .catch(console.log());
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
      pageName: this.state.pageName,
      content: this.state.content
    };
    axios
      .put(`/api/updatePage/${this.state.pages.page_id}`, body)
      .then(results => {
        swal("updated page");
      })
      .then(window.history.back());
  }
  render() {

let title = this.state.pages.title;
    let pageName = this.state.pages.page_name;
    // let content = this.state.post.content;
    let content = this.state.pages.content;
    return (
      <div>
        <Header />
        <div className="editPostPage">
          <input
            type="text"
            value={pageName}
            onChange={e =>
              this.setState({
                pageName: e.target.value
              })
            }
          />
        </div>
        {this.state.pages.content && (
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
                  let input = document.getElementById("my-file");
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
        )}
        <button onClick={this.saveContent}>Save</button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser, getBlogs, currBlog })(
  EditPage
));
