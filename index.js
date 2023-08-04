// data-fns
const { format } = require("date-fns");
console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

// uuid
const { v4: uuid } = require("uuid");
console.log(uuid());
