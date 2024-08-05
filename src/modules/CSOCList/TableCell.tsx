import React from 'react';
interface Props {
    children?: React.ReactNode;
    key: string;
    style?: React.CSSProperties;
}
/**
 * @name TableCell
 * @description 
 */
export default ({ children, key, style }: Props) => {
    return (
        <td className='table-cell' key={key} style={style}>
            {children}
        </td>
    );
}