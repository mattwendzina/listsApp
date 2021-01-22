import React, { Component } from 'react';
import AddItem from '../../Components/AddItem/AddItem';
import ListItems from '../../Components/ListItems/ListItems';
import helpers from '../../helperFunctions';
import {
    deleteItem,
    deleteWarningMessage,
    toggleCheck,
    toggleEdit,
} from '../../store/actions/items';
import { setList } from '../../store/actions/lists';
import { connect } from 'react-redux';

class ListView extends Component {
    render() {
        return (
            <div>
                <AddItem />
                <ListItems
                    selectedList={this.props.selectedList}
                    items={this.props.items}
                    itemToDelete={this.props.itemToDelete}
                    toggleCheck={this.props.toggleCheck}
                    toggleEdit={this.props.toggleEdit}
                    deleteItem={this.props.deleteItem}
                    deleteWarning={this.props.deleteWarning}
                    deleteWarningMessage={this.props.deleteWarningMessage}
                    addItemToNewList={this.addItemToNewList}
                />
            </div>
        );
    }
}

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
