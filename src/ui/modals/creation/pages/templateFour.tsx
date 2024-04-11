import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const Template4: React.FC<{ content: any; onContentChange: any }> = ({
  content,
  onContentChange,
}) => {
  const editor = useRef(null);

  return (
    <div className="bg-white p-8 rounded shadow-md w-full mx-auto grid">
      <div className="flex-wrap">
        <JoditEditor
          ref={editor}
          value={content}
          config={{
            readonly: false,
            toolbarButtonSize: "middle",
            toolbar: true,
            language: "es",
            buttons: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "font",
              "fontsize",
              "ul",
              "ol",
              "outdent",
              "indent",
              "table",
              "link",
              "align",
              "undo",
              "redo",
              "fullsize",
            ],
            safeMode: true,
            useSplitMode: false,
            removeButtons: [
              "about",
              "eraser",
              "selectall",
              "print",
              "copyformat",
              "speechRecognize",
              "hr",
              "brush",
              "paragraph",
              "image",
              "video",
            ],
          }}
          onBlur={(newContent) => onContentChange(newContent)}
          onChange={(newContent) => {}}
        />
      </div>
    </div>
  );
};

export default Template4;