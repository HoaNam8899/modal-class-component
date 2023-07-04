import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Modal from './components/modal'
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      users: [],
      user: {},
      orderBy: '',
      sort: 'asc',
      search: '',
      result: []
    }
  }
  componentDidMount() {
    this.setState({
      users: [
        {
          id: '1',
          username: 'Customer',
          password: '123'
        },
        {
          id: '2',
          username: 'Client',
          password: '1234'
        },
        {
          id: '3',
          username: 'Boss',
          password: '12345'
        },
        {
          id: '4',
          username: 'Admin',
          password: '123456'
        }
      ]
    })
  }
  openModal = (u) => {
    this.setState({
      isShow: true,
      user: u
    })
  }
  closeModal = (user) => {
    if (user) {
      if (this.state.users.find(u => u.id === user.id)) {
        this.setState(state => ({
          users: state.users.map(x => {
            if (x.id === user.id) {
              x.username = user.username
              x.password = user.password
            }
            return x;
          })

        }))
      } else {
        this.setState(state => ({
          users: [...state.users, user]
        }))
      }
    }

    this.setState({
      isShow: false
    })
  }
  handleSort = (field) => {
    let _sort = field === this.state.orderBy ? (this.state.sort === 'asc' ? 'desc' : 'asc') : 'asc';
    let _users = [...this.state.users];
    _users = _users.sort((u1, u2) => u1[field].localeCompare(u2[field]) * (_sort === 'asc' ? 1 : -1))
    this.setState({
      users: [..._users],
      orderBy: field,
      sort: _sort
    })
  }
  // handleSort = (field) => {
  //   let _sort = field === this.state.orderBy ? (this.state.sort === 'asc' ? 'desc' : 'asc') : 'asc';
  //   let _users = [...this.state.users];
  //   _users = _users.sort((u1, u2) => u1[field].localeCompare(u2[field]) * (_sort === 'asc' ? 1 : -1))
  //   this.setState({
  //     users: [..._users],
  //     orderBy: field,
  //     sort: _sort
  //   })
  // }
  deleteUser = (user) => {
    if (confirm('xóa?')) {
      let _users = [...this.state.users];
      let locate = _users.findIndex(x => x.id === user.id)
      _users.splice(locate, 1)
      this.setState({
        users: [..._users]
      })
    }
    // console.log(this.state.users)
  }
  getValueSearch = (e) => {
    this.setState({
      search: e.target.value,
      result: []
    })
  }
  handleSearch = () => {
    // console.log(this.state.search)
    // let _result = [...this.state.users]
    // console.log(_result)
    let _result = [...this.state.users].filter(x => x.username.toLocaleLowerCase().indexOf(this.state.search.toLocaleLowerCase()) >= 0)
    // x.username.toLocaleLowerCase().indexOf(this.state.search.toLocaleLowerCase()) >= 0
    this.setState({
      result: [..._result]
    })

  }
  render() {
    return (
      <>
        <table border={1} cellPadding={10} cellSpacing={0} width={'100%'}>
          <thead>
            <tr>
              <th onClick={e => this.handleSort('id')}>Id</th>
              <th onClick={e => this.handleSort('username')}>Name</th>
              <th onClick={e => this.handleSort('password')}>Pass</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(u => <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.password}</td>
              <td>
                <button onClick={e => this.openModal(u)}>Edit</button>
                <button onClick={e => this.deleteUser(u)}>Delete</button>
              </td>
            </tr>)}
          </tbody>

        </table>
        <button onClick={e => this.openModal('')}>Open modal</button>
        <button onClick={e => this.openModal('')}>New</button> <br />
        <input type="text" onChange={e => this.getValueSearch(e)} />
        <button onClick={this.handleSearch}>Search</button>

        <div>{this.state.result.map(u =>
          <span key={u.id}>{u.id}_____{u.username}____{u.password} <br /></span>
        )}</div>

        {this.state.isShow && <Modal onCloseModal={this.closeModal} data={this.state.user} />}
      </>
    )
  }
}

