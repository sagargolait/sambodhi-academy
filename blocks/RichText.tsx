import React from 'react';
import { Head } from 'react-day-picker';

interface RichTextNode {
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  type?: string;
  children?: RichTextNode[];
  url?: string;
  newTab?: boolean;
}


export interface Block {
  blockType: 'heading' | 'paragraph' | 'image' | 'examQuestion' | 'table' | 'pdf-viewer' | 'link';
  id: string;
  text?: RichTextNode[];
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  image?: {
    url: string;
    alt: string;
  };
  caption?: string;
  altText?: string;
  question?: RichTextNode[];
  options?: {
    option: string;
    isCorrect: boolean;
  }[];
  explanation?: RichTextNode[];
  tableCaption: string;
}

interface TextNode {
  text: string;
  type: 'text';
  detail?: number;
  format?: number;
  mode?: string;
  style?: string;
  version?: number;
}

interface LinkNode {
  type: 'link';
  children: TextNode[];
  fields: {
    linkType: string;
    newTab: boolean;
    url: string;
  };
}

interface ParagraphNode {
  type: 'paragraph';
  children: (TextNode | LinkNode)[];
}


interface RichTextProps {
  content: any;
  type?: string
}


const RichText: React.FC<RichTextProps> = ({ content, type }) => {
  if (!content?.root?.children) {
    return null;
  }


  const renderNode = (node: any): React.ReactNode => {
    switch (node.type) {
      case 'text':
        return node.text;

      case 'link':
        return (
          <a
            href={node.fields?.url}
            target={node.fields?.newTab ? '_blank' : '_self'}
            rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {node.children?.map((child: any, index: number) => (
              <React.Fragment key={index}>
                {renderNode(child)}
              </React.Fragment>
            ))}
          </a>
        );

      case 'upload':
        if (!node.value) return null;

        return (
          <img
            src={node.value.url}
            alt={node.value.alt || ''}
            className="max-w-full h-auto mx-auto"
            width={node.value.width}
            height={node.value.height}
          />
        );

      case 'autolink':
        return (
          <a
            href={node.fields?.url}
            target={node.fields?.newTab ? '_blank' : '_self'}
            rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {node.children?.map((child: any, index: number) => (
              <React.Fragment key={index}>
                {renderNode(child)}
              </React.Fragment>
            ))}
          </a>
        );

      case 'heading':
        const HeadingTag = `${node.tag}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          h1: 'text-4xl',
          h2: 'text-3xl',
          h3: 'text-2xl',
          h4: 'text-xl',
          h5: 'text-lg',
          h6: 'text-base'
        } as any;
        return (
          <HeadingTag className={`font-bold mb-4 ${headingClasses[HeadingTag]}`}>
            {node.children?.map((child: any, index: number) => (
              <React.Fragment key={index}>
                {renderNode(child)}
              </React.Fragment>
            ))}
          </HeadingTag>
        );

      case 'paragraph':
        return (
          <p className={`mb-4 ${type === 'table' ? "text-center" : ""} leading-relaxed text-gray-800`}>
            {node.children?.map((child: any, index: number) => (
              <React.Fragment key={index}>
                {renderNode(child)}
              </React.Fragment>
            ))}
          </p>
        );

      case 'table':
        return (
          <table className="table-auto w-full mb-4">
            <thead>
              <tr className='bg-gray-100'>
                {node.children[0].children?.map((child: any, index: number) => (
                  <th key={index} className="px-4 py-2 border text-gray-800 font-semibold">
                    {renderNode(child)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {node.children.slice(1).map((row: any, rowIndex: number) => (
                <tr key={rowIndex} className='rich-text-table-row'>
                  {row.children?.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex} className="border px-4 py-2">
                      {renderNode(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'tablecell':
        return (
          <>
            {node.children?.map((child: any, index: number) => (
              <React.Fragment key={index}>
                {renderNode(child)}
              </React.Fragment>
            ))}
          </>
        );


      case 'list':
        const ListTag = node.style === 'ordered' ? 'ol' : 'ul'; // Dynamically choose `ul` or `ol`
        const listClass =
          node.style === 'ordered' ? 'list-decimal list-inside mb-4' : 'list-disc list-inside mb-4';

        return (
          <ListTag className={listClass}>
            {node.children?.map((listItem: any, index: number) => (
              <li key={index} className="mb-2">
                {listItem.children?.map((child: any, childIndex: number) => (
                  <React.Fragment key={childIndex}>
                    {renderNode(child)}
                  </React.Fragment>
                ))}
              </li>
            ))}
          </ListTag>
        );



      case 'root':
        return node.children?.map((child: any, index: number) => (
          <React.Fragment key={index}>
            {renderNode(child)}
          </React.Fragment>
        ));

      default:
        return null;
    }
  };

  return <div className="rich-text">{renderNode(content.root)}</div>;
};


export default RichText;