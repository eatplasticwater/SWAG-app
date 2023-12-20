export class SwagPagesModel {
	
	public _id : string;
	public chapter : string;
	public header : string;
	public icon : string;
	public contentHTML : string;
	
	constructor(_id : string, chapter : string, header : string, icon : string, contentHTML : string ){
		this._id = _id;
		this.chapter = chapter;
		this.header = header;
		this.icon = icon;
		this.contentHTML = contentHTML;
	} 

}