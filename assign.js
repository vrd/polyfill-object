(function()
{
    "use strict"

    if (typeof Object.assign == "function")
        return module.exports = Function.prototype

    function polyfill(global)
    {
        var $OwnNames$ = Object.getOwnPropertyNames
          , $OwnSymbols$ = Object.getOwnPropertySymbols
          , $IsEnumerable$ = Object.prototype.propertyIsEnumerable

        function assign(target, sources)
        {
            if (target == null) throw new global.TypeError

            var to = Object(target)

            for (var index = 1; index < arguments.length; ++index)
            {
                var source = arguments[index]
                if (source == null) continue

                var from = Object(source)
                var keys = $OwnNames$(from).concat
                (
                    typeof $OwnSymbols$ == "function"
                        && $OwnSymbols$(from)
                        || [ ]
                )

                keys.forEach(function(key)
                {
                    if ($IsEnumerable$.call(from, key))
                        to[key] = from[key]
                })
            }

            return to
        }

        Object.defineProperty(global.Object, "assign",
        {
            value: assign,
            writable: true,
            configurable: true
        })
    }

    module.exports =
        polyfill(window),
        polyfill
})()