import React, { Component } from 'react';
import AddItem from '../../Components/AddItem/AddItem';
import ListItems from '../../Components/ListItems/ListItems';
import helpers from '../../helperFunctions';
import { setList } from '../../store/actions/lists';
import {
    deleteItem,
    deleteWarningMessage,
    toggleCheck,
} from '../../store/actions/items';
import { connect } from 'react-redux';

import axios from '../../axios-shoppingList';

class ListView extends Component {
    state = {
        input: '',
        newListEditMode: false,
        inputElements: {
            newItem: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'New Item',
                },
                value: { id: helpers.randomId(), name: null, checked: false },
            },
            newList: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'New Item',
                },
                value: null,
            },
        },
        listItems: null,
    };

    componentDidMount() {
        if (this.props.allLists) {
            this.props.setList(this.props.allLists);
        }
    }

    submitNewList = () => {
        axios
            .post('/lists.json', {
                name: this.state.inputElements.newList.value,
                items: this.state.newListItems,
                itemId: helpers.randomId(),
            })
            .then((res) => {
                this.getLists(this.state.listId);
                this.setState(
                    {
                        inputElements: {
                            newItem: {
                                elementType: 'input',
                                elementConfig: {
                                    type: 'text',
                                    placeholder: 'New Item',
                                },
                                value: {
                                    itemId: helpers.randomId(),
                                    item: null,
                                    checked: false,
                                },
                            },
                            newList: {
                                elementType: 'input',
                                elementConfig: {
                                    type: 'text',
                                    placeholder: 'New Item',
                                },
                                value: null,
                            },
                        },
                    },
                    () => {
                        console.log('this.state post submit', this.state);
                    }
                );
            })
            .catch((e) => console.log(e));
    };

    toggleEdit = (item, id) => {
        if (this.state.editMode.edit) {
            this.setState({
                input: '',
                editMode: { edit: !this.state.editMode, id: null },
            });
            return;
        }
        this.setState({
            input: item,
            editMode: { edit: !this.state.editMode.edit, id: id },
        });
    };

    addItemToNewList = (item, id) => {
        const newItems = [...this.state.newListItems];
        newItems.push({
            itemId: helpers.randomId(),
            name: item,
            checked: false,
        });
        this.setState({
            newListItems: newItems,
        });
    };

    render() {
        return (
            <div>
                <AddItem
                    newListEditMode={this.state.newListEditMode}
                    value={this.props.input}
                    editMode={this.props.editMode}
                    update={this.props.update}
                    submitNewList={this.submitNewList}
                />
                <ListItems
                    selectedList={this.props.selectedList}
                    items={this.props.items}
                    deleteConfirmationWarning={
                        this.state.deleteConfirmationWarning
                    }
                    newListEditMode={this.state.newListEditMode}
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
    selectedList: state.lists.selectedList,
    deleteWarning: state.items.deleteWarning,
});

const mapDispatchToProps = (dispatch) => ({
    setList: (items) => dispatch(setList(items)),
    toggleCheck: (id, checked, selectedList) =>
        dispatch(toggleCheck(id, checked, selectedList)),
    deleteItem: (deleteWarning, selectedList, itemToDelete) =>
        dispatch(deleteItem(deleteWarning, selectedList, itemToDelete)),
    deleteWarningMessage: (deleteMessage) =>
        dispatch(deleteWarningMessage(deleteMessage)),
});

const mergeProps = (state, dispatch, ownProps) => ({
    items: state.selectedList
        ? Object.keys(state.selectedList[1].items).map((itemId, idx) => {
              const { name, id, checked } = state.selectedList[1].items[itemId];
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
