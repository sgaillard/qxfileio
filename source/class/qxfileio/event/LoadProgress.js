/**
 * Event fired when loading file is in progress.
 *
 * Map the HTML FileReader onprogress event.
 */
qx.Class.define("qxfileio.event.LoadProgress",
{
  extend : qx.event.type.Event,

  members : {
    __lengthComputable : false,
    __loaded : 0,
    __total : 0,

    /**
     * Initializes a LoadProgress event.
     *
     * @param lengthComputable {Boolean} Tell if the length of the file is computable.
     * @param loaded {Integer} The currently loaded amount of data from the file.
     * @param total {Integer} The total size of the file.
     */
    init : function(lengthComputable, loaded, total) {
      if (qx.core.Environment.get("qx.debug")) {
        if (lengthComputable !== undefined) {
          this.assertBoolean(lengthComputable, 'lengthComputable should be boolean');
        }
        if (loaded !== undefined) {
          this.assertInteger(loaded, 'loaded should be an Integer');
        }
        if (total !== undefined) {
          this.assertInteger(total, 'total should be an Integer');
        }
      }
      this.base(arguments, false, false);
      this.__lengthComputable = !!lengthComputable;
      this.__loaded = loaded;
      this.__total = total;
    },

    /**
     * @return {Boolean} True if the total size of the file is computable.
     */
    getLengthComputable : function() {
      return this.__lengthComputable;
    },
    /**
     * @return {Integer} The currently loaded amount of data from the file.
     */
    getLoaded : function() {
      return this.__loaded;
    },
    /**
     * @return {Integer} The total size of the file.
     */
    getTotal : function() {
      return this.__total;
    }
  }
});
