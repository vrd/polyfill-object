(function()
{
    "use strict"

    if (typeof Object.getPrototypeOf == "function")
        return Function.prototype

    return function(global)
    {
        var _Object_ = global.Object
          , _ObjectPrototype_ = _Object_.prototype

        var $Define$ = _Object_.defineProperty
          , $GetDescriptor$ = _Object_.getOwnPropertyDescriptor

        var $HasOwn$ = _ObjectPrototype_.hasOwnProperty
          , $IsPrototype$ = _ObjectPrototype_.isPrototypeOf

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
                        var descriptor = $GetDescriptor$(object, name)
                    }
                    catch (error)
                    {
                        var value = object[name]
                    }

                    delete object[name]
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
            if ($IsPrototype$.call(prototype, object)) return prototype

            return null
        }

        ///

        $Define$(_Object_, "getPrototypeOf",
        {
            value: function getPrototypeOf(target)
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