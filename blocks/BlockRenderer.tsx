import React from 'react';
import RichText, { Block as BaseBlock } from './RichText';
import { ElementType } from 'react';



type Block = BaseBlock & {
  rows?: Row[];
  style?: string;
  tableCaption?: string;
};

interface BlockRendererProps {
  blocks: Block[];
}

interface ContentNode {
  text: string;
}

interface Cell {
  isHeader: boolean;
  content: ContentNode[];
}

interface Row {
  cells: Cell[];
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  const renderBlock = (block: Block): React.ReactNode => {
    switch (block.blockType) {
      case 'heading': {
        const HeadingTag = block.level as ElementType;
        const headingClasses = {
          h1: "text-4xl font-bold mb-6 mt-8",
          h2: "text-3xl font-semibold mb-4 mt-6",
          h3: "text-2xl font-semibold mb-3 mt-5",
          h4: "text-xl font-semibold mb-2 mt-4"
        }[block.level || 'h2'];

        return <HeadingTag className={headingClasses}>{block.text}</HeadingTag>;
      }

      case 'paragraph':
        return (
          <div className="mb-4">
            <RichText content={block.text} />
          </div>
        );

      case 'image':
        return (
          <figure className="my-8">
            <img
              src={block.image?.url}
              alt={block.altText || ''}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            {block.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-600 italic">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'examQuestion':
        return (
          <div className="bg-gray-50 rounded-lg p-6 my-8 shadow-sm">
            <div className="mb-4">
              <RichText content={block.question || []} />
            </div>
            <div className="space-y-3">
              {block.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={`question-${block.id}`}
                    id={`option-${block.id}-${index}`}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`option-${block.id}-${index}`}
                    className="text-gray-700 cursor-pointer select-none"
                  >
                    {option.option}
                  </label>
                </div>
              ))}
            </div>
            {block.explanation && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-gray-700">
                  <RichText content={block.explanation} />
                </div>
              </div>
            )}
          </div>
        );

      case 'table': // Handling table block
        return (
          <div className={`table-container ${block.style || 'default'} my-8`}>
            {block.tableCaption && (
              <div className="w-screen able-caption text-lg font-semibold mb-2">{block.tableCaption}</div>
            )}
            <table className="table-auto w-full border-collapse">
              <thead>
                {block.rows?.map((row, rowIndex) => {
                  if (rowIndex === 0 && row.cells.some(cell => cell.isHeader)) {
                    // Render the first row as header if any cell in it has isHeader = true
                    return (
                      <tr key={rowIndex}>
                        {row.cells.map((cell, cellIndex) => (
                          <th key={cellIndex} className="px-4 py-2 border text-left">
                            <RichText content={cell.content || { root: { children: [] } }} />
                          </th>
                        ))}
                      </tr>
                    );
                  }
                  return null;
                })}
              </thead>
              <tbody>
                {block.rows?.map((row, rowIndex) => (
                  rowIndex !== 0 ? (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-100' : ''}>
                      {row.cells.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-2 border">
                          <RichText type='table' content={cell.content || { root: { children: [] } }} />
                        </td>
                      ))}
                    </tr>
                  ) : null
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {blocks.map((block, i) => (
        <div key={`${block.id}-${i}`}>
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
};

export default BlockRenderer;