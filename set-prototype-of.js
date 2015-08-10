(function()
{
    "use strict"

    if (typeof Object.setPrototypeOf == "function")
        return Function.prototype

    var PROTO = "__proto__"
    if (PROTO in Object.prototype)
    {
        return function(global)
        {
            var $Object$ = global.Object

            var $SetPrototypeOf$ = $Object$
                .getOwnPropertyDescriptor($Object$.prototype, PROTO)
                .set

            ///

            $Object$.defineProperty($Object$, "setPrototypeOf",
            {
                value: function setPrototypeOf(target, prototype)
                {
                    if (target == null)
                        throw new global.TypeError()

                    if (!$IsObjectOrNull$(prototype))
                        throw new global.TypeError()

                    if (!$IsObjectOrNull$(target))
                        return target

                    $SetPrototypeOf$.call(target, prototype)

                    return target
                },
                writable: true,
                configurable: true
            })
        }
    }

    ///

    function $IsObjectOrNull$(value)
    {
        switch (typeof value)
        {
            case "object":
            case "function":
                return true
        }

        return false
    }
})()(this)