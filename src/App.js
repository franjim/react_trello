import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import './App.css';
import AddCardOrList from './components/AddCardOrList';
import TrelloList from './components/TrelloList';
import background_image from "./images/photo_background.jpg";
import mockData from "./mockdata.js";
import ContextAPI from "./ContextAPI";
import uuid from "react-uuid";

function App() {
  const classes = useStyle();
  const [data, setData] = useState(mockData);

  const updateListTitle = (updatedTitle, listId) => {
    const list = data.lists[listId]
    list.title = updatedTitle
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    })
  }

  const addCard = (title, listId) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    }
    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    })

  }

  const addList = (title) => {
    const newListId = uuid();
    setData({
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: {
          id: newListId,
          title,
          cards: []
        }
      }
    })
  }

  return (
    <ContextAPI.Provider value={{ updateListTitle, addCard, addList }}>
      <div className={classes.root}>
        <div className={classes.container}>
          {
            data.listIds.map(listID => {
              const list = data.lists[listID]
              return <TrelloList list={list} key={listID} />
            })
          }
          <div>
            <AddCardOrList type="list" />
          </div>
        </div>
      </div>
    </ContextAPI.Provider>
  );
}

const useStyle = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    overflow: "auto",
    backgroundImage: `url(${background_image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  container: {
    display: "flex",
  }
}))

export default App;
