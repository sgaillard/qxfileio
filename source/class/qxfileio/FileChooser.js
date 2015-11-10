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
      event : "multipleSelectChange"
    }
  },

  members :
  {
    /**
     * Opens the 'open file' dialog box.
     */
    open : function() {
      var inputEl = document.createElement("input");
      inputEl.type = "file";
      if (this.getMultipleSelect()) {
        inputEl.multiple = "multiple";
      }
      inputEl.style.position = "absolute";
      inputEl.style.hideFocus = "true";
      inputEl.style.zIndex = -10000;
      inputEl.style.left = "-1000px";
      inputEl.style.width = "1px";
      inputEl.onchange = (function(me) {
        return function(e) {
          me.fireDataEvent('filesChange', e.target.files);
        }
      })(this);
      inputEl.onclick = (function(me) {
        return function(e) {
          document.body.removeChild(e.target);
        }
      })(this);
      document.body.appendChild(inputEl);
      inputEl.click();
    }
  }
});
