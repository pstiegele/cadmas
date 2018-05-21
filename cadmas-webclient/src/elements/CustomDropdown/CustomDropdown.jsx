import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class CustomDropdown extends Component {
    render() {
        var menuItems = [];
        if (this.props.menuItems !== undefined && this.props.menuItems !== null) {
            this.props.menuItems.forEach(element => {
                menuItems.push(
                    <MenuItem eventKey={element.key} active={element.active} onSelect={this.props.onSelect}>{element.title}</MenuItem>
                );
            });
        }
        return (
            <DropdownButton
                bsSize={this.props.bsSize}
                bsStyle={this.props.bsStyle}
                title={this.props.title === undefined ? "" : this.props.title}
                key={this.props.key}
                id={'dropdown-basic-'+this.props.key}>
                {menuItems}
            </DropdownButton>
        );
    }
}

export default CustomDropdown;