export default function Enfant({ onInputChange }) {
    return (
        <input
            type="text"
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Tape quelque chose..."
        />
    );
}