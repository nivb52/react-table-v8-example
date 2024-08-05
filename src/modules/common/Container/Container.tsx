export default function Container({ children }: { children: React.ReactNode }): JSX.Element {
    return <div className='container'>{children}</div>;
}