import React from 'react';
import { Editor } from '@tinymce/tinymce-react';


  class TextEditor extends React.Component {
    
  
    render() {

      return (
        <div>
        <div><input type ='text' placeholder='Add Title Here'/></div>
          <textarea></textarea>
          </div>
        );
      }}
  
  export default TextEditor;