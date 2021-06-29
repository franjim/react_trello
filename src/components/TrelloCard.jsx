import { IconButton, InputBase, makeStyles, Paper, Typography } from '@material-ui/core';
import { useState } from 'react'
import ClearIcon from "@material-ui/icons/Clear"

const TrelloCard = ({ card }) => {
    const classes = useStyle();
    const [open, setOpen] = useState(false)
    const [newTitle, setTitle] = useState(card.title)

    const handleBlur = () => {
        card.title = newTitle
        setOpen(false)
    }

    const deleteCard = () => {
        card.title = ""
    }

    return (
        <Paper className={classes.trelloCard}>
            {open ? (
                <InputBase
                    value={newTitle}
                    onChange={e => setTitle(e.target.value)}
                    onBlur={handleBlur}
                    autoFocus
                    fullWidth
                    inputProps={{ className: classes.input }}
                />
            ) : (
                <div className={classes.title}>
                    <Typography
                        onClick={() => setOpen(true)}>
                        {card.title}
                    </Typography>
                </div>
            )}
            <IconButton onClick={deleteCard}>
                <ClearIcon />
            </IconButton>
        </Paper>
    )
}

const useStyle = makeStyles(theme => ({
    trelloCard: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
    },
    title: {
        display: "flex",
        margin: theme.spacing(1)
    },
    input: {
        margin: theme.spacing(1),
        "&:focus": {
            background: "#ddd"
        }
    }
}))

export default TrelloCard
