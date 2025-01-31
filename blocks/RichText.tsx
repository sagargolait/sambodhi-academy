import React from 'react';

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
        const HeadingTag = `h${node.fields?.level || 1}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: 'text-4xl',
          2: 'text-3xl',
          3: 'text-2xl',
          4: 'text-xl',
          5: 'text-lg',
          6: 'text-base'
        } as any;
        const headingLevel: number = node.fields?.level || 1;
        return (
          <HeadingTag className={`font-bold mb-4 ${headingClasses[headingLevel]}`}>
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