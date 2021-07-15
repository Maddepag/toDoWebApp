import React, { Component} from 'react'

export default class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            guestEditList: false,
            isCreator: false,
        };
        this.listCode = this.props.match.params.listCode;
        this.getListDetails(); 
    }

    getListDetails() {
        fetch('/api/get-list' + '?code=' + this.listCode).then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                guestEditList: data.guest_edit_list,
                isCreator: data.is_creator,
            });
        });
    }

    render() {
        return (
            <div>
                <h3>CODE: {this.listCode}</h3>
                <p> Guest can edit list: {this.state.guestEditList.toString()} </p>
                <p> Creator: {this.state.isCreator.toString()} </p>

        </div>
        );

    }
}