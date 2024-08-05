import './loader.css'
import { MyCustomCSS } from 'src/types/ComponentTypes';

export default function Spinner({ size, color }: { size?: number; color?: string }) {
    return (
        <div className='loader'>
            <div className='loader__spinner' style={{ '--size': size, '--color': color } as MyCustomCSS}></div>
        </div>
    );
}