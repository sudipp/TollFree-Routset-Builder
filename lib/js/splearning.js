/**
 * The SPLearning global namespace
 * @constructor
 */
var SPLearning=window.SPLearning || {};


/**
 * Returns the namespace specified and creates it if it doesn't exist
 *
 * SPLearning.namespace("property.package");
 * SPLearning.namespace("SPLearning.property.package");
 *
 * Either of the above would create SPLearning.property, then
 * SPLearning.property.package
 *
 * @param  {String} ns The name of the namespace
 * @return {Object}    A reference to the namespace object
 */
SPLearning.namespace = function(ns) {

    if (!ns || !ns.length) {
        return null;
    }

    var levels = ns.split(".");
    var nsobj = SPLearning;

    // SPLearning is implied, so it is ignored if it is included
    for (var i=(levels[0] == "SPLearning") ? 1 : 0; i<levels.length; ++i) {
        nsobj[levels[i]] = nsobj[levels[i]] || {};
        nsobj = nsobj[levels[i]];
    }

    return nsobj;
};

SPLearning.namespace("screenLayout");