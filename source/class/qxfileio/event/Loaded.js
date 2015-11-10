/**
 * Event fired when loading file ends successfully.
 *
 * Map the HTML FileReader onload event.
 */
qx.Class.define("qxfileio.event.Loaded",
{
  extend : qx.event.type.Data,

  construct : function() {
    this.base(arguments);
  }
});
