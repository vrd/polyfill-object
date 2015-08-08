(function()
{
    "use strict"

    var GET_PROTO = "getPrototypeOf"
    if (GET_PROTO in Object) return Function.prototype

    return function(global)
    {
        var _Object_ = global.Object

        var $HasOwn$ = _Object_.prototype.hasOwnProperty
        var $GetOwn$ = _Object_.getOwnPropertyDescriptor
        var $Define$ = _Object_.defineProperty

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

        function $GetOwnProperty$(object, name)
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
            var constructor = $GetOwnProperty$(object, "constructor")

            return $IsPrimitive$(constructor)
                ? null
                : constructor.prototype || null
        }

        ///

        $Define$(_Object_, GET_PROTO,
        {
            value: function(target)
            {
                if (null == target) throw new global.TypeError()

                return $GetPrototypeOf$(_Object_(target))
            },
            writable: true,
            configurable: true
        })
    }
})()(this)