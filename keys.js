(function()
{
    "use strict"

    if (typeof Object.keys == "function")
        return Function.prototype

    return function(global)
    {
        var $Object$ = global.Object
          , $GetOwn$ = $Object$.getOwnPropertyNames
          , $IsEnumerable$ = $Object$.prototype.propertyIsEnumerable

        ///

        $Object$.defineProperty($Object$, "keys",
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