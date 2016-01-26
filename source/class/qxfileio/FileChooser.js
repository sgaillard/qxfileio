/**
 * A file chooser widget that let the user selects files from his file system.
 */
qx.Class.define("qxfileio.FileChooser",
{
  extend : qx.core.Object,

  events : {
    /**
     * Fired when the file selection change.
     *
     * Data contains the FileList selected by the user.
     */
    filesChange : 'qx.event.type.Data'
  },

  properties :
  {
    /**
     * The ability to choose more than one file in the dialog box.
     */
    multipleSelect :
    {
      check : "Boolean",
      init : false,
      event : "multipleSelectChange",
      apply : "__applyMultipleSelect"
    }
  },

  construct : function() {
    // Element creation
    this.__inputEl = document.createElement("input");
    this.__inputEl.type = "file";
    this.__inputEl.style.position = "absolute";
    this.__inputEl.style.hideFocus = "true";
    this.__inputEl.style.zIndex = -10000;
    this.__inputEl.style.left = "-1000px";
    this.__inputEl.style.width = "1px";

    // Event handling
    this.__inputEl.onchange = (function(me) {
      return function(e) {
        //me.debug("!!! File changed [" + e.target.files.length + "] !!!");
        me.fireDataEvent('filesChange', e.target.files);
      };
    })(this);
    this.__inputEl.onclick = (function(me) {
      return function(e) {
        document.body.removeChild(e.target);
        //me.debug("!!! Removed !!!");
      }
    })(this);
  },

  members :
  {
    /**
     * The embeded HTML input type file element.
     */
    __inputEl : null,

    /**
     * Apply the value of multipleSelect to the HTML input element.
     */
    __applyMultipleSelect : function(val) {
      this.debug("multiple: " + val);
      if (val) {
        this.__inputEl.multiple = "multiple";
      } else {
        this.debug("remove multiple");
        this.__inputEl.multiple = "";
      }
    },

    /**
     * Opens the 'open file' dialog box.
     */
    open : function() {
      document.body.appendChild(this.__inputEl);
      this.__inputEl.click();
    },

    /**
     * Get the file list
     * @return {FileList} the list of File
     */
    getFiles : function() {
      return this.__inputEl.files;
    }
  }
});
