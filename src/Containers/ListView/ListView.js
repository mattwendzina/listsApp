import React, { Component } from 'react';
import AddItem from '../../Components/AddItem/AddItem';
import ListItems from '../../Components/ListItems/ListItems';
import helpers from '../../helperFunctions';
import { setList } from '../../store/actions/lists';
import { toggleCheck } from '../../store/actions/items';
import { connect } from 'react-redux';

import axios from '../../axios-shoppingList';

class ListView extends Component {
    state = {
        input: '',
        editMode: { edit: false, id: null },
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
        deleteConfirmationWarning: false,
        deleteWarning: false,
    };

    componentDidMount() {
        if (this.props.allLists) {
            this.props.setList(this.props.allLists);
        }
    }

    addNewItem = (input) => {
        console.log('ADD NEW ITEM: ', input);
        if (input.type !== 'click' && input.key !== 'Enter') {
            return;
        }

        let updatedList = [...this.props.listItems];

        const newItem = {
            id: helpers.randomId(),
            name: this.state.input,
            checked: false,
        };

        updatedList.push(newItem);

        axios
            .patch(`/lists/${this.props.listId}/.json`, {
                items: updatedList,
            })
            .then((res) => {
                this.props.getLists(this.props.listId);
            })
            .catch((e) => console.log(e));

        this.setState({ input: '' });
    };

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

    deleteItemMessage = (selectedItem) => {
        this.setState({
            deleteWarning: true,
            itemToEdit: selectedItem,
        });
        return;
    };

    cancelDelete = () => {
        this.setState(
            {
                deleteWarning: false,
                itemId: null,
            },
            () => {
                console.log(this.state);
            }
        );
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

    confirmDelete = () => {
        const updatedList = this.props.listItems.filter((item) => {
            return item.id !== this.state.itemToEdit.id;
        });

        axios
            .patch(`/lists/${this.props.listId}/.json`, {
                items: updatedList,
            })
            .then(() => this.props.getLists())
            .catch((e) => console.log(e));
        this.setState({
            deleteWarning: false,
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

    inputHandler = (input) => {
        this.setState(
            {
                input: input.target.value,
            },
            () => {
                console.log(this.state.input);
            }
        );
    };

    render() {
        return (
            <div>
                <AddItem
                    newListEditMode={this.state.newListEditMode}
                    inputElements={this.state.inputElements}
                    value={this.props.input}
                    editMode={this.props.editMode}
                    input={this.inputHandler}
                    submit={this.addNewItem}
                    update={this.props.update}
                    submitNewList={this.submitNewList}
                />
                <ListItems
                    selectedList={this.props.selectedList}
                    items={this.props.items}
                    deleteConfirmationWarning={
                        this.state.deleteConfirmationWarning
                    }
                    showModal={this.state.deleteWarning}
                    newListEditMode={this.state.newListEditMode}
                    toggleCheck={this.props.toggleCheck}
                    toggleEdit={this.props.toggleEdit}
                    deleteItemMessage={this.deleteItemMessage}
                    confirmDelete={this.confirmDelete}
                    cancelDelete={this.cancelDelete}
                    addItemToNewList={this.addItemToNewList}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedList: state.lists.selectedList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setList: (items) => dispatch(setList(items)),
        toggleCheck: (id, checked, selectedList) =>
            dispatch(toggleCheck(id, checked, selectedList)),
    };
};

const mergeProps = (state, dispatch, ownProps) => {
    return {
        items: state.selectedList
            ? Object.keys(state.selectedList[1].items).map((itemId, idx) => {
                  const { name, id, checked } = state.selectedList[1].items[
                      itemId
                  ];
                  return { name, id, checked, itemId };
              })
            : null,
        ...state,
        ...dispatch,
        ...ownProps,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(ListView);

// const mapDispatchToProps = (dispatch) => ({
//     onDelete: (code) => {
//         dispatch(apiRemoveFromBag(code));
//         dispatch(cancelTimer(CLOSE_POPOVER_BAG_TIMER));
//     },
//     onChange: (code, quantity) => {
//         dispatch(apiUpdateQuantity(code, quantity));
//         dispatch(cancelTimer(CLOSE_POPOVER_BAG_TIMER));
//     },
// });

// const mapStateToProps = ({ app, bag, promotions }) => ({
//     ...bag,
//     currency: app.config.currency,
//     isEditable: !app.routing.pathname.includes('checkout'),
//     promotions,
// });

// const flatten = (all, current) => [...all, ...current];
// const hasCurrentLocation = (currentLocation) => (message) =>
//     message.displayLocations.find((location) => location === currentLocation);

// const mergeProps = (state, dispatch, ownProps) => ({
//     ...state,
//     promotionMessages: Object.keys(state.promotions)
//         .map((key) => state.promotions[key].messages)
//         .reduce(flatten, [])
//         .filter(hasCurrentLocation(ownProps.location)),
//     ...dispatch,
//     ...ownProps,
// });

// export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Bag);
