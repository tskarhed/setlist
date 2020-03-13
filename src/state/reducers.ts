import { NotesAction, Notes, SetlistAction, Setlist, Song, SongAction, SongsAction, SetlistsAction, SearchState, SetSearchState } from "./types";
import { combineReducers } from "redux";
import { mockSongs, mockSetlists } from "./mocks";


export const notes = (prevState: Notes, action: NotesAction) => {
  switch (action.type) {
    case "ADD_NOTE":
      return [...prevState, action.note];
    case "UPDATE_NOTE":
      return prevState.map((note, i) => {
        if (i === action.index) {
          return action.note;
        }

        return note;
      });
    case "DELETE_NOTE":
      return prevState.filter((_note, index) => index !== action.index);
    default:
      return prevState;
  }
};

export const song = (prevState: Song, action: SongAction) => {
  if(action.type === "UPDATE_SONG_TITLE"){
    return {...prevState, title: action.title}
  }

  if(action.type === "CREATE_SONG"){
    return {
      title: "",
      notes: [],
      id: action.id
    };
  }
  return {...prevState, notes: notes(prevState.notes, action)};
}

export const setlist = (prevState: Setlist, action: SetlistAction) => {
  if (action.type === "ADD_SONG_TO_SETLIST") {
    return {...prevState, songs: [...prevState.songs, action.song]};
  }
  if(action.type === "REMOVE_SONG"){
    return {...prevState, songs: prevState.songs.filter((_song, index) => index !== action.index)}
  }

  if(action.type === "UPDATE_SETLIST_TITLE"){
    return {...prevState, title: action.title}
  }

  if(action.type === "CREATE_SETLIST"){
    return {
      title: "",
      songs: [],
      id: action.id
    };
  }
  if(action.type === "CREATE_SONG" && prevState.id === action.setlist){
    return {...prevState, songs: [...prevState.songs, action.id]}
  }

  return prevState;
};

export const songs = (prevState: Song[] = mockSongs, action: SongsAction) => {
  if(action.type === "CREATE_SONG"){
    return [...prevState, song({} as Song, action)];
  }

  if(action.type === "DELETE_SONG"){
    return prevState.filter(listItem => listItem.id !== action.id)
  }


  return prevState.map(listItem => {
    return song(listItem, action);
  })
}

export const setlists = (prevState: Setlist[] = mockSetlists, action: SetlistsAction) => {
  if(action.type === "CREATE_SETLIST"){
    return [...prevState, setlist({} as Setlist, action)];
  }

  if(action.type === "DELETE_SETLIST"){
    return prevState.filter(list => list.id !== action.id);
  }

  return prevState.map((list) => {
    return setlist(list, action);
  });
}

const isSearching = (prevState: SearchState = "all", action: SetSearchState) => {
  if(action.type === "SET_SEARCH_STATE"){
    return action.search;
  }
  return prevState;
}

export default combineReducers({setlists, songs, isSearching});