import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from './axios-shoppingList';
import { connect } from 'react-redux';

import './App.css';
import Layout from './Components/Layout/Layout';
import ListView from './Containers/ListView/ListView';
import ListsOverview from './Components/ListsOverview/ListsOverview';
import helpers from './helperFunctions';
import { loadAllLists } from './store/actions/actions';
class App extends Component {
    state = {
        input: '',
        itemId: null,
        newListItems: [],
        listItems: null,
        listName: null,
        listId: null,
        allLists: [],
        itemToEdit: null,
        showModal: false,
        editMode: { edit: false, id: null },
    };

    componentDidMount() {
        this.props.getAllLists();
    }

    toggleCheck = (id, index, checked) => {
        let updatedItems = [...this.state.listItems];
        updatedItems[index] = {
            itemId: id,
            name: updatedItems[index].name,
            checked: !checked,
        };
        this.setState({ listItems: updatedItems });
        axios
            .patch(`/lists/${this.state.listId}/items/${index}/.json`, {
                checked: !checked,
            })
            .then((res) => {
                console.log(res);
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

    update = (input) => {
        console.log('UPDATE: ');
        if (input.type !== 'click' && input.key !== 'Enter') {
            return;
        }
        let index;
        let updatedItems = [...this.state.listItems];

        const itemToUpdate = updatedItems.find((item, idx) => {
            if (item.id === this.state.editMode.id) {
                index = idx;
                return { ...item };
            }
        });
        itemToUpdate.name = this.state.input;
        updatedItems[index] = itemToUpdate;
        this.setState({
            input: '',
            listItems: updatedItems,
        });
        axios
            .patch(`/lists/${this.state.listId}/items/${index}/.json`, {
                name: this.state.input,
            })
            .then((res) => {
                this.setState({
                    editMode: false,
                });
                console.log(res);
            })
            .catch((e) => console.log(e));
    };

    createNewList = () => {
        this.setState({
            newListEditMode: !this.state.newListEditMode,
        });
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

    loadList = (id) => {
        const selectedList = this.state.allLists[id];

        this.setState({
            listItems: selectedList.items,
            listName: selectedList.name,
            listId: id,
        });
        this.closeModal();
    };

    render() {
        return (
            <div className="App">
                {this.props.error ? <h1>{this.props.error}</h1> : null}
                <Layout
                    listName={this.state.listName}
                    listId={this.state.listId}
                >
                    {/* <Header
                        createNewList={this.createNewList}
                        seeAllLists={this.seeAllLists}
                        listName={this.state.listName}
                        listId={this.state.listId}
                    /> */}
                    <Route
                        path="/"
                        exact
                        component={() => (
                            <ListView
                                allLists={this.props.allLists}
                                listItems={this.state.listItems}
                                listName={this.state.listName}
                                listId={this.state.listId}
                                toggleCheck={this.toggleCheck}
                                toggleEdit={this.toggleEdit}
                                update={this.update}
                                editMode={this.state.editMode}
                                input={this.state.input}
                                inputHandler={this.inputHandler}
                            />
                        )}
                    />
                    <Route
                        path="/allLists"
                        exact
                        component={() => (
                            <ListsOverview
                                allLists={this.props.allLists}
                                closeModal={this.closeModal}
                                loadList={this.loadList}
                            />
                        )}
                    />
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allLists: state.listItems,
        error: state.errorMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllLists: (items) => dispatch(loadAllLists(items)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
