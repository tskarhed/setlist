import React, { FC } from "react";
import { Setlist } from "../state/types";
import { ListItem } from "./List";
import { ActionButton } from "./ActionButton";
import { useHistory } from "react-router-dom";

interface Props {
    setlists: Setlist[];
}

export const SetlistList: FC<Props> = ({setlists}) => {
    const history = useHistory();
return (<>{setlists.map(setlist => {
    return (
      <ListItem
        key={setlist.id}
        type="setlist"
        to={`/setlist/${setlist.id}`}
        actionComponent={
          <ActionButton
            onClick={() => {
              history.push(
                `/setlist/${setlist.id}/play/${setlist.songs[0]}`
              );
            }}
            size="md"
            inverted
            displayPlay
          />
        }
      >
        {setlist.title}
      </ListItem>
    );
     })}
  </>);
}