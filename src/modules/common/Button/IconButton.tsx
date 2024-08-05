interface Props {
    onClick?: (ev: any) => void;
    style?: React.CSSProperties;
    hidden?: boolean;
    disabled?: boolean;
    iconButtonColors?: { color: string };
    size?: string;
}

const NOOP = () => { };
export default function ButtonWithIcon({ onClick = NOOP, style, hidden = false, disabled = false, iconButtonColors, children }: Props & { children: React.ReactNode }
) {
    return (
        <button className="button" onClick={onClick} hidden={hidden} disabled={disabled} style={style}>
            <span className="icon" style={iconButtonColors}>{children}</span>
        </button>
    );
}


export function PinButton({ onClick, style, hidden = false, disabled = false, iconButtonColors }: Props
) {
    return (
        <ButtonWithIcon onClick={onClick} style={style} hidden={hidden} disabled={disabled} iconButtonColors={iconButtonColors} >
            📌
        </ButtonWithIcon>
    );
}


export function WarningButton({ onClick, style, hidden = false, disabled = false, iconButtonColors }: Props
) {
    return (
        <ButtonWithIcon onClick={onClick} style={style} hidden={hidden} disabled={disabled} iconButtonColors={iconButtonColors} >
            ☢️
        </ButtonWithIcon>
    );
}
