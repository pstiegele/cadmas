import React, { Component } from 'react';
import { Label } from 'react-bootstrap';
import cx from 'classnames';
import PropTypes from 'prop-types';

class CustomLabel extends Component {
    render() {
        const { fill, simple, pullRight, round, block, ...rest } = this.props;

        const btnClasses = cx({
            'btn-fill': fill,
            'btn-simple': simple,
            'pull-right': pullRight,
            'btn-block': block,
            'btn-round': round
        });

        return (
            <Label
                className={btnClasses}
                {...rest}
            />
        );
  }
}

CustomLabel.propTypes = {
    fill: PropTypes.bool,
    simple: PropTypes.bool,
    pullRight: PropTypes.bool,
    block: PropTypes.bool,
    round: PropTypes.bool
}

export default CustomLabel;
