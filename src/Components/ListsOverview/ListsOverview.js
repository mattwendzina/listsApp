import React from 'react';
import classes from './ListsOverview.module.css';

const ListsOverview = (props) => {
    return (
        <div className={classes.listsOverview}>
            {props.allLists ? (
                <ul>
                    {Object.keys(props.allLists).map((listId) => {
                        return (
                            <li
                                key={listId}
                                onClick={() => props.loadList(listId)}
                            >
                                {props.allLists[listId].name}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <h1>Loading Lists...</h1>
            )}
        </div>
    );
};

export default ListsOverview;
