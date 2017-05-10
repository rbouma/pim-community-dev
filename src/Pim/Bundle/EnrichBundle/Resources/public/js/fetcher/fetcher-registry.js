'use strict';

define(['module-config', 'jquery', 'underscore', 'fetchers', 'pim/base-fetcher', 'paths'], function (module, $, _, fetcherConfig, BaseFetcher, paths) {
    return {
        fetchers: {},
        initializePromise: null,

        /**
         * @return Promise
         */
        initialize: function () {
            if (null === this.initializePromise) {
                var deferred = $.Deferred();
                // var fetchers = {};

                // console.log(fetcherConfig)
                // _.each(fetcherConfig, function (config, name) {
                //     config = _.isString(config) ? { module: config } : config;
                //     config.options = config.options || {};
                //     fetchers[name] = config;
                // });

                require.ensure([], function () {
                  for (var fetcher in paths) {
                    console.log(fetcher)
                      console.log(require('bundles/' + fetcher))
                  }
                    // _.each(fetcherConfig, function (fetcher) {
                    //   console.log(paths[fetcher.module])
                    //   console.log(require('./bundles' + paths[fetcher.module] + '.js'))
                    //     var Module = fetcher.resolvedModule || BaseFetcher
                    //     fetcher.loadedModule = new (Module)(fetcher.options);
                    // });

                    // this.fetchers = fetchers;
                    deferred.resolve();
                }.bind(this));

                this.initializePromise = deferred.promise();
            }

            return this.initializePromise;
        },

        /**
         * Get the related fetcher for the given collection name
         *
         * @param {String} entityType
         *
         * @return Fetcher
         */
        getFetcher: function (entityType) {
            return (this.fetchers[entityType] || this.fetchers.default).loadedModule;
        },

        /**
         * Clear the fetcher cache for the given collection name
         *
         * @param {String}         entityType
         * @param {String|integer} entity
         */
        clear: function (entityType, entity) {
            return this.getFetcher(entityType).clear(entity);
        },

        /**
         * Clear all fetchers cache
         */
        clearAll: function () {
            _.each(this.fetchers, function (fetcher) {
                fetcher.loadedModule.clear();
            });
        }
    };
});
