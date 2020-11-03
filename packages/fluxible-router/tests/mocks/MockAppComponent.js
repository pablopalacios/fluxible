/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { provideContext } from 'fluxible-addons-react';
import createReactClass from 'create-react-class';
import handleHistory from '../../dist/lib/handleHistory';

var MockAppComponent = createReactClass({
    contextTypes: {
        getStore: PropTypes.func.isRequired
    },
    propTypes: {
        children: PropTypes.object,
        currentRoute: PropTypes.object
    },
    render: function () {
        if (!this.props.children) {
            return null;
        }
        return React.cloneElement(this.props.children, {
            currentRoute: this.props.currentRoute
        });
    }
});

var customContextTypes = {
    logger: PropTypes.object
};

export default provideContext(handleHistory(MockAppComponent, {
    checkRouteOnPageLoad: false,
    enableScroll: true
}), customContextTypes);

export function createWrappedMockAppComponent(opts) {
    return provideContext(handleHistory(MockAppComponent, opts), customContextTypes);
}
