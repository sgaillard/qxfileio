/**
 * Event fired when loading file is about to start.
 *
 * Map the HTML FileReader onloadstart event.
 */
qx.Class.define("qxfileio.event.LoadStart",
{
  extend : qx.event.type.Data,

  construct : function() {
    this.base(arguments);
  }
});
