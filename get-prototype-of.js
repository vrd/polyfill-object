(function()
{
    "use strict"

    if (typeof Object.getPrototypeOf == "function")
        return module.exports = Object

    var hasOwn = { }.hasOwnProperty
    var isPrototype = { }.isPrototypeOf

    function getPrototypeValue(object, key)
    {
        if (!hasOwn.call(object, key))
            return object[key]

        try
        {
            try
            {
                var descriptor = Object.getOwnPropertyDescriptor
                (
                    object,
                    key
                )
            }
            catch (error)
            {
                var value = object[key]
            }

            delete object[key]
            return object[key]
        }
        catch (error)
        {
            throw error
        }
        finally
        {
            if (descriptor)
                Object.defineProperty(object, key, descriptor)
            else
                object[key] = value
        }
    }

    function getOwnValue(object, key)
    {
        if (hasOwn.call(object, key))
            return object[key]
    }

    function polyfill(global)
    {
        Object.defineProperty(global.Object, "getPrototypeOf",
        {
            value: function getPrototypeOf(target)
            {
                if (target !== Object(target))
                    throw new global.TypeError

                var constructor = getPrototypeValue(target, "constructor")
                if (constructor === Object(constructor))
                {
                    var prototype = getOwnValue(constructor, "prototype")
                    if (prototype === Object(prototype))
                        if (isPrototype.call(prototype, target))
                            return prototype
                }

                return null
            },
            writable: true,
            configurable: true
        })

        return global
    }

    module.exports =
        polyfill(window) &&
        polyfill
})()