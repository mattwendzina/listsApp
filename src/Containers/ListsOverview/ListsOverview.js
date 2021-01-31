import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './ListsOverview.module.css';

import { setList } from '../../store/actions/lists';

const ListsOverview = (props) => {
    return (
        <div className={classes.listsOverview}>
            {props.allLists ? (
                <ul>
                    {Object.keys(props.allLists).map((listId) => {
                        return (
                            <li
                                key={listId}
                                onClick={() => {
                                    props.setList(
                                        props.allLists[listId],
                                        listId
                                    );
                                    localStorage.setItem('listId', listId);
                                    props.history.push({
                                        pathname: '/list',
                                    });
                                }}
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

const mapStateToProps = (state) => ({
    allLists: state.lists.allLists,
});

const mapDispatchToProps = (dispatch) => ({
    setList: (items, itemId) => dispatch(setList(items, itemId)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ListsOverview)
);
