import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

class NavLink extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
    }

    render() {
        const navlist = this.props.data.filter(v => !v.hide);
        const { pathname } = this.props.location;
        const unread = this.props.chatReducer.unread
        return (
            <TabBar
                tabBarPosition='bottom'
            >
                {
                    navlist.map(v => {
                        return <TabBar.Item
                            badge={v.path === '/message' ? unread : ''}
                            key={v.path}
                            title={v.text}
                            icon={{uri: require(`./image/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./image/${v.icon}-active.png`)}}
                            selected={pathname === v.path}
                            onPress={() => {
                                this.props.history.push(v.path);
                            }}
                        >
                        </TabBar.Item>
                    })
                }
            </TabBar>
        )
    }
}
const mapStateToProps = state => state
export default withRouter(connect(mapStateToProps, null)(NavLink));
