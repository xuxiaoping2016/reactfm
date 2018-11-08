import { message } from "antd";

export function request(params){
  return new Promise((resolve,reject) => {
    $.ajax({
      url : params.url || "",
      type : params.type || "get",
      dataType : params.dataType || "json",
      data : params.data || {},
      success(res){
        resolve(res);
      },
      error(err){
        message.warning("dd");
        reject(err);
      }
    });
  });
}