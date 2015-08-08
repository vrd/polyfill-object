(function()
{
    "use strict"

    if (typeof Object.assign == "function")
        return Function.prototype

    return function(global)
    {
        var _Object_ = global.Object

        var $OwnStrings$ = _Object_.getOwnPropertyNames
        var $OwnSymbols$ = _Object_.getOwnPropertySymbols

        var $IsEnumerable$ = _Object_.prototype.propertyIsEnumerable

        ///

        _Object_.defineProperty(_Object_, "assign",
        {
            value: function(target, sources)
            {
                if (null == target) throw new global.TypeError()

                var to = _Object_(target)

                if (arguments.length == 1) return to

                for (var index = 1; index < arguments.length; ++index)
                {
                    var source = arguments[index]
                    if (source == null) continue

                    var from = _Object_(source)
                    var keys = $OwnStrings$(from).concat(
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
            },
            writable: true,
            configurable: true
        })
    }
})()(this)