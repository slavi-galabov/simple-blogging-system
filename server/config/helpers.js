const handlebars = require('handlebars')


handlebars.registerHelper('cond', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});



