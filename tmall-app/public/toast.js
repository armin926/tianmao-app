// 一些弹窗
class Toast {
	constructor(title, icon="success",duration=2000,mask=true) {
	    this.tite = title
		this.icon = icon
		this.duration = duration
		this.mask = mask
	}
	// 消息提示框: 自动消失
	showtoast(){
		uni.showToast({
			title:this.title,
			icon: this.icon,
			duration:this.duration,
			mask: this.mask
		})
	}
	// 消息提示框：手动消失
	showloading(){
		uni.showLoading({
			title:this.titie,
			mask:this.mask
		})
	}
}

export default Toast