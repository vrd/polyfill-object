(function()
{
    "use strict"

    if (typeof Object.getPrototypeOf == "function")
        return Function.prototype

    return function(global)
    {
        var _Object_ = global.Object

        var $HasOwn$ = _Object_.prototype.hasOwnProperty
        var $GetOwn$ = _Object_.getOwnPropertyDescriptor
        var $Define$ = _Object_.defineProperty

        ///

        function $GetPrototypeValue$(object, name)
        {
            if (!(name in object)) return

            try
            {
                if ($HasOwn$.call(object, name))
                {
                    try
                    {
                        var descriptor = $GetOwn$(object, name)
                    }
                    catch (error)
                    {
                        var value = object[name]
                    }
                    finally
                    {
                        delete object[name]
                    }
                }

                return object[name]
            }
            catch (error)
            {
                throw error
            }
            finally
            {
                if (descriptor) $Define$(object, name, descriptor)
                else object[name] = value
            }
        }

        function $GetPrototypeOf$(object)
        {
            var constructor = $GetPrototypeValue$(object, "constructor")
            if ($IsPrimitive$(constructor)) return null

            var prototype = constructor.prototype
            if ($IsPrimitive$(prototype)) return null

            return prototype
        }

        ///

        $Define$(_Object_, "getPrototypeOf",
        {
            value: function(target)
            {
                if ($IsPrimitive$(target)) throw new global.TypeError()

                return $GetPrototypeOf$(target)
            },
            writable: true,
            configurable: true
        })
    }

    ///

    function $IsPrimitive$(value)
    {
        switch (typeof value)
        {
            case "boolean":
            case "number":
            case "string":
                return true
        }

        return null == value
    }
})()(this)