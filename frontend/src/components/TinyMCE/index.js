import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function TextEditor() {
    const editorRef = useRef(null);


    return (
        <div>
            <Editor
                apiKey="tqbvbsvpkack6nwll1rk20nga5enaozagirz72hfoilwq876" // hoặc API key của bạn
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue=""
                init={{
                    height: 280,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </div>
    );
}

export default TextEditor;
