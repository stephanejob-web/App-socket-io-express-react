import { createContext, useContext, useState } from 'react'

const ScoreContext = createContext(null)

export const useScore = () => {
    const context = useContext(ScoreContext)
    if (!context) {
        throw new Error('useScore doit être utilisé dans ScoreProvider')
    }
    return context
}

export const ScoreProvider = ({ children }) => {
    const [scores, setScores] = useState([])

    const addScore = (newScore) => {
        setScores([...scores, { id: Date.now(), ...newScore }])
    }

    const removeScore = (id) => {
        setScores(scores.filter(score => score.id !== id))
    }

    const updateScore = (id, updatedData) => {
        setScores(scores.map(score =>
            score.id === id ? { ...score, ...updatedData } : score
        ))
    }

    const clearScores = () => {
        setScores([])
    }

    const scoreValue = {
        scores,
        addScore,
        removeScore,
        updateScore,
        clearScores,
        setScores
    }

    return (
        <ScoreContext.Provider value={scoreValue}>
            {children}
        </ScoreContext.Provider>
    )
}



function MaPage() {
    const { scores, addScore, removeScore, updateScore, clearScores } = useScore()

    const handleAddScore = () => {
        addScore({
            player: 'Alice',
            score: 100,
            date: new Date().toISOString()
        })
    }

    return (
        <div>
            <h2>Scores ({scores.length})</h2>

            <button onClick={handleAddScore}>Ajouter un score</button>
            <button onClick={clearScores}>Effacer tous les scores</button>

            {scores.map(score => (
                <div key={score.id}>
                    <p>{score.player}: {score.score}</p>
                    <button onClick={() => removeScore(score.id)}>Supprimer</button>
                    <button onClick={() => updateScore(score.id, { score: score.score + 10 })}>
                        +10
                    </button>
                </div>
            ))}
        </div>
    )
}
