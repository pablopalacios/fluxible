/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import { node, object, func } from 'prop-types';

class FluxibleComponent extends React.Component {
    getChildContext() {
        return {
            getStore: this.props.context.getStore,
            executeAction: this.props.context.executeAction
        };
    }

    render() {
        return React.cloneElement(this.props.children, {
            context: this.props.context
        });
    }
}

FluxibleComponent.propTypes = {
    children: node.isRequired,
    context: object.isRequired
};

FluxibleComponent.childContextTypes = {
    executeAction: func.isRequired,
    getStore: func.isRequired
};

export default FluxibleComponent;
