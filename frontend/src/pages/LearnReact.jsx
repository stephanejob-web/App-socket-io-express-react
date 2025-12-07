import { useState } from 'react'
import Enfant from "../components/Enfants.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function LearnReact() {
    const [userInput, setUserInput] = useState("");
    const [form, setForm] = useState({ nom: "", prenom: "", age: "" });
    const [error, setError] = useState("");
    const { message } = useApp();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nom = form.nom.trim();
        const prenom = form.prenom.trim();
        const age = Number(form.age.trim());

        if (!nom || !prenom) {
            setError("Nom et prénom requis");
            return;
        }

        if (isNaN(age) || age < 18 || age > 120) {
            setError("Âge doit être entre 18 et 120");
            return;
        }

        setError("");
        console.log("OK :", { nom, prenom, age });

        // Réinitialiser le formulaire après succès
        setForm({ nom: "", prenom: "", age: "" });
    };

    return (
        <div>
            <p>{message}</p>
            <Enfant onInputChange={setUserInput} userInput={userInput} />
            <p>Tu as tapé: {userInput}</p>

            <form onSubmit={handleSubmit}>
                <input
                    name="nom"
                    placeholder="Nom"
                    value={form.nom}
                    onChange={handleChange}
                />
                <input
                    name="prenom"
                    placeholder="Prénom"
                    value={form.prenom}
                    onChange={handleChange}
                />
                <input
                    name="age"
                    placeholder="Âge"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                />

                <button type="submit">Valider</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
