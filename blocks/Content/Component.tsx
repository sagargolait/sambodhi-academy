import React from 'react';
import classes from './index.module.css';

export type Type = {
  blockType: 'content'
  blockName?: string
  content: unknown
}

export const Component: React.FC<Type> = (props) => {
  const { content } = props;

  return (
    <div className={classes.wrap}>

    </div>
  );
};
