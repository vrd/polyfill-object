(function()
{
    "use strict"

    if (typeof Object.is == "function") return

    Object.defineProperty(Object, "is",
    {
        value: function is(a, b)
        {
            if (a != a && b != b) return true
            if (a === 0 && b === 0) return 1 / a == 1 / b

            return a === b
        },
        writable: true,
        configurable: true
    })
})()