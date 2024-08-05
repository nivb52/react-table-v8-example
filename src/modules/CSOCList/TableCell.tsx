import React from 'react';
interface Props {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}
/**
 * @name TableCell
 * @description 
 */
export default ({ children, style }: Props) => {
    return (
        <td className='table-cell' style={style}>
            {children}
        </td>
    );
}