'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-gray-50 animate-pulse rounded-md" />,
});

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Enter content...',
  className = '',
  disabled = false,
}) => {
  // Quill modules configuration
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['clean'],
      ],
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  // Quill formats
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'indent',
    'link',
    'color',
    'background',
    'align',
  ];

  return (
    <div className={`rich-text-editor-wrapper ${className}`}>
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={disabled}
        className={`${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
      />
      <style jsx global>{`
        .rich-text-editor-wrapper .quill {
          background: white;
          border-radius: 0.375rem;
        }

        .rich-text-editor-wrapper .ql-container {
          font-family: inherit;
          font-size: 14px;
          min-height: 200px;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
        }

        .rich-text-editor-wrapper .ql-editor {
          min-height: 200px;
          max-height: 500px;
          overflow-y: auto;
        }

        .rich-text-editor-wrapper .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }

        .rich-text-editor-wrapper .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          background: #f9fafb;
        }

        .rich-text-editor-wrapper .ql-snow .ql-stroke {
          stroke: #4b5563;
        }

        .rich-text-editor-wrapper .ql-snow .ql-fill {
          fill: #4b5563;
        }

        .rich-text-editor-wrapper .ql-snow .ql-picker-label {
          color: #4b5563;
        }

        .rich-text-editor-wrapper .ql-snow.ql-toolbar button:hover,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button:hover,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar button:focus,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button:focus,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar button.ql-active,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button.ql-active,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label:hover,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label.ql-active,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item:hover,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item:hover,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
          color: #3d6cb9;
        }

        .rich-text-editor-wrapper .ql-snow.ql-toolbar button:hover .ql-stroke,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button:hover .ql-stroke,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar button:focus .ql-stroke,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button:focus .ql-stroke,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button.ql-active .ql-stroke,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
        .rich-text-editor-wrapper
          .ql-snow
          .ql-toolbar
          .ql-picker-item.ql-selected
          .ql-stroke-miter {
          stroke: #3d6cb9;
        }

        .rich-text-editor-wrapper .ql-snow.ql-toolbar button:hover .ql-fill,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button:hover .ql-fill,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar button:focus .ql-fill,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button:focus .ql-fill,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar button.ql-active .ql-fill,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar button.ql-active .ql-fill,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
        .rich-text-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
        .rich-text-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill {
          fill: #3d6cb9;
        }

        .rich-text-editor-wrapper .ql-editor strong {
          font-weight: 600;
        }

        .rich-text-editor-wrapper .ql-editor h1 {
          font-size: 2em;
          font-weight: 700;
          margin-bottom: 0.5em;
        }

        .rich-text-editor-wrapper .ql-editor h2 {
          font-size: 1.5em;
          font-weight: 600;
          margin-bottom: 0.5em;
        }

        .rich-text-editor-wrapper .ql-editor h3 {
          font-size: 1.17em;
          font-weight: 600;
          margin-bottom: 0.5em;
        }

        .rich-text-editor-wrapper .ql-editor ul,
        .rich-text-editor-wrapper .ql-editor ol {
          padding-left: 1.5em;
          margin-bottom: 0.5em;
        }

        .rich-text-editor-wrapper .ql-editor li {
          margin-bottom: 0.25em;
        }

        .rich-text-editor-wrapper .ql-editor a {
          color: #3d6cb9;
          text-decoration: underline;
        }

        .rich-text-editor-wrapper .ql-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin-left: 0;
          margin-right: 0;
          color: #6b7280;
        }

        .rich-text-editor-wrapper .ql-editor img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
