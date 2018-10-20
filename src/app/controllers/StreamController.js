import Stream from "../models/Stream";

/*      POST /api/streams/new     */
export let new_Stream = async (req, res) => {
  if (!req.validate(["name"])) return;
  var { name, address, streamServer ,isMosaic,mosaicInputs} = req.body;
  try {
    var str = new Stream({ name, address, streamServer,isMosaic,mosaicInputs });
    var savedStream = await str.save();
    return res.validSend(200, { stream: savedStream });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

/*      POST    /api/streams/all      */
export let all_Streams = async (req, res) => {
  try {
    var strList = await Stream.find({ status: 0 }).populate({path:"mosaicInputs",select:["name","address"]});
    console.log("strList: ",strList)
    var data = [];
    var playState = "";
    strList.map(n => {
      if (n.playState == 0) playState = "متوقف شده";
      else playState = "در حال پخش";
      data.push({
        _id: n._id,
        nameEn: n.name.en,
        nameFa: n.name.fa,
        address: n.address,
        playStateText: playState,
        playStateValue: n.playState,
        streamServer: n.streamServer,
        isMosaic:n.isMosaic,
        mosaicInputs:n.mosaicInputs,
      });
    });

    var finalResult = {
      columns: {
        nameFa: "نام فارسی",
        playStateText: "وضعیت",
        changePlayState: "تغییر وضعیت",
        streamServer: "سرور  استریم"
      },
      streamsData: data
    };

    return res.validSend(200, { streams: finalResult });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

//api for info_stream_client
/*      POST    /api/streams/client/all      */

export let all_Streams_client = async (req, res) => {
  try {
    var strList = await Stream.find({ status: 0 });
    var data = [];
    var address = "";
    strList.map(n => {
      address = "http://" + n.streamServer + ":8000/" + n.name.en + ".m3u8";
      data.push({
        id: n._id,
        name: n.name.fa,
        address
      });
    });
    return res.validSend(200, { streams: data });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

/*          POST /api/streams/search            */
export let search_Streams = async (req, res) => {
  console.plain(req.body);
  try {
    var { search } = req.body;
    if (!search) search = "";
    var dbQuery = {
      $or: [
        {
          "name.en": {
            $regex: search,
            $options: "i"
          }
        },

        {
          "name.fa": {
            $regex: search,
            $options: "i"
          }
        },
        {
          address: {
            $regex: search,
            $options: "i"
          }
        },
        {
          streamServer: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    };
    var finalQuery = { $and: [dbQuery, { status: 0 }] };

    var strList = await Stream.find(finalQuery, { _id: 0 });

    var data = [];
    var playState = "";
    strList.map(n => {
      if (n.playState == 0) playState = "متوقف شده";
      else playState = "در حال پخش";
      data.push({
        _id: n._id,
        nameEn: n.name.en,
        nameFa: n.name.fa,
        address: n.address,
        playStateText: playState,
        playStateValue: n.playState,
        streamServer: n.streamServer
      });
    });

    var finalResult = {
      columns: {
        nameFa: "نام فارسی",
        playStateText: "وضعیت",
        changePlayState: "تغییر وضعیت",
        streamServer: "سرور  استریم"
      },
      streamsData: data
    };

    return res.validSend(200, { streams: finalResult });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

/*          POST /api/streams/update            */

export let update_Stream = async (req, res) => {
  if (!req.validate(["_id"])) return;

  var { _id, name, address, streamServer } = req.body;
  var query = { name, address, streamServer };
  try {
    await Stream.update({ _id }, query);
    return res.validSend(200, { message: "Update is successful" });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

/*          POST /api/streams/delete            */

// {"arrayOfIds":["5b554f952e3eb30b1890d638"]}

export let delete_Stream = async (req, res) => {
  if (!req.validate(["arrayOfIds"])) return;
  var { arrayOfIds } = req.body;
  console.plain(arrayOfIds);

  try {
    await Stream.update(
      { _id: { $in: arrayOfIds } },
      { status: 1 },
      { multi: true }
    );
    return res.validSend(200, { message: "delete is successful" });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};
