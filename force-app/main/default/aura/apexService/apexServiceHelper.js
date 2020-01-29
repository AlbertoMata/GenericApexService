({
    configure_action: function(component, action_name, parameter_name, string_parameter) {
        let action     = component.get(action_name);
        let parameters = new Object();

        parameters[parameter_name] = string_parameter;

        action.setParams (parameters);

        return action;

    },

    handle_response: function (response) {
        let promise = new Promise ((resolve, reject) => {
            let state = response.getState();
            if (state === 'SUCCESS') {
                resolve ( JSON.parse (response.getReturnValue()) );
            } else if (state === 'ERROR')  {
                let errors = response.getError ();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.debug ('[Generic Apex Service]: ' + errors[0].message);
                    }
                } else {
                    console.debug ('[Generic Apex Service]: Unknown error.');
                }
                reject (errors);
            } else if (state === 'INCOMPLETE') {
                reject ('[Generic Apex Service]: Operation incomplete, check your internet connection.');
            } 
        }); 

        return promise;

    }

})