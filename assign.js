(function()
{
    "use strict"

    if (typeof Object.assign == "function")
        return module.exports = Object

    var isEnumerable = { }.propertyIsEnumerable
      , ownStrings = Object.getOwnPropertyNames
      , ownSymbols = Object.getOwnPropertySymbols
      , ownKeys = ownStrings

    if (typeof ownSymbols == "function")
    {
        ownKeys = function(object)
        {
            return ownStrings(object)
                .concat(ownSymbols(object))
        }
    }

    function polyfill(global)
    {
        Object.defineProperty(global.Object, "assign",
        {
            value: function assign(target, sources)
            {
                if (target == null) throw new global.TypeError

                var to = Object(target)

                for (var index = 1; index < arguments.length ;)
                {
                    var source = arguments[index++]
                    if (source == null) continue

                    var from = Object(source)
                    var keys = ownKeys(from)

                    keys.forEach(function(key)
                    {
                        if (isEnumerable.call(from, key))
                            to[key] = from[key]
                    })
                }

                return to
            },
            writable: true,
            configurable: true
        })

        return global
    }

    module.exports =
        polyfill(window) &&
        polyfill
})()