<!--
 * @Author: xiaoping.xu
 * @Date: 2021-04-21 12:27:33
 * @LastEditors: xiaoping.xu
 * @LastEditTime: 2021-04-21 13:14:18
 * @Desc: 
-->

``` mermaid
graph LR

list[聊天素材]-->updateMaterialBarName[修改聊天工具栏名称]
list[聊天素材]-->updateStatuw[是否启用]
list[聊天素材]-->manageMaterial[管理素材]
manageMaterial[管理素材]-->manageImage[管理图片素材]
manageMaterial[管理素材]-->manageVideo[管理视频素材]
manageMaterial[管理素材]-->manageMini[管理小程序素材]
manageMaterial[管理素材]-->manageH5[管理h5素材]
manageImage[管理图片素材]--> searchImage[搜索图片]
manageImage[管理图片素材]--> addImage[添加图片素材]
manageImage[管理图片素材]--> deleteImage[删除图片素材]
manageImage[管理图片素材]--> previewImage[预览]
manageImage[管理图片素材]--> pageImage[分页]
manageVideo[管理视频素材]--> searchVideo[搜索视频]
manageVideo[管理视频素材]--> addVideo[添加视频素材]
manageVideo[管理视频素材]--> deleteVideo[删除视频素材]
manageVideo[管理视频素材]--> previewVideo[预览]
manageVideo[管理视频素材]--> pageVideo[分页]
manageMini[管理小程序素材]--> searchMini[搜索小程序]
manageMini[管理小程序素材]--> editMini[添加/编辑小程序素材]
manageMini[管理小程序素材]--> deleteMini[删除小程序素材]
manageMini[管理小程序素材]--> pageMini[分页]
manageH5[管理h5素材]--> searchH5[搜索H5素材]
manageH5[管理h5素材]--> editH5[添加/编辑H5素材]
manageH5[管理h5素材]--> deleteH5[删除H5素材]
manageH5[管理h5素材]--> pageH5[分页]

editMini[添加/编辑小程序素材] -->editMiniPage[小程序素材编辑页]
editMiniPage['小程序素材编辑页'] --> miniSource[小程序页面]
editMiniPage['小程序素材编辑页'] --> miniTitle[小程序标题]
editMiniPage['小程序素材编辑页'] --> miniImg[小程序图片]

editH5[添加/编辑H5素材] -->editH5Page[H5编辑页]
editH5Page[H5编辑页] --> h5Source[H5页面]
editH5Page[H5编辑页] --> h5Title[H5标题]
editH5Page[H5编辑页] --> h5Desc[H5摘要]
editH5Page[H5编辑页] --> h5Img[H5封面]
```