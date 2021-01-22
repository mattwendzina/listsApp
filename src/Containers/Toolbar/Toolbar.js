import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './toolbar.module.css';
import Title from '../../Components/Title/Title';
import Menu from '../../Components/Menu/Menu';
import { setNewTitle } from '../../store/actions/lists';

const Toolbar = (props) => {
    let title = null;
    let listId = null;
    if (props.selectedList) {
        switch (props.location.pathname) {
            case '/':
                title = 'Please select a list';
                break;
            case '/list':
                title = props.selectedList.name;
                listId = props.selectedList.listId;
                break;
            case '/newList':
                title = 'Create your new list!';
                break;
            default:
                title = 'Please select a list';
        }
    }

    return (
        <div className={classes.toolbar}>
            <Title
                title={title}
                listId={listId}
                setNewTitle={listId && props.setNewTitle}
            />
            <Menu />
        </div>
    );
};

const mapStateToProps = (state) => ({
    selectedList: state.lists.selectedList,
});
const mapDispatchToProps = (dispatch) => ({
    setNewTitle: (listId, title) => dispatch(setNewTitle(listId, title)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Toolbar)
);
