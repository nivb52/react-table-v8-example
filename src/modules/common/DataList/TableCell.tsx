import React from 'react';
interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLTableCellElement>> {
    style?: React.CSSProperties;
    ref?: React.RefObject<HTMLTableElement>;
    [x: string]: any;
}

/**
 * @name TableCell
 * @description 
 */
export default ({ children, style, onDoubleClick, rest }: Props) => {
    return (
        <td className='table-cell' style={style} onDoubleClick={onDoubleClick} {...(rest as object)}>
            {children}
        </td>
    );
}