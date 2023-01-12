import React, { ReactNode } from "react";
import styles from './index.scss'
import {Tooltip} from "antd";

interface Props {
  text: ReactNode,
  onClick?: () => void;
}

const Text = ({ text, onClick }: Props) => {
  return (
    <div className={styles.cellsText}>
      <Tooltip title={text}>
        <span className={ onClick ? styles.hrefText : ''} onClick={onClick}>
          {text}
        </span>
      </Tooltip>
    </div>
  )
}

export default Text;