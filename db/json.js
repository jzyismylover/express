/**
 * 封装信息响应
 */

const json = function (res, result, err) {
  if(result === 'Unauthorized') {
    res.json({
      code: '401',
      msg: 'Unauthorized'
    })
  }
  else if (typeof result === "undefined") {
    res.json({
      code: "400",
      msg: "操作失败:" + err,
    });
  } else if (result === "add") {
    res.json({
      code: "200",
      msg: "添加成功",
    });
  } else if (result === "delete") {
    res.json({
      code: "200",
      msg: "删除成功",
    });
  } else if (result === "update") {
    res.json({
      code: "200",
      msg: "更改成功",
    });
  } else if (result.result != "undefined" && result.result === "select") {
    res.json({
      code: "200",
      msg: "查找成功",
      data: result.data,
    });
  } else if (result.result != "undefined" && result.result === "selectall") {
    res.json({
      code: "200",
      msg: "全部查找成功",
      data: result.data,
    });
  } else {
    res.json(result);
  }
};

module.exports = json