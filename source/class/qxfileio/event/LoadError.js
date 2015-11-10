/**
 * Event fired when loading file encounter an error.
 *
 * Map the HTML FileReader onerror event.
 */
qx.Class.define("qxfileio.event.LoadError",
{
  extend : qx.event.type.Event,

  members : {
    __name : '',
    __message : '',

    /**
     * Initializes a LoadError event.
     *
     * @param name {String} The name of the error
     * @param message {String} The messafe of the error
     */
    init : function(name, message) {
      this.base(arguments, false, false);
      this.__name = name;
      this.__message = message;
    },

    /**
     * Get the name of the error
     *
     * @return {String} The name of the error
     */
    getName : function() {
      return this.__name;
    },

    /**
     * Get the message of the error
     *
     * @return {String} The message of the error
     */
    getMessage : function() {
      return this.__message;
    }
  }
});
