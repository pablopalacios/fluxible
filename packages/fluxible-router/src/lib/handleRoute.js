/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global window */
/*eslint no-func-assign:0 */
import { Component, createElement } from 'react';
import { bool, func, object } from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import inherits from 'inherits';

function createComponent(Component) {
    function RouteHandler(props, context) {
        Component.apply(this, arguments);
    }

    inherits(RouteHandler, Component);

    RouteHandler.displayName = 'RouteHandler';
    RouteHandler.contextTypes = {
        getStore: func.isRequired
    };
    RouteHandler.propTypes = {
        currentRoute: object,
        currentNavigate: object,
        currentNavigateError: object,
        isNavigateComplete: bool
    };

    Object.assign(RouteHandler.prototype, {
        render: function () {
            var routeStore = this.context.getStore('RouteStore');
            var props = Component.prototype && Component.prototype.isReactComponent ? {ref: 'wrappedElement'} : null;

            return createElement(Component, Object.assign({
                isActive: routeStore.isActive.bind(routeStore),
                makePath: routeStore.makePath.bind(routeStore)
            }, this.props, props));
        }
    });

    RouteHandler = connectToStores(RouteHandler, ['RouteStore'], function (context) {
        var routeStore = context.getStore('RouteStore');
        return {
            currentNavigate: routeStore.getCurrentNavigate(),
            currentNavigateError: routeStore.getCurrentNavigateError(),
            isNavigateComplete: routeStore.isNavigateComplete(),
            currentRoute: routeStore.getCurrentRoute()
        };
    });

    // Copy statics to RouteHandler
    hoistNonReactStatics(RouteHandler, Component);

    RouteHandler.wrappedComponent = RouteHandler.WrappedComponent = Component;

    return RouteHandler;
}

function handleRoute(Component) {
    return createComponent.apply(null, arguments);
}

export default handleRoute;
