import React from 'react';
import { Editor } from '@tinymce/tinymce-react';


  class TextEditor extends React.Component {
    handleEditorChange = (e) => {
      console.log('Content was updated:', e.target.getContent());
    }
  
    render() {
      return (
        <Editor
          init={{
            selector: 'textarea',
            height: 500, 
            plugins: ["advlist autolink lists link image code charmap print preview anchor",
            "searchreplace visualblocks code fullscreen", "insertdatetime media table contextmenu paste imagetools wordcount", "fullpage", "spellchecker"],
            toolbar: "formatselect | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | fullpage | spellchecker ",
            block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3',
            image_title: true,
            automatic_uploads: true,
            file_picker_types: 'image',
            file_picker_callback: function(cb, value, meta){
              var input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.onchange = function(){
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function(){
                  var id = 'blobid' + (new Date().getTime());
                  var blobCache =  Editor.activeEditor.editorUpload.blobCache;
                  var base64 = reader.result.split(',')[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  cb(blobInfo.blobUri(), { title: file.name});
                };
                reader.readAsDataURL(file);
              };
              input.click();
            }
          }}
          onChange={this.handleEditorChange}
          />
        );
      }}
  
  export default TextEditor;