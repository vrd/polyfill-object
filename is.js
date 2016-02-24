(function()
{
    "use strict"

    if (typeof Object.is == "function")
        return module.exports = Object

    function polyfill(global)
    {
        Object.defineProperty(global.Object, "is",
        {
            value: function is(a, b)
            {
                if (a === 0 && b === 0)
                    return 1 / b === 1 / a

                if (a !== a && b !== b)
                    return true

                return a === b
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