import React from "react";
import { Grid, InputItem, List } from "antd-mobile";
import PropTypes from "prop-types";

//使用webpack require context动态加载image下的图片
const requireContext = require.context("../image", false, /\.png$/);
let avatar_names = requireContext.keys();
const patt = /\/(.+)\./
const avatar = avatar_names.map(v => {
    return {
        icon: requireContext(v),
        text: v.match(patt, '')[1],
    }
})

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <List>
                    <Grid
                        data={avatar} columnNum={5}
                        onClick={e => {
                            this.setState(e)
                            this.props.selectAvatar(e.text);
                        }}
                    ></Grid>
                    <InputItem
                        editable={false}
                        extra={ this.state.text ?
                            <div 
                                style={{ backgroundImage: `url(${this.state.icon})`,
                                backgroundSize: 'cover', height: '22px', width: '22px' }}
                            /> : null
                        }
                    >选择头像
                    </InputItem>
                </List>
            </div>
        )
    }
}

export default AvatarSelector;