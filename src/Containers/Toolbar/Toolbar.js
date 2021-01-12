import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './toolbar.module.css';
import Title from '../../Components/Title/Title';
import Menu from '../../Components/Menu/Menu';
import { setNewTitle } from '../../store/actions/lists';

const Toolbar = (props) => (
    <div className={classes.toolbar}>
        {props.location.pathname === '/list' ? (
            <Title
                listName={props.selectedList && props.selectedList.name}
                listId={props.selectedList && props.selectedList.listId}
                setNewTitle={props.setNewTitle}
            />
        ) : (
            <Title listName={'Please select a list'} />
        )}
        <Menu />
    </div>
);

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
