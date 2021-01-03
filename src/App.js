import axios from './axios-shoppingList';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Layout from './Components/Layout/Layout';
import ListView from './Containers/ListView/ListView';
import ListsOverview from './Components/ListsOverview/ListsOverview';
import helpers from './helperFunctions';
import { loadAllLists } from './store/actions/lists';
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
        editMode: { edit: false, id: null },
    };

    componentDidMount() {
        this.props.getAllLists();
    }

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
                                editMode={this.state.editMode}
                                input={this.state.input}
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
        allLists: state.lists.listItems,
        error: state.lists.errorMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllLists: (items) => dispatch(loadAllLists(items)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
