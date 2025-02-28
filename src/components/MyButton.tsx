interface MyButtonProps {
    name : string;
    onClick : (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MyButton = ({name, onClick}: MyButtonProps) => {
    return (
        <button onClick={onClick}>{name}</button>
    )
}

export default MyButton;