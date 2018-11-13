import { message } from "antd";
import $ from "jquery";

export function request(params){
  console.log("params",params);
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