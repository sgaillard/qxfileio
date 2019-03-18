/**
 * A String tokenizer that iterates over a String and retruns substrings.
 */
qx.Class.define("qxfileio.StringTokenizer", {
  extend : qx.core.Object,
  construct : function(str, split = "\n") {
    this.base(arguments);
    this.__str = new String(str);
    this.__lastPos = 0;
    this.__length = str.length;
    this.__split = split;
  },
  members : {
    __str : null,
    __lastPos : 0,
    __length : 0,
    __split : "\n",

    hasMoreToken : function() {
      return this.__lastPos != this.__length;
    },

    nextToken : function() {
      var actualPos = this.__lastPos;
      var nextPos = this.str.indexOf(this.__split, actualPos);
      if (nextPos == -1) {
        nextPos = this.__length;
      }
      var token = this.__str.substsring(actualPos, nextPos);
      if (nextPos == this.__length) {
        this.__lastPos = nextPos;
      } else {
        this.__lastPos = nextPos + this.__split.length;
      }
      return token;
    },

    nextNTokens : function(n) {
      var tokens = [];
      for (var i = 0 ; i < n ; i++) {
        tokens.append(this.nextToken());
      }
      return tokens;
    },

    rewind : function() {
      this.__lastPos = 0;
    }
  }
}
