import React, { Component } from 'react';
import AddItem from '../../Components/AddItem/AddItem';
import List from '../../Components/List/List';
import helpers from '../../helperFunctions';
import {
    deleteItem,
    deleteWarningMessage,
    toggleCheck,
    toggleEdit,
} from '../../store/actions/items';
import { setList } from '../../store/actions/lists';
import { connect } from 'react-redux';

const ListView = (props) => {
    return (
        <div>
            <AddItem />
            <List
                viewList
                selectedList={props.selectedList}
                items={props.items}
                itemToDelete={props.itemToDelete}
                toggleCheck={props.toggleCheck}
                onClick={props.toggleEdit}
                deleteItem={props.deleteItem}
                deleteWarning={props.deleteWarning}
                deleteWarningMessage={props.deleteWarningMessage}
                addItemToNewList={props.addItemToNewList}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    allLists: state.lists.allLists,
    selectedList: state.lists.selectedList,
    deleteWarning: state.items.deleteWarning,
    itemToDelete: state.items.itemToDelete,
});

const mapDispatchToProps = (dispatch) => ({
    toggleCheck: (id, checked, selectedList) =>
        dispatch(toggleCheck(id, checked, selectedList)),
    toggleEdit: (name, id, itemId) => dispatch(toggleEdit(name, id, itemId)),
    deleteItem: (deleteWarning, selectedList, itemToDelete) =>
        dispatch(deleteItem(deleteWarning, selectedList, itemToDelete)),
    deleteWarningMessage: (deleteMessage) =>
        dispatch(deleteWarningMessage(deleteMessage)),
    setList: (list, listId) => dispatch(setList(list, listId)),
});

const mergeProps = (state, dispatch, ownProps) => ({
    items:
        state.selectedList && state.selectedList.items
            ? Object.keys(state.selectedList.items).map((itemId) => {
                  console.log('ITEM ID: ', itemId);
                  const { name, id, checked } = state.selectedList.items[
                      itemId
                  ];
                  return { name, id, checked, itemId };
              })
            : null,
    ...state,
    ...dispatch,
    ...ownProps,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(ListView);
