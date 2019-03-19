/**
 * A String tokenizer that iterates over a String and retruns substrings.
 *
 * Usage:
 * <pre class='javascript'>
 * var text = "This is a text";
 * var st = new qxfileio.StringTokenizer(text, " ");
 * while (st.hasMoreToken()) {
 *   var t = st.nextToken();
 *   console.log(`[${t}]`);
 * }
 * </pre>
 * That should print:
 * <pre>
 * [This]
 * [is]
 * [a]
 * [text]
 * </pre>
 */
qx.Class.define("qxfileio.StringTokenizer", {
  extend : qx.core.Object,

  /**
   * Constructor
   *
   * @param str {String} The string object to tokenize. If it is a primitive
   * string type, it will be copied into a String object. If it is a String
   * object it will be referenced but not copied.
   * @param split {String} The split mark on witch tokens will be separated.
   * Default value: "\n". It is removed from the tokens.
   */
  construct : function(str, split = "\n") {
    this.base(arguments);
    this.__str = new String(str);
    this.__lastPos = 0;
    this.__length = str.length;
    this.__split = split;
    this.__tokenIndex = 0;
  },

  members : {
    __str : null,
    __lastPos : 0,
    __length : 0,
    __split : "\n",
    __tokenIndex : 0,

    /**
     * Test used to know if there is some remainig token (i.e. if the string
     * had been completely parsed).
     *
     * @return {Bool} True if there is more token in the string
     */
    hasMoreToken : function() {
      return this.__lastPos != this.__length;
    },

    /**
     * Get then next token in the string.
     *
     * @return {String} The token
     */
    nextToken : function() {
      var actualPos = this.__lastPos;
      var nextPos = this.__str.indexOf(this.__split, actualPos);
      if (nextPos == -1) {
        nextPos = this.__length;
      }
      var token = this.__str.substring(actualPos, nextPos);
      if (nextPos == this.__length) {
        this.__lastPos = nextPos;
      } else {
        this.__lastPos = nextPos + this.__split.length;
      }
      this.__tokenIndex++;
      return token;
    },

    /**
     * Get the N next tokens in the string
     *
     * If the number of tokens requested is higher than the number of remaining
     * tokens in the string, empty string tokens will be returned. The returned
     * Array will always have the requested size.
     *
     * @param n {Integer} The number of tokens to get.
     *
     * @return {Array} A Array of tokens
     */
    nextNTokens : function(n) {
      var tokens = [];
      for (var i = 0 ; i < n ; i++) {
        tokens.push(this.nextToken());
      }
      return tokens;
    },

    /**
     * Get the number of already extracted tokens from the string
     *
     * @return {Integer} The number of already extracted tokens.
     */
    getTokenCounter : function() {
      return this.__tokenIndex;
    },

    /**
     * Get back to the beginning of the string.
     */
    rewind : function() {
      this.__lastPos = 0;
      this.__tokenIndex = 0;
    }
  }
});
