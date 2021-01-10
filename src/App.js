import axios from './axios-shoppingList';
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Layout from './Components/Layout/Layout';
import ListView from './Containers/ListView/ListView';
import ListsOverview from './Components/ListsOverview/ListsOverview';
import helpers from './helperFunctions';
import { loadAllLists } from './store/actions/lists';
class App extends Component {
    state = {
        listId: null,
        allLists: [],
        itemToEdit: null,
        editMode: { edit: false, id: null },
    };

    componentDidMount() {
        if (!localStorage.getItem('listId')) {
            this.props.history.push('/');
        }
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

    render() {
        return (
            <div className="App">
                {this.props.error ? <h1>{this.props.error}</h1> : null}
                <Layout
                    createNewList={this.createNewList}
                    listName={
                        this.props.selectedList && this.props.selectedList.name
                    }
                    listId={this.state.listId}
                >
                    <Route path="/" exact component={() => <ListsOverview />} />
                    <Route path="/list" exact component={() => <ListView />} />
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allLists: state.lists.listItems,
        selectedList: state.lists.selectedList,
        error: state.lists.errorMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllLists: (items) => {
            dispatch(loadAllLists(items));
        },
    };
};

const mergeProps = (state, dispatch, ownProps) => {
    return {
        ...state,
        ...dispatch,
        ...ownProps,
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)
);
