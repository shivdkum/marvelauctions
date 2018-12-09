// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function postitemUpdate (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    const _id = context.data._id
    const product_name = context.data.product_name
    const current_price = context.data.current_price
    
    return Promise.resolve(hook);
  };
};
