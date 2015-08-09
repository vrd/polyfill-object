(function()
{
    "use strict"

    if (typeof Object.keys == "function")
        return Function.prototype

    return function(global)
    {
        var _Object_ = global.Object

        var $GetOwn$ = _Object_.getOwnPropertyNames
          , $IsEnumerable$ = _Object_.prototype.propertyIsEnumerable

        ///

        _Object_.defineProperty(_Object_, "keys",
        {
            value: function keys(target)
            {
                return $GetOwn$(target).filter(function(name)
                {
                    return $IsEnumerable$.call(target, name)
                })
            },
            writable: true,
            configurable: true
        })
    }
})()(this)