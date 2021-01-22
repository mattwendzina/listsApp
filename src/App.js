import axios from './axios-shoppingList';
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import helpers from './helperFunctions';
import './App.css';
import ListsOverview from './Containers/ListsOverview/ListsOverview';
import NewList from './Containers/NewList/NewList';
import ListView from './Containers/ListView/ListView';
import Layout from './Components/Layout/Layout';

import { loadAllLists } from './store/actions/lists';
class App extends Component {
    componentDidMount() {
        if (!localStorage.getItem('listId')) {
            this.props.history.push('/');
        }
        this.props.getAllLists();
    }

    render() {
        return (
            <div className="App">
                {this.props.error ? <h1>{this.props.error}</h1> : null}
                <Layout>
                    <Route path="/" exact component={() => <ListsOverview />} />
                    <Route path="/list" exact component={() => <ListView />} />
                    <Route
                        path="/newList"
                        exact
                        component={() => <NewList />}
                    />
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedList: state.lists.selectedList,
    error: state.lists.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
    getAllLists: (items) => {
        dispatch(loadAllLists(items));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
