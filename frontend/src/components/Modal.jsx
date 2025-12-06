import {Box, Modal, Typography, TextField, Button, Alert} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ModalUser = ({open, handleClose, onSubmit, onChange, value, error}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
                    Entrez votre nom
                </Typography>

                {error && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={onSubmit}>
                    <TextField
                        fullWidth
                        label="Nom d'utilisateur"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        sx={{mb: 2}}
                        autoFocus
                        error={!!error}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={!value || !value.trim()}
                    >
                        Rejoindre
                    </Button>
                </form>
            </Box>
        </Modal>
    )
}
