import React, { Component } from 'react'
import './modal.css'
export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    componentDidMount() {
        this.setState({
            user: this.props.data
        })
    }
    closeModal = (e) => {
        if (e.target.className.indexOf('modal-wrap') >= 0) {
            this.props.onCloseModal()
        }
    }
    handleChange = (e) => {
        this.setState(state => ({
            user: { ...state.user, [e.target.name]: e.target.value }
        }))
        // , () => console.log(this.state.user)
    }
    handleSave = () => {
        this.props.onCloseModal(this.state.user)
    }
    render() {
        return (
            <div className='modal-wrap' onClick={e => this.closeModal(e)}>
                <div className='modal'>

                    <div className="modal-head">
                        <h1>Modal {this.props.data.username}</h1>
                    </div>
                    <div className="modal-body">
                        <p><input onChange={this.handleChange} type="text" value={this.state.user?.id} name='id' /></p>
                        <p><input onChange={this.handleChange} type="text" value={this.state.user?.username} name='username' /></p>
                        <p><input onChange={this.handleChange} type="text" value={this.state.user?.password} name='password' /></p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
}
