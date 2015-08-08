(function()
{
    "use strict"

    var IS = "is"
    if (IS in Object) return Function.prototype

    return function(global)
    {
        var _Object_ = global.Object
            _Object_.defineProperty(_Object_, IS,
            {
                value: function(x, y)
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