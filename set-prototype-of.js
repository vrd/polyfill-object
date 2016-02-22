(function()
{
    "use strict"

    if (typeof Object.setPrototypeOf == "function")
        return module.exports = Object

    if ("__proto__" in Object.prototype)
    {
        var setPrototype = Object
            .getOwnPropertyDescriptor(Object.prototype, "__proto__")
            .set

        var polyfill = function(global)
        {
            var TypeError = global.TypeError

            Object.defineProperty(global.Object, "setPrototypeOf",
            {
                value: function setPrototypeOf(target, prototype)
                {
                    if (target == null)
                        throw new TypeError

                    switch (typeof prototype)
                    {
                        default: throw new TypeError

                        case "object":
                        case "function":
                    }

                    if (target === Object(target))
                        setPrototype.call(target, prototype)

                    return target
                },
                writable: true,
                configurable: true
            })

            return global
        }
    }

    module.exports =
        polyfill(window) &&
        polyfill
})()