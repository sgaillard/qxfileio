/**
 * Read the content of a file as text.
 *
 * This is a qooxdoo mapper to the HTML FileReader object.
 *
 * @see https://developer.mozilla.org/docs/Web/API/FileReader
 */
qx.Class.define("qxfileio.FileReader",
{
  extend : qx.core.Object,

  construct : function() {
    this.base(arguments);
    this.init();
  },
  events : {
    /**
     * Fired on loading start.
     */
    loadstart : 'qxfileio.event.LoadStart',
    /**
     * Fired on reading progress.
     */
    loadprogress : 'qxfileio.event.LoadProgress',
    /**
     * Fired on reading error.
     */
    loaderror : 'qxfileio.event.LoadError',
    /**
     * Fired on load complete.
     */
    load : 'qxfileio.event.Loaded',
    /**
     * Fired on load abort.
     */
    loadabort : 'qxfileio.event.LoadAbort',
    /**
     * Fired on end of file reading.
     */
    loadend : 'qxfileio.event.LoadEnd'
  },

  members :
  {
    __reader : null,

    /**
     * Abort the reading operation.
     */
    abort : function() {
      if (this.__reader.readyState == 1) {
        this.__reader.abort();
      }
    },

    /**
     * Get the state of the FileReader.
     *
     * @return {Integer} The state of the FileReader
     * 0: EMPTY: No data loaded
     * 1: LOADING: Loading data
     * 2: DONE: Loading done
     */
    getState : function() {
      return this.__reader.readyState;
    },

    /**
     * Load the content of a file as ArrayBuffer data.
     *
     * @param file {Blob} The File or Blob to be loaded.
     */
    loadAsArrayBuffer : function(file) {
      if (this.__reader.readyState != 0) {
        this.init();
      }
      this.__reader.readAsArrayBuffer(file);
    },

    /**
     * Load the content of a file as binary string.
     *
     * @param file {Blob} The File or Blob to be loaded.
     */
    loadAsBinaryString : function(file) {
      if (this.__reader.readyState != 0) {
        this.init();
      }
      this.__reader.readAsBinaryString(file);
    },

    /**
     * Load the content of a file as DataURL.
     *
     * @param file {Blob} The File or Blob to be loaded.
     */
    loadAsDataURL : function(file) {
      if (this.__reader.readyState != 0) {
        this.init();
      }
      this.__reader.readAsDataURL(file);
    },

    /**
     * Load the content of a file as text data.
     *
     * @param file {Blob} The File or Blob to be loaded.
     */
    loadAsText : function(file) {
      if (this.__reader.readyState != 0) {
        this.init();
      }
      this.__reader.readAsText(file);
    },

    /**
     * Initialise a qxfileio.FileReader object.
     */
    init : function() {
      this.__reader = null;
      this.__reader = new FileReader();
      this.__reader.onloadstart = (function(me) {
        return function(e) { // e is a ProgressEvent (http://www.w3.org/TR/progress-events/)
          me.fireEvent('loadstart', qxfileio.event.LoadStart);
        };
      })(this);
      this.__reader.onprogress = (function(me) {
        return function(e) { // e is a ProgressEvent (http://www.w3.org/TR/progress-events/)
          me.fireEvent('loadprogress', qxfileio.event.LoadProgress, [e.lengthComputable, e.loaded, e.total]);
        };
      })(this);
      this.__reader.onloadabort = (function(me) {
        return function(e) {
          me.fireEvent('loadabort', qxfileio.event.LoadAbort);
        }
      })(this);
      this.__reader.onload = (function(me) {
        return function(e) {
          me.fireEvent('load', qxfileio.event.Loaded, [e.target.result]);
        }
      })(this);
      this.__reader.onloadend = (function(me) {
        return function(e) { // e is a ProgressEvent (http://www.w3.org/TR/progress-events/)
          me.fireEvent('loadend', qxfileio.event.LoadEnd, [e.target.result, e.target.error]);
        };
      })(this);
      this.__reader.onerror = (function(me) {
        return function(e) { // e is a ProgressEvent (http://www.w3.org/TR/progress-events/)
          me.fireEvent('loaderror', qxfileio.event.LoadError, [e.target.error.name, e.target.error.message]);
        };
      })(this);
    }
  }
});
