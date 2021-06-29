import { Button, IconButton, InputBase, fade, makeStyles, Paper } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import ClearIcon from "@material-ui/icons/Clear"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import contextAPI from '../ContextAPI';

const AddCardOrListText = ({ type, setOpen, listId }) => {
    const [title, setTitle] = useState("")
    const classes = useStyle();
    const { addCard, addList } = useContext(contextAPI)

    const handleAddCardOrList = () => {
        if (type === "card") {
            addCard(title, listId)
        } else {
            addList(title)
        }
        setTitle("")
        setOpen(false)
    }

    return (
        <>
            <Paper className={classes.card}>
                <InputBase
                    multiline
                    value={title}
                    onBlur={() => setOpen(false)}
                    onChange={e => setTitle(e.target.value)}
                    placeholder={
                        type === "card" ?
                            "Introduzca un título para esta tarjeta..." :
                            "Introduzca el título de la lista..."
                    }
                    inputProps={{ className: classes.input }}
                />
            </Paper>
            <div className={classes.confirm}>
                <div className={classes.options}>
                    <Button className={classes.btnConfirm}
                        onClick={handleAddCardOrList}>
                        {
                            type === "card" ?
                                "Añadir tarjeta" :
                                "Añadir lista"
                        }
                    </Button>
                    <IconButton onClick={() => setOpen(false)}>
                        <ClearIcon />
                    </IconButton>
                </div>
                <IconButton>
                    <MoreHorizIcon />
                </IconButton>
            </div>
        </>
    )
}

const useStyle = makeStyles(theme => ({
    card: {
        width: "280px",
        margin: theme.spacing(0, 1, 1, 1),
        paddingBottom: theme.spacing(4)
    },
    input: {
        margin: theme.spacing(1)
    },
    confirm: {
        display: "flex",
        margin: theme.spacing(0, 1, 1, 1)
    },
    options: {
        flexGrow: 1
    },
    btnConfirm: {
        background: "#0079bf",
        color: "#fff",
        "&:hover": {
            background: fade("#0079bf", 0.75)
        }
    }
}))

export default AddCardOrListText