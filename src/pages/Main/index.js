import React, { Component } from 'react';
import api from '../../services/api';

import "./styles.css";
import logo from '../../assets/logo.svg';

export default class Main extends Component {
    
    state = {newBox: ""};

    handleSubmit = async e => {
        e.preventDefault();

        const response = await api.post('boxes',{
            title: this.state.neBox,
        });
        
        this.props.history.push(`/box/${response.data._id}`);
    }
    render() {
        return (
            <div id="main-container">
                <form onSubmit = {this.handleSubmit}>
                    <img src={logo} alt="" />
                    <input placeholder="Criar um box"></input>
                    <button type="submit">Criar</button>
                </form>
            </div>
        );
    }
}
