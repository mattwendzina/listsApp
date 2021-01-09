import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './toolbar.module.css';
import Title from '../../Title/Title';
import Menu from '../../Menu/Menu';
import { setNewTitle } from '../../../store/actions/lists';

const Toolbar = (props) => {
    return (
        <div className={classes.toolbar}>
            {props.location.pathname === '/list' && (
                <Title
                    createNewList={props.createNewList}
                    seeAllLists={props.seeAllLists}
                    listName={props.selectedList && props.selectedList.name}
                    listId={props.selectedList && props.selectedList.listId}
                    setNewTitle={props.setNewTitle}
                />
            )}
            <Menu />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedList: state.lists.selectedList,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setNewTitle: (listId, title) => dispatch(setNewTitle(listId, title)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Toolbar)
);
