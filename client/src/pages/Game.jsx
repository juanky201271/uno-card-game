import React, { Component } from 'react'
import api from '../api'
import { Soc, } from '../components'
import styled from 'styled-components'
import Masonry from 'react-masonry-component'

const masonryOptions = {
  transitionDuration: 0
}
const imagesLoadedOptions = {
  background: '.my-bg-image-el'
}

const WrapperGen = styled.div`
  margin: 5px 5px 5px 5px;
  padding: 10px 10px 10px 10px;
`
const Wrapper = styled.div`
  margin: 5px 5px 5px 5px;
  padding: 10px 10px 10px 10px;
  background-color: #ddd;
  border-radius: 10px;
  border: 2px solid #555;
  width: 200px;
`
const Title = styled.h1.attrs({ className: 'h1', })``
const Title3 = styled.h3.attrs({ className: 'h3', })`
  font-weight: bold;
  cursor: pointer;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
`
const Text = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #555;
  display: initial;
`
const InputText = styled.input.attrs({ className: 'form-control', })`
    margin: 5px;
`
const Delete = styled.div.attrs({ className: 'btn btn-danger'})`
  cursor: pointer;
`

class DeleteUser extends Component {
  deleteUser = async event => {
    event.preventDefault()
    const { _id, _this, table, } = this.props
    if (window.confirm(`Do tou want to delete the user code ${table} ?`,)) {

      await api.deleteUserById(_id, table).then(user => {
        _this.setState(state => {
          var cl = []
          state.users.map((item, index) => {
            if (item._id === _id) {
              return null
            } else {
              return cl.push(item)
            }
          })
          return { users: cl, key: new Date(), }
        })
      })
      .catch(error => {
        console.log(error)
      })

    }
  }
  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>
  }
}

const Update = styled.div.attrs({ className: 'btn btn-success'})`
  cursor: pointer;
`

class UpdateUser extends Component {
  updateUser = async event => {
    event.preventDefault()
    const { _id, _this, table, } = this.props
    if (window.confirm(`Do tou want to update the data of the user code with ${table} ?`,)) {

      await api.updateUserById(_id).then(async user => {
        await api.getAllUsers().then(users => {
          _this.setState({
              users: users.data.data,
              key: new Date(),
          })
        })
        .catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        console.log(error)
      })

    }
  }
  render() {
    return <Update onClick={this.updateUser}>Update</Update>
  }
}

const Hide = styled.div.attrs({ className: 'btn btn-secondary'})`
  cursor: pointer;
`

class HideUser extends Component {
  hideUser = async event => {
    event.preventDefault()
    const { _id, _this, } = this.props

      _this.setState(state => {
        return {
          usersHide: state.usersHide.concat(_id),
          key: new Date(),
        }
      })

  }
  render() {
    return <Hide onClick={this.hideUser}>Hide</Hide>
  }
}

const Unhide = styled.div.attrs({ className: 'btn btn-secondary'})`
  cursor: pointer;
`

class UnhideUser extends Component {
  unhideUser = async event => {
    event.preventDefault()
    const { _this, } = this.props

      _this.setState(state => {
        return {
          usersHide: [],
          key: new Date(),
        }
      })

  }
  render() {
    return <Unhide onClick={this.unhideUser}>Unhide</Unhide>
  }
}

const Add = styled.div.attrs({ className: 'btn btn-success'})`
  cursor: pointer;
