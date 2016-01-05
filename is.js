(function()
{
    "use strict"

    if (typeof Object.is == "function")
        return Function.prototype

    return function(global)
    {
        function is(a, b)
        {
            if (a === 0 && b === 0)
                return 1 / a === 1 / b

            if (a !== a && b !== b)
                return true

            return a === b
        }

        Object.defineProperty(global.Object, "is",
        {
            value: is,
            writable: true,
            configurable: true
        })
    }
})()(this)