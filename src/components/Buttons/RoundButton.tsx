import  './RoundButton.css'

interface RoundButtonProps {
    onClick : () => void
}

export function RoundButton({onClick}: RoundButtonProps){
    return (
        <button className="round-btn" onClick={onClick}>
            <span className="plus-icon"></span>
        </button>
    );
}