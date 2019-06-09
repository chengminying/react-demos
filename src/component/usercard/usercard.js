import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from "antd-mobile";
import { withRouter } from "react-router-dom";

class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired,
    }
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(v) {
        this.props.history.push(`/chat/${v._id}?`);
    }
    render() {
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {
                    this.props.userlist.map(v => (
                        v.avatar ? (
                            <Card 
                                key={v._id}
                                onClick={() => this.handleClick(v)}
                            >
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../image/${v.avatar}.png`)}
                                    extra={<span>{v.title}</span>}
                                >
                                </Card.Header>
                                <Card.Body>
                                    {
                                        v.desc.split('\n').map(v => (
                                            <div key={v}>{v}</div>
                                        ))
                                    }
                                </Card.Body>
                                {v.type === 'boss' ? <Card.Footer content={v.company} extra={v.money}></Card.Footer> : null}
                            </Card>) : null
                    ))
                }
            </WingBlank>
        )
    }
}

export default withRouter(UserCard);