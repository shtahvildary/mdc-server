import Stream from "../models/Stream";

/*          POST /api/streamServer/hasChanged            */

export let hasChanged = async (req, res) => {
  try {
    var { playState ,changeStateTime} = req.body;
    var _id = req.body.id;
    console.plain("playState:", playState);
    await Stream.update({ _id }, { playState ,changeStateTime});

    io.emit("changes", req.body);
    console.plain("req: ", req.body);
    return res.validSend(200, {
      message: "changes have been sent to clients."
    });
  } catch (e) {
    return res.validSend(500, { error: e });
  }
};
