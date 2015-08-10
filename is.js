(function()
{
    "use strict"

    if (typeof Object.is == "function")
        return Function.prototype

    return function(global)
    {
        var $Object$ = global.Object
            $Object$.defineProperty($Object$, "is",
            {
                value: function is(x, y)
                {
                    if (x === 0 && y === 0)
                        return 1 / x === 1 / y

                    if (x !== x && y !== y)
                        return true

                    return x === y
                },
                writable: true,
                configurable: true
            })
    }
})()(this)