`

class AddUser extends Component {
  addUser = async event => {
    event.preventDefault()
    const { table, _this, } = this.props
    if (!table) return

    if (_this.state.users.filter((item, index) => item.userCode === table).length === 0) {

      await api.insertUser(table).then(async user => {
        await api.getAllUsers().then(users => {
          _this.setState({
              users: users.data.data,
              table: '',
              key: new Date(),
          })
        })
        .catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        alert(`User Code ${table} no found!`)
        console.log(error)
      })

    }
    // unhide
    const { users, usersHide, } = _this.state
    const s = users.filter((item, index) => item.userCode === table)
    if (s.length) {
      const _id = s[0]._id
      const usersHideTemp = usersHide.filter((item, index) => item !== _id)
      _this.setState({
          usersHide: usersHideTemp,
          table: '',
          key: new Date(),
      })
    }

  }
  render() {
    return <Add onClick={this.addUser}>Add</Add>
  }
}

class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: false,
            usersHide: [],
            table: '',
            key: new Date(),
            socket: '',
        }
        this.handleClickMasonry = this.handleClickMasonry.bind(this)
        this.handleChangeTable = this.handleChangeTable.bind(this)
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllUsers().then(users => {
          this.setState({
              users: users.data.data,
              isLoading: false,
          })
        })
        .catch(error => {
          console.log(error)
          this.setState({
              isLoading: false,
          })
        })
    }
    handleClickMasonry (event) {
      console.log('Masonry', event.target.id)
      const user_id = event.target.id.split("-")[0]
      const obj = event.target.id.split("-")[1]

      if (!user_id || !obj) return

      console.log(document.getElementById(user_id))
      this.masonry.layout()

    }
    handleChangeTable (event) {
      const table = event.target.value.toUpperCase()
      this.setState({ table: table, })
    }
    render() {
      console.log('users', this.state)
        const { users, isLoading, usersHide, table, key, socket, } = this.state

        const usersShow = users.filter((item, index) => usersHide.indexOf(item._id) < 0 )

        const userElements = usersShow.map((item, index) => {
           return (
                <Wrapper key={item.name.substr(0,10).trim() + index.toString()} id={item._id}>
                  <Col>
                    <Row>
                      <Title3 id={item._id + '-h3-'}>{item.userCode}</Title3>
                      <HideUser _id={item._id}
                                  _this={this} />
                    </Row>

                    <hr />

                    <Text id={item._id + '-text'}>{item.name}</Text>

                    <hr />

                    <Row>
                      { item.removable ?
                        (
                          <>
                            <DeleteUser _id={item._id}
                                         _this={this}
                                         table={item.userCode} />
                            <UpdateUser _id={item._id}
                                         _this={this}
                                         table={item.userCode} />
                          </>
                        ) : (
                          <></>
                        )

                      }

                    </Row>

                  </Col>
                </Wrapper>
            )
        })

        userElements.unshift(
             <Wrapper key={'addUser999'} id={'999'}>
               <Col>
                 <Row>
                   <Title3 id={'999-h3-'}>Add User:</Title3>
                 </Row>

                 <InputText id={'999-text'} value={table} onChange={this.handleChangeTable} placeholder="Ex: AAPL, AAT, FB..." />

                 <AddUser table={table}
                           _this={this}
                           key={new Date().toString()} />
                  { usersHide.length ?
                    (
                      <>
                        <hr />
                        <UnhideUser _this={this} />
                      </>
                    ) : (
                      <></>
                    )
                  }
                  <a href={process.env.PUBLIC_URL + '/EOD_metadata.csv.zip'}  target="_blank" rel="noopener noreferrer">Download List</a>
               </Col>
             </Wrapper>
         )

        let showTable = true
        if (!users.length) {
            showTable = false
        }

        let showChart = true
        if (!usersShow.length) {
            showChart = false
        }

        return (
          <WrapperGen>
              <Title>Users</Title>
              <Soc _this={this} />
              <hr />
              {showTable && !isLoading && (
                <>
                  <Masonry
                      className={'my-gallery-class'} // default ''
                      elementType={'div'} // default 'div'
                      options={masonryOptions} // default {}
                      disableImagesLoaded={false} // default false
                      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                      imagesLoadedOptions={imagesLoadedOptions} // default {}
                      onClick={this.handleClickMasonry}
                      ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
                  >
                    {userElements}
                  </Masonry>
                  <Title>Chart</Title>
                  { socket ?
                    (
                      <div style={{ fontSize: '20px', color: '#ddd', backgroundColor: '#222' }}>
                        ({socket}) ... Processed!!!
                      </div>
                    ) : (
                      <></>
                    )
                  }
                  <hr />
                  { showChart && (
                    <>
                      <Chart dataHide={usersHide} key={key} />
                      <hr />
                    </>
                  )}
                </>
              )}

              {!showTable && (
                  <hr />
              )}

              {isLoading && (
                  <h3>Loading Users</h3>
              )}
          </WrapperGen>
        )
    }
}

export default UsersList
