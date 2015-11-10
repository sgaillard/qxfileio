/**
 * Event fired when loading file ends.
 *
 * Map the HTML FileReader onloadend event.
 */
qx.Class.define("qxfileio.event.LoadEnd",
{
  extend : qx.event.type.Data,

  members : {
    __result : null,
    __error : null,

    /**
     * Initializes a LoadEnd event.
     *
     * @param result {Data?null} The content of the loaded file
     * @param error {DOMerror?null} The DOMerror if an error occured
     */
    init : function(result, error) {
      this.base(arguments, false, false);
      this.__result = result;
      this.__error = error;
    },

    /**
     * Get the result
     *
     * @return {Data?null} the result
     */
    getResult : function() {
      return this.__result;
    },

    /**
     * Get the error
     *
     * @return {DOMerror?null} The error
     */
    getError : function() {
      return this.__error;
    }
  }
});
