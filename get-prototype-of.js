(function()
{
    "use strict"

    if (typeof Object.getPrototypeOf == "function")
        return Function.prototype

    return function(global)
    {
        var $Object$ = global.Object
          , _ObjectPrototype_ = $Object$.prototype

        var $Define$ = $Object$.defineProperty
          , $GetDescriptor$ = $Object$.getOwnPropertyDescriptor

        var $HasOwn$ = _ObjectPrototype_.hasOwnProperty
          , $IsPrototype$ = _ObjectPrototype_.isPrototypeOf

        ///

        function $GetPrototypeValue$(object, name)
        {
            if (!$HasOwn$.call(object, name)) return object[name]

            try
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
                return object[name]
            }
            catch (error)
            {
                throw error
            }
            finally
            {
                if (descriptor)
                    if (descriptor.configurable)
                        $Define$(object, name, descriptor)
                else
                    object[name] = value
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

        $Define$($Object$, "getPrototypeOf",
        {
            value: function getPrototypeOf(target)
            {
                if ($IsPrimitive$(target))
                    throw new global.TypeError()

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