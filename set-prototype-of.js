(function()
{
    "use strict"

    if (typeof Object.setPrototypeOf == "function")
        return

    if ("__proto__" in { })
    {
        var setPrototype = Object
            .getOwnPropertyDescriptor(Object.prototype, "__proto__")
            .set

        Object.defineProperty(Object, "setPrototypeOf",
        {
            value: function setPrototypeOf(target, prototype)
            {
                if (target == null) throw new TypeError

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
    }
})()