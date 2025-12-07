export default function Enfant({ onInputChange, userInput }) {
    return (
        <input
            type="text"
            value={userInput}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Tape quelque chose..."
        />
    );
}