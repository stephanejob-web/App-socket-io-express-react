import { Container, Typography, Box, Card, CardContent, Grid, Link as MuiLink, Divider } from '@mui/material'
import { useState } from 'react'
import {useApp} from "../context/AppContext.jsx";
import Enfant from "../components/Enfants.jsx";

function LearnReact() {
    const [userInput, setUserInput] = useState("");
    const [form, setForm] = useState({});
    const {message}= useApp();
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    console.log(message);
   return (
       <div>
           <Enfant onInputChange={setUserInput} userInput={userInput} />
           <input name="nom" onChange={handleChange} placeholder="Nom" />
           <input name="prenom" onChange={handleChange} placeholder="Prénom" />
           <input name="age" onChange={handleChange} placeholder="Âge" />
       </div>

   )
}

export default LearnReact
