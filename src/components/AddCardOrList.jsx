import { Collapse, fade, makeStyles, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import AddCardOrListText from "./AddCardOrListText";

const AddCardOrList = ({ type, listId }) => {
    const [open, setOpen] = useState(true)
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <AddCardOrListText type={type} setOpen={setOpen} listId={listId} />
            </Collapse>
            <Collapse in={!open}>
                <Paper className={classes.addCardOrListText} onClick={() => setOpen(true)}>
                    <Typography>{
                        type === "card" ?
                            "+ Añada otra tarjeta" :
                            "+ Añada otra lista"
                    }
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    )
}

const useStyle = makeStyles(theme => ({
    root: {
        width: "300px",
        marginTop: theme.spacing(1)
    },
    addCardOrListText: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(0, 1, 1, 1),
        background: "#ebecf0",
        "&:hover": {
            backgroundColor: fade("#000", 0.25)
        }
    }
}))

export default AddCardOrList
